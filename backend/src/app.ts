import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

const app = express();



app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
));

app.use(express.json());

// app.use("/api/v1/users", userRoutes);

export default app;