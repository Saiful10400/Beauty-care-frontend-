import ProductPageProducts from '@/components/layout/ProductPageProducts';
import ProductPageQuery from '@/components/layout/ProductPageQuery';
import React from 'react';

const page = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 px-4 md:px-10 py-6">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4">
                <ProductPageQuery />
            </aside>

            {/* Main Content */}
            <main className="w-full md:w-3/4">
                <ProductPageProducts />
            </main>
        </div>
    );
};

export default page;
