'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Search,
  Phone,
  Mail,
  User,
  MapPin,
  ShieldCheck,
  Wrench,
  FileCheck2,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function AdminCustomersPage() {
  const { sites, equipment, requests, reports, setActiveSiteId } = useFieldline();
  const [searchQuery, setSearchQuery] = useState('');
  const [switchedVenueFeedback, setSwitchedVenueFeedback] = useState<string | null>(null);

  const filteredSites = sites.filter((site) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      site.name.toLowerCase().includes(q) ||
      site.accountNumber.toLowerCase().includes(q) ||
      site.address.city.toLowerCase().includes(q) ||
      site.contact.name.toLowerCase().includes(q)
    );
  });

  const handleSimulatePortalView = (siteId: string, siteName: string) => {
    setActiveSiteId(siteId);
    setSwitchedVenueFeedback(`Active customer portal switched to ${siteName}.`);
    setTimeout(() => {
      setSwitchedVenueFeedback(null);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Commercial Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Contracted hospitality venues, multi-site accounts, primary emergency contacts, and active maintenance SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {sites.length} Contracted Accounts
          </span>
        </div>
      </div>

      {/* Temporary Switch Banner */}
      {switchedVenueFeedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{switchedVenueFeedback}</span>
          </div>
          <Link
            href="/portal-demo/dashboard"
            target="_blank"
            className="font-bold underline text-emerald-950 hover:opacity-80"
          >
            Open Portal Dashboard &rarr;
          </Link>
        </div>
      )}

      {/* Search Input */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venue name, account number, or contact..."
            className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
          />
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredSites.map((site) => {
          const siteEquipment = equipment.filter((eq) => eq.siteId === site.id);
          const siteRequests = requests.filter((req) => req.siteId === site.id);
          const activeRequests = siteRequests.filter(
            (r) => r.status !== 'completed' && r.status !== 'cancelled'
          );
          const siteReports = reports.filter((rep) => rep.siteId === site.id);

          return (
            <div
              key={site.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-slate-300 transition-all space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-navy-950 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {site.accountNumber}
                    </span>
                    <Badge variant="default" size="sm">
                      {site.contractTier.replace(/_/g, ' ')}
                    </Badge>
                    <span className="text-xs text-slate-500 capitalize">
                      {site.industry.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-navy-950 tracking-tight">
                    {site.name}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {site.address.line1}, {site.address.city} {site.address.postcode}
                    </span>
                  </div>
                </div>

                {/* KPI stats for this customer */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 shrink-0 text-center">
                  <div className="px-2">
                    <div className="text-lg font-black text-navy-950">
                      {siteEquipment.length}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Assets
                    </div>
                  </div>
                  <div className="px-2 border-x border-slate-200">
                    <div className="text-lg font-black text-amber-600">
                      {activeRequests.length}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Active
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-lg font-black text-emerald-700">
                      {siteReports.length}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Signed
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content: Key Contacts & Contract Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-navy-700" />
                    Key Kitchen & Operations Contact
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-navy-950 text-sm">
                      {site.contact.name}
                    </div>
                    <div className="text-slate-500">Role: {site.contact.role}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{site.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{site.contact.email}</span>
                    </div>
                  </div>
                </div>

                {/* Service Level Agreement */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-navy-700" />
                    Contract Terms & Emergency SLA
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {site.contractTier === 'comprehensive_plus'
                      ? 'Comprehensive Plus Tier: Guaranteed 4-hour breakdown callout response for critical refrigeration and prime cooking equipment. Full bi-annual PPM servicing included.'
                      : 'Preventative Core Tier: Scheduled quarterly preventative maintenance servicing with priority standard dispatch within 24 hours.'}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-xs flex items-center justify-between text-slate-500">
                    <span>Emergency Cover: 24/7/365</span>
                    <span className="font-semibold text-navy-800">Fieldline Premium Partner</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin-demo/requests`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Wrench className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Work Orders ({siteRequests.length})</span>
                  </Link>
                  <Link
                    href={`/admin-demo/equipment`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <span>Inspect Assets ({siteEquipment.length})</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSimulatePortalView(site.id, site.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-navy-800 bg-navy-50 hover:bg-navy-100 rounded-lg border border-navy-200 transition-colors"
                    title="Switch the customer portal active account to this customer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-navy-700" />
                    <span>Set Active in Portal</span>
                  </button>
                  <Link
                    href="/portal-demo/dashboard"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-lg shadow-2xs transition-colors"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
