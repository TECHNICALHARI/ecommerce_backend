import mongoose from "mongoose";
import { ProductInputTypes } from "../validations/product";
import { Product } from "../models/product.model";
import { Response } from "express";
import slugify from "slugify";
import multer from "multer";
import { ApiError } from "../utils/ApiError";
import { statusCodes } from "../utils/statusCodes";
import allMessages from "../utils/allMessages";

const productServices = {
  addProduct: async (
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
      throw new ApiError(
        statusCodes.BAD_REQUEST,
        allMessages.error.somethingWrong
      );
    }
    await newProduct.save();
    return newProduct;
  },
};

export default productServices;
