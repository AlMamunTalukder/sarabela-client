"use client";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { getCategory } from "./getCategory";

const BreakingNews = () => {
  const { newsData, loading, error } = useSpecificNewsData({limit:'1000'});

  if (loading) {
    return <h3>Loading.......</h3>;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  // const searchCategory = newsData && newsData[0] ? newsData[0]?.category?.name : "";
  // const category = getEnglishCategory(searchCategory);

  return (
    <div className="flex" style={{ background: "#333", color: "#fff", padding: "10px 0" }}>
      <h2 style={{ textAlign: "center" }} className="w-[180px] text-center  ">ব্রেকিং নিউজ</h2>
      <Marquee pauseOnHover={true} speed={50}>
        
        {newsData.map((news, index) => {
          const basePath = getCategory(news?.category?.name);

          return (
            <div key={index} style={{ marginRight: "50px", fontSize: "16px" }}>
            <Link href={`${basePath}/${news.slug}`} style={{ color: "#fff", textDecoration: "none" }}>
              {news.newsTitle}
            </Link>
          </div>
          )
        })}
      </Marquee>
    </div>
  );
};

export default BreakingNews;
