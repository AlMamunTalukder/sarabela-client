/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { TNews } from "@/types";



interface NewsCardProps {
  news?: TNews;
}
const NewsCard: React.FC<NewsCardProps> = ({ news }: NewsCardProps) => {

  return (
    <article className="pt-2">
      <div className="relative w-full  overflow-hidden aspect-[3/2]">
        {news?.images?.[0] && (
          <Image
            src={news?.images[0]}
            alt={news?.newsTitle || "News Image"}
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            className="object-cover w-full "
            width={500}
            height={500}

          />
        )}
      </div>


      <header className="mt-4">
        <p className="text-sm text-gray-500">
          {news?.postDate}
        </p>
      </header>
      <div className="mt-2">
        <h2 className="text-2xl font-semibold text-gray-800">{news?.newsTitle}</h2>
        <p className="mt-2 text-gray-700">{news?.description}</p>
        {/* <div>
          {news?.imageTagline?.length !== 0 && <TaglineSlider data={news?.imageTagline} />}
        </div> */}
        <p className="mt-2 text-gray-700">{news?.description.substring(1000)}</p>

        <p className="mt-1 text-sm text-gray-500">
          Estimated Read Time: {news?.postDate}
        </p>
      </div>
    </article>
  );
};

export default NewsCard;
