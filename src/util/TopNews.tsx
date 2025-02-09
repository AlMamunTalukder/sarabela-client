"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "./sort";
import truncateText from "./truncate";
import { formatDate } from "./formateDate";
import parse from 'html-react-parser'
interface TopNewsProps {
  basePath?: string;
  category: string;
}
<<<<<<< HEAD
const TopNews = ({ category, basePath = "/international" }: TopNewsProps) => {
  const { newsData, loading, error } = useSpecificNewsData(category)
=======
const TopNews = ({ basePath = "/international" }: TopNewsProps) => {
  const { newsData, loading, error } = useSpecificNewsData();
>>>>>>> d97df043daae41a8a4c9c5112b6460456e1b3796
  if (loading) {
    return <h3>Loading.......</h3>;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Trending News */}
<<<<<<< HEAD
        {
          sortNewsData?.slice(0, 1)?.map((news) => (
            <div key={news._id} className="col-span-2 relative bg-gray-200 overflow-hidden">
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
                <Link href={`${basePath}/${news.slug}`}>
                  <h1 className="text-2xl font-semibold lg:text-4xl text-white hover:text-yellow-500">
                    {news?.newsTitle}
                  </h1>
                </Link>
              </div>
            </div>
          ))
        }

        {sortNewsData?.slice(0, 5).map((news) => (
          <div key={news._id} className="bg-white overflow-hidden">
            <div className="relative h-32  w-full aspect-[3/2] hover:scale-105 duration-500 ">

=======
        {sortNewsData?.slice(0, 1)?.map((news) => (
          <div
            key={news._id}
            className="col-span-2 relative bg-gray-200 overflow-hidden"
          >
            <div className="relative w-full aspect-[3/2] hover:scale-110 duration-700">
>>>>>>> d97df043daae41a8a4c9c5112b6460456e1b3796
              {news?.images?.[0] && (
                <Image
                  src={news?.images[0]}
                  alt={news?.newsTitle || "News Image"}
                  objectFit="fill"
                  fill
                  priority
                />
              )}
            </div>
            <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
              <Link href={`${basePath}/${news.slug}`}>
                <h1 className="text-2xl font-semibold lg:text-4xl text-white hover:text-yellow-500">
                  {news?.newsTitle}
                </h1>
              </Link>
            </div>
          </div>
        ))}

        {sortNewsData?.slice(0, 3).map((news) => (
          <div key={news._id} className="bg-white overflow-hidden">
            <div className="relative w-full aspect-[3/2] hover:scale-110 duration-700">
              {news?.images?.[0] && (
                <Image
                  src={news?.images[0]}
                  alt={news?.newsTitle || "News Image"}
                  objectFit="fill"
                  fill
                  priority
                />
              )}
            </div>
            <div className="pt-4">
              <h2 className="text-lg lg:text-xl font-bold hover:text-blue-600">
                <Link href={`${basePath}/${news.slug}`}>{news?.newsTitle}</Link>
              </h2>
              <p className="text-sm text-gray-600">{parse(truncateText(news?.description, 200))}</p>
              <div className="flex justify-between">
                <p className="text-sm text-gray-400">{formatDate(news?.postDate)}</p>
                <p className="text-blue-600 text-sm">
                  <Link href={`${basePath}/${news.slug}`}>আরো পড়ুন</Link>
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
