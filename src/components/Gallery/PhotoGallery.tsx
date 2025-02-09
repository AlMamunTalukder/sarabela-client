/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePhotonewsData } from "@/hooks/usePhotonewsData";
import PhotoNewsSidebar from "./PhotoNewsSidebar";
import parse from 'html-react-parser'
const NewsSlider: React.FC = () => {
  const { photoNewsData, loading, error } = usePhotonewsData();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToPrevious = useCallback((): void => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? photoNewsData.length - 1 : prevIndex - 1
    );
  }, [photoNewsData?.length]);

  const goToNext = useCallback((): void => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === photoNewsData.length - 1 ? 0 : prevIndex + 1
    );
  }, [photoNewsData?.length]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused) {
      intervalRef.current = setInterval(goToNext, 2000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [goToNext, isPaused]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading photo news</p>;
  if (!photoNewsData || photoNewsData.length === 0) return <p>No Data Available</p>;

  return (
    <div className="py-8">
      <div className="border-t-2 py-2 flex justify-between">
        <h1 className="text-4xl font-semibold border-s-4 border-blue-500 ps-2">
          ছবি
        </h1>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row gap-6 ">
          <div
            className="w-full lg:w-2/3 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <div className="relative w-full h-full aspect-[3/2]">
                <Image
                  src={photoNewsData[currentCarouselIndex]?.images[0] || "/fallback-image.jpg"}
                  alt={photoNewsData[currentCarouselIndex]?.imgTagline || "No Image"}
                  className="object-cover h-full w-full "
                  width={500}
                  height={500}
                  priority={currentCarouselIndex === 0}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-1 lg:p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300 hidden lg:block">
                    {new Date(photoNewsData[currentCarouselIndex]?.postDate).toLocaleDateString()}
                  </span>
                </div>
                <Link href={`/view-details-photo/${photoNewsData[currentCarouselIndex]?._id}`} className="hover:text-blue-500">
                  <h2 className=" text-ellipsis text-xl lg:text-2xl font-bold mb-2">
                    {photoNewsData[currentCarouselIndex]?.title}
                  </h2>
                  <p className="text-sm text-gray-200 hidden lg:block">
                    {parse(photoNewsData[currentCarouselIndex]?.description)}
                  </p>
                </Link>
              </div>
              <div className="absolute top-3 right-3 space-x-2">
                <button
                  onClick={goToPrevious}
                  aria-label="Previous News"
                  className=" bg-white/50 rounded-full p-1 hover:bg-white/75 z-10"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={goToNext}
                  aria-label="Next News"
                  className=" bg-white/50 rounded-full p-1 hover:bg-white/75 z-10"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            </div>
          </div>
          <PhotoNewsSidebar photoNewsData={photoNewsData} />
        </div>
      </div>
    </div>
  );
};
export default NewsSlider;


