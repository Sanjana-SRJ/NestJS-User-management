import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../database/users.schema';
import { Ignore } from '../database/ignore.schema';
import mongoose from 'mongoose';

const ObjectId = Types.ObjectId;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Ignore.name) private readonly ignoreModel: Model<Ignore>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel({
      name: user.name,
      surname: user.surname,
      username: user.username,
      birthdate: user.birthdate,
    });
    return newUser.save();
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }

  async search(username?: string, minAge?: number, maxAge?: number): Promise<User[]> {
    const query: {
      birthdate?: { $gte?: Date; $lte?: Date };
      username?: { $regex?: string; $options?: string };
    } = {}; // Define the query object correctly
  
    // Set username filter if provided
    if (username) {
      query.username = { $regex: username, $options: 'i' }; // Use regex for case-insensitive search
    }
  
    // Handle age filtering
    if (minAge || maxAge) {
      query.birthdate = {}; // Initialize birthdate object
      const currentDate = new Date();
  
      if (minAge) {
        query.birthdate.$lte = new Date(currentDate.setFullYear(currentDate.getFullYear() - minAge));
      }
      
      if (maxAge) {
        query.birthdate.$gte = new Date(currentDate.setFullYear(currentDate.getFullYear() - maxAge));
      }
    }
  
    // Execute the query and check for errors
    try {
      const users = await this.userModel.find(query).exec();
  
      // Get blocked user IDs
      const blockedUserIds = await this.ignoreModel.find().then(ignores => 
        ignores.map(ignore => ignore.blockedUserId.toString())
      );
  
      // Filter out blocked users
      return users.filter(user => !blockedUserIds.includes(user._id.toString()));
    } catch (error) {
      console.error('Error executing search query:', error);
      throw error; // Rethrow the error for handling at a higher level
    }
  }
    
}