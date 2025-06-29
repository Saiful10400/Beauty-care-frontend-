'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./css/Navactive.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/all-product" },
  { name: "Brands", href: "/brands" },
  { name: "Categories", href: "/categories" },
  // { name: "Flash Sale", href: "/flash-sale" },
  // { name: "Shop", href: "/shops" },
  // { name: "Contact Us", href: "/contact-us" },
];

const SecondaryNavRoutes = () => {
  const pathname = usePathname();

  return (
    <ul className="flex relative z-0 items-center gap-5">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-bold pb-1 text-base nav-list hover:text-[#f97316] ${
                isActive ? "NavActive" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SecondaryNavRoutes;
