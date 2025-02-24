"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "./sort";
import truncateText from "./truncate";
import { formatDate } from "./formateDate";
import parse from 'html-react-parser'
import Loading from "@/components/Share/_components/Loading";
interface TopNewsProps {
  basePath?: string;
  category: string;
}
const TopNews = ({ category, basePath }: TopNewsProps) => {

  const { newsData, loading, error } = useSpecificNewsData({ category: category, })
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(newsData, 'postDate')


  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Trending News */}
        {
          sortNewsData?.slice(0, 1)?.map((news) => (
            <div key={news._id} className="col-span-2 relative  overflow-hidden">
              <div className="relative w-full aspect-[3/2] hover:scale-110 duration-700 ">

                {news?.images?.[0] && (
                  <Image
                    src={news?.images[0]}
                    alt={news?.newsTitle || "News Image"}
                    className="object-cover w-full h-full "
                    width={500}
                    height={500}
                  />
                )}
              </div>
              <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
                <Link href={`${basePath}/${news._id}`}>
                  <h1 className="text-2xl font-semibold lg:text-4xl text-white hover:text-yellow-500">
                    {news?.newsTitle}
                  </h1>
                </Link>
              </div>
            </div>
          ))
        }

        {sortNewsData?.slice(0, 5).map((news) => (
          <div key={news._id} className="overflow-hidden">
            <div className="relative h-32  w-full aspect-[3/2] hover:scale-105 duration-500 ">

              {news?.images?.[0] && (
                <Image
                  src={news?.images[0]}
                  alt={news?.newsTitle || "News Image"}
                  className="object-cover h-full "
                  width={500}
                  height={500}
                />
              )}
            </div>
            <div className="pt-4">
              <h2 className="text-lg lg:text-xl font-bold hover:text-blue-600">
                <Link href={`${basePath}/${news._id}`}>{news?.newsTitle}</Link>
              </h2>
              <p className="text-sm  ">{parse(truncateText(news?.description, 170))}</p>
              <div className="flex justify-between">
                <p className="text-sm text-gray-400">{formatDate(news?.postDate)}</p>
                <p className="text-blue-600 text-sm">
                  <Link href={`${basePath}/${news._id}`}>আরো পড়ুন</Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNews;
