/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { getCategory } from "@/util/getCategory";
import { sortByDate } from "@/util/sort";
import truncateText from "@/util/truncate";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { formatDate } from "@/util/formateDate";
interface TopNewsProps {
  basePath?: string;
  category:string;
}

const RelatedNews = ({category, basePath = "/international" }: TopNewsProps) => {
  // const category = getCategory(basePath);
  const { newsData, loading, error } = useSpecificNewsData({category})

  if (loading) {
    return <h3>Loading.......</h3>
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(newsData, 'postDate')

  return (
    <div className="w-full p-2 border-t">
      <h1 className="text-2xl font-bold mb-4">সম্পর্কিত খবর</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortNewsData?.map((newsItem) => (
          <div key={newsItem._id} className="flex items-start gap-4">

            {newsItem?.images?.[0] && (
              <Image
                src={newsItem?.images[0]}
                alt={newsItem?.newsTitle || "News Image"}
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
                className="w-20 h-20 object-cover"
                width={500}
                height={500}

              />
            )}

            <div>
              <h2 className="text-lg font-semibold hover:text-blue-600">
                <Link href={`${basePath}/${newsItem.slug}`}>{newsItem?.newsTitle}</Link>
              </h2>
              <p className="text-sm text-gray-600">  {newsItem?.description ? parse(truncateText(newsItem.description, 150)) : ""}</p>
              <p className="text-xs text-gray-500">
                {formatDate(newsItem?.postDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedNews;
