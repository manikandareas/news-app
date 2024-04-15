import MyBreadcrumb, { BreadcrumbURLs } from "@/components/elements/Breadcrumb";
import Container from "@/components/elements/Container";
import Heading from "@/components/elements/Heading";
import NewsGrid from "@/components/elements/NewsGrid";
import BackgroundGrid from "@/components/ui/background-grid";
import { apiNewsEndpoints } from "@/constants/api-news";
import { notFound } from "next/navigation";

type SourcePageProps = {
    params: {
        source: string;
    };
};

const SourcePage: React.FC<SourcePageProps> = async (props) => {
    const categories = apiNewsEndpoints.find(
        (item) => item.name === props.params.source
    );

    if (!categories) return notFound();

    const breadcrumbURLs: BreadcrumbURLs = [
        {
            name: "News",
            href: "/",
        },
        {
            name: "Source",
            href: "/",
        },
        {
            name: props.params.source,
            href: "/",
        },
    ];

    return (
        <BackgroundGrid>
            <Container>
                <Heading className="capitalize">{props.params.source}</Heading>
                <MyBreadcrumb urls={breadcrumbURLs} />
                <NewsGrid
                    params={props.params.source as string}
                    categories={categories.paths}
                />
            </Container>
        </BackgroundGrid>
    );
};

export default SourcePage;
