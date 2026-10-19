'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { formatGbp, calculateQuoteTotals, calculateLineTotal } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Send,
  Building2,
  AlertCircle,
} from 'lucide-react';

interface EditableLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

function CreateQuoteFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRequestId = searchParams.get('requestId') || '';

  const {
    requests,
    sites,
    equipment,
    createQuote,
    presentQuoteToCustomer,
    getCustomerSite,
    getRequestById,
  } = useFieldline();

  // Find preselected request if any
  const preselectedRequest = initialRequestId ? getRequestById(initialRequestId) : undefined;

  const [selectedRequestId, setSelectedRequestId] = useState<string>(
    preselectedRequest?.id || (requests[0]?.id || '')
  );

  const activeRequest = getRequestById(selectedRequestId) || requests[0];
  const activeSite = activeRequest ? getCustomerSite(activeRequest.siteId) : sites[0];

  const [title, setTitle] = useState(
    activeRequest ? `Repair & Component Overhaul — ${activeRequest.equipmentName}` : ''
  );
  const [description, setDescription] = useState(
    activeRequest ? `Remedial works addressing: ${activeRequest.description}` : ''
  );
  const [discount, setDiscount] = useState<number>(0);
  const [terms, setTerms] = useState(
    'Quotation valid for 30 calendar days from issue. All replacement parts covered by 12-month manufacturer warranty. Labor performed by certified technicians. Work commences upon customer portal approval.'
  );

  // Line items
  const [lineItems, setLineItems] = useState<EditableLineItem[]>([
    {
      id: 'li-new-1',
      description: 'OEM Replacement Components & Mechanical Spares Kit',
      quantity: 1,
      unitPrice: 165.0,
    },
    {
      id: 'li-new-2',
      description: 'Field Service Specialist Labor & Diagnostic Calibration (Hours)',
      quantity: 2,
      unitPrice: 75.0,
    },
  ]);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle request change
  const handleRequestChange = (reqId: string) => {
    setSelectedRequestId(reqId);
    const req = getRequestById(reqId);
    if (req) {
      setTitle(`Remedial Service & Parts — ${req.equipmentName}`);
      setDescription(`Remedial scope addressing reported issue: ${req.description}`);
    }
  };

  // Line items manipulation
  const handleAddLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `li-new-${Date.now()}`,
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length <= 1) {
      setValidationErrors(['A quotation must contain at least one line item.']);
      return;
    }
    setLineItems((prev) => prev.filter((item) => item.id !== id));
    setValidationErrors([]);
  };

  const handleUpdateLineItem = (
    id: string,
    field: keyof EditableLineItem,
    value: string | number
  ) => {
    setLineItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [field]:
            field === 'quantity' || field === 'unitPrice'
              ? Math.max(0, typeof value === 'number' ? value : parseFloat(value) || 0)
              : value,
        };
      })
    );
  };

  // Totals
  const { subtotal, finalTotal } = calculateQuoteTotals(lineItems, discount);

  const validate = (): boolean => {
    const errors: string[] = [];
    if (!title.trim()) errors.push('Please enter a quotation title.');
    if (!description.trim()) errors.push('Please enter a scope description.');
    if (lineItems.length === 0) errors.push('Quotation must have at least one line item.');

    lineItems.forEach((li, idx) => {
      if (!li.description.trim()) {
        errors.push(`Line item #${idx + 1} has an empty description.`);
      }
      if (li.quantity <= 0) {
        errors.push(`Line item #${idx + 1} quantity must be greater than zero.`);
      }
      if (li.unitPrice < 0) {
        errors.push(`Line item #${idx + 1} price cannot be negative.`);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (presentImmediately: boolean) => {
    if (!validate()) return;
    if (!activeRequest) return;

    setIsSubmitting(true);
    try {
      const quoteId = await createQuote({
        siteId: activeRequest.siteId,
        requestId: activeRequest.id,
        equipmentId: activeRequest.equipmentId,
        equipmentName: activeRequest.equipmentName,
        title: title.trim(),
        description: description.trim(),
        discount,
        terms: terms.trim(),
        lineItems: lineItems.map((li) => ({
          description: li.description.trim(),
          quantity: li.quantity,
          unitPrice: li.unitPrice,
        })),
        staffAuthor: 'Fieldline Operations Desk',
      });

      if (presentImmediately) {
        await presentQuoteToCustomer(quoteId);
      }

      router.push(`/admin-demo/quotes/${quoteId}`);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save quotation';
      setValidationErrors([errorMsg]);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin-demo/quotes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quotations Queue</span>
        </Link>
      </div>

      {/* Main Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 mb-1">
          <FileText className="w-4 h-4" />
          <span>NEW DIGITAL QUOTATION BUILDER</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Prepare Commercial Quotation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Specify parts, labor, and commercial scope linked to an active client service request.
        </p>
      </div>

      {/* Errors Banner */}
      {validationErrors.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Please correct the following errors:</span>
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Associated Request & Venue Context */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
          1. Associated Service Request &amp; Venue
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Select Client Work Order:
            </label>
            <select
              value={selectedRequestId}
              onChange={(e) => handleRequestChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {requests.map((r) => {
                const site = getCustomerSite(r.siteId);
                return (
                  <option key={r.id} value={r.id}>
                    {r.ticketNumber} — {site?.name} ({r.equipmentName})
                  </option>
                );
              })}
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Selected Venue Details
            </span>
            <p className="font-bold text-slate-900">{activeSite?.name}</p>
            <p className="text-slate-500 text-[11px]">
              Account: {activeSite?.accountNumber} • Contact: {activeSite?.contact.name} ({activeSite?.contact.phone})
            </p>
          </div>
        </div>
      </div>

      {/* Scope Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
          2. Quotation Title &amp; Scope Summary
        </h2>

        <div className="space-y-4">
          <Input
            label="Quotation Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Combi Oven Magnetron & Relay Replacement"
            required
          />

          <Textarea
            label="Proposed Scope of Works & Diagnostic Findings"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detail components to be replaced, calibration procedures, and testing standards..."
            rows={3}
            required
          />
        </div>
      </div>

      {/* Line Items Table Builder */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              3. Itemized Bill of Materials &amp; Labor
            </h2>
            <p className="text-xs text-slate-500">
              Define quantities, unit prices, and description for every line item.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddLineItem}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Line Item
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3 w-24">Qty</th>
                <th className="py-2.5 px-3 w-32">Unit Price (£)</th>
                <th className="py-2.5 px-3 w-32 text-right">Line Total</th>
                <th className="py-2.5 px-3 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lineItems.map((item, index) => {
                const total = calculateLineTotal(item.quantity, item.unitPrice);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        placeholder="Description of parts or labor..."
                        value={item.description}
                        onChange={(e) =>
                          handleUpdateLineItem(item.id, 'description', e.target.value)
                        }
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="0.5"
                        min="0.1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateLineItem(item.id, 'quantity', e.target.value)
                        }
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-center"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono">
                          £
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleUpdateLineItem(item.id, 'unitPrice', e.target.value)
                          }
                          className="w-full pl-6 pr-2 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-right"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                      {formatGbp(total)}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveLineItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Summary Calculation */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-end items-end gap-3 text-xs">
          <div className="w-full sm:w-72 space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold text-slate-900">{formatGbp(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Credit / Discount (£):</span>
              <input
                type="number"
                min="0"
                step="5"
                value={discount}
                onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-24 p-1 text-right text-xs rounded border border-slate-200 font-mono bg-white"
              />
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
              <span>Final Total:</span>
              <span className="text-amber-700 font-mono">{formatGbp(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
          4. Commercial Warranty &amp; Terms
        </h2>

        <Textarea
          label="Illustrative Quotation Terms"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          rows={2}
        />
      </div>

      {/* Action Buttons */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase font-bold text-amber-400">
            DISPATCH SIMULATION CONTROLS
          </span>
          <p className="text-xs text-slate-400 mt-0.5">
            Choose whether to keep this quote as an internal draft or present it directly to the customer.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => handleSubmit(false)}
            isLoading={isSubmitting}
            className="bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            Save as Draft (Staff Only)
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => handleSubmit(true)}
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Present to Customer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading quote creator...
        </div>
      }
    >
      <CreateQuoteFormContent />
    </Suspense>
  );
}
