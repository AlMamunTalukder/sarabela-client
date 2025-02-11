"use client";
import { TNews } from "@/types";
import truncateText from "@/util/truncate";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser'
type NewsProps = {
  data: TNews[]
}

const TrendingCard = ({ data }: NewsProps) => {
  return (
    <div className="grid">
      {data.map((news) => (
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
              <Link href={`/international/${news.slug}`}>{news.newsTitle}</Link>
            </h3>
            <p className="text-sm mt-2">  {news?.description ? parse(truncateText(news.description, 100)) : ""}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingCard;
