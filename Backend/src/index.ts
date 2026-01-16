import dotenv from "dotenv";
dotenv.config();
import express from "express";
import allAPIRoutes from "./routes/routes";
import { connectDB } from "./config/db";
import cors from "cors";

const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FE_URL,
    credentials: true,
}));

connectDB();

app.use('/api', allAPIRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});