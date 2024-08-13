import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../database/users.schema';
import { Ignore, IgnoreDocument } from '../database/ignore.schema';
const ObjectId = Types.ObjectId;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Ignore.name) private readonly ignoreModel: Model<IgnoreDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async create(user: UserDocument): Promise<UserDocument> {
    console.log(user)
    const newUser = new this.userModel({
      name: user.name,
      surname: user.surname,
      username: user.username,
      birthdate: user.birthdate,
    });
    return newUser.save();
  }

  async update(id: string, user: UserDocument): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }

  async search(username?: string, minAge?: number, maxAge?: number): Promise<UserDocument[]> {
    const query: { birthdate?: { $gte?: Date; $lte?: Date }; username?: RegExp } = {};
    if (username) {
      query.username = new RegExp(username, 'i');
    }
    if (minAge || maxAge) {
      query.birthdate = {};
      if (minAge) {
        query.birthdate.$gte = new Date(Date.now() - minAge * 365 * 24 * 60 * 60 * 1000);
      }
      if (maxAge) {
        query.birthdate.$lte = new Date(Date.now() - maxAge * 365 * 24 * 60 * 60 * 1000);
      }
    }
    const users = await this.userModel.find(query).exec();
    const blockedUserIds = await this.ignoreModel.find({ userId: { type: ObjectId, ref: 'User' } }).then((ignores) => ignores.map((ignore) => ignore.blockedUserId));
    return users.filter((user) => !blockedUserIds.some((blockedUserId) => user._id.toString() === blockedUserId.toString()));
  }
}