# Fieldline — 5–7 Minute Client Demonstration Walkthrough

**Document Version:** 1.0.0  
**Target Audience:** Prospective web design & custom web application clients  
**Presenter:** Software Developer / Solutions Consultant  
**Project Role:** Demonstrating full-cycle digital presence (Public Website + Customer Portal + Operations Desk)  
**Related Documents:** [PORTFOLIO_CASE_STUDY.md](file:///c:/Users/DARK%20LORD/Desktop/New/PORTFOLIO_CASE_STUDY.md), [CLIENT_PITCH_GUIDE.md](file:///c:/Users/DARK%20LORD/Desktop/New/CLIENT_PITCH_GUIDE.md), [PROJECT_BRIEF.md](file:///c:/Users/DARK%20LORD/Desktop/New/PROJECT_BRIEF.md)

---

## Overview & Demo Setup

Before beginning the conversation:
1. Ensure the local application is running (`npm run dev` on `http://localhost:3000`).
2. Open `http://localhost:3000/` in your browser.
3. If previously demonstrated, click **"Reset"** in the floating bottom **Demo Dock** to ensure pristine initial data.
4. Have the floating Demo Dock docked at the bottom of the screen.

---

## Part 1 — Introduce the Public Website (1.5 Minutes)

### Goal
Demonstrate how a premium B2B website immediately positions the business as an authoritative, trusted partner and converts visitors into structured service requests.

### Steps to Follow:
1. **Homepage Hero (`/`)**:
   - *What to show:* The headline *"Uptime is Everything"*, sub-headline targeting UK restaurants, hotels, caterers, and healthcare facilities, and dual CTAs (*"Request Emergency Service"* and *"Explore Client Portal"*).
   - *Key Talking Point:* *"Notice how immediately this speaks to commercial kitchen managers. The pain point isn't just 'fixing an oven'—it's preventing catastrophic dinner service stoppages and complying with UK safety standards (Gas Safe, CP42)."*

2. **Core Services & Sectors (`/services`, `/industries`)**:
   - *What to show:* Navigate briefly to `/services` (Emergency Repairs, Planned Preventative Maintenance, Compliance Inspections) and `/industries` (Hotels, Care Homes, Restaurants).
   - *Key Talking Point:* *"Rather than generic bullet points, each service page addresses specific commercial risks—like cold-chain food safety in care homes or high-volume combi oven wear in hotels."*

3. **Interactive Enquiry Form (`/request-service`)**:
   - *What to show:* Click **"Request Service"**. Demonstrate the clean form validation. Fill out a sample enquiry (e.g., Company: *The Savoy Grill*, Category: *Combi Oven*, Urgency: *Critical Emergency*).
   - *Action:* Click **"Submit Demo Enquiry"**.
   - *Result:* An instant, formatted demonstration receipt appears with reference number `FL-ENQ-xxxx` and a clear simulation disclosure.
   - *Key Talking Point:* *"Instead of a blind contact form that sends an unformatted email into a cluttered inbox, this captures structured equipment categories, location postcodes, and urgency tiers upfront."*

---

## Part 2 — Show the Customer Portal Experience (2 Minutes)

### Goal
Demonstrate how a self-service customer portal eliminates repetitive telephone calls, provides real-time transparency into asset health, and builds client retention.

### Steps to Follow:
1. **Portal Entry & Persona Switching (`/portal-demo` or via Demo Dock)**:
   - *What to show:* Click **"Portal"** in the floating Demo Dock or navigate to `/portal-demo/dashboard`.
   - *Action:* Click the top-left venue dropdown in the portal header and show the 3 distinct client personas:
     * *The Grandview Hotel & Spa* (High-volume hotel with 18 tracked assets)
     * *Oakwood Care Suites* (Healthcare facility with strict compliance requirements)
     * *The Brass Rail Bistro* (Independent gastro pub)
   - *Key Talking Point:* *"For multi-site operators or clients managing multiple kitchen assets, this gives them instant visibility without needing our team to manually prepare asset spreadsheets."*

2. **Equipment Fleet Register (`/portal-demo/equipment`)**:
   - *What to show:* Filter by category (e.g., *Refrigeration* or *Combi Oven*) or type *"Rational"* in the search box. Click on an asset to view its detailed dossier (`/portal-demo/equipment/eq-101`), including model number, serial number, last service date, and upcoming PPM obligation.

3. **Log a New Service Ticket (`/portal-demo/requests/new`)**:
   - *What to show:* Click **"Log Service Request"**.
   - *Action:* Select an equipment asset (e.g., *Rational iCombi Pro 10-1/1*), select **"Emergency Breakdown"**, enter:
     * *Title:* `"Water boiler error code E34 and heating element failure"`
     * *Fault Description:* `"Unit tripped circuit breaker during breakfast service. Digital readout flashes error E34."`
   - *Action:* Click **"Submit Service Request"**.
   - *Result:* Ticket is created immediately with reference code `REQ-2026-xxxx`, the asset health degrades to *Critical Failure*, and the customer request detail view opens showing the audit trail.
   - *Key Talking Point:* *"The client immediately has an auditable reference code, sees their asset status update, and has an active activity timeline. No phone tag required."*

---

## Part 3 — Show the Staff Operations Workflow (2 Minutes)

### Goal
Demonstrate how the internal team triages incoming requests, dispatches certified technicians, and synchronizes status updates back to the client in real time.

### Steps to Follow:
1. **Open Operations Command Center (`/admin-demo`)**:
   - *What to show:* Click **"Operations"** on the floating Demo Dock.
   - *Key Talking Point:* *"Now we step into the shoes of the service coordinator or dispatcher. Notice how the user experience shifts: while the customer portal is simplified and clean, the operations dashboard is high-density, showing live triage counters, technician availability, and fleet status."*

2. **Locate the Ticket in the Work Order Queue (`/admin-demo/requests`)**:
   - *What to show:* The ticket just created in the customer portal appears at the top of the queue with a yellow/red urgency badge and status *Submitted*.
   - *Action:* Click into the ticket or click **"Triage & Update"** to open `/admin-demo/requests/[id]`.

3. **Dispatch Engineer & Update Status**:
   - *Action:* In the *Update Work Order Status* panel:
     * Change status from *Submitted* &rarr; **"Scheduled"** or **"In Progress"**.
     * Assign engineer: **"Dave Miller (Gas Safe Certified Commercial Combi Specialist)"**.
     * Add update note: `"Parts verified on van stock. Engineer dispatched to site with ETA 45 mins."`
     * Click **"Update Work Order Status"**.
   - *Result:* Green confirmation banner confirms update; milestone is added to the live audit trail.

4. **Cross-Surface Verification in Customer Portal**:
   - *Action:* Click **"Portal"** on the floating Demo Dock to return to `/portal-demo/requests/[id]` (or navigate back to the customer view).
   - *What to show:* The customer view now displays **"In Progress"**, shows **Dave Miller** as the assigned technician with the updated ETA, and appends the milestone to the client's timeline.
   - *Key Talking Point:* *"Both interfaces share a unified data layer. When your operations staff make an update, the customer sees it instantly on their phone or tablet. This cuts customer check-in calls by up to 70%."*

---

## Part 4 — Explain the Commercial Opportunity (1 Minute)

### Goal
Connect what the prospect just saw to their specific business model.

### Key Talking Points:
1. **Adaptable to Any Service or Trade Industry**:
   *"While this demonstration models commercial catering equipment, the exact same three-tier architecture applies to HVAC contractors, commercial plumbing, facilities management, electrical compliance, or equipment hire."*
2. **Modular Implementation**:
   *"You don't have to build all three layers at once. Many clients start with a high-converting marketing website and structured enquiry flow in Phase 1, then layer on client self-service and operational dispatch as their customer base expands."*
3. **Connecting Front-of-House to Operations**:
   *"Most web designers only build a static brochure site that dumps form submissions into an email inbox. My approach is to connect your public front door with how your business actually runs internally."*

---

## Part 5 — Reset the Demonstration (30 Seconds)

### Goal
Show how easily the demonstration state can be restored to clean baseline seeds for the next presentation.

### Exact Reset Procedure:
1. Locate the floating **Demo Dock** at the bottom center of any page.
2. Click the **"Reset"** button (circular arrow icon).
3. A green notification appears confirming:
   > *"Demonstration data restored to initial pristine seed state."*
4. All newly created test tickets and status changes are removed, and baseline records for *The Grandview Hotel*, *Oakwood Care*, and *The Brass Rail Bistro* are restored.
5. Alternatively, open the Customer Portal header or Admin header, click the **"Reset Demo"** button, and confirm in the modal prompt.
