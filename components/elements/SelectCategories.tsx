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

type SelectCategoriesProps = {
    values: ApiNewsCategories[];
    onChange: (value: string) => void;
};

const SelectCategories: React.FC<SelectCategoriesProps> = (props) => {
    return (
        <Select
            // value={`${props.values[0].path};${props.values[0].name}`}
            defaultValue={`${props.values[0].path};${props.values[0].name}`}
            onValueChange={props.onChange}
        >
            <SelectTrigger className="w-full md:w-[200px] capitalize">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {props.values.map((item) => (
                        <SelectItem
                            className="capitalize"
                            value={`${item.path};${item.name}`}
                            key={crypto.randomUUID()}
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
