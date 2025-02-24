"use client";
import TrendingCard from "./TrendingCard";
import SectionHeader from "./SectionHeader";
import SaidTabs from "../LeadNews/SaidTabs";
import ImportantNewsCard from "./ImportantNewsCard";

const Trending = () => {
  return (
    <div className="pt-4">
      <div className="flex flex-col lg:flex-row-reverse justify-between gap-4">
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row  justify-between gap-4">
          {/* Trending News Section */}
          <div>
            <SectionHeader title="সম্ভার" />
            <div
              className="flex flex-col gap-6 w-full max-h-[300px]   lg:max-h-[715px]   overflow-y-auto 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <TrendingCard />
            </div>
          </div>

          <div className="hidden lg:block border-s dark:border-gray-300 border-black"></div>
          {/* Normal News Section */}
          <div>
            <SectionHeader title="গুরুত্বপূর্ণ" />
            <div
              className="flex flex-col gap-6 w-full  max-h-[300px]   lg:max-h-[715px]  overflow-y-auto 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <ImportantNewsCard />
            </div>
          </div>
          <div className="hidden lg:block border-s dark:border-gray-300 border-black"></div>
        </div>

        {/* Table Section */}
        <div className="lg:w-1/4 w-full mt-4 lg:mt-0">
          <SaidTabs />
        </div>
      </div>
    </div>
  );
};

export default Trending;
