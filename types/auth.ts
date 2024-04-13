import { z } from "zod";
export const SignUpSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: "Username must be at least 2 characters long" })
            .max(50),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(50),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(50),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const SignInSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters long" })
        .max(50),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50),
});
