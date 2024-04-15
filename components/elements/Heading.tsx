import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type HeadingProps = ComponentProps<"h1">;

const Heading: React.FC<HeadingProps> = (props) => {
    const { className, ...rest } = props;
    return (
        <h1 className={cn("text-3xl font-bold", className)} {...rest}>
            {props.children}
        </h1>
    );
};
export default Heading;
