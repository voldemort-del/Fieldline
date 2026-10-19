'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { ServiceReport } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import {
  FileCheck2,
  Printer,
  ShieldCheck,
  Server,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Flame,
  Info,
} from 'lucide-react';

export default function ServiceReportsPage() {
  const { activeSite, getSiteReports } = useFieldline();
  const [selectedReport, setSelectedReport] = useState<ServiceReport | null>(null);

  const siteReports = getSiteReports();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
            <span>Statutory Compliance &amp; Service Vault</span>
            <span>•</span>
            <span className="text-slate-500">{activeSite.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Service Reports &amp; Gas Safety Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Immutable inspection archives, commercial catering CP42 gas soundness proving, and thermal sanitization records for insurance and environmental health audits.
          </p>
        </div>

        <Button
          onClick={handlePrint}
          variant="outline"
          size="md"
          leftIcon={<Printer className="w-4 h-4" />}
          className="shrink-0"
        >
          Print Current Register
        </Button>
      </div>

      {/* Reports Grid */}
      {siteReports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            No compliance reports archived yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Inspection certificates are generated upon engineer sign-off of scheduled PPM visits and gas audits.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteReports.map((report) => (
            <div
              key={report.id}
              id={report.id}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-6 shadow-xs transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {report.reportNumber}
                    </span>
                    <Badge variant="success" size="sm">
                      Certified
                    </Badge>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {new Date(report.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {report.inspectionType}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-slate-400" />
                    <span>{report.equipmentName}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {report.summary}
                </p>

                {/* Compliance badge */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{report.complianceCertification}</span>
                </div>

                {/* Key Checklist Highlights */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Tested Parameters:
                  </span>
                  {report.checklist.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-1 border-b border-slate-50 text-[11px]"
                    >
                      <span className="text-slate-600">{item.item}</span>
                      <span className="font-mono font-semibold text-emerald-700">
                        {item.measurement || item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Assessor: {report.technicianName}
                </span>

                <Button
                  onClick={() => setSelectedReport(report)}
                  variant="secondary"
                  size="sm"
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  View Full Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Printable Report Detail Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Commercial Inspection Record: ${selectedReport.reportNumber}`}
          description={`Venue: ${activeSite.name} • Certified on ${new Date(selectedReport.date).toLocaleDateString('en-GB')}`}
          maxWidth="xl"
        >
          <div className="space-y-6 text-xs text-slate-700" id="printable-certificate">
            {/* Certificate Header Banner */}
            <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                <span>FIELDLINE SERVICE REPORT</span>
                <span>{selectedReport.reportNumber}</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {selectedReport.inspectionType}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div>
                  <span className="block text-[10px] text-slate-500">Site Location:</span>
                  <span className="text-white font-medium">{activeSite.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">Inspected Asset:</span>
                  <span className="text-white font-medium">{selectedReport.equipmentName}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">Attending Engineer:</span>
                  <span className="text-white font-medium">{selectedReport.technicianName}</span>
                </div>
              </div>
            </div>

            {/* Findings & Work Performed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">Diagnostic Findings:</span>
                <p className="text-slate-600 text-xs leading-relaxed">{selectedReport.findings}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">Work Performed:</span>
                <p className="text-slate-600 text-xs leading-relaxed">{selectedReport.workPerformed}</p>
              </div>
            </div>

            {/* Complete Tested Checklist Table */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500">
                Complete Engineering Audit Checklist
              </span>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="p-3">Inspection Item / Standard</th>
                      <th className="p-3">Result</th>
                      <th className="p-3">Recorded Measurement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedReport.checklist.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50/70">
                        <td className="p-3 font-medium text-slate-800">{c.item}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            {c.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-600">
                          {c.measurement || 'Compliant'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
              <span className="font-bold block">Engineering Recommendations:</span>
              <p className="text-amber-900">{selectedReport.recommendations}</p>
              <p className="text-[11px] text-amber-800 pt-1">
                Proposed Next Preventative Inspection: <strong>{new Date(selectedReport.nextMaintenanceDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Fieldline Demonstration Certificate • Fictional Record
              </span>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePrint}
                  variant="primary"
                  size="sm"
                  leftIcon={<Printer className="w-4 h-4" />}
                >
                  Print Certificate
                </Button>
                <Button
                  onClick={() => setSelectedReport(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
