import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import brandServices from "../services/brand.services";
import { successResponse } from "../utils/successResponse";
import allMessages from "../utils/allMessages";
import { fileType } from "../types/types";
import { brandTypes } from "../validations/product";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";
import { statusCodes } from "../utils/statusCodes";

export const addBrand = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as fileType;
  const brand = await brandServices.addBrand(req.body, files);
  successResponse(res, brand, allMessages.success.created);
});

export const getBrand = asyncHandler(async (req: Request, res: Response) => {
  const { search, page = 1, limit = 10 } = req.query;
  const brand = await brandServices.getBrand(
    search ? String(search) : "",
    Number(page),
    Number(limit)
  );
  successResponse(res, brand, allMessages.success.fetched);
});

export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as fileType;
  const brand = await brandServices.updateBrand(req.body, files);
  successResponse(res, brand, allMessages.success.updated);
});
export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id || !mongoose.Types.ObjectId.isValid(id as string)) {
    throw new ApiError(statusCodes.NOT_FOUND, allMessages.error.invalidId);
  }
  const brand = await brandServices.deleteBrand(id as string);
  successResponse(res, brand, allMessages.success.deleted);
});
