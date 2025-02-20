"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import SaidBar from "@/components/Sports/SaidBar";
import PaginationPages from "@/util/PaginationPages";
import NewsCard from "./NewsCard";
import Feedback from "./Comment/Feedback";
import Advertisements from "./Advertisment";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TNews } from "@/types";
import RelatedNews from "./RelatedNews";
import { getCategory } from "@/util/getCategory";
import { useGetSingleNewsQuery } from "@/redux/dailynews/news.api";
import SideBarRelatedNews from "./SideBarRelatedNews";
interface TopNewsProps {
  basePath?: string;
}
const NewsSingleDetails = ({ basePath }: TopNewsProps) => {
  const params = useParams();
  const encodedSlug = Array.isArray(params?.slug)
    ? params.slug.join("/")
    : params?.slug || "";
  const category = getCategory(basePath);
  const decodedSlug = encodedSlug ? decodeURIComponent(encodedSlug) : "";
  const { data } = useGetSingleNewsQuery(decodedSlug);
  const singleNewsData = data?.data;
  const [fontSize, setFontSize] = useState(16);


  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="hidden lg:block w-full lg:w-1/4">
            <div className="sticky top-[70px]">
              <div className="py-2">
                <SideBarRelatedNews category={category} basePath={basePath} />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <div className="">
              <div className="space-y-6">
                <div className="overflow-hidden">
                  {singleNewsData ? (
                    <NewsCard news={singleNewsData} />
                  ) : (
                    <p>Loading news...</p>
                  )}
                  {singleNewsData ? (
                    <Feedback news={singleNewsData} />
                  ) : (
                    <p>Loading news...</p>
                  )}
                  <Advertisements />
                  <RelatedNews category={category} basePath={basePath} />
                  <PaginationPages />
                </div>

                <div className="px-4 py-6 border-t border-gray-100"></div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-full lg:w-1/4">
            <div className="sticky top-[70px]">
              <div className="py-2">
                <SaidBar category={category} basePath={basePath} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsSingleDetails;
