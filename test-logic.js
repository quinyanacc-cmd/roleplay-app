/* ==========================================================================
   ROLEPLAY – Tests der Kernlogik

       node test-logic.js

   Ohne Netzwerk, ohne Abhängigkeiten. Geprüft wird ausschließlich logic.js:
   Datumsrechnung, Profilmodell, Migration, Auswertung.
   ========================================================================== */

const L = require("./logic.js");

let passed = 0;
const failures = [];

function check(label, condition, detail = "") {
  if (condition) { passed += 1; return; }
  failures.push(`${label}${detail ? ` → ${detail}` : ""}`);
}

function equal(label, actual, expected) {
  check(label, JSON.stringify(actual) === JSON.stringify(expected), `erhalten ${JSON.stringify(actual)}, erwartet ${JSON.stringify(expected)}`);
}

function section(title) { console.log(`\n${title}`); }

/* -------------------------------------------------------------------------- */
section("Datum");

equal("addDays über den Monatswechsel", L.addDays("2026-01-31", 1), "2026-02-01");
equal("addDays rückwärts", L.addDays("2026-03-01", -1), "2026-02-28");
equal("addMonths kappt auf den letzten Tag", L.addMonths("2026-01-31", 1), "2026-02-28");
equal("mondayOf am Sonntag", L.mondayOf("2026-09-13"), "2026-09-07");
equal("mondayOf am Montag", L.mondayOf("2026-09-07"), "2026-09-07");
equal("sundayOf", L.sundayOf("2026-09-07"), "2026-09-13");
equal("weekDates umfasst sieben Tage", L.weekDates("2026-09-11").length, 7);
equal("monthDates im Februar", L.monthDates("2026-02").length, 28);
equal("firstOfMonth", L.firstOfMonth("2026-09-11"), "2026-09-01");
equal("lastOfMonth", L.lastOfMonth("2026-09-11"), "2026-09-30");
equal("daysBetween", L.daysBetween("2026-09-01", "2026-09-11"), 10);
equal("datesBetween ist einschließend", L.datesBetween("2026-09-01", "2026-09-03"), ["2026-09-01", "2026-09-02", "2026-09-03"]);
check("todayISO hat das ISO-Format", L.isISODate(L.todayISO()));
equal("humanDuration unter 30 Tagen bleibt leer", L.humanDuration(12), "");
equal("humanDuration in Monaten", L.humanDuration(90), "≈ 3 Monate");
equal("humanDuration in Jahren", L.humanDuration(400), "≈ 1 Jahr und 1 Monat");

/* -------------------------------------------------------------------------- */
section("Text und Farbe");

equal("escapeHTML entschärft Markup", L.escapeHTML('<b>"x"</b>'), "&lt;b&gt;&quot;x&quot;&lt;/b&gt;");
check("linkifyText erzeugt einen Link", L.linkifyText("siehe https://example.org").includes('href="https://example.org"'));
check("linkifyText entschärft trotzdem", L.linkifyText("<script>").includes("&lt;script&gt;"));
equal("slugify bildet Umlaute ab", L.slugify("Körper & Geist"), "koerper-geist");
equal("slugify fällt zurück", L.slugify("!!!", "rolle"), "rolle");
equal("uniqueId zählt hoch", L.uniqueId("rolle", ["rolle", "rolle-2"]), "rolle-3");
equal("pluralDE Einzahl", L.pluralDE(1, "Tag", "Tage"), "1 Tag");
equal("pluralDE Mehrzahl", L.pluralDE(3, "Tag", "Tage"), "3 Tage");
equal("joinDE verbindet mit und", L.joinDE(["A", "B", "C"]), "A, B und C");
equal("hexToRgba", L.hexToRgba("#ffffff", .5), "rgba(255,255,255,0.5)");
equal("readableTextColor auf hell", L.readableTextColor("#F2C94C"), "#15181f");
equal("readableTextColor auf dunkel", L.readableTextColor("#193C8C"), "#ffffff");
check("nextRoleColor meidet belegte Farben", L.nextRoleColor([L.ROLE_COLORS[0]]) !== L.ROLE_COLORS[0]);

/* -------------------------------------------------------------------------- */
section("Rollenmodus");

equal("Zwei Werte behalten die bisherige Gewichtung", L.stateScore([40, 80]), Math.round(40 * .42 + 80 * .58));
equal("Drei Werte behalten die bisherige Gewichtung", L.stateScore([40, 80, 60]), Math.round(40 * .32 + 80 * .36 + 60 * .32));
equal("Vier Werte werden gleich gewichtet", L.stateScore([40, 40, 40, 40]), 40);
equal("Fehlende Werte fallen heraus", L.stateScore([null, 80]), 80);
equal("Ohne Werte kein Ergebnis", L.stateScore([null, null]), null);

equal("Ein sehr niedriger Wert erzwingt den Schon-Modus", L.resolveMode([10, 95]).key, "gentle");
equal("Niedrige Energie begrenzt auf Minimum", L.resolveMode([30, 70]).key, "minimum");
equal("Sehr gute Laune hebt eine Begrenzung um eine Stufe", L.resolveMode([30, 85]).key, "standard");
check("Die Anhebung wird ausgewiesen", L.resolveMode([30, 85]).lifted === true);
equal("Hohe Werte ergeben den Entwicklungsmodus", L.resolveMode([95, 95]).key, "development");
equal("Ohne Werte kein Modus", L.resolveMode([]), null);
equal("Frühere Modusschlüssel werden abgebildet", L.modeKey("peak"), "development");
equal("Unbekannte Schlüssel bleiben leer", L.modeKey("phantasie"), "");

/* -------------------------------------------------------------------------- */
section("Coach-Impuls");

const impulse = L.coachImpulse([85, 85], "development");
equal("Kategorie bei zwei hohen Werten", impulse.category, "bothHigh");
check("Der Kernsatz stammt aus der Tabelle", impulse.core === L.MODE_COACH_CORE.development);
equal("Gleiche Werte ergeben denselben Text", L.coachImpulse([50, 50], "standard"), L.coachImpulse([50, 50], "standard"));
equal("Ohne Modus kein Impuls", L.coachImpulse([50, 50], ""), null);
equal("Führende zweite Skala", L.coachStateCategory(40, 70), "secondLeads");
equal("Führende erste Skala", L.coachStateCategory(70, 40), "firstLeads");
equal("Ausgeglichen", L.coachStateCategory(60, 62), "balanced");

/* -------------------------------------------------------------------------- */
section("Bedeutungstexte der Regler");

const energyScale = { id: "energy", preset: "energy", lowLabel: "niedrig", highLabel: "hoch" };
equal("Vorlage liefert einen festen Satz", L.scaleMeaning(energyScale, 60), L.SCALE_MEANING_PRESETS.energy.texts[60]);
equal("Zwischenwerte runden auf Fünferschritte", L.scaleMeaning(energyScale, 62), L.SCALE_MEANING_PRESETS.energy.texts[60]);
check("Jede Vorlage deckt alle 21 Stufen ab",
  L.SCALE_PRESET_KEYS.every(key => Object.keys(L.SCALE_MEANING_PRESETS[key].texts).length === 21));
const ownScale = { id: "ruhe", preset: "", lowLabel: "unruhig", highLabel: "gelassen" };
check("Eigene Skalen bekommen einen abgeleiteten Satz", L.scaleMeaning(ownScale, 90).includes("gelassen"));
check("Auch am unteren Ende", L.scaleMeaning(ownScale, 10).includes("unruhig"));
equal("Ohne Wert kein Satz", L.scaleMeaning(ownScale, null), "");

/* -------------------------------------------------------------------------- */
section("Profil");

const empty = L.emptyProfile();
check("Ein neues Profil ist leer", L.profileIsEmpty(empty));
equal("Ein neues Profil hat keine Rollen", empty.roles.length, 0);
equal("Ein neues Profil hat keine Tracker", empty.trackers.length, 0);
equal("Es gibt zwei Grundskalen", empty.scales.map(scale => scale.id), ["energy", "mood"]);
check("Beide Grundskalen bilden den Modus", empty.scales.every(scale => scale.inMode));
check("Es ist noch kein Onboarding gelaufen", empty.onboardedAt === "");

const custom = L.normalizeProfile({
  roles: [
    { name: "Körper", emoji: "🧬", color: "#2EC4B6", activeDays: [2, 2, 9], goals: [{ title: "Laufen" }, { title: "" }] },
    { name: "Körper", emoji: "🏃" }
  ]
});
equal("Gleichnamige Rollen bekommen eigene Kennungen", custom.roles.map(role => role.id), ["koerper", "koerper-2"]);
equal("Wochentage werden entdoppelt und gefiltert", custom.roles[0].activeDays, [2]);
equal("Leere Ziele fallen weg", custom.roles[0].goals.length, 1);
equal("Die Textfarbe entsteht aus der Rollenfarbe", custom.roles[0].text, L.readableTextColor("#2EC4B6"));
equal("Die Reihenfolge ist lückenlos", custom.roles.map(role => role.order), [0, 1]);

const single = L.normalizeProfile({ roles: [{ name: "Solo" }] });
equal("Bei genau einer Rolle ist sie immer die Rolle des Tages", L.rotationRoleId(single, "2026-09-11"), "solo");
const rotation = L.normalizeProfile({ roles: [{ name: "A" }, { name: "B", activeDays: [5] }] });
equal("Am passenden Wochentag greift die Rotation", L.rotationRoleId(rotation, "2026-09-11"), "b");
equal("Ohne passenden Wochentag bleibt die Rolle offen", L.rotationRoleId(rotation, "2026-09-14"), "");
const noRotation = L.normalizeProfile({ roles: [{ name: "A" }, { name: "B", activeDays: [5] }], settings: { roleRotation: false } });
equal("Abgeschaltete Rotation schlägt nichts vor", L.rotationRoleId(noRotation, "2026-09-11"), "");

check("Archivierte Rollen verschwinden aus dem Alltag",
  L.activeRoles(L.normalizeProfile({ roles: [{ name: "Alt", archived: true }] })).length === 0);
check("Mindestens eine Skala bildet immer den Modus",
  L.modeScales(L.normalizeProfile({ scales: [{ label: "X", inMode: false }] })).length > 0);
check("Ohne Skalen kehren die Grundskalen zurück",
  L.normalizeProfile({ scales: [] }).scales.length === 2);

/* -------------------------------------------------------------------------- */
section("Tracker");

const checklist = L.normalizeTracker({ label: "Medikamente", type: "checklist", items: [{ label: "Morgens" }, { label: "Abends" }] }, 0, []);
equal("Checklistenpunkte bekommen Kennungen", checklist.items.map(item => item.id), ["morgens", "abends"]);
equal("Der erste Zustand ist immer offen", checklist.states[0].id, "");
equal("Ein leerer Checklistenwert ist je Punkt offen", L.emptyTrackerValue(checklist), { morgens: "", abends: "" });
equal("Unbekannte Zustände fallen auf offen zurück",
  L.normalizeTrackerValue(checklist, { morgens: "erfunden", abends: "done" }), { morgens: "", abends: "done" });
check("Ein gesetzter Punkt zählt als Wert", L.trackerHasValue(checklist, { morgens: "done", abends: "" }));
check("Eine leere Checkliste zählt nicht", !L.trackerHasValue(checklist, { morgens: "", abends: "" }));

const counter = L.normalizeTracker({ label: "Wasser", type: "counter", step: 0.5, unit: "Liter", target: 2, decimals: 1 }, 0, []);
equal("Zähler starten bei null", L.emptyTrackerValue(counter), 0);
check("Null zählt beim Zähler nicht als Wert", !L.trackerHasValue(counter, 0));
check("Ein positiver Zähler zählt", L.trackerHasValue(counter, 1.5));

const choice = L.normalizeTracker({ label: "Schlaf", type: "choice", options: [{ label: "Gut", score: 90 }] }, 0, []);
equal("Auswahloptionen bekommen Kennungen", choice.options[0].id, "gut");
equal("Unbekannte Auswahl wird verworfen", L.normalizeTrackerValue(choice, "phantasie"), "");
equal("Eine Auswahl ohne Optionen bekommt zwei Standardoptionen",
  L.normalizeTracker({ label: "X", type: "choice" }, 0, []).options.length, 2);

equal("Ja/Nein ist immer ein Wahrheitswert", L.normalizeTrackerValue(L.normalizeTracker({ label: "F", type: "toggle" }, 0, []), "ja"), true);
equal("Text bleibt Text", L.normalizeTrackerValue(L.normalizeTracker({ label: "N", type: "text" }, 0, []), 42), "42");

/* -------------------------------------------------------------------------- */
section("Migration eines Bestands aus Version 6");

const legacyDay = {
  role: "Muslim",
  prayers: { Fajr: "Normal", Dhuhr: "Nicht gebetet", "ʿAsr": "", Maghrib: "", "ʿIschāʾ": "" },
  sunnahPrayers: { Witr: "Verrichtet" },
  water: 1500, steps: "8200",
  sleepQualityScore: 1, dreamCategory: "pleasant", dreams: "Ein Traum",
  mealCategories: { breakfast: "balanced", lunch: "", dinner: "", snack: "" },
  breakfast: "Haferbrei",
  gratitude1: "Gesundheit", gratitude2: "", allahName: "Ar-Rahmān",
  ramadanDays: -12, fastingCompleted: true,
  morningRoutineState: "done", eveningRoutine: true,
  streaks: { smokeFree: { days: 42, broken: false, todayStatus: "" }, cannabisFree: { days: 7, broken: false, todayStatus: "protected" } },
  activities: [
    { title: "Gym", role: "Vitalist", template: "gym" },
    { title: "SMA-Arbeitstag", role: "Unternehmer", template: "sma", isSma: true },
    { title: "SMA-Arbeitstag", role: "Unternehmer", template: "sma", isSma: true },
    { title: "Eigenes", role: "Yannick", template: "custom", weight: 1 }
  ],
  stateCheckins: [{ id: "a", slot: "morning", time: "08:00", energy: 55, mood: 70, taqwa: 65 }],
  responsibilityMain: "Arbeit", notes: "Notiz"
};
const legacyReviews = [{ date: "2026-09-10", data: legacyDay }];
const migrated = L.buildMigratedProfile(legacyReviews, { morning: { title: "Morgenroutine", items: [] } });

equal("Alle sieben Rollen werden übernommen", migrated.roles.length, 7);
equal("Die Wochentagsrotation bleibt erhalten", migrated.roles.map(role => role.activeDays[0]), [1, 2, 3, 4, 5, 6, 0]);
equal("Die dritte Skala entsteht aus der Gottesfurcht", migrated.scales.map(scale => scale.id), ["energy", "mood", "taqwa"]);
equal("Die Gottesfurcht behält ihren Namen", migrated.scales[2].label, "Gottesfurcht");
check("Sie bildet weiterhin den Modus mit", migrated.scales[2].inMode);
check("Die Gebete werden zu einer Checkliste", migrated.trackers.some(tracker => tracker.id === "prayers" && tracker.type === "checklist"));
equal("Die Gebetszustände bleiben unverändert",
  L.findTracker(migrated, "prayers").states.map(state => state.id),
  ["", "Normal", "Gemeinschaft", "Verspätet", "Nachgeholt", "Nicht gebetet"]);
check("Wasser wird ein Zähler", L.findTracker(migrated, "water").type === "counter");
check("Schritte werden eine Zahl", L.findTracker(migrated, "steps").type === "number");
check("Schlafqualität wird eine Auswahl", L.findTracker(migrated, "sleepQuality").type === "choice");
check("Dankbarkeit wird ein Textfeld", L.findTracker(migrated, "gratitude1").type === "text");
check("Der Fastentag wird ein Schalter", L.findTracker(migrated, "fastingCompleted").type === "toggle");
equal("Nur tatsächlich benutzte Streaks wandern mit", migrated.streaks.map(streak => streak.id).sort(), ["cannabisFree", "smokeFree"]);
check("Die Aktivitätsvorlagen bleiben erhalten", migrated.activityTemplates.some(template => template.id === "sma" && template.dailyCap === 0.2));
check("Das Onboarding entfällt für bestehende Nutzer", Boolean(migrated.onboardedAt));

const emptyMigration = L.buildMigratedProfile([{ date: "2026-09-10", data: { stateCheckins: [{ slot: "morning", energy: 50, mood: 50 }] } }], {});
equal("Ohne Gebete entsteht kein Gebetstracker", emptyMigration.trackers.filter(tracker => tracker.id === "prayers").length, 0);
equal("Ohne Gottesfurcht bleibt es bei zwei Skalen", emptyMigration.scales.length, 2);

/* -------------------------------------------------------------------------- */
section("Tageseintrag");

const review = L.normalizeReview(legacyDay, "2026-09-10", migrated, { hasStored: true, today: "2026-09-11" });
equal("Die Rolle wird über ihren Namen aufgelöst", review.roleId, "muslim");
equal("Die Gebete landen in den Trackern", review.trackers.prayers.Fajr, "Normal");
equal("Der Gebetszustand bleibt wortgleich", review.trackers.prayers.Dhuhr, "Nicht gebetet");
equal("Milliliter werden zu Litern", review.trackers.water, 1.5);
equal("Schritte bleiben eine Zahl", review.trackers.steps, 8200);
equal("Die Schlafqualität behält ihren Schlüssel", review.trackers.sleepQuality, "1");
equal("Die Mahlzeitkategorie wandert mit", review.trackers["meal-breakfast"], "balanced");
equal("Die Mahlzeitnotiz wandert mit", review.trackers["mealNote-breakfast"], "Haferbrei");
equal("Der Fastentag wandert mit", review.trackers.fastingCompleted, true);
equal("Die Check-in-Werte liegen als Skalen vor", review.stateCheckins[0].scales, { energy: 55, mood: 70, taqwa: 65 });
equal("Die alten Felder bleiben zusätzlich bestehen", review.stateCheckins[0].energy, 55);
equal("Die Morgenroutine behält ihren Status", review.routineStates.morning, "done");
equal("Die Abendroutine wird aus dem Wahrheitswert abgeleitet", review.routineStates.evening, "done");
equal("Streakstände bleiben erhalten", review.streaks.smokeFree.days, 42);
equal("Der frühere Status protected heißt jetzt held", review.streaks.cannabisFree.todayStatus, "held");
equal("Aktivitäten bekommen Rollenkennungen", review.activities.map(item => item.roleId), ["vitalist", "unternehmer", "unternehmer", "ich-person"]);
equal("Die Notiz bleibt erhalten", review.notes, "Notiz");

const idempotent = L.normalizeReview(review, "2026-09-10", migrated, { hasStored: true, today: "2026-09-11" });
equal("Erneutes Normalisieren ändert nichts mehr", idempotent.trackers, review.trackers);

const fresh = L.normalizeReview({}, "2026-09-11", migrated, { hasStored: false, today: "2026-09-11", previousData: review });
equal("Ein neuer Tag erbt die Rolle aus der Rotation", fresh.roleId, "muslim");
equal("Ein neuer Tag zählt den Streak weiter", fresh.streaks.smokeFree.days, 43);

const broken = L.normalizeReview({}, "2026-09-11", migrated, {
  hasStored: false, today: "2026-09-11",
  previousData: { streaks: { smokeFree: { days: 42, broken: true } } }
});
equal("Nach einer Unterbrechung beginnt der Streak neu", broken.streaks.smokeFree.days, 0);

/* -------------------------------------------------------------------------- */
section("Check-in-Ablauf");

const dayWithTwo = { checkinStructure: 5, stateCheckins: [{ slot: "morning", time: "08:00", scales: {} }, { slot: "evening", time: "19:00", scales: {} }] };
equal("Offen ist die erste Lücke in fester Reihenfolge", L.pendingSlotKey(dayWithTwo), "midday");
equal("Der letzte Eintrag der Reihenfolge zählt", L.latestCheckin(dayWithTwo).slot, "evening");
equal("Historische Tage kennen keinen Nachmittag", L.activeChronology({ checkinStructure: 4 }), L.LEGACY_CHECKIN_CHRONOLOGY);
equal("Alle Phasen erfasst heißt: nichts offen",
  L.pendingSlotKey({ checkinStructure: 5, stateCheckins: L.CHECKIN_CHRONOLOGY.map(slot => ({ slot, time: "12:00" })) }), null);
equal("Das Tagesmittel einer Skala",
  L.dailyScaleAverage({ stateCheckins: [{ scales: { energy: 40 } }, { scales: { energy: 60 } }] }, "energy"), 50);
equal("Ohne Werte kein Mittel", L.dailyScaleAverage({ stateCheckins: [] }, "energy"), null);

/* -------------------------------------------------------------------------- */
section("Rollenpräsenz");

const rows = L.activityPointRows(review, "2026-09-10", migrated);
equal("Tagesbegrenzte Vorlagen ergeben genau eine Zeile", rows.filter(row => row.templateId === "sma").length, 1);
equal("Die Tagesbegrenzung bestimmt den Wert", rows.find(row => row.templateId === "sma").points, 0.2);
equal("Die Zeile weist beide Einträge aus", rows.find(row => row.templateId === "sma").entries, 2);
equal("Die Tagessumme stimmt mit den Zeilen überein", L.dayPointTotal(review, "2026-09-10", migrated), L.roundPoints(2 + 0.2 + 1));

const presence = L.rolePresence([{ date: "2026-09-10", data: review }], migrated);
equal("Alle Rollen bleiben sichtbar", presence.items.length, 7);
equal("Der Schwerpunkt ist die stärkste Rolle", presence.leader.roleId, "vitalist");
equal("Nicht erfasste Rollen stehen auf null", presence.items.find(item => item.roleId === "wirt").points, 0);
equal("formatPoints nutzt das Komma", L.formatPoints(1.5), "1,5");
equal("Ganze Zahlen bleiben ohne Komma", L.formatPoints(2), "2");

/* -------------------------------------------------------------------------- */
section("Zeitraum und Rückblick");

const dates = L.weekDates("2026-09-10");
const entries = dates.map(date => ({
  date,
  data: date === "2026-09-10" ? review : L.normalizeReview({}, date, migrated, { hasStored: false, today: "2026-09-11" }),
  stored: date === "2026-09-10"
}));
const stats = L.buildPeriodStats(dates, entries, migrated, { routineTitles: { morning: "Morgenroutine" } });
equal("Der Zeitraum umfasst sieben Tage", stats.days, 7);
equal("Nur gespeicherte Tage zählen als erfasst", stats.trackedDays, 1);
equal("Die Check-ins werden gezählt", stats.checkinCount, 1);
equal("Für jede Skala gibt es eine Reihe", stats.scales.length, 3);
equal("Tage ohne Eintrag bleiben leer", stats.scales[0].perDay.filter(value => value === null).length, 6);
check("Die Routine erscheint mit ihrem Titel", stats.routines.some(item => item.title === "Morgenroutine"));

const insights = L.buildInsights(stats, migrated, { kind: "week" });
check("Jeder Rückblicksatz ist einer Gruppe zugeordnet", insights.every(item => typeof item.group === "string" && item.group));
check("Der erste Satz fasst den Zeitraum zusammen", insights[0].group === "overview");
check("Die Routine wird mit Titel benannt", insights.some(item => item.text.includes("Morgenroutine")));
check("Nicht erfasste Rollen werden benannt", insights.some(item => item.tone === "hint" && item.text.includes("Ohne Eintrag")));

const emptyStats = L.buildPeriodStats(dates, dates.map(date => ({ date, data: L.normalizeReview({}, date, migrated, { hasStored: false }), stored: false })), migrated);
const emptyInsights = L.buildInsights(emptyStats, migrated, { kind: "week" });
equal("Ein leerer Zeitraum ergibt genau einen Hinweis", emptyInsights.length, 1);
equal("Und zwar einen leeren", emptyInsights[0].tone, "empty");

equal("trendDelta rechnet die Differenz", L.trendDelta(70, 60), 10);
equal("Ohne Vorwert kein Trend", L.trendDelta(70, null), null);

/* -------------------------------------------------------------------------- */
section("Zusammenhänge");

const sleepTracker = L.findTracker(migrated, "sleepQuality");
const energyScaleObj = migrated.scales[0];
const pairs = Array.from({ length: 8 }, (_, index) => ({
  date: L.addDays("2026-09-01", index),
  stored: true,
  data: {
    trackers: { sleepQuality: index % 2 ? "0" : "5" },
    stateCheckins: [{ scales: { energy: index % 2 ? 80 : 40 } }]
  }
}));
const pattern = L.choiceScalePattern(pairs, sleepTracker, energyScaleObj);
check("Ein klarer Zusammenhang wird erkannt", pattern !== null);
check("Und verständlich formuliert", pattern.text.includes("Energie"));
equal("Zu wenige Paare ergeben keine Aussage", L.choiceScalePattern(pairs.slice(0, 3), sleepTracker, energyScaleObj), null);

/* -------------------------------------------------------------------------- */
section("Routinen");

const routines = L.normalizeRoutines({
  abend: { title: "Abendroutine", order: 1, items: [{ title: "Kerze", minutes: 300 }] },
  morgen: { title: "Morgenroutine", order: 0, items: [{ title: "Wasser", minutes: 2 }, { title: "Sitzen", minutes: 5 }] }
});
equal("Die Reihenfolge entscheidet", L.orderedRoutineKeys(routines), ["morgen", "abend"]);
equal("Die Dauer wird begrenzt", routines.abend.items[0].minutes, 180);
equal("Die Gesamtdauer summiert die Schritte", L.routineMinutes(routines.morgen), 7);
equal("Der Fortschritt zählt erledigt und übersprungen",
  L.routineProgressOf(routines.morgen, { [routines.morgen.items[0].id]: "done", [routines.morgen.items[1].id]: "skipped" }),
  { done: 1, resolved: 2, total: 2 });
check("Bewusst ausgelassen zählt wie erledigt", L.isRoutineSettled("responsiblySkipped"));
check("Nicht erledigt zählt nicht", !L.isRoutineSettled("missed"));

/* -------------------------------------------------------------------------- */
console.log(`\n${failures.length ? "FEHLGESCHLAGEN" : "BESTANDEN"} – ${passed} Prüfungen erfolgreich, ${failures.length} fehlgeschlagen.`);
failures.forEach(failure => console.log(`  ✗ ${failure}`));
process.exit(failures.length ? 1 : 0);
