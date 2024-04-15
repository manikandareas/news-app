import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { AvatarImg } from "./AvatarImg";

type PreviewSectionProps = {
    thumbnail: string | null;
    content: string | null;
    category: string | null;
    title: string | null;
    slug: string | null;
};

const PreviewSection: React.FC<PreviewSectionProps> = (props) => {
    return (
        <section className="space-y-8">
            {!props.thumbnail ? (
                <Skeleton className="w-full h-[30vh] rounded-xl" />
            ) : (
                <div className="w-full h-[30vh] rounded-xl relative overflow-hidden">
                    <Image
                        src={props.thumbnail}
                        alt={props.title || "Thumbnail"}
                        fill
                        className="object-cover object-center"
                    />
                </div>
            )}

            <div className="space-y-4">
                <h1 className="text-xl md:text-3xl font-bold max-w-2xl">
                    {props.title || "Your news title"}
                </h1>
                <div className="text-xs text-muted-foreground capitalize italic">
                    {props.category || "Category"} / {props.slug || "Slug"}
                </div>
                <div className="flex items-center gap-x-4">
                    <AvatarImg alt={""} src={""} />
                    <p className="md:text-xl text-sm">John Doe</p>
                    <span>•</span>
                    <span className="text-muted-foreground text-sm md:text-base">
                        1 hour ago
                    </span>
                </div>
            </div>

            <div
                className=" mx-auto space-y-4"
                dangerouslySetInnerHTML={{
                    __html: props.content || "<p>Content</p>",
                }}
            ></div>
        </section>
    );
};
export default PreviewSection;
