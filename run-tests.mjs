/* ==========================================================================
   ROLEPLAY – Tests ohne Browser
   Lädt app.js in eine Sandbox mit minimalen Stubs für document, window und
   localStorage und prüft ausschließlich die reine Rechen- und Migrationslogik.
   Aufruf:  node tests/run-tests.mjs
   ========================================================================== */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "..", "app.js"), "utf8");

/* --- Minimale Umgebung ---------------------------------------------------- */
function createStore() {
  const map = new Map();
  return {
    get length() { return map.size; },
    key: index => [...map.keys()][index] ?? null,
    getItem: key => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: key => map.delete(key),
    clear: () => map.clear(),
    _map: map
  };
}

const localStorage = createStore();
const noop = () => {};
const elementStub = () => ({
  value: "", textContent: "", innerHTML: "", hidden: false, disabled: false,
  dataset: {}, classList: { toggle: noop, add: noop, remove: noop, contains: () => false },
  style: { setProperty: noop }, addEventListener: noop, setAttribute: noop,
  removeAttribute: noop, querySelectorAll: () => [], focus: noop
});

const sandbox = {
  console,
  Intl,
  Math,
  Date,
  JSON,
  Number,
  String,
  Object,
  Array,
  Boolean,
  Set,
  Map,
  isNaN,
  parseInt,
  parseFloat,
  setTimeout,
  clearTimeout,
  localStorage,
  navigator: { serviceWorker: undefined },
  document: {
    addEventListener: noop,
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: elementStub,
    body: { appendChild: noop },
    documentElement: {},
    visibilityState: "visible"
  },
  window: { addEventListener: noop, scrollTo: noop, requestAnimationFrame: noop, scrollY: 0 },
  URL: { createObjectURL: () => "blob:", revokeObjectURL: noop },
  Blob: class { constructor() {} },
  alert: noop,
  confirm: () => true
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: "app.js" });

const app = sandbox;
/* Funktionsdeklarationen landen im Sandbox-Objekt; const/let leben in einem
   eigenen Gültigkeitsbereich und werden über evalIn gelesen bzw. gesetzt. */
const evalIn = code => vm.runInContext(code, sandbox);

/* --- Kleines Testgerüst --------------------------------------------------- */
let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) { passed += 1; console.log(`  ✓ ${name}`); }
  else { failures.push(`${name}${detail ? ` – ${detail}` : ""}`); console.log(`  ✗ ${name}${detail ? ` – ${detail}` : ""}`); }
}

function equal(name, actual, expected) {
  check(name, Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected),
    `erwartet ${JSON.stringify(expected)}, erhalten ${JSON.stringify(actual)}`);
}

function group(title, fn) { console.log(`\n${title}`); fn(); }

/* ========================================================================== */
group("Modusberechnung – Gewichtungen", () => {
  equal("Ohne Taqwa gilt Laune 58 % / Energie 42 %",
    app.stateScore(50, 80), Math.round(80 * 0.58 + 50 * 0.42));
  equal("Fehlender Taqwa-Wert ändert die Altrechnung nicht",
    app.stateScore(50, 80, null), app.stateScore(50, 80));
  equal("Mit Taqwa gilt 36 / 32 / 32",
    app.stateScore(50, 80, 70), Math.round(80 * 0.36 + 50 * 0.32 + 70 * 0.32));
  equal("Taqwa 0 senkt den Wert gegenüber der Altrechnung",
    app.stateScore(60, 60, 0) < app.stateScore(60, 60), true);
  equal("Gleiche Werte ergeben denselben Score",
    app.stateScore(60, 60, 60), 60);
});

group("Schutzgrenzen", () => {
  equal("Sehr niedrige Energie erzwingt trotz hoher Taqwa den Schon-Modus",
    app.resolveMode(20, 70, 100).key, "gentle");
  equal("Sehr niedrige Laune bleibt begrenzt",
    app.resolveMode(70, 20, 100).key, "gentle");
  equal("Höchste Taqwa hebt eine energiebedingte Begrenzung nicht auf",
    app.resolveMode(30, 50, 100).key, "minimum");
  equal("Die bestehende Laune-Ausnahme bleibt unverändert",
    app.resolveMode(30, 90, 100).key, app.resolveMode(30, 90).key);
  equal("Harte Untergrenze greift weiterhin",
    app.resolveMode(10, 100, 100).key, "gentle");
  equal("Guter Zustand mit hoher Taqwa erreicht einen höheren Modus",
    app.modeIndex(app.resolveMode(85, 85, 95).key) >= app.modeIndex(app.resolveMode(85, 85, 10).key), true);
  equal("Historischer Check-in ohne Taqwa behält seinen Modus",
    app.resolveMode(70, 70).key, app.resolveMode(70, 70, null).key);
});

group("Aktivitätsvorlagen", () => {
  const gym = app.normalizeActivity({ title: "Gym", role: "Ich-Person" });
  equal("Vorlage Gym setzt Rolle und Gewicht", [gym.role, gym.weight], ["Vitalist", 2]);
  const arabic = app.normalizeActivity({ title: "arabisch lernen" });
  equal("Titel wird unabhängig von Groß-/Kleinschreibung zugeordnet", [arabic.template, arabic.weight], ["arabic", 1.5]);
  const book = app.normalizeActivity({ template: "book" });
  equal("Buchprojekt", [book.role, book.weight], ["Unternehmer", 1.2]);
  const legacy = app.normalizeActivity({ title: "Spaziergang", role: "Vitalist" });
  equal("Aktivität ohne Gewicht zählt einen Punkt", [legacy.template, legacy.weight], ["custom", 1]);
  const sma = app.normalizeActivity({ title: "Irgendwas", isSma: true });
  equal("Bestehende isSma-Markierung wird übernommen", [sma.template, sma.role, sma.isSma], ["sma", "Unternehmer", true]);
  const unknown = app.normalizeActivity({ title: "Gymnastik" });
  equal("Ähnliche Titel werden nicht erraten", unknown.template, "custom");
});

group("Punktberechnung und SMA-Tagesbegrenzung", () => {
  const single = { activities: [{ template: "sma" }] };
  equal("Ein SMA-Eintrag ergibt 0,5 Punkte", app.dayPointTotal(single, "2026-03-02"), 0.5);

  const triple = { activities: [{ template: "sma" }, { template: "sma" }, { template: "sma" }] };
  const rows = app.activityPointRows(triple, "2026-03-02");
  equal("Mehrere SMA-Einträge am selben Tag ergeben eine Zeile", rows.length, 1);
  equal("… und weiterhin insgesamt 0,5 Punkte", app.dayPointTotal(triple, "2026-03-02"), 0.5);
  equal("… die Zeile weist die Anzahl der Einträge aus", rows[0].smaEntries, 3);

  const mixed = { activities: [{ template: "sma" }, { template: "gym" }, { template: "sma" }, { title: "Notizen" }] };
  const mixedRows = app.activityPointRows(mixed, "2026-03-02");
  equal("SMA erhält nicht zusätzlich den normalen Aktivitätspunkt", mixedRows.length, 3);
  equal("Tagessumme stimmt mit den Einzelwerten überein",
    app.dayPointTotal(mixed, "2026-03-02"),
    app.roundPoints(mixedRows.reduce((sum, row) => sum + row.points, 0)));
  equal("Tagessumme 0,5 + 2,0 + 1,0", app.dayPointTotal(mixed, "2026-03-02"), 3.5);
  equal("Punkte werden deutsch formatiert", app.formatPoints(12.2), "12,2");
  equal("Ganze Zahlen ohne Nachkomma", app.formatPoints(2), "2");
});

group("Rollenverteilung", () => {
  localStorage.clear();
  const day = date => `roleplay-v25-review-${date}`;
  localStorage.setItem(day("2026-03-02"), JSON.stringify({
    role: "Unternehmer",
    activities: [{ template: "sma" }, { template: "sma" }, { template: "gym" }]
  }));
  localStorage.setItem(day("2026-03-03"), JSON.stringify({
    role: "Muslim",
    activities: [{ template: "arabic" }]
  }));
  const split = app.roleSplitData(["2026-03-02", "2026-03-03", "2026-03-04"]);
  const unternehmer = split.roles.find(item => item.role === "Unternehmer");
  const vitalist = split.roles.find(item => item.role === "Vitalist");
  equal("Alle sieben Rollen erscheinen", split.roles.length, 7);
  equal("Unternehmer erhält 0,5 aus dem SMA-Tag", unternehmer.points, 0.5);
  equal("Vitalist erhält 2,0", vitalist.points, 2);
  equal("Gesamtpunkte", split.total, 4);
  equal("Vertretene Rollen", split.represented, 3);
  equal("Schwerpunkt ist die stärkste Rolle", split.leader.role, "Vitalist");
  equal("Detailzeilen ergeben exakt den Rollenwert",
    app.roundPoints(unternehmer.rows.reduce((sum, row) => sum + row.points, 0)), unternehmer.points);
  localStorage.clear();
});

group("Zeiträume des Rückblicks", () => {
  const week = app.weekDates("2026-03-04", 0);
  equal("Kalenderwoche beginnt am Montag", week[0], "2026-03-02");
  equal("… und endet am Sonntag", week[6], "2026-03-08");
  equal("Die laufende Woche wird nicht am heutigen Tag abgeschnitten", week.length, 7);
  const previous = app.weekDates("2026-03-04", -1);
  equal("Ein Schritt zurück verschiebt um eine volle Woche", previous[0], "2026-02-23");

  const sliding = app.slidingDates("2026-03-04", 0);
  equal("Gleitender Zeitraum endet am gewählten Tag", sliding[6], "2026-03-04");
  equal("… und umfasst sieben Tage", sliding.length, 7);
  const shifted = app.slidingDates("2026-03-04", -1);
  equal("Pfeil verschiebt genau einen Tag", shifted[6], "2026-03-03");
  const sundayMonday = app.slidingDates("2026-03-02", 0);
  equal("Sonntag und Montag sind gemeinsam vergleichbar",
    sundayMonday.includes("2026-03-01") && sundayMonday.includes("2026-03-02"), true);
});

group("Rollenfokus", () => {
  localStorage.clear();
  evalIn(`roleFocus = normalizeRoleFocus(${JSON.stringify({ role: "Muslim", mode: "days", startDate: "2026-03-02", endDate: "2026-03-08" })})`);
  equal("Fokus gilt innerhalb des Zeitraums", app.roleFocusActiveOn("2026-03-05"), "Muslim");
  equal("Fokus gilt nicht davor", app.roleFocusActiveOn("2026-03-01"), null);
  equal("Fokus gilt nicht danach", app.roleFocusActiveOn("2026-03-09"), null);
  equal("Fokus ersetzt die Wochenrotation", app.defaultRoleForDate("2026-03-05"), "Muslim");
  evalIn(`roleFocus = normalizeRoleFocus(${JSON.stringify({ role: "Wirt", mode: "manual", startDate: "2026-03-02" })})`);
  equal("Fokus ohne Enddatum läuft weiter", app.roleFocusActiveOn("2027-01-01"), "Wirt");
  equal("Unbekannte Rolle wird abgelehnt", app.normalizeRoleFocus({ role: "Astronaut", mode: "manual" }), null);
  equal("Befristeter Fokus ohne Enddatum wird abgelehnt", app.normalizeRoleFocus({ role: "Wirt", mode: "until" }), null);
  evalIn("roleFocus = null");
  equal("Ohne Fokus gilt wieder die Rotation (Donnerstag)", app.defaultRoleForDate("2026-03-05"), "Unternehmer");
  localStorage.clear();
});

group("Streak-Umrechnung", () => {
  equal("Unter 30 Tagen keine Umrechnung", app.humanDuration(12), "");
  equal("30 Tage", app.humanDuration(30), "≈ 1 Monat");
  equal("100 Tage", app.humanDuration(100), "≈ 3 Monate");
  equal("365 Tage", app.humanDuration(365), "≈ 1 Jahr");
  equal("400 Tage", app.humanDuration(400), "≈ 1 Jahr und 1 Monat");
});

group("Migration alter Einträge", () => {
  localStorage.clear();
  const legacy = {
    role: "Yannick",
    mood: "",
    prayers: { Fajr: "Normal" },
    activities: [{ title: "Gym", role: "Ich-Person" }, { title: "SMA-Arbeitstag", isSma: true }],
    roleplayBalance: { outcome: "fulfilled", modeFit: "fitting" },
    stateCheckins: [{ slot: "morning", time: "08:00", energy: 70, mood: 60 }],
    streaks: { cannabisFree: { days: 40 } },
    ramadanDays: -12,
    notes: "Alter Eintrag"
  };
  const migrated = app.normalizeReview(legacy, "2026-03-02", true);
  equal("Notizen bleiben erhalten", migrated.notes, "Alter Eintrag");
  equal("Gebete bleiben erhalten", migrated.prayers.Fajr, "Normal");
  equal("Fastenzähler bleibt erhalten", migrated.ramadanDays, -12);
  equal("Streaks bleiben erhalten", migrated.streaks.cannabisFree.days, 40);
  equal("Alte Rollenbezeichnung wird abgebildet", migrated.role, "Ich-Person");
  equal("Die Bilanz wird vollständig entfernt", migrated.roleplayBalance, undefined);
  equal("Check-in ohne Taqwa bleibt leer", migrated.stateCheckins[0].taqwa, null);
  equal("Check-in behält Energie und Laune", [migrated.stateCheckins[0].energy, migrated.stateCheckins[0].mood], [70, 60]);
  equal("Historischer Check-in rechnet weiter nach V6",
    app.modeForCheckin(migrated.stateCheckins[0], migrated).score, app.stateScore(70, 60));
  equal("Historische Titel werden zugeordnet", migrated.activities[0].template, "gym");
  equal("isSma bleibt erhalten", migrated.activities[1].isSma, true);

  const modern = app.normalizeReview({
    stateCheckins: [{ slot: "morning", time: "08:00", energy: 70, mood: 60, taqwa: 80 }]
  }, "2026-03-03", true);
  equal("Neuer Check-in speichert Taqwa", modern.stateCheckins[0].taqwa, 80);
  equal("Neuer Check-in rechnet mit drei Werten",
    app.modeForCheckin(modern.stateCheckins[0], modern).score, app.stateScore(70, 60, 80));

  const unknownFields = app.normalizeReview({
    stateCheckins: [{ slot: "morning", time: "08:00", energy: 70, mood: 60, taqwa: 999, unbekannt: true }]
  }, "2026-03-04", true);
  equal("Zu hohe Werte werden begrenzt statt verworfen", unknownFields.stateCheckins[0].taqwa, 100);
  localStorage.clear();
});

group("Tagesmittel", () => {
  const data = {
    stateCheckins: [
      { slot: "morning", energy: 60, mood: 70, taqwa: 80 },
      { slot: "midday", energy: 40, mood: 50, taqwa: null }
    ]
  };
  equal("Energie mittelt alle Check-ins", app.dailyAverageEnergy(data), 50);
  equal("Gottesfurcht mittelt nur erfasste Werte", app.dailyAverageTaqwa(data), 80);
  equal("Ohne Angabe bleibt der Tag leer",
    app.dailyAverageTaqwa({ stateCheckins: [{ slot: "morning", energy: 50, mood: 50 }] }), null);
});

group("Bedeutungstexte der Regler", () => {
  const meanings = evalIn("SLIDER_MEANINGS");
  equal("Energie niedrig", app.sliderMeaning("energy", 10), meanings.energy[0]);
  equal("Laune mittig", app.sliderMeaning("mood", 55), meanings.mood[2]);
  equal("Taqwa hoch", app.sliderMeaning("taqwa", 95), meanings.taqwa[4]);
  equal("Ohne Wert kein Text", app.sliderMeaning("taqwa", null), "");
});

/* ========================================================================== */
console.log(`\n${failures.length ? "FEHLGESCHLAGEN" : "ALLE TESTS BESTANDEN"} – ${passed} Prüfungen erfolgreich, ${failures.length} fehlgeschlagen.`);
if (failures.length) {
  failures.forEach(item => console.log(`  - ${item}`));
  process.exit(1);
}
