/* ==========================================================================
   ROLEPLAY – KERNLOGIK (logic.js)

   Diese Datei enthält ausschließlich reine Berechnungen: keine DOM-Zugriffe,
   kein localStorage, kein Netzwerk. Sie wird im Browser als klassisches
   Skript VOR app.js geladen (die Bezeichner liegen dann im gemeinsamen
   globalen Gültigkeitsbereich) und in Node über module.exports getestet.

   Alles, was hier steht, existiert genau einmal. app.js ruft diese
   Funktionen auf und wiederholt keine Rechenlogik.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Kleine Helfer
   -------------------------------------------------------------------------- */

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function safeParse(text, fallback = null) { try { return JSON.parse(text); } catch { return fallback; } }

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function isISODate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")); }

function average(values) {
  const usable = values.filter(value => value !== null && value !== undefined && Number.isFinite(Number(value)));
  if (!usable.length) return null;
  return Math.round(usable.reduce((sum, value) => sum + Number(value), 0) / usable.length);
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

// Mittag als Uhrzeit vermeidet Sommerzeit-Sprünge beim Rechnen.
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
  // Auf kürzere Monate begrenzen: 31.01. + 1 Monat ergibt den 28./29.02.
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return dateToISO(d);
}

function firstOfMonth(iso) { return `${iso.slice(0, 7)}-01`; }

function lastOfMonth(iso) {
  const d = dateFromISO(iso);
  return dateToISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
}

function firstOfYear(iso) { return `${iso.slice(0, 4)}-01-01`; }
function lastOfYear(iso) { return `${iso.slice(0, 4)}-12-31`; }

// Die Woche läuft immer von Montag bis Sonntag – kein gleitendes Fenster.
function mondayOf(iso) {
  const d = dateFromISO(iso);
  const shift = (d.getDay() + 6) % 7;   // Montag = 0
  d.setDate(d.getDate() - shift);
  return dateToISO(d);
}

function sundayOf(iso) { return addDays(mondayOf(iso), 6); }

// Ganze Tage zwischen zwei Datumsangaben (b - a).
function daysBetween(aISO, bISO) {
  return Math.round((dateFromISO(bISO).getTime() - dateFromISO(aISO).getTime()) / 86400000);
}

function datesBetween(startISO, endISO) {
  const out = [];
  const total = daysBetween(startISO, endISO);
  for (let index = 0; index <= total; index += 1) out.push(addDays(startISO, index));
  return out;
}

/* ISO-8601-Kalenderwoche. Die Woche gehört zu dem Jahr, in dem ihr
   Donnerstag liegt – deshalb ist der Jahreswechsel korrekt abgebildet. */
function isoWeekParts(iso) {
  const monday = dateFromISO(mondayOf(iso));
  const thursday = new Date(monday.getTime());
  thursday.setDate(thursday.getDate() + 3);
  const year = thursday.getFullYear();
  const firstThursday = new Date(year, 0, 4);
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);
  const week = 1 + Math.round((thursday.getTime() - firstThursday.getTime()) / (7 * 86400000));
  return { year, week };
}

function isoWeekKey(iso) {
  const { year, week } = isoWeekParts(iso);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

/* Kalendarische Dauer zwischen zwei Daten in Jahren, Monaten und Tagen.
   Bewusst kalendarisch statt „30 Tage = ein Monat“: Monatslängen und
   Schaltjahre werden dadurch korrekt berücksichtigt. */
function calendarBreakdown(startISO, endISO) {
  if (!isISODate(startISO) || !isISODate(endISO) || endISO < startISO) return { years: 0, months: 0, days: 0 };
  /* Statt mit festen Monatslängen zu rechnen, werden echte Kalendersprünge
     gemacht: erst so viele volle Jahre wie möglich, dann volle Monate, der
     Rest sind Tage. Das ist bei unterschiedlich langen Monaten und in
     Schaltjahren korrekt und kann nie negativ werden. */
  let cursor = startISO;
  let years = 0;
  while (addMonths(cursor, 12) <= endISO) { cursor = addMonths(cursor, 12); years += 1; }
  let months = 0;
  while (months < 12 && addMonths(cursor, 1) <= endISO) { cursor = addMonths(cursor, 1); months += 1; }
  return { years, months, days: daysBetween(cursor, endISO) };
}

function pluralDE(count, one, many) { return `${count} ${count === 1 ? one : many}`; }

function joinDE(parts) {
  if (!parts.length) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} und ${parts.at(-1)}`;
}

/* Verständliche Umrechnung eines Streak-Tagesstands.
   Tage bleiben die primäre Einheit; Wochen, Monate und Jahre sind
   ausschließlich berechnete Anzeigen. */
function streakDuration(dayCount, endISO = todayISO()) {
  const days = Math.max(0, Math.floor(Number(dayCount) || 0));
  const startDate = isISODate(endISO) ? addDays(endISO, -days) : "";
  const weeks = Math.floor(days / 7);
  const breakdown = startDate ? calendarBreakdown(startDate, endISO) : { years: 0, months: 0, days: 0 };

  if (days === 0) {
    return { days, weeks: 0, years: 0, months: 0, restDays: 0, startDate, weekText: "", calendarText: "", text: "Noch kein voller Tag gezählt." };
  }

  const weekText = weeks >= 1 ? pluralDE(weeks, "Woche", "Wochen") : "";
  const calendarParts = [];
  if (breakdown.years) calendarParts.push(pluralDE(breakdown.years, "Jahr", "Jahre"));
  if (breakdown.months) calendarParts.push(pluralDE(breakdown.months, "Monat", "Monate"));
  if (breakdown.days) calendarParts.push(pluralDE(breakdown.days, "Tag", "Tage"));
  const calendarText = joinDE(calendarParts);

  return {
    days, weeks,
    years: breakdown.years, months: breakdown.months, restDays: breakdown.days,
    startDate, weekText, calendarText,
    text: [weekText, calendarText].filter(Boolean).join(" · ")
  };
}

/* --------------------------------------------------------------------------
   3. Rollen, Streaks, Gebete
   -------------------------------------------------------------------------- */

const ROLES = [
  { name: "Ich-Person", emoji: "🫆", color: "#4AA8FF", text: "#174E7A" },
  { name: "Vitalist", emoji: "🧬", color: "#193C8C", text: "#FFFFFF" },
  { name: "Absolvent", emoji: "🎓", color: "#F07A32", text: "#6D2E09" },
  { name: "Unternehmer", emoji: "💰", color: "#F2C94C", text: "#5D4800" },
  { name: "Muslim", emoji: "🕋", color: "#2EC4B6", text: "#075C55" },
  { name: "Wirt", emoji: "🏡", color: "#8E2F45", text: "#FFFFFF" },
  { name: "Familienmensch", emoji: "💌", color: "#72C472", text: "#205B29" }
];

const ROLE_NAMES = ROLES.map(role => role.name);
// Die SMA-Regelarbeit gehört unverändert zu dieser bestehenden Rolle.
const ENTREPRENEUR_ROLE = "Unternehmer";

function getRole(name) {
  const normalized = ["Yannick", "Ich"].includes(name) ? "Ich-Person" : name;
  return ROLES.find(role => role.name === normalized) || ROLES[0];
}

const STREAKS = [
  { key: "cannabisFree", label: "Cannabisfrei" },
  { key: "compulsionFree", label: "Begierde" },
  { key: "alcoholFree", label: "Alkoholfrei" },
  { key: "smokeFree", label: "Rauchfrei" }
];

const PRAYERS = ["Fajr", "Dhuhr", "ʿAsr", "Maghrib", "ʿIschāʾ"];

function prayerWasPerformed(value) { return Boolean(value) && value !== "Nicht gebetet"; }

// Verantwortungsvoll abgeschlossen heißt: durchgeführt ODER bewusst und
// gewissenhaft nicht durchgeführt. Beides zählt gleich.
function isRoutineSettled(state) { return state === "done" || state === "responsiblySkipped"; }

/* --------------------------------------------------------------------------
   4. ROLEPLAY-Bilanz (vereinfacht)
   -------------------------------------------------------------------------- */

const BALANCE_OUTCOMES = ["fulfilled", "adapted", "deferred", "missed", "overextended"];
const ROLE_REFLECTION_ORDER = ["", ...BALANCE_OUTCOMES];
const ROLE_REFLECTION_META = {
  "": { label: "Nicht reflektiert", short: "Offen", icon: "○" },
  fulfilled: { label: "Verantwortungsvoll erfüllt", short: "Erfüllt", icon: "✓" },
  adapted: { label: "Verantwortungsvoll angepasst", short: "Angepasst", icon: "≈" },
  deferred: { label: "Verantwortungsvoll zurückgestellt", short: "Zurückgestellt", icon: "↷" },
  missed: { label: "Nicht angemessen beantwortet", short: "Versäumt", icon: "×" },
  overextended: { label: "Rolle überdehnt", short: "Überdehnt", icon: "!" }
};

function balanceOutcomeShort(value) { return ROLE_REFLECTION_META[value]?.short || ""; }

/* --------------------------------------------------------------------------
   5. Aktivitäten: Größe und Unternehmer-Kontext
   -------------------------------------------------------------------------- */

/* Die Beitragspunkte dienen ausschließlich der Rollenübersicht. Aus ihnen
   entsteht ausdrücklich kein Leistungsscore und keine Erfolgsquote. */
const ACTIVITY_SIZES = [
  { key: "small", label: "Klein", points: 1 },
  { key: "medium", label: "Mittel", points: 2 },
  { key: "large", label: "Groß", points: 3 }
];
const DEFAULT_ACTIVITY_SIZE = "medium";

function activitySizeMeta(value) {
  return ACTIVITY_SIZES.find(size => size.key === value) || ACTIVITY_SIZES.find(size => size.key === DEFAULT_ACTIVITY_SIZE);
}

function activitySizePoints(value) { return activitySizeMeta(value).points; }

/* Kontext nur für Unternehmer-Aktivitäten. "none" ist der neutrale
   Standardwert – Altdaten bekommen ihn und werden NIE anhand des Titels
   als SMA-Arbeit gedeutet. */
const ACTIVITY_CONTEXTS = [
  { key: "sma", label: "SMA-Regelarbeit", roleOnly: ENTREPRENEUR_ROLE },
  { key: "own", label: "Eigene Entwicklung", roleOnly: ENTREPRENEUR_ROLE },
  { key: "other", label: "Sonstiger Beitrag", roleOnly: ENTREPRENEUR_ROLE },
  { key: "none", label: "Ohne Kontext", roleOnly: null }
];
const DEFAULT_ACTIVITY_CONTEXT = "none";

function normalizeActivityContext(value, roleName) {
  if (getRole(roleName).name !== ENTREPRENEUR_ROLE) return DEFAULT_ACTIVITY_CONTEXT;
  return ["sma", "own", "other"].includes(value) ? value : DEFAULT_ACTIVITY_CONTEXT;
}

function normalizeActivitySize(value) {
  return ACTIVITY_SIZES.some(size => size.key === value) ? value : DEFAULT_ACTIVITY_SIZE;
}

/* Migration einer einzelnen Aktivität. Bestehende Einträge bleiben
   vollständig erhalten und bekommen Mittel + neutralen Kontext. */
function normalizeActivity(raw) {
  const role = getRole(raw?.role || "Ich-Person").name;
  return {
    title: String(raw?.title || ""),
    role,
    size: normalizeActivitySize(raw?.size),
    context: normalizeActivityContext(raw?.context, role)
  };
}

function isSmaActivity(activity) {
  return activity?.role === ENTREPRENEUR_ROLE && activity?.context === "sma";
}

/* --------------------------------------------------------------------------
   6. Fasten
   -------------------------------------------------------------------------- */

const FASTING_TYPES = [
  { key: "", label: "Nicht erfasst", short: "–" },
  { key: "catchUp", label: "Nachholtag (Ramadan)", short: "Nachholen" },
  { key: "voluntary", label: "Freiwilliges Fasten", short: "Freiwillig" },
  { key: "ramadan", label: "Fasten im Ramadan", short: "Ramadan" },
  // Nur für Altdaten: abgeschlossener Fastentag ohne sicher bekannte Art.
  { key: "legacy", label: "Älterer Fasteneintrag ohne Zuordnung", short: "Ohne Zuordnung" }
];

const FASTING_SELECTABLE = ["", "catchUp", "voluntary", "ramadan"];

function normalizeFastingType(value) {
  return FASTING_TYPES.some(type => type.key === value) ? String(value || "") : "";
}

/* Fastenangabe eines Tages. Ältere Tage mit fastingCompleted bekommen
   ausdrücklich "legacy" und werden dadurch nicht willkürlich als
   freiwillig, Ramadan oder Nachholfasten klassifiziert. */
function normalizeFasting(raw) {
  const stored = normalizeFastingType(raw?.fasting?.type);
  if (stored) return { type: stored };
  if (raw?.fastingCompleted) return { type: "legacy" };
  return { type: "" };
}

/* --------------------------------------------------------------------------
   7. Lokale Einstellungen
   -------------------------------------------------------------------------- */

function defaultSettings() {
  return {
    // Geplante SMA-Arbeitstage pro Woche, später in der Auswertung änderbar.
    smaPlannedDaysPerWeek: 5,
    // Grundstand offener Nachholtage. Der sichtbare Stand wird daraus
    // abgeleitet, nie fortgeschrieben – dadurch ist er idempotent.
    fastingCatchUpBaseline: 0,
    fastingCatchUpWeeklyGoal: 1,
    // 0 = kein Wochenziel; freiwilliges Fasten wird dann nicht bewertet.
    fastingVoluntaryWeeklyGoal: 0,
    fastingMigrated: false,
    weekFocus: {},
    aiExport: { rangeDays: 30, includeNotes: false, includeGratitude: false, includeDreams: false }
  };
}

function normalizeWeekFocusEntry(raw) {
  const primary = ROLE_NAMES.includes(raw?.primary) ? raw.primary : "";
  let secondary = ROLE_NAMES.includes(raw?.secondary) ? raw.secondary : "";
  if (secondary && secondary === primary) secondary = "";
  return { primary, secondary };
}

function normalizeSettings(raw) {
  const base = defaultSettings();
  const value = raw && typeof raw === "object" ? raw : {};
  const planned = Number(value.smaPlannedDaysPerWeek);
  base.smaPlannedDaysPerWeek = Number.isFinite(planned) ? clamp(Math.round(planned), 0, 7) : 5;

  const baseline = Number(value.fastingCatchUpBaseline);
  base.fastingCatchUpBaseline = Number.isFinite(baseline) ? Math.max(0, Math.round(baseline)) : 0;

  const catchGoal = Number(value.fastingCatchUpWeeklyGoal);
  base.fastingCatchUpWeeklyGoal = Number.isFinite(catchGoal) ? clamp(Math.round(catchGoal), 0, 7) : 1;

  const volGoal = Number(value.fastingVoluntaryWeeklyGoal);
  base.fastingVoluntaryWeeklyGoal = Number.isFinite(volGoal) ? clamp(Math.round(volGoal), 0, 7) : 0;

  base.fastingMigrated = Boolean(value.fastingMigrated);

  base.weekFocus = {};
  Object.entries(value.weekFocus && typeof value.weekFocus === "object" ? value.weekFocus : {})
    .forEach(([key, entry]) => {
      if (!/^\d{4}-W\d{2}$/.test(key)) return;
      const normalized = normalizeWeekFocusEntry(entry);
      if (normalized.primary || normalized.secondary) base.weekFocus[key] = normalized;
    });

  const ai = value.aiExport && typeof value.aiExport === "object" ? value.aiExport : {};
  base.aiExport = {
    rangeDays: Number(ai.rangeDays) === 90 ? 90 : 30,
    // Freitext ist immer ausdrücklich abzuwählen – Standard ist aus.
    includeNotes: ai.includeNotes === true,
    includeGratitude: ai.includeGratitude === true,
    includeDreams: ai.includeDreams === true
  };
  return base;
}

function weekFocusFor(settings, iso) {
  return normalizeWeekFocusEntry(settings?.weekFocus?.[isoWeekKey(iso)]);
}

/* --------------------------------------------------------------------------
   8. SMA-Arbeitstage und Normalisierung
   -------------------------------------------------------------------------- */

/* Ein Tag zählt als SMA-Arbeitstag, wenn er ausdrücklich markiert ist ODER
   mindestens eine Unternehmer-Aktivität mit SMA-Kontext trägt. Mehrere
   solcher Aktivitäten an einem Tag ergeben trotzdem genau einen Arbeitstag. */
function isSmaWorkday(data) {
  if (data?.smaWorkday === true) return true;
  return (data?.activities || []).some(isSmaActivity);
}

function countSmaActivities(data) {
  return (data?.activities || []).filter(isSmaActivity).length;
}

/* Normalisierter SMA-Wochenbeitrag:
       erfasste Arbeitstage / geplante Arbeitstage, gedeckelt bei 1,0
   Fünf von fünf Arbeitstagen ergeben genau EINEN vollständigen Grundbeitrag
   zur Rolle Unternehmer – nicht fünf unabhängige Rollenbeiträge. */
function smaWeekContribution(actualDays, plannedDays) {
  const actual = Math.max(0, Number(actualDays) || 0);
  const planned = Math.max(0, Number(plannedDays) || 0);
  // Kein Teilen durch null: ohne geplante Tage zählt vorhandene Arbeit voll.
  if (planned === 0) return actual > 0 ? 1 : 0;
  return Math.min(1, actual / planned);
}

/* --------------------------------------------------------------------------
   9. Rollenkompass
   -------------------------------------------------------------------------- */

/* Bewusster Rollenbeitrag aus Aktivitäten. SMA-Regelarbeit bleibt hier
   ausdrücklich außen vor: sie wird separat normalisiert, damit fehlende
   eigene Entwicklung in der Rolle Unternehmer sichtbar bleibt. */
function consciousRolePoints(entries) {
  const points = Object.fromEntries(ROLE_NAMES.map(name => [name, 0]));
  const counts = Object.fromEntries(ROLE_NAMES.map(name => [name, 0]));
  entries.forEach(({ data }) => {
    (data?.activities || []).forEach(activity => {
      if (!ROLE_NAMES.includes(activity.role)) return;
      if (isSmaActivity(activity)) return;
      points[activity.role] += activitySizePoints(activity.size);
      counts[activity.role] += 1;
    });
  });
  return { points, counts };
}

/* --------------------------------------------------------------------------
   10. Zeitraum bilden und aggregieren
   -------------------------------------------------------------------------- */

const PERIOD_KINDS = ["week", "month", "year"];

function periodRange(kind, anchorISO) {
  if (kind === "month") return { kind, start: firstOfMonth(anchorISO), end: lastOfMonth(anchorISO) };
  if (kind === "year") return { kind, start: firstOfYear(anchorISO), end: lastOfYear(anchorISO) };
  return { kind: "week", start: mondayOf(anchorISO), end: sundayOf(anchorISO) };
}

function shiftPeriod(kind, anchorISO, delta) {
  if (kind === "month") return firstOfMonth(addMonths(firstOfMonth(anchorISO), delta));
  if (kind === "year") return `${Number(anchorISO.slice(0, 4)) + delta}-01-01`;
  return addDays(mondayOf(anchorISO), delta * 7);
}

function periodLabel(kind, anchorISO) {
  const range = periodRange(kind, anchorISO);
  if (kind === "year") return anchorISO.slice(0, 4);
  if (kind === "month") {
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    return `${months[Number(anchorISO.slice(5, 7)) - 1]} ${anchorISO.slice(0, 4)}`;
  }
  return `KW ${isoWeekParts(range.start).week} · ${range.start.slice(8, 10)}.${range.start.slice(5, 7)}. – ${range.end.slice(8, 10)}.${range.end.slice(5, 7)}.`;
}

/* Zerlegt einen Zeitraum in vollständige ISO-Kalenderwochen. Eine Woche
   gilt nur als abgeschlossen, wenn ihr Sonntag vorbei ist – die laufende
   Woche darf nicht vorschnell als Versäumnis bewertet werden. */
function weeksInRange(range, today = todayISO()) {
  const weeks = [];
  let cursor = mondayOf(range.start);
  const last = mondayOf(range.end);
  while (cursor <= last) {
    const end = addDays(cursor, 6);
    weeks.push({ key: isoWeekKey(cursor), start: cursor, end, completed: end < today });
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

/* Tages-Mittelwerte. Leere oder zukünftige Tage erzeugen null, niemals 0 –
   damit entstehen keine erfundenen Nullwerte. */
function dailyAverageEnergy(data) {
  return average((data?.stateCheckins || []).map(entry => entry.energy));
}

function dailyAverageMood(data) {
  return average((data?.stateCheckins || []).map(entry => entry.mood));
}

function dailyPrayerCount(data) {
  return PRAYERS.filter(prayer => prayerWasPerformed(data?.prayers?.[prayer])).length;
}

/* Hauptaggregation eines Zeitraums.
   entries: [{ date, stored, data }] – ausschließlich real vorhandene Tage
   tragen zur Datenbasis bei. */
function buildPeriodStats(range, entries, options = {}) {
  const today = options.today || todayISO();
  const settings = normalizeSettings(options.settings);
  const list = entries.filter(entry => entry.date >= range.start && entry.date <= range.end);
  const elapsed = list.filter(entry => entry.date <= today);
  const stored = elapsed.filter(entry => entry.stored);

  const energySeries = elapsed.map(entry => entry.stored ? dailyAverageEnergy(entry.data) : null);
  const moodSeries = elapsed.map(entry => entry.stored ? dailyAverageMood(entry.data) : null);
  const prayerSeries = elapsed.map(entry => entry.stored ? dailyPrayerCount(entry.data) : null);

  const coverage = {
    elapsedDays: elapsed.length,
    storedDays: stored.length,
    energyDays: energySeries.filter(value => value !== null).length,
    moodDays: moodSeries.filter(value => value !== null).length,
    checkins: stored.reduce((sum, entry) => sum + (entry.data?.stateCheckins?.length || 0), 0),
    prayerDays: prayerSeries.filter(value => value !== null).length,
    routineDays: stored.filter(entry => entry.data?.morningRoutineState || entry.data?.eveningRoutineState).length,
    balanceDays: stored.filter(entry => entry.data?.roleplayBalance?.outcome).length,
    activityDays: stored.filter(entry => (entry.data?.activities || []).length).length
  };

  // Rollen
  const { points, counts } = consciousRolePoints(stored);

  // SMA je Kalenderwoche innerhalb des Zeitraums
  const weeks = weeksInRange(range, today).map(week => {
    const weekEntries = stored.filter(entry => entry.date >= week.start && entry.date <= week.end);
    const actual = weekEntries.filter(entry => isSmaWorkday(entry.data)).length;
    const focus = normalizeWeekFocusEntry(settings.weekFocus?.[week.key]);
    const rolesPresent = new Set();
    weekEntries.forEach(entry => (entry.data?.activities || []).forEach(activity => {
      if (isSmaActivity(activity)) return;
      if (ROLE_NAMES.includes(activity.role)) rolesPresent.add(activity.role);
    }));
    return {
      ...week,
      focus,
      smaActualDays: actual,
      smaPlannedDays: settings.smaPlannedDaysPerWeek,
      smaContribution: smaWeekContribution(actual, settings.smaPlannedDaysPerWeek),
      rolesWithContribution: [...rolesPresent]
    };
  });

  const smaWorkdays = stored.filter(entry => isSmaWorkday(entry.data)).length;
  const smaActivities = stored.reduce((sum, entry) => sum + countSmaActivities(entry.data), 0);
  const smaContributionSum = weeks.reduce((sum, week) => sum + week.smaContribution, 0);

  const roles = ROLE_NAMES.map(name => {
    const conscious = points[name];
    const smaShare = name === ENTREPRENEUR_ROLE ? smaContributionSum : 0;
    return {
      name,
      conscious,
      activityCount: counts[name],
      smaContribution: smaShare,
      total: conscious + smaShare,
      hasConscious: conscious > 0
    };
  });

  // Fasten
  const fasting = { catchUp: 0, voluntary: 0, ramadan: 0, legacy: 0 };
  stored.forEach(entry => {
    const type = normalizeFasting(entry.data).type;
    if (type && fasting[type] !== undefined) fasting[type] += 1;
  });

  // Gebete und Routinen
  const prayersPerformed = prayerSeries.filter(value => value !== null).reduce((sum, value) => sum + value, 0);
  const prayersPossible = coverage.prayerDays * PRAYERS.length;
  const routineDone = stored.reduce((sum, entry) => sum +
    (isRoutineSettled(entry.data?.morningRoutineState) ? 1 : 0) +
    (isRoutineSettled(entry.data?.eveningRoutineState) ? 1 : 0), 0);

  // Bilanz
  const balance = Object.fromEntries(BALANCE_OUTCOMES.map(key => [key, 0]));
  stored.forEach(entry => {
    const outcome = entry.data?.roleplayBalance?.outcome;
    if (BALANCE_OUTCOMES.includes(outcome)) balance[outcome] += 1;
  });

  // Streaks: der letzte gespeicherte Tag des Zeitraums ist maßgeblich.
  const lastStored = stored.at(-1) || null;
  const streaks = STREAKS.map(streak => ({
    key: streak.key,
    label: streak.label,
    days: Math.max(0, Number(lastStored?.data?.streaks?.[streak.key]?.days || 0)),
    broken: Boolean(lastStored?.data?.streaks?.[streak.key]?.broken),
    referenceDate: lastStored?.date || ""
  }));

  return {
    range,
    settings,
    today,
    dates: elapsed.map(entry => entry.date),
    energySeries, moodSeries, prayerSeries,
    energyAverage: average(energySeries),
    moodAverage: average(moodSeries),
    coverage,
    roles,
    weeks,
    sma: {
      workdays: smaWorkdays,
      activities: smaActivities,
      plannedPerWeek: settings.smaPlannedDaysPerWeek,
      contributionSum: smaContributionSum
    },
    fasting,
    prayers: { performed: prayersPerformed, possible: prayersPossible },
    routines: { settled: routineDone, possible: coverage.storedDays * 2 },
    balance,
    streaks,
    lastStoredDate: lastStored?.date || ""
  };
}

/* --------------------------------------------------------------------------
   11. Rollen: unsichtbare Rollen und Fokusvorschlag
   -------------------------------------------------------------------------- */

/* Eine Rolle gilt als unsichtbar, wenn sie über die letzten n ABGESCHLOSSENEN
   Wochen keinen dokumentierten bewussten Beitrag erhalten hat. Die laufende
   Woche zählt bewusst nicht mit. */
function invisibleRoles(weeks, minimumWeeks = 2) {
  const completed = weeks.filter(week => week.completed);
  if (completed.length < minimumWeeks) return [];
  const recentWeeks = completed.slice(-Math.max(minimumWeeks, 1));
  return ROLE_NAMES.filter(name => recentWeeks.every(week => !week.rolesWithContribution.includes(name)))
    .map(name => ({ name, weeks: recentWeeks.length }));
}

/* Lokaler Vorschlag für den Wochenfokus. Er wird niemals ungefragt
   gespeichert – die endgültige Entscheidung trifft der Nutzer. */
function suggestFocusRoles(weeks, limit = 2) {
  const completed = weeks.filter(week => week.completed);
  const scored = ROLE_NAMES.map(name => {
    let sinceContribution = 0;
    for (let index = completed.length - 1; index >= 0; index -= 1) {
      if (completed[index].rolesWithContribution.includes(name)) break;
      sinceContribution += 1;
    }
    const focusCount = completed.filter(week => week.focus.primary === name || week.focus.secondary === name).length;
    return { name, sinceContribution, focusCount };
  });
  return scored
    .sort((a, b) => b.sinceContribution - a.sinceContribution || a.focusCount - b.focusCount || ROLE_NAMES.indexOf(a.name) - ROLE_NAMES.indexOf(b.name))
    .filter(item => item.sinceContribution > 0)
    .slice(0, limit);
}

/* --------------------------------------------------------------------------
   12. Zusammenhänge
   Ausschließlich beschreibend. Es wird nie eine Ursache behauptet.
   -------------------------------------------------------------------------- */

const MIN_PAIRS_FOR_PATTERN = 6;

/* Vergleicht die Energie am Tag nach besser bzw. schlechter bewerteten
   Nächten. sleepQualityScore: 0 = sehr erholsam … 6 = kein Schlaf. */
function sleepEnergyPattern(entries) {
  const pairs = [];
  entries.forEach((entry, index) => {
    if (!entry.stored) return;
    const night = (entry.data?.stateCheckins || []).find(item => item.slot === "night");
    const sleep = night?.sleepQualityScore;
    if (sleep === "" || sleep === undefined || sleep === null) return;
    const energy = dailyAverageEnergy(entry.data);
    if (energy === null) return;
    pairs.push({ sleep: Number(sleep), energy });
    void index;
  });
  if (pairs.length < MIN_PAIRS_FOR_PATTERN) return null;
  const good = pairs.filter(pair => pair.sleep <= 2).map(pair => pair.energy);
  const poor = pairs.filter(pair => pair.sleep >= 4).map(pair => pair.energy);
  if (good.length < 2 || poor.length < 2) return null;
  const goodAvg = average(good);
  const poorAvg = average(poor);
  return { pairs: pairs.length, goodAvg, poorAvg, difference: goodAvg - poorAvg };
}

/* --------------------------------------------------------------------------
   13. Report – „Stimme aus dem Off“

   Sprachlich wird immer getrennt zwischen dokumentierter Tatsache,
   möglichem Muster, vorsichtiger Interpretation und Handlungsvorschlag.
   Es entsteht keine Punktzahl für Wohlbefinden, Religiosität oder Wert.
   -------------------------------------------------------------------------- */

const MIN_DAYS_FOR_REPORT = 5;

function periodNoun(kind) {
  return kind === "year" ? "dieses Jahr" : kind === "month" ? "dieser Monat" : "diese Woche";
}

function periodNounAcc(kind) {
  return kind === "year" ? "das Jahr" : kind === "month" ? "den Monat" : "die Woche";
}

function buildReport(stats, entries = []) {
  const kind = stats.range.kind;
  const coverage = stats.coverage;
  const facts = [];
  const developments = [];
  const compass = [];
  const connections = [];
  const dataBasis = [];

  dataBasis.push(`Tage mit Eintrag: ${coverage.storedDays} von ${coverage.elapsedDays}`);
  dataBasis.push(`Energie erfasst an ${coverage.energyDays} von ${coverage.elapsedDays} Tagen`);
  dataBasis.push(`Laune erfasst an ${coverage.moodDays} von ${coverage.elapsedDays} Tagen`);
  dataBasis.push(`Check-ins insgesamt: ${coverage.checkins}`);
  dataBasis.push(`Pflichtgebete dokumentiert an ${coverage.prayerDays} von ${coverage.elapsedDays} Tagen`);

  const insufficient = coverage.storedDays < MIN_DAYS_FOR_REPORT;
  if (insufficient) {
    return {
      insufficient: true,
      situation: [`Für ${periodNounAcc(kind)} liegen ${coverage.storedDays} Tage mit Eintrag vor.`,
        "Für eine belastbare Entwicklung fehlen noch genügend Einträge."],
      developments: [], compass: [], connections: [], nextStep: "", dataBasis
    };
  }

  /* 1. Periodenlage – ausschließlich dokumentierte Tatsachen. */
  facts.push(`${coverage.storedDays} von ${coverage.elapsedDays} vergangenen Tagen sind dokumentiert.`);
  if (stats.energyAverage !== null) {
    facts.push(`Deine durchschnittliche Energie lag bei ${stats.energyAverage} %, deine Laune bei ${stats.moodAverage} %.`);
  }
  if (stats.sma.workdays > 0) {
    facts.push(`SMA-Arbeitstage: ${stats.sma.workdays} bei ${stats.sma.plannedPerWeek} geplanten Tagen pro Woche.`);
  }

  /* 2. Höchstens drei relevante Entwicklungen. */
  const invisible = invisibleRoles(stats.weeks, 2);
  invisible.slice(0, 2).forEach(item => {
    developments.push(`Die Rolle ${item.name} blieb ${item.weeks} abgeschlossene Wochen ohne dokumentierten Beitrag. Das fällt inzwischen auf.`);
  });

  const entrepreneur = stats.roles.find(role => role.name === ENTREPRENEUR_ROLE);
  if (entrepreneur && stats.sma.workdays >= 3 && entrepreneur.conscious === 0) {
    developments.push(`Unternehmer band einen großen Teil deiner realen Zeit. Durch die SMA-Normalisierung bleibt sichtbar, dass eigene Entwicklung in diesem Zeitraum nicht dokumentiert ist.`);
  }

  // Energieentwicklung: erste gegen zweite Hälfte, nur bei ausreichender Basis.
  const energyValues = stats.energySeries;
  const half = Math.floor(energyValues.length / 2);
  const firstHalf = average(energyValues.slice(0, half));
  const secondHalf = average(energyValues.slice(half));
  const firstCount = energyValues.slice(0, half).filter(value => value !== null).length;
  const secondCount = energyValues.slice(half).filter(value => value !== null).length;
  if (firstHalf !== null && secondHalf !== null && firstCount >= 3 && secondCount >= 3 && Math.abs(secondHalf - firstHalf) >= 8) {
    developments.push(secondHalf < firstHalf
      ? `Deine durchschnittliche Energie lag in der zweiten Hälfte niedriger als zu Beginn (${secondHalf} % gegenüber ${firstHalf} %). Das ist mehr als ein einzelner schwacher Tag.`
      : `Deine durchschnittliche Energie lag in der zweiten Hälfte höher als zu Beginn (${secondHalf} % gegenüber ${firstHalf} %).`);
  }

  /* 3. Rollenkompass. */
  const focusWeeks = stats.weeks.filter(week => week.focus.primary);
  focusWeeks.forEach(week => {
    const primaryPresent = week.rolesWithContribution.includes(week.focus.primary);
    compass.push(`${week.key}: Hauptfokus ${week.focus.primary} – ${primaryPresent ? "bewusst vertreten" : "kein dokumentierter bewusster Beitrag"}.`);
    if (week.focus.secondary) {
      const secondaryPresent = week.rolesWithContribution.includes(week.focus.secondary);
      compass.push(`${week.key}: Zweitfokus ${week.focus.secondary} – ${secondaryPresent ? "bewusst vertreten" : "kein dokumentierter bewusster Beitrag"}.`);
    }
  });
  if (!focusWeeks.length) compass.push("Für diesen Zeitraum ist kein Wochenfokus gesetzt.");

  const loadLeader = [...stats.roles].sort((a, b) => b.total - a.total)[0];
  if (loadLeader && loadLeader.total > 0) {
    compass.push(`Am meisten dokumentierten Rollenbeitrag trägt derzeit ${loadLeader.name}.`);
  }
  if (stats.sma.workdays > 0) {
    compass.push(`Reale Belastung und bewusste Priorität sind getrennt ausgewiesen: ${stats.sma.workdays} SMA-Arbeitstage und ${stats.sma.activities} dokumentierte SMA-Aktivitäten stehen einem normalisierten Grundbeitrag von ${stats.sma.contributionSum.toFixed(2).replace(".", ",")} gegenüber.`);
  }

  /* 4. Mögliche Zusammenhänge – klar als Zusammenhang, nie als Ursache. */
  const sleep = sleepEnergyPattern(entries);
  if (sleep && Math.abs(sleep.difference) >= 6) {
    connections.push(sleep.difference > 0
      ? `An Tagen nach besser bewerteten Nächten lag deine Energie häufiger höher (${sleep.goodAvg} % gegenüber ${sleep.poorAvg} %). Die Daten zeigen einen Zusammenhang, aber keine gesicherte Ursache.`
      : `An Tagen nach schlechter bewerteten Nächten lag deine Energie in diesem Zeitraum nicht niedriger. Die Daten zeigen keinen einfachen Zusammenhang.`);
  } else if (coverage.energyDays < MIN_PAIRS_FOR_PATTERN) {
    connections.push("Für eine Aussage über Zusammenhänge zwischen Schlaf und Energie fehlen noch genügend Einträge.");
  }

  const missedCount = stats.balance.missed + stats.balance.overextended;
  if (coverage.balanceDays >= MIN_PAIRS_FOR_PATTERN && missedCount > 0) {
    connections.push(`An ${missedCount} von ${coverage.balanceDays} reflektierten Tagen war deine wichtigste Verantwortung als „Versäumt“ oder „Überdehnt“ eingeordnet. Das beschreibt deine eigene Einschätzung, keine Bewertung von außen.`);
  }

  /* 5. Genau ein nächster verantwortlicher Schritt. */
  let nextStep;
  if (invisible.length) {
    nextStep = `Schütze kommende Woche einen klaren 30-Minuten-Block für die Rolle ${invisible[0].name}.`;
  } else if (entrepreneur && stats.sma.workdays >= 3 && entrepreneur.conscious === 0) {
    nextStep = "Setze kommende Woche einen festen Termin für eigene Entwicklung außerhalb der SMA-Regelarbeit.";
  } else if (!focusWeeks.length) {
    nextStep = "Setze für die kommende Woche eine Hauptfokusrolle, damit die Auswertung sie prüfen kann.";
  } else if (stats.energyAverage !== null && stats.energyAverage < 50) {
    nextStep = "Plane kommende Woche einen ruhigen Tag bewusst ein, statt ihn später als Ausfall hinzunehmen.";
  } else {
    nextStep = `Halte kommende Woche einen geschützten Block für deine Hauptfokusrolle frei.`;
  }

  return {
    insufficient: false,
    situation: facts,
    developments: developments.slice(0, 3),
    compass,
    connections,
    nextStep,
    dataBasis
  };
}

/* --------------------------------------------------------------------------
   14. KI-Export
   Kein API-Zugriff, kein Schlüssel, kein automatischer Versand. Es entsteht
   ausschließlich eine Datei bzw. ein Text, den der Nutzer selbst weitergibt.
   -------------------------------------------------------------------------- */

const AI_ANALYSIS_PROMPT = [
  "Analyseauftrag für ChatGPT oder Claude:",
  "",
  "Du erhältst strukturierte Selbstbeobachtungsdaten einer einzelnen Person aus einer lokalen App.",
  "Halte dich strikt an folgende Regeln:",
  "1. Trenne klar zwischen dokumentierter Tatsache, möglichem Muster und vorsichtiger Interpretation.",
  "2. Stelle keine medizinischen oder psychologischen Diagnosen.",
  "3. Erfinde keine Kausalität. Zusammenhänge sind Zusammenhänge, keine Ursachen.",
  "4. Berücksichtige Datenlücken ausdrücklich und benenne sie, statt sie zu überspielen.",
  "5. Priorisiere Entwicklungen über mehrere Wochen gegenüber einzelnen Tagen.",
  "6. Nenne höchstens drei wesentliche Erkenntnisse.",
  "7. Formuliere genau eine konkrete Handlungsempfehlung für die kommende Woche.",
  "8. Schreibe direkt, respektvoll und ausdrücklich nicht beschämend.",
  "",
  "Hinweis zur Rolle Unternehmer: Die wiederkehrende Arbeit bei SMA gehört zu dieser Rolle,",
  "wird aber auf einen Wochenbeitrag normalisiert. Bewerte sie deshalb nicht wie fünf",
  "unabhängige Rollenbeiträge und übersehe nicht, ob eigene Entwicklung stattgefunden hat."
].join("\n");

function aiExportFieldSummary(options) {
  const included = ["Datum", "Energie", "Laune", "Check-in-Anzahl", "Pflichtgebete", "Routinen",
    "Aktivitäten (Rolle, Größe, Kontext)", "SMA-Arbeitstag", "Fastenart", "Streak-Tagesstände",
    "vereinfachte ROLEPLAY-Bilanz", "Wochenfokus"];
  if (options.includeNotes) included.push("Tagesnotizen (Freitext)");
  if (options.includeGratitude) included.push("Dankbarkeitstexte (Freitext)");
  if (options.includeDreams) included.push("Traumtexte (Freitext)");
  const excluded = [];
  if (!options.includeNotes) excluded.push("Tagesnotizen");
  if (!options.includeGratitude) excluded.push("Dankbarkeitstexte");
  if (!options.includeDreams) excluded.push("Traumtexte");
  return { included, excluded };
}

/* Baut die Exportstruktur. Freitext ist ausschließlich enthalten, wenn er
   ausdrücklich aktiviert wurde – der Standard ist für alle drei Felder aus. */
function buildAiExport(entries, options = {}) {
  const opts = {
    includeNotes: options.includeNotes === true,
    includeGratitude: options.includeGratitude === true,
    includeDreams: options.includeDreams === true,
    rangeDays: Number(options.rangeDays) === 90 ? 90 : 30,
    settings: normalizeSettings(options.settings),
    generatedAt: options.generatedAt || new Date().toISOString()
  };

  const stored = entries.filter(entry => entry.stored);
  const days = stored.map(entry => {
    const data = entry.data || {};
    const day = {
      date: entry.date,
      role: data.role || "",
      energy: dailyAverageEnergy(data),
      mood: dailyAverageMood(data),
      checkins: (data.stateCheckins || []).length,
      sleepQualityScore: (data.stateCheckins || []).find(item => item.slot === "night")?.sleepQualityScore ?? "",
      prayersPerformed: dailyPrayerCount(data),
      morningRoutine: data.morningRoutineState || "",
      eveningRoutine: data.eveningRoutineState || "",
      smaWorkday: isSmaWorkday(data),
      fasting: normalizeFasting(data).type,
      balance: data.roleplayBalance?.outcome || "",
      water: Number(data.water || 0),
      steps: Number(data.steps || 0) || null,
      activities: (data.activities || []).map(activity => ({
        role: activity.role, size: activity.size, context: activity.context
      })),
      streaks: Object.fromEntries(STREAKS.map(streak => [streak.key, Number(data.streaks?.[streak.key]?.days || 0)]))
    };
    if (opts.includeNotes) day.notes = String(data.notes || "");
    if (opts.includeGratitude) day.gratitude = [data.gratitude1, data.gratitude2].filter(Boolean).map(String);
    if (opts.includeDreams) day.dreams = String(data.dreams || "");
    return day;
  });

  const fields = aiExportFieldSummary(opts);
  return {
    app: "ROLEPLAY",
    schema: "roleplay-ai-export-1",
    generatedAt: opts.generatedAt,
    rangeDays: opts.rangeDays,
    freeTextIncluded: {
      notes: opts.includeNotes, gratitude: opts.includeGratitude, dreams: opts.includeDreams
    },
    includedFields: fields.included,
    excludedFields: fields.excluded,
    settings: {
      smaPlannedDaysPerWeek: opts.settings.smaPlannedDaysPerWeek,
      fastingCatchUpWeeklyGoal: opts.settings.fastingCatchUpWeeklyGoal,
      fastingVoluntaryWeeklyGoal: opts.settings.fastingVoluntaryWeeklyGoal
    },
    weekFocus: opts.settings.weekFocus,
    prompt: AI_ANALYSIS_PROMPT,
    days
  };
}

// Gut lesbare Textfassung desselben Exports.
function aiExportToText(payload) {
  const lines = [];
  lines.push("ROLEPLAY – Datenauszug für eine KI-Tiefenanalyse");
  lines.push(`Erstellt am: ${payload.generatedAt}`);
  lines.push(`Zeitraum: letzte ${payload.rangeDays} Tage · ${payload.days.length} Tage mit Eintrag`);
  lines.push("");
  lines.push(payload.prompt);
  lines.push("");
  lines.push("Enthaltene Felder:");
  payload.includedFields.forEach(field => lines.push(`  - ${field}`));
  if (payload.excludedFields.length) {
    lines.push("Bewusst NICHT enthalten:");
    payload.excludedFields.forEach(field => lines.push(`  - ${field}`));
  }
  lines.push("");
  lines.push("Tagesdaten:");
  payload.days.forEach(day => {
    const parts = [
      `Datum ${day.date}`,
      `Rolle ${day.role || "–"}`,
      `Energie ${day.energy ?? "–"}`,
      `Laune ${day.mood ?? "–"}`,
      `Check-ins ${day.checkins}`,
      `Pflichtgebete ${day.prayersPerformed}/5`,
      `SMA-Arbeitstag ${day.smaWorkday ? "ja" : "nein"}`,
      `Fasten ${day.fasting || "nicht erfasst"}`,
      `Bilanz ${day.balance || "offen"}`
    ];
    lines.push(`- ${parts.join(" | ")}`);
    if (day.activities.length) {
      lines.push(`    Aktivitäten: ${day.activities.map(a => `${a.role}/${a.size}/${a.context}`).join(", ")}`);
    }
    if (day.notes) lines.push(`    Notiz: ${day.notes.replace(/\s+/g, " ").trim()}`);
    if (day.gratitude?.length) lines.push(`    Dankbarkeit: ${day.gratitude.join(" | ")}`);
    if (day.dreams) lines.push(`    Traum: ${day.dreams.replace(/\s+/g, " ").trim()}`);
  });
  return lines.join("\n");
}

/* --------------------------------------------------------------------------
   15. Empfindungssätze unter Energie und Laune

   Reine Orientierung. Die Sätze sind kein zusätzliches Eingabefeld und
   verändern die Berechnung des Rollenmodus nicht.
   -------------------------------------------------------------------------- */

function energySentence(value) {
  const v = clamp(Number(value) || 0, 0, 100);
  if (v <= 20) return "Ich bin nahezu kraftlos.";
  if (v <= 40) return "Ich habe wenig Energie.";
  if (v <= 60) return "Meine Kraft reicht für das Nötigste.";
  if (v <= 80) return "Ich habe gute Energie.";
  return "Ich fühle mich voller Energie.";
}

function moodSentence(value) {
  const v = clamp(Number(value) || 0, 0, 100);
  if (v <= 20) return "Mir geht es sehr schlecht.";
  if (v <= 40) return "Ich bin deutlich gedrückt.";
  if (v <= 60) return "Ich bin neutral.";
  if (v <= 80) return "Mir geht es gut.";
  return "Mir geht es sehr gut.";
}

/* --------------------------------------------------------------------------
   16. Export für Node-Tests
   -------------------------------------------------------------------------- */

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    clamp, safeParse, escapeHTML, isISODate, average,
    todayISO, dateToISO, dateFromISO, addDays, addMonths, firstOfMonth, lastOfMonth,
    firstOfYear, lastOfYear, mondayOf, sundayOf, daysBetween, datesBetween,
    isoWeekParts, isoWeekKey, calendarBreakdown, pluralDE, joinDE, streakDuration,
    ROLES, ROLE_NAMES, ENTREPRENEUR_ROLE, getRole, STREAKS, PRAYERS,
    prayerWasPerformed, isRoutineSettled,
    BALANCE_OUTCOMES, ROLE_REFLECTION_ORDER, ROLE_REFLECTION_META, balanceOutcomeShort,
    ACTIVITY_SIZES, DEFAULT_ACTIVITY_SIZE, activitySizeMeta, activitySizePoints,
    ACTIVITY_CONTEXTS, DEFAULT_ACTIVITY_CONTEXT, normalizeActivityContext,
    normalizeActivitySize, normalizeActivity, isSmaActivity,
    FASTING_TYPES, FASTING_SELECTABLE, normalizeFastingType, normalizeFasting,
    defaultSettings, normalizeSettings, normalizeWeekFocusEntry, weekFocusFor,
    isSmaWorkday, countSmaActivities, smaWeekContribution, consciousRolePoints,
    PERIOD_KINDS, periodRange, shiftPeriod, periodLabel, weeksInRange,
    dailyAverageEnergy, dailyAverageMood, dailyPrayerCount, buildPeriodStats,
    invisibleRoles, suggestFocusRoles, sleepEnergyPattern,
    MIN_DAYS_FOR_REPORT, MIN_PAIRS_FOR_PATTERN, periodNoun, periodNounAcc, buildReport,
    AI_ANALYSIS_PROMPT, aiExportFieldSummary, buildAiExport, aiExportToText,
    energySentence, moodSentence
  };
}
