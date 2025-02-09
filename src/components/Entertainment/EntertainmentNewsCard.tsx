"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";

const EntertainmentNewsCard = () => {
  const { newsData, loading, error } = useSpecificNewsData()
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
        <h1 className="text-4xl font-bold my-6 ps-2">বিনোদন</h1>

        <p className="text-blue-600 hover:text-blue-700 flex items-center text-xl">
          <Link href={`/entertainment`}> আরো দেখুন </Link>
          <span>
            <ChevronsRight size={30} />
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {
          sortNewsData?.slice(0, 1)?.map((news) => (
            <div key={news._id} className="relative group order-1 lg:order-2 lg:col-span-2 ">
              <div className="overflow-hidden">
                <div className="relative h-full  overflow-hidden aspect-[3/2]">

                  {news.images?.[0] && (
                    <Image
                      src={news.images[0]}
                      alt={news.newsTitle || "News Image"}
            
                      className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full"
                      width={500}
                      height={1000}

                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-end p-4">
                  <Link href={`/entertainment`} className="text-2xl lg:text-4xl">
                    <h2 className=" text-xl md:text-4xl font-bold hover:text-yellow-400 transition-colors">
                      {news?.newsTitle}
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
        <div className="space-y-6 order-2 lg:order-1 lg:col-span-1 lg:border-e border-black pe-2">
          {sortNewsData.slice(0, 3).map((news, idx) => (
            <div
              key={idx}
              className="bg-white overflow-hidden flex items-stretch"
            >
              <div className="w-1/2 overflow-hidden ">

                {news?.images?.[0] && (
                  <Image
                    src={news?.images[0]}
                    alt={news?.newsTitle || "News Image"}
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                    className="object-cover  hover:scale-110 duration-700  "
                    width={500}
                    height={500}

                  />
                )}
              </div>
              <div className="flex-1 ps-4 flex flex-col justify-between">
                <Link href={`view_details`}>
                  <h2 className="text-lg font-bold mb-2 hover:text-blue-600">
                    {news?.newsTitle}
                  </h2>
                </Link>

                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {news?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block space-y-6 order-3 lg:order-3 lg:col-span-1 border-s border-black ps-2">
          {sortNewsData?.slice(2)?.map((news) => (
            <div
              key={news._id}
              className="bg-white overflow-hidden flex items-stretch"
            >
              <div className="flex-1 pe-4 flex flex-col justify-between">
                <Link href={`view_details`}>
                  <h2 className="text-lg font-bold mb-2 hover:text-blue-600">
                    {news?.newsTitle}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {news?.description}
                </p>
              </div>
              <div className="w-1/2 overflow-hidden">

                {news?.images?.[0] && (
                  <Image
                    src={news?.images[0]}
                    alt={news?.newsTitle || "News Image"}
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    width={500}
                    height={500}

                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentNewsCard;
