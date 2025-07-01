/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useGetProductQuery } from "@/redux/api";

import React, { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import { tProduct } from "@/types";
import { useAppSelector } from "@/redux/featcher/hoocks";

type tQuery = {
  offset: number;
  limit: number;
  categoryIds: string[];
  brandIds: string[];
  haveOffers: boolean;
  comboOffer: boolean;
};
const defaultQuery = { offset: 0, limit: 8, haveOffers: false };

const ProductPageProducts = () => {
  const params = useAppSelector((p) => p.searchParams);

  const [query, setQuery] = useState<Partial<tQuery>>(defaultQuery);

  useEffect(() => {
    if (params.price) {
      setQuery((p) => ({ ...p, minPrice: params.price.min, maxPrice: params.price.max }));
    }
    if (params.categoryIds.length !== 0) {
      setQuery((p) => ({ ...p, categoryIds: params.categoryIds }));
    }
    if (params.brandIds.length !== 0) {
      setQuery((p) => ({ ...p, brandIds: params.brandIds }));
    }
    if (params.brandIds.length === 0) {
      setQuery((p) => {
        const { brandIds, ...rest } = p;
        return rest;
      });
    }
    if (params.categoryIds.length === 0) {
      setQuery((p) => {
        const { categoryIds, ...rest } = p;
        return rest;
      });
    }
    if (params.offerTypes.length !== 0) {
      if (params.offerTypes.includes("discount")) {
        setQuery({ ...defaultQuery, haveOffers: true, comboOffer: false });
      }
      if (params.offerTypes.includes("combo")) {
        setQuery({ ...defaultQuery, comboOffer: true, haveOffers: false });
      }
    }
    if (params.offerTypes.length === 0) {
      setQuery((p) => {
        const { comboOffer, haveOffers, ...rest } = p;
        return rest;
      });
    }
  }, [params]);

  const { data: products, isLoading } = useGetProductQuery(query);

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <svg
              className="animate-spin h-10 w-10 text-pink-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading"
              role="img"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : products?.data?.result?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {products.data.result.map((cat: tProduct, index: number) => (
              <ProductCard key={cat._id ?? index} product={cat} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12 text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPageProducts;
