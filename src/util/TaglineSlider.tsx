"use client";
import React, { FC } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";

interface NewsTag {
  tag_id: string;
  image: StaticImageData | string;
  title: string;
}

interface TaglineSliderProps {
  data: NewsTag[];
}

const TaglineSlider: FC<TaglineSliderProps> = ({ data }) => {
  return (
    <div className="mt-4  w-full">
      <Carousel
        className="relative"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item?.tag_id} className="px-4">
              <div className="flex flex-col items-center w-full">
                <div className="relative w-full h-[200px] sm:h-[250px] lg:h-[300px]">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                  />
                </div>
                <p className="mt-2 text-center font-semibold text-gray-700 text-xl sm:text-base">
                  {item?.title}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-2">
          <CarouselPrevious className="relative left-0 bg-black/50 hover:bg-black/70 transition-all" />
          <CarouselNext className="relative right-0 bg-black/50 hover:bg-black/70 transition-all" />
        </div>
      </Carousel>
    </div>
  );
};

export default TaglineSlider;
