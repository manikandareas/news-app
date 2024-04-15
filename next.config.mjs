/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    },
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https",
            },
            {
                hostname: "img.antaranews.com",
                protocol: "https",
            },
            {
                hostname: "awsimages.detik.net.id",
                protocol: "https",
            },
            {
                hostname: "akcdn.detik.net.id",
                protocol: "https",
            },
            {
                hostname: "cloud.jpnn.com",
                protocol: "https",
            },
            {
                hostname: "blue.kumparan.com",
                protocol: "https",
            },
            {
                hostname: "klimg.com",
                protocol: "http",
            },
            {
                hostname: "img.okezone.com",
                protocol: "https",
            },
            {
                hostname: "static.republika.co.id",
                protocol: "https",
            },
            {
                hostname: "pict-b.sindonews.net",
                protocol: "https",
            },
            {
                hostname: "pict-c.sindonews.net",
                protocol: "https",
            },
            {
                hostname: "pict-a.sindonews.net",
                protocol: "https",
            },
            {
                hostname: "pict.sindonews.net",
                protocol: "https",
            },
            {
                hostname: "statik.tempo.co",
                protocol: "https",
            },
            {
                hostname: "asset-2.tstatic.net",
                protocol: "https",
            },
            {
                hostname: "res.cloudinary.com",
                protocol: "http",
            },
        ],
    },
};

export default nextConfig;
