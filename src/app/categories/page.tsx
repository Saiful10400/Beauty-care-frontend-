"use client"
import PageHeaderRouting from '@/components/ui/PageHeaderRouteing';
import {  useGetCategoriesQuery } from '@/redux/api';
import {  TCategory } from '@/types';
import Image from 'next/image';
import React from 'react';

const Category = () => {
    const { data: brands } = useGetCategoriesQuery({ offset: 0, limit: 5000 })

    const handleShopNow = (name:string) => {
console.log(name)
    }

    return (
        <div>
            <PageHeaderRouting />


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10">
                {brands?.data?.result?.map((Category: TCategory, index: number) => (
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
                                onClick={() => handleShopNow(Category.name)}
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