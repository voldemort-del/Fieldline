'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { RequestStatus, ServicePriority } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Wrench,
  Search,
  Filter,
  PlusCircle,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Server,
} from 'lucide-react';

export default function ServiceRequestsPage() {
  const { activeSite, getSiteRequests, getSiteEquipment } = useFieldline();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('all');

  const siteRequests = getSiteRequests();
  const siteEquipment = getSiteEquipment();

  // Filter & Search
  const filteredRequests = siteRequests.filter((req) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      req.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? req.status !== 'completed' && req.status !== 'cancelled'
        : req.status === statusFilter;

    const matchesEquipment =
      equipmentFilter === 'all' || req.equipmentId === equipmentFilter;

    return matchesSearch && matchesStatus && matchesEquipment;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="amber" size="sm">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="info" size="sm">Scheduled</Badge>;
      case 'submitted':
        return <Badge variant="warning" size="sm">Submitted</Badge>;
      case 'under_review':
        return <Badge variant="warning" size="sm">Under Triage</Badge>;
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="default" size="sm">Cancelled</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: ServicePriority) => {
    switch (priority) {
      case 'emergency':
        return <Badge variant="danger" size="sm">Emergency</Badge>;
      case 'high':
        return <Badge variant="warning" size="sm">High Priority</Badge>;
      case 'scheduled_ppm':
        return <Badge variant="info" size="sm">PPM Schedule</Badge>;
      default:
        return <Badge variant="default" size="sm">Standard</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
            <span>Work Orders &amp; Callouts</span>
            <span>•</span>
            <span className="text-slate-500">{activeSite.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Service Requests Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time breakdown progress, engineer assignments, and resolution milestones across all kitchen equipment.
          </p>
        </div>

        <Button
          href="/portal-demo/requests/new"
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          className="shrink-0 font-semibold"
        >
          Submit Service Request
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box (6 cols) */}
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by ticket #, fault description, or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 placeholder:text-slate-400 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Statuses ({siteRequests.length})</option>
              <option value="active">Active Only</option>
              <option value="submitted">Submitted</option>
              <option value="in_progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Equipment Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Assets</option>
              {siteEquipment.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset filter summary */}
        {(searchQuery || statusFilter !== 'all' || equipmentFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {filteredRequests.length} of {siteRequests.length} requests
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setEquipmentFilter('all');
              }}
              className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            No service requests found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No requests matched your filter criteria. You can clear the search or submit a new service request.
          </p>
          <Button href="/portal-demo/requests/new" variant="primary" size="sm">
            Submit New Request
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 sm:p-6 shadow-xs transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {req.ticketNumber}
                    </span>
                    {getPriorityBadge(req.priority)}
                    {getStatusBadge(req.status)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {req.title}
                  </h3>
                </div>

                <div className="self-end sm:self-center">
                  <Button
                    href={`/portal-demo/requests/${req.id}`}
                    variant="secondary"
                    size="sm"
                    rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  >
                    Ticket Details
                  </Button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {req.description}
              </p>

              {/* Metadata row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Associated Asset:</span>
                  <Link
                    href={`/portal-demo/equipment/${req.equipmentId}`}
                    className="font-medium text-slate-800 hover:text-amber-600 inline-flex items-center gap-1"
                  >
                    <Server className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[140px]">{req.equipmentName}</span>
                  </Link>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Submitted Date:</span>
                  <span className="font-medium text-slate-800">
                    {new Date(req.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Reported By:</span>
                  <span className="font-medium text-slate-800">{req.reportedBy}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Assigned Engineer:</span>
                  <span className="font-medium text-slate-800">
                    {req.assignedEngineer ? req.assignedEngineer.name : 'Triage Queue'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
