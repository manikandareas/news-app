"use client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
type CloudinaryUploadProps = {
    onUploadSuccess: (results: CloudinaryUploadWidgetInfo) => void;
};

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = (props) => {
    return (
        <div className="flex-1 border flex justify-center items-center min-h-[15vh] rounded-xl ">
            <CldUploadWidget
                options={{
                    sources: ["local", "unsplash", "url", "google_drive"],
                    multiple: false,
                    maxFiles: 1,
                }}
                onSuccess={(results, { widget }) => {
                    console.log({ results });

                    props.onUploadSuccess(
                        results.info as CloudinaryUploadWidgetInfo
                    );
                    widget.close();
                }}
                signatureEndpoint={"/api/sign-image"}
            >
                {({ open }) => {
                    const handleOnClick = () => {
                        props.onUploadSuccess({} as any);
                        open();
                    };
                    return (
                        <button
                            className="text-muted-foreground text-sm"
                            onClick={handleOnClick}
                        >
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};
export default CloudinaryUpload;
