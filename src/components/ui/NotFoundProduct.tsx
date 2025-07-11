import Link from 'next/link';
import React from 'react';

const NotFoundProduct = () => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <h1 className="lg:text-5xl text-xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6 text-sm lg:text-base">
               {" Sorry, we couldn't find the product you were looking for."}
            </p>
            <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-[#e90074] text-white rounded hover:bg-gray-800 transition"
            >
                Back to Home
            </Link>
        </main>
    );
};

export default NotFoundProduct;