"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TNews } from "@/types";
import truncateText from "@/util/truncate";
import parse from 'html-react-parser'
type NewsProps = {
  newsData: TNews[]
}

const NewsCard = ({ newsData }: NewsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Trending News */}
        {
          newsData?.slice(0, 1).map((news) => (
            <div key={news._id} className="col-span-1 sm:col-span-2">
              <Link href={`sports/${news.slug}`} className="block group">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">

                    {news?.images?.[0] && (
                      <Image
                        src={news?.images[0]}
                        alt={news?.newsTitle || "News Image"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                        width={500}
                        height={500}
                        className="object-cover w-full h-full "
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

          ))
        }
        {/* Normal News */}
        {newsData?.slice(0, 2)?.map((news) => (
          <div key={news._id} className="col-span-1">
            <Link href={`sports/${news.slug}`} className="block group">
              <article className="bg-white overflow-hidden">
                <div className="flex flex-row sm:flex-row lg:flex-col h-full">
                  {/* Image container */}
                  <div className="w-1/3 sm:w-1/2 lg:w-full relative">
                    <div className="overflow-hidden">
                      <div className="relative aspect-[3/2]">
                        {news?.images?.[0] && (
                          <Image
                            src={news?.images[0]}
                            alt={news?.newsTitle || "News Image"}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                            width={500}
                            height={500}
                            className="object-cover transform transition-transform duration-500 group-hover:scale-110"

                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content container */}
                  <div className="w-2/3 sm:w-1/2 lg:w-full px-2">
                    <div className="space-y-2">
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {news.newsTitle}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
                        {parse(truncateText(news?.description, 100))}
                      </p>

                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
