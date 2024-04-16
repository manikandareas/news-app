"use client";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import DialogSignOut from "./DialogSignOut";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type FooterEditorProps = {};

const FooterEditor: React.FC<FooterEditorProps> = () => {
    const pathname = usePathname();
    console.log(pathname);

    return (
        <footer className="flex text-muted-foreground  items-center sticky backdrop-blur-sm w-full bottom-0 justify-center border-t bg-background/80">
            <ModeToggle />
            <Link
                className={cn(
                    buttonVariants({
                        variant: "link",
                        className: "text-muted-foreground",
                    }),
                    { "text-white": pathname === "/editor" }
                )}
                href={"/editor"}
            >
                Editor Page
            </Link>
            <DialogSignOut />
        </footer>
    );
};
export default FooterEditor;
