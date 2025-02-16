/* eslint-disable @typescript-eslint/no-unused-vars */
import { TComments, TNews } from "@/types";
import { newsFields } from "@/util/fields";
import { useEffect, useState } from "react";

const useCommentsData = (tagName?:string) => {
  const [commentData, setCommentData] = useState<TComments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await fetch(
          `https://api.sarabelanews24.com/api/v1/comment`,
          {
            cache: "no-store",
          }
        );
        const data = await response.json();
        setCommentData(data.data?.comments || []);
      } catch (err) {
        setError("Failed to fetch comments data!");
      } finally {
        setLoading(false);
      }
    };

    fetchCommentData();
  }, []);

  return { commentData, loading, error };
};

export default useCommentsData;
