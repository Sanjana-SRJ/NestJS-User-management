import { Schema, model, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  surname: String,
  username: String,
  birthdate: Date,
  createdAt: Date,
  updatedAt: Date,
});

export interface UserDocument extends Document {
  name: string;
  surname: string;
  username: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const User = model('User', UserSchema, 'users');