'use client';

import { TNews } from "@/types";
import { newsFields } from "@/util/fields";
import { useEffect, useState } from "react";

interface UseSpecificNewsDataProps {
    category?: string;
    newsTag?: string;
}

export const useSpecificNewsData = ({ category, newsTag }: UseSpecificNewsDataProps) => {
    const [newsData, setNewsData] = useState<TNews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            setLoading(true);
            setError(null);

            try {
                //  base URL
                const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}/news`);
                const params = new URLSearchParams({
                    limit: "4",
                    fields: newsFields,
                });

                //  append category if it's provided
                if (category) {
                    params.append("category", category);
                }

                //  append newsTag if it's provided
                if (newsTag) {
                    params.append("newsTag", newsTag);
                }

                // Append the query parameters to the URL
                url.search = params.toString();

                const response = await fetch(url.toString(), { cache: "no-store" });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                if (!data?.data?.news) {
                    throw new Error("No news data found!");
                }

                setNewsData(data.data.news);
            } catch (err: any) {
                setError(err.message || "Failed to load news data!");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, [category, newsTag]);

    return { newsData, loading, error };
};
