"use client";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import Marquee from "react-fast-marquee";
import Link from "next/link";

import "./BreakingNews.css"; 
import Loading from "../_components/Loading";

const BreakingNews = () => {
  const { newsData, loading, error } = useSpecificNewsData({limit:'1000'});

  if (loading) {
    return <Loading/>;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }



  return (
    <div className="breaking-news-container  dark:bg-gray-600 lg:bg-[#333]">
      <h2 className="breaking-news-title text-white">ব্রেকিং নিউজ</h2>
      <Marquee pauseOnHover={true} speed={50}>
        {newsData.map((news, index) => {
          
          return (
            <div key={index} className="breaking-news-item ">
              <Link href={`/${news.category?.slug ?? "national"}/${news._id}`}>{news.newsTitle}</Link>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default BreakingNews;
