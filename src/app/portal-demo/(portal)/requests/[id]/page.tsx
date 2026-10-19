'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatGbp } from '@/lib/utils';
import {
  Wrench,
  ArrowLeft,
  Server,
  Clock,
  User,
  Phone,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldAlert,
  Receipt,
  ArrowRight,
  Check,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

function RequestDetailContent() {
  const params = useParams();
  const { getRequestById, getEquipmentById, getReportById, getQuotesByRequest } = useFieldline();

  const id = typeof params.id === 'string' ? params.id : '';
  const request = getRequestById(id);

  if (!request) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
        <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Service Request Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested ticket reference &quot;{id}&quot; does not exist.
        </p>
        <Button href="/portal-demo/requests" variant="primary" size="md">
          Back to Service Requests Hub
        </Button>
      </div>
    );
  }

  const equipment = getEquipmentById(request.equipmentId);
  const linkedReport = request.linkedReportId ? getReportById(request.linkedReportId) : undefined;

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/portal-demo/requests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Service Requests Hub</span>
        </Link>

        <span className="text-xs font-mono text-slate-500">
          ID: {request.id}
        </span>
      </div>

      {/* Main Request Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                {request.ticketNumber}
              </span>
              <Badge
                variant={
                  request.priority === 'emergency'
                    ? 'danger'
                    : request.priority === 'high'
                    ? 'warning'
                    : 'default'
                }
                size="sm"
              >
                {request.priority.replace('_', ' ')}
              </Badge>
              <Badge
                variant={
                  request.status === 'completed'
                    ? 'success'
                    : request.status === 'in_progress'
                    ? 'amber'
                    : 'info'
                }
                size="sm"
              >
                {request.status.replace('_', ' ')}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {request.title}
            </h1>
            <p className="text-xs text-slate-500">
              Submitted {new Date(request.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })} by <strong className="text-slate-700">{request.reportedBy}</strong>
            </p>
          </div>

          {request.status !== 'completed' && (
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 space-y-1 shrink-0">
              <span className="font-bold block">Assigned Engineer:</span>
              <p className="font-semibold text-slate-900">
                {request.assignedEngineer ? request.assignedEngineer.name : 'Triage Queue'}
              </p>
              {request.assignedEngineer?.eta && (
                <p className="text-[11px] text-amber-800">
                  Target ETA: {request.assignedEngineer.eta}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Problem Description */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
            Fault Report &amp; Symptoms
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {request.description}
          </p>
        </div>

        {/* Resolution Notes (if completed) */}
        {request.resolutionNotes && (
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-700">
              Engineer Resolution Summary
            </h3>
            <p className="text-sm text-slate-800 leading-relaxed bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              {request.resolutionNotes}
            </p>
          </div>
        )}

        {/* Associated Equipment Card */}
        <div className="space-y-2 pt-2">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
            Associated Kitchen Asset
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900">{request.equipmentName}</span>
                <p className="text-[11px] text-slate-500">
                  {equipment ? `Model: ${equipment.model} • Location: ${equipment.location}` : 'Commercial Kitchen Asset'}
                </p>
              </div>
            </div>

            {equipment && (
              <Button
                href={`/portal-demo/equipment/${equipment.id}`}
                variant="outline"
                size="sm"
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
              >
                Inspect Asset Dossier
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Commercial Quotation & Scope Section */}
      {(() => {
        const linkedQuotes = getQuotesByRequest(request.id);
        const visibleQuote = linkedQuotes.find((q) => q.status !== 'draft');
        const hasDraftOnly = linkedQuotes.length > 0 && !visibleQuote;

        if (visibleQuote) {
          const isAwaiting = visibleQuote.status === 'awaiting_customer';
          const isApproved = visibleQuote.status === 'approved';
          const isDeclined = visibleQuote.status === 'declined';

          return (
            <div
              className={`rounded-2xl p-6 sm:p-7 border shadow-xs space-y-5 transition-all ${
                isAwaiting
                  ? 'bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 border-amber-300 ring-2 ring-amber-400/30'
                  : isApproved
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Receipt className={`w-5 h-5 ${isAwaiting ? 'text-amber-600 animate-bounce' : isApproved ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <h2 className="text-base font-bold text-slate-900">
                      Commercial Quotation & Scope
                    </h2>
                    <span className="font-mono text-xs font-bold text-slate-900 bg-white border border-slate-300 px-2 py-0.5 rounded shadow-2xs">
                      {visibleQuote.quoteNumber}
                    </span>
                    <Badge
                      variant={
                        isApproved
                          ? 'success'
                          : isAwaiting
                          ? 'amber'
                          : isDeclined
                          ? 'danger'
                          : 'default'
                      }
                      size="sm"
                    >
                      {visibleQuote.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">
                    {visibleQuote.title}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    href={`/portal-demo/quotes/${visibleQuote.id}`}
                    variant={isAwaiting ? 'primary' : 'outline'}
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isAwaiting ? 'Review & Authorize Scope' : 'View Quotation Details'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/80 border border-slate-200/70 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">Total Quotation Value</span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {formatGbp(visibleQuote.finalTotal)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">Line Items</span>
                  <span className="text-xs font-bold text-slate-800">
                    {visibleQuote.lineItems.length} item{visibleQuote.lineItems.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">Quotation Validity</span>
                  <span className="text-xs font-medium text-slate-700">
                    Valid until{' '}
                    {new Date(visibleQuote.expiryDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">Commercial Decision</span>
                  <span className="text-xs font-bold">
                    {isApproved ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : isDeclined ? (
                      <span className="text-rose-700 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Declined
                      </span>
                    ) : (
                      <span className="text-amber-700 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Action Required
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {isAwaiting && (
                <div className="p-3 bg-amber-500/10 border border-amber-300 rounded-xl text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>
                      Fieldline technical desk has provided this commercial scope. Please review parts, labour, and authorization terms.
                    </span>
                  </div>
                  <Link
                    href={`/portal-demo/quotes/${visibleQuote.id}`}
                    className="text-xs font-bold underline text-amber-900 hover:text-amber-700 shrink-0"
                  >
                    Open Authorization Screen &rarr;
                  </Link>
                </div>
              )}

              {isApproved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Demonstration approval recorded on{' '}
                    <strong>
                      {visibleQuote.customerDecisionDate
                        ? new Date(visibleQuote.customerDecisionDate).toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'record'}
                    </strong>
                    . Fieldline engineering team has been notified to proceed.
                  </span>
                </div>
              )}

              {isDeclined && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>You declined this quotation</span>
                  </div>
                  {visibleQuote.declineReason && (
                    <p className="text-[11px] text-rose-800 pl-6">
                      Feedback: &ldquo;{visibleQuote.declineReason}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        }

        if (hasDraftOnly) {
          return (
            <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-slate-400" />
                <span>
                  Our technical operations desk is currently compiling a formal commercial quotation for this work order.
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
                Staff Scoping in Progress
              </span>
            </div>
          );
        }

        return null;
      })()}

      {/* Activity Milestones Timeline */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Work Order Activity Timeline
            </h2>
            <p className="text-xs text-slate-500">
              Audit trail of ticket dispatch, status transitions, and resolution
            </p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>

        <div className="space-y-6 pl-2">
          {request.activities.map((act, idx) => (
            <div key={act.id || idx} className="relative flex items-start gap-4 text-xs">
              {/* Connector line */}
              {idx < request.activities.length - 1 && (
                <div className="absolute top-7 left-3.5 -bottom-6 w-0.5 bg-slate-200" />
              )}
              <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 font-bold z-10 shadow-xs text-[10px]">
                {idx + 1}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{act.title}</span>
                    <Badge variant="default" size="sm" className="capitalize">
                      {act.status.replace('_', ' ')}
                    </Badge>
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
                <p className="text-slate-600 leading-relaxed text-xs">
                  {act.description}
                </p>
                <p className="text-[10px] text-slate-400">Actor: {act.actor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linked Service Report Banner (if report exists) */}
      {linkedReport && (
        <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm block">
                Official Inspection Report Available ({linkedReport.reportNumber})
              </span>
              <p className="text-xs text-slate-400">
                Compliance Certification: {linkedReport.complianceCertification}
              </p>
            </div>
          </div>
          <Button
            href={`/portal-demo/reports#${linkedReport.id}`}
            variant="primary"
            size="sm"
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            View Inspection Certificate
          </Button>
        </div>
      )}
    </div>
  );
}

export default function RequestDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading ticket details...</div>}>
      <RequestDetailContent />
    </Suspense>
  );
}
