"use client";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
type ImagesDropzoneProps = {
    getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
};

const ImagesDropzone: React.FC<ImagesDropzoneProps> = (props) => {
    const { getRootProps, getInputProps } = props;

    return (
        <section className="w-full border border-dotted rounded-xl flex bg-secondary/10 backdrop-blur-sm items-center justify-center h-[15vh] bg-muted-">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p className="text-muted-foreground text-sm">
                    Drag &apos;n&apos; drop some files here, or click to select
                    files
                </p>
            </div>
            {/* <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside> */}
        </section>
    );
};
export default ImagesDropzone;
