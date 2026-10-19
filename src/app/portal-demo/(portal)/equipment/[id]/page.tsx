'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Server,
  ArrowLeft,
  PlusCircle,
  Wrench,
  Clock,
  CalendarCheck,
  FileCheck2,
  ShieldCheck,
  Flame,
  Snowflake,
  Zap,
  ChevronRight,
  Info,
} from 'lucide-react';

function EquipmentDetailContent() {
  const params = useParams();
  const { getEquipmentById, requests, history, reports } = useFieldline();

  const id = typeof params.id === 'string' ? params.id : '';
  const equipment = getEquipmentById(id);

  if (!equipment) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
        <Server className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Equipment Asset Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested equipment ID &quot;{id}&quot; does not exist in the active venue register.
        </p>
        <Button href="/portal-demo/equipment" variant="primary" size="md">
          Back to Equipment Register
        </Button>
      </div>
    );
  }

  // Linked open and closed requests
  const linkedRequests = requests.filter((r) => r.equipmentId === equipment.id);
  const openRequests = linkedRequests.filter(
    (r) => r.status !== 'completed' && r.status !== 'cancelled'
  );

  // Linked service history
  const linkedHistory = history.filter((h) => h.equipmentId === equipment.id);

  // Linked compliance reports
  const linkedReports = reports.filter((rep) => rep.equipmentId === equipment.id);

  return (
    <div className="space-y-8">
      {/* Navigation Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/portal-demo/equipment"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Equipment Register</span>
        </Link>

        <Button
          href={`/portal-demo/requests/new?equipmentId=${equipment.id}`}
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          className="shrink-0 font-semibold"
        >
          Log Service Request for this Unit
        </Button>
      </div>

      {/* Main Asset Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Server className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {equipment.name}
                </h1>
                <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {equipment.assetTag}
                </span>
                <Badge
                  variant={
                    equipment.status === 'operational'
                      ? 'success'
                      : equipment.status === 'degraded'
                      ? 'warning'
                      : 'info'
                  }
                  size="sm"
                >
                  {equipment.status.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                {equipment.brand} • Model: <strong className="text-slate-700">{equipment.model}</strong> • Serial Number: <span className="font-mono">{equipment.serialNumber}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Specifications & Location Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-slate-400 block text-[11px]">Location in Kitchen:</span>
            <span className="font-bold text-slate-800 text-sm">{equipment.location}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-slate-400 block text-[11px]">Installation Date:</span>
            <span className="font-bold text-slate-800 text-sm">
              {new Date(equipment.installationDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-slate-400 block text-[11px]">Warranty Expiry:</span>
            <span className="font-bold text-slate-800 text-sm">
              {new Date(equipment.warrantyExpiry).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-slate-400 block text-[11px]">Next PPM Milestone:</span>
            <span className="font-bold text-amber-700 text-sm">
              {new Date(equipment.nextPpmDueDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Technical Engineering Specifications */}
        <div className="space-y-2 pt-2">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
            Technical Engineering Specifications
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono">
            {equipment.specifications}
          </p>
        </div>

        {/* Engineer Notes */}
        {equipment.notes && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Assigned Engineer Notes:</span>
              <p className="mt-0.5 text-amber-800">{equipment.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Linked Open Service Requests */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Active Callouts on this Unit ({openRequests.length})
            </h3>
            <p className="text-xs text-slate-500">
              Live breakdown tickets and scheduled maintenance visits
            </p>
          </div>
          <Wrench className="w-5 h-5 text-slate-400" />
        </div>

        {openRequests.length === 0 ? (
          <p className="text-xs text-slate-500 py-3">
            No active faults reported for this equipment. All operations normal.
          </p>
        ) : (
          <div className="space-y-3">
            {openRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{req.ticketNumber}</span>
                    <Badge variant={req.priority === 'emergency' ? 'danger' : 'amber'} size="sm">
                      {req.priority}
                    </Badge>
                    <Badge variant="info" size="sm">{req.status}</Badge>
                  </div>
                  <p className="font-semibold text-slate-800">{req.title}</p>
                </div>
                <Button
                  href={`/portal-demo/requests/${req.id}`}
                  variant="outline"
                  size="sm"
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  View Ticket
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Linked Historical Attendances & Compliance Reports */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Service History &amp; Inspection Reports ({linkedHistory.length})
            </h3>
            <p className="text-xs text-slate-500">
              Verified records of past visits, parts replaced, and certificates
            </p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>

        {linkedHistory.length === 0 ? (
          <p className="text-xs text-slate-500 py-3">
            No historical service records logged yet for this asset.
          </p>
        ) : (
          <div className="space-y-3">
            {linkedHistory.map((hist) => (
              <div
                key={hist.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{hist.serviceType}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{hist.engineerName}</span>
                  </div>
                  <span className="font-mono text-slate-500">
                    {new Date(hist.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed">{hist.workPerformed}</p>

                {hist.partsReplaced.length > 0 && (
                  <div className="text-[11px] text-slate-500">
                    <strong>Parts Replaced:</strong> {hist.partsReplaced.join(', ')}
                  </div>
                )}

                {hist.reportId && (
                  <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                    <Link
                      href={`/portal-demo/reports#${hist.reportId}`}
                      className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>View Inspection Certificate &rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EquipmentDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading asset dossier...</div>}>
      <EquipmentDetailContent />
    </Suspense>
  );
}
