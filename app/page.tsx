import MyBreadcrumb, { BreadcrumbURLs } from "@/components/elements/Breadcrumb";
import Container from "@/components/elements/Container";
import Heading from "@/components/elements/Heading";
import { ImagesSliderSection } from "@/components/elements/ImagesSliderSection";
import NewsSection from "@/components/elements/NewsSection";
import BackgroundGrid from "@/components/ui/background-grid";

type RootPageProps = {};

const breadcrumbURLs: BreadcrumbURLs = [
    {
        name: "News",
        href: "/",
    },
];
const RootPage: React.FC<RootPageProps> = () => {
    return (
        <BackgroundGrid>
            <Container>
                <Heading>News</Heading>
                <MyBreadcrumb urls={breadcrumbURLs} />
                <ImagesSliderSection />
                <h2 className="text-2xl font-semibold mt-4">Latest News</h2>
                <NewsSection />
            </Container>
        </BackgroundGrid>
    );
};
export default RootPage;
