import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import { useDisplayMode } from "@/hooks/useDisplayMode";
import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";
import WebPageLayout from "@/components/layout/WebPageLayout";
import Placeholder from "@/pages/Placeholder";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import HomeApp from "@/pages/HomeApp";
import Programme from "@/pages/Programme";
import Mobilite from "@/pages/Mobilite";

const queryClient = new QueryClient();

/* — Layouts WEB — */
const WebFullLayout = () => (
  <AppShell variant="web" withTopNav={false}>
    <Outlet />
  </AppShell>
);

/* — Layouts APP (mobile, cadre téléphone, nav basse) — */
const AppTabsLayout = () => (
  <AppShell variant="app" bottomNav={<BottomNav />}>
    <Outlet />
  </AppShell>
);
const AppFullLayout = () => (
  <AppShell variant="app">
    <Outlet />
  </AppShell>
);

/* — Interface WEB (onglet navigateur) : landing à la racine — */
const WebRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route element={<WebFullLayout />}>
      <Route path="/onboarding" element={<Onboarding />} />
    </Route>
    <Route element={<WebPageLayout />}>
      <Route path="/programme" element={<Programme />} />
      <Route path="/mobilite" element={<Mobilite />} />
      <Route path="/decouverte" element={<Placeholder title="Découverte" />} />
    </Route>
    <Route path="*" element={<Placeholder title="Page introuvable" />} />
  </Routes>
);

/* — Interface APP (PWA installée) : accueil mobile + nav basse — */
const AppRoutes = () => (
  <Routes>
    <Route element={<AppFullLayout />}>
      <Route path="/onboarding" element={<Onboarding />} />
    </Route>
    <Route element={<AppTabsLayout />}>
      <Route path="/" element={<HomeApp />} />
      <Route path="/programme" element={<Placeholder title="Planner" />} />
      <Route path="/carte" element={<Placeholder title="Carte" />} />
      <Route path="/ayo" element={<Placeholder title="AYO" />} />
      <Route path="/profil" element={<Placeholder title="Profil" />} />
    </Route>
    <Route path="*" element={<Placeholder title="Page introuvable" />} />
  </Routes>
);

const Shell = () => {
  const mode = useDisplayMode();
  return mode === "app" ? <AppRoutes /> : <WebRoutes />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster position="top-center" />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Shell />
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
