"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import vote from "../../../../public/asset/politics/vote.jpg";
import parliament from "../../../../public/asset/politics/perliment.jpg";
import team from "../../../../public/asset/politics/team.jpg";

// Sample Politics Data
const politicsData = [
  {
    id: "01",
    category: "রাজনীতি",
    title: "সংসদে নতুন কর সংস্কার বিল পাস",
    description:
      "সরকার সংসদে নতুন কর সংস্কার বিল পাস করেছে, যা রাজস্ব বৃদ্ধির প্রতিশ্রুতি দিচ্ছে।",
    date: "২০২৪-১২-০৪",
    news_type: "trending",
    published_time: "09:00",
    image: parliament,
  },
  {
    id: "02",
    category: "রাজনীতি",
    title: "বাজেট বরাদ্দ নিয়ে সমালোচনা",
    description:
      "বিরোধী দলের নেতা বাজেটকে সমালোচনা করেছেন, দাবি করেছেন এটি মধ্যবিত্তের উদ্বেগগুলিকে সমাধান করতে ব্যর্থ হয়েছে।",
    date: "২০২৪-১২-০৪",
    news_type: "normal",
    published_time: "12:00",
    image: team,
  },
  {
    id: "03",
    category: "রাজনীতি",
    title: "স্থানীয় সরকার নির্বাচনের তারিখ ঘোষণা",
    description:
      "নির্বাচন কমিশন স্থানীয় সরকার নির্বাচনের তারিখ ঘোষণা করেছে, যা আগামী মাসে অনুষ্ঠিত হবে।",
    date: "২০২৪-১২-০৪",
    news_type: "normal",
    published_time: "14:30",
    image: vote,
  },
  {
    id: "04",
    category: "রাজনীতি",
    title: "সাংসদদের বেতন বৃদ্ধির প্রস্তাব",
    description:
      "সরকার সাংসদদের বেতন বাড়ানোর একটি প্রস্তাব বিবেচনা করছে, যা জনগণের মধ্যে মিশ্র প্রতিক্রিয়া সৃষ্টি করেছে।",
    date: "২০২৪-১২-০৪",
    news_type: "normal",
    published_time: "16:00",
    image: team,
  },
  {
    id: "05",
    category: "রাজনীতি",
    title: "রাজনৈতিক দলগুলির মধ্যে ঐক্য",
    description:
      "রাজনৈতিক দলগুলির মধ্যে ঐক্য আলোচনা শুরু হয়েছে, যা দেশকে সামনে এগিয়ে নিতে সহায়ক হতে পারে বলে আশা করা হচ্ছে।",
    date: "২০২৪-১২-০৪",
    news_type: "normal",
    published_time: "18:45",
    image: team,
  },
];

const NewsCard = () => {
  const trendingNews = politicsData.find(
    (news) => news.news_type === "trending"
  );

  const normalNews = politicsData.filter((news) => news.news_type === "normal");

  return (
    <div className="container mx-auto">
      <div className="border-l-4 border-green-500">
        <h1 className="text-4xl font-bold my-4 pl-2">রাজনীতি</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Display Trending News (Spanning two columns) */}
        {trendingNews && (
          <div className="col-span-4 bg-gray-100 relative overflow-hidden">
            <div className="hover:scale-110 duration-500">
              <Image
                src={trendingNews.image}
                alt={trendingNews.title}
                objectFit="cover"
                placeholder="blur"
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
              objectFit="cover"
              placeholder="blur"
              className="w-full h-[200px]"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold hover:text-blue-600">
                <Link href={`view_details/${news.id}`}>{news.title}</Link>
              </h2>
              <p className="text-sm text-gray-600">{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
