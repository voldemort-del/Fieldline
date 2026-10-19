'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import {
  Sparkles,
  Globe,
  Building2,
  HardHat,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Check,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

function DemoSwitcherContent() {
  const pathname = usePathname();
  const { activeSite, setActiveSiteId, sites, resetDemoData, requests } = useFieldline();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSitePickerOpen, setIsSitePickerOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  // Determine current surface
  const isMarketing = !pathname.startsWith('/portal-demo') && !pathname.startsWith('/admin-demo');
  const isPortal = pathname.startsWith('/portal-demo');
  const isAdmin = pathname.startsWith('/admin-demo');

  const pendingRequestsCount = requests.filter(
    (r) => r.status === 'submitted' || r.status === 'under_review'
  ).length;

  const handleReset = () => {
    resetDemoData();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  return (
    <aside
      aria-label="Portfolio Demonstration Controls"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-full px-3"
    >
      <div className="bg-slate-950/95 backdrop-blur-md border border-slate-800 shadow-2xl rounded-2xl text-white transition-all duration-200">
        {/* Main Dock Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-xs">
          {/* Surface Indicator & Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 font-semibold transition-colors"
            title="Toggle Demo Controls"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono text-[11px] uppercase tracking-wider">
              DEMO DOCK:
            </span>
            <span className="font-sans font-bold">
              {isMarketing ? 'Website' : isPortal ? 'Client Portal' : 'Operations'}
            </span>
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-amber-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 ml-0.5 text-amber-400" />
            )}
          </button>

          <span className="w-px h-4 bg-slate-800" />

          {/* Quick Surface Switches */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                isMarketing
                  ? 'bg-slate-800 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
              title="Public Marketing Website"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Website</span>
            </Link>

            <Link
              href="/portal-demo/dashboard"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                isPortal
                  ? 'bg-slate-800 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
              title="Customer Self-Service Portal"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Portal</span>
            </Link>

            <Link
              href="/admin-demo"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors relative ${
                isAdmin
                  ? 'bg-slate-800 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
              title="Operations Dispatch Desk"
            >
              <HardHat className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Operations</span>
              {pendingRequestsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </Link>
          </div>

          <span className="w-px h-4 bg-slate-800" />

          {/* Reset Demo Data Button */}
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="Reset All Demonstration Records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>

        {/* Feedback message upon reset */}
        {resetNotice && (
          <div className="px-4 py-1.5 bg-emerald-500/20 border-t border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between animate-in fade-in">
            <span>Demonstration data restored to initial pristine seed state.</span>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        )}

        {/* Expanded Drawer */}
        {isExpanded && (
          <div className="p-3 sm:p-4 border-t border-slate-800 space-y-3 text-xs animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-500">
                  PORTFOLIO SIMULATION ENGINE
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Synchronized Next.js simulation backed by reactive browser storage.
                </p>
              </div>

              {/* Active Venue Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSitePickerOpen(!isSitePickerOpen)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-2 text-xs font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate max-w-[140px]">{activeSite.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isSitePickerOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs">
                    <p className="text-[10px] uppercase font-semibold text-slate-500 px-2 py-1">
                      Active Customer Venue
                    </p>
                    <div className="space-y-1">
                      {sites.map((site) => (
                        <button
                          key={site.id}
                          type="button"
                          onClick={() => {
                            setActiveSiteId(site.id);
                            setIsSitePickerOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                            site.id === activeSite.id
                              ? 'bg-amber-500/20 text-amber-300 font-semibold'
                              : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{site.name}</span>
                          {site.id === activeSite.id && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Context & Navigation Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-200 block">1. Public Website</span>
                <p className="text-slate-400 text-[10px] leading-tight">
                  Commercial catering equipment servicing value proposition, UK compliance, and lead enquiry flow.
                </p>
                <Link
                  href="/request-service"
                  className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 text-[10px] mt-1"
                >
                  Request Service Flow &rarr;
                </Link>
              </div>

              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-200 block">2. Customer Portal</span>
                <p className="text-slate-400 text-[10px] leading-tight">
                  Venue asset registry, real-time ticket logging, service history, and statutory gas/safety certificates.
                </p>
                <Link
                  href="/portal-demo/requests/new"
                  className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 text-[10px] mt-1"
                >
                  Log Fault Ticket &rarr;
                </Link>
              </div>

              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-200 block">3. Operations Desk</span>
                <p className="text-slate-400 text-[10px] leading-tight">
                  Triage incoming tickets, assign Gas Safe engineers, update status, and sign off compliance reports.
                </p>
                <Link
                  href="/admin-demo/requests"
                  className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 text-[10px] mt-1"
                >
                  Work Order Queue &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export function DemoSwitcherDock() {
  return (
    <Suspense fallback={null}>
      <DemoSwitcherContent />
    </Suspense>
  );
}
