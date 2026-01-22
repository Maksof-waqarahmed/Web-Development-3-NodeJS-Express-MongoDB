import { Request, Response } from "express";
import { LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema } from "./user.schema";
import User from "./user.model";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../helpers/jwt";
import { sendEmail } from "../config/smtp";
import { emailTemplates } from "../helpers/emailTempltes";

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

        const token = generateToken({ email });
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            token,
        });

        const verifyUrl = `http://localhost:3000/verify?token=${newUser.token}`;

        await sendEmail({ email: newUser.email, subject: "Verify Your Email", template: emailTemplates(newUser.name, verifyUrl).VerifyEmail });

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
            message: "Internal server error " + err,
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

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password or user is not active",
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

        await sendEmail({ email: user.email, subject: "Welcome to Ecommerce! Get started with your account", template: emailTemplates(user.name).Welcome });

        await user.updateOne({ lastLogin: new Date() });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: { accessToken },
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
}

export const verifyEmail = async (req: Request<{}, {}, {}, { token: string }>,
    res: Response) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required",
            });
        }

        const decodedToken: any = verifyToken(token);
        const user = await User.findOne({ email: decodedToken.email });

        if (user?.isActive) {
            return res.status(400).json({
                success: false,
                message: "User is already active",
            });
        }

        user!.isActive = true;
        user!.token = null;
        await user!.save();

        return res.status(200).json({
            success: true,
            message: "User verified successfully",
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ isActive: true }).select("-password -token -__v");

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
}

export const getById = async (req: Request<{ id: string }>, res: Response) => {
    try {

        const { id } = req.params;

        const user = await User.findById(id).select("-password -token -__v");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
}

export const updateUser = async (
    req: Request<{ id: string }, {}, Partial<RegisterUserInput>>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const filteredData: any = {};
        Object.keys(updateData).forEach((key) => {
            const value = (updateData as any)[key];
            if (value !== null && value !== undefined && value !== "") {
                filteredData[key] = value;
            }
        });

        if (filteredData.password) {
            filteredData.password = await bcrypt.hash(filteredData.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: filteredData },
            { new: true, runValidators: true, context: "query" }
        ).select("-password -token -__v");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndUpdate(id, { isActive: false }, { new: true })

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error " + error,
        });
    }
};