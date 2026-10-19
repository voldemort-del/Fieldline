'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { EquipmentCategory, EquipmentStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Server,
  Search,
  Filter,
  PlusCircle,
  Wrench,
  ChevronRight,
  Flame,
  Snowflake,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function EquipmentRegisterPage() {
  const { activeSite, getSiteEquipment } = useFieldline();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const siteEquipment = getSiteEquipment();

  // Filter & Search Logic
  const filteredEquipment = siteEquipment.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assetTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: EquipmentStatus) => {
    switch (status) {
      case 'operational':
        return <Badge variant="success" size="sm">Operational</Badge>;
      case 'degraded':
        return <Badge variant="warning" size="sm">Attention / Degraded</Badge>;
      case 'critical_failure':
        return <Badge variant="danger" size="sm">Critical Fault</Badge>;
      case 'under_service':
        return <Badge variant="info" size="sm">Under Service</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: EquipmentCategory) => {
    switch (category) {
      case 'combi_oven':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'refrigeration':
        return <Snowflake className="w-4 h-4 text-blue-500" />;
      case 'warewashing':
        return <Zap className="w-4 h-4 text-emerald-500" />;
      default:
        return <Server className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
            <span>Asset Management Register</span>
            <span>•</span>
            <span className="text-slate-500">{activeSite.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Commercial Kitchen Equipment Register
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete inventory of tracked cooking, refrigeration, and warewashing units with serial numbers, service intervals, and warranty records.
          </p>
        </div>

        <Button
          href="/portal-demo/requests/new"
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          className="shrink-0 font-semibold"
        >
          Log Fault on Asset
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input (6 cols) */}
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by brand, model, asset tag, or kitchen location..."
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

          {/* Category Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Categories ({siteEquipment.length})</option>
              <option value="combi_oven">Combi Ovens</option>
              <option value="refrigeration">Refrigeration</option>
              <option value="warewashing">Warewashing</option>
              <option value="prime_cooking">Prime Cooking</option>
            </select>
          </div>

          {/* Status Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="all">All Conditions</option>
              <option value="operational">Operational</option>
              <option value="degraded">Degraded / Attention</option>
              <option value="under_service">Under Service</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {filteredEquipment.length} of {siteEquipment.length} assets
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Equipment List / Table */}
      {filteredEquipment.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              No matching equipment found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any assets matching &quot;{searchQuery}&quot;. Try adjusting your search keywords or resetting category filters.
            </p>
          </div>
          <Button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            variant="outline"
            size="sm"
          >
            Clear Search Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEquipment.map((eq) => (
            <div
              key={eq.id}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 sm:p-6 shadow-xs transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(eq.category)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">
                        {eq.name}
                      </h3>
                      <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {eq.assetTag}
                      </span>
                      {getStatusBadge(eq.status)}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {eq.brand} • Model: {eq.model} • Serial: {eq.serialNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    href={`/portal-demo/requests/new?equipmentId=${eq.id}`}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Log Fault
                  </Button>
                  <Button
                    href={`/portal-demo/equipment/${eq.id}`}
                    variant="secondary"
                    size="sm"
                    rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  >
                    Asset Dossier
                  </Button>
                </div>
              </div>

              {/* Asset Technical Specifications & Timeline Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Location:</span>
                  <span className="font-medium text-slate-800">{eq.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Last Serviced:</span>
                  <span className="font-medium text-slate-800">
                    {new Date(eq.lastServiceDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Next PPM Due:</span>
                  <span className="font-medium text-amber-700 font-semibold">
                    {new Date(eq.nextPpmDueDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Warranty Status:</span>
                  <span className="font-medium text-slate-800">
                    Valid until {new Date(eq.warrantyExpiry).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
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
