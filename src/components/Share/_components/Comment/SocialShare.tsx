/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Facebook, MessageCircle, Twitter, Linkedin, Link2, Printer, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useGetShareCountsQuery, useShareNewsMutation } from "@/redux/dailynews/shareApi"
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";







type NewsIdParams = {
  newsId: string;
}
export default function SocialShare({ newsId }: NewsIdParams) {
  const [fontSize, setFontSize] = useState(16);

  const { data: shareCounts = {} } = useGetShareCountsQuery(newsId);
  const [shareNews] = useShareNewsMutation();

  // Function to handle font size changes
  const handleFontSize = (action: "increase" | "decrease") => {
    const parentElement = document.getElementById("news-content");
    if (!parentElement) return;

    if (action === "increase" && fontSize < 24) {
      setFontSize((prev) => prev + 2);
      parentElement.style.fontSize = `${fontSize + 2}px`;
    } else if (action === "decrease" && fontSize > 12) {
      setFontSize((prev) => prev - 2);
      parentElement.style.fontSize = `${fontSize - 2}px`;
    }
  };

  // Reset font size when the component unmounts
  useEffect(() => {
    return () => {
      const parentElement = document.getElementById("news-content");
      if (parentElement) {
        parentElement.style.fontSize = ""; // Reset to default
      }
    };
  }, []);



  
  
  


  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = document.title;


    switch (platform) {
      case "Facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "Messenger":
        window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID`, "_blank");
        break;
      case "WhatsApp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, "_blank");
        break;
      case "Twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "LinkedIn":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "Print":
        window.print();
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              url,
            });
          } catch (err: any) {
            toast.error("Error sharing content");
          }
        }
    }

    const shareData = { newsId, platform }

    try {
      const res = await shareNews(shareData).unwrap()
      if (res.success) {

        toast.success(`${platform} share recorded!`);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share");
    }
  };



  return (
    <div className="flex items-center gap-2 justify-end mt-10 flex-wrap">

      <div className="flex flex-col items-center">
        {shareCounts?.data?.totalShares || 0}
        <span className="text-[12px] text-gray-500 ">Shares</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("Facebook")}
        className="bg-[#1877F2] hover:bg-[#344e86] h-8 w-8 rounded-full p-0"
      >
        {/* <Facebook className="h-4 w-4 text-white" /> */}
        <FaFacebookF className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("Messenger")}
        className="bg-[#0084ff] hover:bg-[#0074e0] h-8 w-8 rounded-full p-0"
      >
        {/* <MessageCircle className="h-4 w-4 text-white" /> */}
        <FaFacebookMessenger className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("WhatsApp")}
        className="bg-[#25D366] hover:bg-[#21bd5a] h-8 w-8 rounded-full p-0"
      >
        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("Twitter")}
        className="bg-black hover:bg-gray-800 h-8 w-8 rounded-full p-0"
      >
        <Twitter className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("LinkedIn")}
        className="bg-[#0077b5] hover:bg-[#006399] h-8 w-8 rounded-full p-0"
      >
        <Linkedin className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          toast.success("Link copied to clipboard!")
        }}
        className="dark:bg-gray-500 bg-gray-800 hover:bg-gray-700 h-8 w-8 rounded-full p-0"
      >
        <Link2 className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("Print")}
        className="dark:bg-gray-500 bg-gray-800 hover:bg-gray-700 h-8 w-8 rounded-full p-0"
      >
        <Printer className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("Other")}
        className="dark:bg-gray-500 bg-gray-800 hover:bg-gray-700 h-8 w-8 rounded-full p-0"
      >
        <Share2 className="h-4 w-4 text-white" />
      </Button>

      {/* Font size control buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleFontSize("decrease")}
        className="dark:bg-gray-500 bg-gray-800 hover:bg-gray-700 h-8 w-8 rounded-full p-0"
        aria-label="Decrease font size"
      >
        <span className="text-white text-sm font-semibold">অ-</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleFontSize("increase")}
        className="dark:bg-gray-500 bg-gray-800 hover:bg-gray-700 h-8 w-8 rounded-full p-0"
        aria-label="Increase font size"
      >
        <span className="text-white text-sm font-semibold">অ+</span>
      </Button>
    </div>
  )
}

