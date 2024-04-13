"use server";
import { ApiNewsResponse } from "@/types/api-news";
import axios from "axios";
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
