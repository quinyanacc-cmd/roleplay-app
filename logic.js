/* ==========================================================================
   ROLEPLAY – KERNLOGIK (logic.js)

   Reine Berechnungen: kein DOM, kein localStorage, kein Netzwerk.
   Im Browser als klassisches Skript VOR app.js geladen (gemeinsamer globaler
   Gültigkeitsbereich), in Node über module.exports getestet.

   Diese Datei ist die einzige Quelle für das Datenmodell. app.js ruft
   ausschließlich diese Funktionen auf und wiederholt keine Rechenlogik.

   Leitgedanke ab Version 7: ROLEPLAY kennt keine fest eingebauten Rollen,
   Routinen, Tracker oder Streaks mehr. Alles davon sind Objekte im Profil
   des Nutzers. Die App startet leer und wird vom Nutzer aufgebaut.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Kleine Helfer
   -------------------------------------------------------------------------- */

const APP_VERSION = "7.0.0";
const PROFILE_SCHEMA = 2;

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function safeParse(text, fallback = null) { try { return JSON.parse(text); } catch { return fallback; } }

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function linkifyText(value = "") {
  return escapeHTML(value)
    .replace(/(https?:\/\/[^\s<]+)/gi, url => {
      const clean = url.replace(/[),.;!?]+$/, "");
      const suffix = url.slice(clean.length);
      return `<a href="${clean}" target="_blank" rel="noopener noreferrer">${clean}</a>${suffix}`;
    })
    .replace(/\n/g, "<br>");
}

function isISODate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")); }

function average(values) {
  const usable = values.filter(value => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)));
  if (!usable.length) return null;
  return Math.round(usable.reduce((sum, value) => sum + Number(value), 0) / usable.length);
}

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

/* Eindeutige, aber gut lesbare Kennung. Der Zufallsanteil verhindert
   Kollisionen, wenn zwei Objekte in derselben Millisekunde entstehen. */
let idCounter = 0;
function uid(prefix = "id") {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter.toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function slugify(value, fallback = "eintrag") {
  const map = { ä: "ae", ö: "oe", ü: "ue", ß: "ss", Ä: "ae", Ö: "oe", Ü: "ue" };
  const base = String(value || "")
    .replace(/[äöüßÄÖÜ]/g, char => map[char])
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || fallback;
}

/* Erzeugt eine im Bestand noch freie Kennung. */
function uniqueId(base, taken) {
  const used = new Set(taken);
  if (!used.has(base)) return base;
  let counter = 2;
  while (used.has(`${base}-${counter}`)) counter += 1;
  return `${base}-${counter}`;
}

function pluralDE(count, one, many) { return `${count} ${count === 1 ? one : many}`; }

function joinDE(parts) {
  const list = parts.filter(Boolean);
  if (!list.length) return "";
  if (list.length === 1) return list[0];
  return `${list.slice(0, -1).join(", ")} und ${list.at(-1)}`;
}

/* --------------------------------------------------------------------------
   2. Datum
   -------------------------------------------------------------------------- */

function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function dateToISO(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function dateFromISO(iso) { return new Date(`${iso}T12:00:00`); }

function addDays(iso, amount) {
  const d = dateFromISO(iso);
  d.setDate(d.getDate() + amount);
  return dateToISO(d);
}

function addMonths(iso, amount) {
  const d = dateFromISO(iso);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + amount);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return dateToISO(d);
}

function firstOfMonth(iso) { return `${iso.slice(0, 7)}-01`; }

function lastOfMonth(iso) {
  const d = dateFromISO(iso);
  return dateToISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
}

// Die Woche läuft von Montag bis Sonntag.
function mondayOf(iso) {
  const d = dateFromISO(iso);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return dateToISO(d);
}

function sundayOf(iso) { return addDays(mondayOf(iso), 6); }

function weekdayOf(iso) { return dateFromISO(iso).getDay(); }

function daysBetween(aISO, bISO) {
  return Math.round((dateFromISO(bISO) - dateFromISO(aISO)) / 86400000);
}

function datesBetween(startISO, endISO) {
  const total = daysBetween(startISO, endISO);
  if (total < 0) return [];
  return Array.from({ length: total + 1 }, (_, index) => addDays(startISO, index));
}

function monthDates(month) {
  const first = `${month}-01`;
  const d = dateFromISO(first);
  const total = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  return Array.from({ length: total }, (_, index) => addDays(first, index));
}

function weekDates(iso) { return datesBetween(mondayOf(iso), sundayOf(iso)); }

const WEEKDAY_NAMES = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const WEEKDAY_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
// Anzeigereihenfolge der Wochentagsauswahl: Montag zuerst.
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

/* Kompakte Umrechnung einer Tageszahl in Monate und Jahre. */
function humanDuration(days) {
  const total = Math.max(0, Math.floor(Number(days) || 0));
  if (total < 30) return "";
  const years = Math.floor(total / 365);
  const months = Math.floor((total - years * 365) / 30);
  if (!years) return `≈ ${pluralDE(months, "Monat", "Monate")}`;
  const yearText = pluralDE(years, "Jahr", "Jahre");
  return months ? `≈ ${yearText} und ${pluralDE(months, "Monat", "Monate")}` : `≈ ${yearText}`;
}

/* --------------------------------------------------------------------------
   3. Farben
   -------------------------------------------------------------------------- */

function hexToRgbTriple(hex) {
  const value = String(hex || "#888888").replace("#", "");
  const full = value.length === 3 ? value.split("").map(char => char + char).join("") : value;
  return [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16) || 0);
}

function hexToRgba(hex, alpha) {
  const [r, g, b] = hexToRgbTriple(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function mixHex(hex, target, amount) {
  const from = hexToRgbTriple(hex);
  const to = hexToRgbTriple(target);
  const mixed = from.map((value, index) => Math.round(value + (to[index] - value) * amount));
  return `#${mixed.map(value => value.toString(16).padStart(2, "0")).join("")}`;
}

/* Relative Helligkeit nach WCAG. Bestimmt, ob Text auf einer Rollenfarbe
   dunkel oder hell stehen muss – damit ist keine manuelle Textfarbe je
   Rolle mehr nötig. */
function relativeLuminance(hex) {
  const channel = value => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = hexToRgbTriple(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function readableTextColor(hex) {
  return relativeLuminance(hex) > 0.48 ? "#15181f" : "#ffffff";
}

/* Farbpalette für neue Rollen. Bewusst kräftig und gut unterscheidbar –
   auch nebeneinander in Diagrammen. */
const ROLE_COLORS = [
  "#4AA8FF", "#7258E8", "#2EC4B6", "#F07A32", "#E5487C",
  "#3DAE5F", "#F2B705", "#8E2F45", "#1F6FB2", "#C2569E",
  "#18A999", "#D9552F"
];

// Nächste noch unbenutzte Farbe, sonst der Reihe nach weiter.
function nextRoleColor(usedColors = []) {
  const used = new Set(usedColors.map(color => String(color || "").toLowerCase()));
  return ROLE_COLORS.find(color => !used.has(color.toLowerCase())) || ROLE_COLORS[used.size % ROLE_COLORS.length];
}

/* --------------------------------------------------------------------------
   4. Tagesphasen
   -------------------------------------------------------------------------- */

const CHECKIN_SLOTS = [
  { key: "morning", label: "Morgen", icon: "🌅", time: "08:00" },
  { key: "midday", label: "Mittag", icon: "☀️", time: "13:00" },
  { key: "afternoon", label: "Nachmittag", icon: "🌤️", time: "16:00" },
  { key: "evening", label: "Abend", icon: "🌇", time: "19:00" },
  { key: "night", label: "Nacht", icon: "🌙", time: "22:00" }
];

const CHECKIN_CHRONOLOGY = CHECKIN_SLOTS.map(slot => slot.key);
// Tage aus Versionen vor 6 kennen nur vier Phasen; der Nachmittag fehlt dort.
const LEGACY_CHECKIN_CHRONOLOGY = ["morning", "midday", "evening", "night"];

function slotIndex(key) {
  const index = CHECKIN_CHRONOLOGY.indexOf(key);
  return index < 0 ? CHECKIN_CHRONOLOGY.length : index;
}

function checkinSlot(key) {
  return CHECKIN_SLOTS.find(slot => slot.key === key) || CHECKIN_SLOTS[0];
}

/* Farbwelten der Tagesphasen. Sie gehören zur Tageszeit, nicht zu einer
   bestimmten Person – sie bleiben deshalb fest eingebaut. */
const CYCLE_PHASES = {
  morning:   { short: "Morgen",     a: "#9B5CF0", b: "#F79A3C", line: "#E4735F", glow: "rgba(233,124,80,.45)" },
  midday:    { short: "Mittag",     a: "#F7B733", b: "#2FBEDD", line: "#63C3C9", glow: "rgba(60,190,214,.40)" },
  afternoon: { short: "Nachmittag", a: "#54C6D6", b: "#F0A15C", line: "#E29A63", glow: "rgba(226,154,99,.40)" },
  evening:   { short: "Abend",      a: "#E0619B", b: "#6A4FCF", line: "#A65AB6", glow: "rgba(166,90,182,.40)" },
  night:     { short: "Nacht",      a: "#4F5BD5", b: "#8145D8", line: "#6B4FD6", glow: "rgba(101,79,214,.42)" }
};

function phaseMeta(key) { return CYCLE_PHASES[key] || CYCLE_PHASES.morning; }

/* Nur für Altdaten ohne gespeicherte Phase. Für die Frage, welcher Check-in
   als nächster offen ist, wird die Uhrzeit ausdrücklich nicht verwendet. */
function legacySlotForTime(time = "12:00") {
  const hour = Number(String(time).slice(0, 2));
  if (hour < 10) return "morning";
  if (hour < 16) return "midday";
  if (hour < 21) return "evening";
  return "night";
}

/* --------------------------------------------------------------------------
   5. Rollenmodus
   Der Modus beschreibt Umfang und Tempo des Tages. Er entsteht aus den
   Skalen, die im Profil als modusbildend markiert sind – standardmäßig
   Energie und Laune. Der Modus ist eine Lesehilfe, keine Bewertung.
   -------------------------------------------------------------------------- */

const MODE_LADDER = ["gentle", "minimum", "standard", "focus", "development"];

const MODES = [
  { key: "gentle",      label: "Schon-Modus",       icon: "◔", color: "#E77D4D" },
  { key: "minimum",     label: "Minimum",           icon: "⌁", color: "#E5A22E" },
  { key: "standard",    label: "Standard",          icon: "◐", color: "#27B9A9" },
  { key: "focus",       label: "Fokus",             icon: "◎", color: "#3D7BE8" },
  { key: "development", label: "Entwicklungsmodus", icon: "✦", color: "#7258E8" }
];

const LEGACY_MODE_KEYS = {
  stabilization: "gentle", recovery: "gentle", protection: "gentle",
  maintenance: "minimum", balance: "standard", design: "focus", peak: "development"
};

function modeKey(value) {
  const mapped = LEGACY_MODE_KEYS[value] || value;
  return MODES.some(mode => mode.key === mapped) ? mapped : "";
}

function modeMeta(value) {
  const key = modeKey(value);
  return key ? MODES.find(mode => mode.key === key) : null;
}

function modeIndex(key) {
  const index = MODE_LADDER.indexOf(key);
  return index < 0 ? MODE_LADDER.indexOf("standard") : index;
}

const MODE_THRESHOLDS = { gentle: 0, minimum: 40, standard: 55, focus: 70, development: 92 };

/* Schutzregeln. Sie begrenzen den Modus, heben ihn aber nie an – damit ein
   sehr niedriger Einzelwert nicht durch einen hohen anderen Wert
   wegkompensiert wird. Sie lesen ausschließlich die beiden Grundskalen. */
const MODE_RULES = {
  hardFloor: { threshold: 15, mode: "gentle" },
  caps: [
    { when: { firstBelow: 25 }, cap: "gentle" },
    { when: { secondBelow: 25 }, cap: "gentle" },
    { when: { secondBelow: 35 }, cap: "minimum" },
    { when: { firstBelow: 35 }, cap: "minimum" }
  ],
  lift: { when: { firstFrom: 25, firstTo: 34, secondFrom: 80 }, steps: 1 }
};

/* Gewichtung nach Anzahl der vorhandenen Werte. Die beiden ersten Fälle
   entsprechen exakt der bisherigen Rechnung (Energie/Laune beziehungsweise
   Energie/Laune/dritte Skala), damit bestehende Tage ihre Aussage behalten.
   Ab vier Skalen wird gleich gewichtet. */
function modeWeights(count) {
  if (count === 1) return [1];
  if (count === 2) return [0.42, 0.58];
  if (count === 3) return [0.32, 0.36, 0.32];
  return Array.from({ length: count }, () => 1 / count);
}

/* Gewichteter Zustandswert aus einer geordneten Liste von Werten 0–100.
   Fehlende Werte werden nie ergänzt oder geschätzt – sie fallen heraus. */
function stateScore(values) {
  const usable = (values || []).map(toNumberOrNull).filter(value => value !== null).map(value => clamp(value, 0, 100));
  if (!usable.length) return null;
  const weights = modeWeights(usable.length);
  return Math.round(usable.reduce((sum, value, index) => sum + value * weights[index], 0));
}

function modeFromScore(score) {
  let result = MODE_LADDER[0];
  MODE_LADDER.forEach(key => { if (score >= MODE_THRESHOLDS[key]) result = key; });
  return result;
}

/* Ermittelt den Rollenmodus. Die Schutzregeln lesen ausschließlich die
   beiden ersten Skalen (standardmäßig Energie und Laune) – eine hohe
   dritte Skala kann Erschöpfung deshalb nie überstimmen. */
function resolveMode(values) {
  const usable = (values || []).map(toNumberOrNull).filter(value => value !== null).map(value => clamp(value, 0, 100));
  const score = stateScore(usable);
  if (score === null) return null;
  const first = usable[0];
  const second = usable.length > 1 ? usable[1] : usable[0];

  const floor = MODE_RULES.hardFloor;
  if (first <= floor.threshold || second <= floor.threshold) {
    return { key: floor.mode, score, capped: true, lifted: false };
  }

  const base = modeFromScore(score);
  let index = modeIndex(base);
  let capped = false;

  MODE_RULES.caps.forEach(rule => {
    const hit = (rule.when.firstBelow !== undefined && first < rule.when.firstBelow)
      || (rule.when.secondBelow !== undefined && second < rule.when.secondBelow);
    if (!hit) return;
    const capIndex = modeIndex(rule.cap);
    if (capIndex <= index) { capped = capped || capIndex < index; index = Math.min(index, capIndex); }
  });

  const lift = MODE_RULES.lift;
  let lifted = false;
  if (capped && first >= lift.when.firstFrom && first <= lift.when.firstTo && second >= lift.when.secondFrom) {
    const raised = Math.min(index + lift.steps, modeIndex(base));
    if (raised > index) { index = raised; lifted = true; }
  }

  return { key: MODE_LADDER[index], score, capped, lifted };
}

/* --------------------------------------------------------------------------
   6. Coach-Impuls
   Fester Kernsatz je Modus plus deterministischer Zusatzsatz je
   Zustandskategorie. Gleiche Werte ergeben immer denselben Text.
   -------------------------------------------------------------------------- */

const MODE_COACH_CORE = {
  gentle: "Fahr heute bewusst einen Gang runter.",
  minimum: "Mach es klein – aber geh den nächsten Schritt.",
  standard: "Du bist solide aufgestellt. Geh den Tag verlässlich an.",
  focus: "Bündele deine Kraft auf das, was heute wirklich zählt.",
  development: "Heute ist Raum, über das Gewohnte hinauszugehen."
};

const MODE_COACH_ADDITION = {
  gentle: {
    bothLow: "Halte den Tag leicht und entscheide nach jedem kleinen Schritt neu.",
    secondLeads: "Deine Stimmung trägt dich, aber deine Kraft braucht heute Maß.",
    firstLeads: "Kraft ist vorhanden, doch innerlich brauchst du heute weniger Druck.",
    balanced: "Ein ruhiger, leichter Rhythmus ist heute vollkommen angemessen.",
    bothHigh: "Trotz des Schwungs bleibt heute ein schonender Rahmen sinnvoll."
  },
  minimum: {
    bothLow: "Ein überschaubarer Anfang genügt; danach darfst du neu entscheiden.",
    secondLeads: "Deine Stimmung hilft dir beim Anfangen – teile deine Kraft dennoch klug ein.",
    firstLeads: "Warte nicht auf perfekte Motivation; ein klarer Anfang kann dich tragen.",
    balanced: "Ein verlässlicher nächster Schritt reicht als gute Richtung.",
    bothHigh: "Nutze den Schwung für einen klaren Schritt, ohne den Rahmen unnötig auszuweiten."
  },
  standard: {
    bothLow: "Halte den Rhythmus einfach und verlässlich, ohne zusätzlichen Druck.",
    secondLeads: "Die innere Bereitschaft ist da; plane deine Kraft mit Augenmaß.",
    firstLeads: "Energie ist verfügbar; ein klarer Rhythmus gibt ihr Richtung.",
    balanced: "Deine Werte bilden zusammen eine tragfähige Basis.",
    bothHigh: "Die Basis trägt gut; bleib klar, statt unnötig zu beschleunigen."
  },
  focus: {
    bothLow: "Wähle einen einzigen Schwerpunkt und schütze deine verbleibende Kraft.",
    secondLeads: "Deine innere Bereitschaft ist stark; bündele sie, statt dich zu verzetteln.",
    firstLeads: "Kraft ist da; gib ihr eine klare Richtung, ohne auf den perfekten Antrieb zu warten.",
    balanced: "Du hast genug Stabilität für Tiefe – halte Ablenkungen klein.",
    bothHigh: "Alles zieht gemeinsam – schütze deinen Fokus vor zu vielen Baustellen."
  },
  development: {
    bothLow: "Entwicklung bedeutet heute nicht mehr Menge, sondern eine kluge Verbesserung.",
    secondLeads: "Deine Begeisterung öffnet Raum; gib ihr eine klare Entwicklungsrichtung.",
    firstLeads: "Deine Kraft ist hoch; setze sie für Aufbau statt für bloßes Tempo ein.",
    balanced: "Setze einen mutigen Entwicklungsakzent, statt einfach nur mehr zu tun.",
    bothHigh: "Nutze den Schwung mutig – aber verliere dich nicht im bloßen Mehr."
  }
};

/* Zustandskategorie aus den beiden Grundskalen. Die Prüfreihenfolge ist
   verbindlich: bothHigh, bothLow, secondLeads, firstLeads, balanced. */
function coachStateCategory(first, second) {
  const a = clamp(Number(first), 0, 100);
  const b = clamp(Number(second), 0, 100);
  if (a >= 80 && b >= 80) return "bothHigh";
  if (a < 40 && b < 40) return "bothLow";
  if (b - a >= 15) return "secondLeads";
  if (a - b >= 15) return "firstLeads";
  return "balanced";
}

function coachImpulse(values, key) {
  const mode = modeMeta(key);
  const usable = (values || []).map(toNumberOrNull).filter(value => value !== null);
  if (!mode || !usable.length) return null;
  const category = coachStateCategory(usable[0], usable.length > 1 ? usable[1] : usable[0]);
  return {
    modeKey: mode.key,
    category,
    core: MODE_COACH_CORE[mode.key],
    addition: MODE_COACH_ADDITION[mode.key][category]
  };
}

/* --------------------------------------------------------------------------
   7. Bedeutungstexte unter den Reglern

   Für jeden Reglerwert steht genau ein fester Text: 21 Stufen je Vorlage.
   Es gibt keinen Zufall; gleiche Werte ergeben immer denselben Satz. Die
   Texte beschreiben ausschließlich das eigene Erleben, sie bewerten nicht.

   Eigene Skalen ohne Vorlage bekommen einen aus ihren eigenen Beschriftungen
   gebildeten Satz – dadurch braucht keine neue Skala hinterlegte Texte.
   -------------------------------------------------------------------------- */

const SCALE_MEANING_PRESETS = {
  energy: {
    label: "Energie",
    texts: {
      0: "Keine nutzbare Reserve – vollständige Entlastung steht im Vordergrund.",
      5: "Fast keine Kraft – selbst kleine Anforderungen kosten viel.",
      10: "Kaum Reserven – nur das Nötigste ist heute realistisch.",
      15: "Sehr wenig Energie – kleine Schritte und Pausen sind angemessen.",
      20: "Wenig Kraft – ein reduziertes Tempo schützt die verbleibende Energie.",
      25: "Begrenzte Reserve – ein kleiner, klarer Schritt ist gut machbar.",
      30: "Noch eher kraftarm – Umfang und Tempo sollten überschaubar bleiben.",
      35: "Etwas Energie ist da – ein ruhiges Pensum ist realistisch.",
      40: "Grundenergie vorhanden – einfache Aufgaben sind gut tragbar.",
      45: "Solide Basis – ein normales, begrenztes Pensum ist möglich.",
      50: "Mittlere Energie – Alltag und einzelne Anforderungen sind machbar.",
      55: "Ausreichende Kraft – verlässliches Handeln ist gut möglich.",
      60: "Stabile Energie – ein normales Pensum ist gut tragbar.",
      65: "Gute Reserven – auch konzentriertes Arbeiten ist möglich.",
      70: "Deutlich belastbar – anspruchsvollere Aufgaben passen heute gut.",
      75: "Viel Energie – Tempo und Tiefe können bewusst erhöht werden.",
      80: "Hohe Kraft – auch größere Vorhaben sind realistisch.",
      85: "Sehr gute Reserven – längere Konzentration ist gut möglich.",
      90: "Sehr hohe Energie – es besteht viel Handlungsspielraum.",
      95: "Nahezu volle Kraft – besonders anspruchsvolle Schritte sind tragbar.",
      100: "Volle Energie – die verfügbare Handlungsfähigkeit ist maximal."
    }
  },
  mood: {
    label: "Laune",
    texts: {
      0: "Extrem gedrückt – der Moment fühlt sich kaum tragbar an.",
      5: "Sehr stark gedrückt – fast alles wirkt gerade schwer.",
      10: "Deutlich gedrückt – Milde mit dir ist angemessen.",
      15: "Stark gedämpft – Leichtigkeit ist im Moment kaum erreichbar.",
      20: "Niedrige Stimmung – vieles kostet spürbar mehr Überwindung.",
      25: "Gedrückt – positive Impulse kommen nur schwer durch.",
      30: "Eher niedergeschlagen – der Tag fühlt sich belastet an.",
      35: "Gedämpfte Stimmung – einzelne gute Momente bleiben erreichbar.",
      40: "Leicht gedrückt – Belastendes steht noch im Vordergrund.",
      45: "Etwas unter der eigenen Mitte – die Stimmung bleibt verhalten.",
      50: "Neutral – weder deutlich belastet noch besonders getragen.",
      55: "Leicht aufgehellt – erste positive Energie ist spürbar.",
      60: "Ziemlich ausgeglichen – der Tag fühlt sich grundsätzlich stimmig an.",
      65: "Gute Stimmung – vieles fällt etwas leichter.",
      70: "Deutlich positiv – Offenheit und Zuversicht sind spürbar.",
      75: "Sehr gute Grundstimmung – Vorhaben fühlen sich zugänglich an.",
      80: "Freudige Stimmung – der Tag wird offen und zugewandt erlebt.",
      85: "Sehr positiv – Motivation und Verbundenheit sind deutlich spürbar.",
      90: "Ausgesprochen gute Stimmung – Leichtigkeit trägt das Handeln.",
      95: "Fast euphorisch – sehr viel Freude und Schwung sind vorhanden.",
      100: "Höchste Stimmung – vollständige Begeisterung und Leichtigkeit sind spürbar."
    }
  },
  focus: {
    label: "Fokus",
    texts: {
      0: "Kein Fokus greifbar – Aufmerksamkeit springt vollständig.",
      5: "Fast keine Sammlung möglich – jeder Reiz zieht weg.",
      10: "Sehr zerstreut – Gedanken finden kaum Halt.",
      15: "Stark ablenkbar – nur sehr kurze Einheiten sind realistisch.",
      20: "Wenig Sammlung – häufige Unterbrechungen prägen das Bild.",
      25: "Begrenzte Konzentration – kleine, klare Einheiten helfen.",
      30: "Noch eher unruhig – Struktur von außen trägt jetzt.",
      35: "Etwas Sammlung – ruhige Aufgaben sind gut machbar.",
      40: "Grundfokus vorhanden – Einfaches gelingt verlässlich.",
      45: "Brauchbare Konzentration – begrenzte Tiefe ist möglich.",
      50: "Mittlerer Fokus – Alltagsaufgaben laufen ordentlich.",
      55: "Ausreichende Sammlung – Dranbleiben gelingt meist.",
      60: "Stabiler Fokus – ein normales Pensum ist gut tragbar.",
      65: "Gute Konzentration – auch Anspruchsvolles ist zugänglich.",
      70: "Deutlich gesammelt – längere Einheiten sind realistisch.",
      75: "Klarer Fokus – Tiefe entsteht ohne große Reibung.",
      80: "Hohe Sammlung – Ablenkungen fallen kaum ins Gewicht.",
      85: "Sehr klare Aufmerksamkeit – Zusammenhänge werden gut greifbar.",
      90: "Sehr hoher Fokus – konzentriertes Arbeiten trägt weit.",
      95: "Nahezu vollständige Sammlung – Tiefe entsteht mühelos.",
      100: "Vollständiger Fokus – die Aufmerksamkeit bleibt ganz bei einer Sache."
    }
  },
  calm: {
    label: "Ruhe",
    texts: {
      0: "Vollständige innere Unruhe – nichts kommt zur Ruhe.",
      5: "Sehr starke Anspannung – der Körper bleibt in Alarm.",
      10: "Deutlich angespannt – Entspannung ist kaum zugänglich.",
      15: "Stark unruhig – Gedanken kreisen fast durchgehend.",
      20: "Angespannt – Ruhe braucht bewusste Unterstützung.",
      25: "Unruhig – kurze Pausen wirken nur begrenzt.",
      30: "Eher angespannt – Anspannung bleibt im Hintergrund spürbar.",
      35: "Leicht unruhig – einzelne ruhige Momente sind erreichbar.",
      40: "Grundruhe vorhanden – Anspannung tritt zeitweise zurück.",
      45: "Etwas unter der eigenen Mitte – Ruhe bleibt wechselhaft.",
      50: "Neutral – weder angespannt noch besonders ruhig.",
      55: "Leicht gelöst – erste Entspannung ist spürbar.",
      60: "Ziemlich ruhig – Anspannung fällt kaum ins Gewicht.",
      65: "Gelöst – der Körper darf loslassen.",
      70: "Deutlich ruhig – Gelassenheit trägt durch den Tag.",
      75: "Sehr gelöst – Belastendes verliert an Gewicht.",
      80: "Ruhig und klar – innere Weite ist spürbar.",
      85: "Sehr ruhig – Gelassenheit prägt das Erleben.",
      90: "Tiefe Ruhe – Anspannung spielt fast keine Rolle.",
      95: "Nahezu vollständige Gelassenheit.",
      100: "Vollständige innere Ruhe – alles darf so sein, wie es ist."
    }
  },
  closeness: {
    label: "Verbundenheit",
    texts: {
      0: "Im eigenen Erleben kaum zugänglich.",
      5: "Sehr große innere Distanz – die Ausrichtung tritt stark zurück.",
      10: "Sehr fern – spielt gerade kaum eine Rolle.",
      15: "Kaum spürbar – die innere Hinwendung bleibt schwach.",
      20: "Fern – nur vereinzelt wahrgenommen.",
      25: "Noch deutlich fern – erreicht den Alltag selten.",
      30: "Eher fern – zeigt sich nur in einzelnen Momenten.",
      35: "Erste Nähe – zeitweise wieder spürbar.",
      40: "Leicht präsent – begleitet einzelne Entscheidungen.",
      45: "Im Hintergrund vorhanden – noch wechselhaft.",
      50: "Spürbar vorhanden – Nähe und Distanz halten sich die Waage.",
      55: "Regelmäßig präsent – begleitet den Alltag zunehmend.",
      60: "Stabil vorhanden – wirkt in mehreren Situationen.",
      65: "Deutlich präsent – Absichten richten sich bewusster aus.",
      70: "Nah – prägt viele Entscheidungen.",
      75: "Spürbare Nähe – Handeln und Absicht greifen ineinander.",
      80: "Sehr nah – die Ausrichtung trägt den Tag.",
      85: "Tiefe Nähe – bleibt auch im Handeln gegenwärtig.",
      90: "Sehr starke Präsenz – Absicht und Verhalten sind klar ausgerichtet.",
      95: "Fast durchgehend nah – prägt den gesamten Tag.",
      100: "Durchgehend gegenwärtig – trägt Absicht und Handeln."
    }
  }
};

const SCALE_PRESET_KEYS = Object.keys(SCALE_MEANING_PRESETS);

function scaleMeaningStep(value) {
  const numeric = toNumberOrNull(value);
  if (numeric === null) return null;
  return Math.round(clamp(numeric, 0, 100) / 5) * 5;
}

/* Bedeutungssatz zu einem Reglerwert. Ohne Vorlage entsteht der Satz aus den
   beiden Beschriftungen der Skala – so bleibt jede eigene Skala erklärt. */
function scaleMeaning(scale, value) {
  const step = scaleMeaningStep(value);
  if (step === null) return "";
  const preset = SCALE_MEANING_PRESETS[scale?.preset];
  if (preset) return preset.texts[step] || "";
  const low = scale?.lowLabel || "niedrig";
  const high = scale?.highLabel || "hoch";
  if (step <= 15) return `Sehr deutlich Richtung „${low}“.`;
  if (step <= 35) return `Eher Richtung „${low}“.`;
  if (step <= 45) return `Etwas unter der Mitte, leicht Richtung „${low}“.`;
  if (step <= 55) return `In der Mitte zwischen „${low}“ und „${high}“.`;
  if (step <= 65) return `Etwas über der Mitte, leicht Richtung „${high}“.`;
  if (step <= 85) return `Eher Richtung „${high}“.`;
  return `Sehr deutlich Richtung „${high}“.`;
}

/* --------------------------------------------------------------------------
   8. Statuswerte
   -------------------------------------------------------------------------- */

const ROUTINE_STATE_ORDER = ["", "done", "responsiblySkipped", "missed"];
const TASK_STATE_META = {
  "": { label: "Offen", short: "Offen", icon: "–", score: null, className: "open" },
  done: { label: "Erledigt", short: "Erledigt", icon: "✓", score: 1, className: "done" },
  responsiblySkipped: { label: "Bewusst ausgelassen", short: "Bewusst", icon: "✓", score: 1, className: "conscientious" },
  missed: { label: "Nicht erledigt", short: "Nicht erledigt", icon: "×", score: 0, className: "missed" }
};

// Verantwortungsvoll abgeschlossen heißt: durchgeführt ODER bewusst und
// gewissenhaft nicht durchgeführt. Beides zählt gleich.
function isRoutineSettled(state) { return state === "done" || state === "responsiblySkipped"; }

const STREAK_DAILY_STATES = {
  "": { label: "Heute offen", short: "Offen", score: null },
  held: { label: "Gehalten", short: "Gehalten", score: 1 },
  resisted: { label: "Herausforderung widerstanden", short: "Widerstanden", score: 1 },
  lapse: { label: "Unterbrechung", short: "Unterbrochen", score: 0 }
};

// Ältere Datenstände kennen "protected" statt "held".
function normalizeStreakDailyState(value) {
  const mapped = value === "protected" ? "held" : value;
  return STREAK_DAILY_STATES[mapped] ? mapped : "";
}

/* Zustände einer Checkliste. Neue Checklisten bekommen diesen Satz; eine
   migrierte Checkliste bringt ihre eigenen Zustände mit und behält dadurch
   jeden gespeicherten Wert unverändert. */
const DEFAULT_CHECKLIST_STATES = [
  { id: "", label: "Offen", icon: "○", tone: "neutral" },
  { id: "done", label: "Erledigt", icon: "✓", tone: "positive" },
  { id: "skipped", label: "Nicht vorgesehen", icon: "–", tone: "neutral" },
  { id: "missed", label: "Ausgelassen", icon: "×", tone: "negative" }
];

/* --------------------------------------------------------------------------
   9. Trackertypen
   Ein Tracker ist ein vom Nutzer definiertes Element, das er täglich
   festhalten möchte. Die Typen decken zusammen alles ab, was die App früher
   fest eingebaut hatte – Wasser, Schritte, Schlaf, Mahlzeiten, Gebete,
   Dankbarkeit, Fastentage.
   -------------------------------------------------------------------------- */

const TRACKER_TYPES = [
  { key: "scale",     label: "Regler",         hint: "Ein Wert von 0 bis 100, je Check-in erfasst. Zum Beispiel Energie oder Ruhe.", perCheckin: true },
  { key: "counter",   label: "Zähler",         hint: "Schrittweise erhöhen und verringern. Zum Beispiel Gläser Wasser." },
  { key: "number",    label: "Zahl",           hint: "Eine freie Zahl pro Tag. Zum Beispiel Schritte oder Seiten." },
  { key: "choice",    label: "Auswahl",        hint: "Eine Option aus einer eigenen Liste. Zum Beispiel Schlafqualität." },
  { key: "checklist", label: "Checkliste",     hint: "Mehrere feste Punkte, jeden Tag abhakbar. Zum Beispiel Gebete oder Medikamente." },
  { key: "toggle",    label: "Ja / Nein",      hint: "Ein einfacher Schalter. Zum Beispiel „heute gefastet“." },
  { key: "text",      label: "Text",           hint: "Ein kurzer Freitext pro Tag. Zum Beispiel Dankbarkeit." }
];

function trackerTypeMeta(key) {
  return TRACKER_TYPES.find(type => type.key === key) || TRACKER_TYPES[0];
}

function isScaleTracker(tracker) { return tracker?.type === "scale"; }

/* --------------------------------------------------------------------------
   10. Profil – das persönliche ROLEPLAY-System

   Enthält alles, was den Nutzer ausmacht: seine Rollen, seine Aktivitäten,
   seine Tracker, seine Streaks und seine Einstellungen. Fest eingebaute
   persönliche Inhalte gibt es nicht mehr.
   -------------------------------------------------------------------------- */

const MODULE_KEYS = ["checkins", "activities", "routines", "trackers", "streaks", "notes"];

const MODULE_META = {
  checkins: { label: "Check-ins", hint: "Mehrmals am Tag festhalten, wie es dir geht." },
  activities: { label: "Rollenaktivitäten", hint: "Was du heute für deine Rollen getan hast." },
  routines: { label: "Routinen", hint: "Feste Abläufe mit Schritten und Timer." },
  trackers: { label: "Tracking", hint: "Deine eigenen Trackingelemente." },
  streaks: { label: "Streaks", hint: "Durchhaltezähler für das, was du halten willst." },
  notes: { label: "Tagesnotiz", hint: "Ein freies Textfeld für den Tag." }
};

function defaultModules() {
  return { checkins: true, activities: true, routines: true, trackers: true, streaks: false, notes: true };
}

function defaultSettings() {
  return {
    theme: "system",          // system | light | dark
    weekMode: "calendar",     // calendar | sliding
    roleRotation: true,       // Wochentagsrollen aus activeDays ableiten
    showCoach: true,          // Rollenmodus und Impuls anzeigen
    protectStreaks: false     // Rückfrage vor dem Öffnen der Streak-Details
  };
}

/* Die beiden Grundskalen. Sie sind umbenennbar, aber nicht löschbar, weil
   der Rollenmodus auf ihnen aufsetzt. */
function defaultScales() {
  return [
    { id: "energy", label: "Energie", lowLabel: "niedrig", highLabel: "hoch", color: "#3D6FE0", preset: "energy", inMode: true, order: 0 },
    { id: "mood", label: "Laune", lowLabel: "gedrückt", highLabel: "sehr gut", color: "#E8913A", preset: "mood", inMode: true, order: 1 }
  ];
}

function emptyProfile() {
  return {
    schema: PROFILE_SCHEMA,
    appVersion: APP_VERSION,
    createdAt: new Date().toISOString(),
    onboardedAt: "",
    displayName: "",
    roles: [],
    activityTemplates: [],
    scales: defaultScales(),
    trackers: [],
    streaks: [],
    modules: defaultModules(),
    settings: defaultSettings()
  };
}

function normalizeGoal(raw, index) {
  return {
    id: String(raw?.id || uid("goal")),
    title: String(raw?.title || "").trim(),
    done: Boolean(raw?.done),
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index
  };
}

function normalizeRole(raw, index, takenIds = []) {
  const name = String(raw?.name || "").trim() || `Rolle ${index + 1}`;
  const id = uniqueId(String(raw?.id || slugify(name, `rolle-${index + 1}`)), takenIds);
  const color = /^#[0-9a-f]{6}$/i.test(String(raw?.color || "")) ? String(raw.color) : nextRoleColor([]);
  const activeDays = Array.isArray(raw?.activeDays)
    ? [...new Set(raw.activeDays.map(Number).filter(day => day >= 0 && day <= 6))].sort((a, b) => a - b)
    : [];
  return {
    id,
    name,
    emoji: String(raw?.emoji || "🎭").slice(0, 8),
    color,
    text: readableTextColor(color),
    description: String(raw?.description || ""),
    goals: (Array.isArray(raw?.goals) ? raw.goals : []).map(normalizeGoal).filter(goal => goal.title),
    routineIds: Array.isArray(raw?.routineIds) ? raw.routineIds.map(String) : [],
    activeDays,
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index,
    archived: Boolean(raw?.archived)
  };
}

function normalizeActivityTemplate(raw, index, takenIds = [], roleIds = []) {
  const title = String(raw?.title || raw?.label || "").trim() || `Aktivität ${index + 1}`;
  const id = uniqueId(String(raw?.id || slugify(title, `aktivitaet-${index + 1}`)), takenIds);
  const weight = Number(raw?.weight);
  const cap = Number(raw?.dailyCap);
  return {
    id,
    title,
    emoji: String(raw?.emoji || "").slice(0, 8),
    roleId: roleIds.includes(String(raw?.roleId)) ? String(raw.roleId) : "",
    weight: Number.isFinite(weight) && weight > 0 ? Math.round(weight * 100) / 100 : 1,
    // null = keine Tagesbegrenzung, sonst der Tageswert unabhängig von der Anzahl.
    dailyCap: Number.isFinite(cap) && cap > 0 ? Math.round(cap * 100) / 100 : null,
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index,
    archived: Boolean(raw?.archived)
  };
}

function normalizeChoiceOption(raw, index) {
  const label = String(raw?.label ?? raw ?? "").trim() || `Option ${index + 1}`;
  return {
    id: String(raw?.id || slugify(label, `option-${index + 1}`)),
    label,
    // Optionaler Vergleichswert 0–100 für die Auswertung. null = nicht bewertet.
    score: toNumberOrNull(raw?.score) === null ? null : clamp(Number(raw.score), 0, 100),
    color: /^#[0-9a-f]{6}$/i.test(String(raw?.color || "")) ? String(raw.color) : ""
  };
}

function normalizeChecklistState(raw, index) {
  const label = String(raw?.label || "").trim() || `Status ${index + 1}`;
  return {
    id: String(raw?.id ?? ""),
    label,
    icon: String(raw?.icon || "○").slice(0, 4),
    tone: ["positive", "negative", "neutral"].includes(raw?.tone) ? raw.tone : "neutral"
  };
}

function normalizeTracker(raw, index, takenIds = []) {
  const label = String(raw?.label || "").trim() || `Tracker ${index + 1}`;
  const type = TRACKER_TYPES.some(item => item.key === raw?.type) ? raw.type : "counter";
  const id = uniqueId(String(raw?.id || slugify(label, `tracker-${index + 1}`)), takenIds);
  const tracker = {
    id,
    label,
    emoji: String(raw?.emoji || "").slice(0, 8),
    type,
    hint: String(raw?.hint || ""),
    enabled: raw?.enabled === undefined ? true : Boolean(raw.enabled),
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index
  };
  if (type === "counter") {
    tracker.step = Number(raw?.step) > 0 ? Number(raw.step) : 1;
    tracker.unit = String(raw?.unit || "");
    tracker.target = toNumberOrNull(raw?.target);
    tracker.decimals = [0, 1, 2].includes(Number(raw?.decimals)) ? Number(raw.decimals) : 0;
  }
  if (type === "number") {
    tracker.unit = String(raw?.unit || "");
    tracker.target = toNumberOrNull(raw?.target);
  }
  if (type === "choice") {
    tracker.options = (Array.isArray(raw?.options) ? raw.options : []).map(normalizeChoiceOption);
    if (!tracker.options.length) tracker.options = [{ id: "ja", label: "Ja", score: 100, color: "" }, { id: "nein", label: "Nein", score: 0, color: "" }];
  }
  if (type === "checklist") {
    tracker.items = (Array.isArray(raw?.items) ? raw.items : []).map((item, itemIndex) => ({
      id: String(item?.id || slugify(item?.label || `punkt-${itemIndex + 1}`, `punkt-${itemIndex + 1}`)),
      label: String(item?.label ?? item ?? "").trim() || `Punkt ${itemIndex + 1}`
    }));
    const states = (Array.isArray(raw?.states) ? raw.states : []).map(normalizeChecklistState);
    tracker.states = states.length ? states : DEFAULT_CHECKLIST_STATES.map(state => ({ ...state }));
    // Der erste Zustand ist immer der offene Ausgangszustand.
    if (tracker.states[0].id !== "") tracker.states.unshift({ id: "", label: "Offen", icon: "○", tone: "neutral" });
  }
  if (type === "text") {
    tracker.placeholder = String(raw?.placeholder || "");
    tracker.rows = clamp(Number(raw?.rows) || 2, 1, 12);
  }
  if (type === "scale") {
    tracker.lowLabel = String(raw?.lowLabel || "niedrig");
    tracker.highLabel = String(raw?.highLabel || "hoch");
  }
  return tracker;
}

function normalizeScale(raw, index, takenIds = []) {
  const label = String(raw?.label || "").trim() || `Skala ${index + 1}`;
  const id = uniqueId(String(raw?.id || slugify(label, `skala-${index + 1}`)), takenIds);
  return {
    id,
    label,
    lowLabel: String(raw?.lowLabel || "niedrig"),
    highLabel: String(raw?.highLabel || "hoch"),
    color: /^#[0-9a-f]{6}$/i.test(String(raw?.color || "")) ? String(raw.color) : ROLE_COLORS[index % ROLE_COLORS.length],
    preset: SCALE_PRESET_KEYS.includes(raw?.preset) ? raw.preset : "",
    inMode: Boolean(raw?.inMode),
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index
  };
}

function normalizeStreak(raw, index, takenIds = []) {
  const label = String(raw?.label || "").trim() || `Streak ${index + 1}`;
  const id = uniqueId(String(raw?.id || slugify(label, `streak-${index + 1}`)), takenIds);
  return {
    id,
    label,
    emoji: String(raw?.emoji || "🔥").slice(0, 8),
    description: String(raw?.description || ""),
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index,
    archived: Boolean(raw?.archived)
  };
}

function sortByOrder(list) {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// Vergibt lückenlose Reihenfolgewerte, damit Sortieren immer eindeutig bleibt.
function reindex(list) {
  return sortByOrder(list).map((item, index) => ({ ...item, order: index }));
}

function normalizeProfile(raw) {
  const base = emptyProfile();
  const value = raw && typeof raw === "object" ? raw : {};

  const roleIds = [];
  const roles = reindex((Array.isArray(value.roles) ? value.roles : []).map((role, index) => {
    const normalized = normalizeRole(role, index, roleIds);
    roleIds.push(normalized.id);
    return normalized;
  }));

  const templateIds = [];
  const activityTemplates = reindex((Array.isArray(value.activityTemplates) ? value.activityTemplates : [])
    .map((template, index) => {
      const normalized = normalizeActivityTemplate(template, index, templateIds, roleIds);
      templateIds.push(normalized.id);
      return normalized;
    }));

  const scaleIds = [];
  let scales = reindex((Array.isArray(value.scales) ? value.scales : defaultScales())
    .map((scale, index) => {
      const normalized = normalizeScale(scale, index, scaleIds);
      scaleIds.push(normalized.id);
      return normalized;
    }));
  // Ohne Skalen gäbe es keinen Check-in – die Grundskalen kehren dann zurück.
  if (!scales.length) scales = defaultScales();
  // Mindestens eine Skala muss den Modus bilden, sonst bliebe er dauerhaft leer.
  if (!scales.some(scale => scale.inMode)) scales = scales.map((scale, index) => ({ ...scale, inMode: index < 2 }));

  const trackerIds = [];
  const trackers = reindex((Array.isArray(value.trackers) ? value.trackers : [])
    .map((tracker, index) => {
      const normalized = normalizeTracker(tracker, index, trackerIds);
      trackerIds.push(normalized.id);
      return normalized;
    }));

  const streakIds = [];
  const streaks = reindex((Array.isArray(value.streaks) ? value.streaks : [])
    .map((streak, index) => {
      const normalized = normalizeStreak(streak, index, streakIds);
      streakIds.push(normalized.id);
      return normalized;
    }));

  const modules = { ...base.modules };
  MODULE_KEYS.forEach(key => {
    if (value.modules && value.modules[key] !== undefined) modules[key] = Boolean(value.modules[key]);
  });

  const settings = { ...base.settings, ...(value.settings && typeof value.settings === "object" ? value.settings : {}) };
  settings.theme = ["system", "light", "dark"].includes(settings.theme) ? settings.theme : "system";
  settings.weekMode = settings.weekMode === "sliding" ? "sliding" : "calendar";
  settings.roleRotation = Boolean(settings.roleRotation);
  settings.showCoach = Boolean(settings.showCoach);
  settings.protectStreaks = Boolean(settings.protectStreaks);

  return {
    schema: PROFILE_SCHEMA,
    appVersion: APP_VERSION,
    createdAt: value.createdAt || base.createdAt,
    onboardedAt: value.onboardedAt || "",
    displayName: String(value.displayName || ""),
    roles, activityTemplates, scales, trackers, streaks, modules, settings
  };
}

/* Sichtbare Elemente. Archivierte Rollen und Streaks bleiben in den
   Auswertungen vergangener Zeiträume lesbar, verschwinden aber aus den
   täglichen Ansichten. */
function activeRoles(profile) { return sortByOrder(profile?.roles || []).filter(role => !role.archived); }
function activeStreaks(profile) { return sortByOrder(profile?.streaks || []).filter(streak => !streak.archived); }
function activeTemplates(profile) { return sortByOrder(profile?.activityTemplates || []).filter(item => !item.archived); }
function enabledTrackers(profile) { return sortByOrder(profile?.trackers || []).filter(tracker => tracker.enabled); }
function dayTrackers(profile) { return enabledTrackers(profile).filter(tracker => tracker.type !== "scale"); }
function orderedScales(profile) { return sortByOrder(profile?.scales || []); }
function modeScales(profile) { return orderedScales(profile).filter(scale => scale.inMode); }

function findRole(profile, roleId) {
  return (profile?.roles || []).find(role => role.id === roleId) || null;
}

function findTracker(profile, trackerId) {
  return (profile?.trackers || []).find(tracker => tracker.id === trackerId) || null;
}

function findStreak(profile, streakId) {
  return (profile?.streaks || []).find(streak => streak.id === streakId) || null;
}

/* Rolle eines Tages aus der Wochentagszuordnung. Gibt es keine passende
   Rolle, bleibt der Tag ohne vorgeschlagene Rolle – die App erfindet keine.
   Einzige Ausnahme: wer genau eine Rolle führt, bekommt sie immer. */
function rotationRoleId(profile, iso) {
  const roles = activeRoles(profile);
  if (roles.length === 1) return roles[0].id;
  if (!profile?.settings?.roleRotation) return "";
  const weekday = weekdayOf(iso);
  const match = roles.find(role => role.activeDays.includes(weekday));
  return match ? match.id : "";
}

/* Ein neu angelegtes Profil hat noch nichts zu zeigen. */
function profileIsEmpty(profile) {
  return !(profile?.roles || []).length
    && !(profile?.trackers || []).length
    && !(profile?.streaks || []).length;
}

/* --------------------------------------------------------------------------
   11. Rollenvorlagen für das Onboarding
   Ausdrücklich nur Vorschläge. Sie werden kopiert und danach frei bearbeitet;
   die App kennt sie nach dem Anlegen nicht mehr als etwas Besonderes.
   -------------------------------------------------------------------------- */

const ROLE_SUGGESTIONS = [
  { name: "Ich selbst", emoji: "🫀", color: "#4AA8FF", description: "Zeit und Aufmerksamkeit für dich selbst.", goals: ["Bewusst zur Ruhe kommen"] },
  { name: "Körper", emoji: "🧬", color: "#2EC4B6", description: "Gesundheit, Bewegung und Erholung.", goals: ["Regelmäßig in Bewegung bleiben"] },
  { name: "Beruf", emoji: "💼", color: "#1F6FB2", description: "Arbeit, Verantwortung und Vorhaben.", goals: ["Das Wichtigste zuerst erledigen"] },
  { name: "Lernen", emoji: "🎓", color: "#F07A32", description: "Wissen, Ausbildung und Neugier.", goals: ["Jede Woche etwas dazulernen"] },
  { name: "Familie", emoji: "💌", color: "#3DAE5F", description: "Nähe, Kontakt und gemeinsame Zeit.", goals: ["Bewusst Zeit füreinander nehmen"] },
  { name: "Freundschaft", emoji: "🤝", color: "#E5487C", description: "Menschen, die dir wichtig sind.", goals: ["Den Kontakt aktiv halten"] },
  { name: "Zuhause", emoji: "🏡", color: "#8E2F45", description: "Ordnung, Versorgung und Wohlfühlen.", goals: ["Einen Bereich in Ordnung bringen"] },
  { name: "Spiritualität", emoji: "🕊️", color: "#7258E8", description: "Glaube, Sinn und innere Ausrichtung.", goals: ["Täglich innehalten"] },
  { name: "Kreativität", emoji: "🎨", color: "#C2569E", description: "Schreiben, Musik, Gestalten.", goals: ["Regelmäßig etwas erschaffen"] },
  { name: "Finanzen", emoji: "💰", color: "#F2B705", description: "Überblick, Vorsorge und Entscheidungen.", goals: ["Den Überblick behalten"] }
];

/* Trackervorlagen für die Ersteinrichtung. Ebenfalls nur Vorschläge. */
const TRACKER_SUGGESTIONS = [
  { id: "wasser", label: "Wasser", emoji: "💧", type: "counter", step: 0.5, unit: "Liter", target: 2, decimals: 1 },
  { id: "schritte", label: "Schritte", emoji: "👟", type: "number", unit: "Schritte", target: 8000 },
  { id: "schlaf", label: "Schlafqualität", emoji: "😴", type: "choice", options: [
    { id: "sehr-gut", label: "Sehr erholsam", score: 95 },
    { id: "gut", label: "Erholsam", score: 78 },
    { id: "okay", label: "Okay", score: 58 },
    { id: "unruhig", label: "Unruhig", score: 36 },
    { id: "kaum", label: "Kaum Schlaf", score: 16 }
  ] },
  { id: "bewegung", label: "Bewegung", emoji: "🤸", type: "toggle" },
  { id: "dankbarkeit", label: "Dankbarkeit", emoji: "🙏", type: "text", rows: 2, placeholder: "Wofür bist du heute dankbar?" },
  { id: "stimmungsnotiz", label: "Was mich heute bewegt", emoji: "💭", type: "text", rows: 3, placeholder: "Optional" }
];

const STREAK_SUGGESTIONS = [
  { label: "Rauchfrei", emoji: "🚭" },
  { label: "Alkoholfrei", emoji: "🍃" },
  { label: "Zuckerfrei", emoji: "🍎" },
  { label: "Ohne Bildschirm vor dem Schlafen", emoji: "🌙" }
];

/* --------------------------------------------------------------------------
   12. Migration bestehender Nutzerdaten

   Ein Bestand aus Version 6 kennt sieben fest eingebaute Rollen, vier
   Streaks, drei Regler, Gebete, Mahlzeiten, Wasser, Schritte, Schlaf,
   Dankbarkeit und Fastentage. All das wird hier in genau die Objekte
   überführt, die ein Nutzer heute selbst anlegen würde. Nichts geht
   verloren, nichts bleibt fest eingebaut.
   -------------------------------------------------------------------------- */

const LEGACY_ROLES = [
  { id: "ich-person", name: "Ich-Person", emoji: "🫆", color: "#4AA8FF", activeDays: [1], description: "Bewusst bei dir selbst bleiben." },
  { id: "vitalist", name: "Vitalist", emoji: "🧬", color: "#193C8C", activeDays: [2], description: "In deinen Körper investieren." },
  { id: "absolvent", name: "Absolvent", emoji: "🎓", color: "#F07A32", activeDays: [3], description: "In Wissen und Abschluss investieren." },
  { id: "unternehmer", name: "Unternehmer", emoji: "💰", color: "#F2C94C", activeDays: [4], description: "An deinen Vorhaben und deiner Zukunft bauen." },
  { id: "muslim", name: "Muslim", emoji: "🕋", color: "#2EC4B6", activeDays: [5], description: "Deine Verbindung zu Allah stärken." },
  { id: "wirt", name: "Wirt", emoji: "🏡", color: "#8E2F45", activeDays: [6], description: "Ordnung und Verantwortung zuhause tragen." },
  { id: "familienmensch", name: "Familienmensch", emoji: "💌", color: "#72C472", activeDays: [0], description: "Deiner Familie bewusst Zeit und Nähe geben." }
];

// Frühere Rollennamen, die auf dieselbe Rolle zeigen.
const LEGACY_ROLE_ALIASES = { Yannick: "Ich-Person", Ich: "Ich-Person" };

function legacyRoleIdForName(name) {
  const resolved = LEGACY_ROLE_ALIASES[name] || name;
  const role = LEGACY_ROLES.find(item => item.name === resolved);
  return role ? role.id : "";
}

const LEGACY_ACTIVITY_TEMPLATES = [
  { id: "sma", title: "SMA-Arbeitstag", roleId: "unternehmer", weight: 0.2, dailyCap: 0.2 },
  { id: "book", title: "Buchprojekt", roleId: "unternehmer", weight: 1.5 },
  { id: "gym", title: "Gym", roleId: "vitalist", weight: 2 },
  { id: "arabic", title: "Arabisch lernen", roleId: "muslim", weight: 1.5 },
  { id: "jumua", title: "Jumʿa", roleId: "muslim", weight: 2, dailyCap: 2 },
  { id: "mosque", title: "Moschee", roleId: "muslim", weight: 1, dailyCap: 1 },
  { id: "youth", title: "Jugendgruppe", roleId: "muslim", weight: 2 },
  { id: "cleanup", title: "Clean Up", roleId: "wirt", weight: 1.5 },
  { id: "family", title: "Familienzeit", roleId: "familienmensch", weight: 1.5 }
];

const LEGACY_PRAYERS = ["Fajr", "Dhuhr", "ʿAsr", "Maghrib", "ʿIschāʾ"];
const LEGACY_SUNNAH_PRAYERS = ["2 vor Fajr", "Ḍuḥā", "vor Dhuhr", "nach Dhuhr", "nach Maghrib", "nach ʿIschāʾ", "Witr", "Qiyām"];

/* Die Gebetszustände aus Version 6 bleiben exakt erhalten – die gespeicherten
   Werte sind zugleich die Kennungen der Checklistenzustände. */
const LEGACY_PRAYER_STATES = [
  { id: "", label: "Offen", icon: "○", tone: "neutral" },
  { id: "Normal", label: "Gebetet", icon: "●", tone: "positive" },
  { id: "Gemeinschaft", label: "Moschee", icon: "🕌", tone: "positive" },
  { id: "Verspätet", label: "Verspätet", icon: "🕓", tone: "positive" },
  { id: "Nachgeholt", label: "Nachgeholt", icon: "↩", tone: "positive" },
  { id: "Nicht gebetet", label: "Nicht gebetet", icon: "×", tone: "negative" }
];

const LEGACY_SUNNAH_STATES = [
  { id: "", label: "Offen", icon: "○", tone: "neutral" },
  { id: "Verrichtet", label: "Verrichtet", icon: "✓", tone: "positive" },
  { id: "Nicht vorgesehen", label: "Heute nicht vorgesehen", icon: "–", tone: "neutral" }
];

const LEGACY_MEAL_KEYS = ["breakfast", "lunch", "dinner", "snack"];
const LEGACY_MEAL_LABELS = { breakfast: "Frühstück", lunch: "Mittagessen", dinner: "Abendessen", snack: "Snacks" };
const LEGACY_MEAL_OPTIONS = [
  { id: "none", label: "Nichts gegessen", score: 28 },
  { id: "light", label: "Leicht", score: 78 },
  { id: "balanced", label: "Ausgewogen", score: 90 },
  { id: "protein", label: "Eiweißreich", score: 84 },
  { id: "sweet", label: "Süß", score: 52 },
  { id: "fatty", label: "Fettig", score: 44 },
  { id: "fastfood", label: "Stark verarbeitet", score: 36 },
  { id: "large", label: "Sehr große Mahlzeit", score: 46 },
  { id: "irregular", label: "Unregelmäßig / nebenbei", score: 48 },
  { id: "mixed", label: "Gemischt", score: 62 },
  { id: "other", label: "Sonstiges", score: 60 }
];

const LEGACY_SLEEP_OPTIONS = [
  { id: "0", label: "Sehr erholsam", score: 95 },
  { id: "1", label: "Erholsam", score: 86 },
  { id: "2", label: "Okay", score: 72 },
  { id: "4", label: "Unruhig", score: 48 },
  { id: "5", label: "Kaum Schlaf", score: 28 },
  { id: "6", label: "Kein Schlaf", score: 12 }
];

const LEGACY_DREAM_OPTIONS = [
  { id: "none", label: "Kein Traum erinnert", score: null },
  { id: "pleasant", label: "Angenehm", score: null },
  { id: "neutral", label: "Neutral", score: null },
  { id: "unusual", label: "Ungewöhnlich", score: null },
  { id: "burdening", label: "Belastend", score: null },
  { id: "nightmare", label: "Alptraum", score: null },
  { id: "relapse", label: "Konsum- oder Rückfalltraum", score: null },
  { id: "wet", label: "Feuchter Traum", score: null },
  { id: "spiritual", label: "Religiös oder bedeutsam empfunden", score: null }
];

const LEGACY_STREAKS = [
  { id: "cannabisFree", label: "Cannabisfrei", emoji: "🌿" },
  { id: "compulsionFree", label: "Begierde", emoji: "🛡️" },
  { id: "alcoholFree", label: "Alkoholfrei", emoji: "🍃" },
  { id: "smokeFree", label: "Rauchfrei", emoji: "🚭" }
];

/* Baut aus einem Version-6-Bestand ein vollständiges Profil. Es wird nur
   aufgenommen, was im Bestand tatsächlich vorkommt: wer nie Gebete erfasst
   hat, bekommt auch keinen Gebetstracker. */
function buildMigratedProfile(reviews = [], routines = {}) {
  const profile = emptyProfile();
  const used = key => reviews.some(key);

  profile.roles = LEGACY_ROLES.map((role, index) => normalizeRole({
    ...role,
    order: index,
    goals: [],
    routineIds: []
  }, index, []));

  const roleIds = profile.roles.map(role => role.id);
  profile.activityTemplates = LEGACY_ACTIVITY_TEMPLATES.map((template, index) =>
    normalizeActivityTemplate({ ...template, order: index }, index, [], roleIds));

  // Die dritte Skala übernimmt den dritten Regler aus Version 6 – jetzt frei benennbar.
  const hasTaqwa = used(review => (review.data?.stateCheckins || [])
    .some(entry => entry.taqwa !== null && entry.taqwa !== undefined && entry.taqwa !== ""));
  profile.scales = defaultScales();
  if (hasTaqwa) {
    profile.scales.push(normalizeScale({
      id: "taqwa", label: "Gottesfurcht", lowLabel: "fern", highLabel: "nah",
      color: "#2A9D78", preset: "closeness", inMode: true, order: 2
    }, 2, ["energy", "mood"]));
  }

  const trackers = [];
  const push = tracker => trackers.push(normalizeTracker({ ...tracker, order: trackers.length }, trackers.length, trackers.map(item => item.id)));

  if (used(review => LEGACY_PRAYERS.some(prayer => review.data?.prayers?.[prayer]))) {
    push({ id: "prayers", label: "Pflichtgebete", emoji: "🕌", type: "checklist",
      items: LEGACY_PRAYERS.map(prayer => ({ id: prayer, label: prayer })),
      states: LEGACY_PRAYER_STATES });
  }
  if (used(review => LEGACY_SUNNAH_PRAYERS.some(prayer => review.data?.sunnahPrayers?.[prayer]))) {
    push({ id: "sunnahPrayers", label: "Sunnah-Gebete", emoji: "🤲", type: "checklist",
      items: LEGACY_SUNNAH_PRAYERS.map(prayer => ({ id: prayer, label: prayer })),
      states: LEGACY_SUNNAH_STATES });
  }
  if (used(review => Number(review.data?.water || 0) > 0)) {
    push({ id: "water", label: "Getrunken", emoji: "💧", type: "counter", step: 0.5, unit: "Liter", target: 2, decimals: 1 });
  }
  if (used(review => review.data?.steps)) {
    push({ id: "steps", label: "Schritte", emoji: "👟", type: "number", unit: "Schritte", target: 8000 });
  }
  if (used(review => review.data?.sleepQualityScore !== "" && review.data?.sleepQualityScore !== undefined && review.data?.sleepQualityScore !== null)) {
    push({ id: "sleepQuality", label: "Schlafqualität", emoji: "😴", type: "choice", options: LEGACY_SLEEP_OPTIONS });
  }
  if (used(review => review.data?.dreamCategory)) {
    push({ id: "dreamCategory", label: "Traumkategorie", emoji: "🌙", type: "choice", options: LEGACY_DREAM_OPTIONS });
  }
  if (used(review => review.data?.dreams)) {
    push({ id: "dreams", label: "Traumnotiz", emoji: "💤", type: "text", rows: 3, placeholder: "Optional" });
  }
  if (used(review => LEGACY_MEAL_KEYS.some(key => review.data?.mealCategories?.[key] || review.data?.[key]))) {
    LEGACY_MEAL_KEYS.forEach(key => {
      push({ id: `meal-${key}`, label: LEGACY_MEAL_LABELS[key], emoji: "🍽️", type: "choice", options: LEGACY_MEAL_OPTIONS });
      push({ id: `mealNote-${key}`, label: `${LEGACY_MEAL_LABELS[key]} – Notiz`, emoji: "", type: "text", rows: 1, placeholder: "Optional: Was war es konkret?" });
    });
  }
  if (used(review => review.data?.gratitude1 || review.data?.gratitude2)) {
    push({ id: "gratitude1", label: "Dankbarkeit", emoji: "🙏", type: "text", rows: 2, placeholder: "Wofür bist du heute dankbar?" });
    push({ id: "gratitude2", label: "Dankbarkeit (2)", emoji: "🙏", type: "text", rows: 2, placeholder: "Optional" });
  }
  if (used(review => review.data?.allahName)) {
    push({ id: "allahName", label: "Name Allahs", emoji: "☪️", type: "text", rows: 1, placeholder: "Welcher Name begleitet dich heute?" });
  }
  if (used(review => review.data?.fastingCompleted)) {
    push({ id: "fastingCompleted", label: "Fastentag geschafft", emoji: "🌙", type: "toggle" });
  }
  if (used(review => review.data?.ramadanDays !== undefined && Number(review.data.ramadanDays) !== 0)) {
    push({ id: "ramadanDays", label: "Offene Fastentage", emoji: "📆", type: "number", unit: "Tage" });
  }
  if (used(review => review.data?.responsibilityMain || review.data?.responsibilityAdaptation || review.data?.responsibilityNextStep)) {
    push({ id: "responsibilityMain", label: "Wichtigste Verantwortung", emoji: "🎯", type: "text", rows: 2, placeholder: "Optional" });
    push({ id: "responsibilityAdaptation", label: "Anpassung oder Vermeidung", emoji: "↔️", type: "text", rows: 2, placeholder: "Optional" });
    push({ id: "responsibilityNextStep", label: "Nächster verantwortlicher Schritt", emoji: "→", type: "text", rows: 2, placeholder: "Optional" });
  }
  profile.trackers = trackers;

  profile.streaks = LEGACY_STREAKS
    .filter(streak => used(review => review.data?.streaks?.[streak.id]))
    .map((streak, index) => normalizeStreak({ ...streak, order: index }, index, []));

  // Vorhandene Routinen den passenden Rollen zuordnen, soweit eindeutig.
  const routineKeys = Object.keys(routines || {});
  if (routineKeys.length) {
    const muslim = profile.roles.find(role => role.id === "muslim");
    if (muslim) muslim.routineIds = routineKeys.filter(key => key === "morning" || key === "evening");
  }

  profile.modules = {
    checkins: true,
    activities: true,
    routines: routineKeys.length > 0,
    trackers: trackers.length > 0,
    streaks: profile.streaks.length > 0,
    notes: true
  };
  profile.onboardedAt = new Date().toISOString();
  profile.settings.roleRotation = true;
  return normalizeProfile(profile);
}

/* --------------------------------------------------------------------------
   13. Tageseintrag

   Der gespeicherte Tag behält seine bisherigen Felder. Neu hinzu kommen
   trackers und roleId. Altfelder werden beim Laden einmalig in die neue
   Form gespiegelt und danach weiter mitgeschrieben – dadurch bleiben ältere
   Sicherungen und Exporte lesbar.
   -------------------------------------------------------------------------- */

function emptyReview(date, profile, previousData = null) {
  const streaks = {};
  activeStreaks(profile).forEach(streak => {
    const old = previousData?.streaks?.[streak.id];
    const previousDays = old && typeof old === "object" ? Number(old.days || 0) : 0;
    const wasBroken = old && typeof old === "object" ? Boolean(old.broken || old.status === "broken") : false;
    streaks[streak.id] = { days: wasBroken ? 0 : previousDays + 1, broken: false, todayStatus: "" };
  });
  return {
    roleId: rotationRoleId(profile, date),
    activities: [],
    routineProgress: {},
    routineStates: {},
    stateCheckins: [],
    trackers: {},
    streaks,
    notes: "",
    checkinStructure: 5
  };
}

function normalizeActivityEntry(raw, profile, index) {
  const template = (profile?.activityTemplates || []).find(item => item.id === raw?.templateId) || null;
  const title = String(raw?.title || template?.title || "").trim();
  const roleId = findRole(profile, raw?.roleId) ? raw.roleId : (template?.roleId || "");
  const weight = toNumberOrNull(raw?.weight);
  return {
    id: String(raw?.id || uid("act")),
    title,
    roleId,
    templateId: template ? template.id : "",
    weight: weight !== null && weight > 0 ? weight : (template?.weight ?? 1),
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index
  };
}

/* Wert eines Trackers in die für seinen Typ gültige Form bringen. */
function normalizeTrackerValue(tracker, value) {
  if (!tracker) return null;
  switch (tracker.type) {
    case "counter":
    case "number": {
      const numeric = toNumberOrNull(value);
      return numeric === null ? null : numeric;
    }
    case "choice":
      return tracker.options.some(option => option.id === value) ? String(value) : "";
    case "toggle":
      return Boolean(value);
    case "text":
      return String(value ?? "");
    case "checklist": {
      const source = value && typeof value === "object" ? value : {};
      const output = {};
      tracker.items.forEach(item => {
        const stored = source[item.id];
        output[item.id] = tracker.states.some(state => state.id === stored) ? String(stored ?? "") : "";
      });
      return output;
    }
    default:
      return null;
  }
}

function emptyTrackerValue(tracker) {
  switch (tracker.type) {
    case "counter": return 0;
    case "number": return null;
    case "choice": return "";
    case "toggle": return false;
    case "text": return "";
    case "checklist": return Object.fromEntries(tracker.items.map(item => [item.id, ""]));
    default: return null;
  }
}

function trackerHasValue(tracker, value) {
  if (value === null || value === undefined) return false;
  switch (tracker.type) {
    case "counter": return Number(value) > 0;
    case "number": return toNumberOrNull(value) !== null;
    case "choice": return Boolean(value);
    case "toggle": return Boolean(value);
    case "text": return String(value).trim().length > 0;
    case "checklist": return Object.values(value || {}).some(state => state !== "");
    default: return false;
  }
}

/* Spiegelt die festen Felder eines Version-6-Tages in die Trackerwerte.
   Läuft nur, wenn für den Tracker noch nichts Neues gespeichert ist –
   dadurch ist die Migration wiederholbar und überschreibt nie. */
function migrateLegacyTrackerValues(raw, profile, target) {
  const set = (id, value) => {
    const tracker = findTracker(profile, id);
    if (!tracker) return;
    if (target[id] !== undefined) return;
    const normalized = normalizeTrackerValue(tracker, value);
    if (trackerHasValue(tracker, normalized)) target[id] = normalized;
  };
  set("prayers", raw?.prayers);
  set("sunnahPrayers", raw?.sunnahPrayers);
  // Wasser lag als Milliliter beziehungsweise als Literzahl vor.
  const water = toNumberOrNull(raw?.water);
  if (water !== null && water > 0) set("water", water > 50 ? water / 1000 : water);
  set("steps", raw?.steps);
  if (raw?.sleepQualityScore !== "" && raw?.sleepQualityScore !== undefined && raw?.sleepQualityScore !== null) {
    set("sleepQuality", String(raw.sleepQualityScore));
  }
  set("dreamCategory", raw?.dreamCategory);
  set("dreams", raw?.dreams);
  LEGACY_MEAL_KEYS.forEach(key => {
    set(`meal-${key}`, raw?.mealCategories?.[key]);
    set(`mealNote-${key}`, raw?.[key]);
  });
  set("gratitude1", raw?.gratitude1);
  set("gratitude2", raw?.gratitude2);
  set("allahName", raw?.allahName);
  set("fastingCompleted", raw?.fastingCompleted);
  if (raw?.ramadanDays !== undefined && Number(raw.ramadanDays) !== 0) set("ramadanDays", raw.ramadanDays);
  set("responsibilityMain", raw?.responsibilityMain);
  set("responsibilityAdaptation", raw?.responsibilityAdaptation);
  set("responsibilityNextStep", raw?.responsibilityNextStep);
}

/* Ältere Aktivitäten kannten Rollennamen und Vorlagenschlüssel statt
   Kennungen. Beides wird hier aufgelöst, ohne etwas zu erraten. */
function migrateLegacyActivity(raw, profile, index) {
  const templateId = raw?.templateId
    || (raw?.template && raw.template !== "custom" ? raw.template : "")
    || (raw?.isSma ? "sma" : "");
  const template = (profile?.activityTemplates || []).find(item => item.id === templateId) || null;
  const roleId = raw?.roleId && findRole(profile, raw.roleId)
    ? raw.roleId
    : (legacyRoleIdForName(raw?.role) || template?.roleId || "");
  return normalizeActivityEntry({
    id: raw?.id,
    title: raw?.title || template?.title || "",
    roleId,
    templateId: template ? template.id : "",
    weight: raw?.weight,
    order: index
  }, profile, index);
}

function normalizeCheckin(raw, date, index, profile) {
  const time = /^\d{2}:\d{2}$/.test(raw?.time || "") ? raw.time : "12:00";
  const slotCandidate = raw?.slot || legacySlotForTime(time);
  const scales = {};
  orderedScales(profile).forEach(scale => {
    // Version 6 legte die drei Reglerwerte direkt auf den Eintrag.
    const stored = raw?.scales?.[scale.id] !== undefined ? raw.scales[scale.id] : raw?.[scale.id];
    const numeric = toNumberOrNull(stored);
    scales[scale.id] = numeric === null ? null : clamp(numeric, 0, 100);
  });
  const entry = {
    id: String(raw?.id || `state-${date}-${index}`),
    slot: CHECKIN_SLOTS.some(slot => slot.key === slotCandidate) ? slotCandidate : legacySlotForTime(time),
    time,
    scales,
    note: String(raw?.note || ""),
    createdAt: raw?.createdAt || `${date}T${time}:00`
  };
  // Kompatibilität: die drei früheren Felder bleiben gespiegelt bestehen.
  ["energy", "mood", "taqwa"].forEach(key => {
    if (scales[key] !== undefined) entry[key] = scales[key];
    else if (raw?.[key] !== undefined) entry[key] = toNumberOrNull(raw[key]);
  });
  return entry;
}

function normalizeReview(raw, date, profile, options = {}) {
  const hasStored = Boolean(options.hasStored);
  const base = emptyReview(date, profile, options.previousData || null);
  const value = raw && typeof raw === "object" ? raw : {};

  const roleId = findRole(profile, value.roleId)
    ? value.roleId
    : (legacyRoleIdForName(value.role) && findRole(profile, legacyRoleIdForName(value.role))
      ? legacyRoleIdForName(value.role)
      : (hasStored ? "" : base.roleId));

  const activities = (Array.isArray(value.activities) ? value.activities : [])
    .map((item, index) => migrateLegacyActivity(item, profile, index))
    .filter(item => item.title);

  const stateCheckins = (Array.isArray(value.stateCheckins) ? value.stateCheckins : [])
    .map((entry, index) => normalizeCheckin(entry, date, index, profile))
    .sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time));

  const trackers = {};
  const storedTrackers = value.trackers && typeof value.trackers === "object" ? value.trackers : {};
  Object.keys(storedTrackers).forEach(id => {
    const tracker = findTracker(profile, id);
    if (!tracker) return;
    const normalized = normalizeTrackerValue(tracker, storedTrackers[id]);
    if (normalized !== null) trackers[id] = normalized;
  });
  if (hasStored) migrateLegacyTrackerValues(value, profile, trackers);

  const routineProgress = {};
  Object.entries(value.routineProgress && typeof value.routineProgress === "object" ? value.routineProgress : {})
    .forEach(([key, progress]) => { routineProgress[key] = { ...(progress || {}) }; });

  const routineStates = {};
  Object.entries(value.routineStates && typeof value.routineStates === "object" ? value.routineStates : {})
    .forEach(([key, state]) => { routineStates[key] = TASK_STATE_META[state] ? state : ""; });
  // Version 6 kannte genau zwei feste Routinen mit eigenen Feldern.
  const legacyRoutineState = state => {
    const migrated = ["adapted", "adaptedFulfilled", "responsibly-skipped", "angepasst"].includes(state) ? "responsiblySkipped" : state;
    return TASK_STATE_META[migrated] ? migrated : "";
  };
  if (routineStates.morning === undefined) {
    const legacy = legacyRoutineState(value.morningRoutineState || (value.morningRoutine ? "done" : ""));
    if (legacy) routineStates.morning = legacy;
  }
  if (routineStates.evening === undefined) {
    const legacy = legacyRoutineState(value.eveningRoutineState || (value.eveningRoutine ? "done" : ""));
    if (legacy) routineStates.evening = legacy;
  }

  const streaks = {};
  activeStreaks(profile).forEach(streak => {
    const stored = value.streaks?.[streak.id];
    if (stored && typeof stored === "object") {
      const todayStatus = normalizeStreakDailyState(stored.todayStatus);
      const broken = Boolean(stored.broken || stored.status === "broken" || todayStatus === "lapse");
      streaks[streak.id] = { days: Math.max(0, Number(stored.days || 0)), broken, todayStatus: broken ? "lapse" : todayStatus };
    } else {
      streaks[streak.id] = base.streaks[streak.id] || { days: 0, broken: false, todayStatus: "" };
    }
  });

  /* Tagesstruktur: gespeicherte Angabe hat Vorrang. Fehlt sie, gilt ein
     bereits gespeicherter zurückliegender Tag als Vierer-Tag – der Nachmittag
     wird dort nicht rückwirkend als Versäumnis gewertet. */
  const storedStructure = Number(value.checkinStructure);
  let checkinStructure = storedStructure === 4 || storedStructure === 5
    ? storedStructure
    : (hasStored && date < (options.today || todayISO()) ? 4 : 5);
  if (stateCheckins.some(entry => entry.slot === "afternoon")) checkinStructure = 5;

  return {
    ...value,
    roleId,
    activities,
    stateCheckins,
    trackers,
    routineProgress,
    routineStates,
    streaks,
    notes: String(value.notes || ""),
    checkinStructure
  };
}

function activeChronology(data) {
  return Number(data?.checkinStructure) === 4 ? LEGACY_CHECKIN_CHRONOLOGY : CHECKIN_CHRONOLOGY;
}

/* Der erste noch nicht ausgefüllte Check-in in der festen Reihenfolge –
   unabhängig von der Uhrzeit. Sind alle erledigt, gibt es keinen offenen. */
function pendingSlotKey(data) {
  const filled = new Set((data?.stateCheckins || []).map(entry => entry.slot));
  return activeChronology(data).find(key => !filled.has(key)) || null;
}

function latestCheckin(data) {
  const entries = Array.isArray(data?.stateCheckins) ? data.stateCheckins : [];
  return [...entries].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || (a.time || "").localeCompare(b.time || "")).at(-1) || null;
}

function checkinScaleValues(checkin, scales) {
  return scales.map(scale => toNumberOrNull(checkin?.scales?.[scale.id]));
}

function modeForCheckin(checkin, profile) {
  if (!checkin) return null;
  const values = checkinScaleValues(checkin, modeScales(profile));
  const resolved = resolveMode(values);
  if (!resolved) return null;
  const meta = modeMeta(resolved.key) || MODES[0];
  return { ...meta, score: resolved.score, lifted: Boolean(resolved.lifted), capped: Boolean(resolved.capped), values };
}

function dayMode(data, profile) { return modeForCheckin(latestCheckin(data), profile); }

/* Tagesmittel einer Skala über alle Check-ins des Tages. */
function dailyScaleAverage(data, scaleId) {
  return average((data?.stateCheckins || []).map(entry => entry?.scales?.[scaleId]));
}

/* --------------------------------------------------------------------------
   14. Rollenpräsenz

   Die Punkte zeigen, welchen Rollen durch bewusst erfasste Aktivitäten Raum
   gegeben wurde. Sie messen weder Zeitaufwand noch Produktivität oder
   persönlichen Wert.
   -------------------------------------------------------------------------- */

function roundPoints(value) { return Math.round(Number(value || 0) * 100) / 100; }

function formatPoints(value) {
  const rounded = roundPoints(value);
  const text = Number.isInteger(rounded) ? String(rounded) : String(rounded);
  return text.replace(".", ",");
}

/* Punktzeilen eines Tages in Eingabereihenfolge. Mehrere Einträge einer
   tagesbegrenzten Vorlage werden zu genau einer Zeile mit dem Tageswert
   zusammengefasst – dadurch stimmen Einzelwerte und Tagessumme überein. */
function activityPointRows(data, date, profile) {
  const templates = Object.fromEntries((profile?.activityTemplates || []).map(item => [item.id, item]));
  const counts = {};
  (data?.activities || []).forEach(activity => {
    const cap = templates[activity.templateId]?.dailyCap;
    if (cap === null || cap === undefined) return;
    counts[activity.templateId] = (counts[activity.templateId] || 0) + 1;
  });

  const counted = {};
  const rows = [];
  (data?.activities || []).forEach(activity => {
    const template = templates[activity.templateId] || null;
    const cap = template?.dailyCap ?? null;
    if (cap !== null) {
      if (counted[activity.templateId]) return;
      counted[activity.templateId] = true;
      rows.push({ date, title: activity.title, roleId: activity.roleId, points: cap, templateId: activity.templateId, capped: true, entries: counts[activity.templateId] });
      return;
    }
    rows.push({ date, title: activity.title, roleId: activity.roleId, points: Number(activity.weight || 1), templateId: activity.templateId, capped: false, entries: 1 });
  });
  return rows;
}

function dayPointTotal(data, date, profile) {
  return roundPoints(activityPointRows(data, date, profile).reduce((sum, row) => sum + row.points, 0));
}

function rolePresence(entries, profile) {
  const roles = activeRoles(profile);
  const rowsByRole = Object.fromEntries(roles.map(role => [role.id, []]));
  entries.forEach(({ date, data }) => {
    activityPointRows(data, date, profile).forEach(row => {
      if (!rowsByRole[row.roleId]) return;
      rowsByRole[row.roleId].push(row);
    });
  });
  const items = roles.map(role => {
    const rows = [...rowsByRole[role.id]].sort((a, b) => a.date.localeCompare(b.date));
    return {
      roleId: role.id,
      role,
      rows,
      activeDays: new Set(rows.map(row => row.date)).size,
      points: roundPoints(rows.reduce((sum, row) => sum + row.points, 0))
    };
  });
  const total = roundPoints(items.reduce((sum, item) => sum + item.points, 0));
  const activityCount = items.reduce((sum, item) => sum + item.rows.length, 0);
  const represented = items.filter(item => item.points > 0).length;
  const leader = [...items].sort((a, b) => b.points - a.points)[0];
  return { items, total, activityCount, represented, roleCount: roles.length, leader: leader && leader.points > 0 ? leader : null };
}

/* Rollen, die über mehrere Zeiträume hinweg gar nicht vorkamen. */
function invisibleRoles(periods, minimumPeriods = 2) {
  if (periods.length < minimumPeriods) return [];
  const counts = {};
  periods.forEach(period => {
    period.items.forEach(item => {
      if (item.points > 0) counts[item.roleId] = (counts[item.roleId] || 0) + 1;
    });
  });
  const roles = periods[0].items.map(item => item.role);
  return roles.filter(role => !counts[role.id]);
}

/* --------------------------------------------------------------------------
   15. Zeitraum-Auswertung
   Alle Werte entstehen regelbasiert aus den gespeicherten Einträgen. Es wird
   nichts geschätzt, ergänzt oder hochgerechnet.
   -------------------------------------------------------------------------- */

function buildPeriodStats(dates, entries, profile, options = {}) {
  const routineTitles = options.routineTitles || {};
  const stored = entries.filter(entry => entry.stored);
  const scales = orderedScales(profile).map(scale => ({
    scale,
    perDay: dates.map(date => {
      const entry = entries.find(item => item.date === date);
      return entry && entry.stored ? dailyScaleAverage(entry.data, scale.id) : null;
    })
  })).map(item => ({ ...item, average: average(item.perDay) }));

  const checkinCount = stored.reduce((sum, entry) => sum + (entry.data.stateCheckins || []).length, 0);
  const presence = rolePresence(stored.map(entry => ({ date: entry.date, data: entry.data })), profile);

  const routineKeys = [...new Set(stored.flatMap(entry => Object.keys(entry.data.routineStates || {})))];
  const routines = routineKeys.map(key => ({
    key,
    title: routineTitles[key] || key,
    settled: stored.filter(entry => isRoutineSettled(entry.data.routineStates?.[key])).length,
    tracked: stored.filter(entry => entry.data.routineStates?.[key] !== undefined).length
  }));

  const trackers = dayTrackers(profile).map(tracker => {
    const values = stored.map(entry => entry.data.trackers?.[tracker.id]);
    const filled = values.filter(value => trackerHasValue(tracker, value));
    const summary = { tracker, days: filled.length, total: null, average: null, topOption: null, checklistDone: null };
    if (tracker.type === "counter" || tracker.type === "number") {
      const numbers = filled.map(value => Number(value));
      summary.total = numbers.length ? roundPoints(numbers.reduce((sum, value) => sum + value, 0)) : null;
      summary.average = numbers.length ? roundPoints(summary.total / numbers.length) : null;
    }
    if (tracker.type === "choice") {
      const counts = {};
      filled.forEach(value => { counts[value] = (counts[value] || 0) + 1; });
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      summary.topOption = top ? { option: tracker.options.find(option => option.id === top[0]), count: top[1] } : null;
      const scores = filled.map(value => tracker.options.find(option => option.id === value)?.score).filter(score => score !== null && score !== undefined);
      summary.average = scores.length ? average(scores) : null;
    }
    if (tracker.type === "checklist") {
      const totalItems = tracker.items.length;
      const positives = tracker.states.filter(state => state.tone === "positive").map(state => state.id);
      const done = stored.reduce((sum, entry) => {
        const value = entry.data.trackers?.[tracker.id] || {};
        return sum + tracker.items.filter(item => positives.includes(value[item.id])).length;
      }, 0);
      summary.checklistDone = { done, possible: totalItems * stored.length, perDay: totalItems };
    }
    if (tracker.type === "toggle") summary.total = filled.length;
    return summary;
  });

  const streaks = activeStreaks(profile).map(streak => {
    const last = [...stored].reverse().find(entry => entry.data.streaks?.[streak.id]);
    const lapses = stored.filter(entry => entry.data.streaks?.[streak.id]?.todayStatus === "lapse").length;
    return { streak, days: Number(last?.data.streaks?.[streak.id]?.days || 0), lapses, tracked: Boolean(last) };
  });

  return {
    dates,
    entries,
    days: dates.length,
    trackedDays: stored.length,
    checkinCount,
    scales,
    presence,
    routines,
    trackers,
    streaks
  };
}

function trendDelta(current, previous) {
  if (current === null || current === undefined || previous === null || previous === undefined) return null;
  return Math.round(Number(current) - Number(previous));
}

/* --------------------------------------------------------------------------
   16. Verständliche Rückblicke

   Kein Score, keine Erfolgsquote. Die Sätze beschreiben, was tatsächlich
   erfasst wurde, und benennen einen naheliegenden nächsten Schritt.
   -------------------------------------------------------------------------- */

const MIN_DAYS_FOR_INSIGHT = 3;

function periodNoun(kind) {
  return ({ week: "Woche", month: "Monat", year: "Jahr" })[kind] || "Zeitraum";
}

function buildInsights(stats, profile, options = {}) {
  const kind = options.kind || "week";
  const previous = options.previous || null;
  const insights = [];

  if (!stats.trackedDays) {
    return [{ tone: "empty", group: "overview", text: `In dieser ${periodNoun(kind)} ist noch nichts eingetragen. Schon ein einziger Check-in macht den Verlauf sichtbar.` }];
  }

  insights.push({
    tone: "neutral", group: "overview",
    text: `Du hast an ${pluralDE(stats.trackedDays, "Tag", "Tagen")} von ${stats.days} etwas festgehalten${stats.checkinCount ? ` und dabei ${pluralDE(stats.checkinCount, "Check-in", "Check-ins")} gemacht` : ""}.`
  });

  if (stats.trackedDays < MIN_DAYS_FOR_INSIGHT) {
    insights.push({ tone: "hint", group: "overview", text: `Ab etwa ${MIN_DAYS_FOR_INSIGHT} erfassten Tagen werden Zusammenhänge und Entwicklungen erkennbar.` });
  }

  stats.scales.filter(item => item.average !== null).forEach(item => {
    const delta = previous ? trendDelta(item.average, previous.scales.find(entry => entry.scale.id === item.scale.id)?.average) : null;
    const direction = delta === null || Math.abs(delta) < 3
      ? "bleibt damit auf einem ähnlichen Stand wie zuvor"
      : delta > 0 ? `liegt ${delta} Punkte höher als im Zeitraum davor` : `liegt ${Math.abs(delta)} Punkte niedriger als im Zeitraum davor`;
    insights.push({ tone: "neutral", group: "overview", text: `${item.scale.label} liegt im Schnitt bei ${item.average} % und ${direction}.` });
  });

  // Zusammenhang zwischen der ersten und der zweiten Skala.
  const [first, second] = stats.scales;
  if (first?.average !== null && second?.average !== null && first && second) {
    const gap = second.average - first.average;
    if (Math.abs(gap) >= 10) {
      insights.push({
        tone: "pattern", group: "overview",
        text: gap > 0
          ? `${second.scale.label} liegt spürbar über ${first.scale.label} – innerlich trägt dich mehr, als deine Kraft gerade hergibt.`
          : `${first.scale.label} liegt spürbar über ${second.scale.label} – Kraft ist da, die innere Bereitschaft hinkt hinterher.`
      });
    }
  }

  if (stats.presence.roleCount) {
    if (!stats.presence.activityCount) {
      insights.push({ tone: "hint", group: "roles", text: "Es sind noch keine Rollenaktivitäten eingetragen. Eine einzige Aktivität genügt, damit die Rollenpräsenz etwas zeigt." });
    } else {
      insights.push({
        tone: "neutral", group: "roles",
        text: `${pluralDE(stats.presence.activityCount, "Aktivität", "Aktivitäten")} verteilen sich auf ${pluralDE(stats.presence.represented, "Rolle", "Rollen")} von ${stats.presence.roleCount}.`
      });
      if (stats.presence.leader) {
        insights.push({ tone: "neutral", group: "roles", text: `Schwerpunkt war ${stats.presence.leader.role.name} mit ${formatPoints(stats.presence.leader.points)} Präsenzpunkten.` });
      }
      const open = stats.presence.items.filter(item => item.points === 0).map(item => item.role.name);
      if (open.length) {
        insights.push({
          tone: "hint", group: "roles",
          text: open.length === 1
            ? `${open[0]} kommt in diesem Zeitraum nicht vor – eine kleine Aktivität würde genügen.`
            : `Ohne Eintrag: ${joinDE(open)}. Eine einzelne Aktivität reicht, um eine davon aufzunehmen.`
        });
      }
    }
  }

  stats.routines.forEach(item => {
    if (!item.tracked) return;
    insights.push({
      tone: "neutral", group: "habits",
      text: `Die Routine „${item.title}“ hast du an ${pluralDE(item.settled, "Tag", "Tagen")} verantwortungsvoll abgeschlossen.`
    });
  });

  stats.trackers.filter(item => item.days > 0).forEach(item => {
    const tracker = item.tracker;
    if (tracker.type === "counter" || tracker.type === "number") {
      const unit = tracker.unit ? ` ${tracker.unit}` : "";
      insights.push({ tone: "neutral", group: "habits", text: `${tracker.label}: im Schnitt ${formatPoints(item.average)}${unit} an ${pluralDE(item.days, "Tag", "Tagen")}.` });
    }
    if (tracker.type === "choice" && item.topOption?.option) {
      insights.push({ tone: "neutral", group: "habits", text: `${tracker.label}: am häufigsten „${item.topOption.option.label}“ (${pluralDE(item.topOption.count, "Tag", "Tage")}).` });
    }
    if (tracker.type === "toggle") {
      insights.push({ tone: "neutral", group: "habits", text: `${tracker.label}: an ${pluralDE(item.total, "Tag", "Tagen")} erfüllt.` });
    }
    if (tracker.type === "checklist" && item.checklistDone?.possible) {
      insights.push({ tone: "neutral", group: "habits", text: `${tracker.label}: ${item.checklistDone.done} von ${item.checklistDone.possible} Punkten erfasst.` });
    }
  });

  stats.streaks.filter(item => item.tracked).forEach(item => {
    insights.push({
      tone: item.lapses ? "hint" : "neutral", group: "streaks",
      text: item.lapses
        ? `${item.streak.label}: ${pluralDE(item.lapses, "Unterbrechung", "Unterbrechungen")} in diesem Zeitraum, aktuell ${pluralDE(item.days, "Tag", "Tage")}.`
        : `${item.streak.label}: durchgehend gehalten, aktuell ${pluralDE(item.days, "Tag", "Tage")}.`
    });
  });

  return insights;
}

/* Zusammenhang zwischen einer Auswahl-Skala (etwa Schlaf) und einer
   Reglerskala am Folgetag. Nur ab genügend Paaren, sonst keine Aussage. */
const MIN_PAIRS_FOR_PATTERN = 6;

function choiceScalePattern(entries, tracker, scale) {
  if (!tracker || tracker.type !== "choice" || !scale) return null;
  const pairs = [];
  entries.forEach(entry => {
    if (!entry.stored) return;
    const optionId = entry.data.trackers?.[tracker.id];
    const option = tracker.options.find(item => item.id === optionId);
    if (!option || option.score === null) return;
    const value = dailyScaleAverage(entry.data, scale.id);
    if (value === null) return;
    pairs.push({ score: option.score, value });
  });
  if (pairs.length < MIN_PAIRS_FOR_PATTERN) return null;
  const median = [...pairs].map(pair => pair.score).sort((a, b) => a - b)[Math.floor(pairs.length / 2)];
  const good = average(pairs.filter(pair => pair.score >= median).map(pair => pair.value));
  const weak = average(pairs.filter(pair => pair.score < median).map(pair => pair.value));
  if (good === null || weak === null) return null;
  const delta = good - weak;
  if (Math.abs(delta) < 5) return null;
  return {
    tracker, scale, good, weak, delta,
    text: `An Tagen mit besserem Wert bei „${tracker.label}“ liegt ${scale.label} im Schnitt ${Math.abs(delta)} Punkte ${delta > 0 ? "höher" : "niedriger"}.`
  };
}

/* --------------------------------------------------------------------------
   17. Routinen
   Routinen sind eigenständige Nutzerobjekte. Es gibt keine fest eingebauten
   Morgen- und Abendroutinen mehr; vorhandene bleiben unverändert erhalten.
   -------------------------------------------------------------------------- */

const ROUTINE_THEMES = [
  { key: "morning", label: "Sonnenaufgang" },
  { key: "evening", label: "Nachthimmel" },
  { key: "tag", label: "Bergsee am Tag" },
  { key: "daemmerung", label: "Dämmerung" },
  { key: "zuhause", label: "Zuhause" },
  { key: "focus", label: "Ohne Bild" }
];

function normalizeRoutine(raw, key, index) {
  const title = String(raw?.title || "").trim() || `Routine ${index + 1}`;
  return {
    key,
    title,
    description: String(raw?.description || ""),
    theme: ROUTINE_THEMES.some(theme => theme.key === raw?.theme) ? raw.theme : "focus",
    roleId: String(raw?.roleId || ""),
    order: Number.isFinite(Number(raw?.order)) ? Number(raw.order) : index,
    items: (Array.isArray(raw?.items) ? raw.items : []).map((item, itemIndex) => ({
      id: String(item?.id || `${key}-${itemIndex}-${Math.random().toString(36).slice(2, 6)}`),
      emoji: String(item?.emoji || "✨").slice(0, 8),
      title: String(item?.title || "").trim() || `Schritt ${itemIndex + 1}`,
      minutes: clamp(Number(item?.minutes || 5), 1, 180),
      context: String(item?.context || "")
    }))
  };
}

function normalizeRoutines(value) {
  const incoming = value && typeof value === "object" ? value : {};
  const output = {};
  Object.keys(incoming).forEach((key, index) => {
    output[key] = normalizeRoutine(incoming[key], key, index);
  });
  return output;
}

function orderedRoutineKeys(routines) {
  return Object.keys(routines || {}).sort((a, b) =>
    (routines[a]?.order ?? 0) - (routines[b]?.order ?? 0)
    || (routines[a]?.title || a).localeCompare(routines[b]?.title || b, "de"));
}

function routineMinutes(routine) {
  return (routine?.items || []).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}

function routineProgressOf(routine, progressMap = {}) {
  const items = routine?.items || [];
  const done = items.filter(item => progressMap[item.id] === "done").length;
  const resolved = items.filter(item => ["done", "skipped"].includes(progressMap[item.id])).length;
  return { done, resolved, total: items.length };
}

/* --------------------------------------------------------------------------
   18. Export für Node-Tests
   -------------------------------------------------------------------------- */

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    APP_VERSION, PROFILE_SCHEMA,
    clamp, safeParse, escapeHTML, linkifyText, isISODate, average, toNumberOrNull, uid, slugify, uniqueId, pluralDE, joinDE,
    todayISO, dateToISO, dateFromISO, addDays, addMonths, firstOfMonth, lastOfMonth, mondayOf, sundayOf, weekdayOf,
    daysBetween, datesBetween, monthDates, weekDates, WEEKDAY_NAMES, WEEKDAY_SHORT, WEEKDAY_ORDER, humanDuration,
    hexToRgbTriple, hexToRgba, mixHex, relativeLuminance, readableTextColor, ROLE_COLORS, nextRoleColor,
    CHECKIN_SLOTS, CHECKIN_CHRONOLOGY, LEGACY_CHECKIN_CHRONOLOGY, slotIndex, checkinSlot, CYCLE_PHASES, phaseMeta, legacySlotForTime,
    MODE_LADDER, MODES, modeKey, modeMeta, modeIndex, MODE_THRESHOLDS, MODE_RULES, modeWeights, stateScore, modeFromScore, resolveMode,
    MODE_COACH_CORE, MODE_COACH_ADDITION, coachStateCategory, coachImpulse,
    SCALE_MEANING_PRESETS, SCALE_PRESET_KEYS, scaleMeaningStep, scaleMeaning,
    ROUTINE_STATE_ORDER, TASK_STATE_META, isRoutineSettled, STREAK_DAILY_STATES, normalizeStreakDailyState, DEFAULT_CHECKLIST_STATES,
    TRACKER_TYPES, trackerTypeMeta, isScaleTracker,
    MODULE_KEYS, MODULE_META, defaultModules, defaultSettings, defaultScales, emptyProfile,
    normalizeGoal, normalizeRole, normalizeActivityTemplate, normalizeChoiceOption, normalizeChecklistState,
    normalizeTracker, normalizeScale, normalizeStreak, sortByOrder, reindex, normalizeProfile,
    activeRoles, activeStreaks, activeTemplates, enabledTrackers, dayTrackers, orderedScales, modeScales,
    findRole, findTracker, findStreak, rotationRoleId, profileIsEmpty,
    ROLE_SUGGESTIONS, TRACKER_SUGGESTIONS, STREAK_SUGGESTIONS,
    LEGACY_ROLES, LEGACY_ROLE_ALIASES, legacyRoleIdForName, LEGACY_ACTIVITY_TEMPLATES, LEGACY_PRAYERS, LEGACY_SUNNAH_PRAYERS,
    LEGACY_PRAYER_STATES, LEGACY_SUNNAH_STATES, LEGACY_MEAL_KEYS, LEGACY_MEAL_LABELS, LEGACY_MEAL_OPTIONS,
    LEGACY_SLEEP_OPTIONS, LEGACY_DREAM_OPTIONS, LEGACY_STREAKS, buildMigratedProfile,
    emptyReview, normalizeActivityEntry, normalizeTrackerValue, emptyTrackerValue, trackerHasValue,
    migrateLegacyTrackerValues, migrateLegacyActivity, normalizeCheckin, normalizeReview,
    activeChronology, pendingSlotKey, latestCheckin, checkinScaleValues, modeForCheckin, dayMode, dailyScaleAverage,
    roundPoints, formatPoints, activityPointRows, dayPointTotal, rolePresence, invisibleRoles,
    buildPeriodStats, trendDelta, MIN_DAYS_FOR_INSIGHT, periodNoun, buildInsights, MIN_PAIRS_FOR_PATTERN, choiceScalePattern,
    ROUTINE_THEMES, normalizeRoutine, normalizeRoutines, orderedRoutineKeys, routineMinutes, routineProgressOf
  };
}
