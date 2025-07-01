"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PageHeaderRouting = () => {
  const pathname = usePathname();
  const routes = pathname
    .split("/")
    .filter((item) => item !== "");

  const lastRoute = routes[routes.length - 1];
  const capitalizedTitle = lastRoute
    ? lastRoute[0].toUpperCase() + lastRoute.slice(1)
    : "Home";

  return (
    <div className="pt-10 pb-8">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
        {capitalizedTitle}
      </h1>

      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 mt-3 text-sm sm:text-base font-medium">
        <Link href="/" className="text-gray-500 hover:text-pink-500 transition-colors">
          HOME
        </Link>
        {routes.length > 0 && <span className="text-gray-400">›</span>}
        {routes.map((item, idx) => {
          const href = "/" + routes.slice(0, idx + 1).join("/");
          const isLast = idx === routes.length - 1;
          return (
            <div key={idx} className="flex items-center gap-1">
              <Link
                href={href}
                className={
                  isLast
                    ? "text-pink-600"
                    : "text-gray-500 hover:text-pink-500 transition-colors"
                }
              >
                {item.replace(/-/g, " ").toUpperCase()}
              </Link>
              {!isLast && <span className="text-gray-400">›</span>}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default PageHeaderRouting;
