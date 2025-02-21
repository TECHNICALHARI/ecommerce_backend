import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller";
import { addProduct } from "../controllers/product.controller";
import { authMiddleware, verifyRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";
import { loginSchema, registerSchema } from "../validations/auth";
import validate from "../middlewares/zodMiddleware";
import { brandSchema, categorySchema } from "../validations/product";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { uploadImages } from "../middlewares/multer.middleware";
import {
  addBrand,
  deleteBrand,
  getBrand,
  updateBrand,
} from "../controllers/brand.controller";

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
adminRoutes.post(
  "/brand",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadImages(["icon"]),
  validate(brandSchema),
  addBrand
);
adminRoutes.put(
  "/brand",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadImages(["icon"]),
  validate(brandSchema),
  updateBrand
);
adminRoutes.get(
  "/brand",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  getBrand
);
adminRoutes.delete(
  "/brand",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  deleteBrand
);

export default adminRoutes;
