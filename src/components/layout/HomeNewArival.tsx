"use client"
import { useGetProductQuery } from "@/redux/api";
import SectionTittle from "../ui/SectionTittle";
import ProductCard from "../ui/ProductCard";
import { tProduct } from "@/types";


const HomeNewArival = () => {
    const { data: products } = useGetProductQuery({ offset: 0, limit: 8 })
 
    return (
        <div>
            <div className="max-w-[1400px] mx-auto px-4 py-12  ">
                <SectionTittle tittle="NEW ARRIVALS!" />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                    {products?.data?.result?.map((cat: tProduct, index: number) => (
                        <ProductCard key={index} product={cat} />
                    ))}
                </div>
            </div>
            <div className="mt-12 flex justify-center">
                <button
                     
                    className="px-6 py-3 border border-gray-500 cursor-pointer text-black font-bold hover:bg-gray-100 transition-all duration-300"
                >
                    SHOP MORE
                </button>

            </div>
        </div>
    );
};

export default HomeNewArival;