import MyBreadcrumb, { BreadcrumbURLs } from "@/components/elements/Breadcrumb";
import Container from "@/components/elements/Container";
import Heading from "@/components/elements/Heading";
import { NewsEditorSection } from "@/components/elements/NewsSection";
import OverviewSection from "@/components/elements/OverviewSection";
import BackgroundGrid from "@/components/ui/background-grid";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

type EditorPageProps = {};

const breadcrumbURLs: BreadcrumbURLs = [
    {
        name: "News",
        href: "/",
    },
];

const EditorPage: React.FC<EditorPageProps> = async () => {
    const { session } = await validateRequest();
    if (!session) return redirect("/auth/sign-in");
    return (
        <BackgroundGrid>
            <Container>
                <Heading>Editor</Heading>
                <MyBreadcrumb urls={breadcrumbURLs} />
                <OverviewSection />
                <h2 className="text-2xl font-semibold ">Your News</h2>
                <NewsEditorSection />
            </Container>
        </BackgroundGrid>
    );
};
export default EditorPage;
