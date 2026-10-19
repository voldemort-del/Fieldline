'use client';

import React from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { BrandLogo } from '@/components/marketing/brand-logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Server,
  Wrench,
  CalendarCheck,
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  ExternalLink,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export default function PortalIntroPage() {
  const { setActiveSiteId, sites } = useFieldline();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo variant="light" size="md" withLink={false} />
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Back to Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Hero & Entry Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Customer Portal Demonstration</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Commercial Kitchen Asset Management,{' '}
            <span className="text-amber-500">Digitised.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Experience our self-service portal designed for commercial kitchen directors, head chefs, and facilities managers. Explore registered equipment, log service requests, inspect work orders, and view statutory compliance reports.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href="/portal-demo/dashboard"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto shadow-lg shadow-amber-500/10"
            >
              Enter Demo Portal as Grandview Hotel
            </Button>
            <Button
              href="/portal-demo/login"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
            >
              Select Demonstration Venue
            </Button>
          </div>

          <p className="text-xs text-slate-500">
            No real account or credentials required • Interactive browser-based simulation
          </p>
        </div>

        {/* 1-Click Persona Quick Launch Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-white text-lg">
                Choose a Pre-Configured Customer Persona
              </h3>
              <p className="text-xs text-slate-400">
                Click any venue to enter the portal pre-seeded with that company&apos;s equipment and service records.
              </p>
            </div>
            <span className="text-xs text-amber-400 font-mono">1-Click Launch</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sites.map((site) => (
              <div
                key={site.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/60 rounded-xl p-5 space-y-4 flex flex-col justify-between transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      {site.accountNumber}
                    </span>
                    <Badge variant="amber" size="sm">
                      {site.industry.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                      {site.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {site.address.city} • {site.totalAssetsCount} Assets Tracked
                    </p>
                  </div>
                  <div className="text-xs text-slate-500 border-t border-slate-900 pt-2">
                    Contact: {site.contact.name} ({site.contact.role})
                  </div>
                </div>

                <Link
                  href="/portal-demo/dashboard"
                  onClick={() => setActiveSiteId(site.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-amber-600 text-slate-200 hover:text-slate-950 font-semibold text-xs transition-colors"
                >
                  <span>Launch as {site.name.split(' ')[1] || 'Site'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-400">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <Server className="w-5 h-5 text-amber-500" />
            <h4 className="font-bold text-white text-sm">Asset Register</h4>
            <p>Indexed commercial catering equipment with serial numbers, locations, and condition status.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <Wrench className="w-5 h-5 text-amber-500" />
            <h4 className="font-bold text-white text-sm">Service Requests</h4>
            <p>Interactive ticket logging with real-time status milestones from triage to resolution.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h4 className="font-bold text-white text-sm">Service History</h4>
            <p>Chronological audit log of all completed engineer attendances and replacement parts.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <FileCheck2 className="w-5 h-5 text-amber-500" />
            <h4 className="font-bold text-white text-sm">Compliance Vault</h4>
            <p>Digital commercial gas safety (CP42) and healthcare thermal disinfection certificates with print layouts.</p>
          </div>
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="border-t border-slate-800/80 px-4 sm:px-8 py-6 text-center text-xs text-slate-500">
        Fieldline Commercial Kitchen Equipment Servicing • Portfolio Application Demonstration • All data fictional
      </footer>
    </div>
  );
}
