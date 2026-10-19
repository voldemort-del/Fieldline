'use client';

import React, { useState, Suspense } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { X } from 'lucide-react';

export default function AdminOperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900/10 text-slate-900">
      {/* Desktop Sidebar (Permanent) */}
      <div className="hidden lg:flex lg:shrink-0">
        <Suspense fallback={<div className="w-64 bg-slate-950 border-r border-slate-800" />}>
          <AdminSidebar />
        </Suspense>
      </div>

      {/* Mobile Drawer (Responsive Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-950 z-10 animate-in slide-in-from-left duration-200">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Suspense fallback={<div className="w-full bg-slate-950" />}>
              <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Main Operations Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Suspense fallback={<div className="h-16 bg-slate-950" />}>
          <AdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        </Suspense>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100/60">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
