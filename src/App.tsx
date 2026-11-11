import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SiteContentProvider } from "@/lib/content";

const HomePage = lazy(() => import("@/pages/HomePage"));
const FeaturesPage = lazy(() => import("@/pages/FeaturesPage"));
const FeatureShowcasePage = lazy(() => import("@/pages/FeatureShowcasePage"));
const PortalsPage = lazy(() => import("@/pages/PortalsPage"));
const ApplicationsPage = lazy(() => import("@/pages/ApplicationsPage"));
const HostingPage = lazy(() => import("@/pages/HostingPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const CustomizePage = lazy(() => import("@/pages/CustomizePage"));
const TutorialsPage = lazy(() => import("@/pages/TutorialsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/brand/iep-schools-mark-transparent.png"
          alt="IEP Schools"
          className="h-14 w-auto object-contain animate-pulse"
        />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
          Loading
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteContentProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
<Route index element={<HomePage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="features/showcase" element={<FeatureShowcasePage />} />
            <Route path="solutions" element={<PortalsPage />} />
              <Route path="portals" element={<PortalsPage />} />
              <Route path="applications" element={<ApplicationsPage />} />
              <Route path="hosting" element={<HostingPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="customize" element={<CustomizePage />} />
              <Route path="tutorials" element={<TutorialsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </SiteContentProvider>
    </BrowserRouter>
  );
}
