import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  surname?: string;

  @Prop({ required: true })
  username?: string;

  @Prop({ required: true })
  birthdate?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);


// export const UserSchema = new Schema({
//   name: String,
//   surname: String,
//   username: String,
//   birthdate: Date,
//   createdAt: Date,
//   updatedAt: Date,
// });

// export interface UserDocument extends Document {
//   name: string;
//   surname: string;
//   username: string;
//   birthdate: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export const User = model('User', UserSchema, 'users');