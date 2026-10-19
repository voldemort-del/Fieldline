'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { ServicePriority } from '@/types';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Wrench,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Server,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

function NewRequestFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activeSite, getSiteEquipment, createServiceRequest, requests } = useFieldline();

  const siteEquipment = getSiteEquipment();
  const preselectedEquipmentId = searchParams.get('equipmentId') || '';

  const [equipmentId, setEquipmentId] = useState(
    preselectedEquipmentId || (siteEquipment[0] ? siteEquipment[0].id : '')
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ServicePriority>('standard');
  const [requestedTiming, setRequestedTiming] = useState<
    'immediate_emergency' | 'within_24h' | 'within_3_days' | 'routine_quote'
  >('within_24h');
  const [reportedBy, setReportedBy] = useState(activeSite.contact.name);
  const [contactPhone, setContactPhone] = useState(activeSite.contact.phone);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicketNumber, setCreatedTicketNumber] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedEquipmentId && siteEquipment.some((e) => e.id === preselectedEquipmentId)) {
      setEquipmentId(preselectedEquipmentId);
    }
  }, [preselectedEquipmentId, siteEquipment]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!equipmentId) {
      newErrors.equipmentId = 'Please select a registered kitchen asset.';
    }
    if (!title.trim()) {
      newErrors.title = 'Please provide a concise issue summary (e.g., Oven not reaching temperature).';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Summary must be at least 5 characters.';
    }
    if (!description.trim()) {
      newErrors.description = 'Please detail the fault symptoms or error codes observed.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please provide a slightly more descriptive fault report (min 15 characters).';
    }
    if (!reportedBy.trim()) {
      newErrors.reportedBy = 'Please state who is reporting this issue.';
    }
    if (!contactPhone.trim()) {
      newErrors.contactPhone = 'Please provide an on-site contact number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const ticketRef = await createServiceRequest({
        equipmentId,
        title,
        description,
        priority,
        requestedTiming,
        reportedBy,
        contactPhone,
      });

      setCreatedTicketNumber(ticketRef);
    } catch {
      setErrors({ title: 'A simulated connection fault occurred. Please retry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedEquipment = siteEquipment.find((e) => e.id === equipmentId);

  // SUCCESS CONFIRMATION STATE
  if (createdTicketNumber) {
    const createdRequest = requests.find((r) => r.ticketNumber === createdTicketNumber);

    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded">
            Ticket Logged Successfully
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Service Request Created
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Your breakdown request has been stored in demonstration state and allocated a tracking reference.
          </p>
        </div>

        {/* Reference Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
            <span className="text-slate-500 font-medium">Ticket Reference:</span>
            <span className="font-mono text-base font-bold text-amber-700">
              {createdTicketNumber}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-slate-700">
            <div>
              <span className="text-slate-400 block text-[11px]">Venue Site:</span>
              <span className="font-semibold text-slate-900">{activeSite.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Equipment Unit:</span>
              <span className="font-semibold text-slate-900">{selectedEquipment?.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Priority:</span>
              <span className="capitalize font-semibold">{priority.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Initial Status:</span>
              <span className="text-amber-700 font-semibold uppercase">Submitted</span>
            </div>
          </div>
        </div>

        {/* Simulation Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Portfolio Demonstration Notice:</strong> This request has been saved to your browser session and is now visible on the Dashboard and Requests Hub. In Stage 3, it will automatically populate the internal staff operations dispatch queue. No real technician has been contacted.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {createdRequest && (
            <Button
              href={`/portal-demo/requests/${createdRequest.id}`}
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Ticket Details
            </Button>
          )}
          <Button
            href="/portal-demo/dashboard"
            variant="outline"
            size="md"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // ACTIVE REQUEST FORM
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Breadcrumb */}
      <Link
        href="/portal-demo/requests"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Service Requests Hub</span>
      </Link>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="border-b border-slate-100 pb-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
            <Wrench className="w-4 h-4 text-amber-500" />
            <span>Interactive Fault Logging Flow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Log Commercial Equipment Service Request
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Venue: <strong className="text-slate-700">{activeSite.name}</strong> • Account: {activeSite.accountNumber}
          </p>
        </div>

        {/* Step 1: Select Equipment */}
        <div className="space-y-4">
          <Select
            label="Select Registered Kitchen Equipment"
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            required
            error={errors.equipmentId}
            options={siteEquipment.map((eq) => ({
              value: eq.id,
              label: `${eq.name} (${eq.location} — ${eq.assetTag})`,
            }))}
          />

          {selectedEquipment && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-900">{selectedEquipment.name}</span>
                <p className="text-[11px] text-slate-500">
                  Model: {selectedEquipment.model} • Serial: {selectedEquipment.serialNumber} • Location: {selectedEquipment.location}
                </p>
              </div>
              <span className="text-[11px] font-mono font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                {selectedEquipment.assetTag}
              </span>
            </div>
          )}
        </div>

        {/* Step 2: Issue Summary & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <Select
            label="Service Urgency / Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as ServicePriority)}
            options={[
              { value: 'standard', label: 'Standard Diagnostic Visit (Routine)' },
              { value: 'high', label: 'High Priority (Within 24 Hours)' },
              { value: 'emergency', label: 'Critical Emergency (Total Kitchen Stoppage)' },
              { value: 'scheduled_ppm', label: 'Planned Preventative Maintenance (PPM)' },
            ]}
          />

          <Select
            label="Requested Attendance Timing"
            value={requestedTiming}
            onChange={(e) =>
              setRequestedTiming(
                e.target.value as 'immediate_emergency' | 'within_24h' | 'within_3_days' | 'routine_quote'
              )
            }
            options={[
              { value: 'within_24h', label: 'Next Available Engineer Slot' },
              { value: 'immediate_emergency', label: 'Urgent Same-Day Dispatch' },
              { value: 'within_3_days', label: 'Within 2-3 Working Days' },
              { value: 'routine_quote', label: 'Specific Off-Peak Window' },
            ]}
          />
        </div>

        {/* Short Summary Title */}
        <Input
          label="Fault Headline / Short Summary"
          placeholder="e.g. Temperature fluctuating above +4°C threshold, Gas burner ignition spark failure..."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />

        {/* Detailed Fault Description */}
        <Textarea
          label="Detailed Problem Symptoms &amp; Error Codes"
          placeholder="Please describe what happened, any digital error codes shown on display, whether strange noises or gas odours occurred, and current state of the equipment..."
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        {/* Step 3: On-Site Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <Input
            label="Reported By (On-Site Staff)"
            value={reportedBy}
            onChange={(e) => setReportedBy(e.target.value)}
            required
            error={errors.reportedBy}
          />

          <Input
            label="Direct Contact Phone Number"
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            required
            error={errors.contactPhone}
          />
        </div>

        {/* Transparency Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-2.5 text-xs text-slate-500">
          <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong>Interactive Portfolio Simulation:</strong> Submitting creates a real simulated work order in your browser session. It will immediately be visible on the dashboard and requests list.
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <Button
            href="/portal-demo/requests"
            variant="ghost"
            size="md"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full sm:w-auto min-w-[200px] font-semibold"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Submit Service Request
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function NewServiceRequestPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading form...</div>}>
      <NewRequestFormContent />
    </Suspense>
  );
}
