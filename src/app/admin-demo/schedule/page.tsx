'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Building2,
  Wrench,
  User,
  HardHat,
  Filter,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  type: 'callout' | 'ppm';
  date: string;
  timeSlot: string;
  title: string;
  siteName: string;
  siteId: string;
  equipmentName: string;
  equipmentId?: string;
  assetTag?: string;
  technicianName: string;
  priority?: string;
  status: string;
  requestId?: string;
}

export default function AdminSchedulePage() {
  const { equipment, requests, sites, technicians } = useFieldline();

  const [selectedSiteId, setSelectedSiteId] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const scheduleItems = useMemo(() => {
    const items: ScheduleItem[] = [];

    // 1. Add scheduled or in-progress requests
    requests.forEach((req) => {
      if (req.status === 'scheduled' || req.status === 'in_progress' || req.status === 'under_review') {
        const site = sites.find((s) => s.id === req.siteId);
        const eq = equipment.find((e) => e.id === req.equipmentId);

        // Derive date: if scheduled or in_progress, place today or upcoming
        const targetDate = req.status === 'in_progress'
          ? 'Today'
          : req.status === 'scheduled'
          ? 'Tomorrow (08:30 - 12:00)'
          : 'Pending Window Allocation';

        items.push({
          id: `sch-req-${req.id}`,
          type: 'callout',
          date: targetDate,
          timeSlot: req.requestedTiming === 'immediate_emergency' ? 'Priority 4h SLA Window' : 'Standard 09:00 - 13:00',
          title: req.title,
          siteName: site ? site.name : req.siteId,
          siteId: req.siteId,
          equipmentName: req.equipmentName,
          equipmentId: req.equipmentId,
          assetTag: eq?.assetTag,
          technicianName: req.assignedEngineer?.name || 'Mark Stevens',
          priority: req.priority,
          status: req.status,
          requestId: req.id,
        });
      }
    });

    // 2. Add upcoming PPMs from equipment records
    equipment.forEach((eq) => {
      const site = sites.find((s) => s.id === eq.siteId);
      items.push({
        id: `sch-ppm-${eq.id}`,
        type: 'ppm',
        date: eq.nextPpmDueDate,
        timeSlot: 'Full Day Maintenance Shift (08:00 - 16:30)',
        title: `Statutory PPM & Calibration Proving: ${eq.name}`,
        siteName: site ? site.name : eq.siteId,
        siteId: eq.siteId,
        equipmentName: eq.name,
        equipmentId: eq.id,
        assetTag: eq.assetTag,
        technicianName: 'Chris Vance',
        status: 'scheduled_ppm',
      });
    });

    // Sort items: Callouts first, then chronologically by date
    return items.sort((a, b) => {
      if (a.type === 'callout' && b.type !== 'callout') return -1;
      if (b.type === 'callout' && a.type !== 'callout') return 1;
      return a.date.localeCompare(b.date);
    });
  }, [requests, equipment, sites]);

  const filteredItems = scheduleItems.filter((item) => {
    if (selectedSiteId !== 'all' && item.siteId !== selectedSiteId) return false;
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Field Service & Maintenance Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Coordinated field technician dispatch itinerary, emergency callouts, and planned preventative maintenance dates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredItems.length} Scheduled Operations
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by Venue */}
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="py-2 px-3 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
            >
              <option value="all">All Contracted Sites</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>

            {/* Filter by Event Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-2 px-3 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
            >
              <option value="all">All Service Types</option>
              <option value="callout">Emergency & Remedial Callouts</option>
              <option value="ppm">Planned Preventative Maintenance (PPM)</option>
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Showing <strong>{filteredItems.length}</strong> events
          </div>
        </div>
      </div>

      {/* Chronological List of Scheduled Operations */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-xs transition-all hover:border-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              item.type === 'callout' && item.priority === 'emergency'
                ? 'border-rose-200 ring-1 ring-rose-100'
                : 'border-slate-200'
            }`}
          >
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-navy-950 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  {item.assetTag || 'FIELD-OPS'}
                </span>

                <Badge
                  variant={
                    item.type === 'callout'
                      ? item.priority === 'emergency'
                        ? 'danger'
                        : 'amber'
                      : 'default'
                  }
                  size="sm"
                >
                  {item.type === 'callout' ? 'Callout Dispatch' : 'Scheduled PPM'}
                </Badge>

                <span className="text-xs font-semibold text-slate-500">
                  {item.status.replace(/_/g, ' ')}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-navy-950">
                {item.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-navy-700 shrink-0" />
                  <span>{item.siteName}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <HardHat className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Lead: {item.technicianName}</span>
                </div>
              </div>
            </div>

            {/* Date & Action */}
            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-left md:text-right space-y-0.5">
                <div className="text-xs font-extrabold text-navy-950 flex items-center md:justify-end gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-navy-700" />
                  <span>{item.date}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center md:justify-end gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{item.timeSlot}</span>
                </div>
              </div>

              {item.requestId ? (
                <Link
                  href={`/admin-demo/requests/${item.requestId}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-lg shadow-2xs transition-colors"
                >
                  <span>Review Work Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href="/admin-demo/equipment"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <span>Inspect Asset</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
