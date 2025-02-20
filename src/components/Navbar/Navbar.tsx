"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Search,
  UserRound,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import Image from "next/image";
import logo from "@public/asset/logo/logo3.png";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/lib/themeSlice";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import BreakingNews from "@/components/Share/BreakingNews/BreakingNews";
import { AiFillHome } from "react-icons/ai";

interface SocialLink {
  id: string;
  icon: React.ReactNode;
  link: string;
}

interface NavItem {
  href: string;
  label?: string; 
  icon?: React.ReactNode;
  nested?: Array<{ href: string; label: string }>;
}

const socialLinks: SocialLink[] = [
  { id: "01", icon: <Facebook size={15} />, link: "https://facebook.com" },
  { id: "02", icon: <Twitter size={15} />, link: "https://twitter.com" },
  { id: "03", icon: <Linkedin size={15} />, link: "https://linkedin.com" },
  { id: "04", icon: <Youtube size={15} />, link: "https://youtube.com" },
];

const navItems: NavItem[] = [
  { href: "/", icon: <AiFillHome className="w-[22px] lg:w-[26px]  h-[22px] lg:h-[26px]" /> },
  { href: "/national", label: "জাতীয়" },
  { href: "/politics", label: "রাজনীতি" },
  { href: "/international", label: "আন্তর্জাতিক" },
  { href: "/sports", label: "খেলাধুলা" },
  { href: "/entertainment", label: "বিনোদন" },
  { href: "/economy", label: "অর্থনীতি" },
  { href: "/technology", label: "প্রযুক্তি" },
  { href: "/tourism", label: "পর্যটন" },
  {
    href: "/misc",
    label: "বিবিধ",
    nested: [
      { href: "/health", label: "স্বাস্থ্য" },
      { href: "/education", label: "শিক্ষা" },
      { href: "/religion", label: "ধর্ম" },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const mode = useSelector((state: any) => state.themeToggle.mode);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      ref={navRef}
      className="dark:text-black bg-white dark:bg-gray-400 border-b shadow-sm"
    >
      <div className="lg:hidden">
        <div className="border-b border-gray-200 px-4 ">
          <div className="flex items-center content-center justify-between h-16">
            <Image
              src={logo}
              alt="Daily Times 24"
              width={150}
              height={0}
              className="w-[150px] "
            />
            <div className="flex items-center gap-2">
              <Link href="/search">
                <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-200 hover:bg-red-400 transition-colors">
                  <Search size={15} />
                </button>
              </Link>
              |
              <Link href="/login">
                <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-200 hover:bg-red-400 transition-colors">
                  <UserRound size={15} />
                </button>
              </Link>
              |
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-200"
              >
                {mode ? (
                  <Sun size={15} className="text-yellow-400" />
                ) : (
                  <Moon size={15} className="text-blue-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="pr-4 py-2 shadow-lg z-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-auto no-scrollbar font-bold ">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap px-3 py-1 text-sm ${pathname === item.href
                    ? "text-red-500 font-medium"
                    : ""
                    }`}
                >
                   {item.icon ? item.icon : item.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none ml-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>


        <div className="mt-2 ">
            <h1 style={{  padding: "8.5px 0" }} className="absolute z-10 w-[100px] bg-white text-black shadow-md text-center">ব্রেকিং নিউজ</h1>
          <div className="container mx-auto flex items-center  justify-center gap-x-2 px-2 ">
            <BreakingNews />

          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-4 font-bold ">
        <div className="flex justify-between items-center">
          {/* Navigation Menu */}
          <div>
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-4">
                {navItems.map((item) =>
                  item.nested ? (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger className="px-3 py-2 text-black hover:text-red-500">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid dark:bg-gray-400 text-black grid-cols-4 gap-4 w-[750px] p-4">
                          {item.nested.map((nestedItem) => (
                            <ListItem
                              className="hover:text-red-500"
                              key={nestedItem.href}
                              title={nestedItem.label}
                              href={nestedItem.href}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className={`px-3 py-2 hover:text-red-500 ${pathname === item.href
                          ? " text-red-500"
                          : ""
                          }`}
                      >
                        {item.icon ? item.icon : item.label}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and Social */}
          <div className="flex items-center space-x-4 ">
            <div className="border-e-2 pe-2">
              <Link href="/search">
                <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-200 hover:bg-red-400 transition-colors">
                  <Search size={15} />
                </button>
              </Link>
            </div>
            {socialLinks.map((link) => (
              <Link key={link.id} href={link.link}>
                <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-200 hover:bg-red-400 transition-colors">
                  {link.icon}
                </div>
              </Link>
            ))}

            <div className="border-s-2 px-2 flex gap-2">
              <Link href="/login">
                <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-200">
                  <UserRound size={15} />
                </button>
              </Link>
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-200"
              >
                {mode ? (
                  <Sun size={15} className="text-yellow-400" />
                ) : (
                  <Moon size={15} className="text-blue-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
          <div className="dark:bg-gray-400  bg-white absolute top-[110px] left-0 right-0 z-50 p-4 shadow-md border">
        
            <div className=" grid grid-cols-1 h-full">
              {navItems.map((item) =>
                item.nested ? (
                  <Accordion key={item.href} type="single" collapsible>
                    <AccordionItem value={item.href}> 
                      <AccordionTrigger className=" px-3 py-2 dark:text-gray-700 [&>svg]:dark:text-gray-700 ">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-4 ">
                          {item.nested.map((nestedItem) => (
                            <Link
                              key={nestedItem.href}
                              href={nestedItem.href}
                              className="block py-1 text-gray-600 hover:text-blue-600"
                            >
                              {nestedItem.label}
                             
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border-b px-3 py-2  ${
                      pathname === item.href ? "text-red-500 font-medium" : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                   {item.icon ? item.icon : item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}





    </div>
  );
};

interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ title, href, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block p-2 text-gray-800 hover:bg-blue-50 rounded transition-colors"
          href={href}
          {...props}
        >
          {title}
        </a>
      </NavigationMenuLink>
    </li>
  )
);

ListItem.displayName = "ListItem";

export default Navbar;
