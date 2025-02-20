import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller";
import { addProduct } from "../controllers/product.controller";
import { authMiddleware, verifyRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";
import { uploadMultipleImages, uploadSingleImage } from "../middlewares/multer.middleware";
import { loginSchema, registerSchema } from "../validations/auth";
import validate from "../middlewares/zodMiddleware";
import { categorySchema } from "../validations/product";
import { createCategory } from "../controllers/category.controller";

const adminRoutes = express.Router();

adminRoutes.post("/register", validate(registerSchema), registerAdmin);
adminRoutes.post("/login", validate(loginSchema), loginAdmin);
adminRoutes.post(
  "/product",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadMultipleImages,
  addProduct
);
adminRoutes.post(
  "/category",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  validate(categorySchema),
  uploadSingleImage,
  createCategory
);

export default adminRoutes;
