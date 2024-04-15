import { uuidV4 } from "@/lib/utils";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";

export type BreadcrumbURLs = {
    name: string;
    href: string;
}[];

type MyBreadcrumbProps = {
    urls: BreadcrumbURLs;
};

const MyBreadcrumb: React.FC<MyBreadcrumbProps> = (props) => {
    return (
        <Breadcrumb className="mb-5">
            <BreadcrumbList>
                {props.urls.map((item, idx) => (
                    <React.Fragment key={uuidV4()}>
                        <BreadcrumbItem>
                            {props.urls.length - 1 !== idx ? (
                                <BreadcrumbLink href={item.href}>
                                    {item.name}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {props.urls.length - 1 !== idx && (
                            <BreadcrumbSeparator key={idx} />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
export default MyBreadcrumb;
