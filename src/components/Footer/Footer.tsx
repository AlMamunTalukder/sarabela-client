"use client"

import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import logo from "@public/asset/logo/logo2.svg"
import Image from "next/image"

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
]

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 items-center gap-8">
          {/* Logo */}
          <div className="lg:col-span-3">
            <div className="relative">
              <Image
                src={logo || "/placeholder.svg"}
                alt="brand logo"
                // placeholder="blur"
                objectFit="cover"
                width={170}
                height={170}
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex gap-4 justify-start lg:justify-end">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.label} page`}
                  className="bg-white text-black hover:bg-red-500 hover:text-white p-2 rounded-full transition-all duration-300"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 gap-8">
          <div>
            <h2 className="font-bold mb-4 text-xl">সাম্প্রতিক খবর</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors duration-300">
                  সর্বশেষ
                </Link>
              </li>
              <li>
                <Link href="/national" className="hover:text-red-500 transition-colors duration-300">
                  জাতীয়
                </Link>
              </li>
              <li>
                <Link href="/politics" className="hover:text-red-500 transition-colors duration-300">
                  রাজনীতি
                </Link>
              </li>
              <li>
                <Link href="/international" className="hover:text-red-500 transition-colors duration-300">
                  আন্তর্জাতিক
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-xl">বিভাগসমূহ</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/technology" className="hover:text-red-500 transition-colors duration-300">
                  প্রযুক্তি
                </Link>
              </li>
              <li>
                <Link href="/health" className="hover:text-red-500 transition-colors duration-300">
                  স্বাস্থ্য
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-red-500 transition-colors duration-300">
                  অর্থনীতি
                </Link>
              </li>
              <li>
                <Link href="/tourism" className="hover:text-red-500 transition-colors duration-300">
                  পর্যটন
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-xl">অন্য বিভাগ</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/education" className="hover:text-red-500 transition-colors duration-300">
                  শিক্ষা
                </Link>
              </li>
              <li>
                <Link href="/sport" className="hover:text-red-500 transition-colors duration-300">
                  খেলাধুলা
                </Link>
              </li>
              <li>
                <Link href="/entertainment" className="hover:text-red-500 transition-colors duration-300">
                  বিনোদন
                </Link>
              </li>
              <li>
                <Link href="/religion" className="hover:text-red-500 transition-colors duration-300">
                  ধর্ম
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-xl">যোগাযোগ</h2>
            <ul className="space-y-2">
              <li>ই-মেইল: demo@gmail.com</li>
              <li>ফোন: 0123456789</li>
              <li>ঠিকানা: ব্লক এ, বসুন্ধরা আবাসিক,</li>
              <li>ভাটারা, ঢাকা-১২১২</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 mt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} sarabelanews24. All Rights Reserved.</p>
            <p>
              Develop & Maintenance by{" "}
              <Link
                href={`https://softypy.com`}
                className="text-red-500 hover:text-white transition-colors duration-300"
              >
                SoftyPy IT
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

