'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import PaginationPages from "@/util/PaginationPages";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";  // Use this hook to get route params
import { TNews } from "@/types";
import Advertisements from "@/components/Share/_components/Advertisment";
import Feedback from "@/components/Share/_components/Comment/Feedback";
import NewsCard from "@/components/Share/_components/NewsCard";
import VideoNewsSidebar from "../_components/VideoNewsSidebar";
import Loading from "@/components/Share/_components/Loading";

const SingleDetails = () => {
    const { id } = useParams(); 

    const [singleNewsData, setSingleNewsData] = useState<TNews | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return; 

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/video-news/${id}`);
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
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <h1>Oops! Data not found.</h1>;
    }

    return (
        <main className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="w-full lg:w-3/4">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="space-y-6">

                                <div className="overflow-hidden">
                                    {singleNewsData ? <NewsCard news={singleNewsData} /> : <Loading/>}
                                    {singleNewsData ? <Feedback news={singleNewsData} /> :<Loading/>}

                                    <Advertisements />
                                    {/* <RelatedNews basePath='/video' /> */}
                                    <PaginationPages />
                                </div>

                                <div className="px-4 py-6 border-t border-gray-100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block w-full lg:w-1/4">
                        <div className="sticky top-[70px]">
                            <div className="bg-white py-2">
                                <VideoNewsSidebar basePath="/video" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default SingleDetails;
