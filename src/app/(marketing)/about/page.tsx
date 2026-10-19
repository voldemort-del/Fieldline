import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/marketing/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  Wrench,
  Sparkles,
  ArrowRight,
  Compass,
  Cpu,
  CheckCircle2,
  Users,
  Target,
  FileText,
  Clock,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Company Concept &amp; Operational Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            A Modern Approach to Commercial Kitchen Servicing
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Fieldline was conceived to bridge the gap between heavy-duty commercial catering engineering and modern digital asset management.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-600 text-base leading-relaxed">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              The Fieldline Perspective
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Why Kitchen Asset Management Matters
            </h2>
            <p>
              Commercial kitchens are high-stress industrial environments. During service, equipment operates at extreme temperatures, under intense humidity, and through rapid duty cycles. Yet despite being the beating heart of hospitality, kitchen maintenance has traditionally suffered from disorganized communication, lost paper service sheets, and reactive emergency panics.
            </p>
            <p>
              Fieldline represents a better way: pairing experienced catering engineers with a purpose-built customer portal. By giving chefs, general managers, and facilities directors real-time visibility into equipment history, warranty terms, and upcoming preventative servicing, kitchens reduce costly breakdowns and protect food safety compliance.
            </p>

            <div className="pt-2">
              <Button
                href="/request-service"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Simulate a Service Enquiry
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Core Engineering Commitments
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Diagnostic Precision</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Structured fault capture at the point of intake to ensure field technicians carry correct diagnostic parts on the initial attendance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Digital Transparency</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Eliminating paper work-sheets. All equipment histories, engineer notes, and parts replacements are logged directly to the client portal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Proactive Maintenance Cycles</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Focusing on planned preventative maintenance to intercept scale buildup and refrigerant degradation before total mechanical failure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Context & Transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <Sparkles className="w-4 h-4" />
            <span>Portfolio Project Transparency</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            About This Demonstration Project
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-400 leading-relaxed">
            <div className="space-y-4">
              <p>
                Fieldline is an original reference application created by a professional web designer and developer to demonstrate modern B2B website design and custom web application capabilities.
              </p>
              <p>
                The platform highlights how a complex industrial service business can combine an authoritative public marketing presence with an interactive, data-dense operations portal.
              </p>
            </div>

            <div className="space-y-4">
              <p>
                To maintain ethical standards, all client venues (such as &ldquo;The Grandview Hotel&rdquo; and &ldquo;Oakwood Care Suites&rdquo;), equipment serial numbers, maintenance certificates, and work orders shown throughout this demonstration are entirely fictional.
              </p>
              <p>
                The underlying codebase is structured cleanly with TypeScript, Next.js App Router, and Tailwind CSS, ready for deployment or adaptation for a real-world commercial field-service enterprise.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs text-slate-500">
              Next.js 16 • React 19 • Tailwind CSS • TypeScript
            </span>
            <Button
              href="/portal-demo"
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Customer Portal Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Interested in a Custom Web Application for Your Business?
        </h3>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Fieldline demonstrates how bespoke design and purpose-built software solve real operational problems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="/request-service"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Test Enquiry Experience
          </Button>
          <Button
            href="/portal-demo"
            variant="outline"
            size="lg"
          >
            Launch Customer Portal Preview
          </Button>
        </div>
      </section>
    </div>
  );
}
