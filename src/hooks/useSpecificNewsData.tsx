/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { TNews } from "@/types";
import { newsFields } from "@/util/fields";
import { useEffect, useState } from "react";

export const useSpecificNewsData = (category?: string) => {
    const [newsData, setNewsData] = useState<TNews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            if (!category) return;

            setLoading(true);
            setError(null);

            try {
                const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/news?category=${encodeURIComponent(category)}&limit=4&fields=${newsFields}`;

                const response = await fetch(url, { cache: "no-store" });

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
    }, [category]);


    return { newsData, loading, error };
};
