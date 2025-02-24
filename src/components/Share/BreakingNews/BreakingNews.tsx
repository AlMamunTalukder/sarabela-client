"use client";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { getCategory } from "@/util/getCategory";
import "./BreakingNews.css"; 

const BreakingNews = () => {
  const { newsData, loading, error } = useSpecificNewsData({limit:'1000'});

  if (loading) {
    return <h3>Loading.......</h3>;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }



  return (
    <div className="breaking-news-container">
      <h2 className="breaking-news-title">ব্রেকিং নিউজ</h2>
      <Marquee pauseOnHover={true} speed={50}>
        {newsData.map((news, index) => {
          // const basePath = getCategory(news?.category?.name);
          return (
            <div key={index} className="breaking-news-item">
              <Link href={`${news?.category?.slug}/${news._id}`}>{news.newsTitle}</Link>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default BreakingNews;
