/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';


import { TPhotoNews } from "@/types";
import { photoNewsFields } from "@/util/fields";
import { useEffect, useState } from "react";


export const usePhotonewsData = () => {
    const [photoNewsData, setPhotoNewsData] = useState<TPhotoNews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/photonews?limit=4&fields=${photoNewsFields}`, {
                    cache: "no-store",
                });
                const data = await response.json();
                setPhotoNewsData(data.data?.photonews || []);
            } catch (err) {
                setError("Failed to fetch photo news data!");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, []);

    return { photoNewsData, loading, error };
};
