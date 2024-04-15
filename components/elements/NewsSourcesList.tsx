"use client";

import { apiNewsEndpoints } from "@/constants/api-news";
import { cn, uuidV4 } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NewsSourcesListProps = {};

const NewsSourcesList: React.FC<NewsSourcesListProps> = () => {
    return (
        <div className="lg:flex items-center hidden space-x-6 font-mono">
            {apiNewsEndpoints.map((item) => (
                <NewsSourcesListItem
                    name={item.name}
                    key={uuidV4()}
                    path={item.name}
                />
            ))}
        </div>
    );
};
export default NewsSourcesList;

const NewsSourcesListItem = (props: { name: string; path: string }) => {
    const pathname = usePathname();
    return (
        <Link
            href={`/news/${props.path}`}
            className={cn(
                "capitalize text-muted-foreground hover:text-foreground text-sm",
                {
                    "text-foreground": pathname
                        .toLocaleLowerCase()
                        .includes(props.path.toLocaleLowerCase()),
                }
            )}
        >
            {props.name}
        </Link>
    );
};
