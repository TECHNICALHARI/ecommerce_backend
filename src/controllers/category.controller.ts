import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Category } from "../models/category.model";
import { categoryTypes } from "../validations/product";
import { ApiError } from "../utils/ApiError";
import { statusCodes } from "../utils/statusCodes";
import allMessages from "../utils/allMessages";
import { successResponse } from "../utils/successResponse";
import { uploadToCloudinary } from "../utils/cloudinary";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name }: categoryTypes = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let icon = "";
    if (files.icon) {
      icon = await uploadToCloudinary(files.icon[0].buffer, "category");
    }
    if (!icon) {
      throw new ApiError(
        statusCodes.BAD_REQUEST,
        allMessages.validation.iconRequired
      );
    }
    const allreadyExists = await Category.findOne({ name });
    if (allreadyExists) {
      throw new ApiError(
        statusCodes.BAD_REQUEST,
        allMessages.error.alreadyExists
      );
    }
    const category = await Category.create({ name, icon });
    successResponse(res, category, allMessages.success.created);
  }
);
