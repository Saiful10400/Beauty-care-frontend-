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
      <h1 className="text-4xl font-bold">{capitalizedTitle}</h1>
      <div className="font-semibold flex items-center gap-2 mt-2">
        <Link href="/">HOME</Link>
        {routes.length > 0 && <span>{`>`}</span>}
        {routes.map((item, idx) => {
          const href = "/" + routes.slice(0, idx + 1).join("/");
          const isLast = idx === routes.length - 1;
          return (
            <div key={idx} className="flex items-center gap-2">
              <Link
                href={href}
                className={isLast ? "text-[#ff9208]" : ""}
              >
                {item.toUpperCase()}
              </Link>
              {!isLast && <span>{`>`}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageHeaderRouting;
