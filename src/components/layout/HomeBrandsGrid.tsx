'use client';

import Image from 'next/image';
import SectionTittle from '../ui/SectionTittle';
import { useGetBrandsQuery } from '@/redux/api';
import { Tbrand } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/featcher/hoocks';
import { resetFilters, toggleBrandId } from '@/redux/featcher/searchSlice';



// Skeleton Card Component
function BrandCardSkeleton() {
  return (
    <div className="relative border border-[#e0e0e0] bg-white rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-center h-32">
        <div className="w-20 h-20 bg-gray-200 rounded-full" />
      </div>
      <div className="text-center mt-6 space-y-2">
        <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded" />
        <div className="h-8 w-24 mx-auto bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export default function HomeBrandsGrid() {
  const { data: brands, isLoading } = useGetBrandsQuery({ offset: 0, limit: 8 });
  const move = useRouter()
  const dispatch = useAppDispatch()
  const handleShopNow = (id: string) => {
    dispatch(resetFilters())
    dispatch(toggleBrandId(id))
    move.push("/all-product")
  };


  if (brands?.data?.result?.length === 0) {
    return null
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16">
      <SectionTittle tittle="Featured Brands" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-10">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
            <BrandCardSkeleton key={i} />
          ))
          : brands?.data?.result?.map((brand: Tbrand, index: number) => (
            <div
              key={index}
              className="relative group border border-[#e0e0e0] bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >

              <div className="flex items-center justify-center h-32">
                {brand.logoUrl && brand.logoUrl.length !== 0 && <Image

                  src={brand.logoUrl as string}
                  alt={brand.name}
                  width={120}
                  height={120}
                  className="object-contain max-h-28 transition-transform duration-300 group-hover:scale-105"
                />}
              </div>
              <div className="text-center mt-6">
                <h3 className="text-lg font-semibold text-[#333] uppercase">
                  {brand.name}
                </h3>
                <button
                  onClick={() => handleShopNow(brand._id)}
                  className="mt-4 inline-block cursor-pointer px-5 py-2 text-sm font-medium text-white bg-[#d88c9a] rounded-full hover:bg-[#b56f7d] transition-all duration-300"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Show All Button */}
      <div className="mt-16 flex justify-center">
        <Link
          href="/brands"
          className="px-6 py-3 border border-gray-500 cursor-pointer text-black font-bold hover:bg-gray-100 transition-all duration-300"
        >
          Show All
        </Link>
      </div>
    </div>
  );
}
