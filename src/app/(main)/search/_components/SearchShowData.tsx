import Image from "next/image";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";
import truncateText from "@/util/truncate";
import { TNews } from "@/types";

type NewsProps = {
  newsData: TNews[];
  loading: any;
  error: any;
  category: string;
};

const SearchShowData = ({ newsData, loading, error, category }: NewsProps) => {
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Oops! data not found .</p>;
  }
  return (
    <div className="max-w-7xl mx-auto p-2">
      <div className="grid grid-cols-1 gap-6">
        {newsData.map((news) => (
          <Link key={news._id} href={`${category}/${news.slug}`}>
            <div className="flex bg-white  border border-gray-200 hover:shadow-lg transition-shadow duration-200 rounded">
              <div className="w-[120px] h-[120px] flex-shrink-0 ">
                {news.images.slice(0, 1).map((img) => (
                  <Image
                    key={img}
                    src={img}
                    alt={news.newsTitle}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover rounded-l"
                  />
                ))}
              </div>

              <div className="p-4">
                <h2 className="lg:text-xl hover:text-blue-500 font-semibold text-gray-800">
                  {news.newsTitle}
                </h2>
                <p className="hidden lg:flex text-gray-600 hover:text-blue-500 mt-2">
                  {news?.description
                    ? parse(truncateText(news.description, 200))
                    : ""}
                </p>
                <p className="lg:hidden text-gray-600 hover:text-blue-500 mt-2">
                  {news?.description
                    ? parse(truncateText(news.description, 50))
                    : ""}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchShowData;
