'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Search,
  Server,
  FileCheck2,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Wrench,
  CheckCircle2,
} from 'lucide-react';

export default function ServiceHistoryPage() {
  const { activeSite, getSiteHistory, getSiteEquipment } = useFieldline();
  const [searchQuery, setSearchQuery] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');

  const siteHistory = getSiteHistory();
  const siteEquipment = getSiteEquipment();

  // Search & Filter
  const filteredHistory = siteHistory.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.engineerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.workPerformed.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEquipment =
      equipmentFilter === 'all' || item.equipmentId === equipmentFilter;

    return matchesSearch && matchesEquipment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
            <span>Historical Service Log</span>
            <span>•</span>
            <span className="text-slate-500">{activeSite.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Service History Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological audit trail of past engineer visits, component replacements, routine descaling, and gas tightness inspections.
          </p>
        </div>

        <Button
          href="/portal-demo/requests/new"
          variant="primary"
          size="md"
          className="shrink-0 font-semibold"
        >
          Book New Maintenance
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search historical attendances by engineer, work performed, or parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="md:col-span-4">
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Equipment ({siteEquipment.length})</option>
              {siteEquipment.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchQuery || equipmentFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {filteredHistory.length} of {siteHistory.length} historical entries
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setEquipmentFilter('all');
              }}
              className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* History Timeline Cards */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <Clock className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            No historical records found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No service history matched your query.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-6 shadow-xs transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                    {new Date(item.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <Badge variant="amber" size="sm">
                    {item.serviceType}
                  </Badge>
                </div>

                <div className="text-xs text-slate-500">
                  Technician: <strong className="text-slate-800">{item.engineerName}</strong>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.summary}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {item.workPerformed}
                </p>
              </div>

              {/* Parts & Cost Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Asset Serviced:</span>
                  <Link
                    href={`/portal-demo/equipment/${item.equipmentId}`}
                    className="font-semibold text-slate-800 hover:text-amber-600 inline-flex items-center gap-1"
                  >
                    <Server className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.equipmentName}</span>
                  </Link>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Components Replaced:</span>
                  <span className="font-medium text-slate-700">
                    {item.partsReplaced.length > 0 ? item.partsReplaced.join(', ') : 'None (Diagnostic Proving Only)'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Commercial Invoice Terms:</span>
                  <span className="font-medium text-slate-700">{item.costSummary}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <div className="text-slate-400 text-[11px]">
                  {item.requestId && (
                    <span>Linked Work Order: <strong>{item.requestId}</strong></span>
                  )}
                </div>

                {item.reportId && (
                  <Link
                    href={`/portal-demo/reports#${item.reportId}`}
                    className="font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Inspect Compliance Certificate</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
