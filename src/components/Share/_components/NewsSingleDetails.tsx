"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import SaidBar from "@/components/Sports/SaidBar";
import PaginationPages from "@/util/PaginationPages";
import NewsCard from "./NewsCard";
import Feedback from "./Comment/Feedback";
import Advertisements from "./Advertisment";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TNews } from "@/types";
import RelatedNews from "./RelatedNews";
import { getCategory } from "@/util/getCategory";
import { useGetSingleNewsQuery } from "@/redux/dailynews/news.api";
import SideBarRelatedNews from "./SideBarRelatedNews";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Clock3, House, SquarePen, UserRound } from "lucide-react";
import { AiFillHome } from "react-icons/ai";

interface TopNewsProps {
  basePath?: string;
  id: string;
}
const NewsSingleDetails = ({ basePath, id }: TopNewsProps) => {
  const category = getCategory(basePath);
  const { data } = useGetSingleNewsQuery(id);
  const singleNewsData = data?.data;
  const [fontSize, setFontSize] = useState(16);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* <div className="mt-2 lg:w-[250px]">
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
              <UserRound size={"16px"} />
              <h5>ডেস্ক রিপোর্ট</h5>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock3 size={"20px"} />
              <h5>আপডেট: ০৫:৫৫ পিএম, ১৭ জানুয়ারী, শুক্রবার, ২০২৫</h5>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SquarePen size={"16px"} />
              <h5>অনলাইন সংস্করণ</h5>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col lg:flex-row gap-4">




          <div className=" top-[70px]">

            <div className="hidden lg:block mt-8 ">
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
                  <UserRound size={"16px"} />
                  <h5>ডেস্ক রিপোর্ট</h5>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock3 size={"20px"} />
                  <h5>আপডেট: ০৫:৫৫ পিএম, ১৭ জানুয়ারী, শুক্রবার, ২০২৫</h5>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <SquarePen size={"16px"} />
                  <h5>অনলাইন সংস্করণ</h5>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-[300px]">
              <div className="sticky top-[70px]">
                <div className="py-2">
                  <SideBarRelatedNews category={category} basePath={basePath} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <div className="">
              <div className="space-y-6">
                <div className="overflow-hidden z-10 -mt[200px]">
                  {singleNewsData ? (
                    <NewsCard news={singleNewsData} />
                  ) : (
                    <p>Loading news...</p>
                  )}

                  {singleNewsData ? (
                    <Feedback news={singleNewsData} />
                  ) : (
                    <p>Loading news...</p>
                  )}
                  <Advertisements />
                  <RelatedNews category={category} basePath={basePath} />
                  <PaginationPages />
                </div>

                <div className="px-4 py-6 border-t border-gray-100"></div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-full lg:w-1/4">
            <div className="sticky top-[70px]">
              <div className="py-2">
                <SaidBar category={category} basePath={basePath} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsSingleDetails;
