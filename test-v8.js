/* ==========================================================================
   ROLEPLAY 8.0 – Prüfungen
   Läuft ohne Netzwerk und ohne Abhängigkeiten:  node test-v8.js
   Teil 1 prüft statisch Version, IDs, Icons und Speicherschlüssel.
   Teil 2 lädt app.js in einem Mini-DOM und führt die Renderpfade aus,
   damit Laufzeitfehler und wieder eingeschleppte Prozentwerte auffallen.
   ========================================================================== */
const fs = require("fs");
const vm = require("vm");

let passed = 0;
const failures = [];
function check(name, condition, detail = "") {
  if (condition) { passed += 1; return; }
  failures.push(`${name}${detail ? " – " + detail : ""}`);
}

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("app.js", "utf8");
const css = fs.readFileSync("style.css", "utf8");
const sw = fs.readFileSync("service-worker.js", "utf8");
const manifest = JSON.parse(fs.readFileSync("manifest.webmanifest", "utf8"));

/* --- 1. Versionierung ---------------------------------------------------- */
check("APP_VERSION ist 8.0", /const APP_VERSION = "8\.0"/.test(js));
check("Service-Worker-Cache ist v8", /const CACHE = "roleplay-v8-0"/.test(sw));
check("Manifest nennt Version 8.0", manifest.description.includes("8.0"));
check("Kein Verweis mehr auf das alte Logo",
  !html.includes("logo.jpeg") && !sw.includes("logo.jpeg") && !JSON.stringify(manifest).includes("logo.jpeg"));
check("Manifest hat Maskable-Variante",
  manifest.icons.some(i => i.purpose === "maskable" && i.sizes === "512x512"));
check("apple-touch-icon zeigt auf 180 px", html.includes('rel="apple-touch-icon" href="logo-180.png"'));
["logo-180.png", "logo-192.png", "logo-512.png", "logo-maskable-512.png"].forEach(file =>
  check(`Datei ${file} vorhanden`, fs.existsSync(file)));

/* --- 2. Datenmodell unverändert ------------------------------------------ */
check("Speicher-Namespace unverändert", js.includes("roleplay-v25"));
check("Backup-Schema unverändert", /schemaVersion: 6/.test(js));
check("Modusleiter unverändert",
  js.includes('const MODE_LADDER = ["gentle", "minimum", "standard", "focus", "development"]'));
check("Gewichtung unverändert", /mood: 0\.58/.test(js) && /energy: 0\.42/.test(js));
check("Schwellen unverändert", /minimum: 40/.test(js) && /standard: 55/.test(js) && /focus: 70/.test(js) && /development: 92/.test(js));
check("Harte Untergrenze unverändert", /hardFloor: \{ threshold: 15, mode: "gentle" \}/.test(js));
check("Check-in-Reihenfolge unverändert",
  js.includes('const CHECKIN_CHRONOLOGY = ["night", "morning", "midday", "afternoon", "evening"]'));

/* --- 3. Markup und Icon-System ------------------------------------------- */
const idsInJs = new Set([...js.matchAll(/\$\("([A-Za-z0-9_]+)"\)/g)].map(m => m[1]));
const idsInHtml = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
const fehlend = [...idsInJs].filter(id => !idsInHtml.has(id));
check("Alle von app.js adressierten IDs existieren im Markup", fehlend.length === 0, fehlend.join(", "));

const iconNames = new Set([...js.matchAll(/^\s{2}"?([a-z-]+)"?:\s*'</gm)].map(m => m[1]));
const usedIcons = [...html.matchAll(/data-icon="([^"]+)"/g)].map(m => m[1]);
const unbekannt = usedIcons.filter(name => !js.includes(`"${name}":`) && !js.includes(`\n  ${name}:`));
check("Alle data-icon-Namen existieren im Icon-System", unbekannt.length === 0, unbekannt.join(", "));
check("Rollen-Kapsel im Markup vorhanden", html.includes('id="roleCapsule"'));
check("Rollen-Auswahlfeld bleibt erhalten", html.includes('id="dayRole"'));
check("Keine Emoji-Rollenanzeige mehr in der Kopfzeile", !/role-capsule[\s\S]{0,400}🫆/.test(html));

/* --- 4. Designsystem ----------------------------------------------------- */
check("Systemschrift gesetzt", /--font: -apple-system/.test(css));
check("8-Punkt-Abstände", /--sp-2: 8px/.test(css) && /--sp-4: 16px/.test(css));
check("Mindesttrefferfläche definiert", /--touch-min: 44px/.test(css));
check("prefers-reduced-motion berücksichtigt", css.includes("prefers-reduced-motion: reduce"));
check("Fallback ohne backdrop-filter vorhanden", css.includes("@supports not ((backdrop-filter"));
check("Dark Mode vorhanden", css.includes("@media (prefers-color-scheme: dark)"));

/* ==========================================================================
   Teil 2 – Mini-DOM
   ========================================================================== */
function makeElement(id = "") {
  const element = {
    id,
    innerHTML: "",
    textContent: "",
    className: "",
    value: "",
    hidden: false,
    dataset: {},
    style: { setProperty() {}, removeProperty() {} },
    classList: {
      _set: new Set(),
      add(...c) { c.forEach(x => this._set.add(x)); },
      remove(...c) { c.forEach(x => this._set.delete(x)); },
      toggle(c, on) { on ? this._set.add(c) : this._set.delete(c); },
      contains(c) { return this._set.has(c); }
    },
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
    removeAttribute() {},
    getAttribute() { return null; },
    appendChild() {},
    querySelectorAll() { return []; },
    querySelector() { return null; },
    closest() { return null; },
    showModal() {}, close() {}, animate() {}, focus() {}
  };
  return element;
}

const elements = new Map();
const el = id => (elements.get(id) || makeElement(id));
const store = new Map();
const context = {
  console,
  document: {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, makeElement(id));
      return el(id);
    },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    addEventListener() {},
    createElement() { return makeElement(); },
    body: makeElement("body")
  },
  window: {
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    addEventListener() {},
    setTimeout() { return 0; },
    clearTimeout() {},
    scrollTo() {}
  },
  navigator: {},
  localStorage: {
    getItem: key => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
    key: index => [...store.keys()][index] ?? null,
    get length() { return store.size; }
  },
  setTimeout() { return 0; },
  clearTimeout() {},
  Intl,
  Date,
  Math,
  JSON
};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(js, context);

/* const/let leben im lexikalischen Gültigkeitsbereich des Skripts: über eine
   zweite Ausführung im selben Kontext sind sie erreichbar. */
const run = code => vm.runInContext(code, context);
run("globalThis.API = { ICON_PATHS, ROLES, MODE_LADDER, CYCLE_PHASES };");
const API = context.API;

/* Modusberechnung – muss exakt wie zuvor arbeiten.
   Der Fall 34/84 prüft ausdrücklich die Anhebungsregel: die energiebedingte
   Begrenzung auf Minimum wird durch die sehr gute Laune um eine Stufe
   angehoben, das Ergebnis ist Standard. */
const faelle = [
  [60, 60, "standard"], [15, 30, "gentle"], [10, 95, "gentle"],
  [24, 70, "gentle"], [34, 84, "standard"], [95, 95, "development"],
  [75, 75, "focus"], [45, 45, "minimum"], [30, 30, "gentle"]
];
faelle.forEach(([energie, laune, erwartet]) => {
  const ergebnis = context.resolveMode(energie, laune);
  check(`Modus bei Energie ${energie} / Laune ${laune}`, ergebnis.key === erwartet,
    `erwartet ${erwartet}, erhalten ${ergebnis && ergebnis.key}`);
});
check("Zustandswert gewichtet korrekt", context.stateScore(50, 100) === Math.round(100 * 0.58 + 50 * 0.42));
check("Ohne Werte kein Modus", context.resolveMode(null, 50) === null);

/* Icons */
const alleIcons = Object.keys(API.ICON_PATHS);
check("Icon-System enthält mindestens 30 Zeichen", alleIcons.length >= 30, `${alleIcons.length}`);
check("Jedes Icon liefert ein SVG im 24er-Raster",
  alleIcons.every(name => context.icon(name).startsWith('<svg class="rp-icon" viewBox="0 0 24 24"')));
check("Alle sieben Rollen haben ein Emblem",
  API.ROLES.every(role => context.roleEmblem(role.name).includes("<svg")));
check("Alle fünf Tagesphasen haben ein Symbol",
  Object.keys(API.CYCLE_PHASES).every(key => context.phaseGlyph(key).includes("phase-glyph")));

/* Tagesbahn: rendert und enthält keine Prozentwerte mehr. */
run(`selectedDate = todayISO();
currentData = {
  role: "Ich-Person",
  checkinStructure: 5,
  stateCheckins: [
    { id: "a", slot: "night", energy: 60, mood: 60, time: "07:10" },
    { id: "b", slot: "morning", energy: 15, mood: 30, time: "08:20" }
  ]
};`);
context.renderCheckinSlots();
const bahn = el("checkinSlots").innerHTML;
const bahnSichtbar = bahn.replace(/aria-label="[^"]*"/g, "").replace(/style="[^"]*"/g, "");
check("Tagesbahn rendert alle fünf Stationen", (bahn.match(/data-open-checkin-slot=/g) || []).length === 5);
check("Tagesbahn zeigt keine Prozentzeichen mehr", !bahnSichtbar.includes("%"));
check("Tagesbahn zeigt keine sichtbaren Messwerte", !/>\s*\d+\s*</.test(bahnSichtbar));
check("Erfasste Stationen tragen ein Häkchen", bahn.includes("stop-check"));
check("Erfasste Stationen tragen Intensitätsbalken", bahn.includes("stop-meter"));
check("Offene Stationen tragen eine Wortmarke", bahn.includes("stop-status"));
check("Werte bleiben für Hilfstechnologien erhalten", bahn.includes("Energie 60 von 100"));
check("Fortschrittszeile gefüllt", el("checkinProgress").textContent.includes("von"));

/* Die gespeicherten Werte bleiben unangetastet. */
run("globalThis.SNAP = currentData.stateCheckins;");
check("Energie unverändert gespeichert", context.SNAP[1].energy === 15);
check("Laune unverändert gespeichert", context.SNAP[1].mood === 30);
check("Modus aus letztem Check-in weiterhin berechenbar",
  context.modeForCheckin(context.SNAP[1]).key === "gentle");

/* Verlauf zeigt die Werte weiterhin sichtbar. */
context.renderStateOverview();
check("Verlauf nennt die Werte weiterhin", el("stateTimeline").innerHTML.includes("% Energie"));
check("Readout nennt den Modus", el("currentStateSummary").innerHTML.includes("Schon-Modus"));

/* Leerzustand mit konkreter Handlung */
run("currentData.stateCheckins = [];");
context.renderStateOverview();
const leer = el("currentStateSummary").innerHTML;
check("Leerzustand bietet eine konkrete Handlung an", leer.includes("readout-empty-action") && leer.includes("eintragen"));

/* Rollen-Control und Rollen-Sheet */
context.document.getElementById("dayRole").value = "Muslim";
context.renderRoleCapsule();
check("Rollen-Kapsel zeigt den Rollennamen", el("roleCapsuleName").textContent === "Muslim");
check("Rollen-Kapsel zeigt ein Emblem", el("roleCapsuleEmblem").innerHTML.includes("<svg"));
context.renderRoleSheet();
const sheet = el("roleSheetList").innerHTML;
check("Rollen-Sheet listet alle Rollen", (sheet.match(/data-role-option/g) || []).length === API.ROLES.length);
check("Aktive Rolle ist markiert", sheet.includes('aria-checked="true"'));

/* Modus-Erklärung */
context.openModeInfo();
check("Modus-Erklärung listet fünf Stufen",
  (el("modeInfoLadder").innerHTML.match(/mode-info-row/g) || []).length === 5);
check("Modus-Erklärung nennt die Gewichtung", el("modeInfoRules").innerHTML.includes("58"));

/* Ergebnis */
console.log(`\n${passed} Prüfungen bestanden, ${failures.length} fehlgeschlagen.`);
if (failures.length) {
  failures.forEach(f => console.log("  ✗ " + f));
  process.exit(1);
}
