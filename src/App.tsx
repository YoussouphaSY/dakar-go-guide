import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import { useDisplayMode } from "@/hooks/useDisplayMode";
import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";
import WebPageLayout from "@/components/layout/WebPageLayout";
import AppOverlays from "@/components/app/AppOverlays";
import Placeholder from "@/pages/Placeholder";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import HomeApp from "@/pages/HomeApp";
import Programme from "@/pages/Programme";
import Mobilite from "@/pages/Mobilite";
/* — Écrans interface APP (mobile, fidèles au prototype) — */
import ProgrammeApp from "@/pages/ProgrammeApp";
import MobiliteApp from "@/pages/MobiliteApp";
import AgendaApp from "@/pages/AgendaApp";
import ProfilApp from "@/pages/ProfilApp";
import AyoApp from "@/pages/AyoApp";
import AppGate from "@/pages/app/AppGate";

const queryClient = new QueryClient();

/* — Layouts WEB — */
const WebFullLayout = () => (
  <AppShell variant="web" withTopNav={false}>
    <Outlet />
  </AppShell>
);

/* — Layout APP à onglets : nav basse + couche transverse (sheets, AYO, toast). — */
const AppTabsLayout = () => (
  <AppShell variant="app" bottomNav={<BottomNav />} overlays={<AppOverlays />}>
    <Outlet />
  </AppShell>
);

/* — Layout APP plein écran (onboarding, AYO) : pas de nav basse. — */
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

/* — Interface APP (PWA installée) : nav basse 5 onglets + AYO plein écran. — */
const AppRoutes = () => (
  <Routes>
    <Route element={<AppFullLayout />}>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/ayo" element={<AyoApp />} />
    </Route>
    <Route element={<AppTabsLayout />}>
      <Route path="/" element={<HomeApp />} />
      <Route path="/programme" element={<ProgrammeApp />} />
      <Route path="/agenda" element={<AgendaApp />} />
      <Route path="/mobilite" element={<MobiliteApp />} />
      <Route path="/profil" element={<ProfilApp />} />
    </Route>
    <Route path="*" element={<Placeholder title="Page introuvable" />} />
  </Routes>
);

const Shell = () => {
  const mode = useDisplayMode();
  if (mode === "app") {
    return (
      <AppGate>
        <AppRoutes />
      </AppGate>
    );
  }
  return <WebRoutes />;
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
