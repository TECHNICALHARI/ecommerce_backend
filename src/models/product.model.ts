import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  mrp: number;
  saleRate: number;
  description: string;
  category: string;
  brand: string;
  imageUrls: string[];
  thumbnail: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: string[];
  slug: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, unique: true, required: true },
    mrp: { type: Number, required: true },
    saleRate: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    thumbnail: { type: String, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: { type: [String], required: true, default: [] },
    slug: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
