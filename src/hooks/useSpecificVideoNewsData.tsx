/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';


import { TNews, TVideoNews } from "@/types";
import { videoNewsFields } from "@/util/fields";
import { useEffect, useState } from "react";


export const useSpecificVideoNewsData = (newsTag?: string) => {
    const [videoNewsData, setVideoNewsData] = useState<TVideoNews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoNewsData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/video-news?limit=4&fields=${videoNewsFields}`, {
                    cache: "no-store",
                });
                const data = await response.json();
                setVideoNewsData(data.data?.videoNews || []);
            } catch (err) {
                setError("Failed to load video news data!");
            } finally {
                setLoading(false);
            }
        };

        fetchVideoNewsData();
    }, []);

    return { videoNewsData, loading, error };
};
