"use client";
import TaglineSlider from "@/util/TaglineSlider";
import { CalendarDays, FileText, Layers2, MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface NewsTag {
  tag_id: string;
  image: StaticImageData;
  title: string;
}

interface NewsTypes {
  id: number;
  title: string;
  sub_title: string;
  category: string;
  description?: string;
  date: string;
  time: string;
  image: StaticImageData;
  tagLine: NewsTag[];
  reporter?: string;
  area?: string;
}

interface NewsCardProps {
  news: NewsTypes;
}
const PhotoNewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <article className="pt-2">
      <header className="my-4">
        <h1 className="font-bold text-2xl md:text-3xl mb-4">{news?.title}</h1>

        <div className="flex gap-2 flex-col md:flex-row justify-between md:items-center">

          <div className="flex gap-2 text-sm">
            <CalendarDays size={20} />{" "}
            <span className="text-lg">
              {" "}
              {news?.date} | {news?.time}
            </span>
            | <Layers2 size={20} />{" "}
            <span className="text-lg"> {news?.category}</span>
          </div>

          <div className="flex gap-2">
            <FileText size={20} /> <span> {news?.reporter}</span> |{" "}
            <MapPin size={20} />
            <span>{news?.area}</span>
          </div>

        </div>
      </header>
      <div className="relative w-full  overflow-hidden aspect-[3/2]">
        <Image
          src={news?.image}
          alt={news?.title}
          objectFit="cover"
          placeholder="blur"
          fill
        />
      </div>

      {/* this is sub_title */}

      <div className="py-4">
        <h3 className="font-medium text-lg md:text-xl mb-4">{news?.sub_title}</h3>
      </div>
      {/* tagline related carousel */}
      <div>
        {news?.tagLine?.length !== 0 && <TaglineSlider data={news?.tagLine} />}
      </div>
    </article>
  );
};

export default PhotoNewsCard;
