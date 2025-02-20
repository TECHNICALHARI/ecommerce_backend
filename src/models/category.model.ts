import mongoose, { Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: string;
  _id: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
