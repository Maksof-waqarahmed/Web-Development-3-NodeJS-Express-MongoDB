import { Request, Response } from "express";
import { LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema } from "./user.schema";
import User from "./user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/jwt";

export const registerUser = async (
    req: Request<{}, {}, RegisterUserInput>,
    res: Response
) => {
    try {
        const parsed = registerUserSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(err => err.message),
            });
        }

        const { name, email, password } = parsed.data;

        const isUserFound = await User.findOne({ email });

        if (isUserFound) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const login = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response
) => {
    try {
        const parsed = loginUserSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                errors: parsed.error.issues.map(err => err.message),
            });
        }

        const { email, password } = parsed.data;

        const user = await User.findOne({ email }).select("+password");


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const payload = {
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const accessToken = generateToken(payload);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: { accessToken },
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}