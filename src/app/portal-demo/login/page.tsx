'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { BrandLogo } from '@/components/marketing/brand-logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function PortalLoginPage() {
  const router = useRouter();
  const { sites, activeSite, setActiveSiteId } = useFieldline();
  const [selectedSiteId, setSelectedSiteId] = useState(activeSite.id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setActiveSiteId(selectedSiteId);

    // Artificial smooth transition
    setTimeout(() => {
      router.push('/portal-demo/dashboard');
    }, 400);
  };

  const selectedSite = sites.find((s) => s.id === selectedSiteId) || sites[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <BrandLogo variant="light" size="sm" withLink={false} />
        <Link
          href="/portal-demo"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>Return to Portal Intro</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Client Portal Demo Sign-In
          </h1>
          <p className="text-xs text-slate-400">
            Select a fictional customer venue to initiate your simulated session. No real passwords or accounts required.
          </p>
        </div>

        {/* Persona Picker */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Demo Customer Account
            </label>
            <div className="space-y-2">
              {sites.map((site) => {
                const isSelected = site.id === selectedSiteId;
                return (
                  <div
                    key={site.id}
                    onClick={() => setSelectedSiteId(site.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/80 text-white shadow-xs'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">{site.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                          {site.accountNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {site.contact.name} • {site.contact.role}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fictional Pre-filled Credentials Preview */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5 text-xs">
            <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block">
              Simulated Session Context
            </span>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Authorized User:</span>
              <span className="font-medium text-slate-200">{selectedSite.contact.name}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Service SLA:</span>
              <span className="capitalize text-amber-400 font-medium">
                {selectedSite.contractTier.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full justify-center shadow-md font-semibold"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Enter Portal as {selectedSite.name.split(' ')[1] || 'Client'}
          </Button>
        </form>

        {/* Security Simulation Notice */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-2.5 text-[11px] text-slate-400 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">Demonstration Security:</strong> All session data is simulated in your browser. Real production authentication can be integrated with Supabase Auth or OAuth.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500">
        &copy; 2026 Fieldline Kitchen Services • Portfolio Demonstration
      </div>
    </div>
  );
}
