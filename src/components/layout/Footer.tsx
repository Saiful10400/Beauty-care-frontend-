"use client";

import formatUrl from "@/lib/formateUrl";
import { useGetGeneralQuery } from "@/redux/api";
import { Tgeneral } from "@/types";
import { Instagram, Facebook, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const { data, isLoading } = useGetGeneralQuery(null);

  const general: Tgeneral | undefined = data?.data;

  if (isLoading) {
    return (
      <footer className="bg-white text-gray-800 py-12 px-6 shadow-inner border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
          <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white text-gray-800 py-12 px-6 shadow-inner border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-2xl font-extrabold mb-4 tracking-wide text-pink-600">
            {general?.siteName ?? "YourBrand"}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {general?.aboutUs ??
              "We deliver quality products and exceptional service to make your life better. Stay connected with us for the latest updates!"}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-pink-600">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/all-product" },
              { name: "Brands", href: "/brands" },
              { name: "Categories", href: "/categories" },
            ].map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-pink-600">Contact Us</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-pink-400" />
              <a
                href={`mailto:${general?.contactEmail ?? "support@yourbrand.com"}`}
                className="hover:text-pink-500 transition-colors duration-300"
              >
                {general?.contactEmail ?? "support@yourbrand.com"}
              </a>
            </li>
            <li>{general?.phone ?? "+1 234 567 890"}</li>
            <li>{general?.address ?? "123 Fancy Street, Your City, Country"}</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-pink-600">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              {
                href: formatUrl(general?.socialLinks?.facebook as string),
                label: "Facebook",
                icon: Facebook,
              },
              {
                href: formatUrl(general?.socialLinks?.instagram as string),
                label: "Instagram",
                icon: Instagram,
              },
            ].map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-shadow duration-300 shadow-sm hover:shadow-md"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 select-none space-y-2 pb-9 sm:pb-0">
        <div>
          &copy; {new Date().getFullYear()} {general?.siteName ?? "YourBrand"}. All rights reserved.
        </div>
        {/* Developer credit always visible */}
        <div>
          Developed by{" "}
          <a
            href="https://www.facebook.com/saiful.islam.720143"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-pink-600 transition-colors"
          >
            SAIFUL
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
