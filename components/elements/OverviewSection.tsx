"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import BarChart from "./BarChart";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/context/SessionContext";
import { getOverviewEditor } from "@/actions/news.actions";
import { readTime } from "@/constants/read-time";

type OverviewSectionProps = {};

const OverviewSection: React.FC<OverviewSectionProps> = () => {
    const { user } = useSession();
    const { data } = useQuery({
        queryKey: ["overview", "editor", user?.id],
        queryFn: () => getOverviewEditor(user?.id!),
    });
    return (
        <section className="mx-auto max-w-6xl  w-full items-center rounded-xl grid md:grid-cols-2 ">
            <Card className="bg-transparent border-transparent">
                <CardHeader>
                    <CardTitle>Total News</CardTitle>
                    <CardDescription>
                        Total news that yoy have published
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl">{data?.totalNews}</p>
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>

            <div>
                <BarChart data={readTime} />
            </div>
        </section>
    );
};
export default OverviewSection;
