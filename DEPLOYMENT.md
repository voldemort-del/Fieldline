# Fieldline — Production Deployment Guide

**Target Hosting Platform:** Vercel (Recommended), Netlify, or any Node.js 18+ container / SSR environment  
**Framework:** Next.js 16.4+ (App Router with Turbopack)  
**Package Manager:** npm  
**Build Command:** `npm run build`  
**Output Directory:** `.next` (Standard Next.js App Router build output)  
**Related Documents:** [PORTFOLIO_CASE_STUDY.md](file:///c:/Users/DARK%20LORD/Desktop/New/PORTFOLIO_CASE_STUDY.md), [QA_REPORT.md](file:///c:/Users/DARK%20LORD/Desktop/New/QA_REPORT.md)

---

## 1. Deployment Readiness Verification

The application has been verified for production deployment:
- **Build Verification:** `npm run build` succeeds cleanly with Next.js Turbopack, generating 24 static and partially prerendered routes with zero TypeScript or linting errors.
- **Zero Hardcoded Localhost Paths:** All internal navigation uses Next.js relative routing (`/`, `/portal-demo/dashboard`, `/admin-demo/requests`, etc.). No `localhost` or development server ports exist in application code.
- **Client-Side Storage Isolation:** The reactive simulation engine uses browser-native `localStorage` safely guarded by `typeof window !== 'undefined'` checks and React `<Suspense>` boundaries.
- **Zero External Secrets Required:** The standalone demonstration runs completely self-contained out-of-the-box without requiring third-party API keys, database connection strings, or environment variables.

---

## 2. Option A: Deploying via Vercel Dashboard (GitHub Integration)

This is the standard and recommended deployment workflow for portfolio demonstrations:

### Step 1: Initialize Git and Push to GitHub
```bash
# In your project root (c:\Users\DARK LORD\Desktop\New)
git init
git add .
git commit -m "feat: complete Fieldline portfolio application"

# Add your remote GitHub repository and push
git remote add origin https://github.com/your-username/fieldline.git
git branch -M main
git push -u origin main
```

### Step 2: Import into Vercel
1. Log in to [vercel.com](https://vercel.com).
2. Click **"Add New..."** &rarr; **"Project"**.
3. Select your GitHub repository (`fieldline`).
4. Vercel automatically detects Next.js settings:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click **"Deploy"**.

Deployment typically completes in under 60 seconds.

---

## 3. Option B: Deploying via Vercel CLI

The environment has Vercel CLI (`53.4.0`) installed. To deploy directly from the command line:

```bash
# Log in to your Vercel account
npx vercel login

# Link and deploy a preview build
npx vercel

# Deploy directly to production
npx vercel --prod
```

When prompted:
- Set up and deploy: **Yes**
- Which scope: *(Select your personal or team account)*
- Link to existing project: **No**
- Project name: `fieldline` (or desired name)
- In which directory: `./`
- Modify default settings: **No**

---

## 4. Option C: Running as a Production Node.js Server

To run the production bundle locally or on a VPS (e.g. DigitalOcean, AWS EC2, Railway):

```bash
# 1. Install dependencies
npm install

# 2. Compile production build
npm run build

# 3. Start production server (runs on port 3000 by default)
npm run start

# Optional: Run on custom port
PORT=8080 npm run start
```

---

## 5. Environment Variables & Future Backend Integration

For the current standalone demonstration, **no environment variables are required**.

If transitioning Fieldline to a production customer engagement with a live backend, configure the following variables in the hosting dashboard:

| Variable Name | Required in Demo? | Purpose in Production Engagement |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Optional | Canonical production URL (e.g. `https://fieldline.co.uk`) |
| `DATABASE_URL` | No (Simulated) | PostgreSQL / Supabase connection string |
| `NEXTAUTH_SECRET` | No (Simulated) | Secret for session tokens and RBAC |
| `RESEND_API_KEY` | No (Simulated) | Transactional email provider for customer dispatch receipts |
| `TWILIO_ACCOUNT_SID` | No (Simulated) | SMS dispatch alerts for field engineers |

---

## 6. Post-Deployment Verification Checklist

Once deployed to a live URL, verify the following:
1. **Homepage (`/`):** Check that the hero section, typography, and images render crisply.
2. **Demo Dock:** Check that the floating demonstration dock appears at the bottom of the screen on both mobile and desktop viewports.
3. **Portal Navigation (`/portal-demo/dashboard`):** Check that switching venues (*The Grandview Hotel* &rarr; *Oakwood Care*) updates the equipment register.
4. **Ticket Logging (`/portal-demo/requests/new`):** Submit a test ticket and verify that it appears immediately in the Operations Work Order Queue (`/admin-demo/requests`).
5. **Printable Certificates (`/portal-demo/reports`):** Click *"Print / Save Certificate"* and verify that the browser print modal opens with the formatted CP42 Gas Safety record.
6. **Reset State:** Click *"Reset"* in the Demo Dock to ensure the browser cleans test records back to pristine seed data.
