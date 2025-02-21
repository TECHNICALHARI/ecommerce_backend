import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { statusCodes } from "../utils/statusCodes";
import allMessages from "../utils/allMessages";
import { successResponse } from "../utils/successResponse";
import categoryServices from "../services/category.services";
import mongoose from "mongoose";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const category = await categoryServices.addCategory(req.body, files);
    successResponse(res, category, allMessages.success.created);
  }
);

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { search, page = 1, limit = 10 } = req.query;
  const data = await categoryServices.getCategory(
    search ? String(search) : "",
    Number(page),
    Number(limit)
  );
  successResponse(res, data, allMessages.success.fetched);
});

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const category = await categoryServices.updateCategory(req.body, files);
    successResponse(res, category, allMessages.success.updated);
  }
);
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.query;
    if (!id || !mongoose.Types.ObjectId.isValid(id as string)) {
      throw new ApiError(statusCodes.NOT_FOUND, allMessages.error.invalidId);
    }
    const category = await categoryServices.deleteCategory(id as string);
    if (!category) {
      throw new ApiError(statusCodes.NOT_FOUND, allMessages.error.notFound);
    }
    successResponse(res, category, allMessages.success.deleted);
  }
);
