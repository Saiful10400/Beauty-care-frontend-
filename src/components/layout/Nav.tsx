'use client';

import { useGetCategoriesQuery, useGetGeneralQuery } from '@/redux/api';
import { TCategory } from '@/types';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SecondaryNav from '../ui/SecondaryNav';

const Nav = () => {
  const { data, isLoading } = useGetGeneralQuery<{
    isLoading: boolean;
    data: { data: { name: string; logoUrl: string } };
  }>(null);

  const { data: Categories, isLoading: categoriLoding } =
    useGetCategoriesQuery<{
      isLoading: boolean;
      data: { data: { result: TCategory[] } };
    }>({ limit: 2000, offset: 0 });

  if (isLoading || categoriLoding) return null;
console.log(Categories)
  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-20">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-6">
          {/* Search Bar */}
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Hey, what are you looking for?"
                className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-10 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center text-center flex-shrink-0">
            <Link href="/">
              <Image
                width={400}
                height={300}
                src={data?.data?.logoUrl}
                alt="Website logo"
                className="w-28 sm:w-36 md:w-44 lg:w-52 h-auto object-contain transition-all duration-300"
              />
            </Link>
            <span className="text-xs text-gray-500 mt-1 tracking-wide text-center">
              {data?.data?.name}
            </span>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-5 text-sm">
           
            <Link
              href="#"
              className="flex items-center gap-1 text-gray-600 hover:text-pink-600 transition"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden sm:inline">Wishlist</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-1 text-gray-600 hover:text-pink-600 transition"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">2 items</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="border-t bg-white shadow-sm">
        <div className="mx-auto max-w-[1400px] px-4 py-2 overflow-x-auto">
          <SecondaryNav />
        </div>
      </div>
    </header>
  );
};

export default Nav;
