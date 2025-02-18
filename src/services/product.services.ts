import mongoose from "mongoose";
import { ProductInputTypes } from "../validations/product";
import { Product } from "../models/product.model";
import { Response } from "express";
import { errorResponse } from "../utils/commonResponse";
import slugify from "slugify";
import multer from "multer";

const productServices = {
  addProduct: async (
    res: Response,
    product: ProductInputTypes,
    userId: mongoose.Types.ObjectId
  ) => {
    let slug = slugify(product.name, { lower: true, strict: true });
    let uniqueSlug = slug;
    let counter = 1;
    while (await Product.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    const newProduct = await new Product({
      ...product,
      slug: uniqueSlug,
      createdBy: userId,
    });
    if (!newProduct) {
      return errorResponse(res, 400, "Product not created");
    }
    await newProduct.save();
    return newProduct;
  },
};

export default productServices;
