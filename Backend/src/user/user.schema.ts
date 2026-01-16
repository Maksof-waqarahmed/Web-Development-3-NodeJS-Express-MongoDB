import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .trim(),

  email: z.email("Invalid email address").toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be exactly 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 capital letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
});

export const loginUserSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
  password: z.string().min(8, "Password must be exactly 8 characters"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;