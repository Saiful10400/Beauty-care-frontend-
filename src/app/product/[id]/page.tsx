"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetProductBySlugQuery } from "@/redux/api";

export default function ProductDetails() {
  const params = useParams();
  const slug = params.id as string;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading } = useGetProductBySlugQuery(slug);

  if (isLoading) return <div className="p-8">Loading...</div>;

  const product = data?.data;

  const displayPrice =
    product.discountPrice && product.discountPrice < product.price
      ? product.discountPrice
      : product.price;

  const discountPercent =
    product.discountPrice && product.discountPrice < product.price
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
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

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: Image carousel */}
        <div className="md:col-span-3 flex flex-col gap-2">
          {/* Carousel */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
            <Image
              src={product.images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              fill
              className="object-cover transition duration-300"
            />
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                -{discountPercent}%
              </span>
            )}
            {/* Navigation */}
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
            {product.images.map((img:string, i:number) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative cursor-pointer w-20 h-20 border rounded overflow-hidden ${
                  i === currentIndex ? "ring-2 ring-pink-500" : ""
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
          <h1 className="text-2xl font-bold">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-2">
            {discountPercent > 0 && (
              <span className="line-through text-gray-400 text-lg">
                ৳ {product.price}
              </span>
            )}
            <span className="text-2xl font-bold text-pink-600">
              ৳ {displayPrice}
            </span>
          </div>

          <p className="text-gray-700">{product.shortDescription}</p>

          {/* Brand */}
          <div className="flex items-center gap-2">
            {product.brandId.logoUrl && (
              <Image
                src={product.brandId.logoUrl}
                alt={product.brandId.name}
                width={24}
                height={24}
              />
            )}
            <Link
              href={product.brandId.websiteUrl}
              target="_blank"
              className="text-sm text-gray-500 hover:text-pink-600 underline"
            >
              {product.brandId.name}
            </Link>
          </div>

          {/* Category */}
          {product.categoryIds && (
            <p className="text-sm text-gray-500">
              Category: {product.categoryIds.name}
            </p>
          )}

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {product.tags.map(
              (tag:string, i:number) =>
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
              disabled={!product.inStock}
              className={`flex-1 cursor-pointer py-3 rounded-lg text-base font-semibold transition ${
                product.inStock
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "Add to Bag" : "Out of Stock"}
            </button>

            <button
              disabled={!product.inStock}
              className={`flex-1 cursor-pointer py-3 rounded-lg text-base font-semibold transition ${
                product.inStock
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className="prose max-w-none mt-8"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </div>
  );
}
