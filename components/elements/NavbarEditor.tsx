"use client";
import { useSession } from "@/context/SessionContext";
import { useSidebarContext } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { ChevronRight, PencilLine } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

type NavbarEditorProps = {};

const NavbarEditor: React.FC<NavbarEditorProps> = () => {
    const { setIsOpen } = useSidebarContext();
    const { session } = useSession();
    return (
        <header className="w-full  fixed top-0 z-50 border-b bg-background/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full  py-2 px-4 ">
                <button className="lg:hidden" onClick={() => setIsOpen(true)}>
                    <ChevronRight />
                </button>
                <Link
                    href="/editor"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400"
                >
                    <span className={cn("hidden", { inline: session })}>
                        Editor
                    </span>{" "}
                    {"{ News }"}
                </Link>
                <div className=" flex space-x-2 items-center ">
                    <Link
                        className={cn(
                            "space-x-2 group/btn",
                            buttonVariants({ variant: "ghost" })
                        )}
                        href={"/editor/create"}
                    >
                        <span className="-rotate-1 transition-all ease-in-out group-hover/btn:rotate-0 decoration-transparent decoration-2 duration-300 decoration underline-offset-2 group-hover/btn:decoration-emerald-500 group-hover/btn:underline">
                            Write a{" "}
                            <span className="underline underline-offset-2 decoration-2 decoration-emerald-500 group-hover/btn:decoration-transparent transition-all ease-in-out">
                                news article
                            </span>
                        </span>
                        <PencilLine size={20} className="text-teal-500" />
                    </Link>

                    {/* <ModeToggle /> */}
                </div>
            </div>
        </header>
    );
};
export default NavbarEditor;
