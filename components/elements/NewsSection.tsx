"use client";
import { getNewsFromDB } from "@/actions/news.actions";
import { pubDate, uuidV4 } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
    BentoGrid,
    BentoGridItem,
    BentoGridItemSkeleton,
} from "../ui/bento-grid";
import { NewsImage } from "./NewsGrid";

type NewsSectionProps = {};

const NewsSection: React.FC<NewsSectionProps> = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["news", "manik"],
        queryFn: () => getNewsFromDB(),
    });

    if (!data?.data)
        return (
            <BentoGrid className=" w-full  py-10 mx-auto">
                {Array(9)
                    .fill(0)
                    .map((_, idx) => (
                        <BentoGridItemSkeleton key={uuidV4()} />
                    ))}
            </BentoGrid>
        );
    return (
        <div className=" space-y-10 py-4 px-1 lg:px-0">
            <BentoGrid className=" mx-auto">
                {data.data.map((item, i) => (
                    <Link href={`/news/manik/${item.slug}`} key={uuidV4()}>
                        <BentoGridItem
                            title={item.title}
                            description={""}
                            header={
                                <NewsImage
                                    src={item.thumbnail}
                                    alt="Burger"
                                    key={uuidV4()}
                                />
                            }
                            icon={
                                <span className="text-xs text-muted-foreground">
                                    {pubDate(item.pubDate!)}
                                </span>
                            }
                            className={
                                i === 3 || i === 6 ? "md:col-span-2" : ""
                            }
                        />
                    </Link>
                ))}
            </BentoGrid>
        </div>
    );
};
export default NewsSection;
