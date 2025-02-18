import express from "express";
import cors from "cors";
import { corsOptions } from "./config/security";
import connectDB from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";
const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

connectDB();
app.use(errorHandler);

app.use("/api", router);

export default app;
