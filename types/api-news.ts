export type ApiNewsCategories = {
    name: string;
    path: string;
};

export type ApiNewsEndpoints = {
    name: string;
    paths: ApiNewsCategories[];
};

export type ApiNewsResponse = {
    success: boolean;
    message: string;
    data: {
        link: string;
        image: string;
        description: string;
        title: string;
        posts: ApiNewsPosts[];
    };
};

export type ApiNewsPosts = {
    link: string;
    title: string;
    pubDate: string;
    description: string;
    thumbnail: string;
};
