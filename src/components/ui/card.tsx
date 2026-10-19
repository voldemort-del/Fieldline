import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'navy' | 'interactive';
}

export function Card({
  children,
  className = '',
  variant = 'default',
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-slate-200/80 shadow-xs text-slate-900',
    elevated: 'bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-slate-900',
    navy: 'bg-slate-950 border border-slate-800 text-white shadow-md',
    interactive:
      'bg-white border border-slate-200 hover:border-amber-500/80 hover:shadow-md transition-all duration-200 cursor-pointer text-slate-900',
  };

  return (
    <div
      className={`rounded-xl overflow-hidden ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 border-b border-slate-100 ${className}`}>{children}</div>;
}

export function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-6 bg-slate-50/70 border-t border-slate-100 ${className}`}>
      {children}
    </div>
  );
}
