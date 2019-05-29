import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
  name: string;
  hobbies: string[];
}

export const UserSchema = new Mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    hobbies: Array
  },
  {
    timestamps: true
  }
);

export const UserModel = Mongoose.model<IUser>("User", UserSchema);
