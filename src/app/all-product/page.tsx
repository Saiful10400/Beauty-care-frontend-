"use client"


import ProductPageProducts from '@/components/layout/ProductPageProducts';
import ProductPageQuery from '@/components/layout/ProductPageQuery';
import PageHeaderRouting from '@/components/ui/PageHeaderRouteing';
import scrollToTop from '@/lib/scroolToTop';
import React, { useEffect } from 'react';

const AllProduct = () => {


    useEffect(() => {
        scrollToTop()
    }, [])


    return (
        <div className="  px-4  py-6">
            <PageHeaderRouting />
            <div className="flex flex-col md:flex-row gap-4 ">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4">
                    <ProductPageQuery />
                </aside>

                {/* Main Content */}
                <main className="w-full md:w-3/4">
                    <ProductPageProducts />
                </main>
            </div>
        </div>
    );
};

export default AllProduct;
