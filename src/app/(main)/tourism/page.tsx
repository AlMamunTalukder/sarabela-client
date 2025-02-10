'use client'

import Advertisement from "@/util/Advertisement";
import { getCategory } from "@/util/getCategory";
import OtherNews from "@/util/OtherNews";
import SideTabs from "@/util/SideTabs";
import TopNews from "@/util/TopNews";
import banner from "@public/asset/banner.jpg";
import { usePathname } from "next/navigation";

const Page = () => {
  const basePath = usePathname();
  const category = getCategory(basePath);

  return (
    <div className="max-w-7xl mx-auto p-2">
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-3/4 lg:pr-4 lg:order-1 order-2">
          <TopNews category={category} basePath="/tourism" />
          <Advertisement banner={banner} />
          <OtherNews category={category} basePath="/tourism" />
        </div>
        <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start lg:order-2 order-1">
          <SideTabs category={category} basePath="/tourism" />
        </div>
      </div>
    </div>
  );
};

export default Page;
