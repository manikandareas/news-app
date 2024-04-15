import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

type EditorPageProps = {};

const EditorPage: React.FC<EditorPageProps> = async () => {
    const { session } = await validateRequest();
    if (!session) return redirect("/auth/sign-in");
    return <main></main>;
};
export default EditorPage;
