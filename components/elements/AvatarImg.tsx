import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarImgProps = {
    src: string | null;
    alt: string | null;
};
export function AvatarImg(props: AvatarImgProps) {
    return (
        <Avatar>
            <AvatarImage
                src={props.src || "https://github.com/shadcn.png"}
                alt={props.alt || "unknown"}
            />
            <AvatarFallback>props.alt</AvatarFallback>
        </Avatar>
    );
}
