import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/marketing/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Utensils,
  Hotel,
  Building2,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

export default function IndustriesPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>Sector-Specific Service Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Tailored Maintenance for Demanding Commercial Food Operations
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            A boutique fine dining kitchen has completely different operational pressures than a 200-bed care home or a hotel banqueting hall. Discover how Fieldline aligns with your sector.
          </p>
          <div className="pt-2">
            <Button
              href="/request-service"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request a Sector Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Sector 1: Restaurants */}
      <section id="restaurants" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Utensils className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Sector Profile 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Restaurants, Bistros &amp; Gastro Pubs
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="primary"
              size="md"
              className="shrink-0"
            >
              Request Restaurant Service
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                In high-tempo restaurants, service runs on precise timing. When your primary 10-grid combi oven trips out during Friday evening dinner service, table turnover collapses and kitchen stress escalates instantly.
              </p>
              <p>
                Fieldline supports restaurant operators through fast phone triage and rapid diagnostic visits. We focus on prime cooking suites, solid tops, induction planchas, fryers, and undercounter refrigeration to preserve table turnaround and menu integrity.
              </p>

              <h4 className="font-bold text-slate-900 pt-2">Key Operational Priorities:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Peak Hour Protection:</strong> Priority dispatch triage structured around lunch (12:00–14:30) and dinner (18:00–22:00) service windows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Rapid Combi Oven Fixes:</strong> Direct parts supply for Rational, Lainox, and Unox combi oven heating elements and steam sensors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pass-Through Dishwashing:</strong> Keeping warewashers sanitized and operational to prevent glassware and crockery bottlenecks.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Typical Restaurant Kitchen Inventory</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                  <span className="font-medium text-slate-800">Prime Cooking Suite</span>
                  <span className="text-slate-500">6-Burner Ranges, Griddles, Salamanders</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                  <span className="font-medium text-slate-800">Combi Ovens</span>
                  <span className="text-slate-500">6-Grid &amp; 10-Grid Steam Injection</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                  <span className="font-medium text-slate-800">Refrigeration Line</span>
                  <span className="text-slate-500">Prep Counters, Saladettes, Undercounters</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                  <span className="font-medium text-slate-800">Warewashing</span>
                  <span className="text-slate-500">Hood-type Dishwasher, High-speed Glasswasher</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector 2: Hotels */}
      <section id="hotels" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                <Hotel className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Sector Profile 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Hotels, Resorts &amp; Banqueting Venues
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Request Hotel Service
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Hotel kitchens rarely shut down completely. Between dawn breakfast services, afternoon conference banquets, room service, and evening fine dining, appliances experience non-stop duty cycles.
              </p>
              <p>
                Large walk-in cold rooms and blast chillers represent major capital investments and store thousands of pounds of perishable stock. Fieldline offers structured preventative care and remote asset monitoring to prevent catastrophic refrigeration compressor failures.
              </p>

              <h4 className="font-bold text-slate-900 pt-2">Key Operational Priorities:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Coldroom &amp; Freezer Integrity:</strong> Systematic inspection of condensing units, defrost timers, and door heaters to safeguard high-value hotel inventory.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Multi-Kitchen Coordination:</strong> Supporting main production kitchens, pastry bakeries, and bar areas under a single service contract.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pre-Event Inspections:</strong> Scheduled testing prior to large wedding or conference seasons to eliminate banquet breakdowns.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Featured Hotel Demo Profile</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                In our upcoming customer portal demo, you can inspect the asset register of our fictional client <strong>The Grandview Hotel &amp; Spa</strong>, featuring 18 tracked kitchen assets across three kitchen zones.
              </p>
              <div className="pt-2">
                <Button
                  href="/portal-demo"
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Preview Hotel Portal View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector 3: Contract Caterers */}
      <section id="caterers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Sector Profile 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Contract &amp; Education Caterers
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Contract Catering Support
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Contract caterers operate within strict contractual service level agreements. Whether feeding thousands of corporate employees or hundreds of university students, meal production cannot be delayed or compromised.
              </p>
              <p>
                Fieldline understands the rhythm of contract catering contracts, coordinating major PPM overhauls and deep descaling during academic recess or corporate shutdown windows.
              </p>

              <h4 className="font-bold text-slate-900 pt-2">Key Operational Priorities:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>High-Capacity Batches:</strong> Servicing 20-grid roll-in combi ovens, bratt pans, boiling pans, and multi-tank rack conveyor dishwashers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Holiday Overhauls:</strong> Dedicated summer and winter shutdown maintenance schedules to prepare equipment for intense academic terms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Audit-Ready Compliance:</strong> Ensuring CP42 gas safety and ventilation certificates are instantly accessible for client facilities audits.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Heavy Production Appliances Supported</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">Roll-in 20-1/1 &amp; 20-2/1 Combi Ovens</span>
                  <span className="text-slate-500">Rational iCombi, Lainox Naboo, Convotherm</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">Tilting Bratt Pans &amp; Kettles</span>
                  <span className="text-slate-500">Electrolux Professional, Falcon, Blue Seal</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">Flight &amp; Rack Conveyor Dishwashers</span>
                  <span className="text-slate-500">Hobart, Winterhalter, Meiko</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector 4: Care Facilities */}
      <section id="care" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Sector Profile 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Care Homes &amp; Healthcare Facilities
                </h2>
              </div>
            </div>

            <Button
              href="/request-service"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Care Home Support
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
            <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed">
              <p>
                In residential care homes and healthcare institutions, food safety is a matter of critical clinical health. Elderly and vulnerable residents depend on timely, nutritionally balanced, texture-modified meals with zero room for foodborne contamination.
              </p>
              <p>
                Refrigeration temperature records and warewashing thermal disinfection temperatures are closely scrutinized by Care Quality Commission (CQC) and environmental health inspectors. Fieldline provides prioritized breakdown response and strict temperature validation.
              </p>

              <h4 className="font-bold text-slate-900 pt-2">Key Operational Priorities:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Thermal Sanitization Proving:</strong> Verifying warewasher final rinse temperatures meet 82°C thermal disinfection standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero-Downtime Refrigeration:</strong> Rapid replacement of refrigeration seals, fan motors, and backup cooling to prevent food spoilage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>CQC &amp; Audit Ready:</strong> Digital inspection reports proving maintenance compliance readily exportable for inspection visits.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Featured Healthcare Demo Profile</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                In our upcoming customer portal demo, inspect the profile of our fictional client <strong>Oakwood Care Suites</strong>, showcasing care facility compliance certificates and temperature inspection logs.
              </p>
              <div className="pt-2">
                <Button
                  href="/portal-demo"
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Preview Care Facility View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Discuss Your Kitchen Facility Requirements
        </h3>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Contact our service team via our interactive enquiry form to simulate an asset review or equipment callout.
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
            Launch Portal Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
