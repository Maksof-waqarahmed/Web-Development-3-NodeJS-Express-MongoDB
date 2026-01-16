import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MongoDB_URI!);
        console.log("Mongoose connected");
    } catch (error) {
        console.log("Mongoose connection error", error);
        process.exit(1);
    }
}