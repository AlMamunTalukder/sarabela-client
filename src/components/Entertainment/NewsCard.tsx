"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import Image2 from "@public/asset/entertainment/concert-1.jpg";
import Image3 from "@public/asset/entertainment/concert-2.jpg";
import Image4 from "@public/asset/entertainment/concert-3.jpg";
import Image1 from "@public/asset/entertainment/concert-4.jpg";

const news = [
  {
    id: 1,
    category: "Entertainment",
    title: "বিনোদন শিল্পে নতুন অগ্রগতি",
    description:
      "বিনোদন শিল্পে একটি নতুন যুগের সূচনা হয়েছে, যেখানে ক্রমাগত পরিবর্তন ঘটছে।",
    date: "2024-12-06",
    news_type: "trending",
    published_time: "10:00",
    image: Image1,
  },
  {
    id: 2,
    category: "Entertainment",
    title: "বাংলাদেশে সিনেমার চাহিদা বৃদ্ধি",
    description:
      "দেশে সিনেমার চাহিদা বৃদ্ধির সাথে সাথে নতুন সিনেমা নির্মাণের সংখ্যা বাড়ছে।",
    date: "2024-12-05",
    news_type: "normal",
    published_time: "12:00",
    image: Image2,
  },
  {
    id: 3,
    category: "Entertainment",
    title: "টেলিভিশন শোতে নতুন ধারাবাহিক",
    description:
      "বাংলাদেশের টেলিভিশন চ্যানেলে নতুন ধারাবাহিকের মাধ্যমে টেলিভিশন শোয়ের মান উন্নত হচ্ছে।",
    date: "2024-12-04",
    news_type: "normal",
    published_time: "14:00",
    image: Image3,
  },
  {
    id: 4,
    category: "Entertainment",
    title: "মঞ্চ নাটক এবং থিয়েটারের উন্নতি",
    description:
      "বাংলাদেশের মঞ্চ নাটক এবং থিয়েটারের শিল্পে দ্রুত উন্নতি ঘটছে, আন্তর্জাতিক দৃষ্টি আকর্ষণ করছে।",
    date: "2024-12-03",
    news_type: "normal",
    published_time: "16:30",
    image: Image4,
  },
  {
    id: 5,
    category: "Entertainment",
    title: "মঞ্চ নাটক এবং থিয়েটারের উন্নতি",
    description:
      "বাংলাদেশের মঞ্চ নাটক এবং থিয়েটারের শিল্পে দ্রুত উন্নতি ঘটছে, আন্তর্জাতিক দৃষ্টি আকর্ষণ করছে।",
    date: "2024-12-03",
    news_type: "normal",
    published_time: "16:30",
    image: Image4,
  },
  {
    id: 6,
    category: "Entertainment",
    title: "মঞ্চ নাটক এবং থিয়েটারের উন্নতি",
    description:
      "বাংলাদেশের মঞ্চ নাটক এবং থিয়েটারের শিল্পে দ্রুত উন্নতি ঘটছে, আন্তর্জাতিক দৃষ্টি আকর্ষণ করছে।",
    date: "2024-12-03",
    news_type: "normal",
    published_time: "16:30",
    image: Image4,
  },
];

const NewsCard = () => {
  const trendingNews = news.find((news) => news.news_type === "trending");
  const normalNews = news.filter(
    (news) => news.news_type === "normal" && news.category === "Entertainment"
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold border-s-4 border-blue-500 ps-4 my-4">বিনোদন</h1>

        <p className="text-blue-600 hover:text-blue-700 flex items-center text-xl">
          <Link href={`/entertainment`}> আরো দেখুন </Link>
          <span>
            <ChevronsRight size={30} />
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {trendingNews && (
          <div className="relative group order-1 lg:order-2 lg:col-span-2 ">
            <div className="overflow-hidden">
              <div className="relative overflow-hidden aspect-[3/2]">
                <Image
                  src={trendingNews.image}
                  alt={trendingNews.title}
                  placeholder="blur"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  fill
                />
              </div>
              <div className="absolute inset-0 flex items-end p-4">
                <Link href={`view_details`} className="text-2xl lg:text-4xl">
                  <h2 className="text-white text-xl md:text-4xl font-bold hover:text-yellow-400 transition-colors">
                    {trendingNews?.title}
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6 order-2 lg:order-1 lg:col-span-1 lg:border-e border-black pe-2">
          {normalNews.slice(0, 3).map((news, idx) => (
            <div
              key={idx}
              className="bg-white overflow-hidden flex items-stretch"
            >
              <div className="w-1/2 overflow-hidden ">
                <Image
                  src={news?.image}
                  alt={news?.title}
                  placeholder="blur"
                  className="object-cover  hover:scale-110 duration-700"
                />
              </div>
              <div className="flex-1 ps-4 flex flex-col justify-between">
                <Link href={`view_details`}>
                  <h2 className="text-lg font-bold mb-2 hover:text-blue-600">
                    {news?.title}
                  </h2>
                </Link>

                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {news?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block space-y-6 order-3 lg:order-3 lg:col-span-1 border-s border-black ps-2">
          {normalNews.slice(2).map((news) => (
            <div
              key={news.id}
              className="bg-white overflow-hidden flex items-stretch"
            >
              <div className="flex-1 pe-4 flex flex-col justify-between">
                <Link href={`view_details`}>
                  <h2 className="text-lg font-bold mb-2 hover:text-blue-600">
                    {news?.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {news?.description}
                </p>
              </div>
              <div className="w-1/2 overflow-hidden">
                <Image
                  src={news?.image}
                  alt={news?.title}
                  placeholder="blur"
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
