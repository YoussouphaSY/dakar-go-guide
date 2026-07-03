import type { LangId } from "@/data/appMock";

/*
  eventI18n — traductions des épreuves (Programme + détail) dans les 5 langues.
  Ordre : [FR, EN, ES, AR, WO]. Les valeurs françaises servent de CLÉ.

  - SPORT_TR / VENUE_TR / PHASE_TR : dictionnaires par valeur (réutilisables).
  - EVENT_TITLE_TR / EVENT_ABOUT_TR : par identifiant d'épreuve (spécifique).
  Helpers `sportTr`, `venueTr`, `phaseTr`, `eventTitle`, `eventAbout`.
*/

const ORDER: LangId[] = ["FR", "EN", "ES", "AR", "WO"];
type Row = [string, string, string, string, string];

function pick(row: Row | undefined, lang: LangId, fallback: string): string {
  if (!row) return fallback;
  return row[ORDER.indexOf(lang)] || row[0];
}

/* — Sports (nom complet FR → 5 langues) — */
const SPORT_TR: Record<string, Row> = {
  "Athlétisme": ["Athlétisme", "Athletics", "Atletismo", "ألعاب القوى", "Daw"],
  "Natation": ["Natation", "Swimming", "Natación", "سباحة", "Féey"],
  "Basket 3×3": ["Basket 3×3", "3×3 Basketball", "Baloncesto 3×3", "كرة السلة 3×3", "Basket 3×3"],
  "Boxe": ["Boxe", "Boxing", "Boxeo", "ملاكمة", "Boxe"],
  "Escrime": ["Escrime", "Fencing", "Esgrima", "مبارزة", "Escrime"],
  "Gymnastique": ["Gymnastique", "Gymnastics", "Gimnasia", "جمباز", "Jimnastik"],
  "Judo": ["Judo", "Judo", "Judo", "جودو", "Judo"],
  "Lutte": ["Lutte", "Wrestling", "Lucha", "مصارعة", "Làmb"],
  "Rugby à 7": ["Rugby à 7", "Rugby Sevens", "Rugby 7", "الرغبي السباعي", "Rugby 7"],
  "Taekwondo": ["Taekwondo", "Taekwondo", "Taekwondo", "تايكوندو", "Taekwondo"],
  "Tir à l'arc": ["Tir à l'arc", "Archery", "Tiro con arco", "الرماية", "Fetal"],
  "Festivité": ["Festivité", "Festivity", "Festividad", "احتفال", "Fecc"],
};

/* — Lieux (nom court FR → 5 langues) — */
const VENUE_TR: Record<string, Row> = {
  "Iba Mar Diop": ["Iba Mar Diop", "Iba Mar Diop", "Iba Mar Diop", "إيبا مار ديوب", "Iba Mar Diop"],
  "Centre des Expositions": ["Centre des Expositions", "Exhibition Centre", "Centro de Exposiciones", "مركز المعارض", "Barabu Expo"],
  "Tour de l'Œuf": ["Tour de l'Œuf", "Tour de l'Œuf", "Tour de l'Œuf", "تور دو لوف", "Tour de l'Œuf"],
  "Stade A. Wade": ["Stade A. Wade", "A. Wade Stadium", "Estadio A. Wade", "ملعب عبد الله واد", "Estaad A. Wade"],
  "Saly Plage Ouest": ["Saly Plage Ouest", "Saly Beach West", "Saly Playa Oeste", "شاطئ سالي الغربي", "Saly Tefes Sowwu"],
  "Mon. Renaissance": ["Mon. Renaissance", "Renaissance Mon.", "Mon. Renacimiento", "نصب النهضة", "Mon. Renaissance"],
  "Île de Gorée": ["Île de Gorée", "Gorée Island", "Isla de Gorea", "جزيرة غوري", "Dun bu Gorée"],
};

/* — Phases — */
const PHASE_TR: Record<string, Row> = {
  "Finale": ["Finale", "Final", "Final", "النهائي", "Fainal"],
  "Quart de finale": ["Quart de finale", "Quarter-final", "Cuartos de final", "ربع النهائي", "Kart de fainal"],
  "Festivité": ["Festivité", "Festivity", "Festividad", "احتفال", "Fecc"],
  "En cours": ["En cours", "In progress", "En curso", "جارٍ", "Ci biir"],
  "À venir": ["À venir", "Upcoming", "Próximo", "قادم", "Ñëw na"],
};

/* — Titres d'épreuve (par id) — */
const EVENT_TITLE_TR: Record<string, Row> = {
  "e-tir": ["Finale · Tir à l'arc", "Final · Archery", "Final · Tiro con arco", "النهائي · الرماية", "Fainal · Fetal"],
  "e-gym": ["Finale · Sol & agrès", "Final · Floor & apparatus", "Final · Suelo y aparatos", "النهائي · الحركات الأرضية والأجهزة", "Fainal · Suuf & jumtukaay"],
  "e-200": ["Finale 200 m · hommes", "200 m Final · men", "Final 200 m · hombres", "نهائي 200 م · رجال", "Fainal 200 m · góor"],
  "e-fleuret": ["Finale fleuret · femmes", "Foil Final · women", "Final florete · mujeres", "نهائي سلاح الشيش · سيدات", "Fainal fleuret · jigéen"],
  "e-relais": ["Finale relais 4×100 m", "4×100 m Relay Final", "Final relevos 4×100 m", "نهائي التتابع 4×100 م", "Fainal relais 4×100 m"],
  "e-boxe": ["Quarts de finale", "Quarter-finals", "Cuartos de final", "ربع النهائي", "Kart de fainal"],
  "e-lutte": ["Lutte de plage", "Beach wrestling", "Lucha de playa", "مصارعة الشاطئ", "Làmbu tefes"],
  "e-goree": ["Nuit culturelle de Gorée", "Gorée Cultural Night", "Noche cultural de Gorea", "ليلة غوري الثقافية", "Guddi aada gu Gorée"],
  "e-basket": ["Finale · Basket 3×3", "Final · 3×3 Basketball", "Final · Baloncesto 3×3", "النهائي · كرة السلة 3×3", "Fainal · Basket 3×3"],
  "e-mapping": ["Mapping Renaissance", "Renaissance Mapping", "Mapping Renacimiento", "عرض ضوئي على نصب النهضة", "Mapping Renaissance"],
  "e-relais2": ["Finale relais 4×100", "4×100 Relay Final", "Final relevos 4×100", "نهائي التتابع 4×100", "Fainal relais 4×100"],
  "e-taek": ["Finale −68 kg", "−68 kg Final", "Final −68 kg", "نهائي −68 كغ", "Fainal −68 kg"],
};

/* — Descriptions (about, par id) — */
const EVENT_ABOUT_TR: Record<string, Row> = {
  "e-200": [
    "Huit sprinteurs se disputent l'or sur le demi-tour de piste. Le Sénégalais A. Diallo, couloir 5, vise le record des Jeux.",
    "Eight sprinters battle for gold over the half-lap. Senegal's A. Diallo, lane 5, is chasing the Games record.",
    "Ocho velocistas luchan por el oro en la media vuelta. El senegalés A. Diallo, calle 5, busca el récord de los Juegos.",
    "ثمانية عدّائين يتنافسون على الذهب في نصف اللفة. السنغالي أ. ديالو، المسار 5، يسعى لتحطيم رقم الألعاب.",
    "Juróom-ñett ñu daw ñuy bëre ci wurus ci genn-wàll piste bi. Sénégalais A. Diallo, couloir 5, bëgg na damm rekoor bu Jëf yi.",
  ],
  "e-fleuret": [
    "La finale du fleuret féminin oppose la tenante du titre à la révélation des Jeux.",
    "The women's foil final pits the defending champion against the breakout star of the Games.",
    "La final de florete femenino enfrenta a la campeona defensora con la revelación de los Juegos.",
    "نهائي سلاح الشيش للسيدات يجمع بين حاملة اللقب ومفاجأة الألعاب.",
    "Fainal bu fleuret bu jigéen dafay jàkkarloo ki moom teg bi ak ki gën a feeñ ci Jëf yi.",
  ],
  "e-tir": [
    "Duel au sommet pour l'or à l'arc, sur la distance olympique de 70 m.",
    "A top duel for archery gold, over the Olympic distance of 70 m.",
    "Duelo cumbre por el oro en tiro con arco, sobre la distancia olímpica de 70 m.",
    "مواجهة قمة على ذهبية الرماية، على المسافة الأولمبية 70 م.",
    "Bëre bu mag ngir wurus ci fetal, ci 70 m bu olimpik.",
  ],
  "e-gym": [
    "Finale du concours général : sol, saut, barres et poutre s'enchaînent.",
    "All-around final: floor, vault, bars and beam in succession.",
    "Final del concurso completo: suelo, salto, barras y barra de equilibrio.",
    "نهائي المسابقة الشاملة: الأرضي والقفز والعارضتان وعارضة التوازن.",
    "Fainal bu konkuur bu yépp: suuf, tëb, bar yi ak poutre bi.",
  ],
  "e-relais": [
    "Relais 4×100 m nage libre : les nations s'élancent pour le podium.",
    "4×100 m freestyle relay: nations race for the podium.",
    "Relevos 4×100 m estilo libre: las naciones compiten por el podio.",
    "تتابع 4×100 م سباحة حرة: الأمم تتنافس على منصة التتويج.",
    "Relais 4×100 m féey bu yombe: réew yi ñuy daw ngir podium bi.",
  ],
  "e-boxe": [
    "Quart de finale des −60 kg. Le vainqueur file en demi-finale.",
    "−60 kg quarter-final. The winner advances to the semi-final.",
    "Cuartos de final −60 kg. El ganador pasa a semifinales.",
    "ربع نهائي −60 كغ. الفائز يتأهل إلى نصف النهائي.",
    "Kart de fainal bu −60 kg. Ki daan dafay dem ci dammel-fainal.",
  ],
  "e-lutte": [
    "La lutte, discipline reine au Sénégal, couronne son champion sur le sable de Saly.",
    "Wrestling, Senegal's flagship sport, crowns its champion on the sands of Saly.",
    "La lucha, deporte rey en Senegal, corona a su campeón en la arena de Saly.",
    "المصارعة، رياضة السنغال الأولى، تتوّج بطلها على رمال سالي.",
    "Làmb, futbal bu gën a mag ci Sénégal, dafay teg buur ci suufu Saly.",
  ],
  "e-basket": [
    "Finale du 3×3 : un demi-terrain, 21 points ou 10 minutes. Spectacle garanti.",
    "3×3 final: half-court, 21 points or 10 minutes. Spectacle guaranteed.",
    "Final de 3×3: media cancha, 21 puntos o 10 minutos. Espectáculo garantizado.",
    "نهائي 3×3: نصف ملعب، 21 نقطة أو 10 دقائق. متعة مضمونة.",
    "Fainal bu 3×3: genn-wàll teren, 21 poñ walla 10 simili. Xew-xew bu wóor.",
  ],
  "e-relais2": [
    "Relais 4×100 m sur piste : les passages de témoin font la différence.",
    "4×100 m track relay: baton exchanges make the difference.",
    "Relevos 4×100 m en pista: los relevos marcan la diferencia.",
    "تتابع 4×100 م على المضمار: تسليم العصا يصنع الفارق.",
    "Relais 4×100 m ci piste: jébbale témoin bi mooy def wuute gi.",
  ],
  "e-taek": [
    "Finale des −68 kg : deux rounds, vitesse et précision pour l'or.",
    "−68 kg final: two rounds, speed and precision for gold.",
    "Final −68 kg: dos asaltos, velocidad y precisión por el oro.",
    "نهائي −68 كغ: جولتان، سرعة ودقة من أجل الذهب.",
    "Fainal bu −68 kg: ñaari round, gaaw ak jub ngir wurus.",
  ],
  "e-goree": [
    "Soirée mémoire et musique sur l'île de Gorée : percussions, danse et projection.",
    "An evening of memory and music on Gorée Island: percussion, dance and projection.",
    "Una velada de memoria y música en la isla de Gorea: percusión, danza y proyección.",
    "أمسية للذاكرة والموسيقى في جزيرة غوري: إيقاعات ورقص وعرض ضوئي.",
    "Guddi ngir fàttaliku ak music ci dunu Gorée: sabar, fecc ak projeksioŋ.",
  ],
  "e-mapping": [
    "Spectacle de mapping monumental projeté sur la statue de la Renaissance africaine.",
    "A monumental mapping show projected onto the African Renaissance statue.",
    "Espectáculo de mapping monumental proyectado sobre la estatua del Renacimiento africano.",
    "عرض ضوئي ضخم يُسقط على تمثال النهضة الإفريقية.",
    "Xew-xewu mapping bu mag ci statiw Renaissance africaine.",
  ],
};

export const sportTr = (fr: string, lang: LangId) => pick(SPORT_TR[fr], lang, fr);
export const venueTr = (fr: string, lang: LangId) => pick(VENUE_TR[fr], lang, fr);
export const phaseTr = (fr: string, lang: LangId) => pick(PHASE_TR[fr], lang, fr);
export const eventTitle = (id: string, frFallback: string, lang: LangId) =>
  pick(EVENT_TITLE_TR[id], lang, frFallback);
export const eventAbout = (id: string, frFallback: string, lang: LangId) =>
  pick(EVENT_ABOUT_TR[id], lang, frFallback);
