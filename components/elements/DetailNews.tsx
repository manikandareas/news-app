"use client";
import { getOneNewsBySlug } from "@/actions/news.actions";
import { pubDate } from "@/lib/utils";
import "@/styles/News-styles.css";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { TracingBeam } from "../ui/tracing-beam";
import { AvatarImg } from "./AvatarImg";
type DetailNewsProps = {
    slug: string;
};

const DetailNews: React.FC<DetailNewsProps> = (props) => {
    const { data, isLoading } = useQuery({
        queryKey: ["news", "manik", props.slug],
        queryFn: () => getOneNewsBySlug(props.slug),
    });

    if (isLoading) return <p>Loading....</p>;
    return (
        <TracingBeam className="max-w-5xl">
            <section className="space-y-6">
                {!data?.data.thumbnail ? (
                    <Skeleton className="w-full h-[30vh] rounded-xl" />
                ) : (
                    <div className="w-full h-[30vh] rounded-xl relative overflow-hidden">
                        <Image
                            src={data.data.thumbnail}
                            alt={data.data.title || "Thumbnail"}
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                )}

                <div className="space-y-4">
                    <h1 className="text-xl md:text-3xl font-bold max-w-2xl">
                        {data?.data.title || "Your news title"}
                    </h1>
                    <div className="text-xs text-muted-foreground capitalize italic">
                        {data?.data.category || "Category"} /{" "}
                        {props.slug || "Slug"}
                    </div>
                    <div className="flex items-center gap-x-4">
                        <AvatarImg alt={""} src={""} />
                        <p className="md:text-xl text-sm">
                            {data?.data.author.username}
                        </p>
                        <span>•</span>
                        <span className="text-muted-foreground text-sm md:text-base">
                            {pubDate(data?.data.pubDate!)}
                        </span>
                    </div>
                </div>

                <div
                    className="text-muted-foreground mx-auto space-y-4"
                    dangerouslySetInnerHTML={{
                        __html: data?.data.content || "<p>Content</p>",
                    }}
                ></div>
            </section>
        </TracingBeam>
    );
};
export default DetailNews;
