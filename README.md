# IEP Schools – Official Website & School Automation Platform

Official marketing, product showcase, and tutorials website for **IEP Schools** – an intelligent, role-based school management automation platform for Indian schools.

- **School ERP Login Portal**: [https://sch.iepsolutions.in/login](https://sch.iepsolutions.in/login)
- **Contact & Support**: nagendradaddnla8008@gmail.com | +91 93925 28692

---

## Features & Highlights

- **Cinematic Homepage Hero**: Full-screen video showcase featuring seamless automated playlist cycling, smooth introduction transitions, and browser-compliant autoplay audio engine.
- **Interactive Tutorials & Learning Centre (`/tutorials`)**: Practical video tutorials, step-by-step guides, search, and category filtering across all school ERP modules.
- **Feature Showcase (`/features`)**: Deep dive into Student Lifecycle, Smart Attendance, Fee & Finance POS, Academic Management, and Transport.
- **Dedicated Cloud Architecture (`/hosting`)**: Specifications for isolated multi-tenant cloud containers, automated backups, and 99.9% uptime.
- **Pricing & Plans (`/pricing`)**: Transparent pricing tiers with Free Plan options and capacity calculators.
- **Applications Hub (`/applications`)**: Cloud Web ERP, Parent Mobile App, and High-Speed Cashier Desktop Companion.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The application runs on `http://localhost:8091` (or next available port).

### Production Build

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
├── public/
│   ├── brand/          # Official logos, marks and favicons
│   ├── media/          # HD walkthrough and demonstration videos
│   └── content/        # Static content declarations
├── src/
│   ├── components/     # UI components, layout, navbar, footer, hero showcase
│   ├── content/        # Module details, tutorial index, pricing, and portals
│   ├── pages/          # Homepage, Tutorials, Features, Applications, Pricing
│   ├── lib/            # Utilities, SEO helpers, and content providers
│   ├── App.tsx         # Route registry
│   └── main.tsx        # Application entrypoint
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Theme tokens and colors
└── vite.config.ts      # Vite configuration
```

---

© 2026 IEP Schools. All rights reserved.
