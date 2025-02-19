import { NextFunction, Request, Response } from "express";
import allMessages from "../utils/allMessages";
import { statusCodes } from "../utils/statusCodes";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/config";
import { ApiError } from "../utils/ApiError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError(statusCodes.UNAUTHORIZED, allMessages.auth.noToken);
    }
    const decoded = jwt.verify(token, appConfig.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(statusCodes.UNAUTHORIZED, allMessages.auth.invalidToken);
  }
};

export const verifyRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        statusCodes.UNAUTHORIZED,
        allMessages.auth.unauthorized
      );
    }
    next();
  };
};
