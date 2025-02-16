import { TNews } from "@/types";
import { newsFields } from "@/util/fields";
import { useEffect, useState } from "react";

interface UseSpecificNewsDataProps {
    category?: string;
    newsTag?: string;
    limit?: string;
    searchTerm?: string;
}

export const useSpecificNewsData = ({ category, newsTag, limit, searchTerm }: UseSpecificNewsDataProps) => {
    const [newsData, setNewsData] = useState<TNews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = new URL(`http://localhost:5000/api/v1/news`);
                const params = new URLSearchParams({ fields: newsFields });

                if (category) params.append("category", category);
                if (limit) params.append("limit", limit);
                if (newsTag) params.append("newsTag", newsTag);
                if (searchTerm) params.append("searchTerm", searchTerm); 

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
    }, [category, newsTag, searchTerm]);

    return { newsData, loading, error };
};
