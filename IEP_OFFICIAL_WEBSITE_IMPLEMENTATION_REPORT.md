# IEP Schools Official Website — Implementation Report

**Project:** IEP Schools — Smart Education ERP marketing website  
**Location:** `C:\dev\iep-schools-website`  
**Date:** 10 November 2026  
**Status:** Staging-ready. Final production launch awaits the open items in section 11.

---

## 1. Executive summary

The official IEP Schools marketing website has been built as a standalone React application. It presents the ERP as it exists today, with explicit Available / Beta / Upcoming labels, transparent pricing and hosting limits, verified contact details and no fabricated customers, downloads, payment claims or release dates.

The site includes 12 routes, 80 documented capabilities across 11 module groups, 10 login roles plus the transport-manager responsibility area, five real product films and a 13-topic tutorial library placeholder that does not pretend to contain videos.

Latest verification:

- `npm run build` passes (`tsc --noEmit && vite build`).
- Automated QA completed with **0 issues** across 12 desktop and 8 mobile routes.
- Interaction QA passed for pricing, portal tabs, feature search, FAQ accordions, tutorial empty state, mobile CTA, mobile navigation, video playback and contact form.
- Desktop and mobile visual QA was completed from captured screenshots; no unresolved visual defects remain.

---

## 2. Scope delivered

### Pages

1. Home
2. Features
3. Role Portals
4. Applications
5. Pricing
6. Hosting
7. Customization
8. Tutorials
9. About
10. Contact
11. FAQ
12. Not Found

### Core functionality

- Responsive header, announcement bar, mobile navigation and footer.
- Role-aware portal tabs with horizontal scrolling on small screens and wrapping from `sm` upward.
- Searchable and status-filterable capability catalogue.
- Monthly / annual pricing toggle.
- Plan cards with truthful starting limits and support wording.
- Pricing comparison table with quotation-specific paid RAM allocation.
- Product-film lightbox with play/pause and error handling.
- Filterable tutorial page with an honest empty state for tutorial videos.
- FAQ accordions with structured data.
- Contact/enquiry form with consent, honeypot and configurable API endpoint.
- ERP login links routed to the existing login page.
- WhatsApp, telephone and email links using verified details.
- Animated reveals, reduced-motion support and accessible focus states.

---

## 3. Technical architecture

| Area | Implementation |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge |
| Hosting target | Static `dist/` output; Netlify configuration included |

### Structure

- `src/pages/` — route-level page implementations.
- `src/components/` — layout, UI primitives, mockups, pricing, media and form components.
- `src/content/` — typed defaults for site details, plans, modules, FAQs, roles, applications and tutorials.
- `src/lib/content.tsx` — runtime content provider that merges overrides with defaults.
- `src/lib/seo.ts` — per-page titles, descriptions, social metadata, optional canonical URL and JSON-LD helpers.
- `public/content/site.json` — non-code content overrides.
- `public/media/` — five real product films.
- `public/brand/` — transparent IEP Schools emblem.

Route-level lazy loading is used for all pages. Shared layout, styles and small primitives remain in the initial bundle.

---

## 4. Content integrity and status model

### Product status

| Status | Meaning |
|---|---|
| **Available** | Usable in the current ERP, subject to role permission and deployment configuration. |
| **Beta** | Available but newer or conditional. May require provider setup or onboarding review. |
| **Upcoming** | Not built yet. Shown for transparency. No release date is promised. |

**Available:** current ERP administration, students and admissions base, academic management, attendance, examinations and results, finance and accounts, transport, communication base, reports and exports, role permissions, parent/student access and platform security.

**Beta:** advanced admissions workflow, AI, at-risk monitoring, admission documents, academic calendar, absence notifications, SMS/WhatsApp/email delivery channels, online-exam logs, live location and finance intelligence.

**Upcoming:** library/librarian module, online payment gateway, multi-branch management, Windows finance application and payroll/HR.

### Honesty constraints applied

- No invented testimonials, customer counts, school logos or downloads.
- No claim that a payment gateway exists.
- No claim that a library module exists.
- No claim of multi-branch support.
- No Windows release date or download link.
- No invented ISO, SOC or other certification.
- No uptime SLA attached to the Free plan.
- AI is described as requiring a provider and API key.
- Communication channels are described as requiring provider setup and applicable charges.
- Illustrative dashboard and phone mockups are labelled as previews, not real school data.
- No guessed production domain; canonical/OG URL is emitted only when `VITE_SITE_URL` is configured.

### Published contact details

| Channel | Value |
|---|---|
| Email | `nagendradaddnla8008@gmail.com` |
| Phone / WhatsApp | `+91 93925 28692` |
| WhatsApp link | `https://wa.me/9392528692` |
| Location | India |
| Street address | Not published |

---

## 5. Roles and applications

### Login roles

Admin, Owner, Principal, Teacher, Student, Parent, Cashier, Finance, Accountant and Driver.

The Transport Manager is documented as an administration responsibility area, not a separate login role. No librarian role is claimed.

### Mobile access

Parent, student, teacher, owner, principal, cashier and driver are the documented mobile roles. Admin, finance and accountant are web-only. Parent app access is included on the Free plan with limits.

### Surfaces

- **Web ERP:** available today.
- **Mobile:** available for supported roles; Free-plan access is limited.
- **Windows finance companion:** planned; no release date or download.
- **No app-store links** are published.

---

## 6. Pricing and hosting

### Plans

| Plan | Monthly | Annual | Position |
|---|---:|---:|---|
| Free | ₹0 | — | Entry plan |
| Starter | ₹999/month | ₹9,990/year | Small-school starting point |
| Professional | ₹1,999/month | ₹19,990/year | Highlighted plan |
| Enterprise | ₹3,999/month | ₹39,990/year | Larger-school starting point |
| Custom | Contact sales | Contact sales | Scoped requirements |

- Annual pricing is presented as “10 months for 12” and labelled indicative.
- Limits are proposed starting values.
- Paid RAM and storage are not stated as fixed values; the comparison table uses **“Quoted”**.
- There is no online checkout. Every paid plan routes to Contact.

### Free hosting

- 6 GB RAM.
- 10 GB storage.
- Unlimited bandwidth subject to fair-use policy.
- Single-school deployment.
- Shared allocation, not a dedicated server.

A footnote clarifies that paid RAM allocation is confirmed in the quotation.

---

## 7. Media and tutorials

Five real product films are published:

| Film | Duration |
|---|---:|
| About IEP Schools | 00:59 |
| Student management | 00:51 |
| Finance | 01:00 |
| Communication | 01:02 |
| Platform animation | 00:09 |

The tutorial library currently contains:

- 18 categories.
- 13 planned tutorial topics.
- 0 published tutorial videos.
- An explicit “in production” state with no invented playable content.

Real tutorial videos can be added later through the content override file without page rewrites.

---

## 8. Configuration and content overrides

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_ERP_LOGIN_URL` | Recommended | Existing ERP login URL. Defaults to `https://sch.iepsolutions.in/login`. |
| `VITE_SITE_URL` | At launch | Public site URL for canonical and `og:url` metadata. |
| `VITE_LEADS_ENDPOINT` | At launch | Optional POST endpoint for enquiry forms. |

If `VITE_LEADS_ENDPOINT` is empty, the form opens the visitor’s email client with the enquiry pre-filled. It does not claim the enquiry was sent until the visitor sends it.

### Runtime content

`public/content/site.json` can override:

- Announcement text and ERP login URL.
- Contact email, phone, WhatsApp and location.
- Annual pricing months.
- Plan prices and limits.
- Free hosting allocation.
- FAQs.
- Tutorial categories and videos.

The defaults live in `src/content/*.ts`. Overrides are merged at runtime and do not require rebuilding the application.

---

## 9. Quality assurance

### Automated checks

Command:

```powershell
npm run build
```

Result: passed.

Browser QA was run with Puppeteer against the production preview at `http://localhost:8090`.

**Desktop routes:** `/`, `/features`, `/portals`, `/applications`, `/hosting`, `/pricing`, `/customize`, `/tutorials`, `/about`, `/contact`, `/faq`, `/missing-page`.

**Mobile routes:** `/`, `/features`, `/pricing`, `/portals`, `/applications`, `/hosting`, `/contact`, `/faq`.

### Final QA result

- `qa2-issues.json`: `[]`
- No horizontal overflow.
- Exactly one H1 per route.
- No empty links, broken images or missing image alt text.
- No nameless buttons.
- No fake-stat or TODO/placeholder text.
- Header login points to the correct ERP URL.
- External links limited to ERP login, WhatsApp, email and telephone.
- Pricing toggle: ₹999 → ₹9,990.
- Portal tab: Parent.
- Feature search: 4 of 80 capabilities.
- FAQ accordion: closed → open.
- Tutorials: 5 films, 0 videos, empty state present.
- Mobile app CTA present.
- Video: mounted, ready state 4, no media error, playback started.
- Mobile navigation opens, shows the ERP login and is `inert`/`aria-hidden` while closed.
- Contact form: 11 fields, 4 required, labelled submit button.

### Visual QA

- Desktop and mobile screenshots were captured under `C:\Users\DELL\AppData\Local\Temp\opencode\website-qa\shots\`.
- Section-level viewports were captured under `shots\sections\`.
- Contrast/readability was improved across 24 TSX files by raising the lowest text opacities.
- Fixed during QA: Applications mobile CTA, portal role-tab wrapping, mobile announcement fit, accessible Home H1 spacing, plan support wording, pricing comparison values/footnote, Tutorials WhatsApp label and hidden mobile navigation accessibility.
- Final reviewed screens: Home hero/modules, Portals, Features, Applications, Hosting, Pricing plans/comparison, Tutorials, Contact and mobile Home/Features/Pricing.

Screenshot tooling note: long mobile pages can exceed Chrome’s full-page texture limit, and reveal animations must be scroll-primed. Viewport section captures were used for final visual judgment.

---

## 10. Deployment

### Build and publish

```powershell
npm ci
npm run build
```

Publish the generated `dist/` directory.

### Included deployment configuration

- `netlify.toml` defines the build command, `dist` publish directory, SPA rewrite and security headers.
- `public/_redirects` provides the same SPA fallback for Netlify-style hosting.
- `public/robots.txt` allows indexing.

### Recommended launch checks

1. Set `VITE_SITE_URL` to the final production origin and rebuild.
2. Set `VITE_LEADS_ENDPOINT` or confirm that the `mailto:` fallback is acceptable.
3. Verify `VITE_ERP_LOGIN_URL` against the production login page.
4. Test contact submission from the deployed domain.
5. Test video playback and all WhatsApp/telephone/email links on a real phone.
6. Run a post-deploy smoke test on every route and a real 404 path.
7. Configure analytics/privacy tooling only after legal review.

---

## 11. Open items before production launch

| Item | Owner | Status |
|---|---|---|
| Privacy Policy and Terms pages | School/legal | **Open** — intentionally not invented |
| Final production domain / canonical URL | School | **Open** — set `VITE_SITE_URL` |
| Lead intake endpoint / backend | School/IT | **Open** — fallback is email client |
| Exact paid-plan RAM and storage | School/hosting | **Open** — shown as “Quoted” |
| Final commercial pricing approval | School | **Open** — current values are indicative |
| Windows finance release date/download | Product | **Not available** — no promise made |
| Library / payment gateway / multi-branch | Product | **Not available** — marked Upcoming |
| Production deployment | School/IT | **Open** |
| Legal review of claims and disclaimers | School/legal | **Open** |
| Lighthouse/axe run on deployed URL | QA | Recommended |

Static SPA hosting serves the Not Found page with an HTTP 200 fallback. If search engines require true 404 status codes, add edge/server-side handling or prerendering.

---

## 12. Maintenance notes

- Update verified content in `public/content/site.json` where possible.
- Keep plan limits and hosting values aligned with the actual commercial offer.
- Only change a capability to **Available** after confirming it in the deployed ERP.
- Only publish tutorial videos and durations that exist.
- Re-run `npm run build` and the browser QA after content or dependency changes.
- Keep the ERP login URL configurable across staging and production.
