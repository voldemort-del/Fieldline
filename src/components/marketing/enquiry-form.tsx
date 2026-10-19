'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { EquipmentCategory, IndustryType } from '@/types';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface FormState {
  businessName: string;
  contactName: string;
  businessEmail: string;
  phone: string;
  siteLocation: string;
  industry: IndustryType | 'other';
  equipmentCategory: EquipmentCategory;
  equipmentDetails: string;
  issueDescription: string;
  requestedTiming: 'immediate_emergency' | 'within_24h' | 'within_3_days' | 'routine_quote';
}

const initialFormState: FormState = {
  businessName: '',
  contactName: '',
  businessEmail: '',
  phone: '',
  siteLocation: '',
  industry: 'restaurants',
  equipmentCategory: 'combi_oven',
  equipmentDetails: '',
  issueDescription: '',
  requestedTiming: 'within_24h',
};

export function EnquiryForm() {
  const { submitEnquiry } = useFieldline();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Please enter your business or trading name.';
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Please provide a primary contact name.';
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Please provide a contact email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail.trim())) {
      newErrors.businessEmail = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a direct contact phone number.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid UK phone number.';
    }
    if (!formData.siteLocation.trim()) {
      newErrors.siteLocation = 'Please specify the kitchen site address or postcode.';
    }
    if (!formData.issueDescription.trim()) {
      newErrors.issueDescription = 'Please describe the fault symptoms or maintenance required.';
    } else if (formData.issueDescription.trim().length < 15) {
      newErrors.issueDescription = 'Please provide a slightly more detailed fault description (minimum 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const ref = await submitEnquiry(formData);
      setSubmittedRef(ref);
    } catch {
      setErrors({ businessName: 'A simulated connection issue occurred. Please retry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmittedRef(null);
  };

  // SUCCESS STATE (Simulated Receipt)
  if (submittedRef) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm animate-in fade-in duration-300">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 rounded-md mb-2">
              Simulation Received
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Service Enquiry Simulated
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Your mock service enquiry has been processed locally in demonstration mode.
            </p>
          </div>

          {/* Reference Receipt Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-5 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-sans font-medium">Enquiry Reference:</span>
              <span className="text-amber-700 font-bold text-sm">{submittedRef}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700 font-sans">
              <div>
                <span className="text-slate-400 block text-[11px]">Business:</span>
                <span className="font-semibold text-slate-900">{formData.businessName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Contact:</span>
                <span className="font-semibold text-slate-900">{formData.contactName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Category:</span>
                <span className="capitalize">{formData.equipmentCategory.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Priority:</span>
                <span className="capitalize">{formData.requestedTiming.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* Simulation Notice */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-left flex gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Demonstration Mode Notice</p>
              <p className="text-amber-800 leading-relaxed">
                This is a portfolio website demonstration. No real technician has been dispatched, and no external emails or notifications have been sent. This record is held in your browser session and will be visible in the Stage 3 operations queue.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              href="/portal-demo"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Customer Portal Demo
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="md"
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Submit Another Test Enquiry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE FORM
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6"
    >
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Interactive Service Request Form</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
          Request Commercial Equipment Assistance
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete the form below to simulate logging an equipment repair, inspection, or maintenance request.
        </p>
      </div>

      {/* Grid: Business Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Business or Trading Name"
          name="businessName"
          placeholder="e.g. The Dorchester Bistro, Apex Care Home"
          required
          value={formData.businessName}
          onChange={handleChange}
          error={errors.businessName}
        />

        <Input
          label="Primary Contact Person"
          name="contactName"
          placeholder="e.g. Chef Marcus Vance, Facilities Lead"
          required
          value={formData.contactName}
          onChange={handleChange}
          error={errors.contactName}
        />

        <Input
          label="Business Email Address"
          name="businessEmail"
          type="email"
          placeholder="marcus@thebistro.co.uk"
          required
          value={formData.businessEmail}
          onChange={handleChange}
          error={errors.businessEmail}
        />

        <Input
          label="Direct Contact Phone"
          name="phone"
          type="tel"
          placeholder="07700 900482 or 020 7946 0110"
          required
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
      </div>

      {/* Location & Sector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Kitchen Site Location / Postcode"
          name="siteLocation"
          placeholder="e.g. 42 High Street, Manchester, M1 4BT"
          required
          value={formData.siteLocation}
          onChange={handleChange}
          error={errors.siteLocation}
        />

        <Select
          label="Industry / Sector"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          options={[
            { value: 'restaurants', label: 'Restaurant / Gastro Pub' },
            { value: 'hotels', label: 'Hotel & Hospitality' },
            { value: 'contract_catering', label: 'Contract & Education Catering' },
            { value: 'care_facilities', label: 'Care Home / Healthcare Facility' },
            { value: 'other', label: 'Other Commercial Kitchen' },
          ]}
        />
      </div>

      {/* Equipment Category & Urgency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
        <Select
          label="Equipment Category"
          name="equipmentCategory"
          value={formData.equipmentCategory}
          onChange={handleChange}
          options={[
            { value: 'combi_oven', label: 'Combination Oven (e.g. Rational, Lainox)' },
            { value: 'prime_cooking', label: 'Prime Cooking Range / Fryer / Griddle' },
            { value: 'refrigeration', label: 'Refrigeration / Walk-in / Blast Chiller' },
            { value: 'warewashing', label: 'Commercial Dishwasher / Glasswasher' },
            { value: 'ventilation_extraction', label: 'Kitchen Extraction & Canopy' },
            { value: 'beverage_prep', label: 'Boiler / Coffee Prep / Food Processor' },
          ]}
        />

        <Select
          label="Requested Timing / Urgency"
          name="requestedTiming"
          value={formData.requestedTiming}
          onChange={handleChange}
          options={[
            { value: 'immediate_emergency', label: 'Critical Emergency (Total Kitchen Stoppage)' },
            { value: 'within_24h', label: 'High Priority (Within 24 Hours)' },
            { value: 'within_3_days', label: 'Standard Diagnostic Visit (1-3 Days)' },
            { value: 'routine_quote', label: 'Planned Maintenance / Non-Urgent Quote' },
          ]}
        />
      </div>

      {/* Equipment Details (Make/Model) */}
      <Input
        label="Equipment Make & Model (Optional)"
        name="equipmentDetails"
        placeholder="e.g. Rational iCombi Pro 10-1/1, Serial #E11SI2209..."
        helperText="Providing exact model and serial numbers accelerates parts identification."
        value={formData.equipmentDetails}
        onChange={handleChange}
      />

      {/* Fault Description */}
      <Textarea
        label="Description of the Issue / Symptoms"
        name="issueDescription"
        placeholder="Describe what occurred, any error codes displayed (e.g., Error E34-2, gas ignition failure), temperature readings, or strange noises..."
        required
        rows={4}
        value={formData.issueDescription}
        onChange={handleChange}
        error={errors.issueDescription}
      />

      {/* Simulation Transparency Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-600">
        <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-slate-800">Portfolio Simulation Mode:</span>{' '}
          Submitting this form stores your demonstration request in your browser's local storage. No real company or field engineer is contacted.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          Fieldline Demonstration • No commitment or real service charges
        </p>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full sm:w-auto min-w-[200px]"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Submit Demo Enquiry
        </Button>
      </div>
    </form>
  );
}
