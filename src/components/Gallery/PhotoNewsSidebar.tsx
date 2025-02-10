/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { TPhotoNews } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PhotoProps = {
    photoNewsData: TPhotoNews[]
}
const PhotoNewsSidebar = ({ photoNewsData }: PhotoProps) => {
    return (
        <div className="w-full flex-1 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-2 gap-4 place-content-start ">
            {photoNewsData?.slice(0, 6).map((newsItem) => (
                <div
                    key={newsItem._id}

                    className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                    <div className="relative  aspect-[3/2]">
                        {
                            newsItem.images.slice(0, 1).map((img) => (
                                <Image
                                    key={img}
                                    src={img}
                                    alt={newsItem.title}
                                    fill
                                    className="object-cover"
                                />
                            ))
                        }
                    </div>
                    <div className="pt-2">
                        <p className="font-semibold hover:text-blue-500">
                            <Link href={`/photo/${newsItem?.slug}`}>
                                {newsItem?.title}
                            </Link>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhotoNewsSidebar;