<<<<<<< HEAD
'use client'

import Advertisement from "@/util/Advertisement";
import { getCategory } from "@/util/getCategory";
=======

import Advertisement_2 from "@/util/Advertisement_2";
>>>>>>> d97df043daae41a8a4c9c5112b6460456e1b3796
import OtherNews from "@/util/OtherNews";
import SideTabs from "@/util/SideTabs";
import TopNews from "@/util/TopNews";
import banner from "@public/asset/banner.jpg";
import { usePathname } from "next/navigation";

const Page = () => {
  const basePath = usePathname();
  const category = getCategory(basePath);
  console.log(category)
  return (
    <div className="max-w-7xl mx-auto p-2">
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-3/4 lg:pr-4 lg:order-1 order-2">
<<<<<<< HEAD
          <TopNews category={category} basePath="/economy" />
          <Advertisement banner={banner} />
          <OtherNews category={category} basePath="/economy" />
=======
          <TopNews basePath="/economy" />
          <Advertisement_2 banner={banner} />
          <OtherNews basePath="/economy"/>
>>>>>>> d97df043daae41a8a4c9c5112b6460456e1b3796
        </div>
        <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start lg:order-2 order-1">
          <SideTabs category={category} basePath="/economy" />
        </div>
      </div>
    </div>
  );
};

export default Page;
