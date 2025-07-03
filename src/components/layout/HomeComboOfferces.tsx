"use client";
import { useGetProductQuery } from "@/redux/api";
import SectionTittle from "../ui/SectionTittle";
import ProductCard from "../ui/ProductCard";
import { tProduct } from "@/types";
import { useAppDispatch } from "@/redux/featcher/hoocks";
import { setOfferTypes } from "@/redux/featcher/searchSlice";
import { useRouter } from "next/navigation";

const HomeComboOfferces = () => {
    const { data: products, isLoading } = useGetProductQuery({ offset: 0, limit: 8, sort: -1, comboOffer: true });
    const dispatch=useAppDispatch()
    const move=useRouter()


    if(products?.data?.result?.length===0){
        return null
    }


    return (
        <div className="sm:mb-6">
            <div className="max-w-[1400px] mx-auto px-4 py-12">
                <SectionTittle tittle="combo offers!" />

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
                <button onClick={()=>{
                    dispatch(setOfferTypes(["combo"]));
                       move.push("/all-product")
                }}
                    className="px-6 py-3 border border-gray-500 cursor-pointer text-black font-bold hover:bg-gray-100 transition-all duration-300"
                >
                    ALL COMBOS
                </button>
            </div>
        </div>
    );
};

export default HomeComboOfferces;
