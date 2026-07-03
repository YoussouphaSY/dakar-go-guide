import { useNavigate } from "react-router-dom";
import { Download, MessageCircle, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { useT } from "@/lib/useT";
import { LANGS, INTERESTS, SETTINGS, type LangId } from "@/data/appMock";

/*
  ProfilApp — écran Profil (mobile).
  Avatar, langue, notifications (alertes), centres d'intérêt, réglages, déconnexion.
*/

const SETTING_ICON: Record<string, typeof Download> = {
  offline: Download,
  help: MessageCircle,
};

/* Rappels/alertes (migrés depuis l'Agenda) — clés de traduction. */
const NOTIF_OPTIONS = [
  { key: "h1", tKey: "notif.h1.t", sKey: "notif.h1.s" },
  { key: "m30", tKey: "notif.m30.t", sKey: "notif.m30.s" },
  { key: "recap", tKey: "notif.recap.t", sKey: "notif.recap.s" },
] as const;

const ProfilApp = () => {
  const nav = useNavigate();
  const { t } = useT();
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const interests = useApp((s) => s.interests);
  const toggleInterest = useApp((s) => s.toggleInterest);
  const reminders = useApp((s) => s.reminders);
  const toggleReminder = useApp((s) => s.toggleReminder);
  const setAuthed = useApp((s) => s.setAuthed);
  const settings = SETTINGS.filter((s) => s.id !== "notif");

  const logout = () => {
    setAuthed(false);
    nav("/");
  };

  return (
    <div className="scr flex-1 overflow-y-auto px-[22px] pb-5 pt-2">
      <div className="flex justify-between items-center pt-1.5 pb-3 text-[13px] font-semibold">
        <span>9:41</span>
        <span className="font-mono text-[11px]">▂▄▆ ⵛ ⏻</span>
      </div>

      <h2 className="font-display font-extrabold text-[30px] tracking-tight">{t("pr.title")}</h2>

      <div className="mt-[18px] flex items-center gap-4">
        <div className="w-[72px] h-[72px] rounded-full bg-[repeating-linear-gradient(135deg,#E7E7E2_0_6px,#F4F3EE_6px_12px)] border border-border flex-shrink-0 flex items-center justify-center font-mono text-[8px] text-muted-foreground">
          photo
        </div>
        <div>
          <div className="font-display font-extrabold text-[22px] tracking-tight">Awa Ndiaye</div>
          <div className="text-[13px] text-muted-foreground mt-0.5">{t("pr.visitor")}</div>
        </div>
      </div>

      {/* langue */}
      <h3 className="font-display font-extrabold text-base mt-[26px]">{t("pr.lang")}</h3>
      <div className="flex gap-2 mt-3 flex-wrap">
        {LANGS.map((l) => {
          const on = l.id === lang;
          return (
            <button
              key={l.id}
              onClick={() => setLang(l.id as LangId)}
              className={cn(
                "border-[1.5px] rounded-full px-4 py-[9px] text-[13px] font-semibold transition-base",
                on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground",
              )}
            >
              {l.id}
            </button>
          );
        })}
      </div>

      {/* notifications (alertes migrées de l'Agenda) */}
      <h3 className="font-display font-extrabold text-base mt-[26px]">{t("pr.notifs")}</h3>
      <div className="mt-3 flex flex-col gap-2.5">
        {NOTIF_OPTIONS.map((r) => {
          const on = reminders[r.key];
          return (
            <div key={r.key} className="flex items-center gap-3.5 bg-background border border-border rounded-[18px] px-4 py-[13px]">
              <div className="flex-1">
                <div className="font-semibold text-[14px]">{t(r.tKey)}</div>
                <div className="text-[12.5px] text-muted-foreground mt-0.5">{t(r.sKey)}</div>
              </div>
              <button
                onClick={() => toggleReminder(r.key)}
                aria-label={t(r.tKey)}
                className={cn("w-12 h-[29px] rounded-full relative flex-shrink-0 transition-base", on ? "bg-primary" : "bg-muted-foreground/30")}
              >
                <span className={cn("absolute top-[3px] left-[3px] w-[23px] h-[23px] rounded-full bg-white shadow transition-transform", on && "translate-x-[19px]")} />
              </button>
            </div>
          );
        })}
      </div>

      {/* centres d'intérêt */}
      <h3 className="font-display font-extrabold text-base mt-[26px]">{t("pr.interests")}</h3>
      <div className="flex gap-2 mt-3 flex-wrap">
        {INTERESTS.map((i) => {
          const on = interests[i.id];
          return (
            <button
              key={i.id}
              onClick={() => toggleInterest(i.id)}
              className={cn(
                "border-[1.5px] rounded-full px-[15px] py-[9px] text-[13px] font-medium transition-base",
                on ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground",
              )}
            >
              {t(`sport.${i.id}` as Parameters<typeof t>[0])}
            </button>
          );
        })}
      </div>

      {/* settings */}
      <div className="mt-[26px] flex flex-col">
        {settings.map((s) => {
          const Icon = SETTING_ICON[s.id];
          return (
            <button
              key={s.id}
              onClick={() => { if (s.id === "help") nav("/ayo"); }}
              className="text-left flex items-center gap-3.5 py-[15px] border-b border-border/60"
            >
              <Icon className="w-5 h-5 text-foreground flex-shrink-0" strokeWidth={1.8} />
              <span className="flex-1 font-medium text-[15px]">
                {t((s.id === "offline" ? "pr.offline" : "pr.help") as Parameters<typeof t>[0])}
              </span>
              <ChevronRight className="w-[18px] h-[18px] text-border" strokeWidth={2} />
            </button>
          );
        })}
      </div>

      {/* déconnexion — carte distincte, pastille rouge douce */}
      <button
        onClick={logout}
        className="mt-6 w-full group flex items-center gap-3.5 bg-destructive/5 rounded-[16px] px-4 py-3.5 active:scale-[0.99] transition-base"
      >
        <span className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 transition-base group-active:bg-destructive/20">
          <LogOut className="w-[19px] h-[19px] text-destructive" strokeWidth={2} />
        </span>
        <span className="flex-1 text-left">
          <span className="block font-semibold text-[14.5px] text-destructive">{t("pr.logout")}</span>
          <span className="block text-[12px] text-destructive/60 mt-0.5">Awa Ndiaye</span>
        </span>
        <ChevronRight className="w-[18px] h-[18px] text-destructive/40" strokeWidth={2} />
      </button>

      <div className="h-2" />
    </div>
  );
};

export default ProfilApp;
