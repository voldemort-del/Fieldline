import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/marketing/section-header';
import { PortalPreviewSection } from '@/components/marketing/portal-preview-section';
import {
  Wrench,
  ShieldCheck,
  CalendarCheck,
  Building2,
  Clock,
  ArrowRight,
  Flame,
  Snowflake,
  Sparkles,
  Zap,
  CheckCircle2,
  HelpCircle,
  FileText,
  ChevronRight,
  Utensils,
  Hotel,
  HeartHandshake,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-slate-100 text-xs font-medium border border-slate-800 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Commercial Kitchen Asset Servicing</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 font-mono text-[11px]">UK Nationwide Concept</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
                Protecting Commercial Kitchen Uptime{' '}
                <span className="text-amber-600 block sm:inline">When Service Counts.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                Specialist catering equipment maintenance, structured breakdown triage, and statutory gas compliance for high-volume restaurants, hotels, care facilities, and contract caterers.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button
                  href="/request-service"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-md"
                >
                  Request a Service Visit
                </Button>

                <Button
                  href="/portal-demo"
                  variant="outline"
                  size="lg"
                  leftIcon={<Sparkles className="w-4 h-4 text-amber-600" />}
                >
                  Explore Customer Portal Demo
                </Button>
              </div>

              {/* Service Commitments Micro-bar */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">Priority Triage Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">Gas &amp; Electrical Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">Digital Asset History</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Engineering Terminal / Asset Schematic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-2xl text-slate-200 space-y-5">
                {/* Visual Terminal Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="font-mono text-[11px] text-slate-300 ml-2">FIELDLINE SERVICE DESK</span>
                  </div>
                  <span className="font-mono text-amber-500 text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    LIVE TRIAGE
                  </span>
                </div>

                {/* Simulated Active Asset Monitor */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-500" />
                        Rational iCombi Pro 10-1/1
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        ONLINE • CALIBRATED
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                      <span>Location: Main Cookline</span>
                      <span>Next PPM: 15 Nov 2026</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Snowflake className="w-4 h-4 text-blue-400" />
                        Foster EcoPro G3 Chiller
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        DIAGNOSTIC DISPATCHED
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                      <span>Target: Coldroom +2°C</span>
                      <span>Engineer: Assigned (En Route)</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        Hobart PREMAX Pass-through
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        CP42 GAS CERTIFIED
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                      <span>Rinse Boiler: 82°C Sanitise</span>
                      <span>Audit: Valid Until Dec 2026</span>
                    </div>
                  </div>
                </div>

                {/* Floating Interactive Trigger */}
                <div className="pt-2 text-center">
                  <Link
                    href="/portal-demo"
                    className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
                  >
                    <span>Inspect live portal equipment register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SERVICES OVERVIEW (Differentiated Layouts)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Capabilities"
          title="Engineered for Commercial Kitchen Reliability"
          description="Every commercial kitchen relies on interconnected thermal, refrigeration, and warewashing systems. Fieldline structures service delivery around four distinct disciplines."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service 1: Emergency Repairs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:border-amber-500/60 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Commercial Equipment Breakdown Repairs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When a combi oven fails during prep or a refrigeration compressor shuts down before service, operational downtime costs money. Fieldline provides structured fault logging, systematic phone triage, and swift technician dispatch equipped with diagnostic parts.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Gas, electric &amp; steam combi oven diagnostics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Refrigeration leak detection &amp; compressor replacements
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Warewasher booster pumps &amp; chemical dosing calibration
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/services#emergency-repairs"
                className="text-xs font-semibold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
              >
                <span>Read detailed repair procedures</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 2: Planned Preventative Maintenance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:border-amber-500/60 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Planned Preventative Maintenance (PPM)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Emergency repairs are reactive; planned maintenance preserves kitchen longevity. Fieldline designs proactive service schedules that inspect wear items, descale heating boilers, recalibrate thermostats, and clean condenser coils before catastrophic failures happen.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  Customized quarterly or semi-annual maintenance intervals
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  Detailed multi-point mechanical inspection checklists
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  Digital equipment life-expectancy forecasting
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/services#planned-ppm"
                className="text-xs font-semibold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
              >
                <span>Explore preventative contracts</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 3: Statutory Inspections */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:border-amber-500/60 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Statutory Gas &amp; Electrical Inspections
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                UK commercial kitchen operators carry strict statutory obligations regarding gas safety, extraction interlocks, and electrical soundness. Fieldline conducts systematic inspections, recording outcomes directly into the customer portal for auditor inspection.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  Commercial Gas Safety (CP42) inspection simulation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  Canopy interlock &amp; gas solenoid verification
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  Downloadable compliance certificates in portal
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/services#gas-safety"
                className="text-xs font-semibold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
              >
                <span>Review compliance standards</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 4: Multi-Site Fleet Management */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:border-amber-500/60 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Multi-Site Estate &amp; Asset Management
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For restaurant groups, hotel chains, and contract caterers operating across multiple regional venues, managing separate local engineers creates chaos. Fieldline centralizes asset tracking, service logs, and billing across all properties.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Consolidated multi-venue equipment registers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Unified work order tracking across estate locations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Standardized SLAs and single point of service contact
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/services#multi-site"
                className="text-xs font-semibold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
              >
                <span>Learn about multi-site programmes</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INDUSTRIES SERVED
         ========================================================================= */}
      <section className="bg-slate-900 text-white py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              Sector Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3">
              Specialized Service for High-Stakes Food Operations
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
              Every catering environment operates under distinct operational pressures, compliance frameworks, and production cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Restaurant */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Restaurants &amp; Bistros</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rapid turnaround during peak lunch and dinner services. Focus on combi cooking ranges, induction hobs, and rapid dishwashing cycles.
              </p>
              <Link
                href="/industries#restaurants"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 pt-1"
              >
                <span>Restaurant workflows</span> &rarr;
              </Link>
            </div>

            {/* Hotels */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Hotel className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Hotels &amp; Hospitality</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                24/7 catering demands spanning breakfast buffets, banqueting halls, and room service. Emphasis on walk-in cold rooms and heavy-duty warewashers.
              </p>
              <Link
                href="/industries#hotels"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 pt-1"
              >
                <span>Hotel solutions</span> &rarr;
              </Link>
            </div>

            {/* Contract Caterers */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Contract Caterers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-volume institutional meal production for corporate offices and educational campuses. Planned preventative maintenance scheduled around academic breaks.
              </p>
              <Link
                href="/industries#caterers"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 pt-1"
              >
                <span>Contract catering</span> &rarr;
              </Link>
            </div>

            {/* Care Facilities */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Care &amp; Healthcare</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vulnerable resident meal provision with zero tolerance for thermal degradation. Statutory food hygiene logging and thermal disinfection compliance.
              </p>
              <Link
                href="/industries#care"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 pt-1"
              >
                <span>Healthcare standards</span> &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRANSPARENT SERVICE PROCESS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Clear Workflow"
          title="How Fieldline Coordinates Service"
          description="A clear, dependable process from initial fault report through engineer allocation to verified digital sign-off."
          centered
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs relative space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Submit Fault &amp; Asset Data
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Log your fault via our online service form or client portal. Provide equipment serial numbers, location in the kitchen, and error codes to fast-track diagnostics.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs relative space-y-4">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center font-mono">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Triage &amp; Engineer Allocation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our service desk evaluates urgency, cross-references warranty or service history, and schedules the visit with an appropriately certified technician (Gas Safe or F-Gas).
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs relative space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-mono">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Diagnostic Visit &amp; Digital Sign-Off
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The technician conducts on-site remediation, records parts used, tests safety thresholds, and submits a digital service report immediately accessible in your portal.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CUSTOMER PORTAL PREVIEW SECTION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortalPreviewSection />
      </section>

      {/* =========================================================================
          FAQ SECTION
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Clear Answers"
          title="Frequently Asked Questions"
          description="Everything you need to know about our commercial kitchen servicing concept and software demonstration."
          centered
        />

        <div className="mt-12 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              What types of commercial catering equipment does Fieldline support?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              The concept covers all prime commercial kitchen apparatus including combination ovens (gas and electric), prime cooking ranges, deep fat fryers, walk-in cold rooms, upright refrigerators, blast chillers, hood-type pass-through dishwashers, and extraction canopy systems.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              How does the interactive customer portal demo work?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              The portal demo gives prospective clients a hands-on preview of how asset registers, service histories, and maintenance schedules look in a modern web application. You can switch between demo venue accounts (such as a hotel or care facility) without needing real customer credentials or a paid backend.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              What happens when I submit a service enquiry on this website?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              In this portfolio demonstration, form submissions are validated and stored locally in your browser session. You receive a simulated reference code, and the request is queued in the demo data store. No real emails or engineer dispatches are generated.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              Can this platform be tailored for real-world commercial companies?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              Yes. The architecture is engineered so that live authentication, PostgreSQL databases (such as Supabase), automated email notifications (SendGrid or Resend), and SMS dispatch can be plugged directly into the component structure without redesigning the interface.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA BANNER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md">
                Ready to Experience Fieldline?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Request a Service Visit or Launch the Portal Demo
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                Experience how streamlined equipment logging, proactive PPM management, and clear digital records keep commercial catering kitchens operating at peak efficiency.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button
                href="/request-service"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full justify-center"
              >
                Request a Service Visit
              </Button>
              <Button
                href="/portal-demo"
                variant="outline"
                size="lg"
                className="w-full justify-center bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
              >
                Launch Portal Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
