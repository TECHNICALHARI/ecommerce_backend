import { NextFunction, Request, Response } from "express";
import { catchErrors, errorResponse } from "../utils/commonResponse";
import allMessages from "../utils/allMessages";
import { statusCodes } from "../utils/statusCodes";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return errorResponse(
        res,
        statusCodes.UNAUTHORIZED,
        allMessages.auth.noToken
      );
    }
    const decoded = jwt.verify(token, appConfig.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(
      res,
      statusCodes.UNAUTHORIZED,
      allMessages.auth.invalidToken
    );
  }
};

export const verifyRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        statusCodes.UNAUTHORIZED,
        allMessages.auth.unauthorized
      );
    }
    next();
  };
};
