'use client';

import React from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Wrench,
  Server,
  Building2,
  CalendarCheck,
  FileCheck2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Radio,
  Sparkles,
  HardHat,
  Inbox,
  UserCheck,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { requests, equipment, sites, reports, getCustomerSite } = useFieldline();

  // Metric derivations
  const awaitingReview = requests.filter(
    (r) => r.status === 'submitted' || r.status === 'under_review'
  );
  const scheduledJobs = requests.filter((r) => r.status === 'scheduled');
  const inProgressJobs = requests.filter(
    (r) => r.status === 'in_progress' || r.status === 'engineer_dispatched'
  );
  const completedJobs = requests.filter((r) => r.status === 'completed');

  // Work requiring attention (unreviewed or high priority)
  const actionRequiredRequests = requests
    .filter(
      (r) =>
        r.status === 'submitted' ||
        r.status === 'under_review' ||
        r.priority === 'emergency' ||
        r.priority === 'high'
    )
    .slice(0, 5);

  // Upcoming maintenance across all client venues
  const upcomingPpm = [...equipment]
    .sort((a, b) => new Date(a.nextPpmDueDate).getTime() - new Date(b.nextPpmDueDate).getTime())
    .slice(0, 4);

  // Aggregate recent activity across all requests
  const recentActivities = requests
    .flatMap((r) =>
      r.activities.map((a) => ({
        ...a,
        ticketNumber: r.ticketNumber,
        requestId: r.id,
        equipmentName: r.equipmentName,
        siteId: r.siteId,
      }))
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
      case 'engineer_dispatched':
        return <Badge variant="amber" size="sm">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="info" size="sm">Scheduled</Badge>;
      case 'submitted':
        return <Badge variant="warning" size="sm">New Intake</Badge>;
      case 'under_review':
        return <Badge variant="warning" size="sm">Under Triage</Badge>;
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Operations Command Header */}
      <div className="bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              FIELDLINE OPERATIONS COMMAND CENTER
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Service Coordinator Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Dispatch &amp; Commercial Work Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Centralized control across <strong>{sites.length} client venues</strong>, <strong>{equipment.length} commercial kitchen assets</strong>, and <strong>{requests.length} total work orders</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
          <Button
            href="/admin-demo/requests"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shadow-md font-semibold"
          >
            Open Work Order Queue
          </Button>
          <Button
            href="/portal-demo/dashboard"
            variant="outline"
            size="md"
            className="bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            Switch to Client Portal
          </Button>
        </div>
      </div>

      {/* KPI Metrics Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Triage Queue"
          value={awaitingReview.length}
          subtext={awaitingReview.length > 0 ? 'Requires coordinator review' : 'Queue fully processed'}
          icon={<Inbox className="w-4 h-4 text-amber-600" />}
          trend={
            awaitingReview.length > 0
              ? { value: `${awaitingReview.length} pending`, isPositive: false }
              : { value: 'Zero backlog', isPositive: true }
          }
        />
        <StatCard
          label="Active Dispatches"
          value={inProgressJobs.length}
          subtext={`${scheduledJobs.length} scheduled for attendance`}
          icon={<Wrench className="w-4 h-4 text-blue-600" />}
        />
        <StatCard
          label="Completed Jobs"
          value={completedJobs.length}
          subtext="Signed-off & compliance certified"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
        />
        <StatCard
          label="Estate Equipment"
          value={equipment.length}
          subtext={`${equipment.filter((e) => e.status === 'operational').length} operating normally`}
          icon={<Server className="w-4 h-4 text-slate-600" />}
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Work Requiring Immediate Attention */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Work Orders Requiring Action
              </h2>
              <p className="text-xs text-slate-500">
                New intake tickets awaiting triage, technician assignment, or parts dispatch
              </p>
            </div>
            <Link
              href="/admin-demo/requests"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              <span>View full queue ({requests.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {actionRequiredRequests.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500">
                No tickets currently require immediate triage. All jobs allocated.
              </div>
            ) : (
              actionRequiredRequests.map((req) => {
                const site = getCustomerSite(req.siteId);
                return (
                  <div
                    key={req.id}
                    className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {req.ticketNumber}
                        </span>
                        <Badge
                          variant={req.priority === 'emergency' ? 'danger' : req.priority === 'high' ? 'warning' : 'default'}
                          size="sm"
                        >
                          {req.priority.replace('_', ' ')}
                        </Badge>
                        {getStatusBadge(req.status)}
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
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {req.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Client: <strong className="text-slate-700">{site?.name || 'Customer'}</strong> • Asset: {req.equipmentName}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">
                        Reporter: {req.reportedBy} ({req.contactPhone})
                      </span>
                      <Button
                        href={`/admin-demo/requests/${req.id}`}
                        variant="secondary"
                        size="sm"
                        rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Triage &amp; Update
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Upcoming Maintenance Schedule & Fast Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Maintenance Across All Venues */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Upcoming PPM Obligations
                </h3>
                <p className="text-xs text-slate-500">
                  Scheduled preventative visits across contracted sites
                </p>
              </div>
              <CalendarCheck className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-3 pt-1">
              {upcomingPpm.map((eq) => {
                const site = getCustomerSite(eq.siteId);
                return (
                  <div
                    key={eq.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 truncate max-w-[170px]">
                        {eq.name}
                      </span>
                      <span className="font-mono text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {new Date(eq.nextPpmDueDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{site?.name || eq.location}</span>
                      <span className="text-slate-400 font-mono">{eq.assetTag}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/admin-demo/schedule"
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
              >
                <span>View complete maintenance calendar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Operations Actions */}
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Operations Quick Links
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/admin-demo/requests"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <Wrench className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">All Requests</span>
                <span className="text-[10px] text-slate-400">{requests.length} work orders</span>
              </Link>
              <Link
                href="/admin-demo/customers"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <Building2 className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">Client Directory</span>
                <span className="text-[10px] text-slate-400">{sites.length} contracted sites</span>
              </Link>
              <Link
                href="/admin-demo/equipment"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <Server className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">Equipment Fleet</span>
                <span className="text-[10px] text-slate-400">{equipment.length} assets tracked</span>
              </Link>
              <Link
                href="/admin-demo/reports"
                className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors block text-left"
              >
                <FileCheck2 className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-semibold block">Certificates</span>
                <span className="text-[10px] text-slate-400">{reports.length} compliance files</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Venue Live Activity Feed */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Live Operations Audit Trail
            </h3>
            <p className="text-xs text-slate-500">
              Real-time synchronization across client portal actions and staff dispatch milestones
            </p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>

        <div className="space-y-4 pt-2">
          {recentActivities.map((act, idx) => {
            const site = getCustomerSite(act.siteId);
            return (
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
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 font-medium">{site?.name || 'Client'}</span>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
