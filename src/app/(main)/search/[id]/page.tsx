"use client";

import React from "react";
import Image from "next/image";
import image_1 from "@public/asset/bangladesh/bangladesh-top-1.jpg";
import image_2 from "@public/asset/bangladesh/economy.jpg";
import image_3 from "@public/asset/bangladesh/sport.jpg";
import image_4 from "@public/asset/bangladesh/technoloy.jpg";
import Link from "next/link";

const newsData = [
  {
    id: 1,
    title: "বাংলাদেশের অর্থনীতি নিয়ে নতুন চ্যালেঞ্জ",
    description:
      "বিশ্ববাজারে জ্বালানি তেলের মূল্যবৃদ্ধির প্রভাবে দেশের অর্থনীতিতে নতুন চ্যালেঞ্জ তৈরি হয়েছে।",
    image: image_1,
  },
  {
    id: 2,
    title: "বিশ্বকাপে বাংলাদেশের সম্ভাবনা",
    description:
      "আসন্ন বিশ্বকাপে বাংলাদেশ দল কেমন পারফর্ম করবে, তা নিয়ে ক্রীড়াপ্রেমীদের মধ্যে উত্তেজনা তুঙ্গে।",
    image: image_2,
  },
  {
    id: 3,
    title: "শিক্ষা ব্যবস্থায় নতুন সংস্কার",
    description:
      "সরকার উচ্চশিক্ষায় নতুন কিছু পরিবর্তন আনতে যাচ্ছে, যা শিক্ষার্থীদের জন্য গুরুত্বপূর্ণ হতে পারে।",
    image: image_3,
  },
  {
    id: 4,
    title: "ঢাকায় বৃষ্টির কারণে জলাবদ্ধতা",
    description:
      "রাজধানী ঢাকায় টানা বৃষ্টির ফলে বিভিন্ন এলাকায় জলাবদ্ধতার সৃষ্টি হয়েছে, জনদুর্ভোগ বেড়েছে।",
    image: image_4,
  },
];

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto p-2">
      <div className="grid grid-cols-1 gap-6">
        {newsData.map((item) => (
          <Link key={item.id} href={`/international/${item.id}`}>
            <div className="flex bg-white overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              {/* News Image */}
              <div className="relative w-[200px] h-[150px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* News Content */}
              <div className="p-4">
                <h2 className="text-xl hover:text-blue-500 font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 hover:text-blue-500 mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
