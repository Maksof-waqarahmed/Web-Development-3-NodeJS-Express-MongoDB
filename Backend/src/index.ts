import dotenv from "dotenv";
dotenv.config();
import express from "express";
import allAPIRoutes from "./routes/routes";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json());

connectDB();

app.use('/api', allAPIRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});