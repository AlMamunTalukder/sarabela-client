"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";
import { getCategory } from "@/util/getCategory";
import Loading from "../Share/_components/Loading";
const EntertainmentNewsCard = () => {
  const basePath = "/entertainment";
  const category = getCategory(basePath);

  const { newsData, loading, error } = useSpecificNewsData({category:category});
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-6 ps-2">বিনোদন</h1>
        <p className="text-blue-600 hover:text-blue-700 flex items-center text-xl">
          <Link href={`/entertainment`}> আরো দেখুন </Link>
          <span>
            <ChevronsRight size={30} />
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {sortNewsData?.slice(0, 1)?.map((news) => (
          <div key={news._id} className="col-span-1 lg:order-2 sm:col-span-2">
            <Link href={`sports/${news._id}`} className="block group">
              <div className="relative aspect-[3/2] overflow-hidden">
                <div className="relative w-full aspect-[3/2] ">
                  {news?.images?.[0] && (
                    <Image
                      src={news?.images[0]}
                      alt={news?.newsTitle || "News Image"}
                      className="transform transition-transform duration-500 group-hover:scale-105"
                      objectFit="cover"
                      layout="fill"
                      fill
                    />
                  )}
                </div>
                <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {news.newsTitle}
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div className="space-y-6 order-2 lg:order-1 lg:col-span-1 lg:border-e border-black dark:border-gray-400">
          {sortNewsData.slice(0, 3).map((news, idx) => (
            <div key={idx} className="overflow-hidden flex items-stretch">
              <div className="w-1/2">
                <div className="relative aspect-[3/2] overflow-hidden ">
                  {news?.images?.[0] && (
                    <Image
                      src={news?.images[0]}
                      alt={news?.newsTitle || "News Image"}
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                      className="group-hover:scale-110 transition-transform duration-500"
                      objectFit="cover"
                      layout="fill"
                      fill
                    />
                  )}
                </div>
              </div>
              <div className="flex-1 px-2 flex flex-col justify-between">
                <Link href={`/entertainment/${news._id}`}>
                  <h2 className="text-sm font-bold mb-2 hover:text-blue-600">
                    {news?.newsTitle}
                  </h2>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block space-y-6 order-3 lg:order-3 lg:col-span-1 border-s border-black dark:border-gray-400">
          {sortNewsData?.slice(2)?.map((news) => (
            <div key={news._id} className="overflow-hidden flex items-stretch">
              <div className="flex-1 px-2 flex flex-col justify-between">
                <Link href={`/entertainment/${news._id}`}>
                  <h2 className="text-sm font-bold mb-2 hover:text-blue-600">
                    {news?.newsTitle}
                  </h2>
                </Link>
              </div>
              <div className="w-1/2">
                <div className="relative aspect-[3/2] overflow-hidden">
                  {news?.images?.[0] && (
                    <Image
                      src={news?.images[0]}
                      alt={news?.newsTitle || "News Image"}
                      className="hover:scale-110 transition-transform duration-300"
                      objectFit="cover"
                      layout="fill"
                      fill
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentNewsCard;
