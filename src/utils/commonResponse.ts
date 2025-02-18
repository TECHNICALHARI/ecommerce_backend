import { Response } from "express";
import { ZodError } from "zod";

export const successResponse = (res: Response, message: string, data: any) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const catchErrors = (res: Response, error: any) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Error",
      issues: error.errors,
    });
  }
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
};

export const errorResponse = (
  res: Response,
  errorCode: number,
  message: string
) => {
  res.status(errorCode).json({
    success: false,
    message,
  });
};
