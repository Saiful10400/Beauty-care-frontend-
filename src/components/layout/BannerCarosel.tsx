'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetBannerQuery } from '@/redux/api';
import { TBanner } from '@/types';

export default function BannerCarousel() {
    const { data: banners } = useGetBannerQuery<{ data: { data: TBanner[] } }>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Touch state
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const startAutoSlide = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === banners?.data.length - 1 ? 0 : prev + 1
            );
        }, 2500);
    }, [banners?.data.length]);

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [startAutoSlide]);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === banners?.data.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? banners?.data.length - 1 : prev - 1
        );
    };

    // Touch gesture handling
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            // Swiped left
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            // Swiped right
            prevSlide();
        }
    };

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banners?.data?.map((banner: TBanner, index: number) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                    >
                        <Image
                            src={banner.imageUrl}
                            alt={`Banner ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow z-10"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow z-10"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {banners?.data.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-pink-600' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
