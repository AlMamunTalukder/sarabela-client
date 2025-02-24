/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TNews } from "@/types";
import { formatDate } from "@/util/formateDate";
import truncateText from "@/util/truncate";
import Link from "next/link";
import parse from "html-react-parser";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";
import Loading from "../Share/_components/Loading";

type tagsProps = {
  tagName: string;
};
const GoodNews = ({ tagName }: tagsProps) => {
  const { newsData, loading, error } = useSpecificNewsData({});

  if (loading) {
    return <Loading/>;
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
            className="border-b last:border-b-0 pb-4 last:pb-0 transition"
          >
            <Link href={`/${news?.category?.slug ?? 'national'}/${news._id}`} className="block">
              <h3 className="text-lg font-semibold  hover:text-blue-500">
                {news.newsTitle}
              </h3>
              <p className="text-sm  line-clamp-2">
                {parse(truncateText(news?.description, 200))}
              </p>
              <span className="text-xs">
                {formatDate(news.postDate)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoodNews;
