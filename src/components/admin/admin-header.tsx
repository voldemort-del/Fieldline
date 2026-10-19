'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { BrandLogo } from '@/components/marketing/brand-logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Menu,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Bell,
  Wrench,
  Users,
  Check,
  Building2,
} from 'lucide-react';

export function AdminHeader({ onOpenMobileMenu }: { onOpenMobileMenu?: () => void }) {
  const { requests, resetDemoData } = useFieldline();
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const pendingCount = requests.filter(
    (r) => r.status === 'submitted' || r.status === 'under_review'
  ).length;

  const inProgressCount = requests.filter(
    (r) => r.status === 'in_progress' || r.status === 'engineer_dispatched'
  ).length;

  const handleReset = () => {
    resetDemoData();
    setIsResetConfirmOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950 border-b border-slate-800 text-white shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile trigger & System Identity */}
          <div className="flex items-center gap-3">
            {onOpenMobileMenu && (
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Open operations menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="lg:hidden">
              <BrandLogo variant="light" size="sm" withLink={false} />
            </div>

            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                STAFF OPERATIONS DESK
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-xs text-slate-400">
                Internal Service Dispatch &amp; Work Order Coordination
              </span>
            </div>
          </div>

          {/* Right: Operational Status Badges & Quick Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Operational Counters */}
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {pendingCount} Triage Pending
              </span>

              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-blue-400 font-mono">
                {inProgressCount} Dispatched
              </span>
            </div>

            {/* Quick Link to Customer Portal */}
            <Link
              href="/portal-demo/dashboard"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors inline-flex items-center gap-1.5"
              title="Inspect Customer-facing view"
            >
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Customer View</span>
            </Link>

            {/* Reset Demo State */}
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors text-xs flex items-center gap-1"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset</span>
            </button>

            {/* Exit to Website */}
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors inline-flex items-center gap-1"
            >
              <span className="hidden sm:inline">Website</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsResetConfirmOpen(false)}
          />
          <div className="relative bg-white text-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 z-10 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Reset Demonstration Data?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This restores all tickets, equipment, and customer records back to their pristine seed state.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsResetConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleReset}
              >
                Confirm Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
