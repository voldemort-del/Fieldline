# Fieldline — Implementation Plan & Technical Architecture

**Document Status:** Implementation Roadmap  
**Version:** 1.0.0  
**Last Updated:** October 2026  
**Related Documents:** [PROJECT_BRIEF.md](file:///c:/Users/DARK%20LORD/Desktop/New/PROJECT_BRIEF.md), [DECISIONS.md](file:///c:/Users/DARK%20LORD/Desktop/New/DECISIONS.md)

---

## 1. Overview & System Architecture

Fieldline is designed as a unified Next.js App Router application in TypeScript. It integrates three primary product surfaces under a single codebase and shared design system:
1. **Public Marketing Website** (`/`, `/services`, `/industries`, `/about`, `/request-service`, `/portal-demo`)
2. **Customer Portal** (`/portal-demo/*`)
3. **Internal Operations Dashboard** (`/admin-demo/*`)

The architecture uses a unified client-side state store backed by `localStorage` and pre-seeded mock records, ensuring that interactions performed in one view (e.g., submitting a service request via the Customer Portal or Enquiry Form) immediately reflect in the Operations Dashboard without needing an external database.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS APP ROUTER CORE                         │
├───────────────────┬───────────────────────────┬────────────────────────┤
│ Public Marketing  │      Customer Portal      │  Operations Dashboard  │
│  (Brand Layout)   │      (Client Layout)      │     (Admin Layout)     │
└─────────┬─────────┴─────────────┬─────────────┴───────────┬────────────┘
          │                       │                         │
          ▼                       ▼                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SHARED COMPONENT & DESIGN SYSTEM                     │
│  Buttons, Badges, Modals, Forms, Tables, Status Indicators, StatCards  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                DATA & STATE LAYER (Simulation Engine)                  │
│   • Typed Schema Models (Customer, Asset, Request, Report, WorkOrder)  │
│   • Seed Datasets (Hotels, Restaurants, Combi Ovens, Refrigeration)    │
│   • Reactive Store / Context with LocalStorage Synchronization         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory & Component Structure

```
c:/Users/DARK LORD/Desktop/New/
├── PROJECT_BRIEF.md
├── IMPLEMENTATION_PLAN.md
├── DECISIONS.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── public/
│   └── images/                     # Service, equipment, and industry imagery
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML shell, fonts, providers
│   │   ├── globals.css             # Base styles, Tailwind directives, theme variables
│   │   │
│   │   ├── (marketing)/            # Route Group: Public Marketing Pages
│   │   │   ├── layout.tsx          # Public header, footer, announcement banner
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── services/
│   │   │   │   └── page.tsx        # Services overview & deep-dives
│   │   │   ├── industries/
│   │   │   │   └── page.tsx        # Industries served
│   │   │   ├── about/
│   │   │   │   └── page.tsx        # Company ethos & operations
│   │   │   ├── request-service/
│   │   │   │   └── page.tsx        # Interactive service enquiry flow
│   │   │   └── portal-demo/
│   │   │       └── page.tsx        # Portal showcase & entry point
│   │   │
│   │   ├── portal-demo/            # Route Group: Customer Portal
│   │   │   ├── layout.tsx          # Portal sidebar, header, active account switcher
│   │   │   ├── login/
│   │   │   │   └── page.tsx        # Fast 1-click demo account selector
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx        # Customer metrics, recent alerts, quick actions
│   │   │   ├── equipment/
│   │   │   │   ├── page.tsx        # Asset list, status filters, search
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx    # Equipment dossier & service history
│   │   │   ├── requests/
│   │   │   │   ├── page.tsx        # Service requests list & status tracker
│   │   │   │   └── new/
│   │   │   │       └── page.tsx    # Log new fault / service request
│   │   │   ├── history/
│   │   │   │   └── page.tsx        # Historical service log & resolutions
│   │   │   └── reports/
│   │   │       └── page.tsx        # Compliance certificates & PDF/print-ready reports
│   │   │
│   │   └── admin-demo/             # Route Group: Internal Operations Dashboard
│   │       ├── layout.tsx          # Admin sidebar, operations status bar, dispatch alerts
│   │       ├── page.tsx            # Operations command center (KPIs, active jobs)
│   │       ├── requests/
│   │       │   ├── page.tsx        # Work order queue with multi-filters
│   │       │   └── [id]/
│   │       │       └── page.tsx    # Work order inspect, status updater, notes
│   │       ├── maintenance/
│   │       │   └── page.tsx        # PPM schedule & statutory inspection planner
│   │       └── clients/
│   │           └── page.tsx        # Client account register & contract tiers
│   │
│   ├── components/
│   │   ├── ui/                     # Design System Primitives
│   │   │   ├── button.tsx          # Primary, secondary, outline, ghost, danger
│   │   │   ├── badge.tsx           # Status pills (operational, breakdown, scheduled)
│   │   │   ├── card.tsx            # Bordered card containers
│   │   │   ├── input.tsx           # Form text inputs with label & error
│   │   │   ├── select.tsx          # Form dropdowns
│   │   │   ├── textarea.tsx        # Multiline text areas
│   │   │   ├── table.tsx           # Responsive data tables
│   │   │   ├── modal.tsx           # Accessible dialog / drawer component
│   │   │   ├── tabs.tsx            # Tab navigation
│   │   │   └── stat-card.tsx       # KPI / metric display card
│   │   ├── marketing/              # Marketing Specific Components
│   │   │   ├── navbar.tsx          # Public navigation bar with mobile sheet
│   │   │   ├── footer.tsx          # Public comprehensive footer
│   │   │   ├── hero-section.tsx    # Hero with dynamic callouts
│   │   │   ├── service-card.tsx    # Interactive service feature card
│   │   │   ├── industry-tab.tsx    # Sector selector component
│   │   │   └── enquiry-form.tsx    # Step-by-step enquiry form
│   │   ├── portal/                 # Customer Portal Components
│   │   │   ├── portal-header.tsx   # Topbar with venue switcher & alerts
│   │   │   ├── portal-sidebar.tsx  # Dedicated customer navigation
│   │   │   ├── equipment-card.tsx  # Asset summary card
│   │   │   └── report-viewer.tsx   # Fictional certificate / report modal
│   │   ├── admin/                  # Operations Dashboard Components
│   │   │   ├── admin-header.tsx    # Admin topbar with status badges
│   │   │   ├── admin-sidebar.tsx   # Operations navigation
│   │   │   ├── status-dropdown.tsx # Live work order status transitioner
│   │   │   └── notes-composer.tsx  # Add simulated engineer notes
│   │   └── shared/
│   │       ├── demo-banner.tsx     # Persistent floating simulation disclosure banner
│   │       ├── view-switcher.tsx   # Rapid switcher between Marketing, Portal, and Admin
│   │       └── empty-state.tsx     # Polished empty list component
│   │
│   ├── lib/
│   │   ├── mock-data/              # Seed Datasets
│   │   │   ├── customers.ts        # Fictional venues (hotels, care homes, bistros)
│   │   │   ├── equipment.ts        # Commercial ovens, fryers, refrigeration units
│   │   │   ├── requests.ts         # Service requests with priority & stages
│   │   │   ├── reports.ts          # Service records & compliance checks
│   │   │   └── index.ts            # Master seed aggregator
│   │   ├── store/                  # Client Store & LocalStorage Sync
│   │   │   ├── fieldline-context.tsx# React Context providing global simulation state
│   │   │   └── store-hooks.ts      # Custom hooks: useEquipment, useRequests, useCustomers
│   │   └── utils.ts                # Date formatting (en-GB), currency (GBP), classnames
│   │
│   └── types/
│       ├── customer.ts             # Customer & site interfaces
│       ├── equipment.ts            # Equipment asset definitions
│       ├── service-request.ts      # Service request & ticket models
│       ├── service-report.ts       # Maintenance reports & safety certificates
│       └── index.ts                # Consolidated type exports
```

---

## 3. Data Models & Type Architecture

All entities are strictly typed to mirror realistic commercial catering service operations.

### 3.1 Core Enums & Value Sets
```typescript
// Equipment Categories
export type EquipmentCategory = 
  | 'combi_oven' 
  | 'prime_cooking' 
  | 'refrigeration' 
  | 'warewashing' 
  | 'ventilation_extraction'
  | 'beverage_prep';

// Equipment Operational Status
export type EquipmentStatus = 
  | 'operational' 
  | 'degraded' 
  | 'critical_failure' 
  | 'under_service' 
  | 'decommissioned';

// Service Request Priority
export type ServicePriority = 'emergency' | 'high' | 'standard' | 'scheduled_ppm';

// Service Request Lifecycle Stage
export type RequestStatus = 
  | 'logged' 
  | 'triage' 
  | 'engineer_dispatched' 
  | 'on_site' 
  | 'awaiting_parts' 
  | 'resolved' 
  | 'closed';

// Maintenance Contract Level
export type ContractTier = 'comprehensive_plus' | 'preventative_core' | 'on_demand';
```

### 3.2 Entity Interfaces
```typescript
export interface CustomerSite {
  id: string;
  organisationName: string;
  industry: 'restaurant' | 'hotel' | 'contract_catering' | 'healthcare';
  siteAddress: {
    line1: string;
    city: string;
    postcode: string;
  };
  primaryContact: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  contractTier: ContractTier;
  accountNumber: string; // e.g. "FL-LON-8492"
}

export interface CommercialEquipment {
  id: string;
  siteId: string;
  name: string;
  brand: string; // e.g. "Rational", "Hobart", "Foster", "Blue Seal"
  modelNumber: string;
  serialNumber: string;
  category: EquipmentCategory;
  locationInKitchen: string; // e.g. "Main Cookline - Station 2", "Pastry Prep"
  installationDate: string; // ISO date
  warrantyExpiry: string;
  lastServiceDate: string;
  nextPpmDueDate: string;
  status: EquipmentStatus;
  notes?: string;
}

export interface ServiceRequest {
  id: string; // e.g. "REQ-2026-1048"
  siteId: string;
  equipmentId?: string;
  customEquipmentName?: string;
  title: string;
  description: string;
  priority: ServicePriority;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  reportedBy: string;
  assignedEngineer?: {
    id: string;
    name: string;
    skillBadge: string; // e.g. "Gas Safe Certified Combi Specialist"
  };
  resolutionNotes?: string;
  partsUsed?: Array<{
    partNumber: string;
    description: string;
    quantity: number;
  }>;
}

export interface ServiceReport {
  id: string; // e.g. "REP-7731"
  requestId: string;
  equipmentId: string;
  siteId: string;
  reportDate: string;
  engineerName: string;
  inspectionType: 'emergency_repair' | 'statutory_gas_check' | 'scheduled_ppm';
  findings: string;
  remedialActions: string;
  statusAfterVisit: EquipmentStatus;
  checklistItems: Array<{
    item: string;
    passed: boolean;
    remarks?: string;
  }>;
  complianceCertified: boolean;
}
```

---

## 4. Stage-by-Stage Implementation Plan

Implementation follows a sequential, dependency-driven progression. Each stage produces verifiable, fully functional components before advancing to the next.

```
┌────────────────────────────────────────────────────────┐
│ STAGE 0: Project Discovery & Documentation (COMPLETED) │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STAGE 1: Shared Design System & Marketing Website      │
│  • Next.js App Router initialization                   │
│  • Design tokens, typography, color system             │
│  • Public routes: /, /services, /industries, etc.      │
│  • Interactive enquiry form with mock confirmation     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STAGE 2: Customer Portal Demo                          │
│  • Seed data store with persistent LocalStorage        │
│  • Customer dashboard, equipment register & details    │
│  • Service request creation & live tracking            │
│  • Maintenance history & printable service reports     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STAGE 3: Staff Operations Dashboard                    │
│  • Admin command center & operational metrics          │
│  • Work order queue with multi-filter & search         │
│  • Interactive status transitioner & engineer dispatch │
│  • Scheduled maintenance & compliance overview         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STAGE 4: Cross-Surface Integration & Quality Assurance │
│  • Shared state validation across Portal & Admin       │
│  • Responsive audit (Mobile, Tablet, Desktop)          │
│  • Accessibility & contrast verification               │
│  • Edge case states (empty lists, long names)          │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STAGE 5: Portfolio Presentation & Pitch Readiness      │
│  • Demo quick-switcher bar                             │
│  • Walkthrough script & feature catalog                │
│  • Build & deployment verification (Vercel-ready)      │
└────────────────────────────────────────────────────────┘
```

### Stage 0 — Project Discovery & Documentation *(Current Stage)*
* **Objective:** Establish the complete product vision, architecture, constraints, and documentation foundation before any code is generated.
* **Deliverables:** `PROJECT_BRIEF.md`, `IMPLEMENTATION_PLAN.md`, `DECISIONS.md`.
* **Exit Criteria:** All three documents written, inspected, consistent, and agreed upon.

### Stage 1 — Shared Design System & Public Marketing Website
* **Objective:** Scaffold the Next.js App Router application with TypeScript and Tailwind CSS; construct the core UI design primitives; build and polish all public marketing pages.
* **Key Tasks:**
  1. Initialize Next.js project with App Router, TypeScript, Tailwind CSS, and Lucide icons.
  2. Implement global styling tokens (`src/app/globals.css`) for the Deep Navy, Slate Grey, and Amber palette.
  3. Build reusable UI components (`Button`, `Badge`, `Card`, `Input`, `Select`, `Navbar`, `Footer`).
  4. Develop the public pages:
     * `/` (Homepage): Value proposition hero, key services showcase, sector cards, workflow preview, callouts.
     * `/services`: In-depth breakdown of Repairs, PPM, Gas Inspections, Multi-site contracts.
     * `/industries`: Sector-focused pages for Restaurants, Hotels, Contract Catering, Care Homes.
     * `/about`: Company profile, engineering standards, commitment to kitchen uptime.
     * `/request-service`: Validated multi-step enquiry form with instant simulated confirmation.
     * `/portal-demo`: Interactive overview explaining the portal, with direct launch buttons.
* **Exit Criteria:** Clean responsive layout on mobile, tablet, and desktop; all links work; enquiry form validates and presents a polished confirmation state.

### Stage 2 — Customer Portal Demo *(COMPLETED)*
* **Objective:** Build the client-facing portal using the shared design system and typed fictional data models.
* **Delivered Routes:**
  * `/portal-demo` — Portal introduction and 1-click persona quick launch.
  * `/portal-demo/login` — Simulated demo access screen and persona selector.
  * `/portal-demo/dashboard` — Overview dashboard with live KPIs, active callouts, upcoming PPM, and activity timeline.
  * `/portal-demo/equipment` — Equipment register with instant search, category filters, and condition badges.
  * `/portal-demo/equipment/[id]` — Equipment dossier with technical specifications, linked open requests, and complete history.
  * `/portal-demo/requests` — Service requests hub with multi-status filters, search, and ticket detail links.
  * `/portal-demo/requests/new` — Interactive breakdown ticket logger with validation, priority assignment, and confirmation receipt.
  * `/portal-demo/requests/[id]` — Service request detail view with full audit timeline and assigned engineer details.
  * `/portal-demo/history` — Chronological historical service log with parts replaced and commercial invoice terms.
  * `/portal-demo/reports` — Statutory compliance vault with printable CP42 commercial gas safety and healthcare disinfection certificates.
* **Interactions & State:**
  * Synchronized React Context store backed by `localStorage`.
  * Logging a request in `/portal-demo/requests/new` generates a reference code (e.g. `REQ-2026-xxxx`), updates total open counts, links to the equipment record, and updates the dashboard immediately.
  * 1-click venue switcher in the portal header switches between The Grandview Hotel, Oakwood Care Suites, and The Brass Rail Bistro.
  * Reset Demo Data button restores pristine seed records.
* **Exit Criteria & Verification:**
  * Zero TypeScript compiler errors.
  * All 17 routes prerendered cleanly.
  * Full browser walkthrough executed: search, filtering, request logging, ticket inspection, venue switching, and certificate modal verified.


### Stage 3 — Staff Operations Dashboard (COMPLETED)
* **Objective:** Build the operational command center for service dispatchers, coordinators, and field management.
* **Implemented Routes & Architecture:**
  * `/admin-demo` — Operations command center overview with live KPI counters, urgent triage alerts, dispatch calendar schedule preview, quick actions, and real-time activity audit feed.
  * `/admin-demo/requests` — Work orders queue with full text search, multi-status filters, priority filters, venue filters, and sorting.
  * `/admin-demo/requests/[id]` — Detailed work order inspector with live status transition controls (`submitted` → `under_review` → `scheduled` → `in_progress` → `completed` → `cancelled`), lead engineer assignment, internal coordinator notes composer, customer/equipment details, official service report trigger, and chronological activity timeline.
  * `/admin-demo/equipment` — Commercial equipment register across all client sites with multi-filter (site, category, condition) and search.
  * `/admin-demo/customers` — Commercial customer directory with SLA tiers, account numbers, emergency contact details, asset stats, and 1-click active portal venue switching.
  * `/admin-demo/schedule` — Coordinated dispatch and maintenance schedule combining callout windows and planned preventative maintenance (PPM) dates.
  * `/admin-demo/reports` — Statutory compliance and service reports vault with interactive CP42 certificate inspection modal.
* **Cross-Dashboard Synchronization & Workflow:**
  * Customer portal actions (e.g., logging a ticket at `/portal-demo/requests/new`) immediately appear in the admin queue (`/admin-demo/requests`).
  * Operations actions (e.g., updating a ticket status to `scheduled`, `in_progress`, or `completed` and assigning an engineer) immediately reflect in the customer portal (`/portal-demo/requests/[id]`).
  * Completing a work order in the admin dashboard automatically appends a completion milestone, generates an official `ServiceReport`, records an entry in `ServiceHistory`, and restores linked equipment health to `operational`.
* **Exit Criteria & Verification:**
  * Zero TypeScript compiler errors across all 24 prerendered routes.
  * Full browser automation walkthrough executed and recorded: verified command center overview, work order filtering, scheduling, ticket completion, report generation, and cross-portal reactive synchronization.

### Stage 4 — Cross-Surface Integration & Quality Assurance (COMPLETED)
* **Objective:** Verify cross-surface reactivity, responsive styling, accessibility, and robust error handling.
* **Completed Audits & Deliverables:**
  * Full bidirectional flow tested: Enquiry on Marketing Site &rarr; Ticket in Portal &rarr; Status update in Admin &rarr; Resolution in Portal.
  * Introduced persistent floating demonstration dock (`src/components/shared/demo-dock.tsx`) with 1-click surface switching, drawer controls, active venue selector, and instant seed state restoration.
  * Verified WCAG 2.1 AA color contrast standards across light and dark interfaces.
  * Full viewport responsiveness tested across mobile (375px), tablet (768px), and desktop (1440px).
  * Resolved Suspense prerendering boundaries for Next.js 16.4.2 Turbopack.
  * Documented all findings and test logs in `QA_REPORT.md`.
* **Exit Criteria & Verification:**
  * Zero TypeScript compiler errors; `npm run build` succeeds cleanly across all 24 routes.
  * Full browser walkthrough executed and recorded (`fieldline_final_qa_verification_1792401301846.webp`).

### Stage 5 — Portfolio Presentation & Pitch Readiness (COMPLETED)
* **Objective:** Package the application as an exceptional demonstration asset for prospective commercial clients.
* **Delivered Assets & Architecture:**
  1. Persistent floating **"Demo Navigation Bar"** (`DemoSwitcherDock`) enabling 1-click jumps across Public Website, Customer Portal, and Operations Desk with active venue switching and drawer simulation details.
  2. One-click **"Reset Demo Data"** utility integrated across the dock, portal header, and operations header.
  3. Comprehensive presentation guides created:
     * `DEMO_WALKTHROUGH.md` — 5–7 minute client demonstration walkthrough.
     * `PORTFOLIO_CASE_STUDY.md` — Full technical and product case study.
     * `CLIENT_PITCH_GUIDE.md` — Discovery questions, positioning, and qualification framework.
     * `DEPLOYMENT.md` — Vercel and Node.js deployment instructions.
     * `SCREENSHOT_CHECKLIST.md` — Media asset catalog and recommended capture views.
     * `README.md` — Thorough repository documentation with verified routes and commands.
     * `DECISIONS.md` — ADR-06 architectural decision record.
* **Exit Criteria & Verification:**
  * All documentation verified against active codebase.
  * Application fully demonstrable, responsive, and ready for commercial client presentations.

### Feature 1 — Digital Quotations & Customer Approvals (COMPLETED)
* **Objective:** Implement a complete, interactive commercial quotation workflow integrating the Customer Portal and Staff Operations Dashboard.
* **Implemented Types & Data Models (`src/types/index.ts`):**
  * `QuoteStatus` union type: `draft | awaiting_customer | approved | declined | expired | cancelled`
  * `QuoteLineItem` — individual scope line (description, qty, unitPrice, lineTotal)
  * `QuoteStatusHistoryEntry` — append-only audit log of every state transition
  * `Quote` — master quotation object: `id`, `quoteNumber`, `siteId`, `requestId`, `equipmentId`, `title`, `description`, `lineItems`, `subtotal`, `discount`, `finalTotal`, `currency: 'GBP'`, `expiryDate`, `staffAuthor`, `customerDecisionDate`, `declineReason`, `statusHistory`
  * `CreateQuoteParams` — validated input type for quote builder form
  * `ServiceRequest.linkedQuoteId?: string` — foreign key linking a request to its associated quote
* **Utility Functions (`src/lib/utils.ts`):**
  * `formatGbp(n)` — consistent GBP currency display (£ with 2dp)
  * `calculateLineTotal(qty, price)` — per-line precision arithmetic (×100/100 rounding)
  * `calculateQuoteTotals(lines, discount)` — NaN-safe subtotal/final-total derivation
* **Seed Data (`src/lib/mock-data/quotes.ts`):**
  * `quo-101` (QUO-2026-1048) — `awaiting_customer`, £474.50, Foster EcoFridge, Café Bohème
  * `quo-102` (QUO-2026-6799) — `draft`, £315.00, Hobart Dishwasher, Grandview Hotel
  * `quo-103` (QUO-2026-0934) — `approved`, £1,280.00, Rational SCC, Grandview Hotel
  * `quo-104` (QUO-2026-3317) — `declined`, £640.00, Blue Seal Fryer, Metro Brasserie
* **State Management (`src/lib/store/fieldline-context.tsx`):**
  * `STORAGE_KEYS.QUOTES = 'fl_portal_quotes_v2'`
  * `quotes` state with localStorage persistence and hydration guard
  * `createQuote(params)` — generates `QUO-YYYY-####` reference, computes totals, auto-appends draft milestone to linked `ServiceRequest.activities`
  * `updateQuoteDraft(id, params)` — validates draft-only edits, recomputes totals
  * `presentQuoteToCustomer(id)` — `draft` → `awaiting_customer`, validates non-empty line items, appends "Quotation Presented" milestone to request timeline
  * `approveQuote(id)` — `awaiting_customer` → `approved`, records `customerDecisionDate`, appends milestone
  * `declineQuote(id, reason?)` — `awaiting_customer` → `declined`, stores optional feedback, appends milestone
  * `cancelQuote(id, note?)` — any non-terminal → `cancelled`, staff-side withdrawal
  * `getQuoteById`, `getQuotesBySite`, `getQuotesByRequest` — lookup helpers exposed on context
  * `resetDemoData()` — extended to restore `SEED_QUOTES`
* **Staff Operations Routes (`/admin-demo/quotes/*`):**
  * `/admin-demo/quotes` — Staff quotation register: KPI summary cards (total, drafts awaiting presentation, awaiting customer, approved this month), status filter pills, live search, responsive table with status badges and GBP totals.
  * `/admin-demo/quotes/new?requestId=[id]` — Quote builder: auto-populated request/equipment/site context, dynamic line item rows (add/remove), auto-calculating subtotal/total, discount field, terms textarea, save-as-draft or present-immediately submit actions.
  * `/admin-demo/quotes/[id]` — Quote inspector: full financial breakdown, itemized line items table, status transition controls (Present to Customer / Cancel Quote), scrollable audit timeline of statusHistory entries.
  * **Sidebar badge** — "Digital Quotations" nav item shows count of quotes awaiting presentation + awaiting customer decision.
* **Customer Portal Routes (`/portal-demo/quotes/*`):**
  * `/portal-demo/quotes` — Customer quotation hub: **draft quotes are completely hidden**, shows only `awaiting_customer | approved | declined | expired | cancelled` quotes for the active venue. Header shows pending review count. Search and filter tabs (All / Action Required / Approved / Declined). Pulsing amber indicator on "Review & Authorize" CTA for pending items.
  * `/portal-demo/quotes/[id]` — Quotation detail: responsive header with quote number, status badge and GBP total; full scope description; itemized bill of materials & labour table; linked service request and equipment asset cards; customer decision action bar (Approve / Decline buttons) visible only when `awaiting_customer`; approve confirmation modal with simulation disclosure; decline modal with optional reason textarea; post-decision status banners (approved/declined). Draft or foreign-venue quotes return a helpful context screen instead of exposing internal data.
  * **Sidebar badge** — "Quotations" nav item shows count of quotes awaiting customer review.
* **Request Detail Integration:**
  * `src/app/admin-demo/requests/[id]/page.tsx` — "Commercial Quotation Dossier" card inserted above the Status Transition form. Shows quote reference, status badge, GBP total, line item count, expiry date, portal visibility. Contextual banners for draft/approved/declined states. Falls back to "Create Digital Quote" CTA if no quote is linked.
  * `src/app/portal-demo/(portal)/requests/[id]/page.tsx` — "Commercial Quotation & Scope" section inserted between equipment card and activity timeline. Highlights `awaiting_customer` quotes with amber glow ring and pulsing live indicator; shows approved/declined post-decision banners. Shows "Staff Scoping in Progress" neutral card for draft-only state. Draft quotes do not surface in this section.
* **Design Constraints Honoured:**
  * All amounts displayed in GBP (£). No payment processing, Stripe, invoice PDF, or tax/VAT.
  * No automated email or SMS dispatched. Simulation disclosure on every approval modal.
  * `draft` quotes are strictly invisible to customers in both the quote list and quote detail routes.
* **Build Verification:**
  * `npm run build` exits with code 0, 0 TypeScript errors, all 29 routes prerendered cleanly.

---

## 5. Verification Checklist for Integrated Product

- [x] **Visual Cohesion:** Marketing site, Customer Portal, and Operations Desk share unified typography, borders, and color tokens.
- [x] **Distinct User Experiences:** Portal feels like client self-service; Operations feels like high-density workflow management.
- [x] **Cross-Surface State Reactivity:** Actions in Customer Portal update the Admin view in real time via shared store.
- [x] **Mobile Responsiveness:** Navigation drawers, tables, and metric cards display without clipping or horizontal overflow on 375px+ displays.
- [x] **Form Validation:** Request Service and Log Ticket forms prevent submission with missing fields and display contextual error messages.
- [x] **Accessibility:** All actionable elements are keyboard navigable and meet contrast requirements.
- [x] **Simulation Disclosure:** Prominent but tasteful indicator clarifying that all records are demonstration data.
- [x] **Clean Production Build:** Zero TypeScript compiler errors; Next.js builds cleanly with optimal bundle splitting across all 29 routes.
- [x] **Digital Quotations:** Staff create quotes, present to customer portal, customer approves or declines with feedback; full audit trail recorded.
- [x] **Draft Visibility Boundary:** Draft quotes never surface in the Customer Portal under any route.

