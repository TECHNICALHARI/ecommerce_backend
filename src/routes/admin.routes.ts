import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller";
import { addProduct } from "../controllers/product.controller";
import { authMiddleware, verifyRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";
import {
  uploadMultipleImages,
} from "../middlewares/multer.middleware";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post(
  "/product",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadMultipleImages,
  addProduct
);

export default adminRouter;
