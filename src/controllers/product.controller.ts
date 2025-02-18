import { Request, Response } from "express";
import {
  catchErrors,
  errorResponse,
  successResponse,
} from "../utils/commonResponse";
import { productSchema } from "../validations/product";
import productServices from "../services/product.services";
import { statusCodes } from "../utils/statusCodes";
import allMessages from "../utils/allMessages";
import { Product } from "../models/product.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);
    const userId = req.user?.id;
    if (!userId) {
      return errorResponse(
        res,
        statusCodes.NOT_FOUND,
        allMessages.auth.notFound
      );
    }
    const product = await productServices.addProduct(
      res,
      validatedData,
      userId
    );
    if (!product || !(product instanceof Product)) {
      return errorResponse(
        res,
        statusCodes.BAD_REQUEST,
        allMessages.product.addProductError
      );
    }
    const { createdBy, ...sendProduct } = product.toObject();
    return successResponse(res, "Product added successfully", {
      product: sendProduct,
    });
  } catch (error) {
    catchErrors(res, error);
  }
};
