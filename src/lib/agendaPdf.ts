import { jsPDF } from "jspdf";
import type { LangId } from "@/data/appMock";
import { PROG_DAYS } from "@/data/appMock";
import { TRANSIT_LINES } from "@/data/mobility";
import { tr, type TrKey } from "@/lib/translations";
import { LOGO_DAKAR_2026, LOGO_RATIO } from "@/lib/logoDakar2026";

/*
  agendaPdf — génère un PDF A4 « joli et compact » de l'agenda perso :
  bandeau titre + logo officiel Dakar 2026, sections par jour, une carte
  par épreuve (heure · sport, titre, lieu, départ conseillé), puis un
  encart « Infos utiles » en bas (réseaux de transport + conseils pratiques
  repris de l'écran Mobilité). Rendu 100 % client via jsPDF (pas de backend).

  jsPDF n'embarque que des polices latines (Helvetica) : l'arabe et ses
  glyphes RTL ne s'affichent pas correctement. Pour l'arabe on bascule
  donc le PDF en anglais (repli lisible) ; l'app, elle, reste en arabe.
*/

export interface PdfEntry {
  day: string;      // "MM-DD"
  time: string;     // "HH:MM"
  sport: string;
  title: string;
  venue: string;
  depart: string;   // départ conseillé "HH:MM"
  conflict: boolean;
}

/* Palette (design system Dakar-Go). */
const GREEN: [number, number, number] = [0, 133, 63];
const INK: [number, number, number] = [14, 15, 12];
const GREY: [number, number, number] = [110, 110, 104];
const LIGHT: [number, number, number] = [236, 239, 234];
const RED: [number, number, number] = [227, 27, 35];

/* "#16B5C4" → [22, 181, 196] (jsPDF setFillColor est plus fiable en RGB). */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/* Libellé de jour long : "Dim 8 nov" dans la langue du PDF. */
function dayLabel(key: string, lang: LangId): string {
  const d = PROG_DAYS.find((x) => x.key === key);
  if (!d) return key;
  return `${tr(lang, `day.${d.dow}` as TrKey)} ${d.dayNum} ${tr(lang, "month.nov")}`;
}

/*
  jsPDF (Helvetica) ne rend que le latin-1 : les signes typographiques
  comme le moins mathématique − (U+2212) deviennent des glyphes cassés.
  On normalise les cas fréquents.
*/
function pdfSafe(s: string): string {
  return s
    .replace(/[−–—]/g, "-")       // − – — → -
    .replace(/[‘’]/g, "'")        // ' ' → '
    .replace(/[“”]/g, '"')        // " " → "
    .replace(/↔/g, "<->")         // flèche double (réseaux transport)
    .replace(/≈/g, "~")           // ≈ (prix taxi)
    .replace(/[≤≥]/g, "");        // symboles non latins éventuels
}

export function downloadAgendaPdf(entries: PdfEntry[], uiLang: LangId): void {
  // Arabe → repli anglais (police latine seulement dans jsPDF).
  const lang: LangId = uiLang === "AR" ? "EN" : uiLang;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();   // 210
  const pageH = doc.internal.pageSize.getHeight();  // 297
  const margin = 16;
  const contentW = pageW - margin * 2;

  /* — Bandeau de titre + logo — */
  const headerH = 30;
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageW, headerH, "F");

  // logo officiel dans une pastille blanche (à droite)
  const logoH = 12;
  const logoW = logoH * LOGO_RATIO;
  const padX = 3, padY = 2.5;
  const chipW = logoW + padX * 2;
  const chipH = logoH + padY * 2;
  const chipX = pageW - margin - chipW;
  const chipY = (headerH - chipH) / 2;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(chipX, chipY, chipW, chipH, 2, 2, "F");
  doc.addImage(LOGO_DAKAR_2026, "PNG", chipX + padX, chipY + padY, logoW, logoH);

  // titre
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.text(tr(lang, "ag.title"), margin, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  const countTxt = tr(lang, "ag.count", { n: entries.length });
  doc.text(`Dakar-Go · JOJ Dakar 2026  ·  ${countTxt}`, margin, 21);

  let y = headerH + 10;

  // réserve `needed` mm : saute une page si besoin, renvoie le y à utiliser.
  // Fonction PURE (pas de capture de `y`) → réutilisable dans les sous-fonctions.
  const fit = (curY: number, needed: number): number => {
    if (curY + needed > pageH - 16) {
      doc.addPage();
      return 20;
    }
    return curY;
  };
  const ensureSpace = (needed: number): number => {
    y = fit(y, needed);
    return y;
  };

  // grouper par jour, trié
  const byDay: Record<string, PdfEntry[]> = {};
  for (const e of entries) (byDay[e.day] ||= []).push(e);
  const days = Object.keys(byDay).sort();

  const cardH = 20;      // compacté (avant 26)
  const cardGap = 3;     // compacté (avant 4)

  for (const day of days) {
    // réserver l'en-tête + la 1re carte pour éviter un titre de jour orphelin
    ensureSpace(12 + cardH);
    // en-tête de jour
    doc.setTextColor(...GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text(dayLabel(day, lang).toUpperCase(), margin, y);
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 7.5;

    const list = byDay[day].sort((a, b) => a.time.localeCompare(b.time));
    for (const e of list) {
      ensureSpace(cardH + cardGap);

      // carte
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...LIGHT);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentW, cardH, 2.5, 2.5, "FD");

      // pastille heure (colonne gauche)
      const timeColW = 24;
      doc.setFillColor(...LIGHT);
      doc.roundedRect(margin + 2.5, y + 2.5, timeColW - 2.5, cardH - 5, 2, 2, "F");
      doc.setTextColor(...INK);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.text(e.time, margin + 2.5 + (timeColW - 2.5) / 2, y + 8.5, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(...GREY);
      const sportSafe = pdfSafe(e.sport);
      const sportShort = sportSafe.length > 13 ? sportSafe.slice(0, 12) + "…" : sportSafe;
      doc.text(sportShort, margin + 2.5 + (timeColW - 2.5) / 2, y + 13.5, { align: "center" });

      // corps
      const bodyX = margin + timeColW + 4;
      const bodyW = contentW - timeColW - 7;

      let ty = y + 6.5;
      doc.setTextColor(...INK);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      const titleLines = doc.splitTextToSize(pdfSafe(e.title), bodyW - 20);
      doc.text(titleLines[0], bodyX, ty);

      // badge conflit à droite
      if (e.conflict) {
        const bw = 18;
        doc.setFillColor(...RED);
        doc.roundedRect(pageW - margin - bw - 2.5, y + 3, bw, 5, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6);
        doc.text(tr(lang, "ag.conflict").toUpperCase(), pageW - margin - bw / 2 - 2.5, y + 6.4, { align: "center" });
      }

      ty += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...GREY);
      const venueLines = doc.splitTextToSize(pdfSafe(e.venue), bodyW * 0.6);
      doc.text(venueLines[0], bodyX, ty);

      // départ conseillé (sur la même ligne, à droite du corps)
      doc.setTextColor(...GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      const depTxt = `${tr(lang, "ag.depart", { t: e.depart })} · ${tr(lang, "ag.before")}`;
      doc.text(depTxt, pageW - margin - 3, ty, { align: "right" });

      y += cardH + cardGap;
    }
    y += 2;
  }

  /* — Encart « Infos utiles » (réseaux transport + conseils) — */
  y = drawInfosUtiles(doc, lang, { margin, contentW, pageW, y, fit });

  /* — Pied de page sur chaque page — */
  const pages = doc.getNumberOfPages();
  const genDate = new Date().toLocaleDateString(
    lang === "EN" ? "en-GB" : lang === "ES" ? "es-ES" : "fr-FR",
    { day: "2-digit", month: "long", year: "numeric" },
  );
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.4);
    doc.line(margin, pageH - 11, pageW - margin, pageH - 11);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GREY);
    doc.text(`Dakar-Go · ${genDate}`, margin, pageH - 6.5);
    doc.text(`${i} / ${pages}`, pageW - margin, pageH - 6.5, { align: "right" });
  }

  doc.save("agenda-dakar-go.pdf");
}

/* Encart infos pratiques : réseaux de transport + conseils visiteurs. */
interface DrawCtx {
  margin: number;
  contentW: number;
  pageW: number;
  y: number;
  fit: (curY: number, needed: number) => number;
}

/* Conseils repris de l'écran Mobilité (tip.*). */
const TIPS: { t: TrKey; b: TrKey }[] = [
  { t: "tip.pay.t", b: "tip.pay.b" },
  { t: "tip.shuttle.t", b: "tip.shuttle.b" },
  { t: "tip.taxi.t", b: "tip.taxi.b" },
];

function drawInfosUtiles(doc: jsPDF, lang: LangId, ctx: DrawCtx): number {
  const { margin, contentW, pageW, fit } = ctx;
  let y = ctx.y;

  // marge avant l'encart ; s'assure qu'il reste la place pour le titre + 1 ligne
  y += 6;
  y = fit(y, 26);

  // titre de section (encart gris clair sur toute la largeur)
  doc.setFillColor(...LIGHT);
  doc.roundedRect(margin, y, contentW, 9, 2, 2, "F");
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(tr(lang, "mo.infos"), margin + 4, y + 6);
  y += 14;

  /* Réseaux de transport (BRT / TER / navettes / taxis / chaloupe). */
  y = fit(y, 6);
  doc.setTextColor(...GREEN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(tr(lang, "mo.network").toUpperCase(), margin, y);
  y += 5.5;

  for (const l of TRANSIT_LINES) {
    y = fit(y, 10);
    // puce colorée
    doc.setFillColor(...hexToRgb(l.color));
    doc.circle(margin + 1.5, y - 1, 1.3, "F");
    // nom
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(pdfSafe(tr(lang, `transit.${l.id}.n` as TrKey)), margin + 5, y);
    // fréquence / prix, à droite
    doc.setTextColor(...GREY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(pdfSafe(tr(lang, `transit.${l.id}.f` as TrKey)), pageW - margin, y, { align: "right" });
    // description en dessous
    y += 3.6;
    doc.setTextColor(...GREY);
    doc.setFontSize(7.5);
    const desc = doc.splitTextToSize(pdfSafe(tr(lang, `transit.${l.id}.d` as TrKey)), contentW - 5);
    doc.text(desc[0], margin + 5, y);
    y += 5.5;
  }

  y += 2;
  /* Conseils pratiques. */
  y = fit(y, 14);
  doc.setTextColor(...GREEN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(tr(lang, "mo.tips").toUpperCase(), margin, y);
  y += 5.5;

  for (const tip of TIPS) {
    y = fit(y, 10);
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`• ${pdfSafe(tr(lang, tip.t))}`, margin, y);
    y += 3.6;
    doc.setTextColor(...GREY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const body = doc.splitTextToSize(pdfSafe(tr(lang, tip.b)), contentW - 4);
    doc.text(body[0], margin + 3, y);
    y += 5.5;
  }

  return y;
}
