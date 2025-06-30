/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import './css/productQuery.css';
import { useGetCategoriesQuery, useGetBrandsQuery } from '@/redux/api';
import { Tbrand, TCategory } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/featcher/hoocks';
import { setMinPrice, setMaxPrice, toggleOfferType, toggleBrandId, toggleCategoryId, } from '@/redux/featcher/searchSlice';

const MIN = 1;
const MAX = 36000;

const ProductPageQuery = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector(p => p);

  const minPrice = searchParams.price.min;
  const maxPrice = searchParams.price.max;

  const [tempMin, setTempMin] = useState(minPrice);
  const [tempMax, setTempMax] = useState(maxPrice);

  const { data: category } = useGetCategoriesQuery({ offset: 0, limit: 5000 });
  const { data: brand } = useGetBrandsQuery({ offset: 0, limit: 5000 });

 
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [brandSearchTerm, setBrandSearchTerm] = useState('');

  const offers = [
    { id: 'discount', label: 'Discount Offers' },
    { id: 'combo', label: 'Combo Deals' },
  ];



  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, tempMax - 1);
    setTempMin(newMin);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, tempMin + 1);
    setTempMax(newMax);
  };

  // Debounced updates to Redux
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setMinPrice(tempMin));
    }, 300);
    return () => clearTimeout(timeout);
  }, [tempMin]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setMaxPrice(tempMax));
    }, 300);
    return () => clearTimeout(timeout);
  }, [tempMax]);

  const filteredCategories = (category?.data?.result as TCategory[] | undefined)
    ?.filter(cat => cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase())) ?? [];

  const filteredBrands = (brand?.data?.result as Tbrand[] | undefined)
    ?.filter(br => br.name.toLowerCase().includes(brandSearchTerm.toLowerCase())) ?? [];
 
 





  return (
    <aside className="w-full max-w-[300px] p-4 space-y-6 text-sm text-[#333]">

      {/* Filter by Price */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Filter by Price</h2>

        <div className="relative h-8 mt-4">
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-300 rounded-full z-0" />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-2 bg-pink-500 rounded-full z-10"
            style={{
              left: `${(tempMin / MAX) * 100}%`,
              width: `${((tempMax - tempMin) / MAX) * 100}%`,
            }}
          />
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={tempMin}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="range-thumb w-full absolute appearance-none bg-transparent"
            style={{ zIndex: tempMin > tempMax - 1000 ? 25 : 30 }}
          />
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={tempMax}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="range-thumb w-full absolute appearance-none bg-transparent"
            style={{ zIndex: tempMax < tempMin + 1000 ? 30 : 25 }}
          />
        </div>

        <div className="flex items-center gap-2 mt-3">
          <input
            type="number"
            value={tempMin}
            min={MIN}
            max={tempMax - 1}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-20 px-1 py-1 border border-gray-300 rounded"
          />
          <span>to</span>
          <input
            type="number"
            value={tempMax}
            min={tempMin + 1}
            max={MAX}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-24 px-1 py-1 border border-gray-300 rounded"
          />
        </div>

        <p className="mt-1 text-sm text-pink-600">
          Price: ৳{tempMin} to ৳{tempMax}
        </p>
      </div>

      {/* Filter by Offer */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Filter by Offer</h2>
        <div className="space-y-2">
          {offers.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={id}
                checked={searchParams.offerTypes.includes(id)}
                onChange={() => dispatch(toggleOfferType(id))}
                className="accent-pink-500"
              />
              <label htmlFor={id} className="text-sm cursor-pointer">{label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter by category */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Filter by category</h2>
        <input
          type="text"
          placeholder="Search categories"
          value={categorySearchTerm}
          onChange={(e) => setCategorySearchTerm(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-600"
        />
        <div className="mt-3 space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat: TCategory) => (
              <div  key={cat._id} className="flex  items-center gap-2">
                <input checked={searchParams.categoryIds.includes(cat._id)} onChange={() => dispatch(toggleCategoryId(cat._id))} type="checkbox" id={`cat-${cat._id}`} className="accent-pink-500 cursor-pointer" />
                <label htmlFor={`cat-${cat._id}`} className="text-sm cursor-pointer">
                  {cat.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No categories found</p>
          )}
        </div>
      </div>

      {/* Filter by brand */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Filter by brand</h2>
        <input
          type="text"
          placeholder="Search brands"
          value={brandSearchTerm}
          onChange={(e) => setBrandSearchTerm(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-600"
        />
        <div className="mt-3 space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {filteredBrands.length > 0 ? (
            filteredBrands.map((br: Tbrand) => (
              <div  key={br._id} className="flex  items-center gap-2">
                <input checked={searchParams.brandIds.includes(br._id)} onChange={() => dispatch(toggleBrandId(br._id))} type="checkbox" id={`brand-${br._id}`} className="accent-pink-500 cursor-pointer" />
                <label htmlFor={`brand-${br._id}`} className="text-sm cursor-pointer">
                  {br.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No brands found</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ProductPageQuery;
