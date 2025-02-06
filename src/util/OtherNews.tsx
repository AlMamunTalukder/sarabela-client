'use client'
import Link from "next/link";
import Image from "next/image";
import PaginationPages from "./PaginationPages";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "./sort";
interface TopNewsProps {
  basePath?: string;
}

const OtherNews = ({ basePath = "/international" }: TopNewsProps) => {
  const { newsData, loading, error } = useSpecificNewsData()
  if (loading) {
    return <h3>Loading.......</h3>
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(newsData, 'postDate')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortNewsData.map((news) => (
          <article
            key={news._id}
            className="flex items-start space-x-3 bg-white rounded-lg p-3"
          >
            <div className="w-1/3">
              <Link href={`${basePath}/${news.slug}`} className="block">
                <div className="h-16 rounded-md relative w-full aspect-[3/2]">
                  {news?.images?.[0] && (
                    <Image
                      src={news?.images[0]}
                      alt={news?.newsTitle || "News Image"}
                      className="object-cover h-full "
                      width={500}
                      height={500}
                    />
                  )}
                </div>
              </Link>
            </div>

            <div className="w-2/3 ps-2 space-y-2">
              <Link href={`${basePath}/${news.slug}`} className="block group">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {news.newsTitle}
                </h2>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <PaginationPages />
    </div>
  );
};

export default OtherNews;
