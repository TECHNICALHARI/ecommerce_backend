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
import { uploadToCloudinary } from "../utils/cloudinary";

export const addProduct = async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return errorResponse(res, statusCodes.BAD_REQUEST, "No files uploaded");
    }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let thumbnail = "";
    let imageUrls: string[] = [];
    if (files.thumbnail && files.thumbnail.length > 0) {
      thumbnail = await uploadToCloudinary(
        files.thumbnail[0].buffer,
        "products"
      );
    }

    if (files.imageUrls && files.imageUrls.length > 0) {
      imageUrls = await Promise.all(
        files.imageUrls.map((file) =>
          uploadToCloudinary(file.buffer, "products")
        )
      );
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
