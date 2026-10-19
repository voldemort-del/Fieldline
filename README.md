# Fieldline — Commercial Kitchen Equipment Servicing & Maintenance Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

Fieldline is an interactive web application and design system concept modeling a UK commercial catering equipment maintenance, breakdown repair, and compliance servicing business.

Created as a comprehensive full-stack portfolio reference, Fieldline demonstrates how a modern service business can connect a high-converting public marketing website with an interactive customer self-service portal and an internal staff operations dispatch dashboard.

---

## 1. Product Surfaces & Architecture

Fieldline integrates three distinct operational surfaces into a single Next.js App Router codebase:

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

1. **Public Marketing Website (`/`)**:
   - Authority positioning targeting UK hotels, restaurants, contract caterers, and healthcare facilities.
   - Comprehensive service explanations (Emergency Repairs, Planned Preventative Maintenance, Gas Safety CP42, Multi-site contracts).
   - Validated multi-step service enquiry flow (`/request-service`) with structured qualification and instant simulated receipts.

2. **Customer Self-Service Portal (`/portal-demo/*`)**:
   - Customer command center with real-time asset health KPIs and active callout tracking.
   - Equipment fleet register with category filters, search, and full asset dossiers (`/portal-demo/equipment/[id]`).
   - Interactive breakdown ticket logger (`/portal-demo/requests/new`) that generates reference codes (`REQ-2026-xxxx`), degrades asset status, and creates live audit timelines.
   - Compliance vault (`/portal-demo/reports`) with browser-native printable CP42 commercial gas safety certificates (`window.print()`).
   - 1-click active customer venue switching (*The Grandview Hotel & Spa*, *Oakwood Care Suites*, *The Brass Rail Bistro*).

3. **Staff Operations Dashboard (`/admin-demo/*`)**:
   - Dispatch command center (`/admin-demo`) with live operational KPI counters and urgent triage banners.
   - Work order queue (`/admin-demo/requests`) with multi-status, priority, and venue filters.
   - Work order inspector (`/admin-demo/requests/[id]`) with live status transition buttons (`submitted` &rarr; `under_review` &rarr; `scheduled` &rarr; `in_progress` &rarr; `completed`), technician dispatching, and internal coordinator notes.
   - Synchronized client accounts directory (`/admin-demo/customers`) and maintenance calendar (`/admin-demo/schedule`).

4. **Global Demonstration Dock (`DemoSwitcherDock`)**:
   - Persistent, collapsible dock floating at the bottom of all pages.
   - Instant 1-click switching between Website, Portal, and Operations Desk.
   - 1-click demo state reset restoring baseline seed data.

---

## 2. Technology Stack

- **Framework:** [Next.js 16.4.2](https://nextjs.org/) (App Router, Server & Client Components, Turbopack)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, fully typed domain models)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Custom tokens for Deep Navy, Slate Grey, and Amber)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Context (`FieldlineProvider`) synchronized with browser `localStorage`
- **Compiler / Bundler:** Next.js Turbopack compiler

---

## 3. Getting Started & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) version **18.18.0** or later
- [npm](https://www.npmjs.com/) (installed with Node.js)

### Installation
```bash
# Clone or navigate to the project directory
cd "path/to/fieldline"

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 4. Key Available Routes

| Surface | Route Path | Description |
| :--- | :--- | :--- |
| **Marketing** | `/` | Commercial servicing homepage & value proposition |
| **Marketing** | `/services` | Emergency repair, PPM, and compliance breakdowns |
| **Marketing** | `/industries` | Sector-focused solutions (Hotels, Care Homes, Restaurants) |
| **Marketing** | `/about` | Company standards, engineering credentials & ethos |
| **Marketing** | `/request-service` | Validated interactive service enquiry flow |
| **Marketing** | `/portal-demo` | Customer portal overview & fast demo launcher |
| **Portal** | `/portal-demo/login` | 1-click demo persona selector |
| **Portal** | `/portal-demo/dashboard` | Customer asset KPIs, active tickets & quick actions |
| **Portal** | `/portal-demo/equipment` | Commercial kitchen equipment fleet register & search |
| **Portal** | `/portal-demo/equipment/[id]` | Asset dossier, technical specs, and service history |
| **Portal** | `/portal-demo/requests` | Service requests hub & tracking |
| **Portal** | `/portal-demo/requests/new` | Interactive ticket logger for emergency breakdowns |
| **Portal** | `/portal-demo/requests/[id]` | Request detail, assigned engineer, and audit timeline |
| **Portal** | `/portal-demo/history` | Chronological maintenance log & replacement parts |
| **Portal** | `/portal-demo/reports` | Printable CP42 gas certificates & safety compliance |
| **Admin** | `/admin-demo` | Operations command center & live triage alerts |
| **Admin** | `/admin-demo/requests` | Work order dispatch queue with multi-filters |
| **Admin** | `/admin-demo/requests/[id]` | Work order inspector, status updater & coordinator notes |
| **Admin** | `/admin-demo/equipment` | Multi-venue asset fleet management |
| **Admin** | `/admin-demo/customers` | Contracted client directory & SLA tiers |
| **Admin** | `/admin-demo/schedule` | Centralized PPM and dispatch calendar |
| **Admin** | `/admin-demo/reports` | Operational compliance records & certificate inspector |

---

## 5. Build, Lint & Verification Commands

```bash
# Run production build with Next.js Turbopack
npm run build

# Run ESLint validation
npm run lint

# Start production server locally after build
npm run start
```

---

## 6. How to Reset Demonstration Data

To restore all records to their initial pristine seed state at any time:
1. Locate the floating **Demo Dock** at the bottom center of any page.
2. Click the **"Reset"** button (circular arrow icon).
3. A confirmation notification will appear, and local demonstration tickets, notes, and status changes will be reset.
4. Alternatively, click the **"Reset Demo"** button in the Customer Portal topbar or Staff Operations topbar.

---

## 7. Deployment Instructions

This project is configured for deployment on [Vercel](https://vercel.com) or any standard Node.js SSR hosting environment.

For detailed deployment steps, see [DEPLOYMENT.md](file:///c:/Users/DARK%20LORD/Desktop/New/DEPLOYMENT.md).

```bash
# Deploying via Vercel CLI
npx vercel
```

---

## 8. Portfolio Context & Simulation Boundaries

**Important Transparency Notice:**  
Fieldline is an independent portfolio demonstration created by the developer to illustrate custom web application design, UI/UX architecture, and technical capability. It is not commissioned work, does not represent an operating company, and does not invent real customer revenue metrics.

- **Data Persistence:** Records persist locally within your browser session using `localStorage`. No remote database is required to run the demo.
- **Authentication:** Role switching is simulated via 1-click persona selectors. No real passwords or production OAuth providers are enabled.
- **Notifications:** Receipts and dispatch notifications are simulated locally without triggering real third-party SMS or email APIs.

---

## 9. Accompanying Documentation

- [DEMO_WALKTHROUGH.md](file:///c:/Users/DARK%20LORD/Desktop/New/DEMO_WALKTHROUGH.md) — 5–7 minute client presentation guide.
- [PORTFOLIO_CASE_STUDY.md](file:///c:/Users/DARK%20LORD/Desktop/New/PORTFOLIO_CASE_STUDY.md) — Technical case study detailing design decisions and architecture.
- [CLIENT_PITCH_GUIDE.md](file:///c:/Users/DARK%20LORD/Desktop/New/CLIENT_PITCH_GUIDE.md) — Discovery questions and conversation guide for business prospects.
- [DEPLOYMENT.md](file:///c:/Users/DARK%20LORD/Desktop/New/DEPLOYMENT.md) — Production hosting and deployment instructions.
- [SCREENSHOT_CHECKLIST.md](file:///c:/Users/DARK%20LORD/Desktop/New/SCREENSHOT_CHECKLIST.md) — Media asset inventory and screenshot capture guidelines.
- [QA_REPORT.md](file:///c:/Users/DARK%20LORD/Desktop/New/QA_REPORT.md) — Complete quality assurance audit results.
- [DECISIONS.md](file:///c:/Users/DARK%20LORD/Desktop/New/DECISIONS.md) — Architecture decision records (ADRs 01–06).

---

## License

This project is released under the [MIT License](LICENSE).
