// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';


// import { TNews } from "@/types";

// import { useEffect, useState } from "react";


// export const useSingleNewsData = () => {
//     const [newsData, setNewsData] = useState<TNews[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchWhatwedoData = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/news/${id}`, {
//                     cache: "no-store",
//                 });
//                 const data = await response.json();
//                 setNewsData(data.data?.news || []);
//             } catch (err) {
//                 setError("Failed to load news data!");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWhatwedoData();
//     }, []);

//     return { newsData, loading, error };
// };
