import { Request, Response } from "express";
import { productSchema } from "../validations/product";
import productServices from "../services/product.services";
import { statusCodes } from "../utils/statusCodes";
import allMessages from "../utils/allMessages";
import { Product } from "../models/product.model";
import {
  uploadMultipleToCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { successResponse } from "../utils/successResponse";

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.files) {
    throw new ApiError(statusCodes.BAD_REQUEST, allMessages.error.noFiles);
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const thumbnailFiles = files.thumbnail || [];
  const imageUrlsFiles = files.imageUrls || [];

  if (thumbnailFiles.length === 0) {
    throw new ApiError(statusCodes.BAD_REQUEST, "Thumbnail image is required.");
  }
  if (imageUrlsFiles.length === 0) {
    throw new ApiError(statusCodes.BAD_REQUEST, "At least one image is required.");
  }
  let uploadedImages  = await uploadMultipleToCloudinary(files, "products");
  if (!uploadedImages?.thumbnail || uploadedImages.thumbnail.length === 0) {
    throw new ApiError(statusCodes.BAD_REQUEST, "Thumbnail upload failed.");
  }
  if (!uploadedImages?.imageUrls || uploadedImages.imageUrls.length === 0) {
    throw new ApiError(statusCodes.BAD_REQUEST, "Product images upload failed.");
  }
  const parsedData = {
    ...req.body,
    imageUrls: uploadedImages?.imageUrls,
    thumbnail: uploadedImages?.thumbnail[0],
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
