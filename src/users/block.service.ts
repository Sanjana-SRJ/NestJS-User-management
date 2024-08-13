import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ignore, IgnoreDocument } from '../database/ignore.schema';
const ObjectId = Types.ObjectId;

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Ignore.name)
    private readonly ignoreModel: Model<IgnoreDocument>,
  ) {}

  async block(userId: string, blockedUserId: string): Promise<void> {
    await this.ignoreModel.create({ userId: new ObjectId(userId), blockedUserId: new ObjectId(blockedUserId) });
  }

  async unblock(userId: string, blockedUserId: string): Promise<void> {
    await this.ignoreModel.deleteOne({ userId: new ObjectId(userId), blockedUserId: new ObjectId(blockedUserId) });
  }

  async getBlockedUserIds(userId: string): Promise<string[]> {
    const blockedUsers = await this.ignoreModel.find({ userId: new ObjectId(userId) });
    return blockedUsers.map((blockedUser) => blockedUser.blockedUserId.toString());
  }
}