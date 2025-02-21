import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller";
import { addProduct } from "../controllers/product.controller";
import { authMiddleware, verifyRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";
import { loginSchema, registerSchema } from "../validations/auth";
import validate from "../middlewares/zodMiddleware";
import { categorySchema } from "../validations/product";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { uploadImages } from "../middlewares/multer.middleware";

const adminRoutes = express.Router();

adminRoutes.post("/register", validate(registerSchema), registerAdmin);
adminRoutes.post("/login", validate(loginSchema), loginAdmin);
adminRoutes.post(
  "/product",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadImages(["thumbnail", "imageUrls"]),
  addProduct
);
adminRoutes.post(
  "/category",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadImages(["icon"]),
  validate(categorySchema),
  createCategory
);
adminRoutes.get(
  "/category",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  getCategory
);
adminRoutes.put(
  "/category",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadImages(["icon"]),
  validate(categorySchema),
  updateCategory
);
adminRoutes.delete(
  "/category",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  deleteCategory
);

export default adminRoutes;
