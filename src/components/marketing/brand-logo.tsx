import React from 'react';
import Link from 'next/link';

export interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  withLink?: boolean;
}

export function BrandLogo({
  variant = 'dark',
  size = 'md',
  withLink = true,
}: BrandLogoProps) {
  const isDarkText = variant === 'dark';

  const sizeClasses = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-xs' },
  };

  const content = (
    <div className="inline-flex items-center gap-2.5 select-none group">
      {/* Precision Geometric Emblem */}
      <div
        className={`${sizeClasses[size].icon} relative flex items-center justify-center rounded-lg bg-slate-950 border border-slate-800 shadow-sm transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6"
        >
          {/* Calibrated grid lines */}
          <path
            d="M6 10H26M6 16H26M6 22H26"
            stroke="#334155"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Dynamic Fieldline Accent Line */}
          <path
            d="M6 16H13L16 9L20 23L23 16H26"
            stroke="#D97706"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Status node */}
          <circle cx="16" cy="9" r="1.5" fill="#F59E0B" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-tight ${sizeClasses[size].text} ${
            isDarkText ? 'text-slate-900' : 'text-white'
          }`}
        >
          FIELD<span className="text-amber-600">LINE</span>
        </span>
        <span
          className={`font-medium tracking-widest uppercase mt-0.5 ${sizeClasses[size].sub} ${
            isDarkText ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          Kitchen Services
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" aria-label="Fieldline Homepage" className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
