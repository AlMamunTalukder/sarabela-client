"use client"
import { useSpecificVideoNewsData } from "@/hooks/useSpecificVideoNewsData"
import { sortByDate } from "@/util/sort"
import Link from "next/link"
import dynamic from "next/dynamic"
import Loading from "@/components/Share/_components/Loading"

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

interface TopNewsProps {
  basePath?: string
}

const VideoNewsSidebar = ({ basePath = "/video" }: TopNewsProps) => {
  const { videoNewsData, loading, error } = useSpecificVideoNewsData()

  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(videoNewsData, "postDate")

  return (
    <div
      className="p-4 max-h-[300px] lg:max-h-[720px] overflow-y-auto [&::-webkit-scrollbar]:hidden 
        [-ms-overflow-style:none] 
        [scrollbar-width:none] border border-black"
    >
      <div className="grid grid-cols-1 gap-4">
        {sortNewsData?.map((news, index) => (
          <div key={index} className="flex gap-4 items-start border-b pb-4">
            <div className="w-1/2">
              <h1 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                <Link href={`${basePath}/${news.slug}`}>{news?.newsTitle}</Link>
              </h1>
              <p className="truncate">{news?.postDate}</p>
            </div>
            <div className="flex-1 h-24 flex-shrink-0 overflow-hidden hover:scale-105 duration-300">
              {news.videoUrl && (
                <ReactPlayer
                  url={news.videoUrl}
                  width="100%"
                  height="100%"
                  light={news.images?.[0] || true}
                  playIcon={<PlayIcon />}
                  controls={true}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-12 h-12">
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
)

export default VideoNewsSidebar

