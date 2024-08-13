// import { Schema, model, Document } from 'mongoose';

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './users.schema'

@Schema()
export class Ignore {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  blockedUserId?: User;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const IgnoreSchema = SchemaFactory.createForClass(Ignore);

// export const IgnoreSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User' },
//   blockedUserId: { type: Schema.Types.ObjectId, ref: 'User' },
//   createdAt: Date,
//   updatedAt: Date,
// });

// export interface IgnoreDocument extends Document {
//     userId: string,
//     blockedUserId: string,
//     createdAt: Date,
//     updatedAt: Date,
//   }  

// export const Ignore = model('Ignore', IgnoreSchema);