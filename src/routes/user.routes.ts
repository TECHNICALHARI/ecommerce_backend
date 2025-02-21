import { Router } from "express";
import { getCategory } from "../controllers/category.controller";

const userRoutes = Router();

userRoutes.get("/category", getCategory)

export default userRoutes;