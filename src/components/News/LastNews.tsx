"use client";
import { sortByDate } from "@/util/sort";
import truncateText from "@/util/truncate";
import Link from "next/link";
import parse from "html-react-parser";
import { formatDate } from "@/util/formateDate";
import UseNewsTagsData from "@/hooks/useNewsTagsData";
import { getCategory } from "@/util/getCategory";

type tagsProps = {
  tagName: string;
};

const LastNews = ({ tagName }: tagsProps) => {
  const { newsData, loading, error } = UseNewsTagsData(tagName);

  if (loading) {
    return <h3>Loading.......</h3>;
  }
  if (error) {
    return <h3>Oops! Data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");

  return (
    <div
      className="w-full max-h-[200px] lg:max-h-[700px] px-2 md:px-4 overflow-y-auto 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <ul className="divide-y divide-gray-200">
        {sortNewsData?.map((news) => {
          const basePath = getCategory(news.category);
          return (
            <li
              key={news?._id}
              className="py-3 md:py-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <Link href={`${basePath}/${news.slug}`} className="block space-y-1">
                <h3
                  className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 
                  line-clamp-1 hover:text-blue-600 transition-colors"
                >
                  {news?.newsTitle}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                  {news?.description ? parse(truncateText(news.description, 150)) : ""}
                </p>
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
                  <span>{formatDate(news?.postDate)}</span>
                  <span className="text-blue-500 hover:text-blue-700">আরও পড়ুন</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LastNews;
