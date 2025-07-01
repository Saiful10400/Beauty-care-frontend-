"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import { useGetCategoriesQuery } from "@/redux/api";
import SecondaryNavRoutes from "./SEcondaryNavRoutes";

type Tcategory = {
  _count: {
    productId: number;
  };
  categoryId: string;
  imageUrl: string;
  name: string;
  slug: string;
};

const SecondaryNav = () => {
  const { data } = useGetCategoriesQuery({ offset: 0, limit: 200 });
  const categories: Tcategory[] = data?.data?.result;

  return (
    <div className="flex justify-between items-center gap-6 w-full">
      {/* Dropdown Menu */}
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button className="bg-pink-600 hover:bg-pink-700 transition text-white font-semibold text-sm px-4 py-2 rounded-md flex items-center gap-2">
            <Menu className="w-4 h-4" />
            <span className="whitespace-nowrap">All Categories</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Category Menu"
          className="bg-white border border-gray-200 shadow-lg rounded-lg max-h-[60vh] overflow-y-auto w-64"
        >
          {categories?.map((item) => (
            <DropdownItem
              key={item.categoryId}
              className="flex items-center gap-3 px-3 py-2 hover:bg-pink-50 transition text-sm"
              startContent={
                <Image
                  height={32}
                  width={32}
                  src={item.imageUrl}
                  className="w-8 h-8 object-cover rounded-md border"
                  alt={item.name}
                />
              }
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {item.name.length > 22 ? item.name.slice(0, 22) + "…" : item.name}
                </span>
                <span className="text-xs text-gray-500">
                  {item._count?.productId} items
                </span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Horizontal Route Links */}
      <div className="flex-1 overflow-x-auto">
       
        <SecondaryNavRoutes />
      </div>
    </div>
  );
};

export default SecondaryNav;
