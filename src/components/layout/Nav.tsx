"use client";

import { useGetGeneralQuery } from "@/redux/api";

import { Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SecondaryNav from "../ui/SecondaryNav";
import { useState } from "react";

const Nav = () => {
  const { data, isLoading } = useGetGeneralQuery<{
    isLoading: boolean;
    data: { data: { name: string; logoUrl: string } };
  }>(null);



  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((open) => !open);
  const toggleMobileSearch = () => setMobileSearchOpen((open) => !open);

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-30">
        <div className="mx-auto max-w-[1400px] px-4">
          {/* Top Bar */}
          <div className="relative flex items-center justify-between py-3 sm:py-4 gap-2 sm:gap-6">
            {/* Left - Mobile Search Toggle */}
            <div className="flex items-center gap-2 sm:hidden z-10">
              {!mobileSearchOpen && (
                <button
                  onClick={toggleMobileSearch}
                  aria-label="Open search"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>

            {/* Search Bar */}
            <div
              className={`flex-grow sm:max-w-md transition-all duration-500 ease-in-out ${mobileSearchOpen
                  ? "max-w-full opacity-100"
                  : "max-w-0 opacity-0 overflow-hidden sm:max-w-md sm:opacity-100"
                }`}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Hey, what are you looking for?"
                  className="w-full border border-gray-300 rounded-full py-2.5 sm:py-3 pl-5 pr-12 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500 focus:outline-none"
                />
                <button
                  onClick={toggleMobileSearch}
                  aria-label="Close search"
                  className="absolute right-3 top-2.5 sm:hidden"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
                <Search className="absolute right-4 top-3 h-5 w-5 text-gray-400 hidden sm:block" />
              </div>
            </div>

            {/* Logo - Centered on Mobile */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center flex-shrink-0 mx-1 sm:static sm:translate-x-0 sm:mx-0 min-w-[70px] sm:min-w-0 transition-opacity duration-300 ${mobileSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
              {isLoading ? (
                <div className="w-20 sm:w-36 h-8 sm:h-10 bg-gray-200 rounded animate-pulse" />
              ) : (
                <Link href="/">
                  <Image
                    width={400}
                    height={300}
                    src={data?.data?.logoUrl}
                    alt="Website logo"
                    className="w-20 sm:w-36 md:w-44 lg:w-52 h-auto object-contain transition-all duration-300"
                  />
                </Link>
              )}
              {!isLoading && (
                <span className="text-xs text-gray-500 mt-0.5 tracking-wide">
                  {data?.data?.name}
                </span>
              )}
            </div>

            {/* Right - Cart Button */}
            <div className="flex items-center gap-3 text-sm relative flex-shrink-0 z-10">
              {isLoading ? (
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              ) : (
                <button
                  onClick={toggleDrawer}
                  aria-label="Open cart"
                  className="relative flex cursor-pointer items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-pink-900 text-xs font-bold rounded-full px-1.5 py-[2px] min-w-[18px] text-center">
                    2
                  </span>
                </button>
              )}
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

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 z-40 ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={toggleDrawer}
            aria-label="Close cart"
            className="text-gray-600 cursor-pointer hover:text-pink-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
          <p className="text-gray-600">Cart items will be shown here.</p>
        </div>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0  bg-[#00000098] bg-opacity-30 z-30"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Nav;
