"use server";

import db from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { lucia, validateRequest } from "@/lib/lucia";
import { SignInSchema, SignUpSchema } from "@/types/auth";
import * as argon2 from "@node-rs/argon2";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { z } from "zod";

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
    const hashedPassword = await argon2.hash(data.password);
    const userId = generateId(15);

    try {
        await db
            .insert(schema.userTable)
            .values({
                id: userId,
                username: data.username,
                hashedPassword,
            })
            .returning({
                id: schema.userTable.id,
                username: schema.userTable.username,
            });

        const session = await lucia.createSession(userId, {
            expiresIn: 60 * 60 * 24 * 30,
        });

        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return {
            success: true,
            data: {
                userId,
            },
        };
    } catch (error: any) {
        return {
            success: false,
            error: error?.message,
        };
    }
};

export const signOut = async () => {
    try {
        const { session } = await validateRequest();

        if (!session) return { error: "Unauthorized" };

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
    } catch (error: any) {
        return {
            success: false,
            error: error?.message,
        };
    }
};

export const signIn = async (data: z.infer<typeof SignInSchema>) => {
    const existingUser = await db.query.userTable.findFirst({
        where: (user, { eq }) => eq(user.username, data.username),
    });

    if (!existingUser) return { error: "User not found" };

    if (!existingUser.hashedPassword) return { error: "User not found" };

    const isValidPassword = await argon2.verify(
        existingUser.hashedPassword,
        data.password
    );

    if (!isValidPassword) return { error: "Incorrect username or password" };

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return {
        success: "Successfully signed in",
    };
};
