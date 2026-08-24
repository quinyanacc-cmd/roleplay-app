/* ==========================================================================
   ROLEPLAY – Logiktests

       node test-logic.js

   Ohne Netzwerk, ohne Abhängigkeiten. Geprüft wird ausschließlich logic.js,
   also genau der Code, den auch die App im Browser ausführt.
   ========================================================================== */

const L = require("./logic.js");

let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) { passed += 1; return; }
  failures.push(`${name}${detail ? ` → ${detail}` : ""}`);
}

function eq(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  check(name, a === e, `erhalten ${a}, erwartet ${e}`);
}

function day(date, data = {}) { return { date, stored: true, data: { activities: [], stateCheckins: [], prayers: {}, streaks: {}, ...data } }; }
function emptyDay(date) { return { date, stored: false, data: null }; }

/* --------------------------------------------------------------------------
   1. Datum, ISO-Wochen, Schaltjahre
   -------------------------------------------------------------------------- */

eq("addDays über Monatsgrenze", L.addDays("2026-01-31", 1), "2026-02-01");
eq("addDays rückwärts über Jahresgrenze", L.addDays("2026-01-01", -1), "2025-12-31");
eq("Schaltjahr 2024 hat den 29. Februar", L.addDays("2024-02-28", 1), "2024-02-29");
eq("Nicht-Schaltjahr 2026 springt auf März", L.addDays("2026-02-28", 1), "2026-03-01");
eq("addMonths begrenzt auf kürzeren Monat", L.addMonths("2026-01-31", 1), "2026-02-28");
eq("addMonths im Schaltjahr", L.addMonths("2024-01-31", 1), "2024-02-29");
eq("lastOfMonth Februar 2024", L.lastOfMonth("2024-02-10"), "2024-02-29");
eq("lastOfMonth Februar 2026", L.lastOfMonth("2026-02-10"), "2026-02-28");
eq("mondayOf für einen Sonntag", L.mondayOf("2026-08-23"), "2026-08-17");
eq("mondayOf für einen Montag", L.mondayOf("2026-08-17"), "2026-08-17");
eq("daysBetween", L.daysBetween("2026-01-01", "2026-01-31"), 30);
eq("datesBetween liefert alle Tage", L.datesBetween("2026-03-01", "2026-03-05").length, 5);

eq("ISO-Woche 2026-08-20", L.isoWeekKey("2026-08-20"), "2026-W34");
// 1.1.2027 ist ein Freitag und gehört noch zur letzten Woche von 2026.
eq("ISO-Woche am Jahreswechsel", L.isoWeekKey("2027-01-01"), "2026-W53");
eq("ISO-Woche 4. Januar ist immer KW 1", L.isoWeekKey("2026-01-04"), "2026-W01");
eq("ISO-Woche 2024-12-30 gehört zu 2025", L.isoWeekKey("2024-12-30"), "2025-W01");

/* --------------------------------------------------------------------------
   2. Streak-Umrechnung
   -------------------------------------------------------------------------- */

const s413 = L.streakDuration(413, "2026-08-20");
eq("413 Tage ergeben 59 volle Wochen", s413.weeks, 59);
eq("413 Tage: abgeleiteter Zählbeginn", s413.startDate, "2025-07-03");
check("413 Tage: Text nennt Wochen und Kalenderdauer",
  s413.text.includes("59 Wochen") && s413.text.includes("Jahr"), s413.text);
eq("413 Tage kalendarisch", [s413.years, s413.months, s413.restDays], [1, 1, 17]);

const s0 = L.streakDuration(0, "2026-08-20");
eq("0 Tage sprachlich sauber", s0.text, "Noch kein voller Tag gezählt.");
eq("1 Tag: keine Wochenangabe", L.streakDuration(1, "2026-08-20").weekText, "");
eq("1 Tag: Kalendertext", L.streakDuration(1, "2026-08-20").calendarText, "1 Tag");
eq("6 Tage: keine Wochenangabe", L.streakDuration(6, "2026-08-20").weeks, 0);
eq("7 Tage: genau eine Woche", L.streakDuration(7, "2026-08-20").weekText, "1 Woche");

// Über Monats- und Jahresgrenzen, kalendarisch statt pauschal 30 Tage
eq("Streak über Jahresgrenze", L.streakDuration(365, "2026-03-01").calendarText, "1 Jahr");
eq("Streak über Schaltjahresgrenze", L.streakDuration(366, "2024-03-01").calendarText, "1 Jahr");
eq("Streak genau ein Monat (Februar 2026)", L.streakDuration(28, "2026-03-01").calendarText, "1 Monat");
eq("Streak genau ein Monat (Februar 2024)", L.streakDuration(29, "2024-03-01").calendarText, "1 Monat");
eq("Streak 31 Tage im Januar", L.streakDuration(31, "2026-02-01").calendarText, "1 Monat");

eq("calendarBreakdown identisch = 0", L.calendarBreakdown("2026-05-05", "2026-05-05"), { years: 0, months: 0, days: 0 });
eq("calendarBreakdown mit Übertrag", L.calendarBreakdown("2026-01-31", "2026-03-01"), { years: 0, months: 1, days: 1 });

/* --------------------------------------------------------------------------
   3. Migration alter Aktivitäten
   -------------------------------------------------------------------------- */

const oldActivity = L.normalizeActivity({ title: "SMA Betriebsratssitzung", role: "Unternehmer" });
eq("Altdaten bekommen Größe Mittel", oldActivity.size, "medium");
eq("Altdaten bekommen neutralen Kontext", oldActivity.context, "none");
check("Titel wird nie als SMA gedeutet", !L.isSmaActivity(oldActivity), JSON.stringify(oldActivity));

const oldSelf = L.normalizeActivity({ title: "Arabisch", role: "Yannick" });
eq("Alte Rolle Yannick wird zur Ich-Person", oldSelf.role, "Ich-Person");
eq("Nicht-Unternehmer bekommen keinen Kontext", L.normalizeActivity({ title: "X", role: "Muslim", context: "sma" }).context, "none");
eq("Unbekannte Größe fällt auf Mittel zurück", L.normalizeActivity({ title: "X", role: "Wirt", size: "riesig" }).size, "medium");
eq("Gültige Größe bleibt erhalten", L.normalizeActivity({ title: "X", role: "Wirt", size: "large" }).size, "large");
eq("Gültiger Kontext bleibt erhalten", L.normalizeActivity({ title: "X", role: "Unternehmer", context: "own" }).context, "own");

eq("Beitragspunkte klein", L.activitySizePoints("small"), 1);
eq("Beitragspunkte mittel", L.activitySizePoints("medium"), 2);
eq("Beitragspunkte groß", L.activitySizePoints("large"), 3);
eq("Beitragspunkte unbekannt = mittel", L.activitySizePoints(undefined), 2);

/* --------------------------------------------------------------------------
   4. Migration alter Fastendaten
   -------------------------------------------------------------------------- */

eq("Alter abgeschlossener Fastentag wird 'legacy'", L.normalizeFasting({ fastingCompleted: true }).type, "legacy");
eq("Kein Fasten bleibt leer", L.normalizeFasting({ fastingCompleted: false }).type, "");
eq("Neue Angabe hat Vorrang", L.normalizeFasting({ fastingCompleted: true, fasting: { type: "voluntary" } }).type, "voluntary");
eq("Unbekannte Art wird verworfen", L.normalizeFasting({ fasting: { type: "quatsch" } }).type, "");
check("Legacy ist nicht auswählbar", !L.FASTING_SELECTABLE.includes("legacy"));
check("Legacy wird nicht als Nachholfasten gewertet", L.normalizeFasting({ fastingCompleted: true }).type !== "catchUp");

/* Der offene Nachholstand wird abgeleitet, nicht fortgeschrieben.
   Die App rechnet: offen = Grundstand − Anzahl erfasster Nachholtage. */
function openCatchUp(baseline, entries) {
  const recorded = entries.filter(entry => L.normalizeFasting(entry.data).type === "catchUp").length;
  return Math.max(0, baseline - recorded);
}

const fastingDays = [
  day("2026-08-10", { fasting: { type: "catchUp" } }),
  day("2026-08-11", { fasting: { type: "voluntary" } }),
  day("2026-08-12", { fasting: { type: "catchUp" } }),
  day("2026-08-13", { fastingCompleted: true })
];
eq("Zwei Nachholtage verringern um genau zwei", openCatchUp(12, fastingDays), 10);
eq("Mehrfaches Rechnen bleibt identisch (idempotent)",
  [openCatchUp(12, fastingDays), openCatchUp(12, fastingDays), openCatchUp(12, fastingDays)], [10, 10, 10]);
eq("Legacy-Tag verringert den Zähler nicht", openCatchUp(12, [day("2026-08-13", { fastingCompleted: true })]), 12);
eq("Rücknahme eines Nachholtags stellt den Stand wieder her",
  openCatchUp(12, fastingDays.filter(entry => entry.date !== "2026-08-12")), 11);
eq("Vollständige Rücknahme führt zum Ausgangsstand", openCatchUp(12, []), 12);
eq("Der Stand wird nie negativ", openCatchUp(1, fastingDays), 0);

/* --------------------------------------------------------------------------
   5. SMA-Erfassung und Normalisierung
   -------------------------------------------------------------------------- */

const smaAct = { title: "Sitzung", role: "Unternehmer", size: "medium", context: "sma" };
const ownAct = { title: "Buch", role: "Unternehmer", size: "large", context: "own" };

check("Ausdrückliche Markierung zählt", L.isSmaWorkday({ smaWorkday: true, activities: [] }));
check("SMA-Aktivität zählt als Arbeitstag", L.isSmaWorkday({ activities: [smaAct] }));
check("Eigene Entwicklung ist kein SMA-Arbeitstag", !L.isSmaWorkday({ activities: [ownAct] }));
check("Tag ohne alles ist kein Arbeitstag", !L.isSmaWorkday({ activities: [] }));
eq("Mehrere SMA-Aktivitäten werden einzeln gezählt", L.countSmaActivities({ activities: [smaAct, smaAct, ownAct] }), 2);

eq("SMA 5 von 5 ergibt genau 1,0", L.smaWeekContribution(5, 5), 1);
eq("SMA 3 von 5", L.smaWeekContribution(3, 5), 0.6);
eq("SMA 1 von 5", L.smaWeekContribution(1, 5), 0.2);
eq("SMA 0 von 5", L.smaWeekContribution(0, 5), 0);
eq("SMA 7 von 5 wird bei 1,0 gedeckelt", L.smaWeekContribution(7, 5), 1);
eq("SMA 1 von 1", L.smaWeekContribution(1, 1), 1);
eq("SMA 3 von 1 wird gedeckelt", L.smaWeekContribution(3, 1), 1);
eq("Null geplante Tage ohne Arbeit", L.smaWeekContribution(0, 0), 0);
eq("Null geplante Tage mit Arbeit teilt nicht durch null", L.smaWeekContribution(4, 0), 1);
check("Ergebnis bei 0 geplanten Tagen ist endlich", Number.isFinite(L.smaWeekContribution(4, 0)));

/* --------------------------------------------------------------------------
   6. Rollenkompass
   -------------------------------------------------------------------------- */

const compassDays = [
  day("2026-08-17", { smaWorkday: true, activities: [smaAct, smaAct] }),
  day("2026-08-18", { smaWorkday: true, activities: [smaAct] }),
  day("2026-08-19", { smaWorkday: true, activities: [] }),
  day("2026-08-20", { activities: [{ title: "Dua", role: "Muslim", size: "small", context: "none" }] })
];
const compass = L.consciousRolePoints(compassDays);
eq("SMA-Regelarbeit erzeugt keinen bewussten Unternehmer-Beitrag", compass.points.Unternehmer, 0);
eq("Andere Rollen zählen ihre Beitragspunkte", compass.points.Muslim, 1);

const mixed = L.consciousRolePoints([day("2026-08-20", { activities: [smaAct, ownAct] })]);
eq("Eigene Entwicklung wird nicht reduziert", mixed.points.Unternehmer, 3);

/* --------------------------------------------------------------------------
   7. Zeiträume und Aggregation
   -------------------------------------------------------------------------- */

eq("Wochenzeitraum Montag bis Sonntag", L.periodRange("week", "2026-08-20"), { kind: "week", start: "2026-08-17", end: "2026-08-23" });
eq("Monatszeitraum", L.periodRange("month", "2026-08-20"), { kind: "month", start: "2026-08-01", end: "2026-08-31" });
eq("Jahreszeitraum", L.periodRange("year", "2026-08-20"), { kind: "year", start: "2026-01-01", end: "2026-12-31" });
eq("Februar im Schaltjahr", L.periodRange("month", "2024-02-05").end, "2024-02-29");
eq("Woche zurückblättern", L.shiftPeriod("week", "2026-08-20", -1), "2026-08-10");
eq("Monat zurückblättern", L.shiftPeriod("month", "2026-03-15", -1), "2026-02-01");
eq("Jahr vorblättern", L.shiftPeriod("year", "2026-03-15", 1), "2027-01-01");

const weekRange = L.periodRange("week", "2026-08-20");
const weekEntries = [
  day("2026-08-17", { smaWorkday: true, stateCheckins: [{ slot: "morning", energy: 60, mood: 70 }], prayers: { Fajr: "Normal", Dhuhr: "Normal" } }),
  day("2026-08-18", { smaWorkday: true, stateCheckins: [{ slot: "morning", energy: 40, mood: 50 }] }),
  emptyDay("2026-08-19"),
  day("2026-08-20", { smaWorkday: true, activities: [ownAct], roleplayBalance: { outcome: "fulfilled" } }),
  emptyDay("2026-08-21"), emptyDay("2026-08-22"), emptyDay("2026-08-23")
];
const weekStats = L.buildPeriodStats(weekRange, weekEntries, { today: "2026-08-20", settings: { smaPlannedDaysPerWeek: 5 } });

eq("Zukünftige Tage bleiben außen vor", weekStats.coverage.elapsedDays, 4);
eq("Nur echte Einträge zählen als Datenbasis", weekStats.coverage.storedDays, 3);
eq("Energieabdeckung", weekStats.coverage.energyDays, 2);
eq("Energiemittel nur aus erfassten Tagen", weekStats.energyAverage, 50);
eq("Leere Tage erzeugen keine Nullwerte", weekStats.energySeries, [60, 40, null, null]);
eq("SMA-Arbeitstage", weekStats.sma.workdays, 3);
eq("Normalisierter SMA-Beitrag der Woche", weekStats.sma.contributionSum, 0.6);
eq("Bewusster Unternehmer-Beitrag getrennt sichtbar",
  weekStats.roles.find(role => role.name === "Unternehmer").conscious, 3);
eq("Bilanz beschreibend gezählt", weekStats.balance.fulfilled, 1);
eq("Gebete gezählt", weekStats.prayers.performed, 2);

// Mehrere SMA-Aktivitäten am selben Datum ergeben genau einen Arbeitstag
const doubleSma = L.buildPeriodStats(weekRange,
  [day("2026-08-17", { activities: [smaAct, smaAct, smaAct] })],
  { today: "2026-08-20", settings: { smaPlannedDaysPerWeek: 5 } });
eq("Drei SMA-Aktivitäten an einem Tag = ein Arbeitstag", doubleSma.sma.workdays, 1);
eq("Sie erhöhen den normalisierten Beitrag nicht mehrfach", doubleSma.sma.contributionSum, 0.2);
eq("Die Detailansicht zeigt sie trotzdem vollständig", doubleSma.sma.activities, 3);

// Monats- und Jahresaggregation
const monthRange = L.periodRange("month", "2026-08-20");
const monthEntries = L.datesBetween(monthRange.start, monthRange.end).map((date, index) =>
  index % 2 === 0 ? day(date, { stateCheckins: [{ slot: "morning", energy: 50 + (index % 10), mood: 60 }] }) : emptyDay(date));
const monthStats = L.buildPeriodStats(monthRange, monthEntries, { today: "2026-08-20", settings: {} });
eq("Monat: vergangene Tage", monthStats.coverage.elapsedDays, 20);
check("Monat: Energiemittel vorhanden", monthStats.energyAverage !== null);
// Der 1.8.2026 ist ein Samstag, der 31.8. ein Montag – der Monat berührt sechs ISO-Wochen.
eq("Monat berührt sechs ISO-Wochen", monthStats.weeks.length, 6);

const yearStats = L.buildPeriodStats(L.periodRange("year", "2026-08-20"),
  L.datesBetween("2026-01-01", "2026-12-31").map(date => emptyDay(date)),
  { today: "2026-08-20", settings: {} });
eq("Jahr: keine erfundenen Einträge", yearStats.coverage.storedDays, 0);
eq("Jahr: vergangene Tage bis heute", yearStats.coverage.elapsedDays, 232);

/* --------------------------------------------------------------------------
   8. Abgeschlossene gegenüber laufender Woche
   -------------------------------------------------------------------------- */

const weeks = L.weeksInRange({ start: "2026-08-03", end: "2026-08-23" }, "2026-08-20");
eq("Anzahl Wochen im Zeitraum", weeks.length, 3);
eq("Frühere Wochen sind abgeschlossen", [weeks[0].completed, weeks[1].completed], [true, true]);
eq("Die laufende Woche ist nicht abgeschlossen", weeks[2].completed, false);
eq("Wochenschlüssel nach ISO", weeks.map(week => week.key), ["2026-W32", "2026-W33", "2026-W34"]);

/* --------------------------------------------------------------------------
   9. Unsichtbare Rollen
   -------------------------------------------------------------------------- */

const invisibleInput = [
  { key: "2026-W32", completed: true, rolesWithContribution: ["Muslim", "Vitalist"], focus: { primary: "", secondary: "" } },
  { key: "2026-W33", completed: true, rolesWithContribution: ["Muslim"], focus: { primary: "", secondary: "" } },
  { key: "2026-W34", completed: false, rolesWithContribution: ["Familienmensch"], focus: { primary: "", secondary: "" } }
];
const invisible = L.invisibleRoles(invisibleInput, 2).map(item => item.name);
check("Familienmensch gilt trotz laufender Woche als unsichtbar", invisible.includes("Familienmensch"), invisible.join(","));
check("Muslim gilt nicht als unsichtbar", !invisible.includes("Muslim"));
check("Vitalist gilt nicht als unsichtbar (Beitrag in W32)", !invisible.includes("Vitalist"));
eq("Ohne genügend abgeschlossene Wochen keine Aussage",
  L.invisibleRoles([invisibleInput[2]], 2), []);

const suggestionItems = L.suggestFocusRoles(invisibleInput, 2);
const suggestion = suggestionItems.map(item => item.name);
check("Es wird überhaupt ein Fokus vorgeschlagen", suggestion.length > 0, suggestion.join(","));
check("Vorschlag enthält höchstens zwei Rollen", suggestion.length <= 2, String(suggestion.length));
check("Vorschlag enthält nur Rollen ohne jüngsten Beitrag",
  suggestionItems.every(item => item.sinceContribution > 0), JSON.stringify(suggestionItems));
check("Vorschlag enthält Muslim nicht (Beitrag in der letzten abgeschlossenen Woche)", !suggestion.includes("Muslim"));
check("Familienmensch ist als unsichtbare Rolle erkannt", invisible.includes("Familienmensch"));

/* --------------------------------------------------------------------------
   10. Wochenfokus nach ISO-Kalenderwoche
   -------------------------------------------------------------------------- */

const focusSettings = L.normalizeSettings({
  weekFocus: {
    "2026-W33": { primary: "Muslim", secondary: "Wirt" },
    "2026-W34": { primary: "Familienmensch", secondary: "Familienmensch" },
    "kaputt": { primary: "Muslim" },
    "2026-W35": { primary: "Gibtsnicht", secondary: "Absolvent" }
  }
});
eq("Historische Woche behält ihre Auswahl", focusSettings.weekFocus["2026-W33"], { primary: "Muslim", secondary: "Wirt" });
eq("Gleiche Rolle doppelt wird bereinigt", focusSettings.weekFocus["2026-W34"], { primary: "Familienmensch", secondary: "" });
check("Ungültiger Wochenschlüssel wird verworfen", focusSettings.weekFocus["kaputt"] === undefined);
eq("Unbekannte Rolle wird verworfen", focusSettings.weekFocus["2026-W35"], { primary: "", secondary: "Absolvent" });
eq("weekFocusFor findet die Woche zum Datum", L.weekFocusFor(focusSettings, "2026-08-20").primary, "Familienmensch");
eq("Woche ohne Fokus liefert leere Auswahl", L.weekFocusFor(focusSettings, "2026-06-01"), { primary: "", secondary: "" });

/* --------------------------------------------------------------------------
   11. Einstellungen
   -------------------------------------------------------------------------- */

eq("Standard: 5 geplante SMA-Tage", L.defaultSettings().smaPlannedDaysPerWeek, 5);
eq("Standard: Wochenziel Nachholfasten 1", L.defaultSettings().fastingCatchUpWeeklyGoal, 1);
eq("Standard: kein Wochenziel für freiwilliges Fasten", L.defaultSettings().fastingVoluntaryWeeklyGoal, 0);
eq("Geplante Tage werden auf 0–7 begrenzt", L.normalizeSettings({ smaPlannedDaysPerWeek: 19 }).smaPlannedDaysPerWeek, 7);
eq("Negative geplante Tage werden begrenzt", L.normalizeSettings({ smaPlannedDaysPerWeek: -3 }).smaPlannedDaysPerWeek, 0);
eq("Unsinniger Wert fällt auf den Standard zurück", L.normalizeSettings({ smaPlannedDaysPerWeek: "viele" }).smaPlannedDaysPerWeek, 5);
eq("Grundstand wird nie negativ", L.normalizeSettings({ fastingCatchUpBaseline: -5 }).fastingCatchUpBaseline, 0);

/* --------------------------------------------------------------------------
   12. Vereinfachte Bilanz
   -------------------------------------------------------------------------- */

eq("Fünf Antwortmöglichkeiten", L.BALANCE_OUTCOMES.length, 5);
eq("Reihenfolge der Antworten", L.BALANCE_OUTCOMES, ["fulfilled", "adapted", "deferred", "missed", "overextended"]);
eq("Kurzbezeichnung Erfüllt", L.balanceOutcomeShort("fulfilled"), "Erfüllt");
eq("Kurzbezeichnung Überdehnt", L.balanceOutcomeShort("overextended"), "Überdehnt");
check("Kein Punktwert an der Bilanz", Object.values(L.ROLE_REFLECTION_META).every(meta => meta.score === undefined));

const balanceStats = L.buildPeriodStats(weekRange, [
  day("2026-08-17", { roleplayBalance: { outcome: "fulfilled" } }),
  day("2026-08-18", { roleplayBalance: { outcome: "missed" } }),
  day("2026-08-19", { roleplayBalance: { outcome: "fulfilled" } })
], { today: "2026-08-20", settings: {} });
eq("Bilanz wird nur gezählt, nicht bewertet", [balanceStats.balance.fulfilled, balanceStats.balance.missed], [2, 1]);

/* --------------------------------------------------------------------------
   13. Empfindungssätze
   -------------------------------------------------------------------------- */

eq("Energie 0", L.energySentence(0), "Ich bin nahezu kraftlos.");
eq("Energie 20", L.energySentence(20), "Ich bin nahezu kraftlos.");
eq("Energie 25", L.energySentence(25), "Ich habe wenig Energie.");
eq("Energie 40", L.energySentence(40), "Ich habe wenig Energie.");
eq("Energie 45", L.energySentence(45), "Meine Kraft reicht für das Nötigste.");
eq("Energie 60", L.energySentence(60), "Meine Kraft reicht für das Nötigste.");
eq("Energie 65", L.energySentence(65), "Ich habe gute Energie.");
eq("Energie 80", L.energySentence(80), "Ich habe gute Energie.");
eq("Energie 85", L.energySentence(85), "Ich fühle mich voller Energie.");
eq("Energie 100", L.energySentence(100), "Ich fühle mich voller Energie.");
eq("Laune 0", L.moodSentence(0), "Mir geht es sehr schlecht.");
eq("Laune 25", L.moodSentence(25), "Ich bin deutlich gedrückt.");
eq("Laune 45", L.moodSentence(45), "Ich bin neutral.");
eq("Laune 65", L.moodSentence(65), "Mir geht es gut.");
eq("Laune 100", L.moodSentence(100), "Mir geht es sehr gut.");

/* --------------------------------------------------------------------------
   14. Report: Datenabdeckung, Sprache, genau ein Schritt
   -------------------------------------------------------------------------- */

const thinStats = L.buildPeriodStats(weekRange, [day("2026-08-17"), day("2026-08-18")], { today: "2026-08-20", settings: {} });
const thinReport = L.buildReport(thinStats, []);
check("Zu dünne Datenbasis erzeugt keine Interpretation", thinReport.insufficient);
check("Zu dünne Datenbasis sagt das ausdrücklich",
  thinReport.situation.some(line => line.includes("fehlen noch genügend Einträge")), thinReport.situation.join(" | "));
eq("Keine Entwicklungen ohne Datenbasis", thinReport.developments, []);

const richEntries = L.datesBetween("2026-08-01", "2026-08-20").map((date, index) => day(date, {
  stateCheckins: [{ slot: "night", energy: null, mood: null, sleepQualityScore: index % 3 === 0 ? 1 : 5 },
                  { slot: "morning", energy: index % 3 === 0 ? 78 : 42, mood: 60 }],
  prayers: { Fajr: "Normal", Dhuhr: "Normal", "ʿAsr": "Normal" },
  activities: [{ title: "SMA", role: "Unternehmer", size: "medium", context: "sma" }],
  smaWorkday: true,
  roleplayBalance: { outcome: index % 4 === 0 ? "missed" : "fulfilled" }
}));
const richStats = L.buildPeriodStats(L.periodRange("month", "2026-08-20"),
  L.datesBetween("2026-08-01", "2026-08-31").map(date => richEntries.find(entry => entry.date === date) || emptyDay(date)),
  { today: "2026-08-20", settings: { smaPlannedDaysPerWeek: 5 } });
const richReport = L.buildReport(richStats, richEntries);

check("Report wird bei ausreichender Basis erzeugt", !richReport.insufficient);
check("Höchstens drei Entwicklungen", richReport.developments.length <= 3, String(richReport.developments.length));
check("Genau ein nächster Schritt", typeof richReport.nextStep === "string" && richReport.nextStep.length > 0);
check("Datenbasis wird ausgewiesen",
  richReport.dataBasis.some(line => /Energie erfasst an \d+ von \d+ Tagen/.test(line)), richReport.dataBasis.join(" | "));
check("Fehlende eigene Entwicklung wird trotz SMA sichtbar",
  richReport.developments.some(line => line.includes("eigene Entwicklung")), richReport.developments.join(" | "));

const allReportText = [...richReport.situation, ...richReport.developments, ...richReport.compass,
  ...richReport.connections, richReport.nextStep].join(" ");
[
  "Du hast versagt", "undiszipliniert", "beweisen, dass", "Depression", "Diagnose",
  "Erfolgsquote", "Sünde", "faul", "Versager"
].forEach(forbidden => {
  check(`Report enthält nicht „${forbidden}“`, !allReportText.includes(forbidden), allReportText.slice(0, 160));
});
check("Zusammenhänge werden nie als Ursache behauptet",
  !richReport.connections.some(line => /verursacht|weil deine|Ursache dafür ist/.test(line)), richReport.connections.join(" | "));
check("Zusammenhang wird sprachlich als Zusammenhang benannt",
  richReport.connections.length === 0 || richReport.connections.some(line => /Zusammenhang|fehlen noch|Einschätzung/.test(line)),
  richReport.connections.join(" | "));

const pattern = L.sleepEnergyPattern(richEntries);
check("Schlaf-Energie-Muster wird bei genügend Paaren erkannt", pattern !== null && pattern.pairs >= L.MIN_PAIRS_FOR_PATTERN);
eq("Kein Muster bei zu wenigen Paaren", L.sleepEnergyPattern(richEntries.slice(0, 3)), null);

/* --------------------------------------------------------------------------
   15. KI-Export
   -------------------------------------------------------------------------- */

const exportEntries = [
  day("2026-08-19", {
    notes: "Ein sehr persönlicher Tagebucheintrag.",
    gratitude1: "Dankbar für Zizo", gratitude2: "Dankbar für Ruhe",
    dreams: "Ein Traum, den ich niemandem zeigen möchte.",
    stateCheckins: [{ slot: "morning", energy: 70, mood: 65 }],
    activities: [ownAct], smaWorkday: true, fasting: { type: "voluntary" },
    roleplayBalance: { outcome: "fulfilled" }
  })
];

const plain = L.buildAiExport(exportEntries, {});
const plainText = JSON.stringify(plain);
check("Standard: keine Tagesnotizen", !plainText.includes("Tagebucheintrag"));
check("Standard: keine Dankbarkeitstexte", !plainText.includes("Zizo"));
check("Standard: keine Traumtexte", !plainText.includes("niemandem zeigen"));
eq("Standard: alle drei Freitextschalter aus", plain.freeTextIncluded, { notes: false, gratitude: false, dreams: false });
eq("Standard-Zeitraum 30 Tage", plain.rangeDays, 30);
check("Ausgeschlossene Felder werden benannt", plain.excludedFields.length === 3, plain.excludedFields.join(","));
check("Strukturierte Daten sind enthalten", plain.days[0].energy === 70 && plain.days[0].smaWorkday === true);
check("Aktivitätsgröße und Kontext sind enthalten",
  plain.days[0].activities[0].size === "large" && plain.days[0].activities[0].context === "own");
check("Fastenart ist enthalten", plain.days[0].fasting === "voluntary");

const withText = L.buildAiExport(exportEntries, { includeNotes: true, includeGratitude: true, includeDreams: true, rangeDays: 90 });
const withTextJson = JSON.stringify(withText);
check("Nach bewusster Auswahl: Notizen enthalten", withTextJson.includes("Tagebucheintrag"));
check("Nach bewusster Auswahl: Dankbarkeit enthalten", withTextJson.includes("Zizo"));
check("Nach bewusster Auswahl: Träume enthalten", withTextJson.includes("niemandem zeigen"));
eq("90-Tage-Auswahl wird übernommen", withText.rangeDays, 90);
eq("Keine ausgeschlossenen Felder mehr", withText.excludedFields, []);

check("Analyseauftrag ist automatisch enthalten", plain.prompt === L.AI_ANALYSIS_PROMPT && plain.prompt.length > 200);
[
  "Trenne klar zwischen dokumentierter Tatsache",
  "keine medizinischen oder psychologischen Diagnosen",
  "Erfinde keine Kausalität",
  "Datenlücken",
  "mehrere Wochen",
  "höchstens drei",
  "genau eine konkrete Handlungsempfehlung",
  "nicht beschämend"
].forEach(fragment => {
  check(`Analyseauftrag verlangt: „${fragment}“`,
    L.AI_ANALYSIS_PROMPT.toLowerCase().includes(fragment.toLowerCase()));
});

const text = L.aiExportToText(plain);
check("Textfassung ist lesbar aufgebaut", text.includes("ROLEPLAY") && text.includes("Tagesdaten:"));
check("Textfassung ohne Freitext im Standard", !text.includes("Tagebucheintrag"));
check("Textfassung nennt ausgeschlossene Felder", text.includes("Bewusst NICHT enthalten"));

/* --------------------------------------------------------------------------
   16. Roundtrip: Export und Reimport verlieren nichts
   -------------------------------------------------------------------------- */

const roundtripDay = {
  role: "Unternehmer",
  activities: [smaAct, ownAct],
  smaWorkday: true,
  fasting: { type: "catchUp" },
  ramadanDays: -12,
  fastingCompleted: false,
  roleplayBalance: { outcome: "adapted", detailOutcome: "adapted", detailKeys: ["scope"] },
  streaks: { cannabisFree: { days: 413, broken: false, todayStatus: "" } },
  notes: "Text"
};
const serialized = JSON.parse(JSON.stringify(roundtripDay));
eq("Roundtrip: Aktivitäten unverändert", serialized.activities, roundtripDay.activities);
eq("Roundtrip: Fastenart unverändert", L.normalizeFasting(serialized).type, "catchUp");
eq("Roundtrip: alter Ramadanwert bleibt erhalten", serialized.ramadanDays, -12);
eq("Roundtrip: SMA-Markierung bleibt erhalten", L.isSmaWorkday(serialized), true);
eq("Roundtrip: Streak-Tage bleiben erhalten", serialized.streaks.cannabisFree.days, 413);
eq("Roundtrip: Zähler unverändert", openCatchUp(12, [{ date: "x", stored: true, data: serialized }]), 11);

const settingsRoundtrip = L.normalizeSettings(JSON.parse(JSON.stringify(L.normalizeSettings({
  smaPlannedDaysPerWeek: 3, fastingCatchUpBaseline: 12, fastingCatchUpWeeklyGoal: 2,
  fastingVoluntaryWeeklyGoal: 1, fastingMigrated: true,
  weekFocus: { "2026-W34": { primary: "Wirt", secondary: "Muslim" } },
  aiExport: { rangeDays: 90, includeNotes: true, includeGratitude: false, includeDreams: false }
}))));
eq("Einstellungs-Roundtrip: geplante Tage", settingsRoundtrip.smaPlannedDaysPerWeek, 3);
eq("Einstellungs-Roundtrip: Grundstand", settingsRoundtrip.fastingCatchUpBaseline, 12);
eq("Einstellungs-Roundtrip: Wochenfokus", settingsRoundtrip.weekFocus["2026-W34"], { primary: "Wirt", secondary: "Muslim" });
eq("Einstellungs-Roundtrip: KI-Vorauswahl", settingsRoundtrip.aiExport,
  { rangeDays: 90, includeNotes: true, includeGratitude: false, includeDreams: false });

/* --------------------------------------------------------------------------
   Ergebnis
   -------------------------------------------------------------------------- */

console.log(`\ntest-logic.js: ${passed} Prüfungen bestanden, ${failures.length} fehlgeschlagen.`);
if (failures.length) {
  failures.forEach(failure => console.log(`  ✗ ${failure}`));
  process.exit(1);
}
