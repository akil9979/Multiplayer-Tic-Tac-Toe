import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

// app.use("/api/v1/users", userRoutes);

export default app;