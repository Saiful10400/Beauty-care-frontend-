"use client";

import { useGetCategoriesQuery, useGetGeneralQuery } from "@/redux/api";
import { TCategory } from "@/types";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";




const Nav = () => {
  const { data, isLoading } = useGetGeneralQuery<{ isLoading: boolean, data: { data: { name: string, logoUrl: string } } }>(null)
  const { data:Categories, isLoading:categoriLoding } = useGetCategoriesQuery<{ isLoading: boolean, data: {data:{ result:TCategory[] }} }>({limit:2000,offset:0})
 
 
 if(isLoading||categoriLoding) return


  return (
    <header className="w-full border-b bg-white">


      {/* Logo + Search + Icons */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-4">
        {/* Search */}
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Hey, what are you looking for?"
              className="w-full border rounded-full py-2 pl-4 pr-10 text-sm focus:outline-pink-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center text-center min-w-fit">
          {!isLoading && (
            <>
              <Image
              width={400}
              height={300}
                src={data?.data?.logoUrl}
                alt="Website logo"
                className="w-28 h-auto"
              />
              <span className="text-xs text-gray-500">{data?.data?.name}</span>
            </>
          )}
        </div>

        {/* Account Icons */}
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="flex items-center gap-1 hover:text-pink-600">
            <User className="h-5 w-5" />
            <span>Account</span>
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-pink-600">
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-pink-600">
            <ShoppingBag className="h-5 w-5" />
            <span>2 items</span>
          </a>
        </div>
      </div>

      {/* Nav Menu (Always visible, scrollable on small screens) */}
      <nav className="bg-white border-t border-pink-200 overflow-x-auto">
        <ul className="flex items-center justify-center gap-4 px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap">
          {Categories?.data?.result?.map(item => (
            <li key={item._id}>
              <a
                href="#"
                className="hover:text-pink-600 transition-colors text-base font-medium"
              >
                {item.name.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
