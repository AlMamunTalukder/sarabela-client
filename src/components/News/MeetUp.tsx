"use client";
import Link from "next/link";

const meetsUp = [
  {
    id: 1,
    title: "বিশ্ব পরিবেশ দিবসে বাংলাদেশের উদ্দীপনা",
    description:
      "বিশ্ব পরিবেশ দিবসে বাংলাদেশ সরকারের উদ্যোগে পরিবেশ সচেতনতা নিয়ে একটি আলোচনা অনুষ্ঠান আয়োজন করা হয়েছে।",
    date: "২০২৪-১২-০৫",
  },
  {
    id: 2,
    title: "ডিজিটাল বাংলাদেশের ভবিষ্যত: একটি সেমিনার",
    description:
      "ডিজিটাল বাংলাদেশ ভিশনের সফল বাস্তবায়ন নিয়ে প্রযুক্তি বিশেষজ্ঞদের অংশগ্রহণে একটি সেমিনার অনুষ্ঠিত হবে।",
    date: "২০২৪-১২-০৪",
  },
  {
    id: 3,
    title: "পরিবেশ সংরক্ষণ: বাংলাদেশের নতুন উদ্যোগের উপর আলোচনা",
    description:
      "বাংলাদেশ সরকারের পরিবেশ সংরক্ষণ প্রকল্প নিয়ে একটি নাগরিক সম্মেলন অনুষ্ঠিত হবে।",
    date: "২০২৪-১২-০৩",
  },
  {
    id: 4,
    title: "নিরাপদ সড়ক ও পরিবহন ব্যবস্থা নিয়ে আলোচনা",
    description:
      "নিরাপদ সড়ক ব্যবস্থার উন্নতি এবং পরিবহন খাতের সুরক্ষা নিয়ে একটি পাবলিক ফোরাম অনুষ্ঠিত হবে।",
    date: "২০২৪-১২-০৩",
  },
  {
    id: 5,
    title: "গ্রামীণ উন্নয়নে প্রযুক্তির ভূমিকা",
    description:
      "গ্রামীণ অঞ্চলে প্রযুক্তির সেবা এবং তার উন্নয়নে এক আলোচনা সভা অনুষ্ঠিত হবে।",
    date: "২০২৪-১২-০৩",
  },
  {
    id: 7,
    title: "শিক্ষা খাতে নতুন প্রযুক্তি: সেমিনার",
    description:
      "শিক্ষা খাতে প্রযুক্তি ব্যবহারের নতুন দিগন্ত নিয়ে একটি সেমিনার অনুষ্ঠিত হবে।",
    date: "২০২৪-১২-০৩",
  },
  {
    id: 8,
    title: "সামাজিক নিরাপত্তা নেটওয়ার্কের ভবিষ্যত",
    description:
      "বাংলাদেশে সামাজিক নিরাপত্তা নেটওয়ার্কের উন্নয়ন এবং ভবিষ্যৎ পরিকল্পনা নিয়ে একটি সভা অনুষ্ঠিত হবে।",
    date: "২০২৪-১২-০৩",
  },
  {
    id: 9,
    title: "বাংলাদেশের জলবায়ু পরিবর্তন: প্রভাব ও সমাধান",
    description:
      "জলবায়ু পরিবর্তনের প্রভাব এবং তার বিরুদ্ধে বাংলাদেশের উদ্যোগ নিয়ে একটি সেমিনার হবে।",
    date: "২০২৪-১২-০৩",
  },
];

const MeetUp = () => {
  return (
    <div
      className="max-h-[200px] lg:max-h-[400px] p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden 
        [-ms-overflow-style:none] 
        [scrollbar-width:none]"
    >
      <ul className="space-y-4">
        {meetsUp.map((news) => (
          <li key={news.id} className="border-b pb-4">
            <Link href={`/view_details`}>
              <h3 className="text-lg font-semibold hover:text-blue-500">
                {news.title}
              </h3>
              <p className="text-sm text-gray-600">{news.description}</p>
              <span className="text-xs text-gray-500">{news.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetUp;
