'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RequestStatus } from '@/types';
import { formatGbp } from '@/lib/utils';
import {
  ArrowLeft,
  Wrench,
  Clock,
  User,
  Phone,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Send,
  ExternalLink,
  Info,
  Flame,
  ArrowRight,
  HardHat,
  MessageSquare,
  Sparkles,
  Receipt,
  FilePlus2,
  Check,
  XCircle,
} from 'lucide-react';

function AdminRequestDetailContent() {
  const params = useParams();
  const router = useRouter();
  const {
    getRequestById,
    getEquipmentById,
    getCustomerSite,
    getReportById,
    updateRequestStatus,
    addStaffNote,
    technicians,
    getQuotesByRequest,
  } = useFieldline();

  const id = typeof params.id === 'string' ? params.id : '';
  const request = getRequestById(id);

  // Form states for status update
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>(request?.status || 'under_review');
  const [selectedTechnician, setSelectedTechnician] = useState<string>(
    request?.assignedEngineer?.name || technicians[0]?.name || 'Mark Stevens'
  );
  const [statusNote, setStatusNote] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateFeedback, setUpdateFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Internal staff notes
  const [newStaffNote, setNewStaffNote] = useState<string>('');
  const [isSubmittingNote, setIsSubmittingNote] = useState<boolean>(false);

  if (!request) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
        <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Work Order Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested ticket reference &quot;{id}&quot; does not exist in the active dispatch dataset.
        </p>
        <Button href="/admin-demo/requests" variant="primary" size="md">
          Back to Work Order Queue
        </Button>
      </div>
    );
  }

  const customerSite = getCustomerSite(request.siteId);
  const equipment = getEquipmentById(request.equipmentId);
  const linkedReport = request.linkedReportId ? getReportById(request.linkedReportId) : undefined;

  const handleStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateFeedback(null);

    try {
      await updateRequestStatus(
        request.id,
        selectedStatus,
        statusNote.trim() || undefined,
        selectedTechnician,
        statusNote.trim() || undefined
      );

      setUpdateFeedback({
        message: `Work order successfully updated to ${selectedStatus.replace(/_/g, ' ')}. Portal sync confirmed.`,
        type: 'success',
      });
      setStatusNote('');
    } catch {
      setUpdateFeedback({
        message: 'Failed to update work order. Please try again.',
        type: 'error',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffNote.trim()) return;

    setIsSubmittingNote(true);
    try {
      await addStaffNote(request.id, newStaffNote.trim());
      setNewStaffNote('');
      setUpdateFeedback({
        message: 'Internal operations note logged and appended to timeline.',
        type: 'success',
      });
    } catch {
      setUpdateFeedback({
        message: 'Failed to record staff note.',
        type: 'error',
      });
    } finally {
      setIsSubmittingNote(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin-demo/requests"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work Orders Queue</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/portal-demo/requests/${request.id}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
            title="Preview how customer sees this ticket in the client portal"
          >
            <span>Customer Portal View</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
            ID: {request.id}
          </span>
        </div>
      </div>

      {/* Update Feedback Banner */}
      {updateFeedback && (
        <div
          className={`p-4 rounded-xl text-xs font-medium flex items-center justify-between border ${
            updateFeedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{updateFeedback.message}</span>
          </div>
          <button
            onClick={() => setUpdateFeedback(null)}
            className="text-xs font-bold underline ml-4 hover:opacity-75"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Ticket Banner Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-sm font-bold text-navy-950 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
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
                    : request.status === 'scheduled'
                    ? 'info'
                    : 'default'
                }
                size="sm"
              >
                {request.status.replace(/_/g, ' ')}
              </Badge>

              {request.requestedTiming === 'immediate_emergency' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  <Flame className="w-3 h-3 text-rose-600 animate-pulse" />
                  SLA Target &lt; 4 Hours
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
              {request.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {request.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 text-xs text-slate-500 shrink-0">
            <div>
              Submitted:{' '}
              <span className="font-semibold text-slate-700">
                {new Date(request.createdAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div>
              Last modified:{' '}
              <span className="font-semibold text-slate-700">
                {new Date(request.updatedAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Three Columns: Customer Details, Equipment Details, Assigned Technician */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Customer Site */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-navy-700" />
                Customer Site
              </span>
              <Link
                href="/admin-demo/customers"
                className="text-[11px] font-semibold text-navy-700 hover:text-navy-900 underline"
              >
                Directory
              </Link>
            </div>
            <div>
              <div className="text-sm font-bold text-navy-950">
                {customerSite ? customerSite.name : request.siteId}
              </div>
              <p className="text-xs text-slate-500">
                {customerSite ? `${customerSite.address.line1}, ${customerSite.address.postcode}` : 'On record'}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Contact: {request.reportedBy}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Direct: {request.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Equipment Asset */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-navy-700" />
                Equipment Asset
              </span>
              <Link
                href="/admin-demo/equipment"
                className="text-[11px] font-semibold text-navy-700 hover:text-navy-900 underline"
              >
                Register
              </Link>
            </div>
            <div>
              <div className="text-sm font-bold text-navy-950">
                {request.equipmentName}
              </div>
              <p className="text-xs text-slate-500">
                Tag:{' '}
                <span className="font-mono font-medium text-slate-700">
                  {equipment?.assetTag || 'FL-EQ-REG'}
                </span>
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
              <div className="text-slate-600">
                Location: <span className="font-medium text-slate-800">{equipment?.location || 'Main Kitchen'}</span>
              </div>
              <div className="text-slate-600">
                Model: <span className="font-medium text-slate-800">{equipment ? `${equipment.brand} ${equipment.model}` : 'Verified OEM'}</span>
              </div>
            </div>
          </div>

          {/* Assigned Technician */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <HardHat className="w-3.5 h-3.5 text-amber-600" />
              Assigned Field Staff
            </span>
            <div>
              <div className="text-sm font-bold text-navy-950">
                {request.assignedEngineer?.name || 'Unassigned'}
              </div>
              <p className="text-xs text-slate-500 leading-tight">
                {request.assignedEngineer?.badge || 'Pending Technician Allocation'}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Timing:{' '}
                  <span className="font-medium text-slate-800">
                    {request.requestedTiming.replace(/_/g, ' ')}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Controls & Status Management Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Quotation Card + Status Transition Control + Internal Notes */}
        <div className="lg:col-span-2 space-y-8">
          {/* Commercial Digital Quotation Card */}
          {(() => {
            const linkedQuotes = getQuotesByRequest(request.id);
            const activeQuote = linkedQuotes[0];

            if (activeQuote) {
              return (
                <div className="bg-white border-2 border-navy-900/10 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-amber-600" />
                        <h2 className="text-base font-bold text-navy-950">
                          Commercial Quotation Dossier
                        </h2>
                        <span className="font-mono text-xs font-bold text-navy-900 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
                          {activeQuote.quoteNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {activeQuote.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          activeQuote.status === 'approved'
                            ? 'success'
                            : activeQuote.status === 'awaiting_customer'
                            ? 'amber'
                            : activeQuote.status === 'declined'
                            ? 'danger'
                            : 'default'
                        }
                        size="md"
                      >
                        {activeQuote.status.replace('_', ' ')}
                      </Badge>
                      <Button
                        href={`/admin-demo/quotes/${activeQuote.id}`}
                        variant="primary"
                        size="sm"
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        Inspect Quotation
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Total Quoted Value</span>
                      <span className="text-base font-extrabold text-navy-950">
                        {formatGbp(activeQuote.finalTotal)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Line Items</span>
                      <span className="text-xs font-bold text-slate-800">
                        {activeQuote.lineItems.length} item{activeQuote.lineItems.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Validity Expiry</span>
                      <span className="text-xs font-medium text-slate-700">
                        {new Date(activeQuote.expiryDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">Portal Visibility</span>
                      <span className={`text-xs font-bold ${activeQuote.status === 'draft' ? 'text-slate-500' : 'text-emerald-700'}`}>
                        {activeQuote.status === 'draft' ? 'Internal Only (Draft)' : 'Live in Client Portal'}
                      </span>
                    </div>
                  </div>

                  {activeQuote.status === 'draft' && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>This quotation is currently a <strong>Draft</strong>. It is not visible to the customer until staff present it.</span>
                      </div>
                      <Link
                        href={`/admin-demo/quotes/${activeQuote.id}`}
                        className="text-xs font-bold text-amber-950 underline hover:text-amber-800 ml-4 shrink-0"
                      >
                        Review & Present &rarr;
                      </Link>
                    </div>
                  )}

                  {activeQuote.status === 'approved' && (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Customer approved this quotation on{' '}
                        <strong>
                          {activeQuote.customerDecisionDate
                            ? new Date(activeQuote.customerDecisionDate).toLocaleString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'demonstration record'}
                        </strong>
                        . Commercial terms authorized.
                      </span>
                    </div>
                  )}

                  {activeQuote.status === 'declined' && (
                    <div className="p-3 bg-rose-50/70 border border-rose-200/70 rounded-xl text-xs text-rose-900 space-y-1">
                      <div className="flex items-center gap-2 font-bold">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Customer declined this quotation</span>
                      </div>
                      {activeQuote.declineReason && (
                        <p className="text-[11px] text-rose-800 pl-6">
                          Feedback: &ldquo;{activeQuote.declineReason}&rdquo;
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div className="bg-gradient-to-r from-slate-50 to-amber-50/30 border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-navy-950">
                      No Digital Quotation Linked Yet
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                      Prepare an itemised scope of works, replacement parts, and certified technician labour for customer review and digital authorization.
                    </p>
                  </div>
                </div>

                <Button
                  href={`/admin-demo/quotes/new?requestId=${request.id}`}
                  variant="primary"
                  size="sm"
                  leftIcon={<FilePlus2 className="w-4 h-4" />}
                  className="shrink-0"
                >
                  Create Digital Quote
                </Button>
              </div>
            );
          })()}

          {/* Dispatch Status Transition Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-navy-700" />
                  Update Job Status & Assign Engineer
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Changing status here syncs instantly to the customer portal and updates dispatch SLA timers.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Live Portal Sync
              </span>
            </div>

            <form onSubmit={handleStatusChange} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Workflow Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as RequestStatus)}
                    className="w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
                  >
                    <option value="submitted">Submitted (Awaiting Triage)</option>
                    <option value="under_review">Under Review (Desk Triage in Progress)</option>
                    <option value="scheduled">Scheduled (Engineer Dispatched Date Set)</option>
                    <option value="in_progress">In Progress (Engineer On-Site Diagnosing)</option>
                    <option value="completed">Completed (Work Signed Off & Recommissioned)</option>
                    <option value="cancelled">Cancelled (Closed Without Action)</option>
                  </select>
                </div>

                {/* Technician Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Lead Technician
                  </label>
                  <select
                    value={selectedTechnician}
                    onChange={(e) => setSelectedTechnician(e.target.value)}
                    className="w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
                  >
                    {technicians.map((tech) => (
                      <option key={tech.name} value={tech.name}>
                        {tech.name} — {tech.specialty} ({tech.status})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Note / Completion findings */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {selectedStatus === 'completed'
                    ? 'Resolution Findings & Work Performed (Generates Official Service Report)'
                    : 'Operational Status Note (Visible in Portal Timeline)'}
                </label>
                <textarea
                  rows={3}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder={
                    selectedStatus === 'completed'
                      ? 'e.g. Replaced burner ignition probe, cleaned flame sensor, verified gas pressure at 20 mbar. Recommissioned into service.'
                      : 'e.g. Parts allocated from mobile van stock; technician confirmed arrival slot.'
                  }
                  className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-3 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
                />
              </div>

              {selectedStatus === 'completed' && (
                <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Automatic Stage 3 Workflow Trigger:
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Marking this ticket as <strong>Completed</strong> will automatically create a formal compliance service report, record an entry in the equipment&apos;s service history, and restore equipment health to <strong>Operational</strong>.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isUpdating}
                  className="gap-2"
                >
                  {isUpdating ? 'Saving Update...' : 'Commit Status Change'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Internal Staff Notes Composer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-navy-700" />
                Add Internal Operations Note
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Log internal dispatcher or coordinator communications directly onto this work order&apos;s record.
              </p>
            </div>

            <form onSubmit={handleAddNote} className="space-y-4">
              <textarea
                rows={2}
                value={newStaffNote}
                onChange={(e) => setNewStaffNote(e.target.value)}
                placeholder="e.g. Spoke with head chef. Kitchen access available via back loading bay from 06:00."
                className="w-full text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-3 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  disabled={isSubmittingNote || !newStaffNote.trim()}
                  className="gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingNote ? 'Saving...' : 'Add Internal Note'}</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Generated Report Card if completed */}
          {linkedReport && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-sm font-bold text-emerald-950">
                    Official Service Certificate #{linkedReport.reportNumber}
                  </h3>
                </div>
                <Badge variant="success" size="sm">
                  Proved & Signed Off
                </Badge>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {linkedReport.summary}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-emerald-900">
                <span>Certified by: <strong>{linkedReport.technicianName}</strong></span>
                <Link
                  href="/admin-demo/reports"
                  className="font-bold underline hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>View in Reports Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Live Milestone Activity Audit Feed */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <Clock className="w-4 h-4 text-navy-700" />
                Activity & Audit History
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Chronological record of triage, dispatches, and notes.
              </p>
            </div>

            <div className="space-y-5 relative before:absolute before:top-2 before:bottom-2 before:left-3 before:w-0.5 before:bg-slate-200">
              {request.activities.map((activity, idx) => (
                <div key={activity.id || idx} className="relative flex items-start gap-3.5 pl-1">
                  <div className="w-4 h-4 rounded-full bg-navy-600 ring-4 ring-white shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900">
                        {activity.title}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 pt-0.5">
                      <span>{activity.actor}</span>
                      <span>•</span>
                      <span>
                        {new Date(activity.timestamp).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav Shortcuts */}
          <div className="p-5 rounded-2xl bg-navy-950 text-white space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Operations Controls
            </h3>
            <p className="text-[11px] text-slate-300">
              Need to inspect the client&apos;s full equipment fleet or check maintenance schedule?
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <Link
                href="/admin-demo/equipment"
                className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 text-slate-200 transition-colors"
              >
                <span>Browse Fleet Equipment</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                href="/admin-demo/schedule"
                className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 text-slate-200 transition-colors"
              >
                <span>View Dispatch Calendar</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminRequestDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-400">
          Loading work order record...
        </div>
      }
    >
      <AdminRequestDetailContent />
    </Suspense>
  );
}
