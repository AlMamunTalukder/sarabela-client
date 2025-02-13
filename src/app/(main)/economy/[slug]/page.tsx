import React from "react";
import NewsSingleDetails from "../../../../components/Share/_components/NewsSingleDetails";
import { Metadata } from "next";


export async function generateMetadata({ params }:any): Promise<Metadata> {
    const { slug } = params;
    const encodedSlug = Array.isArray(params?.slug) ? params.slug.join("/") : params?.slug || "";
    const decodedSlug = encodedSlug ? decodeURIComponent(encodedSlug) : "";

    try {
        const res = await fetch(`https://api.sarabelanews24.com/api/v1/news/${decodedSlug}`);

        if (!res.ok) {
            console.error("Error fetching news:", res.status);
            return {
                title: "News Not Found | SaraBela News24",
                description: "Sorry, the requested news article was not found.",
            };
        }

        const news = await res.json();

        if (!news?.data) {
            return {
                title: "News Not Found | SaraBela News24",
                description: "Sorry, the requested news article was not found.",
            };
        }
        console.log('seo data this ',news.data)

        const { metaTitle, metaDescription, metaKeywords, images } = news.data;
        const pageUrl = `https://sarabelanews24.com/economy/${slug}`;

        return {
            title: metaTitle ? `${metaTitle} | SaraBela News24` : "SaraBela News24 - Latest News",
            description: metaDescription || "Read the latest news, updates, and insights on SaraBela News24.",
            keywords: metaKeywords || "SaraBela News, Breaking News, Latest News, International News",
            openGraph: {
                title: metaTitle || "SaraBela News24",
                description: metaDescription || "Latest news and updates on SaraBela News24.",
                url: pageUrl,
                type: "article",
                images: [
                    {
                        url: images[0] || "https://sarabelanews24.com/default-og-image.jpg",
                        width: 1200,
                        height: 630,
                        alt: metaTitle || "SaraBela News24",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: metaTitle || "SaraBela News24",
                description: metaDescription || "Breaking news, latest updates, and more.",
                images: [images[0] || "https://sarabelanews24.com/default-og-image.jpg"],
            },
            alternates: {
                canonical: pageUrl,
            },
        };
    } catch (error) {
        console.error("Error fetching news metadata:", error);
        return {
            title: "Error | SaraBela News24",
            description: "There was an issue loading this page. Please try again later.",
        };
    }
}

const Page = () => {
    return <NewsSingleDetails basePath="/economy" />;
};

export default Page;
