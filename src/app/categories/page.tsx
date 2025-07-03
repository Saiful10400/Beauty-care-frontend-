"use client"
import PageHeaderRouting from '@/components/ui/PageHeaderRouteing';
import scrollToTop from '@/lib/scroolToTop';
import { useGetCategoriesQuery } from '@/redux/api';
import { useAppDispatch } from '@/redux/featcher/hoocks';
import { toggleCategoryId } from '@/redux/featcher/searchSlice';
import { TCategory } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Category = () => {
    useEffect(() => {
        scrollToTop()
    }, [])


    const { data: categories } = useGetCategoriesQuery({ offset: 0, limit: 5000 })

    const move = useRouter()
    const dispatch = useAppDispatch()

    const handleShopNow = (id: string) => {
        move.push("/all-product")
        dispatch(toggleCategoryId(id))
    }

    return (
        <div>
            <PageHeaderRouting />

            {
                categories?.data?.result?.length === 0 && <h1 className='text-center font-semibold'>No Data found</h1>


            }
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10">
                {categories?.data?.result?.map((Category: TCategory, index: number) => (
                    <div
                        key={index}
                        className="relative group border border-[#e0e0e0] bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-center h-32">
                            <Image
                                src={Category.imageUrl as string}
                                alt={Category.name}
                                width={120}
                                height={120}
                                className="object-contain max-h-28 transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="text-center mt-6">
                            <h3 className="text-lg font-semibold text-[#333] uppercase">{Category.name}</h3>
                            <button
                                onClick={() => handleShopNow(Category._id)}
                                className="mt-4 inline-block cursor-pointer px-5 py-2 text-sm font-medium text-white bg-[#d88c9a] rounded-full hover:bg-[#b56f7d] transition-all duration-300"
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>




        </div>
    );
};

export default Category;