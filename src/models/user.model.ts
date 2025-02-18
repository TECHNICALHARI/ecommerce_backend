import mongoose, { Schema } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "super_admin",
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: number;
  _id: mongoose.Types.ObjectId;
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    phone: { type: Number, required: true, maxlength: 10 },
  },
  { timestamps: true, versionKey: false }
);

export const User = mongoose.model<IUser>("User", userSchema);
