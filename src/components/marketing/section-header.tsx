import React from 'react';

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} ${className}`}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80 mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
