"use client";

import { useState, useEffect } from "react";
import {  ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-14 right-6 p-3 bg-gray-900 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-gray-700 z-50 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to Top"
    >
      {/* <ArrowUp size={24} /> */}
      <ChevronUp size={24}/>
    </button>
  );
};

export default ScrollToTop;
