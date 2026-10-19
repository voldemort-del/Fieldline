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
  Send,
  X,
  User,
  Wrench,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

function AdminQuoteDetailContent() {
  const params = useParams();
  const router = useRouter();
  const {
    getQuoteById,
    getCustomerSite,
    getRequestById,
    presentQuoteToCustomer,
    cancelQuote,
    activeSite,
    setActiveSiteId,
  } = useFieldline();

  const id = typeof params.id === 'string' ? params.id : '';
  const quote = getQuoteById(id);

  const [isActionLoading, setIsActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  if (!quote) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
        <FileText className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Quotation Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested quotation reference &quot;{id}&quot; does not exist in the dispatch records.
        </p>
        <Button href="/admin-demo/quotes" variant="primary" size="md">
          Back to Quotations Queue
        </Button>
      </div>
    );
  }

  const site = getCustomerSite(quote.siteId);
  const request = getRequestById(quote.requestId);

  const handlePresent = async () => {
    setIsActionLoading(true);
    setFeedback(null);
    try {
      await presentQuoteToCustomer(quote.id);
      setFeedback({
        message: 'Quotation presented to Customer Portal. Client can now authorize via self-service.',
        type: 'success',
      });
    } catch (err: unknown) {
      setFeedback({
        message: err instanceof Error ? err.message : 'Failed to present quotation.',
        type: 'error',
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to withdraw and cancel this quotation?')) return;
    setIsActionLoading(true);
    try {
      await cancelQuote(quote.id, 'Withdrawn by service coordinator.');
      setFeedback({
        message: 'Quotation has been cancelled.',
        type: 'success',
      });
    } catch (err: unknown) {
      setFeedback({
        message: err instanceof Error ? err.message : 'Failed to cancel quotation.',
        type: 'error',
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default" size="sm">Internal Draft</Badge>;
      case 'awaiting_customer':
        return <Badge variant="warning" size="sm">Awaiting Customer Review</Badge>;
      case 'approved':
        return <Badge variant="success" size="sm">Customer Approved</Badge>;
      case 'declined':
        return <Badge variant="danger" size="sm">Declined by Client</Badge>;
      case 'expired':
        return <Badge variant="default" size="sm">Expired</Badge>;
      case 'cancelled':
        return <Badge variant="default" size="sm">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin-demo/quotes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quotations Register</span>
        </Link>

        {quote.status !== 'draft' && (
          <Link
            href={`/portal-demo/quotes/${quote.id}`}
            onClick={() => setActiveSiteId(quote.siteId)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <span>View in Customer Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:opacity-70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Quotation Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                {quote.quoteNumber}
              </span>
              {getStatusBadge(quote.status)}
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">
                Created {formatDate(quote.createdAt)} by {quote.staffAuthor}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {quote.title}
            </h1>
            <p className="text-xs text-slate-500">
              Client Site: <strong className="text-slate-700">{site?.name}</strong> • Account Ref:{' '}
              {site?.accountNumber}
            </p>
          </div>

          {/* Action Control Panel */}
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            {quote.status === 'draft' && (
              <>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handlePresent}
                  isLoading={isActionLoading}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Present to Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleCancel}
                  isLoading={isActionLoading}
                >
                  Withdraw Quote
                </Button>
              </>
            )}

            {quote.status === 'awaiting_customer' && (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleCancel}
                isLoading={isActionLoading}
              >
                Cancel Quote
              </Button>
            )}
          </div>
        </div>

        {/* State Banner Notices */}
        {quote.status === 'awaiting_customer' && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Awaiting Client Decision:</strong> This quotation is published and active in the customer portal. Valid until{' '}
                {formatDate(quote.expiryDate)}.
              </span>
            </div>
          </div>
        )}

        {quote.status === 'approved' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Customer Authorization Confirmed</span>
            </div>
            <p className="text-emerald-700">
              Authorized on {formatDateTime(quote.customerDecisionDate || quote.updatedAt)}. The service desk can now proceed with technician dispatch and parts allocation.
            </p>
          </div>
        )}

        {quote.status === 'declined' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-red-800">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Quotation Declined by Client</span>
            </div>
            <p className="text-red-700">
              Declined on {formatDateTime(quote.customerDecisionDate || quote.updatedAt)}.
              {quote.declineReason && (
                <span className="block mt-1 font-semibold italic">
                  Stated Reason: &quot;{quote.declineReason}&quot;
                </span>
              )}
            </p>
          </div>
        )}

        {/* Linked Request & Equipment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Associated Work Order
            </span>
            {request ? (
              <>
                <Link
                  href={`/admin-demo/requests/${request.id}`}
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
              <span className="text-slate-500">Service Request: {quote.requestId}</span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Kitchen Asset
            </span>
            <p className="font-bold text-slate-900">{quote.equipmentName || 'Kitchen Asset'}</p>
            <p className="text-slate-500 text-[11px]">Venue: {site?.name}</p>
          </div>
        </div>

        {/* Proposed Work Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Scope of Proposed Remedial Works
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {quote.description}
          </p>
        </div>

        {/* Itemized Pricing Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Itemized Bill of Materials &amp; Labor
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="py-2.5 px-4">Line Item Description</th>
                  <th className="py-2.5 px-4 w-20 text-center">Qty</th>
                  <th className="py-2.5 px-4 w-32 text-right">Unit Price</th>
                  <th className="py-2.5 px-4 w-32 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {quote.lineItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-700">
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

          {/* Totals Summary */}
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
                  <span>Contract Credit / Goodwill:</span>
                  <span className="font-mono font-bold">-{formatGbp(quote.discount)}</span>
                </div>
              ) : null}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>Final Quotation Total:</span>
                <span className="font-mono text-amber-700">{formatGbp(quote.finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Terms */}
        {quote.terms && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Quotation Terms &amp; Conditions
            </span>
            <p className="text-slate-600 leading-relaxed">{quote.terms}</p>
          </div>
        )}
      </div>

      {/* Status History Timeline */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Quotation Audit Timeline
            </h3>
            <p className="text-xs text-slate-500">
              Historical record of quotation creation, presentation, and customer authorization
            </p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>

        <div className="space-y-4 pt-2">
          {quote.statusHistory.map((entry, index) => (
            <div key={index} className="flex items-start gap-3 text-xs">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                    {entry.status.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formatDateTime(entry.timestamp)}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{entry.note}</p>
                <p className="text-[10px] text-slate-400">Recorded by: {entry.actor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminQuoteDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading quotation details...
        </div>
      }
    >
      <AdminQuoteDetailContent />
    </Suspense>
  );
}
