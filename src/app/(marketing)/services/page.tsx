import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/marketing/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Wrench,
  CalendarCheck,
  ShieldCheck,
  Layers,
  ArrowRight,
  Flame,
  Snowflake,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  FileCheck2,
} from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
            <Wrench className="w-3.5 h-3.5" />
            <span>Commercial Kitchen Engineering Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Specialist Servicing for Commercial Catering Appliances
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            From emergency burner ignition and refrigeration gas leaks to planned descaling schedules and statutory gas compliance audits.
          </p>
          <div className="pt-2">
            <Button
              href="/request-service"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request a Service Visit
            </Button>
          </div>
        </div>
      </section>

      {/* Service 1: Emergency Repairs */}
      <section id="emergency-repairs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Wrench className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Service Category 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Commercial Equipment Breakdown Repairs
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shrink-0"
            >
              Log Breakdown Request
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                A commercial catering equipment failure halts food production, compromises food hygiene compliance, and creates immediate kitchen distress. Fieldline operates a systematic triage approach designed to diagnose the fault accurately before dispatching a certified technician.
              </p>
              <p>
                Our service methodology emphasizes first-time fix rates by capturing exact equipment serial numbers, manufacturer error codes, and symptoms during intake. Engineers arrive equipped with common high-failure components including heating elements, contactors, thermostats, solenoids, and thermocouple sensors.
              </p>

              <h4 className="font-bold text-slate-900 pt-2">Typical Faults We Address:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Combi Ovens:</strong> Steam boiler descaling lockouts, fan motor failure, ignition controller faults, door gasket leaks, and probe calibration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Refrigeration:</strong> Evaporator icing, digital controller failure, compressor burnout, fan motor seizure, and refrigerant charge loss.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Warewashing:</strong> Wash pump seal leaks, rinse boiler temperature drops, chemical peristaltic pump failures, and drainage valve blocks.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Repair Protocol Specifications</h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-500">Service Coverage:</span>
                  <span className="font-semibold text-slate-900">Gas, Electric &amp; Steam Catering Assets</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-500">Intake Channels:</span>
                  <span className="font-semibold text-slate-900">Online Form, Customer Portal, Service Desk</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-500">Field Diagnostics:</span>
                  <span className="font-semibold text-slate-900">Digital Fault Audit &amp; Resistance Testing</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-500">Parts Tracking:</span>
                  <span className="font-semibold text-slate-900">Recorded on Digital Work Order</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Sign-Off:</span>
                  <span className="font-semibold text-slate-900">Customer Digital Signature + Portal PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Planned Maintenance (PPM) */}
      <section id="planned-ppm" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Service Category 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Planned Preventative Maintenance (PPM)
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Inquire About PPM
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                In a commercial kitchen, equipment does not suddenly fail without early degradation. Scale builds up inside combi steam generators, grease clogs refrigeration condenser fins, and calcium blocks warewasher boiler elements.
              </p>
              <p>
                Fieldline's Planned Preventative Maintenance programs are structured on an asset-by-asset schedule tailored to your production volume. Scheduled visits take place outside peak service times to minimize interruption.
              </p>

              <h4 className="font-bold text-slate-900 pt-2">Comprehensive PPM Checklist Includes:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Thermal Calibration:</strong> Thermostat verification against calibrated secondary temperature probes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Refrigeration Airflow:</strong> High-pressure coil cleaning, airflow checking, and door seal integrity tests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Water Filtration &amp; Descaling:</strong> Water softener hardness testing and chemical descaling cycles.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Contract Tiers &amp; Schedules</h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Comprehensive Plus Tier</span>
                  <p className="text-slate-500">Bi-monthly comprehensive servicing, priority breakdown response, all routine servicing labour included.</p>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Preventative Core Tier</span>
                  <p className="text-slate-500">Semi-annual preventative audits, safety certificate renewals, and discounted emergency callout rates.</p>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">On-Demand Asset Maintenance</span>
                  <p className="text-slate-500">Scheduled asset-by-asset servicing intervals booked ad-hoc via the customer portal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Gas & Electrical Safety */}
      <section id="gas-safety" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Service Category 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Statutory Gas &amp; Electrical Safety Inspections
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Book Safety Inspection
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                In the UK, commercial kitchens operating gas catering appliances must maintain annual gas safety compliance under the Gas Safety (Installation and Use) Regulations. Insurance underwriters and environmental health officers require valid CP42 documentation.
              </p>
              <p>
                Fieldline records every safety inspection directly into your digital portal repository. Inspection findings, gas tightness test results, flame failure device responses, and extraction interlock checks are archived with immutable timestamps.
              </p>
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900">
                <p className="font-semibold">Demonstration Disclosure</p>
                <p className="mt-1">
                  Fieldline is a portfolio demonstration concept. Real-world compliance requires registered Gas Safe and F-Gas certified companies. All certificates presented in our portal preview are demonstration specimens.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <h4 className="font-semibold text-slate-900 text-sm">Statutory Inspection Protocols</h4>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Commercial Gas Safety Record (CP42) Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Gas Interlock System (BS 6173) Proving</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Flame Failure &amp; Solenoid Shut-off Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Canopy Airflow &amp; Differential Pressure Proving</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Portable Appliance Testing (PAT) for Mobile Prep Units</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: Multi-Site Fleet Management */}
      <section id="multi-site" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Service Category 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Multi-Site Fleet &amp; Estate Asset Management
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shrink-0"
            >
              Consult On Multi-Site
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Managing catering equipment across five, ten, or fifty properties introduces severe coordination friction. Facilities managers end up juggling dozens of local sub-contractors with inconsistent service records and opaque pricing.
              </p>
              <p>
                Fieldline centralizes service coordination through a single operational interface. Group directors gain real-time visibility into asset lifespans, repair spend by venue, recurring equipment faults, and forthcoming statutory inspection deadlines.
              </p>

              <h4 className="font-bold text-slate-900 pt-2">Multi-Site Operational Advantages:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Centralized Asset Register:</strong> Complete inventory of ovens, refrigeration units, and warewashers tagged with serial numbers across every kitchen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Standardized Response SLAs:</strong> Uniform breakdown response priority regardless of whether the site is in Central London or a regional hub.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Consolidated Monthly Reporting:</strong> Single itemized billing and operational performance analytics across the entire hospitality portfolio.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Multi-Venue Portal Overview</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our client portal supports parent-child account hierarchies, allowing group management to switch seamlessly between site views or inspect estate-wide metrics.
              </p>
              <div className="p-4 rounded-xl bg-slate-950 text-white space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Group Estate Portfolio:</span>
                  <span className="font-mono text-amber-400">5 Regional Venues</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Registered Assets:</span>
                  <span className="font-mono text-white">84 Tracked Units</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Open Work Orders:</span>
                  <span className="font-mono text-emerald-400">3 Under Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Have an Equipment Requirement or Service Question?
        </h3>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Submit an online service enquiry to simulate our intake workflow or explore the customer portal demo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="/request-service"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Request a Service Visit
          </Button>
          <Button
            href="/portal-demo"
            variant="outline"
            size="lg"
          >
            View Customer Portal Preview
          </Button>
        </div>
      </section>
    </div>
  );
}
