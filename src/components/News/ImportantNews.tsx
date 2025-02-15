"use client";

import truncateText from "@/util/truncate";
import Link from "next/link";
import parse from "html-react-parser";
import { formatDate } from "@/util/formateDate";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";
import Loading from "../Share/_components/Loading";
import { getEnglishCategory } from "@/util/getEnglishCategory";
// type BaseProps = {
//   basePath: string
//   category: string,

// }
const ImportantNews = () => {
  const { newsData, loading, error } = useSpecificNewsData({newsTag: 'important' });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");

  const searchCategory = newsData && newsData[0] ? newsData[0]?.category?.name : ''
  const basePath = getEnglishCategory(searchCategory)

  return (
    <div
      className="w-full max-h-[200px] lg:max-h-[700px] px-2 md:px-4 overflow-y-auto 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <ul className="divide-y divide-gray-200">
        {sortNewsData?.map((news) => {
          return (
            <li
              key={news?._id}
              className="py-3 md:py-4 transition-colors duration-200"
            >
              <Link
                href={`${basePath}/${news?.slug}`}
                className="block space-y-1"
              >
                <h3
                  className="text-sm md:text-base lg:text-lg font-semibold 
                  line-clamp-1 hover:text-blue-600 transition-colors"
                >
                  {news?.newsTitle}
                </h3>
                <p className="text-xs md:text-sm line-clamp-2">
                  {news?.description
                    ? parse(truncateText(news.description, 200))
                    : ""}
                </p>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span>{formatDate(news?.postDate)}</span>
                  <span className="text-blue-500 hover:text-blue-700">
                    আরও পড়ুন
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImportantNews;
