import { Outlet } from "react-router-dom";
import { LandingNav, Footer } from "@/pages/Home";

/*
  WebPageLayout — pages internes web (Programme, Mobilité, Découverte).
  Réutilise la nav sombre + le footer de la landing pour la cohérence.
*/
const WebPageLayout = () => (
  <div className="min-h-[100dvh] flex flex-col bg-background">
    <LandingNav />
    <main className="flex-1 flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default WebPageLayout;
