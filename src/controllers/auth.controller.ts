import { Request, Response } from "express";
import authServices from "../services/auth.services";
import { catchErrors, successResponse } from "../utils/commonResponse";
import { loginSchema, registerSchema } from "../validations/auth";
import allMessages from "../utils/allMessages";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    await authServices.register(registerSchema.parse(req.body), res);
  } catch (error) {
    catchErrors(res, error);
  }
};
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const user = await authServices.Login(validatedData, res);
    successResponse(res, allMessages.auth.loginSuccess, user);
  } catch (error) {
    catchErrors(res, error);
  }
};
