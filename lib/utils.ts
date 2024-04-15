import { apiNewsEndpoints } from "@/constants/api-news";
import { type ClassValue, clsx } from "clsx";
import { formatRelative, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const findPathWithCategory = (source: string, category: string) => {
    return apiNewsEndpoints
        .find((item) => item.name === source)
        ?.paths.find((item) => item.name === category)?.path;
};

export const pubDate = (date: string | Date): string => {
    return formatRelative(subDays(new Date(date), 0), new Date());
};

export { v4 as uuidV4 } from "uuid";
