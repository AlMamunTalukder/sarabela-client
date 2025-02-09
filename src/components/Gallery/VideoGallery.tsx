"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, PlayIcon } from "lucide-react"
import Link from "next/link"
import VideoModal from "./VideoModal"
import { useSpecificVideoNewsData } from "@/hooks/useSpecificVideoNewsData"
import { sortByDate } from "@/util/sort"
import Image from "next/image"

const VideoGallery = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { videoNewsData, loading, error } = useSpecificVideoNewsData()

  const sortVideoNews = sortByDate(videoNewsData, "postDate")

  const goToPrevious = useCallback(() => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex === 0 ? sortVideoNews?.length - 1 : prevIndex - 1))
  }, [sortVideoNews])

  const goToNext = useCallback(() => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex === sortVideoNews?.length - 1 ? 0 : prevIndex + 1))
  }, [sortVideoNews])

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (!isPaused && !isVideoModalOpen) {
      intervalRef.current = setInterval(goToNext, 2000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [goToNext, isPaused, isVideoModalOpen])

  const handleSideImageClick = (index: number) => {
    setCurrentCarouselIndex(index + 1)
  }

  if (loading) {
    return <h3>Loading.......</h3>
  }
  if (error) {
    return <h3>Oops! Data not found.</h3>
  }

  const getImageUrl = (images: string[] | undefined) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0]
    }
    return "/placeholder.svg"
  }

  return (
    <div className="py-8">
      <div className="border-t-2 py-2 flex justify-between">
        <h1 className="text-4xl font-semibold border-s-4 border-blue-500 ps-2">ভিডিও</h1>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row-reverse gap-6">
          <div
            className="w-full lg:w-2/3 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative overflow-hidden">
              <div className="relative w-full h-full aspect-[3/2]">
                {sortVideoNews[currentCarouselIndex]?.images && (
                  <Image
                    key={sortVideoNews[currentCarouselIndex]._id}
                    src={getImageUrl(sortVideoNews[currentCarouselIndex].images) || "/placeholder.svg"}
                    alt="Video Thumbnail"
                    className="object-cover"
                    fill
                    priority={currentCarouselIndex === 0}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-red-400 hover:bg-red-600 p-5 rounded-full text-white"
                >
                  <PlayIcon />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-1 lg:p-4">
                <Link href={`/video/${sortVideoNews[currentCarouselIndex]?.slug}`}>
                  <h2 className="text-xl lg:text-2xl font-bold mb-2 hover:text-blue-500">
                    {sortVideoNews[currentCarouselIndex]?.newsTitle}
                  </h2>
                  <p className="text-sm text-gray-200 hidden lg:block">
                    {sortVideoNews[currentCarouselIndex]?.shortDescription}
                  </p>
                </Link>
              </div>
              <div className="absolute top-3 right-3 space-x-2">
                <button onClick={goToPrevious} className="bg-white/50 rounded-full p-1 hover:bg-white/75 z-10">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={goToNext} className="bg-white/50 rounded-full p-1 hover:bg-white/75 z-10">
                  <ChevronRight size={32} />
                </button>
              </div>
            </div>
          </div>

          {/* Video thumbnails */}
          <div className="w-full flex-1 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {sortVideoNews?.slice(0, 3)?.map((newsItem, index) => {
          
              return (

                <div
                  key={newsItem?._id}
                  onClick={() => handleSideImageClick(index)}
                  className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={getImageUrl(newsItem.images) || "/placeholder.svg"}
                      alt={newsItem?.newsTitle || "News Image"}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <Link href={`/video/${newsItem.slug}`}>
                    <h2 className="font-semibold hover:text-blue-500 pt-2">{newsItem?.newsTitle}</h2>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {isVideoModalOpen && (
        <VideoModal
          currentCarouselIndex={currentCarouselIndex}
          newsData={sortVideoNews}
          setIsVideoModalOpen={setIsVideoModalOpen}
        />
      )}
    </div>
  )
}

export default VideoGallery

