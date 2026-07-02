import { useApp } from "@/store/appStore";
import { tr, type TrKey } from "@/lib/translations";
import type { LangId } from "@/data/appMock";
import { PROG_DAYS } from "@/data/appMock";

/*
  useT — hook de traduction de l'interface app.
  Lit la langue dans le store et renvoie `t(clé, variables?)`.
  (Séparé de translations.ts pour éviter un cycle store ↔ dictionnaire.)
*/

export function useT() {
  const lang = useApp((s) => s.lang);
  const t = (key: TrKey, vars?: Record<string, string | number>) => tr(lang, key, vars);
  return { t, lang };
}

/* "11-08" → "Dim 8 nov" dans la langue active. */
export function dayLabelT(key: string, lang: LangId): string {
  const d = PROG_DAYS.find((x) => x.key === key);
  if (!d) return "";
  return `${tr(lang, `day.${d.dow}` as TrKey)} ${d.dayNum} ${tr(lang, "month.nov")}`;
}
