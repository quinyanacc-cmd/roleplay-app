/* ==========================================================================
   ROLEPLAY – Struktur- und Verdrahtungstests

       node test-dom.js

   Geprüft werden index.html, style.css, app.js, logic.js, der Service Worker
   und das Manifest: Syntax, Vorhandensein aller Bedienelemente, die
   Zentrierungsregeln der Dialoge und dass jede im Code angesprochene
   Element-ID auch wirklich existiert.

   Ohne Netzwerk und ohne Abhängigkeiten – es wird nur das Dateisystem und
   das eingebaute vm-Modul benutzt.
   ========================================================================== */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dir = __dirname;
const read = name => fs.readFileSync(path.join(dir, name), "utf8");

let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) { passed += 1; return; }
  failures.push(`${name}${detail ? ` → ${detail}` : ""}`);
}

function eq(name, actual, expected) {
  check(name, actual === expected, `erhalten ${JSON.stringify(actual)}, erwartet ${JSON.stringify(expected)}`);
}

const html = read("index.html");
const css = read("style.css");
const app = read("app.js");
const logic = read("logic.js");
const sw = read("service-worker.js");
const manifest = read("manifest.webmanifest");
const readme = read("README.md");

/* --------------------------------------------------------------------------
   1. Syntaxprüfung aller JavaScript-Dateien
   -------------------------------------------------------------------------- */

["logic.js", "app.js", "service-worker.js", "test-logic.js", "test-dom.js"].forEach(file => {
  try { new vm.Script(read(file), { filename: file }); check(`Syntax in Ordnung: ${file}`, true); }
  catch (error) { check(`Syntax in Ordnung: ${file}`, false, error.message); }
});

/* Beide Skripte teilen sich im Browser einen globalen Gültigkeitsbereich.
   Eine doppelte Deklaration wäre dort ein harter SyntaxError – hier wird sie
   durch gemeinsames Kompilieren zuverlässig gefunden. */
try {
  new vm.Script(`${logic}\n${app}`, { filename: "logic.js+app.js" });
  check("logic.js und app.js deklarieren nichts doppelt", true);
} catch (error) {
  check("logic.js und app.js deklarieren nichts doppelt", false, error.message);
}

/* Kommentare enthalten absichtlich Wörter wie „localStorage“ – geprüft wird
   deshalb ausschließlich der ausführbare Teil der Datei. */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`])\/\/[^\n]*/g, "$1 ");
}
const logicCode = stripComments(logic);
const appCode = stripComments(app);

check("logic.js verwendet kein document", !/\bdocument\./.test(logicCode));
check("logic.js verwendet kein window", !/\bwindow\./.test(logicCode));
check("logic.js verwendet kein localStorage", !/localStorage/.test(logicCode));
check("logic.js ist in Node ladbar", typeof require("./logic.js").buildReport === "function");

/* --------------------------------------------------------------------------
   2. Version, Service Worker, Manifest
   -------------------------------------------------------------------------- */

check("App-Version ist 8.0.0", app.includes('const APP_VERSION = "8.0.0"'));
check("Storage-Namespace bleibt roleplay-v25", app.includes('const STORAGE_NAMESPACE = "roleplay-v25"'));
check("Service-Worker-Cache auf 8.0.0 aktualisiert", sw.includes('const CACHE = "roleplay-v8-0-0"'));
check("Keine alte Cache-Version mehr enthalten", !sw.includes("roleplay-v6-0-0"));
check("Service Worker cacht logic.js", sw.includes('"./logic.js"'));
check("Service Worker cacht app.js", sw.includes('"./app.js"'));
check("Manifest ist gültiges JSON", (() => { try { JSON.parse(manifest); return true; } catch { return false; } })());
check("README nennt Version 8.0.0", readme.includes("8.0.0"));

/* --------------------------------------------------------------------------
   3. Skriptreihenfolge und Grundgerüst
   -------------------------------------------------------------------------- */

check("logic.js wird vor app.js geladen",
  html.indexOf('src="logic.js"') > -1 && html.indexOf('src="logic.js"') < html.indexOf('src="app.js"'));
check("Kein Framework eingebunden", !/react|vue|angular|jquery/i.test(html));
check("Keine externe Skriptquelle", !/<script[^>]+src="https?:/i.test(html));
check("Keine externe Stilquelle", !/<link[^>]+href="https?:/i.test(html));
check("viewport-fit=cover für Safe Areas", html.includes("viewport-fit=cover"));
check("Kein user-scalable=no", !html.includes("user-scalable"));

/* --------------------------------------------------------------------------
   4. Bestehende Funktionen sind erhalten geblieben
   -------------------------------------------------------------------------- */

[
  ["Tagesreflexion", 'id="reviewPage"'],
  ["Fünf Check-ins", 'id="checkinSlots"'],
  ["Rollenmodus-Anzeige", 'id="currentStateSummary"'],
  ["Pflichtgebete", 'id="prayerList"'],
  ["Sunnah-Gebete", 'id="sunnahPrayerList"'],
  ["Routinen", 'id="routinesPage"'],
  ["Aktivitäten", 'id="activityList"'],
  ["Ernährung", 'id="breakfastCategory"'],
  ["Wasser", 'id="waterTracker"'],
  ["Schritte", 'id="steps"'],
  ["Dankbarkeit", 'id="gratitude1"'],
  ["Tagesnotiz", 'id="notes"'],
  ["Kalender", 'id="calendarDialog"'],
  ["Streaks", 'id="streakList"'],
  ["Backup speichern", 'id="exportBackup"'],
  ["Backup importieren", 'id="importBackupButton"'],
  ["CSV-Export", 'id="exportCsv"']
].forEach(([label, needle]) => check(`Bestehende Funktion erhalten: ${label}`, html.includes(needle)));

check("Coach-Impuls bleibt erhalten", app.includes("function coachImpulse("));
check("Rollenmodus-Berechnung bleibt erhalten", app.includes("function resolveMode("));
check("Streak-Fortschreibung bleibt erhalten", app.includes("function propagateStreaksForward("));
check("Sichtschutz für Streaks bleibt erhalten", html.includes('id="streakPrivacyDialog"'));
check("Unterbrechungsschaltfläche bleibt erhalten", app.includes('data-streak-daily="lapse"'));
check("Manuell veränderbarer Tagesstand bleibt erhalten", app.includes('data-streak-days='));

/* --------------------------------------------------------------------------
   5. Neue Auswertungsseite
   -------------------------------------------------------------------------- */

check("Auswertungsseite vorhanden", html.includes('id="analysisPage"'));
[
  ["Report / Stimme aus dem Off", 'id="analysisReport"'],
  ["Rollenkompass", 'id="analysisCompass"'],
  ["Energie, Laune und Check-in-Verlauf", 'id="analysisState"'],
  ["Routinen und Pflichtgebete", 'id="analysisRoutines"'],
  ["Fasten und Streaks", 'id="analysisFasting"'],
  ["Datenbasis und Export", 'id="analysisData"']
].forEach(([label, needle]) => check(`Auswertung enthält Bereich: ${label}`, html.includes(needle)));

check("Segmented Control Woche", html.includes('data-period-kind="week"'));
check("Segmented Control Monat", html.includes('data-period-kind="month"'));
check("Segmented Control Jahr", html.includes('data-period-kind="year"'));
check("Periodennavigation zurück", html.includes('id="periodPrev"'));
check("Periodennavigation vor", html.includes('id="periodNext"'));

const navButtons = html.match(/class="nav-button[^"]*"/g) || [];
eq("Vier Reiter in der unteren Navigation", navButtons.length, 4);
check("Auswertung ist der vierte Reiter",
  html.indexOf('data-page="analysis"') > html.indexOf('data-page="streaks"'));
check("Diagramm-Symbol statt Emoji für die Auswertung", html.includes("nav-symbol-chart"));
check("Tagesrollen-Picker wird auf der Auswertung ausgeblendet",
  app.includes('$("rolePickerWrap").hidden = page === "analysis"'));
check("Tagesnavigation wird auf der Auswertung ausgeblendet",
  app.includes('$("dateNavigation").hidden = page === "analysis"'));

check("Wochenrückblick ist aus der Tagesreflexion entfernt", !html.includes('id="statsGrid"'));
check("Alte Wochen-Blätterleiste ist entfernt", !html.includes('id="weekBack"'));

check("Keine externe Chartbibliothek eingebunden",
  !/(?:src|href|from|require\()\s*=?\s*["'][^"']*(?:chart\.js|d3|highcharts|plotly|echarts|apexcharts)/i.test(html + appCode));
check("Kein import und kein require in der App", !/\brequire\(|^\s*import\s/m.test(appCode));
check("Diagramm als eigenes SVG", app.includes('<svg class="trend-chart"'));
check("Diagramm hat ein aria-label", app.includes('role="img" aria-label='));
check("Rollenkompass-Balken hat ein aria-label", app.includes('class="compass-bar" role="img" aria-label='));

/* --------------------------------------------------------------------------
   6. SMA, Aktivitätsgröße, Kontext
   -------------------------------------------------------------------------- */

check("SMA-Schnellerfassung mit einem Tippen", html.includes('id="smaWorkdayToggle"'));
check("SMA-Erfassung hängt nicht an der Tagesrolle",
  app.includes("function toggleSmaWorkday()") && !/toggleSmaWorkday[\s\S]{0,240}dayRole/.test(app));
check("Keine zusätzliche Rolle „Arbeitnehmer“", !/Arbeitnehmer/.test(app + html + logic));
check("Rolle Unternehmer bleibt bestehen", logic.includes('name: "Unternehmer"'));
eq("Weiterhin genau sieben Rollen", (logic.match(/\{ name: "[^"]+", emoji:/g) || []).length, 7);

check("Kontextauswahl SMA-Regelarbeit", html.includes('data-value="sma"'));
check("Kontextauswahl eigene Entwicklung", html.includes('data-value="own"'));
check("Kontextauswahl sonstiger Beitrag", html.includes('data-value="other"'));
check("Kontext nur bei Unternehmer sichtbar", app.includes("function updateActivityContextVisibility()"));
check("Kein zusätzliches Freitextfeld im Aktivitätsdialog",
  (html.match(/<dialog id="activityDialog"[\s\S]*?<\/dialog>/)[0].match(/<textarea/g) || []).length === 0);

check("Größenauswahl klein", html.includes('data-value="small"'));
check("Größenauswahl mittel", html.includes('data-value="medium"'));
check("Größenauswahl groß", html.includes('data-value="large"'));
check("Mittel ist vorausgewählt", /data-value="medium" aria-pressed="true"/.test(html));
check("Geplante SMA-Tage in der Auswertung änderbar", app.includes('id="smaPlannedDays"'));
check("Grenzen 0 bis 7 für geplante SMA-Tage", app.includes('min="0" max="7"'));

/* --------------------------------------------------------------------------
   7. Wochenfokus
   -------------------------------------------------------------------------- */

check("Fokusauswahl über farbige Rollen-Chips", app.includes("function roleChipsHTML("));
check("Hauptfokus", app.includes('data-focus-slot="primary"'));
check("Optionaler Zweitfokus", app.includes('data-focus-slot="secondary"'));
check("Fokus wird je ISO-Woche gespeichert", app.includes("function setWeekFocus(weekKey, slot, roleName)"));
check("Vorschlag wird angezeigt, aber nicht gespeichert",
  app.includes("suggestFocusRoles") && app.includes("niemals ungefragt gespeichert"));
check("Keine starre Rangliste von 1 bis 7", !/Platz 1|Rangliste von/.test(app));

/* --------------------------------------------------------------------------
   8. Vereinfachte ROLEPLAY-Bilanz
   -------------------------------------------------------------------------- */

check("Genau eine Bilanzfrage", app.includes("Wie hast du deine wichtigste Verantwortung heute beantwortet?"));
check("Keine Detailfrage mehr in der Oberfläche", !app.includes('data-balance-action="detail"'));
check("Keine Folgehandlung mehr in der Oberfläche", !app.includes('data-balance-action="followUp"'));
check("Kein Datumsfeld mehr in der Bilanz", !app.includes('id="balanceFollowUpDate"'));
check("Keine Moduspassung mehr in der Oberfläche", !app.includes('data-balance-action="modeFit"'));
check("Historische Detailangaben bleiben erhalten", app.includes("balance.detailOutcome"));
check("Bilanz speichert sofort",
  /data-balance-action='outcome'[\s\S]{0,400}saveReview\(true\)/.test(app));
check("Bilanz erzeugt keinen Score und keine Erfolgsquote",
  !/balanceScore|balanceRate|successRate|erfolgsquote\s*[=:]/i.test(appCode));
check("Bilanzoptionen tragen keinen Punktwert", !/short: "Erfüllt", icon: "✓", score:/.test(logic));

/* --------------------------------------------------------------------------
   9. Fasten
   -------------------------------------------------------------------------- */

check("Negativer Ramadan-Zähler ist aus der Oberfläche entfernt", !html.includes('id="ramadanDays"'));
check("Alte Schaltfläche „Fastentag geschafft“ entfernt", !html.includes('id="ramadanComplete"'));
check("Positiver Nachholstand", app.includes("Nachholtage offen") || app.includes("Nachholtag offen"));
check("Fastenartauswahl vorhanden", html.includes('id="fastingTypeGroup"'));
check("Nachholfasten als eigene Art", logic.includes('key: "catchUp"'));
check("Freiwilliges Fasten als eigene Art", logic.includes('key: "voluntary"'));
check("Ramadan-Fasten als eigene Art", logic.includes('key: "ramadan"'));
check("Ältere Einträge werden gekennzeichnet, nicht eingeordnet", logic.includes('key: "legacy"'));
check("Fortschreibung von ramadanDays entfernt", !app.includes("function propagateRamadanForward"));
check("Alte Fastenwerte bleiben erhalten",
  app.includes("ramadanDays und fastingCompleted bleiben unverändert"));
check("Wochenziel Nachholfasten konfigurierbar", app.includes('id="catchUpGoal"'));
check("Wochenziel freiwilliges Fasten konfigurierbar", app.includes('id="voluntaryGoal"'));
check("Offener Stand korrigierbar", app.includes('id="fastingOpenInput"'));
check("Keine religiös-rechtliche Annahme bei fehlendem Ramadan-Eintrag",
  app.includes("nicht automatisch als neuer Nachholtag"));

/* --------------------------------------------------------------------------
   10. Streaks: Dauer ergänzt, Logik unverändert
   -------------------------------------------------------------------------- */

check("Umrechnung unter dem Tageswert", app.includes("function streakDurationHTML("));
check("Tage bleiben das einzige Eingabefeld",
  !/data-streak-weeks|data-streak-months|data-streak-years/.test(app));
check("Keine neuen täglichen Streak-Zustände",
  !/STREAK_DAILY_STATES\s*=\s*\{[^}]*challenge/i.test(app));
const streakBlock = logic.match(/const STREAKS = \[[\s\S]*?\];/)[0];
eq("Weiterhin genau vier Streaks", (streakBlock.match(/\{ key: "/g) || []).length, 4);
["cannabisFree", "compulsionFree", "alcoholFree", "smokeFree"].forEach(key =>
  check(`Bestehender Streak erhalten: ${key}`, streakBlock.includes(`"${key}"`)));

/* --------------------------------------------------------------------------
   11. Empfindungssätze
   -------------------------------------------------------------------------- */

check("Satz unter dem Energieregler", html.includes('id="stateEnergySentence"'));
check("Satz unter dem Launenregler", html.includes('id="stateMoodSentence"'));
const sentenceBlocks = html.match(/class="range-sentence" aria-live="polite"/g) || [];
eq("Beide Sätze mit aria-live=polite", sentenceBlocks.length, 2);
check("Sätze aktualisieren sich beim Verschieben", app.includes("function updateRangeSentences()"));
check("Sätze sind keine Eingabefelder",
  !/<input[^>]*id="stateEnergySentence"|<textarea[^>]*id="stateEnergySentence"/.test(html));

/* --------------------------------------------------------------------------
   12. KI-Tiefenanalyse ohne API
   -------------------------------------------------------------------------- */

check("Schaltfläche „Mit KI vertiefen“", html.includes('id="openAiExport"') && html.includes("Mit KI vertiefen"));
check("Keine KI-API im Code", !/api\.openai\.com|api\.anthropic\.com|generativelanguage/i.test(app + logic + html));
check("Kein API-Schlüsselfeld", !/apiKey|api-key|API-Schlüssel eingeben/i.test(app + html));
check("Auswahl 30 Tage", html.includes('data-value="30"'));
check("Auswahl 90 Tage", html.includes('data-value="90"'));
["aiIncludeNotes", "aiIncludeGratitude", "aiIncludeDreams"].forEach(id =>
  check(`Freitextschalter vorhanden: ${id}`, html.includes(`id="${id}"`)));
check("Freitextschalter sind standardmäßig aus",
  !/<input id="aiInclude\w+" type="checkbox" checked/.test(html));
check("Vorschau der enthaltenen Daten", html.includes('id="aiExportPreview"'));
check("TXT-Ausgabe", html.includes('id="aiExportTxt"'));
check("JSON-Ausgabe", html.includes('id="aiExportJson"'));
check("Kopierbarer Text", html.includes('id="aiExportCopy"'));
check("Web-Share-Ausgabe", app.includes("navigator.share"));
check("Analyseauftrag wird automatisch angehängt", logic.includes("AI_ANALYSIS_PROMPT"));

/* --------------------------------------------------------------------------
   13. Dialoge: Vorhandensein und Zentrierungsregeln
   -------------------------------------------------------------------------- */

const dialogIds = [...html.matchAll(/<dialog id="([^"]+)"[^>]*class="([^"]*)"/g)]
  .map(match => ({ id: match[1], classes: match[2] }));
eq("Alle Dialoge sind ausgezeichnet", dialogIds.length, 9);

[
  "stateCheckinDialog", "calendarDialog", "prayerDialog", "activityDialog",
  "routineDialog", "routineItemDialog", "routineSessionDialog",
  "streakPrivacyDialog", "aiExportDialog"
].forEach(id => check(`Dialog vorhanden: ${id}`, html.includes(`<dialog id="${id}"`)));

// Jeder Dialog muss entweder zentriert (form-dialog / calendar-dialog) oder
// bewusst formatfüllend sein (die Routine-Sitzung).
dialogIds.forEach(dialog => {
  const centered = /form-dialog|calendar-dialog/.test(dialog.classes);
  const fullscreen = dialog.id === "routineSessionDialog";
  check(`Dialog folgt einer Positionierungsregel: ${dialog.id}`, centered || fullscreen, dialog.classes);
});

const centerRule = css.match(/\.form-dialog,\s*\n\.calendar-dialog \{[\s\S]*?\}/);
check("Zentrierungsregel existiert", Boolean(centerRule));
if (centerRule) {
  const rule = centerRule[0];
  check("Dialog ist position: fixed", /position:\s*fixed/.test(rule));
  check("Dialog nutzt inset: 0", /inset:\s*0/.test(rule));
  check("Dialog nutzt margin: auto", /margin:\s*auto/.test(rule));
  check("Dialog begrenzt die Höhe dynamisch", /dvh/.test(rule));
  check("Dialog berücksichtigt Safe Areas", /env\(safe-area-inset/.test(rule));
  check("Dialog folgt dem sichtbaren Viewport", /--modal-viewport-h/.test(rule));
  check("Dialog gleicht die Tastaturverschiebung aus", /--modal-viewport-shift/.test(rule));
  check("Langer Dialog scrollt intern", /overflow-y:\s*auto/.test(rule));
}
check("Backdrop bleibt erhalten", /dialog::backdrop/.test(css));
check("Hintergrund bleibt beim offenen Dialog gesperrt", /body:has\(dialog\[open\]\)/.test(css));
check("Fallback ohne dvh vorhanden", /@supports not \(height: 100dvh\)/.test(css));
check("visualViewport wird nachgeführt", app.includes("window.visualViewport"));
check("Nachführung auch bei Drehung", app.includes("orientationchange"));
check("Escape-Verhalten bleibt erhalten", app.includes('addEventListener("cancel"'));

/* --------------------------------------------------------------------------
   14. Jede angesprochene Element-ID existiert
   -------------------------------------------------------------------------- */

const staticIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
// Dynamisch erzeugte Elemente stammen aus Vorlagen in app.js.
[...app.matchAll(/\bid="([A-Za-z][\w-]*)"/g)].forEach(match => staticIds.add(match[1]));

const usedIds = new Set([...app.matchAll(/\$\("([^"]+)"\)/g)].map(match => match[1]));
const missing = [...usedIds].filter(id => !staticIds.has(id));
check("Jede per $() angesprochene ID existiert", missing.length === 0, missing.join(", "));

// Umgekehrt: keine verwaisten Bedienelemente in der Oberfläche.
const interactiveIds = [...html.matchAll(/<(?:button|input|select|textarea)[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
/* Einige Elemente werden über zusammengesetzte Bezeichner angesprochen,
   etwa $(`${key}Category`) für die vier Mahlzeiten. */
const templateSuffixes = [...app.matchAll(/\$\(`\$\{\w+\}(\w+)`\)/g)].map(match => match[1]);
const unreferenced = interactiveIds.filter(id =>
  !app.includes(`"${id}"`) && !templateSuffixes.some(suffix => id.endsWith(suffix)));
check("Kein Bedienelement ohne Verdrahtung", unreferenced.length === 0, unreferenced.join(", "));

/* --------------------------------------------------------------------------
   15. Formale Zusicherungen aus der Spezifikation
   -------------------------------------------------------------------------- */

check("Keine Serververbindung im App-Code", !/fetch\(|XMLHttpRequest|WebSocket/.test(app));
check("Kein automatischer Versand persönlicher Daten", !/navigator\.sendBeacon/.test(app));
check("Light und Dark Mode vorhanden", css.includes("prefers-color-scheme: dark"));
check("Safe Areas in der unteren Navigation", css.includes("env(safe-area-inset-bottom)"));
check("Backup enthält die neuen Einstellungen", app.includes("schemaVersion: 8") && /reviews: getAllReviews\(\),\s*\n\s*routines,[\s\S]{0,200}settings/.test(app));
check("CSV enthält die Fastenart", app.includes('"Fastenart"'));
check("CSV enthält den SMA-Arbeitstag", app.includes('"SMA_Arbeitstag"'));
check("CSV enthält den Wochenfokus", app.includes('"Wochenfokus_Haupt"'));
check("Import älterer Backups bleibt möglich", app.includes("function importBackup(file)"));

/* --------------------------------------------------------------------------
   Ergebnis
   -------------------------------------------------------------------------- */

console.log(`\ntest-dom.js: ${passed} Prüfungen bestanden, ${failures.length} fehlgeschlagen.`);
if (failures.length) {
  failures.forEach(failure => console.log(`  ✗ ${failure}`));
  process.exit(1);
}
