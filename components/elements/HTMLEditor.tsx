"use client";

import { Editor } from "@tinymce/tinymce-react";
import { forwardRef } from "react";
import { Skeleton } from "../ui/skeleton";
type HTMLEditorProps = {
    onChange: (e: string) => void;
    onClick: () => void;
    initialValue?: string;
};

const HTMLEditor = forwardRef<Editor, HTMLEditorProps>(function HTMLEditor(
    props,
    ref
) {
    if (!ref) return <Skeleton className="w-full rounded-xl h-[30vh]" />;
    return (
        <Editor
            onClick={props.onClick}
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY ?? ""}
            ref={ref}
            initialValue={props.initialValue}
            onEditorChange={props.onChange}
            // onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                ],
                toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
        />
    );
});

export default HTMLEditor;
