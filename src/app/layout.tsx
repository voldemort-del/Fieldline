import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { FieldlineProvider } from '@/lib/store/fieldline-context';
import { DemoSwitcherDock } from '@/components/shared/demo-dock';

export const metadata: Metadata = {
  title: 'Fieldline | Commercial Kitchen Equipment Servicing & Maintenance (UK)',
  description:
    'Dedicated commercial kitchen equipment repairs, planned preventative maintenance (PPM), and compliance inspections for UK restaurants, hotels, caterers, and care facilities.',
  keywords: [
    'commercial kitchen equipment repairs',
    'catering equipment maintenance UK',
    'rational oven servicing',
    'commercial refrigeration repairs',
    'commercial kitchen gas safety CP42',
    'field service management portal',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-200 selection:text-slate-950 pb-16">
        <FieldlineProvider>
          {children}
          <Suspense fallback={null}>
            <DemoSwitcherDock />
          </Suspense>
        </FieldlineProvider>
      </body>
    </html>
  );
}
