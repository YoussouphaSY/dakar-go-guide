/*
  appStore — état global de l'interface APP (mobile), reproduisant le `state`
  du prototype Claude (Dakar-Go-26 Prototype-2) avec Zustand.

  Gère : langue affichée, filtres (programme, carte), agenda persistant
  (localStorage `dakargo-agenda`), sheets (place, event, langue, date, lieu),
  rappels, centres d'intérêt, mode de transport, chat AYO, toast.
*/

import { create } from "zustand";
import type { HomeFilter, LangId } from "@/data/appMock";

const AGENDA_KEY = "dakargo-agenda";

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
  mapFilter: HomeFilter;
  placeId: string | null;
  langOpen: boolean;
  reminders: Record<string, boolean>;
  interests: Record<string, boolean>;
  moMode: string;
  chat: ChatMsg[];
  toast: string | null;

  /* — Auth (UI seule, sans backend) — */
  authed: boolean;
  setAuthed: (v: boolean) => void;

  setLang: (l: LangId) => void;
  setProgDay: (d: string) => void;
  setProgVenue: (v: string) => void;
  setProgSheet: (s: ProgSheet) => void;
  setEventId: (id: string | null) => void;
  setMapFilter: (f: HomeFilter) => void;
  setPlaceId: (id: string | null) => void;
  setLangOpen: (o: boolean) => void;
  setMoMode: (m: string) => void;
  toggleReminder: (k: string) => void;
  toggleInterest: (k: string) => void;
  toggleAgenda: (id: string) => void;
  dismissHint: () => void;
  pushToast: (msg: string) => void;
  addChat: (m: ChatMsg) => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useApp = create<AppState>((set, get) => ({
  lang: "FR",
  slide: 0,
  progDay: "11-08",
  progVenue: "Tous",
  progSheet: null,
  eventId: null,
  agendaHintSeen: false,
  agenda: loadAgenda(),
  mapFilter: "comp",
  placeId: null,
  langOpen: false,
  reminders: { h1: true, m30: true, recap: false },
  interests: { nat: true, ath: true, basket: false, judo: false, lutte: true },
  moMode: "taxi",
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

  setLang: (lang) => set({ lang, langOpen: false }),
  setProgDay: (progDay) => set({ progDay, progSheet: null }),
  setProgVenue: (progVenue) => set({ progVenue, progSheet: null }),
  setProgSheet: (progSheet) => set({ progSheet }),
  setEventId: (eventId) => set({ eventId }),
  setMapFilter: (mapFilter) => set({ mapFilter, placeId: null }),
  setPlaceId: (placeId) => set({ placeId }),
  setLangOpen: (langOpen) => set({ langOpen }),
  setMoMode: (moMode) => set({ moMode }),
  toggleReminder: (k) => set((s) => ({ reminders: { ...s.reminders, [k]: !s.reminders[k] } })),
  toggleInterest: (k) => set((s) => ({ interests: { ...s.interests, [k]: !s.interests[k] } })),

  toggleAgenda: (id) => {
    const { agenda } = get();
    const has = agenda.includes(id);
    const next = has ? agenda.filter((x) => x !== id) : [...agenda, id];
    saveAgenda(next);
    set({ agenda: next });
    get().pushToast(has ? "Retiré de mon agenda" : "Ajouté à mon agenda");
  },

  dismissHint: () => set({ agendaHintSeen: true }),

  pushToast: (toast) => {
    set({ toast });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => set({ toast: null }), 2000);
  },

  addChat: (m) => set((s) => ({ chat: [...s.chat, m] })),
}));
