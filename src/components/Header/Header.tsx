/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import DateAndTime from "@/lib/dateAndTime";
import Link from "next/link";
import banner from "@public/asset/banner.jpg";
import logo from '../../../public/asset/logo/logo2.png'
import HeaderData from "./HeaderData";

const topNews = [
  {
    id: "01",
    title:
      "ঢাকায় বড় পরিসরে শুরু হয়েছে বইমেলা ঢাকায় বড় পরিসরে শুরু হয়েছে বইমেলা",
    image: "/asset/topnews/image-1 (1).jpeg",
    description:
      "জাতীয় গ্রন্থাগারের প্রাঙ্গণে শুরু হয়েছে এবারের বইমেলা, যেখানে শতাধিক প্রকাশনা প্রতিষ্ঠান অংশগ্রহণ করছে।",
  },
  {
    id: "02",
    title:
      "বিশ্বকাপ ক্রিকেটে বাংলাদেশের জয় ঢাকায় বড় পরিসরে শুরু হয়েছে বইমেলা",
    image: "/asset/topnews/image-1 (1).jpg",
    description:
      "বিশ্বকাপ ক্রিকেটে পাকিস্তানকে ৫ উইকেটে হারিয়ে বাংলাদেশ দলের দুর্দান্ত পারফরম্যান্স।",
  },
];

const Header = () => {

  return (
    <section className="hidden lg:block border-b-2 bg-white dark:bg-gray-600">
      <div className="max-w-7xl mx-auto grid grid-cols-4 items-center justify-between gap-2">
        {/* Logo and Date */}
        <div className="flex items-center grid-cols-1 gap-2">
          <Link href="/" className="relative w-full aspect-[3/2]">
            <Image
              src={logo}
              alt="daily times 24"
              objectFit="fill"
              fill
              priority

            />
          </Link>
          <div className="text-gray-800 dark:text-gray-300">
            <DateAndTime />
          </div>
        </div>

        {/* Banner */}
        <div className="flex w-full col-span-1 flex-col lg:flex-row">
          <Image
            src={banner}
            alt="banner"
            className="w-full"
            placeholder="blur"
          />
        </div>

        {/* Top News */}
        <HeaderData />
      </div>
    </section>
  );
};

export default Header;
