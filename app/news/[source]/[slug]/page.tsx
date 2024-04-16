import MyBreadcrumb, { BreadcrumbURLs } from "@/components/elements/Breadcrumb";
import Container from "@/components/elements/Container";
import DetailNews from "@/components/elements/DetailNews";
import Heading from "@/components/elements/Heading";
import BackgroundGrid from "@/components/ui/background-grid";

type DetailNewsPageProps = {
    params: {
        source: string;
        slug: string;
    };
};

const DetailNewsPage: React.FC<DetailNewsPageProps> = (props) => {
    const breadcrumbURLs: BreadcrumbURLs = [
        {
            name: "News",
            href: "/",
        },
        {
            name: "Manik",
            href: "/",
        },
        {
            name: props.params.slug,
            href: "/",
        },
    ];
    return (
        <BackgroundGrid>
            <Container className="my-0 mt-[5vh]">
                <Heading>Details News</Heading>
                <MyBreadcrumb urls={breadcrumbURLs} />
                <DetailNews slug={props.params.slug} />
            </Container>
        </BackgroundGrid>
    );
};
export default DetailNewsPage;
