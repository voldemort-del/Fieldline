import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'amber'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}: BadgeProps) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded gap-1',
    md: 'text-xs px-2.5 py-1 rounded-md gap-1.5',
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-800 border border-slate-200',
    amber: 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
    outline: 'border border-slate-300 text-slate-700 bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center font-medium leading-none tracking-tight ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-block shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
