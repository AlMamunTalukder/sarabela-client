"use client";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { formatDate } from "@/util/formateDate";
import { sortByDate } from "@/util/sort";
import Image from "next/image";
import Link from "next/link";
interface TopNewsProps {
  basePath?: string;
  category: string;
}
const SaidBar = ({ category, basePath = "/sports" }: TopNewsProps) => {


  const { newsData, loading, error } = useSpecificNewsData({ category: category })
  if (loading) {
    return <h3>Loading.......</h3>
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(newsData, 'postDate')
  console.log('education data', sortNewsData)

  return (
    <div
      className="p-4 max-h-[300px] lg:max-h-[720px] overflow-y-auto [&::-webkit-scrollbar]:hidden 
        [-ms-overflow-style:none] 
        [scrollbar-width:none] border border-black"
    >
      <div className="grid grid-cols-1 gap-4">
        {sortNewsData?.slice(0, 6)?.map((news, index) => (
          <div key={index} className="flex gap-4 items-start border-b pb-4">
            <div className="w-1/2">
              <h1 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                <Link href={`${basePath}/${news.slug}`}>{news?.newsTitle}</Link>
              </h1>
              <p className="truncate">{formatDate(news?.postDate)}</p>
            </div>
            <div className="flex-1 h-24  flex-shrink-0 overflow-hidden  hover:scale-105 duration-300">
              {news.images?.[0] && (
                <Image
                  src={news.images[0]}
                  alt={news.newsTitle || "News Image"}
                  blurDataURL="/placeholder.jpg"
                  className="w-full h-full object-cover"
                  width={500}
                  height={200}

                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaidBar;
