import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import NewsSourcesList from "./NewsSourcesList";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <header className="w-full  fixed top-0 z-50 border-b bg-background/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full  py-2 px-4 ">
                <Link
                    href="/"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400"
                >
                    {"{ News }"}
                </Link>
                <NewsSourcesList />
                <div className="flex gap-x-3 items-center">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};
export default Navbar;
