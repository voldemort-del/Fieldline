import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './brand-logo';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Rapid Fault Triage</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Structured response workflows prioritising critical commercial kitchen refrigeration & prime cooking outages.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Statutory Gas & Electrical Records</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Organised digital inspection history and safety sign-off archives for local authority and insurer audits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Purpose-Built Client Portal</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct visibility into registered kitchen assets, open repair tickets, and preventative maintenance schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Fieldline represents a specialist commercial catering equipment servicing concept engineered for UK hospitality, healthcare, and contract catering operations.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Fieldline House, Central London Service Hub (Demonstration Address)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>020 7946 0192 (Simulated UK Service Desk)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>enquiries@fieldline-demo.co.uk (Fictional Contact)</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services#emergency-repairs" className="text-slate-400 hover:text-white transition-colors">
                  Commercial Equipment Repairs
                </Link>
              </li>
              <li>
                <Link href="/services#planned-ppm" className="text-slate-400 hover:text-white transition-colors">
                  Planned Maintenance (PPM)
                </Link>
              </li>
              <li>
                <Link href="/services#gas-safety" className="text-slate-400 hover:text-white transition-colors">
                  Gas & Electrical Safety Inspections
                </Link>
              </li>
              <li>
                <Link href="/services#multi-site" className="text-slate-400 hover:text-white transition-colors">
                  Multi-Site Fleet Management
                </Link>
              </li>
              <li>
                <Link href="/request-service" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Request a Service Visit &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Sectors Served
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/industries#restaurants" className="text-slate-400 hover:text-white transition-colors">
                  Restaurants & Fine Dining
                </Link>
              </li>
              <li>
                <Link href="/industries#hotels" className="text-slate-400 hover:text-white transition-colors">
                  Hotels & Banqueting
                </Link>
              </li>
              <li>
                <Link href="/industries#caterers" className="text-slate-400 hover:text-white transition-colors">
                  Contract & Event Caterers
                </Link>
              </li>
              <li>
                <Link href="/industries#care" className="text-slate-400 hover:text-white transition-colors">
                  Care Homes & Healthcare Kitchens
                </Link>
              </li>
            </ul>
          </div>

          {/* Demonstration Architecture Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Platform Demo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/portal-demo" className="text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors">
                  <span>Customer Portal Preview</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Fieldline Concept
                </Link>
              </li>
              <li>
                <Link href="/request-service" className="text-slate-400 hover:text-white transition-colors">
                  Enquiry Simulation
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-[11px] block pt-1">
                  Built with Next.js App Router & Tailwind CSS
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} Fieldline. Fictional commercial concept for portfolio and demonstration purposes only.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
            <span>No real client data or trade certifications implied.</span>
            <span>•</span>
            <Link href="/portal-demo" className="hover:text-slate-400 underline underline-offset-2">
              Launch Portal Preview
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
