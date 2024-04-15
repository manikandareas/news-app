import { NextResponse } from "next/server";
import sha1 from "sha1";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const publicId = searchParams.get("url");
        if (!publicId) {
            return NextResponse.json({
                success: false,
                message: "no url found",
            });
        }

        const timestamp = new Date().getTime();
        const string = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
        const signature = sha1(string);

        const formData = new FormData();
        formData.append("public_id", publicId);
        formData.append("signature", signature);
        formData.append(
            "api_key",
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
        );
        formData.append("timestamp", timestamp.toString());

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
            {
                method: "POST",
                body: formData,
            }
        );
        await res.json();
        return NextResponse.json({
            message: "Success",
            status: 200,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Error", status: 500 });
    }
}
