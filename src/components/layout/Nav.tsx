"use client";

import {
  Search,
  User,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type SiteInfo = {
  name: string;
  logoUrl: string;
};

const Nav = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  useEffect(() => {
    // Example API call
    fetch("/api/site-info") // Replace with your actual endpoint
      .then(res => res.json())
      .then(data => setSiteInfo(data))
      .catch(err => console.error("Failed to load site info", err));
  }, []);

  const navItems = [
    "PERFUMES",
    "BRANDS",
    "SKINCARE",
    "MAKEUP",
    "HAIRCARE",
    "AROMATHERAPY",
    "CANDLES",
    "GIFTS",
  ];

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
          {siteInfo && (
            <>
              <Image
                src={siteInfo.logoUrl}
                alt={siteInfo.name}
                className="w-28 h-auto"
              />
              <span className="text-xs text-gray-500">{siteInfo.name}</span>
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
        <ul className="flex items-center justify-start sm:justify-center gap-4 px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap">
          {navItems.map(item => (
            <li key={item}>
              <a
                href="#"
                className="hover:text-pink-600 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
