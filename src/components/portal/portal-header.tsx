'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { BrandLogo } from '@/components/marketing/brand-logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  ChevronDown,
  RotateCcw,
  ExternalLink,
  Menu,
  X,
  Bell,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';

export function PortalHeader({ onOpenMobileMenu }: { onOpenMobileMenu?: () => void }) {
  const { activeSite, setActiveSiteId, sites, resetDemoData, getSiteRequests } = useFieldline();
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const openTicketsCount = getSiteRequests().filter(
    (r) => r.status !== 'completed' && r.status !== 'cancelled'
  ).length;

  const handleSelectSite = (siteId: string) => {
    setActiveSiteId(siteId);
    setIsSiteDropdownOpen(false);
  };

  const handleReset = () => {
    resetDemoData();
    setIsResetConfirmOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile trigger & Site Identity */}
          <div className="flex items-center gap-3">
            {onOpenMobileMenu && (
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* In mobile, show mini logo */}
            <div className="lg:hidden">
              <BrandLogo variant="light" size="sm" withLink={false} />
            </div>

            {/* Active Venue Selector (Interactive Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSiteDropdownOpen(!isSiteDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors text-left"
                aria-expanded={isSiteDropdownOpen}
                aria-label="Switch active demo customer site"
              >
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white tracking-tight">
                      {activeSite.name}
                    </span>
                    <Badge variant="amber" size="sm" className="text-[10px] py-0 px-1.5">
                      Demo Venue
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeSite.contact.name} • {activeSite.accountNumber}
                  </p>
                </div>
                <div className="sm:hidden text-xs font-semibold text-white truncate max-w-[140px]">
                  {activeSite.name}
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
              </button>

              {/* Site Selector Dropdown */}
              {isSiteDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSiteDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-80 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider flex items-center justify-between">
                      <span>Switch Demonstration Venue</span>
                      <span className="text-amber-400">1-Click Switch</span>
                    </div>
                    <div className="py-1 space-y-1">
                      {sites.map((site) => {
                        const isCurrent = site.id === activeSite.id;
                        return (
                          <button
                            key={site.id}
                            type="button"
                            onClick={() => handleSelectSite(site.id)}
                            className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start justify-between gap-2 ${
                              isCurrent
                                ? 'bg-amber-500/10 text-white border border-amber-500/30'
                                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="font-semibold block text-slate-100">
                                {site.name}
                              </span>
                              <span className="text-[11px] text-slate-400 block">
                                {site.address.city} • {site.totalAssetsCount} Assets Tracked
                              </span>
                            </div>
                            {isCurrent && (
                              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Actions, Demo Badge & Exit Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ticket status badge */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs">
              <span className={`w-2 h-2 rounded-full ${openTicketsCount > 0 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              <span className="text-slate-400">
                {openTicketsCount > 0 ? `${openTicketsCount} Open Callout${openTicketsCount > 1 ? 's' : ''}` : 'All Assets Operational'}
              </span>
            </div>

            {/* Reset Demo Data Button */}
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1.5"
              title="Reset Demo Data to Initial Seeds"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset Demo</span>
            </button>

            {/* Return to Public Website */}
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors inline-flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Exit to Website</span>
              <span className="sm:hidden">Exit</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
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
                Reset Demo Data?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will restore all equipment records, service requests, and history entries back to their original demonstration state.
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
