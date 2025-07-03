'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetBannerQuery } from '@/redux/api';
import { TBanner } from '@/types';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/featcher/hoocks';
import { toggleOfferType } from '@/redux/featcher/searchSlice';

export default function BannerCarousel() {
    const { data: banners, isLoading } = useGetBannerQuery<{
        data: { data: TBanner[] };
        isLoading: boolean;
    }>(null);

    const move = useRouter()
    const dispatch = useAppDispatch()
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const startAutoSlide = useCallback(() => {
        if (banners?.data.length) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) =>
                    prev === banners.data.length - 1 ? 0 : prev + 1
                );
            }, 2500);
        }
    }, [banners?.data.length]);

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            startAutoSlide();
        }
        return () => stopAutoSlide();
    }, [startAutoSlide, isLoading]);

    const nextSlide = () => {
        if (banners?.data.length) {
            setCurrentIndex((prev) =>
                prev === banners.data.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevSlide = () => {
        if (banners?.data.length) {
            setCurrentIndex((prev) =>
                prev === 0 ? banners.data.length - 1 : prev - 1
            );
        }
    };

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
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            prevSlide();
        }
    };

    if (isLoading) {
        // Skeleton placeholder during banner load
        return (
            <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse rounded-md" />
        );
    }



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
                    <button onClick={() => {
                        if (banner.type === "page") {
                            move.push(`/${banner.asset}`)
                        } else if (banner.type === "offer") {
                            if (banner.asset === "combo") {
                                dispatch(toggleOfferType("combo"))
                            } else if (banner.asset === "discount") {
                                dispatch(toggleOfferType("discount"))
                            }
                            move.push("/all-product")
                        }
                    }}
                        key={index}
                        className="w-full cursor-pointer flex-shrink-0 flex items-center justify-center relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-black"
                    >
                        <Image
                            src={banner.imageUrl}
                            alt={`Banner ${index + 1}`}
                            fill
                            className="object-contain sm:object-cover"
                            priority={index === 0}
                        />
                    </button>
                ))}
            </div>

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="absolute cursor-pointer top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow z-10"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow z-10"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {banners?.data.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index
                                ? 'bg-[#4b274b]'
                                : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
