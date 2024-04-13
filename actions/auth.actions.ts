"use server";

import db from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { lucia, validateRequest } from "@/lib/lucia";
import * as argon2 from "@node-rs/argon2";
import { generateId } from "lucia";
import { cookies } from "next/headers";

export const signUp = async () => {
    const hashedPassword = await argon2.hash("password");
    const userId = generateId(15);

    try {
        await db
            .insert(schema.userTable)
            .values({
                id: userId,
                username: "test",
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
