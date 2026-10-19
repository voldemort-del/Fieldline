import React from 'react';
import { EnquiryForm } from '@/components/marketing/enquiry-form';
import { SectionHeader } from '@/components/marketing/section-header';
import {
  ShieldAlert,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  FileText,
  Wrench,
  HelpCircle,
} from 'lucide-react';

export default function RequestServicePage() {
  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-14 pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
            <Wrench className="w-3.5 h-3.5" />
            <span>Interactive Service Intake Workflow</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Request Commercial Kitchen Equipment Service
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Report an equipment fault, schedule planned maintenance, or request a statutory gas compliance audit.
          </p>
        </div>
      </section>

      {/* Main Form & Context Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Enquiry Form (8 columns) */}
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>

          {/* Supportive Context & Protocol Sidebar (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Triage Protocol Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Service Intake Protocol
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To maximize our first-time fix capability, all requests are routed through structured diagnostics:
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span><strong>Fault Verification:</strong> Symptoms and error codes matched against manufacturer technical bulletins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span><strong>Parts Pre-Allocation:</strong> Technicians allocated with likely wear-items based on equipment model.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span><strong>Digital Audit Trail:</strong> The full work order and resolution report updates to the customer portal.</span>
                </li>
              </ul>
            </div>

            {/* Emergency Hotline Simulation */}
            <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Simulated Service Desk
              </span>
              <h4 className="font-bold text-white text-base">
                Urgent Breakdown Hotline
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                For major gas leaks, dangerous electrical faults, or total kitchen stoppage during live service:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-sm text-amber-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>020 7946 0192 (Demo)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Simulated number. For real-world emergencies, contact local emergency services or national gas emergency.
              </p>
            </div>

            {/* Portfolio Mode Card */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Demonstration Mode Note</span>
              </div>
              <p className="leading-relaxed text-amber-800">
                This service form illustrates how a commercial kitchen repair firm can capture structured equipment, site, and urgency data. Submitting the form simulates receipt, generates a tracking reference, and saves the record in your browser session for inspection in the operations dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
