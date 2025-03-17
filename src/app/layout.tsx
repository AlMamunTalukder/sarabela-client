/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { Tiro_Bangla } from "next/font/google";
import Providers from "@/lib/Provider";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrolltoTop/ScrolltoTop";
import { trackVisitorData } from "@/util/visitorTracker";
import { useTrackVisitorMutation } from "@/redux/dailynews/visitorApi";


const tiro_Bangla = Tiro_Bangla({
  weight: "400",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  useEffect(() => {
    const trackVisitorCall = async () => {
      const [trackVisitor] = useTrackVisitorMutation();
      const visitorData = await trackVisitorData();
      console.log('this is visitor data', visitorData);
  
      if (visitorData && !localStorage.getItem("visitor_tracked")) {
        try {
          const response = await trackVisitor(visitorData); // Make the API call
          console.log('API Response:', response); // Log the response from the API
          localStorage.setItem("visitor_tracked", "true");
        } catch (error) {
          console.error('Error tracking visitor:', error);
        }
      }
    };
  
    trackVisitorCall();
  }, []);
  
  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <Providers>
        <body className={`bg-white dark:bg-gray-800 dark:text-white ${tiro_Bangla.className}`}>
          {children}
          <Toaster />
          <ScrollToTop />
        </body>
      </Providers>
    </html>
  );
}
