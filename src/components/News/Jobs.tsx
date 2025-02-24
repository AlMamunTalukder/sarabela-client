"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { TNews } from "@/types"
import { sortByDate } from "@/util/sort"
import UseNewsTagsData from "@/hooks/useNewsTagsData"

const Education = () => {
  const basePath = 'job';
  const { newsData, loading, error } = UseNewsTagsData(basePath)
  if (loading) {
    return <h3>Loading.......</h3>
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(newsData, 'postDate')

  const firstImage = sortNewsData[0]?.images[0]

  return (
    <div className="border-t-2">
      <div>
        <h1 className="text-4xl font-bold py-2 flex items-center">
          চাকরি
          <span>
            <ChevronRight size={50} color="red" />
          </span>
        </h1>
      </div>
      <div className="space-y-4">
        {firstImage && (
          <div className="mb-4">
            <Image
              src={firstImage || "/placeholder.svg"}
              alt={sortNewsData[0]?.newsTitle || "Education News"}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        {sortNewsData.map((news: TNews) => (
          <div key={news._id}>
            <h1 className="text-xl font-semibold py-2 border-b-2 hover:text-blue-500">
              <Link href={`${basePath}/${news._id}`}>{news?.newsTitle}</Link>
            </h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Education

