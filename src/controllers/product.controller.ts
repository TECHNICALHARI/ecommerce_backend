import { Request, Response } from "express";
import productServices from "../services/product.services";
import allMessages from "../utils/allMessages";
import { asyncHandler } from "../middlewares/asyncHandler";
import { successResponse } from "../utils/successResponse";
import { fileType } from "../types/types";

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as fileType;
  const userId = req.user?.id
  const product = await productServices.addProduct(req.body, files, userId);
  successResponse(res, product, allMessages.success.created);
});
