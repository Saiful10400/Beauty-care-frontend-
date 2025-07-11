'use client';
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="w-48 h-48 mb-6 animate-bounce">
        {/* Funny SVG illustration */}
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 472c-119.103 0-216-96.897-216-216S136.897 40 256 40s216 96.897 216 216-96.897 216-216 216z"
            fill="#de0377"
          />
          <circle cx="176" cy="200" r="24" fill="#555" />
          <circle cx="336" cy="200" r="24" fill="#555" />
          <path
            d="M176 320c24 32 72 32 96 0"
            stroke="#555"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! Looks like this page wandered off.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-[#de0377] cursor-pointer text-white px-6 py-3 rounded-md text-base font-medium hover:bg-[#c50268] transition"
      >
        Return to Home
      </button>
    </div>
  );
}
