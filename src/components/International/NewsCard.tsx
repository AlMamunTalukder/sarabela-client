"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { sortByDate } from "@/util/sort";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import truncateText from "@/util/truncate";
import { getCategory } from "@/util/getCategory";


const NewsCard = () => {
   const basePath = '/international';
    const category = getCategory(basePath);
  
  const { newsData, loading, error } = useSpecificNewsData({category:category})
  if (loading) {
    return <h3>Loading.......</h3>
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(newsData, 'postDate')


  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-4 border-s-4 ps-2 border-blue-500 ">
          আন্তর্জাতিক
        </h1>

        <p className="text-blue-600 hover:text-blue-700 flex items-center text-xl">
          <Link href={`/international`}>আরো দেখুন </Link>
          <span>
            {" "}
            <ChevronsRight size={30} />{" "}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortNewsData?.slice(0, 1)?.map((news) => (
          <div key={news._id} className="bg-white overflow-hidden">
            <div className="relative w-full aspect-[2/1] overflow-hidden">

              {news.images?.[0] && (
                <Image
                  src={news.images[0]}
                  alt={news.newsTitle || "News Image"}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  width={500}
                  height={1000}
                />
              )}
            </div>
            <div className="pt-4">
              <h2 className="text-2xl font-bold mb-3 hover:text-blue-600">
                <Link href={`/international/${news.slug}`}>{news.newsTitle}</Link>
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {truncateText(news?.description, 400)}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <p>
                  {news.postDate}
                </p>
                <p className="text-blue-600 text-sm">
                  <Link href={`/international`}>আরো পড়ুন</Link>
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Normal News Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortNewsData.map((news) => (
            <div
              key={news._id}
              className="bg-white overflow-hidden flex flex-row lg:flex-col"
            >
              <div className="relative w-1/2 lg:w-full aspect-[3/2] overflow-hidden">

                {news.images?.[0] && (
                  <Image
                    src={news.images[0]}
                    alt={news.newsTitle || "News Image"}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    width={500}
                    height={1000}
                  />
                )}
              </div>
              <div className="flex-1 ps-2 lg:pt-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
                  <Link href={`/international/${news.slug}`}>{news.newsTitle}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
