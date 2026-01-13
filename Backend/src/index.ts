import dotenv from "dotenv";
dotenv.config();
import express from "express";
import allAPIRoutes from "./routes/routes";

const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json());

app.use('/api', allAPIRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});