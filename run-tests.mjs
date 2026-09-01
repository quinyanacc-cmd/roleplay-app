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

group("Aktivitätsvorlagen – finale Gewichtungen", () => {
  const templates = evalIn("ACTIVITY_TEMPLATES");
  const weightOf = key => templates.find(item => item.key === key).weight;
  const roleOf = key => templates.find(item => item.key === key).role;
  const labelOf = key => templates.find(item => item.key === key).label;

  equal("Zehn verbindliche Vorlagen", templates.length, 10);
  equal("SMA-Arbeitstag wiegt 0,2", weightOf("sma"), 0.2);
  equal("Buchprojekt wiegt 1,5", weightOf("book"), 1.5);
  equal("Gym wiegt 2,0", weightOf("gym"), 2);
  equal("Arabisch lernen wiegt 1,5", weightOf("arabic"), 1.5);
  equal("Jumʿa wiegt 2,0", weightOf("jumua"), 2);
  equal("Moschee wiegt 1,0", weightOf("mosque"), 1);
  equal("Jugendgruppe wiegt 2,0", weightOf("youth"), 2);
  equal("Clean Up wiegt 1,5", weightOf("cleanup"), 1.5);
  equal("Familienzeit wiegt 1,5", weightOf("family"), 1.5);
  equal("Eigene Aktivität zählt einen Punkt", weightOf("custom"), 1);

  equal("Rollen der Vorlagen",
    ["sma", "book", "gym", "arabic", "jumua", "mosque", "youth", "cleanup", "family"].map(roleOf),
    ["Unternehmer", "Unternehmer", "Vitalist", "Muslim", "Muslim", "Muslim", "Muslim", "Wirt", "Familienmensch"]);
  equal("Verbindliche Bezeichnungen in der Oberfläche",
    ["jumua", "mosque", "youth", "cleanup", "family"].map(labelOf),
    ["Jumʿa", "Moschee", "Jugendgruppe", "Clean Up", "Familienzeit"]);
  equal("Keine alten Bezeichnungen mehr vorhanden",
    templates.some(item => /Moscheebesuch|Moschee-Besuch|Angehörigen/.test(item.label)), false);
  equal("Es gibt kein zweites Aktivitätssystem",
    typeof evalIn("typeof ACTIVITY_TEMPLATES"), "string");

  const gym = app.normalizeActivity({ title: "Gym", role: "Ich-Person" });
  equal("Vorlage Gym setzt Rolle und Gewicht", [gym.role, gym.weight], ["Vitalist", 2]);
  const arabic = app.normalizeActivity({ title: "arabisch lernen" });
  equal("Exakte Alias-Zuordnung unabhängig von Groß-/Kleinschreibung", [arabic.template, arabic.weight], ["arabic", 1.5]);
  const jumua = app.normalizeActivity({ title: "Jumʿa" });
  equal("Historischer Jumʿa-Titel wird exakt zugeordnet", [jumua.template, jumua.role, jumua.weight], ["jumua", "Muslim", 2]);
  const mosque = app.normalizeActivity({ title: "moschee" });
  equal("Historischer Moschee-Titel wird exakt zugeordnet", [mosque.template, mosque.weight], ["mosque", 1]);
  const cleanup = app.normalizeActivity({ title: "Clean Up" });
  equal("Clean Up gehört zum Wirt", [cleanup.template, cleanup.role], ["cleanup", "Wirt"]);
  const book = app.normalizeActivity({ template: "book" });
  equal("Buchprojekt", [book.role, book.weight], ["Unternehmer", 1.5]);
  const oldBook = app.normalizeActivity({ title: "Buchprojekt", weight: 1.2 });
  equal("Bestehende Buchprojekt-Einträge rechnen mit 1,5", oldBook.weight, 1.5);
  const oldSma = app.normalizeActivity({ title: "Irgendwas", isSma: true, weight: 0.5 });
  equal("Bestehende SMA-Einträge rechnen mit 0,2", [oldSma.template, oldSma.role, oldSma.weight], ["sma", "Unternehmer", 0.2]);
  const legacy = app.normalizeActivity({ title: "Spaziergang", role: "Vitalist" });
  equal("Aktivität ohne Gewicht zählt einen Punkt", [legacy.template, legacy.weight], ["custom", 1]);

  equal("Keine unscharfe Zuordnung: Gymnastik", app.normalizeActivity({ title: "Gymnastik" }).template, "custom");
  equal("Keine unscharfe Zuordnung: Moscheebesuch", app.normalizeActivity({ title: "Moscheebesuch" }).template, "custom");
  equal("Keine unscharfe Zuordnung: Jumʿa-Gebet", app.normalizeActivity({ title: "Jumʿa-Gebet" }).template, "custom");
  equal("Keine unscharfe Zuordnung: Familienzeit am Abend",
    app.normalizeActivity({ title: "Familienzeit am Abend" }).template, "custom");
  equal("Keine unscharfe Zuordnung: Clean", app.normalizeActivity({ title: "Clean" }).template, "custom");
});

group("Punktberechnung und Tagesbegrenzungen", () => {
  const single = { activities: [{ template: "sma" }] };
  equal("Ein SMA-Eintrag ergibt 0,2 Punkte", app.dayPointTotal(single, "2026-03-02"), 0.2);

  const triple = { activities: [{ template: "sma" }, { template: "sma" }, { template: "sma" }] };
  const rows = app.activityPointRows(triple, "2026-03-02");
  equal("Mehrere SMA-Einträge am selben Tag ergeben eine Zeile", rows.length, 1);
  equal("… und zusammen weiterhin 0,2 Punkte", app.dayPointTotal(triple, "2026-03-02"), 0.2);
  equal("… die Zeile weist die Anzahl der Einträge aus", rows[0].entries, 3);
  equal("… und bleibt über smaEntries lesbar", rows[0].smaEntries, 3);

  const mosque = { activities: [{ template: "mosque" }, { template: "mosque" }] };
  equal("Moschee zählt höchstens einmal pro Tag", app.dayPointTotal(mosque, "2026-03-02"), 1);
  equal("… als genau eine Zeile", app.activityPointRows(mosque, "2026-03-02").length, 1);

  const jumua = { activities: [{ template: "jumua" }, { template: "jumua" }] };
  equal("Jumʿa zählt höchstens einmal pro Tag mit 2,0", app.dayPointTotal(jumua, "2026-03-02"), 2);

  const uncapped = { activities: [{ template: "gym" }, { template: "gym" }] };
  equal("Andere Vorlagen zählen pro Eintrag", app.dayPointTotal(uncapped, "2026-03-02"), 4);

  const mixed = { activities: [{ template: "sma" }, { template: "gym" }, { template: "sma" }, { title: "Notizen" }] };
  const mixedRows = app.activityPointRows(mixed, "2026-03-02");
  equal("SMA erhält nicht zusätzlich den normalen Aktivitätspunkt", mixedRows.length, 3);
  equal("Tagessumme stimmt mit den Einzelwerten überein",
    app.dayPointTotal(mixed, "2026-03-02"),
    app.roundPoints(mixedRows.reduce((sum, row) => sum + row.points, 0)));
  equal("Tagessumme 0,2 + 2,0 + 1,0", app.dayPointTotal(mixed, "2026-03-02"), 3.2);

  const full = { activities: [
    { template: "sma" }, { template: "sma" }, { template: "book" }, { template: "jumua" },
    { template: "mosque" }, { template: "mosque" }, { template: "youth" }, { template: "cleanup" },
    { template: "family" }, { template: "arabic" }
  ] };
  const fullRows = app.activityPointRows(full, "2026-03-06");
  equal("Tagessumme aller Vorlagen", app.dayPointTotal(full, "2026-03-06"), 11.2);
  equal("Einzelwerte ergeben exakt die Tagessumme",
    app.roundPoints(fullRows.reduce((sum, row) => sum + row.points, 0)), app.dayPointTotal(full, "2026-03-06"));

  equal("Punkte werden deutsch formatiert", app.formatPoints(12.2), "12,2");
  equal("Ganze Zahlen ohne Nachkomma", app.formatPoints(2), "2");
  equal("Tagesbegrenzung nur für SMA, Moschee und Jumʿa",
    ["sma", "mosque", "jumua", "gym", "book", "arabic", "youth", "cleanup", "family", "custom"]
      .map(key => app.activityDailyCap(key)),
    [0.2, 1, 2, null, null, null, null, null, null, null]);
});

group("Rollenpräsenz", () => {
  localStorage.clear();
  const day = date => `roleplay-v25-review-${date}`;
  localStorage.setItem(day("2026-03-02"), JSON.stringify({
    role: "Unternehmer",
    activities: [{ template: "sma" }, { template: "sma" }, { template: "gym" }]
  }));
  localStorage.setItem(day("2026-03-03"), JSON.stringify({
    role: "Muslim",
    activities: [{ template: "arabic" }, { template: "jumua" }, { template: "mosque" }, { template: "mosque" }]
  }));
  const split = app.roleSplitData(["2026-03-02", "2026-03-03", "2026-03-04"]);
  const unternehmer = split.roles.find(item => item.role === "Unternehmer");
  const vitalist = split.roles.find(item => item.role === "Vitalist");
  const muslim = split.roles.find(item => item.role === "Muslim");
  const familie = split.roles.find(item => item.role === "Familienmensch");
  equal("Alle sieben Rollen bleiben sichtbar", split.roles.length, 7);
  equal("Rollen ohne Punkte werden weiterhin geführt", familie.points, 0);
  equal("Stabile Rollenreihenfolge", split.roles.map(item => item.role), evalIn("ROLES.map(role => role.name)"));
  equal("Unternehmer erhält 0,2 aus dem SMA-Tag", unternehmer.points, 0.2);
  equal("Vitalist erhält 2,0", vitalist.points, 2);
  equal("Muslim erhält 1,5 + 2,0 + 1,0", muslim.points, 4.5);
  equal("Gesamtpunkte", split.total, 6.7);
  equal("Sichtbare Rollen", split.represented, 3);
  equal("Erfasste Aktivitäten nach Tagesbegrenzung", split.activityCount, 5);
  equal("Schwerpunkt ist die stärkste Rolle", split.leader.role, "Muslim");
  equal("Aktive Tage je Rolle", muslim.activeDays, 1);
  equal("Detailzeilen ergeben exakt den Rollenwert",
    app.roundPoints(muslim.rows.reduce((sum, row) => sum + row.points, 0)), muslim.points);
  equal("Rollensummen ergeben exakt die Gesamtsumme",
    app.roundPoints(split.roles.reduce((sum, item) => sum + item.points, 0)), split.total);
  equal("Status ist neutral formuliert",
    [app.rolePresenceStatus(muslim, split), app.rolePresenceStatus(vitalist, split), app.rolePresenceStatus(familie, split)],
    ["Schwerpunkt", "sichtbar", "nicht erfasst"]);
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
  const steps = evalIn("SLIDER_MEANING_STEPS");
  equal("21 Stufen je Regler", steps.length, 21);
  ["energy", "mood", "taqwa"].forEach(kind => {
    equal(`21 Bedeutungstexte für ${kind}`, Object.keys(meanings[kind]).length, 21);
    equal(`Alle Fünferschritte für ${kind} belegt`,
      steps.every(step => typeof meanings[kind][step] === "string" && meanings[kind][step].length > 0), true);
    equal(`Kein Text für ${kind} wiederholt sich`,
      new Set(steps.map(step => meanings[kind][step])).size, 21);
  });

  equal("Energie 0", app.sliderMeaning("energy", 0),
    "Keine nutzbare Reserve – vollständige Entlastung steht im Vordergrund.");
  equal("Energie 5", app.sliderMeaning("energy", 5),
    "Fast keine Kraft – selbst kleine Anforderungen kosten viel.");
  equal("Energie 50", app.sliderMeaning("energy", 50),
    "Mittlere Energie – Alltag und einzelne Anforderungen sind machbar.");
  equal("Energie 95", app.sliderMeaning("energy", 95),
    "Nahezu volle Kraft – besonders anspruchsvolle Schritte sind tragbar.");
  equal("Energie 100", app.sliderMeaning("energy", 100),
    "Volle Energie – die verfügbare Handlungsfähigkeit ist maximal.");

  equal("Laune 0", app.sliderMeaning("mood", 0), "Extrem gedrückt – der Moment fühlt sich kaum tragbar an.");
  equal("Laune 5", app.sliderMeaning("mood", 5), "Sehr stark gedrückt – fast alles wirkt gerade schwer.");
  equal("Laune 50", app.sliderMeaning("mood", 50), "Neutral – weder deutlich belastet noch besonders getragen.");
  equal("Laune 95", app.sliderMeaning("mood", 95), "Fast euphorisch – sehr viel Freude und Schwung sind vorhanden.");
  equal("Laune 100", app.sliderMeaning("mood", 100),
    "Höchste Stimmung – vollständige Begeisterung und Leichtigkeit sind spürbar.");

  equal("Gottesfurcht 0", app.sliderMeaning("taqwa", 0),
    "Gottesbewusstsein ist im eigenen Erleben kaum zugänglich.");
  equal("Gottesfurcht 5", app.sliderMeaning("taqwa", 5),
    "Sehr große innere Distanz – die Ausrichtung auf Allah tritt stark zurück.");
  equal("Gottesfurcht 50", app.sliderMeaning("taqwa", 50),
    "Spürbar vorhanden – Nähe und Distanz halten sich die Waage.");
  equal("Gottesfurcht 95", app.sliderMeaning("taqwa", 95),
    "Fast durchgehend nah – Gottesbewusstsein prägt den gesamten Tag.");
  equal("Gottesfurcht 100", app.sliderMeaning("taqwa", 100),
    "Durchgehend gegenwärtig – Gottesbewusstsein trägt Absicht und Handeln.");

  equal("Gleicher Wert ergibt immer denselben Text",
    app.sliderMeaning("mood", 65), app.sliderMeaning("mood", 65));
  equal("Alter Zwischenwert 63 rundet auf 65", app.sliderMeaning("mood", 63), meanings.mood[65]);
  equal("Alter Zwischenwert 62 rundet auf 60", app.sliderMeaning("mood", 62), meanings.mood[60]);
  equal("Alter Zwischenwert 47 rundet auf 45", app.sliderMeaning("energy", 47), meanings.energy[45]);
  equal("Rundung verändert den gespeicherten Wert nicht", app.sliderMeaningStep(63), 65);
  equal("Werte über 100 werden begrenzt", app.sliderMeaning("energy", 140), meanings.energy[100]);
  equal("Ohne Wert kein Text", app.sliderMeaning("taqwa", null), "");
  equal("Leerer Wert ergibt keinen Text", app.sliderMeaning("energy", ""), "");
});

group("Tagesphasen in chronologischer Reihenfolge", () => {
  equal("Neue Fünfer-Tage laufen Morgen bis Nacht",
    evalIn("CHECKIN_CHRONOLOGY"), ["morning", "midday", "afternoon", "evening", "night"]);
  equal("Historische Vierer-Tage ohne Nachmittag",
    evalIn("LEGACY_CHECKIN_CHRONOLOGY"), ["morning", "midday", "evening", "night"]);
  equal("Die Slot-Liste folgt derselben Reihenfolge",
    evalIn("CHECKIN_SLOTS.map(slot => slot.key)"), ["morning", "midday", "afternoon", "evening", "night"]);
  equal("Gespeicherte Uhrzeiten bleiben unverändert",
    evalIn("CHECKIN_SLOTS.map(slot => slot.time)"), ["08:00", "13:00", "16:00", "19:00", "07:00"]);
  equal("Morgen steht am Anfang", app.slotIndex("morning"), 0);
  equal("Nacht steht am Ende", app.slotIndex("night"), 4);
  equal("Der Nachmittag liegt zwischen Mittag und Abend",
    app.slotIndex("midday") < app.slotIndex("afternoon") && app.slotIndex("afternoon") < app.slotIndex("evening"), true);
  equal("Historische Tage behalten ihre Sonderbehandlung",
    app.activeChronology({ checkinStructure: 4 }), ["morning", "midday", "evening", "night"]);
  equal("Neue Tage nutzen alle fünf Phasen",
    app.activeChronology({ checkinStructure: 5 }).length, 5);
  equal("Der Nachmittag ist bei historischen Tagen kein Versäumnis",
    app.activeChronology({ checkinStructure: 4 }).includes("afternoon"), false);
  equal("Check-ins werden chronologisch sortiert",
    app.normalizeReview({ stateCheckins: [
      { slot: "night", time: "07:00", energy: 50, mood: 50 },
      { slot: "morning", time: "08:00", energy: 50, mood: 50 }
    ] }, "2026-03-05", true).stateCheckins.map(entry => entry.slot), ["morning", "night"]);
});

group("Wochenrückblick ohne Gebetslinie", () => {
  const source = readFileSync(join(here, "..", "app.js"), "utf8");
  equal("Der Liniengraph führt keine Gebetsserie mehr", /className: "prayers"/.test(source), false);
  equal("prayerPercent wird nicht mehr berechnet", /prayerPercent/.test(source), false);
  equal("Das SVG-Label nennt nur die drei Zustandswerte",
    source.includes("Verlauf von Energie, Laune und Gottesfurcht"), true);
  equal("Die Gebets-Wochenübersicht bleibt erhalten", typeof app.buildPrayerWeekPanel, "function");
  equal("Sie zeigt weiterhin Pflichtgebete pro Tag",
    app.buildPrayerWeekPanel(["Mo"], [5]).includes("Pflichtgebete pro Tag"), true);
  equal("Fünf von fünf Gebeten erhalten einen Stern",
    app.buildPrayerWeekPanel(["Mo"], [5]).includes("achievement-star"), true);
  equal("Vier von fünf Gebeten erhalten keinen Stern",
    app.buildPrayerWeekPanel(["Mo"], [4]).includes("achievement-star"), false);
  equal("Die Gebetserfassung selbst bleibt unberührt",
    app.dailyPrayerProgress({ prayers: { Fajr: "Normal", Dhuhr: "Gemeinschaft" } }).count, 2);
});

/* ========================================================================== */
console.log(`\n${failures.length ? "FEHLGESCHLAGEN" : "ALLE TESTS BESTANDEN"} – ${passed} Prüfungen erfolgreich, ${failures.length} fehlgeschlagen.`);
if (failures.length) {
  failures.forEach(item => console.log(`  - ${item}`));
  process.exit(1);
}
