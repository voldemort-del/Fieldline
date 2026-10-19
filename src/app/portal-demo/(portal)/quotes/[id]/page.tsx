'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { formatGbp, formatDate, formatDateTime } from '@/lib/utils';
import { QuoteStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  ArrowLeft,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Check,
  X,
  Wrench,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Send,
} from 'lucide-react';

function CustomerQuoteDetailContent() {
  const params = useParams();
  const router = useRouter();
  const {
    getQuoteById,
    getCustomerSite,
    getRequestById,
    approveQuote,
    declineQuote,
    activeSite,
    setActiveSiteId,
  } = useFieldline();

  const id = typeof params.id === 'string' ? params.id : '';
  const quote = getQuoteById(id);

  // Modals state
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (!quote) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
        <FileText className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Quotation Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested quotation reference &quot;{id}&quot; does not exist.
        </p>
        <Button href="/portal-demo/quotes" variant="primary" size="md">
          Back to Quotations Hub
        </Button>
      </div>
    );
  }

  // Check if draft (customer shouldn't see draft quotes)
  if (quote.status === 'draft') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
        <Clock className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Quotation in Preparation</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Quotation <strong>{quote.quoteNumber}</strong> is currently being prepared by Fieldline operations staff and has not yet been released for customer review.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button href="/portal-demo/quotes" variant="outline" size="md">
            Back to Quotations Hub
          </Button>
          <Button href="/admin-demo/quotes" variant="secondary" size="md">
            View in Staff Operations
          </Button>
        </div>
      </div>
    );
  }

  // Check customer site ownership
  if (quote.siteId !== activeSite.id) {
    const ownerSite = getCustomerSite(quote.siteId);
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
        <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Different Customer Venue</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Quotation <strong>{quote.quoteNumber}</strong> belongs to <strong>{ownerSite?.name || 'another account'}</strong>. Your current demonstration venue is set to <strong>{activeSite.name}</strong>.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setActiveSiteId(quote.siteId)}
          >
            Switch to {ownerSite?.name}
          </Button>
          <Button href="/portal-demo/quotes" variant="outline" size="md">
            Back to My Quotes
          </Button>
        </div>
      </div>
    );
  }

  const site = getCustomerSite(quote.siteId);
  const request = getRequestById(quote.requestId);

  const handleConfirmApproval = async () => {
    setIsSubmitting(true);
    setActionError(null);
    try {
      await approveQuote(quote.id);
      setIsApproveModalOpen(false);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Approval failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDecline = async () => {
    setIsSubmitting(true);
    setActionError(null);
    try {
      await declineQuote(quote.id, declineReason);
      setIsDeclineModalOpen(false);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Decline action failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'awaiting_customer':
        return <Badge variant="warning" size="sm">Awaiting Your Review</Badge>;
      case 'approved':
        return <Badge variant="success" size="sm">Approved</Badge>;
      case 'declined':
        return <Badge variant="danger" size="sm">Declined</Badge>;
      case 'expired':
        return <Badge variant="default" size="sm">Expired</Badge>;
      case 'cancelled':
        return <Badge variant="default" size="sm">Withdrawn</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/portal-demo/quotes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quotations Hub</span>
        </Link>

        <span className="text-xs font-mono text-slate-400">
          Ref: {quote.quoteNumber}
        </span>
      </div>

      {/* Main Quote Dossier Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                {quote.quoteNumber}
              </span>
              {getStatusBadge(quote.status)}
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">
                Issued {formatDate(quote.createdAt)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {quote.title}
            </h1>
            <p className="text-xs text-slate-500">
              Customer Site: <strong className="text-slate-700">{site?.name}</strong> • Account: {site?.accountNumber}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-right shrink-0">
            <span className="text-xs text-slate-500 block uppercase font-medium">
              Total Quotation Fee
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block">
              {formatGbp(quote.finalTotal)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Valid until {formatDate(quote.expiryDate)}
            </span>
          </div>
        </div>

        {/* DECISION ACTION BAR (Only if awaiting customer) */}
        {quote.status === 'awaiting_customer' && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Customer Action Required</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                Please review the itemized scope and pricing below. You may approve the quote to authorize commencement or decline with feedback.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                id="btn-decline-quote"
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsDeclineModalOpen(true)}
                className="text-red-700 hover:text-red-800 border-red-200 hover:bg-red-50"
              >
                Decline Quote
              </Button>
              <Button
                id="btn-approve-quote"
                type="button"
                variant="primary"
                size="md"
                onClick={() => setIsApproveModalOpen(true)}
                leftIcon={<Check className="w-4 h-4" />}
                className="shadow-sm"
              >
                Approve Quotation
              </Button>
            </div>
          </div>
        )}

        {/* Status: APPROVED Banner */}
        {quote.status === 'approved' && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Quotation Approved by Client</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Demonstration authorization confirmed on{' '}
              <strong>{formatDateTime(quote.customerDecisionDate || quote.updatedAt)}</strong>. Fieldline operations desk has been notified to proceed with parts allocation and scheduling service attendance.
            </p>
          </div>
        )}

        {/* Status: DECLINED Banner */}
        {quote.status === 'declined' && (
          <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Quotation Declined</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This quotation was declined on {formatDateTime(quote.customerDecisionDate || quote.updatedAt)}.
              {quote.declineReason && (
                <span className="block mt-1 font-semibold text-slate-700 italic">
                  Feedback recorded: &quot;{quote.declineReason}&quot;
                </span>
              )}
            </p>
          </div>
        )}

        {/* Associated Request & Equipment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Linked Service Request
            </span>
            {request ? (
              <>
                <Link
                  href={`/portal-demo/requests/${request.id}`}
                  className="font-bold text-slate-900 hover:text-amber-600 hover:underline flex items-center gap-1"
                >
                  <span>{request.ticketNumber} — {request.title}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <p className="text-slate-500 text-[11px]">
                  Priority: {request.priority.replace('_', ' ')} • Status: {request.status}
                </p>
              </>
            ) : (
              <span className="text-slate-600">{quote.requestId}</span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Catering Kitchen Asset
            </span>
            <p className="font-bold text-slate-900">{quote.equipmentName || 'Commercial Kitchen Equipment'}</p>
            <p className="text-slate-500 text-[11px]">{site?.name}</p>
          </div>
        </div>

        {/* Proposed Work Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Description of Proposed Remedial Scope
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {quote.description}
          </p>
        </div>

        {/* Itemized Pricing Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Itemized Bill of Materials &amp; Labor
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 w-20 text-center">Qty</th>
                  <th className="py-2.5 px-4 w-28 text-right">Unit Price</th>
                  <th className="py-2.5 px-4 w-28 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {quote.lineItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-600">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-600">
                      {formatGbp(item.unitPrice)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      {formatGbp(item.lineTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Card */}
          <div className="pt-2 flex justify-end text-xs">
            <div className="w-72 space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-slate-900">
                  {formatGbp(quote.subtotal)}
                </span>
              </div>
              {quote.discount && quote.discount > 0 ? (
                <div className="flex justify-between text-emerald-700">
                  <span>Contract Discount:</span>
                  <span className="font-mono font-bold">-{formatGbp(quote.discount)}</span>
                </div>
              ) : null}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Payable:</span>
                <span className="font-mono text-amber-700">{formatGbp(quote.finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Illustrative Terms */}
        {quote.terms && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Illustrative Quotation Terms
            </span>
            <p className="text-slate-600 leading-relaxed">{quote.terms}</p>
          </div>
        )}
      </div>

      {/* APPROVAL CONFIRMATION MODAL */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => !isSubmitting && setIsApproveModalOpen(false)}
          />
          <div className="relative bg-white text-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 z-10 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Check className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Confirm Quotation Authorization
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                You are approving quotation <strong>{quote.quoteNumber}</strong> for the sum of{' '}
                <strong className="text-slate-900 font-mono">{formatGbp(quote.finalTotal)}</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                <strong>Portfolio Demonstration Notice:</strong> This action records commercial approval within the simulation. No payment is taken, and no binding contract is formed.
              </p>
            </div>

            {actionError && (
              <p className="text-xs text-red-600 font-semibold">{actionError}</p>
            )}

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsApproveModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmApproval}
                isLoading={isSubmitting}
              >
                Confirm Demonstration Approval
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DECLINE CONFIRMATION MODAL */}
      {isDeclineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => !isSubmitting && setIsDeclineModalOpen(false)}
          />
          <div className="relative bg-white text-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 z-10 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <X className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Decline Quotation
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Please confirm that you wish to decline quotation <strong>{quote.quoteNumber}</strong>. You may provide optional feedback for the service coordinator.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Declining (Optional):
              </label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="e.g. Deferring work until next quarter, seeking alternative solution..."
                rows={3}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            {actionError && (
              <p className="text-xs text-red-600 font-semibold">{actionError}</p>
            )}

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDeclineModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmDecline}
                isLoading={isSubmitting}
                className="bg-red-600 hover:bg-red-700 border-red-600 text-white"
              >
                Confirm Decline
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerQuoteDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading quotation...
        </div>
      }
    >
      <CustomerQuoteDetailContent />
    </Suspense>
  );
}
