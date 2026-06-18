import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/*
  i18n — langues supportées (roadmap Axe 3) : FR / EN / AR / WO / ES.
  L'arabe passe l'interface en RTL (dir="rtl") sur <html>.
  Les traductions complètes viendront plus tard ; pour l'instant on gère
  la langue active + la direction. Le contenu des maquettes est en FR.
*/

export type Lang = "fr" | "en" | "ar" | "wo" | "es";

export const LANGUAGES: { code: Lang; native: string; label: string; rtl?: boolean }[] = [
  { code: "fr", native: "Français", label: "Français" },
  { code: "en", native: "English", label: "Anglais" },
  { code: "ar", native: "العربية", label: "Arabe · RTL", rtl: true },
  { code: "wo", native: "Wolof", label: "Wolof" },
  { code: "es", native: "Español", label: "Espagnol" },
];

export const isRTL = (lang: Lang) => lang === "ar";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "dakargo-lang";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved ?? "fr";
  });

  const dir = isRTL(lang) ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
