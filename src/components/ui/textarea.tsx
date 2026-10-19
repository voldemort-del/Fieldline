import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, className = '', required, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            {label}
            {required && <span className="text-amber-600 ml-1 font-semibold">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-xs">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            required={required}
            className={`block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500
              ${
                error
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-amber-600 focus:ring-amber-500/20'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
