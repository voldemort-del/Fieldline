# Fieldline — Commercial Kitchen Equipment Servicing & Operations Platform

**Project Type:** Concept Web Application & B2B Design System  
**Role:** Lead Architect, Product Strategist, UI/UX Designer & Full-Stack Developer  
**Status:** Complete Portfolio Demonstration (Production Build Verified)  
**Stack:** Next.js 16 (App Router & Turbopack), React 19, TypeScript, Tailwind CSS, Lucide Icons, Browser LocalStorage State Engine  
**Related Documents:** [DEMO_WALKTHROUGH.md](file:///c:/Users/DARK%20LORD/Desktop/New/DEMO_WALKTHROUGH.md), [CLIENT_PITCH_GUIDE.md](file:///c:/Users/DARK%20LORD/Desktop/New/CLIENT_PITCH_GUIDE.md), [QA_REPORT.md](file:///c:/Users/DARK%20LORD/Desktop/New/QA_REPORT.md)

---

## 1. Project Overview

Fieldline is a comprehensive portfolio demonstration modeling an end-to-end digital platform for a fictional UK commercial catering equipment maintenance and repair business. 

Rather than treating a business website as an isolated static brochure, Fieldline bridges three operational surfaces into a unified application architecture:
1. **Public Marketing Website:** A high-converting, authoritative B2B website focused on positioning, compliance standards (Gas Safe, CP42), and structured service intake.
2. **Customer Self-Service Portal:** A dedicated client workspace where hotel, restaurant, and healthcare facilities managers inspect equipment registers, track live breakdown callouts, and access statutory compliance certificates.
3. **Staff Operations Dashboard:** A high-density command center allowing service dispatchers to triage incoming work orders, assign certified technicians, manage maintenance calendars, and communicate milestones.

The project demonstrates how modern web engineering can solve both customer-acquisition and operational workflow challenges under a single cohesive brand.

---

## 2. The Business Problem Being Explored

Commercial catering equipment servicing operates in a high-stakes, time-critical environment. In commercial kitchens, equipment failure directly threatens business revenue, food safety compliance, and dinner service continuity. 

Traditional service contractors often struggle with predictable friction points:
- **Disorganized Service Intake:** Emergency breakdown calls arrive via unstructured emails and frantic phone calls, resulting in missing model numbers, unknown serial tags, and delayed parts procurement.
- **Customer Blind Spots:** Restaurant chefs and hotel operations managers must repeatedly telephone the service desk to ask, *"Is an engineer on the way?"*
- **Scattered Maintenance & Compliance Records:** Statutory compliance certificates (such as UK CP42 commercial gas safety records) are often trapped in paper binders or disparate PDF emails, making health inspections stressful.
- **Disconnected Systems:** The public marketing website is rarely connected to the internal dispatch software, requiring staff to re-type enquiries manually.

Fieldline was designed specifically to model how modern software architecture eliminates these operational bottlenecks.

---

## 3. The Proposed Solution

Fieldline solves these challenges through a three-layer interconnected product:

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
│             DATA & SIMULATION LAYER (React Context + Storage)          │
│   • Typed Schema Models (Customers, Equipment, Requests, Reports)      │
│   • Bidirectional Reactivity (Portal Submissions &rarr; Admin Dispatch)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Features Implemented & Verified

### 4.1 Public Marketing Website
- **Authority Positioning Hero:** Articulates the commercial stakes of kitchen downtime (*"Uptime is Everything"*).
- **Service & Industry Deep-Dives:** Dedicated pages for Emergency Repairs, Planned Preventative Maintenance (PPM), Gas Safety Inspections, Restaurants, Hotels, and Care Facilities.
- **Validated Multi-Step Service Enquiry (`/request-service`):** Captures business details, postcodes, equipment categories, and urgency ratings with client-side validation and simulated instant receipt generation.
- **Customer Portal Entry Points:** Transparent demonstration entryways with 1-click persona selectors.

### 4.2 Customer Portal Demo
- **Customer Command Center (`/portal-demo/dashboard`):** Real-time asset health KPIs, active callouts, and upcoming maintenance visits.
- **Equipment Fleet Register (`/portal-demo/equipment`):** Instant search, category tabs (Combi Ovens, Refrigeration, Warewashing), warranty statuses, and full asset dossiers (`/portal-demo/equipment/[id]`).
- **Interactive Ticket Submission (`/portal-demo/requests/new`):** Validated ticket logging that generates unique reference codes (`REQ-2026-xxxx`), updates open request counts, and degrades asset operational health in real time.
- **Compliance & History Vault (`/portal-demo/reports`, `/portal-demo/history`):** Complete historical service logs with printable browser-native CP42 commercial catering gas safety certificates (`window.print()`).
- **Multi-Venue Switching:** 1-click switching between *The Grandview Hotel & Spa*, *Oakwood Care Suites*, and *The Brass Rail Bistro*.

### 4.3 Staff Operations Dashboard
- **Operations Command Center (`/admin-demo`):** Live operational KPI badges, urgent triage banners, and cross-venue activity audit feeds.
- **Work Order Queue (`/admin-demo/requests`):** Multi-filter search (status, urgency, venue) across all client tickets.
- **Work Order Inspector & Status Transitioner (`/admin-demo/requests/[id]`):** Live state transitions (`submitted` &rarr; `under_review` &rarr; `scheduled` &rarr; `in_progress` &rarr; `completed`), technician dispatching, and internal coordinator notes.
- **Client Account Directory (`/admin-demo/customers`):** Commercial client directory with SLA contract tiers, asset counts, and contact dossiers.
- **Dispatch Schedule (`/admin-demo/schedule`):** Centralized preventative maintenance calendar.

### 4.4 Unified Demonstration Dock (`DemoSwitcherDock`)
- Persistent floating dock mounted globally in `RootLayout`.
- 1-click switching between Website, Portal, and Operations Desk.
- Drawer controls detailing the simulation engine and active venue picker.
- Instant **"Reset Demo Data"** action restoring baseline seed records.

---

## 5. Technology & Architecture Decisions

| Technology | Purpose in Project | Rationale |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Framework & Routing | Modern server/client route groups (`(marketing)`, `(portal)`), fast layout nesting, and optimal bundle splitting with Turbopack. |
| **TypeScript** | Strict Type System | Fully typed domain entities (`CustomerSite`, `CommercialEquipment`, `ServiceRequest`, `ServiceReport`) preventing runtime defects. |
| **Tailwind CSS v4** | Design System Tokens | Curated HSL color palette (Deep Navy `#020617`, Slate `#475569`, Amber `#d97706`), custom responsive utilities, and fluid typography. |
| **Lucide Icons** | Semantic Iconography | Clean, consistent UI iconography across technical data tables, status badges, and navigation drawers. |
| **React Context + LocalStorage** | Simulation State Engine | Provides realistic bidirectional data mutation across surfaces without the cost or latency of a live remote database. |

---

## 6. Challenges & Implementation Lessons

1. **Next.js 16 Prerendering Boundaries for Client Hooks**:
   - *Challenge:* Next.js 16 with Turbopack blocks static prerendering if URL client hooks like `usePathname()` are evaluated outside of `<Suspense>` boundaries on dynamic routes.
   - *Solution:* Isolated `DemoSwitcherDock` and route group headers within dedicated `<Suspense fallback={null}>` wrappers. This enabled all 24 routes to compile cleanly to static HTML and partial prerenders.
2. **Authentic Service Reports Without Heavy PDF Dependencies**:
   - *Challenge:* Generating server-side PDFs often introduces heavy serverless dependencies or broken client download links.
   - *Solution:* Built a browser-native print stylesheet utilizing `@media print` for CP42 safety certificates. Users can click *"Print / Save Certificate"* and immediately generate a standardized, print-ready document directly via their browser's native print engine.
3. **Cross-Surface State Synchronization**:
   - *Challenge:* Actions performed in the customer portal (e.g. logging a breakdown) needed to reflect immediately when navigating to the staff dashboard without stale data.
   - *Solution:* Implemented a unified React Context provider (`FieldlineProvider`) synchronized with `localStorage` events. State mutations immediately update the in-memory React state and persist locally.

---

## 7. Project Status & Simulation Boundaries

To maintain complete professional integrity, Fieldline clearly distinguishes implemented frontend systems from simulated infrastructure:

| Capability | Implementation Level | Notes |
| :--- | :--- | :--- |
| **UI/UX Design System** | Fully Implemented | Complete custom component library (buttons, inputs, cards, tables, badges). |
| **Public Marketing Pages** | Fully Implemented | All 6 public routes fully responsive and populated with credible copy. |
| **Portal & Operations UX** | Fully Implemented | All 18 application routes interactive, searchable, and filterable. |
| **Data Reactivity** | Fully Implemented (Client-Side) | Mutations persist locally in browser storage across all pages. |
| **Authentication & RBAC** | Simulated | 1-click persona switching; no real passwords or production OAuth. |
| **Database & API Backend** | Simulated | In-memory + LocalStorage; swappable for PostgreSQL/Supabase. |
| **SMS/Email Notifications** | Simulated | Confirmation receipts and mock notices; no external SMS/email APIs triggered. |

---

## 8. Commercial Adaptability

This three-tier digital approach can be adapted to any service-based commercial business:
- **Commercial Contractors:** HVAC maintenance, electrical contracting, commercial roofing, fire protection.
- **Equipment Hire & Leasing:** Heavy plant machinery, medical equipment, audio-visual staging.
- **Facilities Management:** Multi-site property management, cleaning services, statutory compliance auditing.

During client scoping, the architecture is tailored to the client's current maturity: Phase 1 establishes the public website and structured enquiry capture; Phase 2 introduces client self-service; Phase 3 connects internal operations.

---

## 9. Project Results & Verification

- **24/24 Routes Compiled & Prerendered** with Next.js Turbopack and zero errors.
- **Zero TypeScript or Lint Errors** across the entire repository.
- **100% Verified Browser Automation Walkthrough** documented in [`QA_REPORT.md`](file:///c:/Users/DARK%20LORD/Desktop/New/QA_REPORT.md).
- *Disclosure:* Fieldline is an independent portfolio demonstration created by the developer. It is not commissioned work, does not represent an operating company, and does not invent unverified customer revenue metrics.
