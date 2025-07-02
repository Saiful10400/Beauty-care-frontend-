import BannerCarosel from '@/components/layout/BannerCarosel';
import HomeBrandsGrid from '@/components/layout/HomeBrandsGrid';
import CategoryGrid from '@/components/layout/HomeCategoryGrid';
import HomeComboOfferces from '@/components/layout/HomeComboOfferces';
import HomeNewArival from '@/components/layout/HomeNewArival';
import React from 'react';

const page = () => {
  return (
    <div>
      <section className='mt-3'>
        <BannerCarosel />
      </section>

      <CategoryGrid />
      <HomeComboOfferces />
      <HomeNewArival />
      <HomeBrandsGrid />

    </div>
  );
};

export default page;