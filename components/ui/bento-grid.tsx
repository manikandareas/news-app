"use client";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import Link from "next/link";
import { Button } from "./button";
import { Edit2, Trash2 } from "lucide-react";
import DialogDeleteNews from "../elements/DialogDeleteNews";
import { useRouter } from "next/navigation";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[22.5rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    href,
    isEditor,
    slug,
    id,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    href: string;
    isEditor: boolean;
    id?: number;
    slug?: string;
}) => {
    const router = useRouter();
    return (
        <div
            className={cn(
                "row-span-1 relative rounded-xl group/bento hover:shadow-xl z-10 transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
        >
            {isEditor && (
                <div className="absolute right-2 top-2 bg-background/50 backdrop-blur-sm rounded-md z-40">
                    <Button
                        onClick={() => router.push(`/editor/${slug}/edit`)}
                        variant={"outline"}
                        size={"icon"}
                        className="size-10 text-blue-500 p-0"
                    >
                        <Edit2 size={14} />
                    </Button>
                    <DialogDeleteNews id={id!} slug={slug!} />
                </div>
            )}
            {header}
            <div
                onClick={() => router.push(href)}
                className="hover:cursor-pointer group-hover/bento:translate-x-2 transition duration-200"
            >
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans truncate font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};

export const BentoGridItemSkeleton = () => {
    return (
        <div
            className={cn(
                "row-span-1 w-full h-full relative rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4"
            )}
        >
            <Skeleton className="w-full h-[12rem] rounded-xl" />
            <div className="group-hover/bento:translate-x-2 transition space-y-4 duration-200">
                <div className="space-y-1.5">
                    <Skeleton className="rounded-md h-4 w-2/3  " />
                    <Skeleton className="rounded-md h-4 w-1/3 " />
                </div>

                <div className="space-y-1.5">
                    <Skeleton className="rounded-md h-4 w-5/6" />
                    <Skeleton className="rounded-md h-4 w-4/5" />
                </div>
            </div>
        </div>
    );
};
