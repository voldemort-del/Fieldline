import React from 'react';
import Link from 'next/link';
import { SAMPLE_EQUIPMENT_RECORDS, SAMPLE_SERVICE_REQUESTS } from '@/lib/mock-data/sample-assets';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Server,
  Wrench,
  Calendar,
  FileCheck,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Flame,
  Snowflake,
  Sparkles,
} from 'lucide-react';

export function PortalPreviewSection() {
  const previewAssets = SAMPLE_EQUIPMENT_RECORDS.slice(0, 3);
  const previewRequests = SAMPLE_SERVICE_REQUESTS.slice(0, 2);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden relative">
      {/* Decorative background grid subtle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Header bar of the portal mockup */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Software Preview</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            The Fieldline Customer Portal
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            A dedicated operational interface for head chefs, facility managers, and catering directors to monitor appliances, log service tickets, and inspect compliance certificates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            href="/portal-demo"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Launch Interactive Demo
          </Button>
        </div>
      </div>

      {/* Simulated Portal Desktop Interface */}
      <div className="relative z-10 mt-8 space-y-6">
        {/* Mock Topbar with Venue Selector */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-500">Active Venue Account:</span>
            <span className="font-semibold text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
              The Grandview Hotel &amp; Spa (Main Production Kitchen)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              18 Assets Registered
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <Wrench className="w-3.5 h-3.5" />
              2 Active Tickets
            </span>
          </div>
        </div>

        {/* Mock Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Equipment
            </span>
            <div className="text-2xl font-bold text-white mt-1">18 Units</div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              16 Fully Operational
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Active Callouts
            </span>
            <div className="text-2xl font-bold text-amber-400 mt-1">2 Pending</div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              1 Dispatched • 1 Parts Order
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Next Statutory PPM
            </span>
            <div className="text-2xl font-bold text-white mt-1">28 Oct 2026</div>
            <span className="text-[11px] text-blue-400 mt-1 block">
              Foster Coldroom Check
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Compliance Archive
            </span>
            <div className="text-2xl font-bold text-white mt-1">14 Certificates</div>
            <span className="text-[11px] text-emerald-400 mt-1 block">
              CP42 Commercial Gas Valid
            </span>
          </div>
        </div>

        {/* Mock Asset & Service Queue Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Equipment Register snippet */}
          <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-500" />
                Equipment Register Preview
              </h4>
              <Link
                href="/portal-demo"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
              >
                View all in demo &rarr;
              </Link>
            </div>

            <div className="space-y-2.5">
              {previewAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{asset.name}</span>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {asset.assetTag}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {asset.location} • Last serviced: {asset.lastService}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
                      asset.status === 'operational'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {asset.status === 'operational' ? 'Operational' : 'Attention'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Callouts snippet */}
          <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-500" />
                Live Service Callouts
              </h4>
              <Badge variant="amber" size="sm">
                2 Open
              </Badge>
            </div>

            <div className="space-y-2.5">
              {previewRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-amber-400 font-semibold text-[11px]">
                      {req.ticketNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">{req.createdAt}</span>
                  </div>
                  <p className="text-slate-200 font-medium text-[11px] leading-tight">
                    {req.title}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <span>{req.assignedEngineer}</span>
                    <span className="text-blue-400 font-semibold uppercase">
                      {req.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demonstration Disclaimer Bar */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Stage 1 architectural preview. The full interactive customer portal experience is planned for Stage 2.
            </span>
          </div>
          <Link
            href="/portal-demo"
            className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 shrink-0"
          >
            Explore Prototype Entry &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
