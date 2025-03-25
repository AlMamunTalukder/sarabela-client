"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import coding from "../../../../public/asset/Technology/coding.jpg";
import industry from "../../../../public/asset/Technology/industry.jpg";
import monitoring from "../../../../public/asset/Technology/monitoring.jpg";
import programing from "../../../../public/asset/Technology/programing.jpg";

const technology_news = [
  {
    id: 1,
    category: "Technology",
    title: "বাংলাদেশে প্রযুক্তির অগ্রগতি",
    description:
      "বাংলাদেশে নতুন প্রযুক্তি উদ্ভাবন এবং ব্যবহারের ক্ষেত্রে উল্লেখযোগ্য অগ্রগতি হয়েছে।",
    date: "2024-12-03",
    news_type: "trending",
    published_time: "08:00",
    image: coding,
  },
  {
    id: 2,
    category: "Technology",
    title: "বাংলাদেশে ৫জি প্রযুক্তির উদ্বোধন",
    description:
      "বাংলাদেশে ৫জি নেটওয়ার্ক চালু হয়েছে, যা দ্রুত ইন্টারনেট এবং নতুন প্রযুক্তিগত উদ্ভাবনকে সমর্থন করবে।",
    date: "2024-12-02",
    news_type: "normal",
    published_time: "10:30",
    image: industry,
  },
  {
    id: 3,
    category: "Technology",
    title: "বাংলাদেশে প্রযুক্তি খাতে বিনিয়োগ বৃদ্ধি পাচ্ছে",
    description: "বাংলাদেশের  দেশের ডিজিটাল পরিকাঠামো উন্নত করতে সাহায্য করবে।",
    date: "2024-12-01",
    news_type: "normal",
    published_time: "12:15",
    image: monitoring,
  },
  {
    id: 4,
    category: "Technology",
    title: "বাংলাদেশে নতুন প্রযুক্তিগত শিক্ষা কেন্দ্র প্রতিষ্ঠা",
    description:
      "বাংলাদেশে নতুন প্রযুক্তিগত শিক্ষা কেন্দ্র প্রতিষ্ঠিত হয়েছে, যা যুবকদের দক্ষতা উন্নয়ন করবে।",
    date: "2024-11-30",
    news_type: "normal",
    published_time: "16:30",
    image: programing,
  },
  {
    id: 5,
    category: "Technology",
    title: "বাংলাদেশে স্মার্ট সিটি উদ্যোগের অগ্রগতি",
    description:
      "বাংলাদেশে স্মার্ট সিটি প্রকল্পের কাজ শুরু হয়েছে, যা শহরের অবকাঠামো এবং জীবনযাত্রার মান উন্নত করবে।",
    date: "2024-11-29",
    news_type: "normal",
    published_time: "09:00",
    image: coding,
  },
];

const NewsCard = () => {
  const trendingNews = technology_news.find(
    (news) => news.news_type === "trending"
  );
  const normalNews = technology_news.filter(
    (news) => news.news_type === "normal" && news.category === "Technology"
  );

  return (
    <div className="container mx-auto">
      <div className="border-s-4 border-green-500 ">
        <h1 className="text-4xl font-bold my-4 ps-2">প্রযুক্তি</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Display Trending News (Spanning two columns) */}
        {trendingNews && (
          <div className="col-span-4 bg-gray-100 relative overflow-hidden">
            <div className="hover:scale-110 duration-500">
              <Image
                src={trendingNews.image}
                alt={trendingNews.title}
                placeholder="blur"
                objectFit="cover"
                className="w-full h-[400px]"
              />
            </div>
            <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
              <h1 className="text-3xl font-bold text-white hover:text-yellow-400">
                <Link href={`view_details/${trendingNews.id}`}>
                  {trendingNews.title}
                </Link>
              </h1>
            </div>
          </div>
        )}

        {/* Display Remaining Normal News */}
        {normalNews.map((news) => (
          <div key={news.id} className="bg-white overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              width={400}
              height={300}
              placeholder="blur"
              objectFit="cover"
              className="w-full h-[200px]"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold hover:text-blue-600">
                <Link href={`view_details/${news.id}`}>{news.title}</Link>
              </h2>
              <p className="text-sm text-gray-600 text-wrap">
                {news.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
