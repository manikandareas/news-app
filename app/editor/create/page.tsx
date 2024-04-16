import MyBreadcrumb, { BreadcrumbURLs } from "@/components/elements/Breadcrumb";
import Container from "@/components/elements/Container";
import CreateNewsSection from "@/components/elements/CreateNewsSection";
import BackgroundGrid from "@/components/ui/background-grid";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

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
const CreateNewsPage: React.FC<CreateNewsPageProps> = async () => {
    const { session } = await validateRequest();
    if (!session) return redirect("/auth/sign-in");
    return (
        <BackgroundGrid>
            <Container className="my-0 mt-[5vh]">
                <h1 className="text-2xl font-bold">Create News</h1>
                <MyBreadcrumb urls={breadcrumbURLs} />
                <CreateNewsSection />
            </Container>
        </BackgroundGrid>
    );
};
export default CreateNewsPage;
