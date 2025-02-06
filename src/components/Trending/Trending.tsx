'use client'
import TrendingCard from "./TrendingCard";
import SectionHeader from "./SectionHeader";

import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";
import SaidTabs from "../LeadNews/SaidTabs";


const Trending = () => {
  
    const { newsData, loading, error } = useSpecificNewsData()
    if (loading) {
      return <h3>Loading.......</h3>
    }
    if (error) {
      return <h3>Oops! data not found.</h3>
    }
  
    const sortNewsData = sortByDate(newsData, 'postDate')
  
  return (
    <div className="pt-4">
      <div className="flex flex-col lg:flex-row-reverse justify-between gap-4">
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row  justify-between gap-4">
          {/* Trending News Section */}
          <div>
            <SectionHeader title="সম্বার" />
            <div
              className="flex flex-col gap-6 w-full max-h-[300px]   lg:max-h-[400px]   overflow-y-auto 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <TrendingCard data={sortNewsData} />
            </div>
          </div>

          <div className="hidden lg:block border-s border-black"></div>
          {/* Normal News Section */}
          <div>
            <SectionHeader title="গুরুত্বপূর্ণ" />
            <div
              className="flex flex-col gap-6 w-full  max-h-[300px]  lg:max-h-[400px] overflow-y-auto 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <TrendingCard data={sortNewsData} />
            </div>
          </div>
          <div className="hidden lg:block border-s border-black"></div>
        </div>

        {/* Table Section */}
        <div className="lg:w-1/4 w-full mt-4 lg:mt-0">
          <SaidTabs basePath='/international'/>
        </div>
      </div>
    </div>
  );
};

export default Trending;
