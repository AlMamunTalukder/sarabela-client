/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import DateAndTime from "@/lib/dateAndTime";
import Link from "next/link";
import banner from "@public/asset/sarabelanews24-banner.png";
import logoLight from '../../../public/asset/logo/logo2.png'
import logoDark from '../../../public/asset/logo/logo2.svg'
import HeaderData from "./HeaderData";

import { useSelector } from "react-redux";


const Header = () => {
  const mode = useSelector((state: any) => state.themeToggle.mode);
  return (
    <section className="hidden lg:block border-b-2 bg-[#065799] ">
      <div className="max-w-7xl mx-auto grid grid-cols-4 items-center justify-between gap-2">
        <div className="flex items-center grid-cols-1 gap-2">
          <Link href="/" className="relative w-full aspect-[3/2]">
            <Image
              src={logoDark}
              alt="daily times 24"
            />
          </Link>
          <div className="text-gray-300">
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
