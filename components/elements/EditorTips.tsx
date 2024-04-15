import { newsTips } from "@/constants/news-tips";
import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";
import { PropsWithChildren } from "react";

type EditorTipsProps = {
    activeFields: "title" | "content" | "category" | "slug" | "thumbnail";
};

const EditorTips: React.FC<EditorTipsProps> = (props) => {
    return (
        <EditorTipsContainer>
            <div
                style={{
                    transform: `translate(0,${
                        newsTips[props.activeFields].style
                    })`,
                }}
                className={cn(
                    "transition-all  ease-in-out space-y-2 w-full rounded-md  bg-primary-foreground/70 backdrop-blur-sm px-3 py-4"
                )}
            >
                <h2 className="flex items-center gap-x-1.5">
                    <Lightbulb
                        size={20}
                        className="text-yellow-300 fill-yellow-300"
                    />
                    <span className="text-sm">Tips</span>
                </h2>
                <p className="text-xs ">{newsTips[props.activeFields].text}</p>
            </div>
        </EditorTipsContainer>
    );
};
export default EditorTips;

export const EditorTipsContainer = (props: PropsWithChildren) => {
    return (
        <div className="relative lg:flex hidden flex-col w-full h-full max-w-sm">
            {props.children}
        </div>
    );
};
