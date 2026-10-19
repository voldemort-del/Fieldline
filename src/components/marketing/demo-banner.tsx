'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Info, X, ExternalLink } from 'lucide-react';

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
            <Sparkles className="w-3 h-3" />
            PORTFOLIO CONCEPT
          </span>
          <span className="hidden sm:inline text-slate-400">
            Fictional UK commercial kitchen servicing platform. All client records and enquiries operate in demonstration mode.
          </span>
          <span className="sm:hidden text-slate-400 truncate">
            Fictional UK servicing platform demonstration.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/portal-demo"
            className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center gap-1 underline underline-offset-2 transition-colors"
          >
            Explore Portal Preview
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-slate-300 p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
