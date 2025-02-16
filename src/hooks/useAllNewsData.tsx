/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';


import { TNews } from "@/types";
import { newsFields } from "@/util/fields";
import { useEffect, useState } from "react";


export const useAllNewsData = () => {
    const [newsData, setNewsData] = useState<TNews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch(`https://api.sarabelanews24.com/api/v1/news?limit=4&fields=${newsFields}`, {
                    cache: "no-store",
                });
                const data = await response.json();
                setNewsData(data.data?.news || []);
            } catch (err) {
                setError("Failed to fetch news data!");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, []);

    return { newsData, loading, error };
};
