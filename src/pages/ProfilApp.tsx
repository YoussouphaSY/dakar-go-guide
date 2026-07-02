import { useNavigate } from "react-router-dom";
import { Download, MessageCircle, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { useT } from "@/lib/useT";
import { LANGS, INTERESTS, SETTINGS, qrCells, type LangId } from "@/data/appMock";

/*
  ProfilApp — écran Profil (mobile), fidèle au prototype (Prototype-2).
  Avatar, langue, notifications (alertes), billet (QR), centres d'intérêt, réglages.
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

const cells = qrCells();

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

      {/* billet */}
      <h3 className="font-display font-extrabold text-base mt-[26px]">{t("pr.tickets")}</h3>
      <div className="mt-3 bg-foreground rounded-[20px] p-[18px] text-background flex items-center gap-4">
        <div className="flex-1">
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide">Athlétisme · 8 nov 18:00</div>
          <div className="font-display font-extrabold text-[17px] mt-1 leading-[1.1]">Finale 200 m · hommes</div>
          <div className="text-xs text-muted-foreground mt-1.5">Cat. 2 · ×2 · Iba Mar Diop</div>
        </div>
        <div className="w-[62px] h-[62px] rounded-xl bg-white p-[7px] flex-shrink-0">
          <svg viewBox="0 0 25 25" width="48" height="48">
            <rect x="0" y="0" width="7" height="7" fill="none" stroke="#0E0F0C" strokeWidth="1.6" />
            <rect x="2" y="2" width="3" height="3" fill="#0E0F0C" />
            <rect x="18" y="0" width="7" height="7" fill="none" stroke="#0E0F0C" strokeWidth="1.6" />
            <rect x="20" y="2" width="3" height="3" fill="#0E0F0C" />
            <rect x="0" y="18" width="7" height="7" fill="none" stroke="#0E0F0C" strokeWidth="1.6" />
            <rect x="2" y="20" width="3" height="3" fill="#0E0F0C" />
            <g fill="#0E0F0C">
              {cells.map((c, i) => (
                <rect key={i} x={c.x} y={c.y} width="1" height="1" />
              ))}
            </g>
          </svg>
        </div>
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

      {/* déconnexion */}
      <button
        onClick={logout}
        className="mt-6 w-full flex items-center justify-center gap-2 border border-destructive/30 text-destructive font-semibold text-[14.5px] py-3.5 rounded-[14px] active:scale-[0.99] transition-base"
      >
        <LogOut className="w-[18px] h-[18px]" strokeWidth={2} />
        {t("pr.logout")}
      </button>
    </div>
  );
};

export default ProfilApp;
