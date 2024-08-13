import { Schema, model, Document } from 'mongoose';

export const IgnoreSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  blockedUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date,
});

export interface IgnoreDocument extends Document {
    userId: string,
    blockedUserId: string,
    createdAt: Date,
    updatedAt: Date,
  }  

export const Ignore = model('Ignore', IgnoreSchema);