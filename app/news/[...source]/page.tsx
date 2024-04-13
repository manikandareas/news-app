import NewsGrid from "@/components/elements/NewsGrid";
import BackgroundGrid from "@/components/ui/background-grid";
import { apiNewsEndpoints } from "@/constants/api-news";
import { validateRequest } from "@/lib/lucia";
import { notFound, redirect } from "next/navigation";

type SourcePageProps = {
    params: {
        source: string;
    };
};

const SourcePage: React.FC<SourcePageProps> = async (props) => {
    const categories = apiNewsEndpoints.find(
        (item) => item.name === props.params.source[0]
    );

    if (!categories) return notFound();

    const { session } = await validateRequest();
    if (!session) return redirect("/auth/sign-in");

    return (
        <BackgroundGrid>
            <NewsGrid
                params={props.params.source[0] as string}
                categories={categories.paths}
            />
        </BackgroundGrid>
    );
};

export default SourcePage;
