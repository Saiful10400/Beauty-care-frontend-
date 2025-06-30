import { tProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";



export default function ProductCard({
    product,
}: {
    product: tProduct;
}) {
    const displayPrice = product.discountPrice !== 0 ? product.discountPrice : product.price;
    const showDiscount =
        product.discountPrice && product.discountPrice < product.price;

    return (
        <div className="relative border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center bg-white hover:shadow-md transition">
            {/* Gender Tag */}
            {product.gender && (
                <div className="absolute z-10 top-3 left-3 bg-purple-700 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    {product.gender.toUpperCase()}
                </div>
            )}

            {/* Favorite icon */}
            <button
                className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 transition"
                title="Add to Wishlist"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.682l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                </svg>
            </button>

            {/* Image */}
            <div className="w-full h-52 relative">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Name */}
            <h3 className="mt-4 text-sm font-bold uppercase truncate w-full">
                {product.name}
            </h3>

            {/* Brand */}
            <div className="flex items-center justify-center gap-2 mt-1">
                {product.brandId.logoUrl && (
                    <Image
                        src={product.brandId.logoUrl}
                        alt={product.brandId.name}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                )}
                <Link
                    href={product.brandId.websiteUrl ?? "#"}
                    target="_blank"
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                    {product.brandId.name}
                </Link>
            </div>

            {/* Category */}
            {product.categoryIds && (
                <p className="text-xs text-gray-400 mt-0.5">{product.categoryIds.name}</p>
            )}

            {/* Short Description */}
            <p className="text-sm font-thin text-gray-700 mt-1">{product.shortDescription}</p>

            {/* Price */}
            <p className="mt-2 text-sm">
                {showDiscount ? (
                    <>
                        <span className="line-through mr-2 text-gray-500 md:text-xl">৳ {product.price}</span>
                        <span className="font-bold text-[#d88c9a] md:text-xl">৳ {displayPrice}</span>
                    </>
                ) : (
                    <span className="font-bold md:text-xl">৳ {displayPrice}</span>
                )}
            </p>

            {/* Add to Bag */}
            <button
                disabled={!product.inStock}
                className={`mt-3 w-full border text-sm font-semibold py-2 rounded transition ${product.inStock
                    ? "border-gray-300 hover:bg-gray-100"
                    : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
            >
                {product.inStock ? "ADD TO BAG" : "OUT OF STOCK"}
            </button>
        </div>
    );
}
