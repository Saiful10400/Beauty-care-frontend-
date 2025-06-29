import BannerCarosel from '@/components/layout/BannerCarosel';
import CategoryGrid from '@/components/layout/HomeCategoryGrid';
import React from 'react';

const page = () => {
  return (
    <div>
      <section className='mt-3'>
        <BannerCarosel />
      </section>

      <CategoryGrid />

    </div>
  );
};

export default page;