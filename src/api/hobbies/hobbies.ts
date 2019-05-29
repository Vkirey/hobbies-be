import * as Mongoose from "mongoose";

export interface IHobby extends Mongoose.Document {
  passionLevel: string;
  name: string;
  year: number;
}

export const HobbySchema = new Mongoose.Schema(
  {
    passionLevel: String,
    name: String,
    year: Number
  },
  {
    timestamps: true
  }
);

export const HobbyModel = Mongoose.model<IHobby>("Hobby", HobbySchema);
