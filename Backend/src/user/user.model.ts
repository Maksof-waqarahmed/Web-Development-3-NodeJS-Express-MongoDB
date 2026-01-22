import mongoose from "mongoose";

interface UserModel {
    name: string;
    email: string;
    password: string;
    number?: string;
    token?: string | null;
    role: "user" | "admin";
    isActive: boolean;
    lastLogin?: Date;
}

const userSchema = new mongoose.Schema<UserModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        token: {
            type: String,
            default: null,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<UserModel>("User", userSchema);
