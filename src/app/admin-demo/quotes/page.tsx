'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { QuoteStatus } from '@/types';
import { formatGbp, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Search,
  Plus,
  ArrowRight,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Building2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function AdminQuotesPage() {
  const { quotes, getCustomerSite, requests } = useFieldline();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredQuotes = quotes.filter((q) => {
    const site = getCustomerSite(q.siteId);
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (site?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.equipmentName || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || q.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default" size="sm">Draft (Staff Only)</Badge>;
      case 'awaiting_customer':
        return <Badge variant="warning" size="sm">Awaiting Customer</Badge>;
      case 'approved':
        return <Badge variant="success" size="sm">Approved by Client</Badge>;
      case 'declined':
        return <Badge variant="danger" size="sm">Declined</Badge>;
      case 'expired':
        return <Badge variant="default" size="sm">Expired</Badge>;
      case 'cancelled':
        return <Badge variant="default" size="sm">Cancelled</Badge>;
    }
  };

  const draftCount = quotes.filter((q) => q.status === 'draft').length;
  const awaitingCount = quotes.filter((q) => q.status === 'awaiting_customer').length;
  const approvedCount = quotes.filter((q) => q.status === 'approved').length;
  const declinedCount = quotes.filter((q) => q.status === 'declined').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              OPERATIONS COMMERCIAL DESK
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-500">Service Quotations Register</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Commercial Digital Quotations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Author and dispatch formal service quotes for customer review. Quotations synchronize directly with the Customer Portal demonstration.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Button
            href="/admin-demo/quotes/new"
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Quotation
          </Button>
        </div>
      </div>

      {/* KPI Summary Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-500 font-medium">Draft Estimates</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900">{draftCount}</span>
            <span className="text-[11px] text-slate-400 font-mono">Staff Internal</span>
          </div>
        </div>

        <div className="bg-white border border-amber-200/80 bg-amber-50/20 rounded-xl p-4 space-y-1">
          <span className="text-xs text-amber-800 font-medium">Awaiting Authorization</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-700">{awaitingCount}</span>
            <span className="text-[11px] text-amber-600 font-medium">In Client Portal</span>
          </div>
        </div>

        <div className="bg-white border border-emerald-200/80 bg-emerald-50/20 rounded-xl p-4 space-y-1">
          <span className="text-xs text-emerald-800 font-medium">Approved Quotes</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700">{approvedCount}</span>
            <span className="text-[11px] text-emerald-600 font-medium">Ready for Dispatch</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-500 font-medium">Declined Scope</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-700">{declinedCount}</span>
            <span className="text-[11px] text-slate-400 font-mono">Feedback Logged</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by quote #, venue, asset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Quotations' },
              { id: 'draft', label: 'Draft' },
              { id: 'awaiting_customer', label: 'Awaiting Customer' },
              { id: 'approved', label: 'Approved' },
              { id: 'declined', label: 'Declined' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedStatus === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quotations Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Quote Ref</th>
                <th className="py-3 px-4">Customer &amp; Venue</th>
                <th className="py-3 px-4">Scope Summary</th>
                <th className="py-3 px-4">Amount (GBP)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created / Expiry</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 text-xs">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No quotations found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => {
                  const site = getCustomerSite(quote.siteId);
                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        <Link
                          href={`/admin-demo/quotes/${quote.id}`}
                          className="hover:text-amber-600 hover:underline"
                        >
                          {quote.quoteNumber}
                        </Link>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900 block">
                          {site?.name || 'Customer Site'}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {site?.accountNumber}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate">
                        <span className="font-medium text-slate-900 block truncate">
                          {quote.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          Asset: {quote.equipmentName || 'Kitchen Equipment'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {formatGbp(quote.finalTotal)}
                        {quote.discount && quote.discount > 0 ? (
                          <span className="text-[10px] text-emerald-600 block font-sans">
                            incl. £{quote.discount} credit
                          </span>
                        ) : null}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getStatusBadge(quote.status)}
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        <span>{formatDate(quote.createdAt)}</span>
                        <span className="text-[10px] text-slate-400 block">
                          Expires: {formatDate(quote.expiryDate)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/admin-demo/quotes/${quote.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-white bg-slate-100 hover:bg-slate-900 transition-colors"
                        >
                          <span>Manage</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
