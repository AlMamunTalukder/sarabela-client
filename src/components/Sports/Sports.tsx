"use client";
import NewsCard from "./NewsCard";
import SaidTabs from "./SaidTabs";
import SaidBar from "./SaidBar";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";
import { getCategory } from "@/util/getCategory";
import Loading from "../Share/_components/Loading";

const Sports = () => {
  const basePath = "/sports";
  const category = getCategory(basePath);

  const { newsData, loading, error } = useSpecificNewsData({
    category: category,
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");

  return (
    <section className="border-t-2 my-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl border-blue-500 border-s-4 font-bold my-4 ps-2">
          খেলাধুলা
        </h1>

        <p className="text-blue-600 hover:text-blue-700 flex items-center text-xl">
          <Link href={`/sports`}> আরো দেখুন </Link>
          <span>
            <ChevronsRight size={30} />
          </span>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-3 my-4">
        {/* Trending News Section */}
        <div className="lg:order-1 order-3 lg:w-3/12 w-full lg:mt-0 mt-4">
          <SaidTabs />
        </div>

        {/* news card */}
        <div className="lg:order-2 order-1 lg:w-3/6 w-full">
          <NewsCard newsData={sortNewsData} />
        </div>


        {/* Sidebar */}
        <div className="hidden lg:block lg:order-3 order-2 lg:w-3/12 w-full">
          <SaidBar category={category} basePath={basePath} />
        </div>
      </div>
    </section>
  );
};

export default Sports;
