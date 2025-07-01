"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Tags, Grid } from "lucide-react";
import "./css/Navactive.css";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/all-product", icon: ShoppingBag },
  { name: "Brands", href: "/brands", icon: Tags },
  { name: "Categories", href: "/categories", icon: Grid },
];

const SecondaryNavRoutes = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Nav */}
      <ul className="hidden sm:flex relative z-0 items-center gap-5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-bold pb-1 text-base nav-list ${
                  isActive ? "NavActive" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile Bottom Nav */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-white border-t border-gray-200
          shadow-lg
          flex justify-around
          py-2
          sm:hidden
        "
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center px-3 py-1 text-xs font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-600 hover:text-pink-500"
              }`}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer div to prevent content behind nav */}
      <div className="block sm:hidden" style={{ height: "56px" }} />
    </>
  );
};

export default SecondaryNavRoutes;
