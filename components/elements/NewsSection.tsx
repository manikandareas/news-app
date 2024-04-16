"use client";
import { getEditorNews, getNewsFromDB } from "@/actions/news.actions";
import { useSession } from "@/context/SessionContext";
import { pubDate, uuidV4 } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
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
                    <BentoGridItem
                        isEditor={false}
                        title={item.title}
                        description={""}
                        href={`/news/manik/${item.slug}`}
                        key={uuidV4()}
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
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </div>
    );
};
export default NewsSection;

export const NewsEditorSection = () => {
    const { user } = useSession();
    const { data, isLoading } = useQuery({
        queryKey: ["news", "editor", user?.id],
        queryFn: () => getEditorNews(user?.id!),
    });

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

    if (!data?.data) return <p>Look like you don&apos;t have any news</p>;
    return (
        <div className=" space-y-10 py-4 px-1 lg:px-0">
            <BentoGrid className=" mx-auto">
                {data.data.map((item, i) => (
                    <BentoGridItem
                        isEditor={true}
                        id={item.id}
                        key={uuidV4()}
                        title={item.title}
                        description={""}
                        href={`/news/manik/${item.slug}`}
                        slug={item.slug}
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
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </div>
    );
};
