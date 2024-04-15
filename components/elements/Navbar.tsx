"use client";
import { useSession } from "@/context/SessionContext";
import { useSidebarContext } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import NewsSourcesList from "./NewsSourcesList";
import React from "react";
import { usePathname } from "next/navigation";
import NavbarEditor from "./NavbarEditor";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
    const { setIsOpen } = useSidebarContext();
    const pathname = usePathname();
    return (
        <React.Fragment>
            {!pathname.includes("/editor") ? (
                <header className="w-full  fixed top-0 z-50 border-b bg-background/10 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto flex items-center justify-between w-full  py-2 px-4 ">
                        <button
                            className="lg:hidden"
                            onClick={() => setIsOpen(true)}
                        >
                            <ChevronRight />
                        </button>
                        <Link
                            href="/"
                            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400"
                        >
                            {"{ News }"}
                        </Link>
                        <NewsSourcesList />
                        <div className="  ">
                            <ModeToggle />
                        </div>
                    </div>
                </header>
            ) : (
                <NavbarEditor />
            )}
        </React.Fragment>
    );
};
export default Navbar;
