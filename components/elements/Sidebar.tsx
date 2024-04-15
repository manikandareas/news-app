"use client";
import { apiNewsEndpoints } from "@/constants/api-news";
import { useSidebarContext } from "@/context/SidebarContext";
import { cn, uuidV4 } from "@/lib/utils";
import { ChevronLeft, ChevronUp, NewspaperIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
    const { isOpen, setIsOpen } = useSidebarContext();
    const [isCollapsibleShow, setIsCollapsibleShow] = useState<boolean>(false);
    return (
        <aside
            className={cn(
                "bg-background/80 transition-all lg:hidden ease-in-out backdrop-blur-sm border-r fixed left-0 top-0 h-screen z-[55] w-2/3 max-w-sm",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="p-4 flex items-center justify-between border-b">
                <Link
                    href="/"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400"
                >
                    {"{ News }"}
                </Link>
                <button
                    className="rounded-full "
                    onClick={() => setIsOpen(false)}
                >
                    <ChevronLeft />
                </button>
            </div>

            <div className="py-4">
                <Link
                    className="flex px-4 py-2 justify-between border-y border-transparent mb-2 hover:border-border items-center"
                    href={"#"}
                >
                    <div className="flex items-center space-x-2">
                        <NewspaperIcon size={20} />
                        <span className="font-medium">Sources News</span>
                    </div>
                    <button
                        onClick={() => setIsCollapsibleShow(!isCollapsibleShow)}
                    >
                        <ChevronUp
                            className={cn(
                                { "rotate-180": isCollapsibleShow },
                                "transition-all ease-in-out"
                            )}
                        />
                    </button>
                </Link>
                <div
                    className={cn(
                        "space-y-2 px-8 transition-all duration-200 ease-in-out",
                        {
                            "h-0 overflow-hidden": !isCollapsibleShow,
                        }
                    )}
                >
                    {apiNewsEndpoints.map((item) => (
                        <SidebarCollapsibleItem
                            name={item.name}
                            path={item.name}
                            key={uuidV4()}
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;

export const SidebarCollapsibleItem = (props: {
    name: string;
    path: string;
}) => {
    const pathname = usePathname();
    return (
        <Link
            className={cn(
                "inline-block w-full py-1 px-2 capitalize text-muted-foreground font-mono text-sm",
                { "text-primary": pathname.includes(props.name) }
            )}
            href={`/news/${props.path}`}
        >
            {props.name}
        </Link>
    );
};
