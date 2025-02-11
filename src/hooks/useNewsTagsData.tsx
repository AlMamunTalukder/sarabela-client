/* eslint-disable @typescript-eslint/no-unused-vars */
import { TNews } from "@/types";
import { newsFields } from "@/util/fields";
import { useEffect, useState } from "react";

const UseNewsTagsData = (tagName?:string) => {
  const [newsData, setNewsData] = useState<TNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/news?limit=4&fields=${newsFields}&newsTag=${tagName}`,
          {
            cache: "no-store",
          }
        );
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

export default UseNewsTagsData;
