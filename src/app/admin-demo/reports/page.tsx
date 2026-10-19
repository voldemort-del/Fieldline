'use client';

import React, { useState, useMemo } from 'react';
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
  Search,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Flame,
  User,
  HardHat,
  ArrowRight,
  Wrench,
  AlertTriangle,
} from 'lucide-react';

export default function AdminReportsPage() {
  const { reports, sites, requests } = useFieldline();

  const [selectedReport, setSelectedReport] = useState<ServiceReport | null>(null);
  const [selectedSiteId, setSelectedSiteId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = useMemo(() => {
    return reports.filter((rep) => {
      if (selectedSiteId !== 'all' && rep.siteId !== selectedSiteId) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = rep.reportNumber.toLowerCase().includes(q);
        const matchesEq = rep.equipmentName.toLowerCase().includes(q);
        const matchesTech = rep.technicianName.toLowerCase().includes(q);
        const matchesType = rep.inspectionType.toLowerCase().includes(q);
        const matchesCert = rep.complianceCertification.toLowerCase().includes(q);

        if (!matchesNum && !matchesEq && !matchesTech && !matchesType && !matchesCert) {
          return false;
        }
      }

      return true;
    });
  }, [reports, selectedSiteId, searchQuery]);

  const getSiteName = (siteId: string) => {
    const s = sites.find((site) => site.id === siteId);
    return s ? s.name : siteId;
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Compliance & Service Reports Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Archived statutory certificates, CP42 commercial gas safety audits, and engineer sign-off records across all accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Vault Record
          </Button>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {reports.length} Certified Reports
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificate, asset, engineer..."
                className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
              />
            </div>

            {/* Venue Filter */}
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="py-2 px-3 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
            >
              <option value="all">All Contracted Venues</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500 self-center">
            Showing <strong>{filteredReports.length}</strong> of <strong>{reports.length}</strong> reports
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No reports match the filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try clearing the search query or selecting &quot;All Contracted Venues&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-6 shadow-xs transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-navy-950 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
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
                  <h3 className="font-bold text-navy-950 text-base">
                    {report.equipmentName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-navy-700 shrink-0" />
                    <span>{getSiteName(report.siteId)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  <div className="font-medium text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{report.complianceCertification}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                    {report.summary}
                  </p>
                </div>

                <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                  <span>Sign-off: <strong>{report.technicianName}</strong></span>
                  <span>Next Due: <strong>{report.nextMaintenanceDate}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                {report.requestId ? (
                  <Link
                    href={`/admin-demo/requests/${report.requestId}`}
                    className="text-xs font-bold text-navy-700 hover:text-navy-900 underline flex items-center gap-1"
                  >
                    <span>Linked Work Order</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-xs text-slate-400">Scheduled Audit</span>
                )}

                <Button
                  onClick={() => setSelectedReport(report)}
                  variant="primary"
                  size="sm"
                >
                  View Full Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Official Service Certificate — ${selectedReport.reportNumber}`}
          maxWidth="lg"
        >
          <div className="space-y-6 text-xs text-slate-700">
            {/* Header info */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <span className="font-mono font-bold text-sm text-navy-950">
                  {selectedReport.reportNumber}
                </span>
                <span className="font-medium text-slate-600">
                  Date: {selectedReport.date}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div>
                  Customer Venue: <strong>{getSiteName(selectedReport.siteId)}</strong>
                </div>
                <div>
                  Equipment: <strong>{selectedReport.equipmentName}</strong>
                </div>
                <div>
                  Inspection Type: <strong>{selectedReport.inspectionType}</strong>
                </div>
                <div>
                  Certifying Engineer: <strong>{selectedReport.technicianName}</strong> ({selectedReport.technicianRole})
                </div>
              </div>
            </div>

            {/* Compliance Certification badge */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold">{selectedReport.complianceCertification}</div>
                <div className="text-[11px] text-emerald-800">
                  Tested and proven in accordance with UK Gas Safety & Commercial Catering Regulations.
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <h4 className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                Engineering Safety Checklist & Telemetry
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {selectedReport.checklist.map((chk, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between bg-white text-xs">
                    <span className="font-medium text-slate-800">{chk.item}</span>
                    <div className="flex items-center gap-2">
                      {chk.measurement && (
                        <span className="font-mono text-slate-500 text-[11px]">
                          {chk.measurement}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          chk.status === 'Pass'
                            ? 'bg-emerald-100 text-emerald-800'
                            : chk.status === 'Advisory'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {chk.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Performed & Findings */}
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                  Findings & Diagnostic Measurements
                </h4>
                <p className="mt-1 p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {selectedReport.findings}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                  Work Performed & Parts Commissioned
                </h4>
                <p className="mt-1 p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {selectedReport.workPerformed}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                  Technical Recommendations
                </h4>
                <p className="mt-1 p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  {selectedReport.recommendations}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-slate-500">
                Next Inspection Window: <strong>{selectedReport.nextMaintenanceDate}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  size="sm"
                  leftIcon={<Printer className="w-3.5 h-3.5" />}
                >
                  Print
                </Button>
                <Button
                  onClick={() => setSelectedReport(null)}
                  variant="primary"
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
