import { useSpecificNewsData } from '@/hooks/useSpecificNewsData';
import { sortByDate } from '@/util/sort';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Loading from '../Share/_components/Loading';

const HeaderData = () => {
    const { newsData, loading, error } = useSpecificNewsData({})
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <h3>Oops! data not found.</h3>
    }

    const sortNewsData = sortByDate(newsData, 'postDate')

    return (
        <div className="col-span-2 flex">
            {sortNewsData?.slice(0, 2)?.map((item) => (
                <div
                    key={item._id}
                    className="gap-2 border-s-2 border-gray-300 dark:border-gray-700 px-2 flex"
                >
                    <div>
                        {
                            item.images.slice(0, 1).map((img) => (
                                <Image
                                    key={img}
                                    src={img}
                                    alt={item.newsTitle}
                                    className="object-cover"
                                    placeholder="blur"
                                    blurDataURL={item?.newsTitle}
                                    width={80}
                                    height={40}
                                />
                            ))
                        }
                    </div>
                    <div className="col-span-1 flex-1">
                        <h2 className="text-sm font-semibold hover:text-blue-500 dark:hover:text-blue-400 text-gray-900 dark:text-gray-200">
                            <Link href={`/${item?.category?.slug ?? 'national'}/${item._id}`}>{item.newsTitle}</Link>
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeaderData;