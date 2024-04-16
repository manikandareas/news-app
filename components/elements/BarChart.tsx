"use client";
import { readTime } from "@/constants/read-time";
import {
    CategoryScale,
    Chart,
    LinearScale,
    BarElement,
    ChartData,
    BarOptions,
    Title,
    Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
type BarChartProps = {
    data: typeof readTime;
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BarChart: React.FC<BarChartProps> = (props) => {
    const [chartData, setChartData] = useState<
        ChartData<"bar", number[], string>
    >({
        labels: props.data.map((d) => d.month),
        datasets: [
            {
                label: "Read Time",

                data: props.data.map((d) => d.readTime),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "#14b8a6",
                barThickness: 30,
            },
        ],
    });

    // const options:BarOptions = {

    // }
    return (
        <Bar
            data={chartData}
            options={{
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Total your news has been read",
                    },
                },
            }}
        />
    );
};
export default BarChart;
