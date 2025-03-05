"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";
import { PlayCircle } from "lucide-react";
import { formatDate } from "@/util/formateDate";
import parse from "html-react-parser";
import SocialShare from "./Comment/SocialShare";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { TNews } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Clock3, SquarePen, UserRound } from "lucide-react";
import { AiFillHome } from "react-icons/ai";

interface NewsCardProps {
  news: TNews & { videoUrl?: string };
}

const NewsCard: React.FC<NewsCardProps> = ({ news }: NewsCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <article className="lg:pt-8" id="news-content">
      <div className="lg:hidden flex justify-between">
        <Breadcrumb className="mb-2">
          <BreadcrumbList className="text-black">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <AiFillHome className=" w-[18px] lg:w-[17px] h-[18px] lg:h-[17px]" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">রাজনীতি</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-2">
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SquarePen size={"16px"} />
            <h5>অনলাইন সংস্করণ</h5>
          </div>
        </div>
      </div>


      <h2 className="text-2xl md:text-3xl font-semibold dark:text-white text-gray-800 mt-2">
        {news?.newsTitle}
      </h2>
      <div className="lg:hidden mt-2">
       
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <UserRound size={"16px"} />
            <h5>ডেস্ক রিপোর্ট</h5>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock3 size={"20px"} />
            <h5>আপডেট: ০৫:৫৫ পিএম, ১৭ জানুয়ারী, শুক্রবার, ২০২৫</h5>
          </div>
         
        </div>
      </div>
      <SocialShare newsId={news._id} />
      <div className="relative w-full overflow-hidden aspect-[3/2] mt-5">
        {news?.videoUrl ? (
          <div className="relative w-full h-full">
            <ReactPlayer
              url={news.videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              controls
              light={news?.images?.[0] || "/placeholder.svg"}
              playIcon={
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-30"
                  onClick={handlePlayClick}
                >
                  <PlayCircle className="w-16 h-16 text-white" />
                </button>
              }
            />
          </div>
        ) : (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {news?.images?.length > 0 ? (
                <figure className="relative w-full">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={news.images[0] || "/placeholder.svg"}
                      alt={news.newsTitle || "News Image"}
                      blurDataURL="/placeholder.jpg"
                      placeholder="blur"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </figure>
              ) : (
                <div className="relative aspect-[16/9] w-full bg-gray-200 flex items-center justify-center">
                  <p className="dark:text-white text-gray-500">
                    No Image Available
                  </p>
                </div>
              )}
            </CardContent>
            {news?.imageTagline && (
              <CardFooter className="px-4 py-3 text-sm text-muted-foreground flex justify-center">
                <p className="font-bengali text-center">
                  {news.imageTagline}{" "}
                  <span className="dark:text-white text-gray-500">
                    ছবি : সারাবেলানিউজ২৪
                  </span>
                </p>
              </CardFooter>
            )}
          </Card>
        )}
      </div>
      <header className="mt-4">
        <p className="text-sm dark:text-gray-300 text-gray-500">
          {formatDate(news?.postDate)}
        </p>
      </header>
      <div className="mt-2">
        <p className="mt-2 dark:text-white text-gray-700">
          {news?.description ? parse(news.description) : ""}
        </p>
        <p className="mt-1 text-sm dark:text-gray-300 text-gray-500">
          Estimated Read Time: {formatDate(news?.postDate)}
        </p>
      </div>
    </article>
  );
};

export default NewsCard;
