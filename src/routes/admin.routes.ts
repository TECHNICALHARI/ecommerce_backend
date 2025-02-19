import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller";
import { addProduct } from "../controllers/product.controller";
import { authMiddleware, verifyRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";
import { uploadMultipleImages } from "../middlewares/multer.middleware";
import { loginSchema, registerSchema } from "../validations/auth";
import validate from "../middlewares/zodMiddleware";
import { productSchema } from "../validations/product";

const adminRouter = express.Router();

adminRouter.post("/register", validate(registerSchema), registerAdmin);
adminRouter.post("/login", validate(loginSchema), loginAdmin);
adminRouter.post(
  "/product",
  authMiddleware,
  verifyRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  uploadMultipleImages,
  addProduct
);

export default adminRouter;
