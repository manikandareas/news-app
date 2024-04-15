import { z } from "zod";

export const NewsDTO = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }),

    category: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
});
