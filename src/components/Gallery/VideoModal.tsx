"use client";

import { TVideoNews } from "@/types";
import { X } from "lucide-react";

interface VideoModalProps {
  newsData: TVideoNews[];
  setIsVideoModalOpen: (isOpen: boolean) => void;
  currentCarouselIndex: number;
}

// Function to convert YouTube URLs to embed format
const getEmbedUrl = (url: string | undefined) => {
  if (!url) return "";

  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]+)/;
  const match = url.match(youtubeRegex);

  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const VideoModal: React.FC<VideoModalProps> = ({ newsData, setIsVideoModalOpen, currentCarouselIndex }) => {
  const videoUrl = getEmbedUrl(newsData[currentCarouselIndex]?.videoUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsVideoModalOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X size={24} />
        </button>

        {/* Video Player */}
        <div className="relative pt-[56.25%]">
          {videoUrl ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={videoUrl}
              title={newsData[currentCarouselIndex]?.newsTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p className="absolute inset-0 flex items-center justify-center text-white">
              ভিডিও পাওয়া যায়নি
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
