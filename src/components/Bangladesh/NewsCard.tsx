"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";
import truncateText from "@/util/truncate";
import { getCategory } from "@/util/getCategory";
import parse from 'html-react-parser'
import { formatDate } from "@/util/formateDate";
const NewsCard = () => {
  const basePath = '/national';
  const category = getCategory(basePath);

  const { newsData, loading, error } = useSpecificNewsData({category})
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
        <h1 className="text-4xl font-bold border-s-4 border-blue-500 ps-4 my-4">
          সমগ্র জনপথ{" "}
        </h1>
        <p className="text-blue-600 hover:text-blue-700 flex items-center text-xl">
          <Link href={`/national`}>আরো দেখুন </Link>
          <span>
            {" "}
            <ChevronsRight size={30} />{" "}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {
          sortNewsData?.slice(0, 1).map((news) => (
            <div key={news._id} className="bg-white overflow-hidden relative">
              <div className="relative w-full aspect-[2/1]">
                {news.images?.[0] && (
                  <Image
                    src={news.images[0]}
                    alt={news.newsTitle || "News Image"}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    width={500}
                    height={1000}
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600">
                  <Link href={`/national/${news.slug}`}>{news.newsTitle}</Link>
                </h2>
                <p className="text-gray-600 mb-3">
                  {parse(truncateText(news?.shortDescription, 300))}

                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <p>
                    {formatDate(news.postDate)}
                  </p>
                  <p className="text-blue-600 text-sm">
                    <Link href={`/national`}>আরো পড়ুন</Link>
                  </p>
                </div>
              </div>
            </div>
          ))
        }
        {/* Normal News Section */}
        <div className="grid grid-cols-1 gap-4 lg:border-s border-black lg:ps-4">
          {sortNewsData.map((news) => (
            <div
              key={news._id}
              className="bg-white flex overflow-hidden flex-row-reverse"
            >
              <div className="w-2/5 relative h-full aspect-[2/1] overflow-hidden">

                {news.images?.[0] && (
                  <Image
                    src={news.images[0]}
                    alt={news.newsTitle || "News Image"}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    width={500}
                    height={1000}
                  />
                )}
              </div>
              <div className="flex-1 pe-1">
                <h2 className="text-lg font-bold hover:text-blue-600">
                  <Link href={`/national/${news.slug}`}>{news.newsTitle}</Link>
                </h2>
                <p className="text-sm text-gray-600 touch-pan-right">
                  {truncateText(news.shortDescription, 300)}
                </p>
                <p className="text-blue-600 text-sm">
                  <Link href={`/national`}>আরো পড়ুন</Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
