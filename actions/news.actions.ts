"use server";
import db from "@/lib/db";
import { ApiNewsResponse } from "@/types/api-news";
import { NewsDTO } from "@/types/news";
import axios from "axios";
import { z } from "zod";
import * as schema from "@/lib/db/schema";
import { validateRequest } from "@/lib/lucia";
export const getNewsFromAPI = async (url: string) => {
    const response = await axios.get<ApiNewsResponse>(url);

    if (!response.data.success)
        return {
            success: false,
        };

    return {
        success: true,
        data: response.data.data,
    };
};

export const insertNews = async (
    dto: z.infer<typeof NewsDTO> & { content: string; thumbnail: string }
) => {
    const { user } = await validateRequest();
    const validatedFields = NewsDTO.safeParse(dto);

    if (!validatedFields.success) {
        throw new Error("Invalid data");
    }

    try {
        await db.insert(schema.newsTable).values({
            authorId: user?.id as string,
            content: dto.content,
            title: validatedFields.data.title,
            thumbnail: dto.thumbnail,
            category: validatedFields.data.category.toLocaleLowerCase(),
            slug: validatedFields.data.slug,
        });

        return {
            success: true,
            message: "News published successfully",
        };
    } catch (error) {
        throw new Error("Failed to publish news");
    }
};

export const getNewsCategories = async () => {
    try {
        const res = await db.query.categoriesTable
            .findMany()
            .then((item) => item.map((item) => item.id));

        return {
            success: true,
            data: res,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getNewsFromDB = async () => {
    try {
        const res = await db.query.newsTable.findMany({
            orderBy: (news, { asc }) => [asc(news.pubDate)],
        });

        return {
            success: true,
            data: res,
        };
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};

export const getOneNewsBySlug = async (slug: string) => {
    try {
        const res = await db.query.newsTable.findFirst({
            where: (news, { eq }) => eq(news.slug, slug),
            with: {
                author: {
                    columns: {
                        username: true,
                    },
                },
            },
        });

        if (!res) throw new Error("News not found");
        return {
            success: true,
            data: res,
        };
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};
