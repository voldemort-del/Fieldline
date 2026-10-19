'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useFieldline } from '@/lib/store/fieldline-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EquipmentCategory, EquipmentStatus } from '@/types';
import {
  Wrench,
  Search,
  Filter,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export default function AdminEquipmentPage() {
  const { equipment, sites, requests } = useFieldline();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      // Site filter
      if (selectedSiteId !== 'all' && item.siteId !== selectedSiteId) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        const matchesTag = item.assetTag.toLowerCase().includes(query);
        const matchesSerial = item.serialNumber.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);

        if (!matchesName && !matchesBrand && !matchesModel && !matchesTag && !matchesSerial && !matchesLocation) {
          return false;
        }
      }

      return true;
    });
  }, [equipment, selectedSiteId, selectedCategory, selectedStatus, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedSiteId !== 'all' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSiteId('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  const getSiteName = (siteId: string) => {
    const s = sites.find((site) => site.id === siteId);
    return s ? s.name : siteId;
  };

  const getActiveFaultForEquipment = (equipmentId: string) => {
    return requests.find(
      (r) =>
        r.equipmentId === equipmentId &&
        r.status !== 'completed' &&
        r.status !== 'cancelled'
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Commercial Equipment Register
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Contracted commercial kitchen assets, operational health, and PPM compliance across all client sites.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Total Assets: {equipment.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tag, brand, model..."
              className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
            />
          </div>

          {/* Client Site selector */}
          <div>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full py-2 px-3 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
            >
              <option value="all">All Client Venues</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category selector */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
            >
              <option value="all">All Asset Categories</option>
              <option value="combi_oven">Combi Ovens & Steamers</option>
              <option value="refrigeration">Refrigeration & Coldrooms</option>
              <option value="prime_cooking">Prime Gas & Ranges</option>
              <option value="warewashing">Warewashing & Hood Systems</option>
              <option value="ventilation_extraction">Ventilation & Extraction</option>
            </select>
          </div>

          {/* Health status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-navy-600"
            >
              <option value="all">All Health Statuses</option>
              <option value="operational">Operational</option>
              <option value="degraded">Degraded</option>
              <option value="critical_failure">Critical Failure</option>
              <option value="under_service">Under Service</option>
            </select>
          </div>
        </div>

        {/* Filter status & clear action */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong>{filteredEquipment.length}</strong> of <strong>{equipment.length}</strong> registered assets
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-navy-700 hover:text-navy-950 font-semibold underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <Wrench className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No assets match your search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the selected venue and category filters.
          </p>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEquipment.map((item) => {
            const activeFault = getActiveFaultForEquipment(item.id);

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar: Tag & Condition Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-navy-950 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {item.assetTag}
                    </span>
                    <Badge
                      variant={
                        item.status === 'operational'
                          ? 'success'
                          : item.status === 'critical_failure'
                          ? 'danger'
                          : item.status === 'degraded'
                          ? 'warning'
                          : 'default'
                      }
                      size="sm"
                    >
                      {item.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>

                  {/* Asset Title & Brand */}
                  <div>
                    <h3 className="text-base font-bold text-navy-950 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {item.brand} • Model {item.model}
                    </p>
                  </div>

                  {/* Site & Location */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Building2 className="w-3.5 h-3.5 text-navy-700 shrink-0" />
                      <span className="truncate">{getSiteName(item.siteId)}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] pl-5">
                      Zone: {item.location}
                    </div>
                  </div>

                  {/* Active Fault Alert if any */}
                  {activeFault && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-bold truncate">Open Ticket: {activeFault.ticketNumber}</span>
                      </div>
                      <Link
                        href={`/admin-demo/requests/${activeFault.id}`}
                        className="text-[11px] font-bold text-navy-800 underline shrink-0"
                      >
                        Inspect
                      </Link>
                    </div>
                  )}

                  {/* Technical & Compliance Details */}
                  <div className="pt-2 text-xs space-y-1.5 text-slate-600 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Serial No:</span>
                      <span className="font-mono text-slate-800">{item.serialNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Last Serviced:</span>
                      <span className="font-medium text-slate-800">{item.lastServiceDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Next PPM Due:</span>
                      <span className="font-bold text-navy-900">{item.nextPpmDueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Footer link to schedule or requests */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/admin-demo/schedule`}
                    className="text-xs font-semibold text-slate-600 hover:text-navy-900 inline-flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Schedule</span>
                  </Link>
                  <Link
                    href={`/portal-demo/equipment/${item.id}`}
                    target="_blank"
                    className="text-xs font-bold text-navy-700 hover:text-navy-900 inline-flex items-center gap-1"
                  >
                    <span>Portal View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
