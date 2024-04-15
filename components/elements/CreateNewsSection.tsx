"use client";

import { getNewsCategories, insertNews } from "@/actions/news.actions";
import { deleteImageCloudinary } from "@/lib/cloudinary";
import { NewsDTO } from "@/types/news";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { Loader2, X } from "lucide-react";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CloudinaryUpload from "./CloudinaryUpload";
import EditorTips from "./EditorTips";
import HTMLEditor from "./HTMLEditor";
import PreviewSection from "./PreviewSection";

type CreateNewsSectionProps = {};

const CreateNewsSection: React.FC<CreateNewsSectionProps> = () => {
    const editorRef = useRef<Editor>(null);
    const [content, setContent] = useState<string>("");
    const [activeField, setActiveField] = useState<
        "title" | "content" | "category" | "slug" | "thumbnail"
    >("title");
    const [resultsUpload, setResultsUpload] = useState<any>({});
    const [previewValue, setPreviewValue] = useState<{
        title: string;
        content: string;
        category: string;
        slug: string;
        thumbnail: string;
    }>({} as any);

    const { data: categories } = useQuery({
        queryKey: ["news-categories"],
        queryFn: () => getNewsCategories(),
    });

    const { isPending, mutateAsync } = useMutation({
        mutationFn: (
            body: z.infer<typeof NewsDTO> & {
                content: string;
                thumbnail: string;
            }
        ) => insertNews(body),
        onError: () => {
            toast.error("Failed to create news");
        },
        onSuccess: () => {
            toast.success("News created successfully");
            handleClear();
        },
    });

    const formNews = useForm<z.infer<typeof NewsDTO>>({
        resolver: zodResolver(NewsDTO),
        defaultValues: {
            category: "",
            slug: "",
            title: "",
        },
    });

    const onUploadSuccess = (results: CloudinaryUploadWidgetInfo) => {
        setResultsUpload(results);
    };

    const handleDeleteImage = async () => {
        const res = await deleteImageCloudinary(resultsUpload.public_id);
        if (res?.success) {
            setResultsUpload({} as CloudinaryUploadWidgetInfo);
            return {
                success: true,
            };
        } else {
            toast.error("Failed to delete image");
            console.log({ errro: res?.error });
            return {
                success: false,
            };
        }
    };

    const handlePublish = async (values: z.infer<typeof NewsDTO>) => {
        await mutateAsync({
            ...values,
            content,
            thumbnail: resultsUpload.url,
        });
    };

    const handleClear = async () => {
        setContent("");
        formNews.reset();
        editorRef.current?.editor?.resetContent();
        if (resultsUpload) {
            const res = await handleDeleteImage();
            res.success && setResultsUpload({});
        }
    };

    return (
        <Tabs defaultValue="editor" className=" mx-auto">
            <TabsList className="md:justify-end w-full md:bg-transparent">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger disabled value="preview">
                    Preview
                </TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="flex gap-x-4">
                <div className="space-y-4 w-full">
                    {/* Thumbnail */}
                    <div
                        className="space-y-1.5 flex flex-col mb-4"
                        onClick={() => setActiveField("thumbnail")}
                    >
                        <Label className="">Thumbnail</Label>

                        {!resultsUpload.url ? (
                            <CloudinaryUpload
                                onUploadSuccess={onUploadSuccess}
                            />
                        ) : (
                            <div className="w-full rounded-xl h-[30vh] relative overflow-hidden">
                                <Button
                                    className="absolute top-2 right-2 aspect-square p-1 bg-primary-foreground/50 backdrop-blur-sm rounded-full z-10"
                                    variant={"outline"}
                                    onClick={handleDeleteImage}
                                >
                                    <X />
                                </Button>
                                <Image
                                    src={resultsUpload.url as string}
                                    fill
                                    alt={
                                        resultsUpload.original_filename as string
                                    }
                                    className="object-cover object-center"
                                />
                            </div>
                        )}
                    </div>
                    <Form {...formNews}>
                        <form
                            className="space-y-4"
                            onSubmit={formNews.handleSubmit(handlePublish)}
                        >
                            <FormField
                                control={formNews.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem
                                        onClick={() => setActiveField("title")}
                                    >
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="News title..."
                                                className="max-w-sm text-xl font-extrabold border-none"
                                                required
                                                aria-required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid sm:grid-cols-2 gap-x-8 sm:items-center sm:justify-between">
                                <FormField
                                    control={formNews.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem
                                            onClick={() =>
                                                setActiveField("category")
                                            }
                                        >
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                onOpenChange={() =>
                                                    setActiveField("category")
                                                }
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="capitalize">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.data?.map(
                                                        (item) => (
                                                            <SelectItem
                                                                className="capitalize"
                                                                key={item}
                                                                value={item}
                                                            >
                                                                {item}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formNews.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem
                                            onClick={() =>
                                                setActiveField("slug")
                                            }
                                        >
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Create a slug..."
                                                    className=""
                                                    required
                                                    aria-required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="content">Content</Label>
                                <HTMLEditor
                                    onClick={() => setActiveField("content")}
                                    onChange={(e) => setContent(e)}
                                    ref={editorRef}
                                />
                            </div>
                            <div className="space-x-1.5">
                                <Button
                                    type="submit"
                                    className="space-x-1.5"
                                    disabled={isPending}
                                >
                                    {!isPending ? (
                                        "Publish"
                                    ) : (
                                        <>
                                            <span>Publishing</span>
                                            <Loader2 className="animate-spin" />
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={handleClear}
                                    className=""
                                    type="button"
                                    variant={"ghost"}
                                >
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {/* Content editor */}
                </div>
                <EditorTips activeFields={activeField} />
            </TabsContent>
            <TabsContent value="preview">
                <PreviewSection {...previewValue} />
            </TabsContent>
        </Tabs>
    );
};
export default CreateNewsSection;
