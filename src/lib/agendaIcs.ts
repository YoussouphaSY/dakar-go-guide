/*
  agendaIcs — export de l'agenda au format iCalendar (.ics) pour l'ajouter
  au calendrier du téléphone (iOS/Android/Google/Outlook). Un VEVENT par
  épreuve : titre, lieu, date/heure de début (Dakar = GMT+0, sans DST →
  heure locale = UTC), durée par défaut 2 h, rappel 40 min avant (départ
  conseillé). Rendu 100 % client, aucun backend.
*/

export interface IcsEntry {
  id: string;
  day: string;    // "MM-DD" (année 2026)
  time: string;   // "HH:MM"
  sport: string;
  title: string;
  venue: string;
}

const YEAR = 2026;

/* "11-08" + "18:00" → "20261108T180000" (heure locale de Dakar = UTC). */
function toIcsStamp(day: string, time: string): string {
  const [mm, dd] = day.split("-");
  const [hh, mi] = time.split(":");
  return `${YEAR}${mm}${dd}T${hh}${mi}00`;
}

/* + `mins` minutes sur un stamp "YYYYMMDDTHHMMSS" (gère le passage de jour/mois). */
function addMinutes(stamp: string, mins: number): string {
  const y = +stamp.slice(0, 4), mo = +stamp.slice(4, 6), d = +stamp.slice(6, 8);
  const h = +stamp.slice(9, 11), mi = +stamp.slice(11, 13);
  const dt = new Date(Date.UTC(y, mo - 1, d, h, mi));
  dt.setUTCMinutes(dt.getUTCMinutes() + mins);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${dt.getUTCFullYear()}${p(dt.getUTCMonth() + 1)}${p(dt.getUTCDate())}T${p(dt.getUTCHours())}${p(dt.getUTCMinutes())}00`;
}

/* Échappe les caractères spéciaux iCalendar (RFC 5545). */
function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function nowStamp(): string {
  const p = (n: number) => String(n).padStart(2, "0");
  const d = new Date();
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}T${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`;
}

export function downloadAgendaIcs(entries: IcsEntry[]): void {
  const dtstamp = nowStamp();
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dakar-Go//Agenda JOJ 2026//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Dakar-Go · JOJ 2026",
    "X-WR-TIMEZONE:Africa/Dakar",
  ];

  for (const e of entries) {
    const start = toIcsStamp(e.day, e.time);
    const end = addMinutes(start, 120); // durée par défaut 2 h
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.id}-${e.day}@dakar-go.sn`,
      `DTSTAMP:${dtstamp}`,
      // TZID Africa/Dakar (UTC+0 sans DST) : l'heure locale = ce qu'on écrit
      `DTSTART;TZID=Africa/Dakar:${start}`,
      `DTEND;TZID=Africa/Dakar:${end}`,
      `SUMMARY:${esc(e.title)}`,
      `LOCATION:${esc(e.venue)}`,
      `DESCRIPTION:${esc(`${e.sport} · JOJ Dakar 2026`)}`,
      // rappel 40 min avant (départ conseillé)
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(`Départ conseillé — ${e.title}`)}`,
      "TRIGGER:-PT40M",
      "END:VALARM",
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  // RFC 5545 : fin de ligne CRLF
  const content = lines.join("\r\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "agenda-dakar-go.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
