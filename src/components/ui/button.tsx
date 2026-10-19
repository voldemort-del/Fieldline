import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      href,
      leftIcon,
      rightIcon,
      external = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none text-center';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
      md: 'px-4 py-2 text-sm rounded-lg gap-2',
      lg: 'px-6 py-3 text-base rounded-lg gap-2.5 font-semibold',
    };

    const variantStyles = {
      primary:
        'bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold focus-visible:ring-amber-500 shadow-sm active:translate-y-px',
      secondary:
        'bg-slate-900 hover:bg-slate-800 text-white focus-visible:ring-slate-700 shadow-sm active:translate-y-px border border-slate-800',
      outline:
        'border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 focus-visible:ring-slate-400 active:translate-y-px',
      ghost:
        'text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300',
      danger:
        'bg-rose-600 hover:bg-rose-500 text-white focus-visible:ring-rose-500 shadow-sm active:translate-y-px',
    };

    const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            className={combinedClasses}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : leftIcon}
            <span>{children}</span>
            {rightIcon}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : leftIcon}
          <span>{children}</span>
          {rightIcon}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
