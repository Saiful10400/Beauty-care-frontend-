'use client';

import Image from 'next/image';
import SectionTittle from '../ui/SectionTittle';
import Link from 'next/link';

export const categories = [
  {
    title: 'FRAGRANCE',
    route: 'fragrance',
    imageUrl: 'https://i.ibb.co/cS2Rjh6G/FRAGRANCE-16x9.webp',
  },
  {
    title: 'MEN’S COLLECTION',
    route: 'mens-cologne',
    imageUrl: 'https://i.ibb.co/6cNSv1SZ/Metro-Society-GA-SN-190224-00.jpg',
  },
  {
    title: 'HAIRCARE',
    route: 'haircare',
    imageUrl: 'https://i.ibb.co/3YmpfQ0N/best-korean-hair-products-in-2023-3780x.webp',
  },
  {
    title: 'SKINCARE',
    route: 'skincare',
    imageUrl: 'https://i.ibb.co/rKXMVndh/18111115-untitled-design-2-cover-1920x1200.png',
  },
  {
    title: 'WOMEN’S COLLECTION',
    route: 'gift-sets',
    imageUrl: 'https://i.ibb.co/xwMj0NN/Gif-set-Page-50x50-Section-Creatives-05-082ebdde-6c61-485c-8694-0d15e64f7b04.webp',
  },
  {
    title: 'BODYCARE',
    route: 'best-sellers',
    imageUrl: 'https://i.ibb.co/hFbRwGxw/beautiful-spa-composition-massage-table-wellness-center-copyspace.webp',
  },
];

type TCategoryCard = {
  title: string;
  route: string;
  imageUrl: string;
};

const handleShopNow = (route: string) => {
  console.log(`Navigating to ${route}`);
};

 

export default function CategoryGrid() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12  ">
      <SectionTittle tittle="Shop by Category" />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {categories.map((cat: TCategoryCard, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-md border border-[#f6d4d8] bg-white"
          >
            <Image
              src={cat.imageUrl}
              alt={cat.title}
              width={500}
              height={500}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0000004f] bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex flex-col justify-center items-center">
              <h3 className="text-white font-semibold text-lg md:text-xl tracking-wide text-center uppercase drop-shadow">
                {cat.title}
              </h3>
              <button
                onClick={() => handleShopNow(cat.route)}
                className="cursor-pointer mt-3 text-sm px-5 py-1.5 rounded-full font-medium bg-white text-[#d88c9a] border border-white hover:bg-[#d88c9a] hover:text-white transition-all duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="mt-12 flex justify-center">
        <Link
          href={"/categories"}
          className="px-6 py-3 border border-gray-500 cursor-pointer text-black font-bold hover:bg-gray-100 transition-all duration-300"
        >
          Show All
        </Link>

      </div>
    </div>
  );
}
