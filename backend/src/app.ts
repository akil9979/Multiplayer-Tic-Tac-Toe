import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());



app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
));



app.use("/api/v1/users",userRoutes);

export default app;