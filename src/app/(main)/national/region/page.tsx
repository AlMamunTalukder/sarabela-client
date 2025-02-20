"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import Image from "next/image";
import Img1 from "../../../../assets/19691457_115.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const newsData = [
  {
    title: "নরসিংদীতে ধানখেতে পড়ে ছিল শ্রমিকের গলাকাটা লাশ",
    description:
      "খবর পেয়ে দূর্গাপুর নরসিংদী থানার পুলিশ ঘটনাস্থলে গিয়ে লাশ উদ্ধার করে।",
    date: "১২ ফেব্রুয়ারি ২০২৫",
    image: Img1,
  },
  {
    title: "নরসিংদীতে টেক্সটাইল কারখানার গুদামে আগুন",
    description:
      "এই কারখানার নাম মরিয়ম টেক্সটাইল। আগুনের সূত্রপাত ও ক্ষয়ক্ষতির পরিমাণ নির্ণিত হতে পারেনি।",
    date: "১১ ফেব্রুয়ারি ২০২৫",
    image: Img1,
  },
  {
    title: "নরসিংদীতে টেক্সটাইল কারখানার গুদামে আগুন",
    description:
      "এই কারখানার নাম মরিয়ম টেক্সটাইল। আগুনের সূত্রপাত ও ক্ষয়ক্ষতির পরিমাণ নির্ণিত হতে পারেনি।",
    date: "১১ ফেব্রুয়ারি ২০২৫",
    image: Img1,
  },
  {
    title: "নরসিংদীতে টেক্সটাইল কারখানার গুদামে আগুন",
    description:
      "এই কারখানার নাম মরিয়ম টেক্সটাইল। আগুনের সূত্রপাত ও ক্ষয়ক্ষতির পরিমাণ নির্ণিত হতে পারেনি।",
    date: "১১ ফেব্রুয়ারি ২০২৫",
    image: Img1,
  },
  {
    title: "নরসিংদীতে টেক্সটাইল কারখানার গুদামে আগুন",
    description:
      "এই কারখানার নাম মরিয়ম টেক্সটাইল। আগুনের সূত্রপাত ও ক্ষয়ক্ষতির পরিমাণ নির্ণিত হতে পারেনি।",
    date: "১১ ফেব্রুয়ারি ২০২৫",
    image: Img1,
  },
];

export default function NewsSection() {
  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Subtitle and Title */}
      <h3 className="text-lg font-semibold text-gray-600">উপজেলা</h3>
      <h2 className="text-3xl font-bold text-red-600">নরসিংদী সদর</h2>

      <hr className="my-4" />

      {/* Filter Section */}
      <div className="grid grid-cols-12 gap-4 xl:6">
        {/* Left Section: Filters */}
        <div className="lg:col-span-4 col-span-full space-y-3">
          <h4 className="text-lg font-semibold text-blue-600">
            আমার এলাকার খবর
          </h4>
          <div className="flex justify-center">
            <Select>
              <SelectTrigger className="w-full border py-3 rounded-lg">
                <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>বিভাগ</SelectLabel>
                  <SelectItem value="ঢাকা">ঢাকা</SelectItem>
                  <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
                  <SelectItem value="খুলনা">খুলনা</SelectItem>
                  <SelectItem value="রাজশাহী">রাজশাহী</SelectItem>
                  <SelectItem value="সিলেট">সিলেট</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Select>
              <SelectTrigger className="w-full border py-3 rounded-lg">
                <SelectValue placeholder="জেলা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>জেলা</SelectLabel>
                  <SelectItem value="ফরিদপুর">ফরিদপুর</SelectItem>
                  <SelectItem value="গাজীপুর">গাজীপুর</SelectItem>
                  <SelectItem value="নারায়ণগঞ্জ">নারায়ণগঞ্জ</SelectItem>
                  <SelectItem value="বরিশাল">বরিশাল</SelectItem>
                  <SelectItem value="রংপুর">রংপুর</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Select>
              <SelectTrigger className="w-full border py-3 rounded-lg">
                <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>উপজেলা</SelectLabel>
                  <SelectItem value="টঙ্গী">টঙ্গী</SelectItem>
                  <SelectItem value="সাভার">সাভার</SelectItem>
                  <SelectItem value="সোনারগাঁও">সোনারগাঁও</SelectItem>
                  <SelectItem value="মির্জাপুর">মির্জাপুর</SelectItem>
                  <SelectItem value="মানিকগঞ্জ">মানিকগঞ্জ</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full flex items-center gap-2">
            <Search size={18} /> খুঁজুন
          </Button>
        </div>

        {/* Right Section: News Cards */}
        <div className="lg:col-span-8 col-span-full space-y-5">
          {newsData.map((news, index) => (
            <div key={index}>
              <Card className="p-4 flex gap-4">
                <div className="flex-1">
                  <Link href={"#"}>
                  <h3 className="text-lg font-semibold hover:text-blue-500">{news.title}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">
                    {news.description}
                  </p>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <Image
                  src={news.image}
                  alt={news.title}
                  width={120}
                  height={80}
                  className="rounded-lg object-cover"
                />
              </Card>
            </div>
          ))}

<Button className="w-full flex items-center gap-2">
            <Search size={18} /> আরও
          </Button>

        </div>

       

      </div>
    </div>
  );
}
