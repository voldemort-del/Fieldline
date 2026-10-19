'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFieldline } from '@/lib/store/fieldline-context';
import { BrandLogo } from '@/components/marketing/brand-logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Server,
  Wrench,
  Clock,
  FileCheck2,
  FileText,
  PlusCircle,
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export function PortalSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { activeSite, getSiteRequests, getQuotesBySite } = useFieldline();

  const openTicketsCount = getSiteRequests().filter(
    (r) => r.status !== 'completed' && r.status !== 'cancelled'
  ).length;

  const pendingQuotesCount = getQuotesBySite().filter(
    (q) => q.status === 'awaiting_customer'
  ).length;

  const navItems = [
    {
      label: 'Dashboard',
      href: '/portal-demo/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: 'Equipment Register',
      href: '/portal-demo/equipment',
      icon: <Server className="w-4 h-4" />,
      badge: activeSite.totalAssetsCount ? `${activeSite.totalAssetsCount}` : undefined,
    },
    {
      label: 'Service Requests',
      href: '/portal-demo/requests',
      icon: <Wrench className="w-4 h-4" />,
      badge: openTicketsCount > 0 ? `${openTicketsCount} open` : undefined,
      badgeVariant: openTicketsCount > 0 ? ('amber' as const) : undefined,
    },
    {
      label: 'Quotations',
      href: '/portal-demo/quotes',
      icon: <FileText className="w-4 h-4" />,
      badge: pendingQuotesCount > 0 ? `${pendingQuotesCount} review` : undefined,
      badgeVariant: pendingQuotesCount > 0 ? ('amber' as const) : undefined,
    },
    {
      label: 'Service History',
      href: '/portal-demo/history',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: 'Service Reports',
      href: '/portal-demo/reports',
      icon: <FileCheck2 className="w-4 h-4" />,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/portal-demo/dashboard') {
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
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
            PORTAL
          </span>
        </div>

        {/* Primary Action Button */}
        <div>
          <Button
            href="/portal-demo/requests/new"
            variant="primary"
            size="md"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="w-full justify-center shadow-xs font-semibold"
            onClick={onCloseMobile}
          >
            Log Service Request
          </Button>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Main Navigation
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
      </div>

      {/* Bottom Account & Contract Badge */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/30 space-y-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider">
              Service Contract
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <p className="font-bold text-white text-xs capitalize">
            {activeSite.contractTier.replace('_', ' ')}
          </p>
          <p className="text-[11px] text-slate-400">
            Annual SLA coverage • Triage Priority
          </p>
        </div>

        <div className="text-[10px] text-slate-500 text-center">
          Fieldline Demonstration Portal • Fictional
        </div>
      </div>
    </aside>
  );
}
