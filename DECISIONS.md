# Fieldline — Architectural Decisions & Assumptions Log

**Document Status:** Working Decisions Register  
**Version:** 1.0.0  
**Last Updated:** October 2026  
**Related Documents:** [PROJECT_BRIEF.md](file:///c:/Users/DARK%20LORD/Desktop/New/PROJECT_BRIEF.md), [IMPLEMENTATION_PLAN.md](file:///c:/Users/DARK%20LORD/Desktop/New/IMPLEMENTATION_PLAN.md)

---

## 1. Confirmed Project Decisions

These decisions have been established and confirmed directly by the project brief and are binding across all implementation stages.

| ID | Topic | Decision | Rationale |
|---|---|---|---|
| **DEC-001** | **Product Scope** | Build three cohesive surfaces in one project: Public Marketing Website, Customer Portal, and Operations Dashboard. | Demonstrates full-stack capability: agency-grade marketing site combined with bespoke B2B operational web application. |
| **DEC-002** | **Project Concept** | Fictional UK commercial kitchen equipment servicing and maintenance company named "Fieldline". | Grounded in high-value B2B service domain (restaurants, hotels, catering, care facilities) that requires equipment tracking and SLA management. |
| **DEC-003** | **Simulation Boundaries** | Strictly fictional demonstration data; no claims of real-world certification, real partner clients, or live dispatch. | Portfolio honesty; legal and ethical compliance; prevents misrepresentation to prospective clients. |
| **DEC-004** | **Preferred Tech Stack** | Next.js (App Router), TypeScript, Tailwind CSS, Lucide icons, Vercel-ready. | Industry standard, high performance, robust component encapsulation, and frictionless cloud deployment. |
| **DEC-005** | **Zero Paid Backend Initially** | No live database (e.g. Supabase, Firebase) or paid third-party APIs during initial stages. | Allows immediate, frictionless demonstration anywhere without credentials, API quotas, or cold-start database latency. |
| **DEC-006** | **Design System Palette** | Deep Navy (`slate-950`/`slate-900`), Slate Grey (`slate-600`/`slate-400`), Warm White (`slate-50`), with a restrained Amber accent (`amber-500`/`amber-600`). | Evokes industrial precision, reliability, and British engineering professionalism; avoids generic or over-saturated SaaS templates. |
| **DEC-007** | **Sequential Staging** | Strict stage-by-stage progression (Stage 0 to Stage 5), requiring completion and verification of each stage before the next begins. | Prevents half-finished or disconnected interfaces; ensures stability and architectural coherence throughout development. |

---

## 2. Documented Assumptions

These are reasonable operational assumptions made to enable effective planning. They are subject to review or user adjustment.

| ID | Assumption | Details & Impact | Status |
|---|---|---|---|
| **ASM-001** | **Geographic & Regional Focus** | The business operates in the United Kingdom. Address formats use UK postcodes (e.g. `EC1A 1BB`, `M1 4BT`), telephone numbers use UK conventions (`+44 020 ...`), and currency is GBP (`£`). | *Reasonable Default (Matches brief)* |
| **ASM-002** | **Shared State Synchronization** | Use a React Context provider with `localStorage` persistence. When a user submits an enquiry or logs a ticket in the Customer Portal, it will appear in the Operations Dashboard on the same device/browser. | *Recommended for Portfolio Demos* |
| **ASM-003** | **Demo Persona Switching** | Instead of mock login password inputs, provide a frictionless 1-click "Select Demo Persona" bar (e.g., switch between *"The Grandview Hotel"*, *"Oakwood Care Suites"*, and *"Service Desk Staff"*). | *Optimized for Client Presentations* |
| **ASM-004** | **Seeded Asset Realism** | Equipment records will feature authentic commercial catering brands and models commonly found in UK kitchens (e.g., Rational iCombi Pro, Foster EcoPro G3 Refrigeration, Hobart Hood-type Dishwashers, Blue Seal Evolution Ranges). | *Enhances B2B Credibility* |
| **ASM-005** | **Next.js & Tailwind Versioning** | Use stable Next.js 14/15 with standard Tailwind CSS v3 configuration for maximum stability and compatibility with UI libraries and Vercel. | *Industry Standard & Robust* |

---

## 3. Recommended Enhancements to the Original Brief

These recommendations are designed to make the portfolio demonstration significantly more compelling to prospective clients without increasing backend complexity.

### REC-001: Persistent Floating "Demo Mode Bar"
* **Concept:** A subtle, collapsible floating bar at the bottom or top of the screen that allows the viewer to instantly switch between:
  1. `Marketing Site`
  2. `Customer Portal (as Grandview Hotel)`
  3. `Customer Portal (as Oakwood Care Suites)`
  4. `Staff Operations Desk (Admin)`
  5. `[Reset Demo Data to Seed Default]`
* **Why this is valuable:** Prospective clients reviewing a web developer's portfolio will often jump between screens. A one-click switcher avoids having to log out, re-navigate, or remember deep URLs.

### REC-002: Printable / PDF-Style Fictional Service Inspection Reports
* **Concept:** Under `/portal-demo/reports`, provide a dedicated "Print / View Certificate" view that renders a formal British Commercial Gas Safety / PPM Certificate format.
* **Why this is valuable:** High-value commercial clients judge service software by how professional the compliance paperwork looks. This proves the developer can build compliance-grade reporting interfaces.

---

## 4. Unresolved Technical & Design Questions

The following questions do not block planning or initial setup, but can be decided as we advance:

1. **Brand Assets & Imagery:** Should we generate custom AI-assisted photorealistic assets of commercial kitchens and stainless steel equipment via `generate_image`, or rely primarily on iconography, SVG diagrams, and curated royalty-free photography?
   * *Recommendation:* Use high-grade SVG illustrations/schematics combined with targeted generated assets for key hero banners.
2. **Enquiry-to-Ticket Pipeline:** Should enquiries submitted on the public marketing page (`/request-service`) automatically convert into an unassigned ticket inside the Operations Desk (`/admin-demo/requests`)?
   * *Recommendation:* Yes. This demonstrates end-to-end integration between marketing conversion and operational software.
3. **Future Backend Readiness:** Is Supabase the preferred future backend if a client requests turning this into a live multi-tenant SaaS?
   * *Recommendation:* Yes; the data schemas have been designed to map 1:1 to standard relational tables in PostgreSQL/Supabase.

---

## 5. Architectural Decision Records (ADRs)

### ADR-01: Single Monorepo/Next.js App vs. Separate Projects
* **Context:** We need a marketing website, a customer portal, and an admin operations desk.
* **Decision:** Implement all three in a single Next.js project using App Router Route Groups (`(marketing)`, `portal-demo`, `admin-demo`).
* **Consequences:** 
  * *Pros:* Shared component library, shared TypeScript models, instant zero-latency cross-surface state sharing via React Context, single deployment URL on Vercel.
  * *Cons:* Requires disciplined layout isolation so the marketing website and dashboards don't bleed layout styles into one another (solved cleanly by route group layouts).

### ADR-02: Client-Side Simulation Engine vs. Mock Service Worker (MSW)
* **Context:** We need realistic data mutations (adding a ticket, changing ticket status) without a live database.
* **Decision:** Build a lightweight React Context + LocalStorage reactive state layer (`FieldlineProvider`).
* **Consequences:**
  * Clean, pure React architecture with custom hooks (`useServiceRequests()`, `useEquipment()`).
  * Easily swappable for real REST or GraphQL/Supabase queries in the future by replacing hook implementations.

### ADR-03: Route Group Shell Isolation & Dynamic Prerendering
* **Context:** The Customer Portal requires an operational layout (sidebar, venue switcher, mobile drawer) completely distinct from the public marketing site, with dynamic parameterized routes (`[id]`) for equipment and tickets.
* **Decision:** Nest operational portal routes under `src/app/portal-demo/(portal)/` so public entry points (`/portal-demo` and `/portal-demo/login`) remain unencumbered, while all dynamic pages wrap hooks in `<Suspense>` to enable partial prerendering under Next.js 16/Turbopack. Provide browser-native printable compliance certificates via `window.print()`.
* **Consequences:**
  * Clean URL structure without route group clutter.
  * Rapid, flawless static compilation for all 17 routes.
  * Real browser print capability that renders authentic CP42 gas certificates without fake PDF download dead links.

### ADR-04: Staff Operations Dashboard Shell & Cross-Surface Bidirectional Synchronization
* **Context:** Stage 3 requires a dedicated internal operational interface (`/admin-demo`) that interacts with the exact same data as the customer portal, supporting real-time status transitions, engineer assignments, and report generation without requiring a live remote backend.
* **Decision:** Implement `/admin-demo` with a high-density operational layout, live KPI badges, technician fleet registry, and multi-faceted work order filters. Integrate `updateRequestStatus` in `FieldlineProvider` so that:
  1. Staff status transitions (`submitted` → `under_review` → `scheduled` → `in_progress` → `completed`) append milestones to the audit timeline.
  2. Marking a request `completed` automatically triggers the generation of an official `ServiceReport`, logs a `ServiceHistoryEntry`, and restores the associated equipment to `operational`.
  3. Dynamic routes (`/admin-demo/requests/[id]`) are isolated with React `<Suspense>` boundaries to guarantee zero-error Next.js 16 prerendering.
* **Consequences:**
  * Demonstrates authentic end-to-end B2B operational workflow (Client logs ticket → Staff reviews & schedules → Engineer executes → Client sees completed status & certificate).
  * Seamless cross-portal reactivity backed by `localStorage` without cold-start database latency.
### ADR-05: Unified Demonstration Dock & Safe Prerendering Boundary
* **Context:** In Stage 4, reviewers and prospective commercial clients need to fluidly transition between the Public Website (`/`), Customer Portal (`/portal-demo/dashboard`), and Operations Desk (`/admin-demo`), inspect active venues, and reset demonstration data at any time without hunting for header buttons or leaving their current page.
* **Decision:** Implement a persistent, collapsible floating demonstration dock component (`DemoSwitcherDock`) placed in `RootLayout`. The dock uses `usePathname()` wrapped within a dedicated `<Suspense fallback={null}>` boundary to comply with Next.js 16 client-hook prerender safety rules, exposing:
  1. Instant 1-click jumps between all three product surfaces.
  2. Quick active customer venue switcher (The Grandview Hotel, Oakwood Care Suites, The Brass Rail Bistro).
  3. "Reset Demo Data" action with immediate UI feedback restoring seeded records.
  4. Expandable simulation overview detailing the architecture for reviewers.
### ADR-06: Portfolio Pitch Presentation & Honest Simulation Disclosure
* **Context:** In Stage 5, the application must serve as a credible sales demonstration for prospective business clients without exaggerating technical status, inventing false client success statistics, or confusing simulation mechanisms with production enterprise infrastructure.
* **Decision:** Establish clear documentation and interface boundaries:
  1. Produce comprehensive demonstration guides: `DEMO_WALKTHROUGH.md` (5-7 minute pitch flow), `PORTFOLIO_CASE_STUDY.md` (technical architecture), `CLIENT_PITCH_GUIDE.md` (discovery questions and honest positioning), `DEPLOYMENT.md` (Vercel & Node hosting), and `SCREENSHOT_CHECKLIST.md` (visual media inventory).
  2. Implement honest simulation disclosures across receipts, ticket receipts, and the persistent Demo Dock, clearly indicating that actions are stored locally in the browser session.
  3. Avoid third-party dependencies for demo actions (e.g., using `window.print()` for certificates rather than brittle PDF libraries; using local storage rather than live backend dependencies).
* **Consequences:**
  * Developer can pitch prospective clients with complete confidence in system reliability.
  * Zero risk of demo failures due to database cold starts or external API outages.
  * Sets an ethical, high-standard precedent for custom software consulting presentations.



### ADR-07: Digital Quotations --- State Machine, Visibility Boundary and GBP Financial Precision
* **Context:** Feature 1 requires a commercial quotation workflow spanning two user interfaces (Customer Portal and Staff Operations Dashboard). Key constraints: (1) draft quotes must be completely invisible to customers; (2) customers approve or decline via the portal with optional decline feedback; (3) all decisions must be audited in both Quote.statusHistory and the linked ServiceRequest.activities timeline; (4) no real payments, Stripe, invoice PDFs, VAT/tax, or email/SMS.
* **Decision:** Implement a unidirectional state machine with six states. Transition enforcement in FieldlineProvider: createQuote always creates as draft; presentQuoteToCustomer requires status===draft and lineItems.length>0; approveQuote requires status===awaiting_customer and expiryDate>now; declineQuote requires status===awaiting_customer; cancelQuote blocked if status===approved or declined.
* **Visibility Boundary:** Portal quote list filters q.status !== draft. Portal quote detail returns a context screen for draft status to prevent data leakage via direct URL.
* **Financial Precision:** Per-line rounding: Math.round(qty x price x 100) / 100. formatGbp uses Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }). No VAT or invoice generation.
* **Audit Trail:** Every state transition appends to both Quote.statusHistory and linked ServiceRequest.activities.
* **Simulation Disclosure:** Every approval modal displays a Portfolio Demonstration Notice --- no payment taken, no binding contract formed.
* **Consequences:**
  * Demonstrates enterprise-grade B2B quotation-to-authorization workflow compelling for commercial client pitches.
  * Draft visibility enforcement prevents data leakage via direct URL navigation.
  * All 29 routes prerender cleanly with 0 TypeScript errors after Feature 1 integration.
