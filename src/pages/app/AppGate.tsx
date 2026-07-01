import { useState, ReactNode } from "react";
import AppShell from "@/components/layout/AppShell";
import { useApp } from "@/store/appStore";
import Splash from "./Splash";
import Auth from "./Auth";
import Preferences from "./Preferences";

/*
  AppGate — enchaînement d'ouverture de l'interface app :
  Splash (à chaque ouverture) → [si non connecté] Auth → Préférences → app.
  Une fois « prêt », on rend les routes de l'app (children).
*/

type Phase = "splash" | "auth" | "prefs" | "ready";

const AppGate = ({ children }: { children: ReactNode }) => {
  const authed = useApp((s) => s.authed);
  const setAuthed = useApp((s) => s.setAuthed);
  const [phase, setPhase] = useState<Phase>("splash");

  if (phase === "ready") return <>{children}</>;

  let screen: ReactNode = null;
  if (phase === "splash") {
    screen = <Splash onDone={() => setPhase(authed ? "ready" : "auth")} />;
  } else if (phase === "auth") {
    screen = <Auth onDone={() => setPhase("prefs")} />;
  } else if (phase === "prefs") {
    screen = <Preferences onDone={() => { setAuthed(true); setPhase("ready"); }} />;
  }

  // Le flow s'affiche dans le cadre app, sans nav basse.
  return <AppShell variant="app">{screen}</AppShell>;
};

export default AppGate;
