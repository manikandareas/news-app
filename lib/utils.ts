import { apiNewsEndpoints } from "@/constants/api-news";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const findPathWithCategory = (source: string, category: string) => {
    return apiNewsEndpoints
        .find((item) => item.name === source)
        ?.paths.find((item) => item.name === category)?.path;
};
