import express from "express";
import adminRouter from "./admin.routes";
import userRoutes from "./user.routes";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/", userRoutes);

export default router;
