"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { TNews } from "@/types"
import { getCategory } from "@/util/getCategory"
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData"
import { sortByDate } from "@/util/sort"

const Education = () => {
  const basePath = '/technology';
  const category = getCategory(basePath);

  const { newsData, loading, error } = useSpecificNewsData({category:category})
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
          প্রযুক্তি
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
              <Link href={`technology/${news._id}`}>{news?.newsTitle}</Link>
            </h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Education

