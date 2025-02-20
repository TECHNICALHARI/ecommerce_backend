import mongoose, { Schema } from "mongoose";

export interface IBrand extends Document {
  name: string;
  icon: string;
  _id: mongoose.Types.ObjectId;
}

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Brand = mongoose.model<IBrand>("Brand", brandSchema);
