"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import ReactPlayer from "react-player/lazy"
import type { TNews } from "@/types"
import { PlayCircle } from "lucide-react"
import { formatDate } from "@/util/formateDate"
import parse from 'html-react-parser'
interface NewsCardProps {
  news?: TNews & { videoUrl?: string }
}

const NewsCard: React.FC<NewsCardProps> = ({ news }: NewsCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  return (
    <article className="pt-2">
      <div className="relative w-full overflow-hidden aspect-[3/2]">
        {news?.videoUrl ? (
          <div className="relative w-full h-full">
            <ReactPlayer
              url={news.videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              controls
              light={news?.images?.[0] || "/placeholder.svg"}
              playIcon={
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-30"
                  onClick={handlePlayClick}
                >
                  <PlayCircle className="w-16 h-16 text-white" />
                </button>
              }
            />
          </div>
        ) : (
          news?.images?.slice(0, 1).map((img) => (
            <Image
              key={img}
              src={img}
              alt={news?.newsTitle || "News Image"}
              blurDataURL="/placeholder.jpg"
              placeholder="blur"
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          ))
        )}
      </div>

      <header className="mt-4">
        <p className="text-sm text-gray-500">{formatDate(news?.postDate)}</p>
      </header>
      <div className="mt-2">
        <h2 className="text-2xl font-semibold text-gray-800">{news?.newsTitle}</h2>
        <p className="mt-2 text-gray-700">{news?.description ? parse(news.description) : ""}</p>
        <p className="mt-1 text-sm text-gray-500">Estimated Read Time: {formatDate(news?.postDate)}</p>
      </div>
    </article>
  )
}


export default NewsCard
