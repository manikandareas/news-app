import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

type BackgroundGridProps = ComponentProps<"div"> & {};

const BackgroundGrid: React.FC<BackgroundGridProps> = (props) => {
    return (
        <div
            className={cn(
                "min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center",
                props.className
            )}
            {...props}
        >
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {props.children}
        </div>
    );
};
export default BackgroundGrid;
