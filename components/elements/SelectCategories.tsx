"use client";
import { ApiNewsCategories } from "@/types/api-news";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { uuidV4 } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SelectCategoriesProps = {
    values: ApiNewsCategories[];
    // onChange: (value: string) => void;
};

const SelectCategories: React.FC<SelectCategoriesProps> = (props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    return (
        <Select
            onValueChange={(value) => {
                const str = value.split(";");
                const params = new URLSearchParams(searchParams);
                params.set("category", str[1]);
                replace(`${pathname}?${params.toString()}`);
            }}
        >
            <SelectTrigger
                value={searchParams.get("category") as string}
                className="w-full md:w-[200px] capitalize"
            >
                <SelectValue
                    // defaultValue={searchParams.get("category") as string}
                    placeholder="Select a category"
                />
            </SelectTrigger>
            <SelectContent className="z-30">
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {props.values.map((item) => (
                        <SelectItem
                            className="capitalize"
                            value={`${item.path};${item.name}`}
                            key={uuidV4()}
                        >
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
export default SelectCategories;
