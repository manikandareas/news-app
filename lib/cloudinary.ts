import axios from "axios";

export const deleteImageCloudinary = async (publicId: string) => {
    try {
        const res = await axios.delete(`/api/destroy-image?url=${publicId}`);

        if (res.data.status === 200)
            return {
                success: true,
            };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};
