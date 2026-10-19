# Fieldline — Portfolio Screenshot & Media Asset Checklist

**Purpose:** Comprehensive inventory of captured media assets and visual presentation guidelines for portfolio websites, Behance/Dribbble case studies, and client presentations.  
**Related Documents:** [PORTFOLIO_CASE_STUDY.md](file:///c:/Users/DARK%20LORD/Desktop/New/PORTFOLIO_CASE_STUDY.md), [DEMO_WALKTHROUGH.md](file:///c:/Users/DARK%20LORD/Desktop/New/DEMO_WALKTHROUGH.md)

---

## 1. Verified High-Resolution Captured Assets

The following verified image and video captures were generated during automated quality assurance and integration passes and are stored in the project artifacts directory (`<artifactDir>/`):

| Media File | Description / View | Resolution | Primary Use Case |
| :--- | :--- | :--- | :--- |
| `homepage_1792401318556.png` | Public Homepage Hero, Trust Badges & Floating Demo Dock | 1536x776 | Portfolio Cover & Case Study Hero |
| `customer_portal_dashboard_1792401404161.png` | Customer Portal Command Center (KPIs, Active Callouts, Venue Switcher) | 1536x776 | Client Self-Service Showcase |
| `operations_command_center_1792401461577.png` | Staff Operations Command Center (Dispatch Triage & Live Audit Feed) | 1536x776 | Operational Dispatch Desk |
| `work_order_queue_1792401522838.png` | Operations Work Order Queue (Multi-Filters & Urgency Badges) | 1536x776 | Workflow Management Data Table |
| `work_order_inspector_1792401607392.png` | Work Order Detail Inspector (Live Status Transition Controls & Notes) | 1536x776 | Interactive State Management |
| `portal_equipment_1792344078099.png` | Equipment Fleet Register (Search & Category Filtering) | 1536x776 | Asset Management UI |
| `portal_equipment_detail_1792344199587.png` | Equipment Asset Dossier (Specifications & Service History) | 1536x776 | Technical Equipment View |
| `portal_new_request_1792344240815.png` | Interactive Service Request Submission Form | 1536x776 | Form UX & Validation |
| `portal_ticket_details_1792344789123.png` | Customer Ticket Tracker with Assigned Engineer & Milestones | 1536x776 | Transparency & Tracking |
| `customer_portal_completed_1792346520407.png` | Completed Work Order View with Resolution Notes | 1536x776 | Job Resolution & Proof |
| `reset_success_1792401719788.png` | Demo Dock Reset State Feedback Notification | 1536x776 | Demonstration Architecture Feature |
| `fieldline_final_qa_verification_1792401301846.webp` | Full End-to-End Automated Browser Walkthrough Recording | Full Session | Video Demo / Case Study Reel |

---

## 2. Recommended Manual Screenshot Checklist for Custom Portfolio Mockups

If generating custom device mockups (e.g. MacBook Pro, iPad, or iPhone frames for a personal portfolio website or design presentation), capture the following exact views:

### 2.1 Desktop Views (Recommended: 1440 × 900 or 1920 × 1080)
- [ ] **1. Public Homepage Above-the-Fold:** `http://localhost:3000/`  
  *Key elements:* Main navigation bar, *"Uptime is Everything"* headline, dual callouts, UK compliance certification badges.
- [ ] **2. Services & Engineering Standards:** `http://localhost:3000/services`  
  *Key elements:* 4-pillar service breakdown (Emergency Repairs, PPM, Gas Safety CP42, Multi-Site Contracts).
- [ ] **3. Validated Service Enquiry Flow:** `http://localhost:3000/request-service`  
  *Key elements:* Structured form with business details, kitchen location, equipment dropdown, and urgency selector.
- [ ] **4. Customer Dashboard Overview:** `http://localhost:3000/portal-demo/dashboard`  
  *Key elements:* Active site badge (*The Grandview Hotel & Spa*), KPI metric tiles, open tickets banner, upcoming maintenance obligations.
- [ ] **5. Commercial Equipment Register:** `http://localhost:3000/portal-demo/equipment`  
  *Key elements:* Category filter tabs (*Combi Ovens*, *Prime Cooking*, *Refrigeration*), asset cards, condition indicators.
- [ ] **6. Operations Command Center:** `http://localhost:3000/admin-demo`  
  *Key elements:* Dark-themed operations header, dispatch metrics, triage queue, live audit trail timeline.
- [ ] **7. Work Order Inspector & Status Transitioner:** `http://localhost:3000/admin-demo/requests/req-hotel-101`  
  *Key elements:* Status transition buttons, technician assignment dropdown, internal coordinator notes composer.
- [ ] **8. Printable CP42 Compliance Certificate:** `http://localhost:3000/portal-demo/reports`  
  *Key elements:* Interactive certificate modal displaying pass/fail statutory checklist items and engineer sign-off stamp.

### 2.2 Tablet Views (Recommended: 768 × 1024, iPad Portrait)
- [ ] **9. Tablet Customer Dashboard:** `http://localhost:3000/portal-demo/dashboard`  
  *Key elements:* 2-column responsive layout, condensed navigation topbar.
- [ ] **10. Tablet Operations Work Order Queue:** `http://localhost:3000/admin-demo/requests`  
  *Key elements:* Touch-friendly filters and ticket cards.

### 2.3 Mobile Views (Recommended: 375 × 812, iPhone)
- [ ] **11. Mobile Homepage Hero & Nav Sheet:** `http://localhost:3000/`  
  *Key elements:* Mobile header, hamburger menu sheet, stacked action buttons.
- [ ] **12. Mobile Service Ticket Logger:** `http://localhost:3000/portal-demo/requests/new`  
  *Key elements:* Full-width touch form controls, mobile floating Demo Dock.
- [ ] **13. Mobile Ticket Detail Tracker:** `http://localhost:3000/portal-demo/requests/req-hotel-101`  
  *Key elements:* Compact status badge, assigned engineer callout card, chronological activity timeline.

---

## 3. Presentation & Composition Guidelines

When arranging screenshots in portfolio case studies:
1. **Side-by-Side Storytelling:** Show the Customer Ticket View on the left and the Staff Operations View on the right to visually demonstrate how client actions immediately connect to internal dispatch.
2. **Device Stacking:** Display the Desktop Public Website in the background with the Mobile Customer Ticket Tracker in the foreground to demonstrate responsive excellence.
3. **Restrained Annotations:** Use callout arrows pointing to the *Gas Safe badge*, *CP42 certificate*, and *real-time status pill* to show intentional domain realism.
