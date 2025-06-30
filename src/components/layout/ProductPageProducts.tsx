/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useGetProductQuery } from '@/redux/api';


import React, { useEffect, useState } from 'react';
import ProductCard from '../ui/ProductCard';
import { tProduct } from '@/types';
import { useAppSelector } from '@/redux/featcher/hoocks';

const ProductPageProducts = () => {

    const params = useAppSelector(p => p.searchParams)


    const [query, setQuery] = useState<Partial<{ offset: number, limit: number,categoryIds:string[], brandIds: string[] }>>({ offset: 0, limit: 8 })

    useEffect(() => {
        if (params.price) {
            setQuery(p => ({ ...p, minPrice: params.price.min, maxPrice: params.price.max }))
        }
        if (params.categoryIds.length !== 0) {

            setQuery(p => ({ ...p, categoryIds: params.categoryIds }))
        }
        if (params.brandIds.length !== 0) {

            setQuery(p => ({ ...p, brandIds: params.brandIds }))
        }
        if (params.brandIds.length === 0) {

            setQuery(p => {
                const { brandIds, ...rest } = p
                return rest
            })
        }
        if (params.categoryIds.length === 0) {

            setQuery(p => {
                const { categoryIds, ...rest } = p
                return rest
            })
        }

    }, [params])

    const { data: products } = useGetProductQuery(query)

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