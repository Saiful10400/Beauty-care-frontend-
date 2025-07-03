"use client";
import { useGetProductQuery } from "@/redux/api";
import SectionTittle from "../ui/SectionTittle";
import ProductCard from "../ui/ProductCard";
import { tProduct } from "@/types";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/featcher/hoocks";
import { resetFilters } from "@/redux/featcher/searchSlice";

const HomeNewArival = () => {
    const { data: products, isLoading } = useGetProductQuery({ offset: 0, limit: 8, sort: -1, inStock: true });
    const move = useRouter()
    const dispatch = useAppDispatch()


    if (products?.data?.result?.length === 0) {
        return null
    }


    return (
        <div className="sm:mb-6">
            <div className="max-w-[1400px] mx-auto px-4 py-12">
                <SectionTittle tittle="NEW ARRIVALS!" />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-full h-[250px] sm:h-[300px] bg-gray-200 animate-pulse rounded-md"
                            />
                        ))
                        : products?.data?.result?.map((cat: tProduct, index: number) => (
                            <ProductCard key={index} product={cat} />
                        ))}
                </div>
            </div>

            <div className="flex justify-center">
                <button onClick={() => {
                    dispatch(resetFilters())
                    move.push("/all-product")
                }}
                    className="px-6 py-3 border border-gray-500 cursor-pointer text-black font-bold hover:bg-gray-100 transition-all duration-300"
                >
                    ALL PRODUCT
                </button>
            </div>
        </div>
    );
};

export default HomeNewArival;
