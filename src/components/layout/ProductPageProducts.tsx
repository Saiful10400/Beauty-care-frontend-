"use client"
import { useGetProductQuery } from '@/redux/api';
 
 
import React from 'react';
import ProductCard from '../ui/ProductCard';
import { tProduct } from '@/types';
import { useAppSelector } from '@/redux/featcher/hoocks';

const ProductPageProducts = () => {

    const params = useAppSelector(p => p.searchParams)
    console.log(params)

    const { data: products } = useGetProductQuery({ offset: 0, limit: 8 })
 
    return (
        <div>
            <div className="max-w-[1400px] mx-auto px-4 py-12  ">
                

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                    {products?.data?.result?.map((cat: tProduct, index: number) => (
                        <ProductCard key={index} product={cat} />
                    ))}
                </div>
            </div>
         
        </div>
    );
};

export default ProductPageProducts;