/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { formatDate } from "@/util/formateDate";
import { sortByDate } from "@/util/sort";
import truncateText from "@/util/truncate";
import parse from "html-react-parser";
import Link from "next/link";

type tagsProps = {
  tagName: string;
};
const Discussed = ({ tagName }: tagsProps) => {
  const { newsData, loading, error } = useSpecificNewsData(tagName);

  if (loading) {
    return <h3>Loading.......</h3>;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");

  return (
    <div
      className="p-4 max-h-[200px] lg:max-h-[650px] overflow-y-auto [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] 
          [scrollbar-width:none]"
    >
      <ul className="space-y-4">
        {sortNewsData.map((news, index) => (
          <li
            key={index}
            className="border-b last:border-b-0 pb-4 last:pb-0 hover:bg-gray-50 transition"
          >
            <Link href={`international/${news.slug}`} className="block">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                {news.newsTitle}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {parse(truncateText(news?.description, 200))}
              </p>
              <span className="text-xs text-gray-500">
                {formatDate(news.postDate)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Discussed;
