import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";

export const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
export const items = [
    {
        title: "The Dawn of Innovation",
        description:
            "Explore the birth of groundbreaking ideas and inventions.",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton />,
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Art of Design",
        description: "Discover the beauty of thoughtful and functional design.",
        header: <Skeleton />,
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Power of Communication",
        description:
            "Understand the impact of effective communication in our lives.",
        header: <Skeleton />,
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Pursuit of Knowledge",
        description: "Join the quest for understanding and enlightenment.",
        header: <Skeleton />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Joy of Creation",
        description: "Experience the thrill of bringing ideas to life.",
        header: <Skeleton />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Spirit of Adventure",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Skeleton />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];

export const News = () => {
    return (
        <>
            <p>
                <a href="#">
                    Dalam sebuah pemandangan yang menarik di pinggiran kota
                </a>
                ,{" "}
                <u>
                    seorang pria dewasa terlihat menuntun sepeda yang penuh
                    dengan keranjang anyaman dari rotan
                </u>
                .
            </p>
            <p>
                Dengan penuh keahlian, ia menyeimbangkan keranjang-keranjang
                tersebut yang berisi hasil kerajinan tangan yang beragam.
            </p>
            <p>
                Dari keranjang-keranjang tersebut{" "}
                <strong>terpancar kerajinan halus</strong> yang menggambarkan
                keindahan lokal dan kekayaan budaya.
            </p>
            <p>
                <em>
                    Dalam setiap langkahnya, pria tersebut memancarkan
                    ketenangan dan kehangatan
                </em>
                , memberikan gambaran tentang kerja keras serta keberagaman
                dalam masyarakat lokal.
            </p>
            <p>
                Adegan tersebut tidak hanya menciptakan{" "}
                <strong>pemandangan yang menarik</strong>, tetapi juga{" "}
                <u>menghidupkan pesan tentang keindahan tradisi</u> dan keuletan
                seseorang dalam mempertahankannya.
            </p>
        </>
    );
};
