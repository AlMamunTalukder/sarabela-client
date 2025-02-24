"use client";
import truncateText from "@/util/truncate";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser'
import Loading from "../Share/_components/Loading";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "@/util/sort";

const TrendingCard = () => {

  const { newsData, loading, error } = useSpecificNewsData({ newsTag: 'latest' });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h3>Oops! data not found.</h3>;
  }

  const sortNewsData = sortByDate(newsData, "postDate");
  return (
    <div className="grid">
      {sortNewsData?.slice(0, 5).map((news) => (
        <div key={news._id} className=" flex flex-row  pt-2">

          {news.images?.[0] && (
            <Image
              src={news.images[0]}
              alt={news.newsTitle || "News Image"}
              className="object-cover"
              width={200}
              height={100}

            />
          )}
          <div className="ms-4">
            <h3 className="text-lg font-semibold hover:text-blue-500">
              <Link href={`/${news?.category?.slug ?? 'national'}/${news._id}`}>{news.newsTitle}</Link>
            </h3>
            <p className="text-sm mt-2">  {news?.description ? parse(truncateText(news.description, 100)) : ""}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingCard;
