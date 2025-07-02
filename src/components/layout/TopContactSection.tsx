"use client";

import { useGetGeneralQuery } from '@/redux/api';
import { Tgeneral } from '@/types';
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
} from 'lucide-react';

export default function TopContactSection() {
  const { data, isLoading } = useGetGeneralQuery(null);
  const generel: Tgeneral = data?.data;

  if (isLoading) {
    return (
      <div className="bg-[#1E1E38] text-white text-sm py-2 px-4 animate-pulse">
        <div className="w-full mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 w-full md:w-auto">
            <div className="h-4 bg-[#2E2E50] rounded w-40"></div>
            <div className="h-4 bg-[#2E2E50] rounded w-32"></div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 w-full md:w-auto">
            <div className="h-4 bg-[#2E2E50] rounded w-6"></div>
            <div className="h-4 bg-[#2E2E50] rounded w-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!generel) {
    return null;
  }

  return (
    <div className="bg-[#1E1E38] text-white text-sm py-2 px-4">
      <div className="w-full mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
        {/* Left Section */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1 text-[#e5017a]">
            <Mail size={14} />
            <span className="text-[#e5017a] hidden sm:inline">Email:</span>
            <a
              href={`mailto:${generel?.contactEmail}`}
              className="hover:underline text-white"
            >
              {generel?.contactEmail}
            </a>
          </div>
          <div className="flex items-center gap-1 text-[#e5017a]">
            <Phone size={14} />
            <span className="text-[#e5017a] hidden sm:inline">Hotline:</span>
            <span className='text-white'>{generel?.phone}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 text-xs sm:text-sm">
          <a href={generel?.socialLinks?.facebook}>
            <Facebook size={16} className="hover:text-blue-500 cursor-pointer" />
          </a>
          <a href={generel?.socialLinks?.instagram}>
            <Instagram size={16} className="hover:text-pink-500 cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
}
