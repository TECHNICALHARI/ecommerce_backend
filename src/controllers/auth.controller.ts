import { Request, Response } from "express";
import authServices from "../services/auth.services";
import allMessages from "../utils/allMessages";
import { asyncHandler } from "../middlewares/asyncHandler";
import { successResponse } from "../utils/successResponse";

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await authServices.register(req.body);
    successResponse(res, user, allMessages.auth.registerSuccess);
  }
);
export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const user = await authServices.Login(req.body, res);
  successResponse(res, user, allMessages.auth.loginSuccess);
});
