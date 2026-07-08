import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FA]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-neutral-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#C61A1A] border-t-transparent animate-spin"></div>
        </div>
        {/* Loading Text */}
        <div className="mt-4 text-[#8A95A5] font-medium tracking-wide animate-pulse">
          Yükleniyor...
        </div>
      </div>
    </div>
  );
}
