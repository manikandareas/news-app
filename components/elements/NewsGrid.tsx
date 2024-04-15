"use client";
import { getNewsFromAPI } from "@/actions/news.actions";
import { findPathWithCategory, pubDate, uuidV4 } from "@/lib/utils";
import { ApiNewsCategories } from "@/types/api-news";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
    BentoGrid,
    BentoGridItem,
    BentoGridItemSkeleton,
} from "../ui/bento-grid";
import SelectCategories from "./SelectCategories";
type NewsGridProps = {
    categories: ApiNewsCategories[];
    params: string;
};

const NewsGrid: React.FC<NewsGridProps> = (props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["news", searchParams.get("category"), props.params],
        queryFn: () =>
            getNewsFromAPI(
                findPathWithCategory(
                    props.params,
                    searchParams.get("category") as string
                ) ?? props.categories[0].path
            ),
    });

    const onSelectedCategoryChange = (category: string) => {
        const stringCategory = category.split(";")[1];

        const params = new URLSearchParams(searchParams);

        if (category) {
            params.set("category", stringCategory);
        } else {
            params.delete("category");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    if (isLoading)
        return (
            <BentoGrid className=" w-full  py-10 mx-auto">
                {Array(9)
                    .fill(0)
                    .map((_, idx) => (
                        <BentoGridItemSkeleton key={uuidV4()} />
                    ))}
            </BentoGrid>
        );
    if (!data?.data)
        return (
            <p className="text-muted-foreground">
                This category does not exist
            </p>
        );
    return (
        <div className=" space-y-10 py-4 px-1 lg:px-0">
            <SelectCategories
                onChange={onSelectedCategoryChange}
                values={props.categories}
            />
            <BentoGrid className=" mx-auto">
                {data.data.posts.map((item, i) => (
                    <BentoGridItem
                        key={uuidV4()}
                        title={item.title}
                        description={item.description}
                        header={
                            <NewsImage
                                src={item.thumbnail}
                                alt="Burger"
                                key={uuidV4()}
                            />
                        }
                        icon={
                            <span className="text-xs text-muted-foreground">
                                {pubDate(item.pubDate)}
                            </span>
                        }
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </div>
    );
};

export const NewsImage = (props: { src: string; alt: string }) => {
    return (
        <div className="relative flex-1 w-full h-full min-h-[10rem] rounded-xl">
            <Image
                src={props.src}
                alt={props.alt}
                className="w-full object-cover object-center h-full rounded-xl"
                fill
            />
        </div>
    );
};
export default NewsGrid;
