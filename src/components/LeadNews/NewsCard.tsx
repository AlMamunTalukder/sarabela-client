/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import Link from "next/link";
import LeadNewsCard from "./LeadNewsCard";
import { sortByDate } from "@/util/sort";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { getCategory } from "@/util/getCategory";

const NewsCard = () => {
  const basePath = "/international";
  const category = getCategory(basePath);

  const { newsData, loading, error } = useSpecificNewsData(category);
  if (loading) {
    return <h3>Loading.......</h3>;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Side News */}
        <div className="hidden lg:flex flex-col gap-4 border-e border-gray-500 pe-2">
          {newsData?.slice(0, 3)?.map((news) => (
            <Link
              key={news._id}
              href={`/international/${news.slug}`}
              className="group flex flex-row-reverse gap-2 border-b  border-gray-200 p-1"
            >
              <div className="w-full overflow-hidden">
                <div className="relative w-full aspect-[3/2] transform transition-transform duration-500 hover:scale-105">
                  {news.images && news.images.length > 0 && (
                    <Image
                      src={news?.images[0] || "/placeholder.svg"}
                      alt={news?.newsTitle}
                      objectFit="fill"
                      fill
                      priority
                      placeholder="blur"
                      blurDataURL="/placeholder.svg"
                    />
                  )}
                </div>
              </div>
              <div className="w-full ps-2 lg:pt-2">
                <h2 className="text-xl font-bold hover:text-blue-600 transition-colors">
                  {news.newsTitle}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:col-span-2">
          {sortNewsData?.slice(0, 1)?.map((news) => (
            <div key={news._id}>
              <Link
                href={`/international/${news.slug}`}
                className="block group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="relative w-full aspect-[3/2] transform transition-transform duration-500 group-hover:scale-110">
                    {news?.images?.[0] && (
                      <Image
                        src={news?.images[0]}
                        alt={news?.newsTitle || "News Image"}
                        placeholder="blur"
                        blurDataURL="/placeholder.jpg"
                        objectFit="fill"
                        fill
                        priority

                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 p-4 bg-white w-full">
                    <h1 className="text-2xl lg:text-4xl font-semibold group-hover:text-yellow-500 transition-colors">
                      {news.newsTitle}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-500" />

      {/* Bottom News Grid */}
      <LeadNewsCard newsData={sortNewsData} />
    </div>
  );
};

export default NewsCard;
