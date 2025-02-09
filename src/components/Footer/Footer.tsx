"use client";

import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    id: "01",
    icon: <Facebook size={20} />,
    link: "https://facebook.com",
    label: "Facebook",
  },
  {
    id: "02",
    icon: <Twitter size={20} />,
    link: "https://twitter.com",
    label: "Twitter",
  },
  {
    id: "03",
    icon: <Linkedin size={20} />,
    link: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    id: "04",
    icon: <Youtube size={20} />,
    link: "https://youtube.com",
    label: "YouTube",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#141E46] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Logo */}
          <div className="lg:col-span-3">
            <Link href="/" aria-label="Go to Home Page">
              <h1 className="text-3xl font-extrabold text-white">
                Daily Times <span className="text-red-500">24</span>
              </h1>
              <p className="text-red-500">সত্যের সন্ধানে সব সময়</p>
            </Link>
          </div>

          {/* Social Links */}
          <div className="">
            <div className="flex gap-4 justify-start">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.label} page`}
                  className="bg-gray-700 hover:bg-red-500 p-2 rounded-full transition-all"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 gap-8 lg:gap-0">
          <div>
            <h2 className="font-bold mb-4 text-white">সাম্প্রতিক খবর</h2>
            <ul className="text-gray-300 space-y-2">
              <li>
                <Link href="/" className="hover:text-red-500">
                  সর্বশেষ
                </Link>
              </li>
              <li>
                <Link href="/national" className="hover:text-red-500">
                  জাতীয়
                </Link>
              </li>
              <li>
                <Link href="/politics" className="hover:text-red-500">
                  রাজনীতি
                </Link>
              </li>
              <li>
                <Link href="/international" className="hover:text-red-500">
                  আন্তর্জাতিক
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-white">বিভাগসমূহ</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/technology" className="hover:text-red-500">
                  প্রযুক্তি
                </Link>
              </li>
              <li>
                <Link href="/health" className="hover:text-red-500">
                  স্বাস্থ্য
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-red-500">
                  অর্থনীতি
                </Link>
              </li>
              <li>
                <Link href="/tourism" className="hover:text-red-500">
                  পর্যটন
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-white">অন্য বিভাগ</h2>
            <ul className="text-gray-300 space-y-2">
              <li>
                <Link href="/education" className="hover:text-red-500">
                  শিক্ষা
                </Link>
              </li>
              <li>
                <Link href="/sport" className="hover:text-red-500">
                  খেলাধুলা
                </Link>
              </li>
              <li>
                <Link href="/entertainment" className="hover:text-red-500">
                  বিনোদন
                </Link>
              </li>
              <li>
                <Link href="/religion" className="hover:text-red-500">
                  ধর্ম
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-white">যোগাযোগ</h2>
            <ul className="text-gray-300 space-y-2">
              <li>ই-মেইল: demo@gmail.com</li>
              <li>ফোন: 0123456789</li>
              <li>ঠিকানা: ব্লক এ, বসুন্ধরা আবাসিক, </li>
              <li>ভাটারা, ঢাকা-১২১২</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
        <hr className="border-gray-600" />
        </div>
        <div className="flex justify-between items-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Daily Time 24. All Rights
            Reserved.
          </p>
          <p>
            Develop & Maintenance by{" "}
            <Link
              href={`https://softypy.com`}
              className="text-orange-500 hover:text-blue-500"
            >
              SoftyPy IT{" "}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
