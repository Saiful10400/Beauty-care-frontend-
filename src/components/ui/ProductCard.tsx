
import { addToCart } from "@/redux/featcher/CartSlice";
import { taugleDrawer } from "@/redux/featcher/generalSlice";
import { useAppDispatch } from "@/redux/featcher/hoocks";
import { Tbrand, tProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: tProduct }) {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const displayPrice =
    product.discountPrice !== 0 ? product.discountPrice : product.price;

  const showDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const amountSaved = showDiscount
    ? product.price - (product.discountPrice as number)
    : 0;

  const hasLongDescription =
    product.shortDescription && product.shortDescription.length > 40;

  const handleAddToBag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(addToCart({ haveOffer: product.haveOffer?true:product?.isComboOffer?true:product?.haveOffer||false, name: product.name, price: product?.haveOffer ? (product.discountPrice as number) : product?.isComboOffer ? (product?.discountPrice as number) : product.price, productId: product._id, quantity: 1, imageUrl: product.images[0] }))
    dispatch(taugleDrawer())
  };

  const handleCardClick = () => {
    router.push(`/product/${product.slug}?isCombo=${product.isComboOffer ? true : false}`);
  };

  // Normalize brands
  const brands: Array<Tbrand> = Array.isArray(product.brandId)
    ? product.brandId
    : product.brandId
      ? [product.brandId]
      : [];

  return (
    <div
      onClick={handleCardClick}
      className="relative border border-gray-100 rounded-2xl p-4 flex flex-col bg-white hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
    >
      {/* Combo Offer Badge */}
      {product.isComboOffer && (
        <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold z-10">
          Combo Offer
        </span>
      )}

      {/* Image */}
      <div className="w-full h-52 relative overflow-hidden rounded-lg group">
        <Image
          src={product.images?.[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="mt-4 text-sm font-semibold leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Brands */}
        {brands.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            {brands.slice(0, 2).map((brand) => (
              <div key={brand._id} className="flex items-center gap-1">
                {brand.logoUrl && (
                  <Image
                    src={
                      brand.logoUrl.startsWith("data:")
                        ? brand.logoUrl
                        : brand.logoUrl
                    }
                    alt={brand.name}
                    width={18}
                    height={18}
                  />
                )}
                <Link
                  href={brand.websiteUrl ?? "#"}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-gray-500 hover:text-pink-600 underline"
                >
                  {brand.name}
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mt-2">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-pink-50 text-pink-600 text-[10px] px-2 py-0.5 rounded-full font-medium border border-pink-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Categories */}
        {Array.isArray(product.categoryIds) && product.categoryIds.length > 0 && (
          <p className="text-[11px] text-gray-400 mt-1">
            {product.categoryIds.slice(0, 2).map((c) => c.name).join(", ")}
          </p>
        )}

        {/* Short Description */}
        {product.shortDescription && (
          <p
            className={`text-xs text-gray-600 mt-2 ${hasLongDescription ? "line-clamp-2" : ""
              }`}
          >
            {product.shortDescription}
          </p>
        )}
      </div>

      {/* Price and Add to Bag */}
      <div className="mt-4 flex flex-col gap-2">
        {showDiscount ? (
          <div>
            <span className="line-through text-sm text-gray-400 mr-2">
              ৳ {product.price.toLocaleString()}
            </span>
            <span className="text-base font-bold text-pink-600">
              ৳ {displayPrice?.toLocaleString()}
            </span>
            {amountSaved > 0 && (
              <p className="text-xs text-green-600 mt-0.5">
                You save ৳ {amountSaved.toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <span className="text-base font-bold text-gray-800">
            ৳ {displayPrice?.toLocaleString()}
          </span>
        )}

        <button
          onClick={handleAddToBag}
          disabled={!product.inStock}
          className={`w-full py-2 rounded-xl cursor-pointer text-sm font-medium transition duration-200 ${product.inStock
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
        >
          {product.inStock ? "Buy Now" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
