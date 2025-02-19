import { Request, Response } from "express";
import { productSchema } from "../validations/product";
import productServices from "../services/product.services";
import { statusCodes } from "../utils/statusCodes";
import allMessages from "../utils/allMessages";
import { Product } from "../models/product.model";
import { uploadToCloudinary } from "../utils/cloudinary";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { successResponse } from "../utils/successResponse";

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.files) {
    throw new ApiError(statusCodes.BAD_REQUEST, allMessages.error.noFiles);
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  let thumbnail = "";
  let imageUrls: string[] = [];
  if (files.thumbnail && files.thumbnail.length > 0) {
    thumbnail = await uploadToCloudinary(files.thumbnail[0].buffer, "products");
  }
  if (files.imageUrls && files.imageUrls.length > 0) {
    imageUrls = await Promise.all(
      files.imageUrls.map((file) => uploadToCloudinary(file.buffer, "products"))
    );
  }
  if (!thumbnail || !(imageUrls?.length > 0)) {
    const errorMessage = !thumbnail
      ? "Thumbnail image is required."
      : "At least one image URL is required.";
    throw new ApiError(statusCodes.BAD_REQUEST, errorMessage);
  }
  const parsedData = {
    ...req.body,
    imageUrls,
    thumbnail,
    price: Number(req.body.price),
    countInStock: Number(req.body.countInStock),
  };
  const validatedData = productSchema.parse(parsedData);
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(statusCodes.NOT_FOUND, allMessages.auth.notFound);
  }
  const product = await productServices.addProduct(validatedData, userId);
  if (!product || !(product instanceof Product)) {
    throw new ApiError(
      statusCodes.BAD_REQUEST,
      allMessages.product.addProductError
    );
  }
  const { createdBy, ...sendProduct } = product.toObject();
  successResponse(res, sendProduct, allMessages.product.created);
});
