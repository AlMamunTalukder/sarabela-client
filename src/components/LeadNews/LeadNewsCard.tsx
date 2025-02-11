import React from 'react';
import Link from "next/link";
import { TNews } from '@/types';
import Image from 'next/image';
import truncateText from '@/util/truncate';
import parse from 'html-react-parser'
type NewsProps = {
  newsData: TNews[]
}

const LeadNewsCard = ({ newsData }: NewsProps) => {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {newsData?.slice(0, 3).map((news) => (
        <Link
          key={news._id}
          href={`/international/${news.slug}`}
          className="group flex lg:flex-col flex-row gap-4"
        >
          <div className="w-full overflow-hidden">
            <div className="h-36 rouned-md w-full relative aspect-[3/2] transform transition-transform duration-500 hover:scale-105">


              <Image
                src={news.images?.[0] || "/placeholder.svg"}
                alt={news.newsTitle}
                className=" w-full h-full object-cover"
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL="/placeholder.svg"
              />
            </div>
          </div>
          <div className="w-full ps-2 lg:pt-2">
            <h2 className="text-xl font-bold hover:text-blue-600 transition-colors">
              {news.newsTitle}
            </h2>
            <p className="text-sm mt-2">  {news?.description ? parse(truncateText(news.description, 150)) : ""}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeadNewsCard;