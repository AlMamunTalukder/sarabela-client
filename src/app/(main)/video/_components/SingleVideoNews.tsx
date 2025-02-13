'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import SaidBar from "@/components/Sports/SaidBar";
import PaginationPages from "@/util/PaginationPages";

import { useEffect, useState } from "react";
import { useParams, } from "next/navigation";
import { TNews } from "@/types";
import Feedback from "@/components/Share/_components/Comment/Feedback";
import Advertisements from "@/components/Share/_components/Advertisment";
import RelatedNews from "@/components/Share/_components/RelatedNews";
import NewsCard from "@/components/LeadNews/NewsCard";

interface TopNewsProps {
    basePath?: string;
}
const SingleDetails = ({ basePath }: TopNewsProps) => {
    const params = useParams();
    const encodedSlug = Array.isArray(params?.slug) ? params.slug.join("/") : params?.slug || "";
const category = ''
    const decodedSlug = encodedSlug ? decodeURIComponent(encodedSlug) : "";
    const [singleNewsData, setSingleNewsData] = useState<TNews | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch(`https://api.sarabelanews24.com/api/v1/video-news/${decodedSlug}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const result = await res.json();

                if (result?.data) {
                    setSingleNewsData(result.data);
                } else {
                    setError("Data not found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [decodedSlug]);


    if (loading) {
        return <h2>Loading.......</h2>;
    }
    if (error) {
        return <h1>Oops! data not found.</h1>;
    }

    return (
        <main className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="w-full lg:w-3/4">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="space-y-6">

                                <div className="overflow-hidden">
                                    {singleNewsData ? <NewsCard/> : <p>Loading news...</p>}
                                    {singleNewsData?._id && <Feedback id={singleNewsData._id} />}

                                    <Advertisements />
                                    <RelatedNews category="/video" basePath={basePath} />
                                    <PaginationPages />
                                </div>


                                <div className="px-4 py-6 border-t border-gray-100"></div>
                            </div>
                        </div>
                    </div>


                    <div className="hidden lg:block w-full lg:w-1/4">
                        <div className="sticky top-[70px]">
                            <div className="bg-white py-2">
                                <SaidBar category="/video" basePath={basePath} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SingleDetails;
