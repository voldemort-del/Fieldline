'use client';

import React from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Server,
  Wrench,
  Clock,
  CalendarCheck,
  FileCheck2,
  PlusCircle,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function PortalDashboardPage() {
  const { activeSite, getSiteEquipment, getSiteRequests, getSiteHistory, getSiteReports } =
    useFieldline();

  const siteEquipment = getSiteEquipment();
  const siteRequests = getSiteRequests();
  const siteHistory = getSiteHistory();
  const siteReports = getSiteReports();

  const openRequests = siteRequests.filter(
    (r) => r.status !== 'completed' && r.status !== 'cancelled'
  );
  const completedRequests = siteRequests.filter((r) => r.status === 'completed');

  // Sorted upcoming maintenance
  const upcomingMaintenance = [...siteEquipment]
    .sort((a, b) => new Date(a.nextPpmDueDate).getTime() - new Date(b.nextPpmDueDate).getTime())
    .slice(0, 3);

  // Recent 3 requests
  const recentRequests = siteRequests.slice(0, 4);

  // Recent timeline events (aggregated from request activities)
  const recentActivities = siteRequests
    .flatMap((r) =>
      r.activities.map((a) => ({
        ...a,
        ticketNumber: r.ticketNumber,
        requestId: r.id,
        equipmentName: r.equipmentName,
      }))
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'amber' as const;
      case 'scheduled':
        return 'info' as const;
      case 'under_review':
      case 'submitted':
        return 'warning' as const;
      case 'completed':
        return 'success' as const;
      default:
        return 'default' as const;
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return 'danger' as const;
      case 'high':
        return 'warning' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Quick Action */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Customer Portal Dashboard
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-mono">{activeSite.accountNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeSite.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Logged in as <strong className="text-slate-800">{activeSite.contact.name}</strong> ({activeSite.contact.role}). Manage registered kitchen equipment, active repair tickets, and safety compliance records.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Button
            href="/portal-demo/requests/new"
            variant="primary"
            size="md"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="shadow-sm font-semibold"
          >
            Log Service Request
          </Button>
          <Button
            href="/portal-demo/equipment"
            variant="outline"
            size="md"
          >
            Browse Assets
          </Button>
        </div>
      </div>

      {/* KPI / Summary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Registered Equipment"
          value={siteEquipment.length}
          subtext={`${siteEquipment.filter((e) => e.status === 'operational').length} fully operational`}
          icon={<Server className="w-4 h-4 text-slate-600" />}
        />
        <StatCard
          label="Active Callouts"
          value={openRequests.length}
          subtext={openRequests.length > 0 ? 'Under review or in-flight' : 'Zero outstanding breakdowns'}
          icon={<Wrench className="w-4 h-4 text-amber-600" />}
          trend={
            openRequests.length > 0
              ? { value: `${openRequests.length} pending`, isPositive: false }
              : { value: 'All clear', isPositive: true }
          }
        />
        <StatCard
          label="Next PPM Due"
          value={upcomingMaintenance[0] ? new Date(upcomingMaintenance[0].nextPpmDueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'None'}
          subtext={upcomingMaintenance[0] ? upcomingMaintenance[0].name.split(' ')[0] + ' ' + (upcomingMaintenance[0].name.split(' ')[1] || '') : 'Scheduled'}
          icon={<CalendarCheck className="w-4 h-4 text-blue-600" />}
        />
        <StatCard
          label="Compliance Records"
          value={siteReports.length}
          subtext="Valid Gas & Safety Reports"
          icon={<FileCheck2 className="w-4 h-4 text-emerald-600" />}
        />
      </div>

      {/* Main Two-Column Layout: Recent Requests + Upcoming Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Recent Service Requests */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Recent Service Requests
              </h2>
              <p className="text-xs text-slate-500">
                Active breakdown reports and maintenance calls
              </p>
            </div>
            <Link
              href="/portal-demo/requests"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              <span>View all ({siteRequests.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentRequests.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
                No service requests logged for this venue yet.
              </div>
            ) : (
              recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl p-4 sm:p-5 shadow-xs transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {req.ticketNumber}
                      </span>
                      <Badge variant={getPriorityBadgeVariant(req.priority)} size="sm">
                        {req.priority.replace('_', ' ')}
                      </Badge>
                      <Badge variant={getStatusBadgeVariant(req.status)} size="sm">
                        {req.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                      {req.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{req.equipmentName}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">
                      {req.assignedEngineer ? req.assignedEngineer.name : 'Service Desk Assigned'}
                    </span>
                    <Link
                      href={`/portal-demo/requests/${req.id}`}
                      className="font-medium text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                    >
                      <span>Inspect ticket</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Upcoming Maintenance & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Maintenance Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Upcoming Maintenance
                </h3>
                <p className="text-xs text-slate-500">
                  Scheduled PPM and statutory inspection milestones
                </p>
              </div>
              <CalendarCheck className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-3 pt-1">
              {upcomingMaintenance.map((asset) => (
                <div
                  key={asset.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{asset.name}</span>
                    <span className="font-mono text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      {new Date(asset.nextPpmDueDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{asset.location}</span>
                    <Link
                      href={`/portal-demo/equipment/${asset.id}`}
                      className="text-slate-600 hover:text-amber-600 underline underline-offset-2"
                    >
                      Asset details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Navigation Card */}
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Quick Navigation
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <h4 className="font-bold text-base text-white">
              Customer Operations Tools
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/portal-demo/requests/new"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <PlusCircle className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">Log Breakdown</span>
                <span className="text-[10px] text-slate-400">Under 60 seconds</span>
              </Link>
              <Link
                href="/portal-demo/equipment"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <Server className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">Equipment</span>
                <span className="text-[10px] text-slate-400">{siteEquipment.length} units</span>
              </Link>
              <Link
                href="/portal-demo/history"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <Clock className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">Service History</span>
                <span className="text-[10px] text-slate-400">Past visits log</span>
              </Link>
              <Link
                href="/portal-demo/reports"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <FileCheck2 className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">Gas &amp; Safety</span>
                <span className="text-[10px] text-slate-400">CP42 Certificates</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Service Activity Timeline */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Service Activity &amp; Milestones
            </h3>
            <p className="text-xs text-slate-500">
              Live chronological log of engineer dispatches, status milestones, and sign-offs
            </p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>

        <div className="space-y-4 pt-2">
          {recentActivities.map((act, idx) => (
            <div key={act.id || idx} className="flex items-start gap-4 text-xs">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{act.title}</span>
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      {act.ticketNumber}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {new Date(act.timestamp).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {act.description}
                </p>
                <p className="text-[11px] text-slate-400">
                  Logged by: {act.actor} • Asset: {act.equipmentName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
