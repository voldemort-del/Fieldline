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
  ChevronRight,
  Clock,
  RotateCcw,
  Server,
  Building2,
  HardHat,
  ArrowUpDown,
} from 'lucide-react';

export default function AdminWorkOrderQueuePage() {
  const { requests, sites, getCustomerSite } = useFieldline();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [siteFilter, setSiteFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Filter & Search Logic across ALL customer sites
  const filteredRequests = requests
    .filter((req) => {
      const site = getCustomerSite(req.siteId);
      const matchesSearch =
        searchQuery.trim() === '' ||
        req.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (site && site.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'active'
          ? req.status !== 'completed' && req.status !== 'cancelled'
          : req.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'all' || req.priority === priorityFilter;

      const matchesSite = siteFilter === 'all' || req.siteId === siteFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesSite;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'in_progress':
      case 'engineer_dispatched':
        return <Badge variant="amber" size="sm">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="info" size="sm">Scheduled</Badge>;
      case 'submitted':
        return <Badge variant="warning" size="sm">New Intake</Badge>;
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
        return <Badge variant="info" size="sm">PPM</Badge>;
      default:
        return <Badge variant="default" size="sm">Standard</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">
            <span>OPERATIONAL WORK ORDER REPOSITORY</span>
            <span>•</span>
            <span className="text-slate-500">All Client Accounts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Service Request &amp; Work Order Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Unified operations queue for intake triage, technician allocation, status transitions, and service resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            href="/portal-demo/requests/new"
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Simulate Customer Ticket
          </Button>
        </div>
      </div>

      {/* Multi-tier Filter & Search Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Bar (5 cols) */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by ticket #, client, asset, or issue description..."
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

          {/* Status Dropdown (2 cols) */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Statuses ({requests.length})</option>
              <option value="active">Active Only</option>
              <option value="submitted">New / Submitted</option>
              <option value="under_review">Under Triage</option>
              <option value="in_progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Priority Dropdown (2 cols) */}
          <div className="md:col-span-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="emergency">Emergency</option>
              <option value="high">High Priority</option>
              <option value="standard">Standard</option>
              <option value="scheduled_ppm">PPM</option>
            </select>
          </div>

          {/* Customer Site Dropdown (2 cols) */}
          <div className="md:col-span-2">
            <select
              value={siteFilter}
              onChange={(e) => setSiteFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Venues</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order (1 col) */}
          <div className="md:col-span-1">
            <button
              onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
              className="w-full py-2.5 px-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1"
              title="Toggle sort order"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortBy === 'newest' ? 'New' : 'Old'}</span>
            </button>
          </div>
        </div>

        {/* Filter Summary & Reset Action */}
        {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || siteFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Filtered: <strong>{filteredRequests.length}</strong> of {requests.length} work orders
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setPriorityFilter('all');
                setSiteFilter('all');
              }}
              className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Work Orders Operational List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            No work orders match current filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, status criteria, or clearing venue selections.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => {
            const site = getCustomerSite(req.siteId);
            return (
              <div
                key={req.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 sm:p-6 shadow-xs transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                        {req.ticketNumber}
                      </span>
                      {getPriorityBadge(req.priority)}
                      {getStatusBadge(req.status)}
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-xs font-semibold text-slate-700">
                        {site?.name || 'Customer Venue'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {req.title}
                    </h3>
                  </div>

                  <div className="self-end sm:self-center">
                    <Button
                      href={`/admin-demo/requests/${req.id}`}
                      variant="primary"
                      size="sm"
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                      className="font-semibold"
                    >
                      Manage Work Order
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {req.description}
                </p>

                {/* Operational Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Associated Asset:</span>
                    <span className="font-medium text-slate-800">{req.equipmentName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Submission Time:</span>
                    <span className="font-medium text-slate-800">
                      {new Date(req.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Reporter &amp; Contact:</span>
                    <span className="font-medium text-slate-800">
                      {req.reportedBy} ({req.contactPhone})
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Allocated Technician:</span>
                    <span className="font-medium text-slate-900">
                      {req.assignedEngineer ? req.assignedEngineer.name : 'Triage Queue'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
