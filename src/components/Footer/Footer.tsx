"use client";

import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import logo from "../../../public/asset/logo/logo2.svg";
import Image from "next/image";

const socialLinks = [
  {
    id: "01",
    icon: <Facebook size={20} />,
    link: "https://facebook.com",
    label: "Facebook",
    hoverColor: "hover:bg-[#1877F2] hover:text-white",
  },
  {
    id: "02",
    icon: <Twitter size={20} />,
    link: "https://twitter.com",
    label: "Twitter",
    hoverColor: "hover:bg-[#1DA1F2] hover:text-white",
  },
  {
    id: "03",
    icon: <Linkedin size={20} />,
    link: "https://linkedin.com",
    label: "LinkedIn",
    hoverColor: "hover:bg-[#0077B5] hover:text-white",
  },
  {
    id: "04",
    icon: <Youtube size={20} />,
    link: "https://youtube.com",
    label: "YouTube",
    hoverColor: "hover:bg-[#FF0000] hover:text-white",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto lg:px-4 py-5 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 items-center lg:gap-8">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start lg:col-span-3">
            <div className="relative">
              <Image
                src={logo || "/placeholder.svg"}
                alt="brand logo"
                objectFit="cover"
                width={170}
                height={170}
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.label} page`}
                  className={`bg-white text-black p-2 rounded-full transition-all duration-300 ${link.hoverColor}`}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 text-center lg:text-start mt-8 gap-12 lg:gap-4 ">
          <div>
            <h2 className="font-bold text-xl">সাম্প্রতিক খবর</h2>
            <div className="flex justify-center lg:justify-start">
              <hr className="my-4  w-[100px] lg:w-[150px]" />
            </div>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  সর্বশেষ
                </Link>
              </li>
              <li>
                <Link
                  href="/national"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  জাতীয়
                </Link>
              </li>
              <li>
                <Link
                  href="/politics"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  রাজনীতি
                </Link>
              </li>
              <li>
                <Link
                  href="/international"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  আন্তর্জাতিক
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-bold text-xl ">বিভাগসমূহ</h2>
            <div className="flex justify-center lg:justify-start">
              <hr className="my-4  w-[100px] lg:w-[150px]" />
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/technology"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  প্রযুক্তি
                </Link>
              </li>
              <li>
                <Link
                  href="/health"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  স্বাস্থ্য
                </Link>
              </li>
              <li>
                <Link
                  href="/economy"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  অর্থনীতি
                </Link>
              </li>
              <li>
                <Link
                  href="/tourism"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  পর্যটন
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">অন্য বিভাগ</h2>
            <div className="flex justify-center lg:justify-start">
            <hr className="my-4  w-[100px] lg:w-[150px]"/>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/education"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  শিক্ষা
                </Link>
              </li>
              <li>
                <Link
                  href="/sport"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  খেলাধুলা
                </Link>
              </li>
              <li>
                <Link
                  href="/entertainment"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  বিনোদন
                </Link>
              </li>
              <li>
                <Link
                  href="/religion"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  ধর্ম
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold  text-xl">যোগাযোগ</h2>
            <div className="flex justify-center lg:justify-start">
            <hr className="my-4  w-[100px] lg:w-[150px]"/>
            </div>
            <ul className="space-y-2">
              <li className="text-gray-200">
                {" "}
                <span className="font-bold text-gray-100">
                  {" "}
                  প্রধান সম্পাদক ও প্রকাশক:
                </span>{" "}
                মোঃ আদনান আরিফ
              </li>
              <li className="text-gray-200">
                {" "}
                <span className="font-bold text-gray-100">
                  সম্পাদক ও প্রকাশক:
                </span>{" "}
                মোঃ শাহরিয়ার মাহমুদ শিহাব
              </li>

              <li className="text-gray-200">
                {" "}
                <span className="font-bold text-gray-100">ই-মেইল:</span>{" "}
                sarabelanews24@gmail.com
              </li>
              <li className="text-gray-200">
                {" "}
                <span className="font-bold text-gray-100">ফোন:</span>{" "}
                01957713249, 01604249971
              </li>
              <li className="text-gray-200">
                {" "}
                <span className="font-bold text-gray-100">বিজ্ঞাপন:</span>{" "}
                01724502183
              </li>
              <li className="text-gray-200">
                {" "}
                <span className="font-bold text-gray-100">ঠিকানা:</span> স্বপ্ন
                ডাঙ্গা, হাজারীবাগ শাহজাহান শাহ রোড, পশ্চিম ধানমন্ডি, ঢাকা-১২০৫
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-4 lg:py-8 mt-12 border-t border-gray-800 font-sans">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} sarabelanews24. All Rights
              Reserved.
            </p>
            <p>
              Develop & Maintenance by{" "}
              <Link
                href="https://softypy.com"
                className="text-red-500 hover:text-white transition-colors duration-300"
              >
                SoftyPy IT
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
