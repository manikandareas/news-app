import { getOneNewsBySlug } from "@/actions/news.actions";
import MyBreadcrumb, { BreadcrumbURLs } from "@/components/elements/Breadcrumb";
import Container from "@/components/elements/Container";
import EditNewsSection from "@/components/elements/EditNewsSection";
import BackgroundGrid from "@/components/ui/background-grid";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

type EditNewsPageProps = {
    params: {
        slug: string;
    };
};

const EditNewsPage: React.FC<EditNewsPageProps> = async (props) => {
    const { session } = await validateRequest();
    if (!session) return redirect("/auth/sign-in");
    const news = await getOneNewsBySlug(props.params.slug);

    const breadcrumbURLs: BreadcrumbURLs = [
        {
            name: "Editor",
            href: "/editor",
        },
        {
            name: props.params.slug,
            href: "/edit",
        },
        {
            name: "Edit News",
            href: "/edit",
        },
    ];
    return (
        <BackgroundGrid>
            <Container>
                <h1 className="text-2xl font-bold">Edit News</h1>
                <MyBreadcrumb urls={breadcrumbURLs} />
                <EditNewsSection news={news} />
            </Container>
        </BackgroundGrid>
    );
};
export default EditNewsPage;
