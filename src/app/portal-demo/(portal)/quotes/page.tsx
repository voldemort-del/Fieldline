'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { QuoteStatus } from '@/types';
import { formatGbp, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Search,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function CustomerQuotesPage() {
  const { activeSite, getQuotesBySite } = useFieldline();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Customer only sees non-draft quotes for their active venue
  const siteQuotes = getQuotesBySite(activeSite.id).filter((q) => q.status !== 'draft');

  const filteredQuotes = siteQuotes.filter((quote) => {
    const matchesSearch =
      quote.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (quote.equipmentName || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const awaitingCount = siteQuotes.filter((q) => q.status === 'awaiting_customer').length;

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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60">
              COMMERCIAL SERVICE ESTIMATES
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-500">{activeSite.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Quotations &amp; Work Authorizations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Review itemized parts and labor estimates prepared by Fieldline engineers. Authorize or decline proposals directly online.
          </p>
        </div>

        {awaitingCount > 0 && (
          <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2.5 shrink-0">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>{awaitingCount} Quotation{awaitingCount > 1 ? 's' : ''}</strong> awaiting your review
            </span>
          </div>
        )}
      </div>

      {/* Toolbar: Search and Filter */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by quote #, title, asset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Quotes' },
              { id: 'awaiting_customer', label: 'Action Required' },
              { id: 'approved', label: 'Approved' },
              { id: 'declined', label: 'Declined' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Cards Grid */}
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No Quotations Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are currently no formal quotations matching this filter for {activeSite.name}.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {quote.quoteNumber}
                    </span>
                    {getStatusBadge(quote.status)}
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">
                      Issued {formatDate(quote.createdAt)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      {formatGbp(quote.finalTotal)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {quote.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {quote.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                  <div className="space-y-0.5">
                    <p>
                      Asset: <strong className="text-slate-800">{quote.equipmentName || 'Kitchen Equipment'}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Validity: Valid until {formatDate(quote.expiryDate)}
                    </p>
                  </div>

                  <Button
                    href={`/portal-demo/quotes/${quote.id}`}
                    variant={quote.status === 'awaiting_customer' ? 'primary' : 'outline'}
                    size="sm"
                    rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  >
                    {quote.status === 'awaiting_customer' ? 'Review & Authorize' : 'View Full Quotation'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Demonstration Notice */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Portfolio Simulation Notice:</strong> Quotations displayed here are demonstration records. Authorizing a quote records approval in your browser session and notifies the staff operations queue. No real payments, binding contracts, or card charges are incurred.
        </p>
      </div>
    </div>
  );
}
