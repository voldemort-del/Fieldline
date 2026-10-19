# Fieldline — Client Pitch & Discovery Guide

**Purpose:** Practical conversation guide for presenting custom web application and design capabilities to prospective business clients.  
**Presenter:** Software Developer / Solutions Consultant  
**Project Reference:** Fieldline ([DEMO_WALKTHROUGH.md](file:///c:/Users/DARK%20LORD/Desktop/New/DEMO_WALKTHROUGH.md), [PORTFOLIO_CASE_STUDY.md](file:///c:/Users/DARK%20LORD/Desktop/New/PORTFOLIO_CASE_STUDY.md))

---

## 1. The 20–30 Second Introduction

When introducing your work to a prospective client, use a conversational, professional tone that establishes technical capability without aggressive sales jargon:

> *"I’ve prepared a project called Fieldline that demonstrates how I design and build modern business web applications. It models a commercial equipment servicing company across three connected layers: a high-converting public marketing website, a self-service customer portal, and an internal operations dispatch dashboard.*  
>  
> *Rather than treating a website as a static digital brochure that just dumps messages into an email inbox, I focus on connecting how a business attracts clients with how it actually manages work behind the scenes. Let me show you how that workflow operates."*

---

## 2. Explaining the Three-Tier Architecture Simply

Explain the purpose of each layer in terms of **business value**:

1. **The Public Marketing Website:**
   - *Client Benefit:* Generates qualified leads by positioning the company as an authoritative, compliance-ready partner. The structured enquiry form collects equipment make, model, postcode, and urgency upfront, preventing back-and-forth emails.
2. **The Customer Self-Service Portal:**
   - *Client Benefit:* Eliminates repetitive phone calls (*"Where is the engineer?", "Can you re-send my gas certificate?"*). Customers log faults directly against their registered equipment and view live ticket progress.
3. **The Staff Operations Dashboard:**
   - *Client Benefit:* Centralizes triage, technician dispatching, and service history. Staff have full visibility over active jobs without maintaining messy spreadsheets.

---

## 3. Practical Discovery Questions for Prospects

Use these questions during the initial consultation to diagnose the client's actual pain points before recommending a solution:

### On Service Intake & Customer Inquiries
- *"When a customer needs service or a repair today, how do they typically contact your team?"*
- *"How often do incoming service requests arrive missing critical details (like model numbers, photos, or exact location)?"*
- *"What are the most frequent questions your customers call in to ask after they’ve submitted an enquiry?"*

### On Operations & Job Tracking
- *"How does your team currently keep track of jobs between the initial call, scheduling the technician, and final invoicing?"*
- *"Where do job completion notes, photos, and compliance or safety certificates live once a job is finished?"*
- *"Which part of your current administrative process causes the most manual data entry or communication errors?"*

### On Their Existing Digital Presence
- *"What does your current website fail to do for you right now?"*
- *"Do you view your website primarily as a credibility card, or do you want it actively qualifying and capturing new business?"*

---

## 4. Adapting the Demonstration to the Prospect

Do not try to show every screen to every client. Tailor the walkthrough to what the prospect actually needs:

| Prospect Type | What to Focus On in Fieldline | What to Skip / De-emphasize |
| :--- | :--- | :--- |
| **New or Local Trade Business** *(Needs more leads & brand credibility)* | • Homepage hero & value proposition<br>• Services & sector pages (`/services`, `/industries`)<br>• Interactive enquiry form (`/request-service`) with structured qualification | Skip deep operations dashboard; explain that the enquiry form can send clean notifications straight to their email or CRM. |
| **Established Contractor** *(Drowning in phone calls & dispatch friction)* | • Customer Portal ticket logging (`/portal-demo/requests/new`)<br>• Real-time ticket status updates (`/portal-demo/requests/[id]`)<br>• Operations queue & engineer dispatch (`/admin-demo/requests`) | Keep marketing site brief; spend 80% of the demo showing how an update in Admin instantly updates the Customer Portal. |
| **Asset-Heavy or Maintenance Business** *(Managing equipment fleets & compliance)* | • Equipment register (`/portal-demo/equipment`)<br>• Maintenance schedule (`/admin-demo/schedule`)<br>• Statutory compliance certificates (`/portal-demo/reports`) | Focus on the asset dossier and printable CP42 safety reports; show how compliance records stay organized. |

---

## 5. Scope, Timeline & Budget Discovery

Before proposing any project scope, establish clear business parameters:

### Core Qualifying Questions:
1. **The Desired Outcome:**
   - *"If we build this platform together, what metric or result tells you in 6 months that the investment was a total success?"* (e.g. 30% more enquiries, saving 10 hours of staff admin per week).
2. **Current Tooling & Integrations:**
   - *"Are you already using existing accounting software (like Xero or QuickBooks) or scheduling tools that we would need to integrate with, or are you looking for a clean, purpose-built system?"*
3. **Phasing & Prioritization:**
   - *"Would it make sense to roll this out in phases—for instance, launching the new public website and enquiry flow in Phase 1, followed by client self-service in Phase 2?"*
4. **Timeline & Decision Makers:**
   - *"Is there a specific business event, contract renewal, or date driving your timeline? Who else on your team will be involved in evaluating the technical approach?"*

---

## 6. Honest Positioning & Ethics

Always maintain transparent, professional boundaries regarding the Fieldline project:

- **Acknowledge the Portfolio Context:**  
  *"Fieldline is an independent concept platform I built to demonstrate the caliber of architecture, UX design, and full-stack engineering I deliver for clients."*
- **Explain What Is Live vs. Simulated:**  
  *"In this demonstration, data persists locally in your browser so you can test logging tickets and dispatching engineers without setting up a database account. In a production engagement for your business, we would connect this frontend to a secure database like PostgreSQL, implement role-based authentication, and integrate real SMS or email dispatch alerts."*
- **Avoid Unsupported Claims:**  
  Never claim that Fieldline is a live company with paying customers or invent fabricated conversion rates. Your technical craftsmanship, clean code, and deep domain understanding provide all the credibility you need.
