"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useGetProductBySlugQuery } from "@/redux/api";
import { Tbrand, TCategory } from "@/types";
import { useAppDispatch } from "@/redux/featcher/hoocks";
import { addToCart } from "@/redux/featcher/CartSlice";
import { taugleDrawer } from "@/redux/featcher/generalSlice";

export default function ProductDetails() {
  const params = useParams();
  const slug = params.id as string;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const searchParams = useSearchParams();
  const isCombo = searchParams.get("isCombo");

  const { data, isLoading } = useGetProductBySlugQuery({ slug, isCombo });
  const dispatch = useAppDispatch()
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <svg
          className="animate-spin h-10 w-10 text-pink-500 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-pink-500 text-sm font-medium">Loading product...</p>
      </div>
    );

  const product = data?.data;

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const displayPrice = hasDiscount ? product.discountPrice : product.price;

  const discountPercent = hasDiscount
    ? Math.round(
      ((product.price - product.discountPrice) / product.price) * 100
    )
    : 0;

  const savedAmount = hasDiscount
    ? product.price - product.discountPrice
    : 0;

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Normalize brands and categories
  const brands = product.isComboOffer ? product.brandsId : [product.brandId];
  const categories = Array.isArray(product.categoryIds)
    ? product.categoryIds
    : [product.categoryIds];




  const handleBuy = () => {


    dispatch(addToCart({ haveOffer: product.haveOffer ? true : product?.isComboOffer ? true : product?.haveOffer || false, name: product.name, price: product?.haveOffer ? (product.discountPrice as number) : product?.isComboOffer ? (product?.discountPrice as number) : product.price, productId: product._id, quantity, imageUrl: product.images[0] }))
    dispatch(taugleDrawer())
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: Image carousel */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
            <Image
              src={product.images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              fill
              className="object-cover transition duration-300"
            />
            {/* Discount badge: only if NOT combo */}
            {!product.isComboOffer && discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                -{discountPercent}%
              </span>
            )}
            <button
              onClick={prevImage}
              aria-label="Previous Image"
              className="absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              aria-label="Next Image"
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ▶
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative cursor-pointer w-20 h-20 border rounded overflow-hidden ${i === currentIndex ? "ring-2 ring-pink-500" : ""
                  }`}
                aria-label={`Select image ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product info */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {product.name}
            {product.isComboOffer && (
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-lg animate-pulse select-none">
                Combo Offer
              </span>
            )}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-2">
            {!product.isComboOffer && discountPercent > 0 && (
              <span className="line-through text-gray-400 text-lg">
                ৳ {product.price}
              </span>
            )}
            <span className="text-2xl font-bold text-pink-600">
              ৳ {displayPrice}
            </span>
            {/* Show saved amount in combo */}
            {product.isComboOffer && savedAmount > 0 && (
              <span className="text-sm text-green-600 font-semibold ml-2">
                You save ৳{savedAmount}
              </span>
            )}
          </div>

          <p className="text-gray-700">{product.shortDescription}</p>

          {/* Brands */}
          <div className="flex flex-wrap items-center gap-2">
            {brands?.map((brand: Tbrand, i: number) => (
              <Link
                key={i}
                href={brand.websiteUrl as string}
                target="_blank"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink-600 underline"
              >
                {brand.logoUrl && (
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    width={20}
                    height={20}
                  />
                )}
                {brand.name}
              </Link>
            ))}
          </div>

          {/* Categories */}
          {categories && categories.length > 0 && (
            <p className="text-sm text-gray-500">
              Category: {categories.map((c: TCategory) => c.name).join(", ")}
            </p>
          )}

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {product.tags?.map(
              (tag: string, i: number) =>
                tag && (
                  <span
                    key={i}
                    className="bg-pink-50 text-pink-600 text-xs px-2 py-0.5 rounded-full border border-pink-200"
                  >
                    {tag}
                  </span>
                )
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 cursor-pointer py-1 text-lg hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 cursor-pointer text-lg hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleBuy}
              disabled={!product.inStock}
              className={`flex-1 cursor-pointer py-3 rounded-lg text-base font-semibold transition ${product.inStock
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {product.inStock ? "Buy Now" : "Out of Stock"}
            </button>


          </div>
        </div>
      </div>

      {/* Description */}
      <div className=" max-w-none">
        <div
          className="ql-editor mt-8"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
}
