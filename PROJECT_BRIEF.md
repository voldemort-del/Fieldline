# Fieldline — Project Brief

**Document Status:** Approved Project Specification  
**Version:** 1.0.0  
**Last Updated:** October 2026  
**Authoritative Reference:** This document defines the product identity, scope, user personas, design system principles, and operational boundaries for Fieldline. All implementation stages must adhere to this specification.

---

## 1. Executive Summary & Product Identity

### 1.1 Brand Identity
* **Working Project Name:** Fieldline
* **Concept:** A premium, integrated web presence and operations showcase for a specialist UK commercial kitchen equipment servicing, maintenance, and compliance management company.
* **Target Industry:** Commercial catering and food service facilities across the United Kingdom, specifically serving:
  * Restaurants & Fine Dining
  * Hotels & Hospitality Venues
  * Contract & Education Caterers
  * Care Homes & Healthcare Facilities
* **Operating Ethos:** Planned reliability, responsive emergency repairs, statutory equipment compliance, and transparent asset management.

### 1.2 Portfolio & Demonstration Purpose
Fieldline is a high-fidelity reference and portfolio project demonstrating two complementary capabilities:
1. **Premium B2B Website Development:** A commercial website that establishes brand credibility, articulates specialized services, segments industry solutions, and converts traffic through structured enquiry and quote workflows.
2. **Custom Web Application Development:** An interactive customer portal and staff operations dashboard demonstrating how specialized field-service workflows, equipment tracking, work orders, service histories, and maintenance schedules can be digitised.

### 1.3 Honesty, Compliance & Simulation Boundaries
* **Fictional Data Only:** All customer organisations, contact persons, equipment serial numbers, maintenance records, engineer notes, service reports, and performance metrics are strictly fictional demonstration data.
* **No Real-World Claims:** Fieldline is a concept project. It makes no claims of real-world accreditation (e.g., Gas Safe register numbers, ISO certifications, trade association memberships), real performance guarantees (e.g., guaranteed 2-hour emergency arrival), or existing commercial client relationships.
* **Simulation Transparency:** All interactive forms and demo workflows must clearly disclose their simulated nature (e.g., *"Demo Mode: Request simulated locally for demonstration purposes"*). No automated emails, SMS, or dispatch notifications are sent to real endpoints.

---

## 2. Intended Users & Persona Profiles

The Fieldline platform serves three distinct user personas across three cohesive product surfaces.

### 2.1 Persona A: Prospective Business Customer
* **Profile:** Executive Chef, Catering Director, Facilities Manager, or General Manager seeking a reliable service partner for commercial kitchen appliances (cooking ranges, rational ovens, refrigeration, dishwashers, extraction).
* **Primary Needs:**
  * Understand services quickly (repairs vs. planned maintenance vs. safety inspections).
  * Verify domain relevance to their specific industry (e.g., care home food-safety compliance vs. hotel banqueting uptime).
  * Submit a detailed quote or service request without administrative friction.
  * Preview the technology advantage of choosing Fieldline (interactive customer portal).
* **Key User Journey:** Landing on Homepage &rarr; Exploring Services / Industry Pages &rarr; Request Service Enquiry Form &rarr; Portal Demo Teaser & Entry.

### 2.2 Persona B: Existing Business Customer (Portal Demo)
* **Profile:** On-site Operations Manager or Head Chef at a client organisation (e.g., *"The Grandview Hotel & Spa"* or *"Crown Commercial Caterers"*).
* **Primary Needs:**
  * Review all registered assets across kitchen stations (refrigeration, prime cooking, warewashing).
  * Check warranty, service status, serial numbers, and upcoming inspection dates.
  * Submit new breakdown or repair requests with urgency levels and issue descriptions.
  * Track active request status from triage through engineer dispatch to completion.
  * Access downloadable/viewable service reports and safety sign-offs.
* **Key User Journey:** Portal Demo Sign-in &rarr; Dashboard Overview &rarr; Equipment Register &rarr; Log Service Request &rarr; Request Status & History Tracking &rarr; Service Reports.

### 2.3 Persona C: Fieldline Operations Staff (Admin Operations Demo)
* **Profile:** Service Dispatcher, Service Desk Coordinator, or Operations Lead coordinating field engineers and client commitments.
* **Primary Needs:**
  * View unified queue of incoming requests, unassigned work orders, and scheduled PPM (Planned Preventative Maintenance).
  * Filter and inspect request details, client history, and specific equipment asset profiles.
  * Update work order statuses (e.g., `Logged` &rarr; `Assigned` &rarr; `In Progress` &rarr; `Awaiting Parts` &rarr; `Completed`).
  * Review technician service notes, parts used, and compliance certificates.
  * View scheduled maintenance calendar/obligations.
* **Key User Journey:** Operations Dashboard &rarr; Work Order Queue &rarr; Request Detail View &rarr; Status & Notes Update &rarr; Maintenance Schedule View.

---

## 3. Product Scope & Functional Architecture

The product is delivered as a single cohesive web application divided into three clearly demarcated zones.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FIELDLINE WEB PLATFORM                          │
├───────────────────────────────────┬────────────────────────────────────┤
│      PUBLIC MARKETING WEBSITE     │        APPLICATION PORTALS         │
│  (Brand, Services, Conversion)    │    (Simulated Interactive B2B)     │
├───────────────────────────────────┼──────────────────┬─────────────────┤
│ • / (Homepage)                    │ CUSTOMER PORTAL  │ OPERATIONS DESK │
│ • /services                       │ (Client Self-    │ (Staff Internal │
│ • /industries                     │  Service)        │  Management)    │
│ • /about                          ├──────────────────┼─────────────────┤
│ • /request-service                │ • /portal-demo/* │ • /admin-demo/* │
│ • /portal-demo (Intro/Entry)      │                  │                 │
└───────────────────────────────────┴──────────────────┴─────────────────┘
```

### 3.1 Part A: Public Marketing Website

| Route | Page Title | Primary Functional Purpose |
|---|---|---|
| `/` | Homepage | High-impact commercial value proposition, key service pillars, client sector highlights, workflow preview, social proof concept, and direct calls to action. |
| `/services` | Services Overview | Detailed breakdown of core offerings: Emergency Repairs, Planned Preventative Maintenance (PPM), Statutory Compliance & Gas Inspections, and Multi-Site Fleet Management. |
| `/industries` | Industries Served | Tailored operational value propositions for Restaurants & Bars, Hotels & Hospitality, Contract Catering, and Healthcare/Care Homes. |
| `/about` | About Fieldline | Fictional company ethos, British commercial kitchen industry context, engineering standards, approach to uptime, and team culture. |
| `/request-service` | Service Enquiry Form | Dynamic multi-step enquiry form capturing business type, equipment category, urgency level, contact details, and issue specifics. Features robust validation and simulated submission receipt. |
| `/portal-demo` | Portal Showcase & Entry | Interactive landing page explaining the client portal capabilities, offering one-click entry into pre-seeded demo client profiles. |

### 3.2 Part B: Customer Portal (`/portal-demo/*`)

| Sub-Route | View | Description & Capabilities |
|---|---|---|
| `/portal-demo/login` | Demo Sign-In / Persona Picker | Fast 1-click access to pre-seeded demo customer accounts (e.g., *"Grandview Hotel & Suites"*, *"The Brass Rail Bistro"*), bypassing real auth. |
| `/portal-demo/dashboard` | Client Overview Dashboard | Summary metrics (Active Assets, Open Service Requests, Next Scheduled PPM, Recent Service Reports), critical alerts, and quick actions. |
| `/portal-demo/equipment` | Registered Equipment Register | Searchable, filterable list of all kitchen assets with model, serial, kitchen zone, condition rating, and warranty status. |
| `/portal-demo/equipment/[id]` | Equipment Detail View | Comprehensive asset dossier: technical specifications, complete service timeline, maintenance history, and linked service requests. |
| `/portal-demo/requests` | Service Requests Hub | Active and closed ticket tracker with real-time status pills (`Logged`, `Triage`, `Scheduled`, `Completed`), urgency badges, and detail modal/drawer. |
| `/portal-demo/requests/new` | Log Service Request | Form to report a fault on an existing asset or general station, specify urgency, upload mock attachments, and immediately see the ticket enter the shared store. |
| `/portal-demo/history` | Service History Log | Chronological audit trail of all previous engineer attendances, resolution summaries, and response durations. |
| `/portal-demo/reports` | Fictional Service & Safety Reports | Index of downloadable/printable inspection documents, gas safety certificates, and PPM sign-off records with structured inspection checklists. |

### 3.3 Part C: Internal Operations Dashboard (`/admin-demo/*`)

| Sub-Route | View | Description & Capabilities |
|---|---|---|
| `/admin-demo` | Operations Overview | Command center showing real-time service metrics: Pending Requests, Active Dispatches, Overdue Maintenance, First-Time Fix Rate, and engineer availability. |
| `/admin-demo/requests` | Work Order Management Queue | Full-width operational table with multi-tier filters (by status, priority, client, equipment category). Fast drawer/detail inspect. |
| `/admin-demo/requests/[id]` | Work Order Detail & Dispatch | Deep view of the work order: customer contact, asset history, issue report, assigned engineer, and interactive status progression controls. |
| `/admin-demo/maintenance` | Maintenance & PPM Calendar | Fictional schedule of statutory inspections and planned visits across all contracted client sites. |
| `/admin-demo/clients` | Client Accounts Register | Operational view of client organisations, site contacts, contract tiers, and aggregate asset counts. |

---

## 4. Visual Design Direction & System Principles

The aesthetic identity is engineered to communicate **rigorous British industrial engineering, reliability, operational calm, and precision.**

### 4.1 Color Palette
* **Primary Deep Navy:** `slate-950` / `#0B1120` & `slate-900` / `#0F172A` — Creates an authoritative, premium foundation.
* **Secondary Slate Grey:** `slate-600` / `#475569`, `slate-400` / `#94A3B8`, `slate-200` / `#E2E8F0` — Neutral, legible, architectural structures.
* **Warm Clean White:** `slate-50` / `#F8FAFC` & `#FFFFFF` — High-contrast canvas surfaces.
* **Amber / Safety Accent:** `amber-500` / `#F59E0B` & `amber-600` / `#D97706` — Used with restraint for active calls-to-action, urgent status indicators, and industrial equipment accents.
* **Semantic Status Accents:**
  * Success / Operational: `emerald-600` / `#059669`
  * In Progress / Scheduled: `blue-600` / `#2563EB`
  * Attention / Warning: `amber-600` / `#D97706`
  * Critical / Breakdown: `rose-600` / `#E11D48`

### 4.2 Typography & Hierarchy
* **Primary Sans-Serif:** Clean, technical sans font (`Inter` or system UI font stack) featuring crisp tabular figures for equipment serials and metrics.
* **Hierarchy:**
  * Hero Display: Bold, tight letter-spacing (`tracking-tight`), commanding commercial tone.
  * Section Headers: Clear categorical labels with uppercase subtitles (`text-xs font-semibold uppercase tracking-wider text-amber-600`).
  * Body Text: Highly legible slate tones (`text-slate-600` on light, `text-slate-300` on dark) with generous line heights.
  * Technical Data: Monospace elements for serial numbers, asset tags, and ticket IDs (`font-mono text-xs`).

### 4.3 Structural & UI Patterns
* **Spacing:** Deliberate, spacious layout grid (8pt system, standard Tailwind spacing scales) with clear visual breathing room.
* **Borders & Elevation:** Crisp 1px borders (`border-slate-200` or `border-slate-800`), restrained soft shadows (`shadow-sm`, `shadow-md`), eliminating heavy or messy drop-shadows.
* **Surfaces:** Solid, functional surfaces avoiding decorative blurry glassmorphism or high-contrast neon gradients.
* **Component Styling:** Reusable buttons (Primary Amber, Secondary Slate, Ghost), pill badges with subtle backgrounds, high-density data tables with hover states, accessible form inputs with active focus rings.

---

## 5. Technical Constraints & Architecture Principles

### 5.1 Technology Stack
* **Framework:** Next.js (App Router, React Server & Client Components)
* **Language:** TypeScript (Strict mode enabled, strict typing on all domain models)
* **Styling:** Tailwind CSS (Utility-first, structured design tokens)
* **Icons:** Lucide React (Standardized sizing and stroke width)
* **State Management:** In-memory client-side mock store with `localStorage` persistence, allowing state changes (e.g. creating a ticket in the portal) to immediately appear in the admin operations dashboard during live client demonstrations.
* **Deployment Compatibility:** Vercel-ready, zero-config production build.

### 5.2 Simulation & Data Constraints
* **No External Database or Backend:** Initial implementation is self-contained. No live Supabase, Firebase, or external API keys required to run.
* **Separation of Concerns:** Clear boundary between view components and data layers (`src/lib/mock-data/` and `src/lib/store/`). If a backend (e.g., Supabase PostgreSQL) is connected in the future, the UI components will not require structural rewrites.
* **Deterministic Seeds:** Rich, pre-populated fictional records for multiple realistic venues, commercial cooking suites, rational combi ovens, refrigeration banks, and past service orders.

---

## 6. Quality & Acceptance Benchmarks

1. **Accessibility & Contrast:** All text must meet WCAG 2.1 AA contrast standards against its background.
2. **Zero Dead Links / Controls:** Every button, tab, filter, and link must produce a tangible, functional action or explicit notification.
3. **Responsive Fluidity:** Perfect layout fidelity across mobile (375px+), tablet (768px+), laptop (1024px+), and wide desktop (1440px+).
4. **Interactive State Completeness:** All forms and data views must implement loading, active, empty, error, and success states.
5. **Role Demarcation:** Public site, Customer Portal, and Staff Operations must have distinctive layout shells and navigation headers while retaining the overarching Fieldline brand DNA.
6. **Lint & Build Cleanliness:** Zero TypeScript errors, zero unresolved imports, and clean Next.js production builds.

---

## 7. Out-of-Scope Features (Demonstration Boundaries)

To preserve focus on polished, meaningful user experience and client demonstration value, the following are explicitly deferred:
* Production authentication services (OAuth, Auth0, Supabase Auth).
* Real payment gateways (Stripe, card readers, invoice processing).
* Live telematics, real-time GPS fleet tracking, or live map APIs.
* Real email or SMS dispatch notifications (SendGrid, Twilio).
* Integration with physical equipment IoT telemetry sensors.
