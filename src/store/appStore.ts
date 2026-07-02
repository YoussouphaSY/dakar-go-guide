/*
  appStore — état global de l'interface APP (mobile), reproduisant le `state`
  du prototype Claude (Dakar-Go-26 Prototype-2) avec Zustand.

  Gère : langue affichée, filtres (programme, carte), agenda persistant
  (localStorage `dakargo-agenda`), sheets (place, event, langue, date, lieu),
  rappels, centres d'intérêt, mode de transport, chat AYO, toast.
*/

import { create } from "zustand";
import type { LangId } from "@/data/appMock";
import type { MapFilter } from "@/data/mobility";
import { tr, isRTLLang } from "@/lib/translations";

const AGENDA_KEY = "dakargo-agenda";
const LANG_KEY = "dakargo-app-lang";

function loadLang(): LangId {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw && ["FR", "EN", "AR", "WO", "ES"].includes(raw)) return raw as LangId;
  } catch {
    /* ignore */
  }
  return "FR";
}

/* L'arabe passe toute l'interface en RTL. */
function applyLangToDocument(lang: LangId) {
  document.documentElement.lang = lang.toLowerCase();
  document.documentElement.dir = isRTLLang(lang) ? "rtl" : "ltr";
}

function loadAgenda(): string[] {
  try {
    const raw = localStorage.getItem(AGENDA_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return ["e-200", "e-fleuret"];
}

function saveAgenda(ids: string[]) {
  try {
    localStorage.setItem(AGENDA_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export type ProgSheet = "date" | "lieu" | null;
export interface ChatMsg {
  who: "me" | "bot";
  text: string;
}

interface AppState {
  lang: LangId;
  slide: number;
  progDay: string;
  progVenue: string;
  progSheet: ProgSheet;
  eventId: string | null;
  agendaHintSeen: boolean;
  agenda: string[];
  mapFilter: MapFilter;
  venueId: string | null;   // fiche lieu détaillée (plein écran)
  langOpen: boolean;
  reminders: Record<string, boolean>;
  interests: Record<string, boolean>;
  moMode: string;
  /* Destination sélectionnée sur l'écran Mobilité (id de POI site JOJ). */
  moDest: string;
  chat: ChatMsg[];
  toast: string | null;

  /* — Auth (UI seule, sans backend) — */
  authed: boolean;
  setAuthed: (v: boolean) => void;

  /* — Notifications activées (cloche de l'accueil) — */
  notifOn: boolean;
  toggleNotif: () => void;

  setLang: (l: LangId) => void;
  setProgDay: (d: string) => void;
  setProgVenue: (v: string) => void;
  setProgSheet: (s: ProgSheet) => void;
  setEventId: (id: string | null) => void;
  setMapFilter: (f: MapFilter) => void;
  setVenueId: (id: string | null) => void;
  setLangOpen: (o: boolean) => void;
  setMoMode: (m: string) => void;
  setMoDest: (id: string) => void;
  toggleReminder: (k: string) => void;
  toggleInterest: (k: string) => void;
  toggleAgenda: (id: string) => void;
  dismissHint: () => void;
  pushToast: (msg: string) => void;
  addChat: (m: ChatMsg) => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

const initialLang = loadLang();
if (typeof document !== "undefined") applyLangToDocument(initialLang);

export const useApp = create<AppState>((set, get) => ({
  lang: initialLang,
  slide: 0,
  progDay: "11-08",
  progVenue: "Tous",
  progSheet: null,
  eventId: null,
  agendaHintSeen: false,
  agenda: loadAgenda(),
  mapFilter: "competition",
  venueId: null,
  langOpen: false,
  reminders: { h1: true, m30: true, recap: false },
  interests: { nat: true, ath: true, basket: false, judo: false, lutte: true },
  moMode: "taxi",
  moDest: "arene",
  chat: [
    { who: "bot", text: "Bonjour 👋 Je suis AYO, votre guide des JOJ Dakar 2026. Comment puis-je vous aider ?" },
  ],
  toast: null,

  authed: (() => {
    try { return localStorage.getItem("dakargo-authed") === "1"; } catch { return false; }
  })(),
  setAuthed: (v) => {
    try { localStorage.setItem("dakargo-authed", v ? "1" : "0"); } catch { /* ignore */ }
    set({ authed: v });
  },

  notifOn: (() => {
    try { return localStorage.getItem("dakargo-notif") !== "0"; } catch { return true; }
  })(),
  toggleNotif: () => {
    const next = !get().notifOn;
    try { localStorage.setItem("dakargo-notif", next ? "1" : "0"); } catch { /* ignore */ }
    set({ notifOn: next });
    get().pushToast(tr(get().lang, next ? "toast.notifOn" : "toast.notifOff"));
  },

  setLang: (lang) => {
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
    applyLangToDocument(lang);
    set({ lang, langOpen: false });
  },
  setProgDay: (progDay) => set({ progDay, progSheet: null }),
  setProgVenue: (progVenue) => set({ progVenue, progSheet: null }),
  setProgSheet: (progSheet) => set({ progSheet }),
  setEventId: (eventId) => set({ eventId }),
  setMapFilter: (mapFilter) => set({ mapFilter, venueId: null }),
  setVenueId: (venueId) => set({ venueId }),
  setLangOpen: (langOpen) => set({ langOpen }),
  setMoMode: (moMode) => set({ moMode }),
  setMoDest: (moDest) => set({ moDest }),
  toggleReminder: (k) => set((s) => ({ reminders: { ...s.reminders, [k]: !s.reminders[k] } })),
  toggleInterest: (k) => set((s) => ({ interests: { ...s.interests, [k]: !s.interests[k] } })),

  toggleAgenda: (id) => {
    const { agenda } = get();
    const has = agenda.includes(id);
    const next = has ? agenda.filter((x) => x !== id) : [...agenda, id];
    saveAgenda(next);
    set({ agenda: next });
    get().pushToast(tr(get().lang, has ? "toast.removed" : "toast.added"));
  },

  dismissHint: () => set({ agendaHintSeen: true }),

  pushToast: (toast) => {
    set({ toast });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => set({ toast: null }), 2000);
  },

  addChat: (m) => set((s) => ({ chat: [...s.chat, m] })),
}));
