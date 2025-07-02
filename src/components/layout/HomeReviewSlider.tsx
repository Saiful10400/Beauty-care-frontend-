'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetFacebookReviewsQuery } from '@/redux/api';
import SectionTittle from '../ui/SectionTittle';

type Review = {
  _id: string;
  customerName: string;
  profileImageUrl: string;
  message: string;
  reviewDate: string;
  isVisible: boolean;
};

export default function HomeReviewSlider() {
  const { data, isLoading } = useGetFacebookReviewsQuery(null);
  const reviews: Review[] = data?.data?.filter((r: Review) => r.isVisible) || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center mb-6">
        <SectionTittle tittle="Customer Reviews!" />
        <div className="w-full max-w-2xl bg-gray-200 animate-pulse rounded-md p-6 mb-4 h-48" />
      </div>
    );
  }

  if (!reviews.length) {
    return null;
  }

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const review = reviews[currentIndex];

  return (
    <div className="w-full flex flex-col items-center mb-6">
      <SectionTittle tittle="Customer Reviews!" />

      <div className="w-full max-w-2xl bg-white border rounded-md p-6 shadow mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={review.profileImageUrl}
              alt={review.customerName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold">{review.customerName}</div>
            <div className="text-xs text-gray-500">{review.reviewDate}</div>
          </div>
        </div>
        <p className="text-base text-gray-700 whitespace-pre-line">{review.message}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={prevReview}
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
        >
          <ChevronLeft size={16} />
          Prev
        </button>
        <button
          onClick={nextReview}
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
