'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { BrandLogo } from '@/components/marketing/brand-logo';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Wrench,
  Server,
  Building2,
  CalendarCheck,
  FileCheck2,
  FileText,
  Users,
  ShieldCheck,
  Radio,
  ChevronRight,
  HardHat,
} from 'lucide-react';

export function AdminSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { requests, technicians, equipment, sites, quotes } = useFieldline();

  const pendingCount = requests.filter(
    (r) => r.status === 'submitted' || r.status === 'under_review'
  ).length;

  const activeQuotesCount = quotes.filter(
    (q) => q.status === 'awaiting_customer' || q.status === 'draft'
  ).length;

  const navItems = [
    {
      label: 'Command Center',
      href: '/admin-demo',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: 'Work Order Queue',
      href: '/admin-demo/requests',
      icon: <Wrench className="w-4 h-4" />,
      badge: pendingCount > 0 ? `${pendingCount} action` : undefined,
      badgeVariant: pendingCount > 0 ? ('amber' as const) : undefined,
    },
    {
      label: 'Digital Quotations',
      href: '/admin-demo/quotes',
      icon: <FileText className="w-4 h-4" />,
      badge: activeQuotesCount > 0 ? `${activeQuotesCount}` : undefined,
      badgeVariant: quotes.some((q) => q.status === 'awaiting_customer') ? ('amber' as const) : undefined,
    },
    {
      label: 'Equipment Fleet',
      href: '/admin-demo/equipment',
      icon: <Server className="w-4 h-4" />,
      badge: `${equipment.length}`,
    },
    {
      label: 'Customer Accounts',
      href: '/admin-demo/customers',
      icon: <Building2 className="w-4 h-4" />,
      badge: `${sites.length}`,
    },
    {
      label: 'Maintenance Schedule',
      href: '/admin-demo/schedule',
      icon: <CalendarCheck className="w-4 h-4" />,
    },
    {
      label: 'Compliance Reports',
      href: '/admin-demo/reports',
      icon: <FileCheck2 className="w-4 h-4" />,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin-demo') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 h-full text-slate-300">
      <div className="p-5 space-y-6">
        {/* Brand Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <BrandLogo variant="light" size="sm" withLink={false} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
            DISPATCH
          </span>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Operations Management
          </p>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={active ? 'text-amber-400' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      item.badgeVariant === 'amber'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Technician Fleet Duty Status Widget */}
        <div className="space-y-2 pt-2 border-t border-slate-900">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
              Field Technician Fleet
            </span>
            <HardHat className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="space-y-1.5">
            {technicians.map((tech) => (
              <div
                key={tech.name}
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-[11px]"
              >
                <span className="font-medium text-slate-300 truncate max-w-[120px]">
                  {tech.name}
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    tech.status === 'available'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : tech.status === 'on_site'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {tech.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Separation Notice Card */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/30 space-y-2">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Staff Operational Environment</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Role demarcation simulated. State changes synchronize directly with the Customer Portal.
          </p>
        </div>
      </div>
    </aside>
  );
}
