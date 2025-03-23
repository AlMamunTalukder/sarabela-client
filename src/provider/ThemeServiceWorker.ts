/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";

export default function ThemeAndServiceWorker() {
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);


  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("Service Worker registered:", registration))
        .catch((error) => console.error("Service Worker registration failed:", error));
    }
  }, []);

  return null; 
}
