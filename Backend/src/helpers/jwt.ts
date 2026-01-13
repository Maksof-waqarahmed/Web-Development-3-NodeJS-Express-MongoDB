import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
    return jwt.sign(user, process.env.JWT_SECRET! ?? '123', { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET! ?? '123');
};
