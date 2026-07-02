import { jsPDF } from "jspdf";
import type { LangId } from "@/data/appMock";
import { PROG_DAYS } from "@/data/appMock";
import { tr, type TrKey } from "@/lib/translations";

/*
  agendaPdf — génère un PDF A4 « joli et simple » de l'agenda perso :
  bandeau de titre Dakar-Go, sections par jour, une carte par épreuve
  (heure · sport, titre, lieu, départ conseillé). Rendu 100 % client via
  jsPDF (pas de backend).

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

/* Libellé de jour long : "Dim 8 nov" dans la langue du PDF. */
function dayLabel(key: string, lang: LangId): string {
  const d = PROG_DAYS.find((x) => x.key === key);
  if (!d) return key;
  return `${tr(lang, `day.${d.dow}` as TrKey)} ${d.dayNum} ${tr(lang, "month.nov")}`;
}

export function downloadAgendaPdf(entries: PdfEntry[], uiLang: LangId): void {
  // Arabe → repli anglais (police latine seulement dans jsPDF).
  const lang: LangId = uiLang === "AR" ? "EN" : uiLang;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();   // 210
  const pageH = doc.internal.pageSize.getHeight();  // 297
  const margin = 16;
  const contentW = pageW - margin * 2;

  /* — Bandeau de titre — */
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageW, 34, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(tr(lang, "ag.title"), margin, 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text("Dakar-Go · JOJ Dakar 2026", margin, 25);
  // compteur d'épreuves, aligné à droite
  doc.setFontSize(10);
  const countTxt = tr(lang, "ag.count", { n: entries.length });
  doc.text(countTxt, pageW - margin, 25, { align: "right" });

  let y = 46;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 18) {
      doc.addPage();
      y = 22;
    }
  };

  // grouper par jour, trié
  const byDay: Record<string, PdfEntry[]> = {};
  for (const e of entries) (byDay[e.day] ||= []).push(e);
  const days = Object.keys(byDay).sort();

  for (const day of days) {
    ensureSpace(16);
    // en-tête de jour
    doc.setTextColor(...GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(dayLabel(day, lang).toUpperCase(), margin, y);
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 2.5, pageW - margin, y + 2.5);
    y += 10;

    const list = byDay[day].sort((a, b) => a.time.localeCompare(b.time));
    for (const e of list) {
      const cardH = 26;
      ensureSpace(cardH + 4);

      // carte
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...LIGHT);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentW, cardH, 3, 3, "FD");

      // pastille heure (colonne gauche)
      const timeColW = 26;
      doc.setFillColor(...LIGHT);
      doc.roundedRect(margin + 3, y + 3, timeColW - 3, cardH - 6, 2.5, 2.5, "F");
      doc.setTextColor(...INK);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(e.time, margin + 3 + (timeColW - 3) / 2, y + 12, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...GREY);
      const sportShort = e.sport.length > 12 ? e.sport.slice(0, 11) + "…" : e.sport;
      doc.text(sportShort, margin + 3 + (timeColW - 3) / 2, y + 18, { align: "center" });

      // corps (titre + lieu + départ)
      const bodyX = margin + timeColW + 5;
      const bodyW = contentW - timeColW - 8;

      let ty = y + 8;
      doc.setTextColor(...INK);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      const titleLines = doc.splitTextToSize(e.title, bodyW - 22);
      doc.text(titleLines[0], bodyX, ty);

      // badges LIVE / conflit à droite
      if (e.conflict) {
        const bw = 20;
        doc.setFillColor(...RED);
        doc.roundedRect(pageW - margin - bw - 3, y + 4, bw, 5.5, 2.5, 2.5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.text(tr(lang, "ag.conflict").toUpperCase(), pageW - margin - bw / 2 - 3, y + 7.8, { align: "center" });
      }

      ty += 6.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...GREY);
      const venueLines = doc.splitTextToSize(e.venue, bodyW);
      doc.text(venueLines[0], bodyX, ty);

      ty += 6.5;
      doc.setTextColor(...GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      const depTxt = `${tr(lang, "ag.depart", { t: e.depart })} · ${tr(lang, "ag.before")}`;
      doc.text(depTxt, bodyX, ty);

      y += cardH + 4;
    }
    y += 3;
  }

  /* — Pied de page (numéro + date de génération) sur chaque page — */
  const pages = doc.getNumberOfPages();
  const genDate = new Date().toLocaleDateString(
    lang === "EN" ? "en-GB" : lang === "ES" ? "es-ES" : "fr-FR",
    { day: "2-digit", month: "long", year: "numeric" },
  );
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.4);
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GREY);
    doc.text(`Dakar-Go · ${genDate}`, margin, pageH - 7);
    doc.text(`${i} / ${pages}`, pageW - margin, pageH - 7, { align: "right" });
  }

  doc.save("agenda-dakar-go.pdf");
}
