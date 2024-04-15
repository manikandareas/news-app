import MyBreadcrumb, { BreadcrumbURLs } from "@/components/elements/Breadcrumb";
import Container from "@/components/elements/Container";
import CreateNewsSection from "@/components/elements/CreateNewsSection";
import BackgroundGrid from "@/components/ui/background-grid";

type CreateNewsPageProps = {};
const breadcrumbURLs: BreadcrumbURLs = [
    {
        name: "Editor",
        href: "/editor",
    },
    {
        name: "Create News",
        href: "/create",
    },
];
const CreateNewsPage: React.FC<CreateNewsPageProps> = () => {
    return (
        <BackgroundGrid>
            <Container>
                <h1 className="text-2xl font-bold">Create News</h1>
                <MyBreadcrumb urls={breadcrumbURLs} />
                <CreateNewsSection />
            </Container>
        </BackgroundGrid>
    );
};
export default CreateNewsPage;
