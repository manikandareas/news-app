import { SignApiOptions, v2 as cld } from "cloudinary";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = (await request.json()) as { paramsToSign: SignApiOptions };

    const { paramsToSign } = body;

    const signature = cld.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET as string
    );

    return Response.json({ signature });
}
