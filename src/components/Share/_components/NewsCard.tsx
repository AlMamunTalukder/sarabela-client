"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import ReactPlayer from "react-player/lazy"
import type { TNews } from "@/types"
import { PlayCircle } from "lucide-react"
import { formatDate } from "@/util/formateDate"
import parse from 'html-react-parser'
import SocialShare from "./Comment/SocialShare"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
interface NewsCardProps {
  news: TNews & { videoUrl?: string }
}


const NewsCard: React.FC<NewsCardProps> = ({ news }: NewsCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsPlaying(true)
  }



  return (
    <article className="pt-8">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">{news?.newsTitle}</h2>
      <SocialShare newsId={news._id} />
      <div className="relative w-full overflow-hidden aspect-[3/2] mt-5">
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
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {news?.images?.length > 0 ? (
                <figure className="relative w-full">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={news.images[0] || "/placeholder.svg"}
                      alt={news.newsTitle || "News Image"}
                      blurDataURL="/placeholder.jpg"
                      placeholder="blur"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </figure>
              ) : (
                <div className="relative aspect-[16/9] w-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
            </CardContent>

            {news?.imageTagline && (
              <CardFooter className="px-4 py-3 text-sm text-muted-foreground flex justify-center">
                <p className="font-bengali text-center">
                  {news.imageTagline} <span className="text-gray-500">ছবি : সারাবেলানিউজ২৪</span>
                </p>
              </CardFooter>

            )}
          </Card>
        )}
      </div>

      <header className="mt-4">
        <p className="text-sm text-gray-500">{formatDate(news?.postDate)}</p>
      </header>
      <div className="mt-2">

        <p className="mt-2 text-gray-700">{news?.description ? parse(news.description) : ""}</p>
        <p className="mt-1 text-sm text-gray-500">Estimated Read Time: {formatDate(news?.postDate)}</p>
      </div>
    </article>
  )
}


export default NewsCard
