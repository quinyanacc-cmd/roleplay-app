/* ==========================================================================
   ROLEPLAY – Tests der Oberfläche

       node test-dom.js

   Zwei Teile:

   1. Ohne Abhängigkeiten: Markup, Stylesheet, Service Worker und die
      Verdrahtung zwischen index.html und app.js werden als Text geprüft.
   2. Mit jsdom (falls installiert): die App wird tatsächlich gestartet und
      die Hauptabläufe werden durchgespielt. Fehlt jsdom, wird dieser Teil
      übersprungen – die Prüfungen aus Teil 1 laufen immer.
   ========================================================================== */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const here = __dirname;
const read = file => fs.readFileSync(path.join(here, file), "utf8");

const html = read("index.html");
const css = read("style.css");
const app = read("app.js");
const logic = read("logic.js");
const sw = read("service-worker.js");
const manifest = JSON.parse(read("manifest.webmanifest"));

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

/* ==========================================================================
   TEIL 1 – Quelltext, Markup und Verdrahtung
   ========================================================================== */

section("Dateien und Ladereihenfolge");

["logic.js", "app.js", "style.css", "index.html", "service-worker.js", "manifest.webmanifest"].forEach(file => {
  check(`${file} ist vorhanden`, fs.existsSync(path.join(here, file)));
});

["logic.js", "app.js", "service-worker.js", "test-logic.js", "test-dom.js"].forEach(file => {
  try { new vm.Script(read(file), { filename: file }); check(`${file} ist gültiges JavaScript`, true); }
  catch (error) { check(`${file} ist gültiges JavaScript`, false, error.message); }
});

try {
  new vm.Script(`${logic}\n${app}`, { filename: "logic.js+app.js" });
  check("logic.js und app.js deklarieren nichts doppelt", true);
} catch (error) {
  check("logic.js und app.js deklarieren nichts doppelt", false, error.message);
}

check("logic.js wird vor app.js geladen",
  html.indexOf('src="logic.js"') > -1 && html.indexOf('src="logic.js"') < html.indexOf('src="app.js"'));

// Kommentare ausblenden: sie dürfen Begriffe nennen, ohne dass daraus Code wird.
const stripComments = source => source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
const logicCode = stripComments(logic.split("if (typeof module")[0]);
check("logic.js greift nicht auf das DOM zu", !/\bdocument\./.test(logicCode));
check("logic.js greift nicht auf window zu", !/\bwindow\./.test(logicCode));
check("logic.js greift nicht auf localStorage zu", !/localStorage/.test(logicCode));
check("logic.js ist in Node ladbar", typeof require("./logic.js").normalizeProfile === "function");

section("Service Worker und Manifest");

["./index.html", "./style.css", "./logic.js", "./app.js", "./manifest.webmanifest"].forEach(asset => {
  check(`Der Service Worker legt ${asset} ab`, sw.includes(`"${asset}"`));
});
check("Der Cacheschlüssel nennt die Version", sw.includes("roleplay-v7"));
check("Alte Caches werden aufgeräumt", sw.includes("caches.delete"));
check("Ein fehlendes Bild verhindert die Installation nicht", sw.includes("cache.add(asset).catch"));
check("Fremde Quellen werden nicht abgefangen", sw.includes("self.location.origin"));

const swAssets = [...sw.matchAll(/"\.\/([^"]+)"/g)].map(match => match[1]).filter(asset => asset.includes("."));
swAssets.forEach(asset => check(`Die abgelegte Datei ${asset} existiert wirklich`, fs.existsSync(path.join(here, asset))));

check("Das Manifest trägt einen deutschen Beschreibungstext", manifest.lang === "de" && manifest.description.length > 20);
check("Das Manifest nennt keine Person", !/yannick|muslim|absolvent/i.test(JSON.stringify(manifest)));
manifest.icons.forEach(icon => check(`Das Symbol ${icon.src} existiert`, fs.existsSync(path.join(here, icon.src))));
check("Es gibt ein maskierbares Symbol", manifest.icons.some(icon => icon.purpose === "maskable"));

section("Keine fest eingebauten persönlichen Inhalte mehr");

// Persönliche Inhalte dürfen nur noch in der Migration vorkommen – dort sind
// sie nötig, damit bestehende Nutzerdaten ihre Bedeutung behalten.
const migrationBlock = logic.slice(logic.indexOf("12. Migration"), logic.indexOf("13. Tageseintrag"));
const logicOutsideMigration = logic.replace(migrationBlock, "");

[
  ["app.js", app],
  ["index.html", html],
  ["logic.js außerhalb der Migration", stripComments(logicOutsideMigration)]
].forEach(([label, source]) => {
  ["Ich-Person", "Vitalist", "Absolvent", "Unternehmer", "Familienmensch", "Gottesfurcht", "Ramadan", "Fajr", "Allah"].forEach(term => {
    check(`${label} enthält „${term}“ nicht mehr als festen Inhalt`, !source.includes(term));
  });
});

check("Die Migration kennt die früheren Rollen weiterhin", migrationBlock.includes("Ich-Person") && migrationBlock.includes("Familienmensch"));
check("Die Migration erhält die Gebetszustände", migrationBlock.includes("Nicht gebetet"));
check("Die Migration erhält die Gottesfurcht als eigene Skala", migrationBlock.includes("Gottesfurcht"));

section("Informationsarchitektur");

const navPages = [...html.matchAll(/class="nav-button[^"]*"[^>]*data-page="([^"]+)"/g)].map(match => match[1]);
equal("Die Navigation hat genau drei Bereiche", navPages, ["entry", "analysis", "profile"]);
check("Routinen sind kein eigener Hauptbereich mehr", !navPages.includes("routines"));
check("Streaks sind kein eigener Hauptbereich mehr", !navPages.includes("streaks"));
check("Jeder Bereich trägt eine sichtbare Beschriftung",
  (html.match(/class="nav-label"/g) || []).length === 3);
["entryPage", "analysisPage", "profilePage", "routinesPage"].forEach(id =>
  check(`Die Seite ${id} existiert`, html.includes(`id="${id}"`)));
check("Die Routinenseite ist über die Eintragung erreichbar", html.includes('id="openRoutines"'));
check("Und über das Profil", html.includes('id="openRoutinesFromProfile"'));

section("Onboarding");

check("Es gibt einen Ersteinrichtungs-Ablauf", html.includes('id="onboarding"'));
check("Er ist anfangs ausgeblendet", /id="onboarding"[^>]*hidden/.test(html));
check("Er zeigt einen Fortschritt", html.includes('id="onboardingProgress"'));
["onboardingNext", "onboardingBack", "onboardingSkip"].forEach(id =>
  check(`Die Schaltfläche ${id} existiert`, html.includes(`id="${id}"`)));
check("Der Ablauf hat sechs Schritte", /ONBOARDING_STEPS = \["intro", "roles", "detail", "trackers", "streaks", "done"\]/.test(app));
check("Er nennt das Grundprinzip wörtlich",
  app.includes("deine unterschiedlichen Lebensrollen bewusst zu gestalten, im Alltag sichtbar zu machen und ihre Entwicklung zu reflektieren"));
check("Er lässt sich überspringen", app.includes("finishOnboarding(true)"));
check("Bestehende Nutzer können stattdessen ein Backup einspielen", app.includes('id="onboardingRestore"'));
check("Die Einführung ist später erneut aufrufbar", html.includes('id="restartOnboarding"'));

section("Leere Zustände");

check("Es gibt eine gemeinsame Vorlage für leere Bereiche", app.includes("function emptyStateHTML"));
["entryEmpty", "analysisEmpty", "routineEmpty", "routineItemEmpty"].forEach(id =>
  check(`Der leere Zustand ${id} existiert`, html.includes(`id="${id}"`)));
check("Der leere Startzustand fragt nach der ersten Rolle",
  app.includes("Welche Rollen spielen in deinem Leben eine wichtige Rolle?"));
[
  ["Aktivitäten", "Noch keine Aktivität eingetragen"],
  ["Tracking", "Noch kein Tracking eingerichtet"],
  ["Streaks", "Noch keine Streaks angelegt"],
  ["Routinen", "Noch keine Routine"],
  ["Auswertung", "Noch nichts auszuwerten"]
].forEach(([label, text]) => check(`${label} hat einen erklärenden leeren Zustand`, app.includes(text)));
check("Die Auswertung zeigt ohne Daten kein leeres Diagramm",
  app.includes('empty.hidden = anyData') && app.includes('body.hidden = !anyData'));

section("Rollen als Nutzerobjekte");

["roleDialog", "roleName", "roleEmoji", "roleDescription", "roleColorPicker", "roleGoalList", "roleDayPicker", "deleteRole"].forEach(id =>
  check(`Der Rolleneditor enthält ${id}`, html.includes(`id="${id}"`)));
["trackerDialog", "scaleDialog", "streakDialog", "routineDialog"].forEach(id =>
  check(`Der Editor ${id} existiert`, html.includes(`id="${id}"`)));
check("Rollen lassen sich sortieren", app.includes("moveProfileItem(profile.roles"));
check("Gelöschte Rollen werden archiviert, nicht entfernt", app.includes("role.archived = true"));
check("Trackingelemente lassen sich ausblenden statt löschen", app.includes("tracker.enabled = false"));

section("Personalisierung statt fester Struktur");

check("Die Check-in-Regler stammen aus dem Profil", app.includes("orderedScales(profile).map"));
check("Die Tracker stammen aus dem Profil", app.includes("dayTrackers(profile)"));
check("Die Streaks stammen aus dem Profil", app.includes("activeStreaks(profile)"));
check("Der CSV-Export folgt dem Profil", app.includes("...scales.map(scale => `${scale.label}"));
check("Sichtbare Bereiche sind einzeln abschaltbar", app.includes('switchRowHTML(`module:'));
check("Es gibt eine Auswahl für hell, dunkel und automatisch", html.includes('id="themeSelect"') && html.includes('value="system"'));

section("Erscheinungsbild");

check("Helle und dunkle Tokens sind hinterlegt", css.includes(':root[data-theme="dark"]'));
check("Die Systemeinstellung wird berücksichtigt", css.includes("prefers-color-scheme: dark"));
check("Das Dokument gibt beide Modi an", html.includes('content="light dark"'));
check("Die Statusleistenfarbe folgt dem Modus", html.includes('media="(prefers-color-scheme: dark)"'));
check("Bewegung lässt sich zentral abschalten", css.includes("prefers-reduced-motion"));
check("Das Verlaufsdiagramm hält seine viewBox ein", css.includes("aspect-ratio: 440 / 300"));
check("Das Monatsraster kann nicht überlaufen", css.includes("grid-auto-columns: minmax(0, 1fr)"));

section("Verdrahtung");

// Jede im Markup vergebene Kennung, die app.js anspricht, muss existieren –
// und jedes Bedienelement braucht eine Behandlung.
const htmlIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
const usedIds = [...new Set([...app.matchAll(/\$\("([A-Za-z0-9_-]+)"\)/g)].map(match => match[1]))];
// Kennungen, die app.js selbst erzeugt – im Markup oder als Aktion eines leeren Zustands.
const dynamicIds = new Set([
  ...[...app.matchAll(/id="([A-Za-z0-9_-]+)"/g)].map(match => match[1]),
  ...[...app.matchAll(/actionId: "([A-Za-z0-9_-]+)"/g)].map(match => match[1])
]);
const missingIds = usedIds.filter(id => !htmlIds.has(id) && !dynamicIds.has(id));
equal("app.js spricht nur vorhandene Kennungen an", missingIds, []);

const interactiveIds = [...html.matchAll(/<(?:button|input|select|textarea)[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
const unwired = interactiveIds.filter(id => !app.includes(`"${id}"`));
equal("Kein Bedienelement ohne Verdrahtung", unwired, []);

const dialogIds = [...html.matchAll(/<dialog[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
check("Jeder Dialog wird geöffnet", dialogIds.every(id => app.includes(`$("${id}").showModal()`)));
check("Dialoge folgen der eingeblendeten Tastatur", app.includes("visualViewport") && css.includes("--dialog-vh"));
check("Der Hintergrund bleibt bei offenem Dialog gesperrt", app.includes("dialog-open") && css.includes(".dialog-open"));

const classesInCss = new Set([...css.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map(match => match[1]));
const classesInHtml = [...new Set([...html.matchAll(/class="([^"$]*)"/g)]
  .flatMap(match => match[1].split(/\s+/))
  .filter(name => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)))];
const unstyled = classesInHtml.filter(name => !classesInCss.has(name));
equal("Jede im Markup benutzte Klasse ist gestaltet", unstyled, []);

section("Sprache und Zugänglichkeit");

check("Das Dokument ist als deutsch ausgezeichnet", html.includes('<html lang="de">'));
check("Die Seite hat eine Überschrift für Vorlesehilfen", html.includes('id="pageTitle"'));
check("Die Navigation ist benannt", html.includes('aria-label="Hauptnavigation"'));
const inputsWithoutLabel = [...html.matchAll(/<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>/g)]
  .map(match => ({ id: match[1], tag: match[0] }))
  .filter(entry => !entry.tag.includes('type="hidden"') && !entry.tag.includes("aria-label") && !html.includes(`for="${entry.id}"`))
  .map(entry => entry.id);
equal("Jedes Eingabefeld hat eine Beschriftung", inputsWithoutLabel, []);

/* ==========================================================================
   TEIL 2 – Die App wirklich starten
   ========================================================================== */

let JSDOM = null;
try { ({ JSDOM } = require("jsdom")); } catch { /* optional */ }

if (!JSDOM) {
  section("Ablaufprüfungen");
  console.log("  übersprungen – jsdom ist nicht installiert (npm install --no-save jsdom)");
} else {
  const boot = (storageSeed = {}) => {
    const dom = new JSDOM(html, { runScripts: "dangerously", url: "https://example.org/" });
    const { window } = dom;
    const store = new Map(Object.entries(storageSeed));
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        get length() { return store.size; },
        key: index => [...store.keys()][index] ?? null,
        getItem: key => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => { store.set(String(key), String(value)); },
        removeItem: key => { store.delete(key); },
        clear: () => store.clear()
      }
    });
    window.scrollTo = () => {};
    window.alert = () => {};
    window.confirm = () => true;
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
    window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); this.open = true; };
    window.HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open"); this.open = false;
      this.dispatchEvent(new window.Event("close"));
    };
    const errors = [];
    window.addEventListener("error", event => errors.push(String(event.error || event.message)));
    const run = source => {
      const element = window.document.createElement("script");
      element.textContent = source;
      window.document.head.appendChild(element);
    };
    run(logic);
    run(app);
    window.document.dispatchEvent(new window.Event("DOMContentLoaded"));
    return { window, document: window.document, store, errors, $: id => window.document.getElementById(id) };
  };

  const click = (window, element) => element.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
  const type = (window, element, value) => {
    element.value = value;
    element.dispatchEvent(new window.Event("input", { bubbles: true }));
    element.dispatchEvent(new window.Event("change", { bubbles: true }));
  };
  const submit = (window, form) => form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));

  section("Erster Start");

  {
    const { window, document, $, errors } = boot();
    check("Ein neuer Nutzer landet im Onboarding", !$("onboarding").hidden);
    check("Die App selbst bleibt zunächst verborgen", $("appShell").hidden);
    check("Der erste Schritt erklärt das Prinzip", document.querySelector("#onboardingBody h2").textContent.includes("Willkommen"));

    click(window, $("onboardingNext"));
    check("Schritt zwei fragt nach den Rollen", document.querySelector("#onboardingBody h2").textContent.includes("Rollen"));
    const suggestions = [...document.querySelectorAll("[data-role-suggestion]")];
    check("Es gibt Rollenvorschläge", suggestions.length >= 6);
    click(window, suggestions[0]);
    click(window, suggestions[1]);
    type(window, $("onboardingRoleInput"), "Nachbarschaft");
    click(window, $("onboardingAddRole"));

    click(window, $("onboardingNext"));
    check("Schritt drei fragt nach Bedeutung und Zielen", document.querySelector("#onboardingBody h2").textContent.includes("bedeutet"));
    type(window, $("onboardingGoalInput"), "Ein Ziel");
    click(window, $("onboardingAddGoal"));
    click(window, document.querySelector('#onboardingDays [data-day="1"]'));

    click(window, $("onboardingNext"));
    click(window, document.querySelector('[data-tracker-suggestion="wasser"]'));
    click(window, $("onboardingNext"));
    click(window, document.querySelector("[data-streak-suggestion]"));
    click(window, $("onboardingNext"));
    click(window, $("onboardingNext"));

    check("Danach ist die App sichtbar", !$("appShell").hidden && $("onboarding").hidden);
    const profile = JSON.parse(window.localStorage.getItem("roleplay-v25-profile"));
    equal("Die gewählten Rollen sind gespeichert", profile.roles.length, 3);
    equal("Eigene Rollen kommen mit", profile.roles.at(-1).name, "Nachbarschaft");
    equal("Die Wochentage sind gespeichert", profile.roles[0].activeDays, [1]);
    equal("Das Ziel ist gespeichert", profile.roles[0].goals.some(goal => goal.title === "Ein Ziel"), true);
    equal("Der gewählte Tracker ist angelegt", profile.trackers.map(tracker => tracker.id), ["wasser"]);
    equal("Der gewählte Streak ist angelegt", profile.streaks.length, 1);
    check("Das Onboarding ist als erledigt vermerkt", Boolean(profile.onboardedAt));
    check("Das Datum steht in der Kopfzeile", $("dateButton").textContent.length > 6);
    equal("Kein Skriptfehler beim ersten Start", errors, []);
  }

  section("Täglicher Ablauf");

  {
    const { window, document, $, errors } = boot();
    // Schnell durch das Onboarding.
    click(window, $("onboardingNext"));
    click(window, document.querySelectorAll("[data-role-suggestion]")[0]);
    click(window, $("onboardingNext"));
    click(window, $("onboardingNext"));
    click(window, document.querySelector('[data-tracker-suggestion="wasser"]'));
    click(window, document.querySelector('[data-tracker-suggestion="dankbarkeit"]'));
    click(window, $("onboardingNext"));
    click(window, $("onboardingNext"));
    click(window, $("onboardingNext"));

    check("Bei genau einer Rolle ist sie voreingestellt", $("dayRole").value !== "");

    const stops = [...document.querySelectorAll("[data-open-checkin-slot]")];
    equal("Die Tagesbahn zeigt fünf Phasen", stops.length, 5);
    click(window, stops[0]);
    check("Der Check-in-Dialog öffnet", $("checkinDialog").open);
    const sliders = [...document.querySelectorAll("[data-scale-input]")];
    equal("Er zeigt die Regler aus dem Profil", sliders.map(slider => slider.dataset.scaleInput), ["energy", "mood"]);
    type(window, sliders[0], "35");
    type(window, sliders[1], "85");
    check("Unter dem Regler steht eine Bedeutung",
      document.querySelector('[data-scale-meaning="energy"]').textContent.length > 10);
    check("Die Vorschau nennt den Rollenmodus", $("checkinPreview").textContent.length > 10);
    submit(window, $("checkinForm"));
    check("Danach ist der Dialog geschlossen", !$("checkinDialog").open);
    check("Die Phase ist als erledigt markiert",
      document.querySelector('[data-open-checkin-slot="morning"]').className.includes("is-done"));

    click(window, document.querySelector('[data-tracker-card="wasser"] [data-counter="1"]'));
    check("Der Zähler zählt hoch", document.querySelector('[data-tracker-card="wasser"] .tracker-value').textContent.startsWith("0,5"));
    type(window, document.querySelector('[data-tracker-card="dankbarkeit"] [data-text-input]'), "Für heute.");

    click(window, $("addActivity"));
    type(window, $("activityTitle"), "Spaziergang");
    submit(window, $("activityForm"));
    check("Die Aktivität erscheint in der Liste", document.querySelector(".activity-row strong").textContent === "Spaziergang");

    type(window, $("notes"), "Eine Notiz.");
    click(window, $("saveButton"));

    const key = [...window.localStorage.getItem ? [] : []];
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const saved = JSON.parse(window.localStorage.getItem(`roleplay-v25-review-${today}`));
    equal("Der Check-in ist gespeichert", saved.stateCheckins.length, 1);
    equal("Mit beiden Reglerwerten", saved.stateCheckins[0].scales, { energy: 35, mood: 85 });
    equal("Der Trackerwert ist gespeichert", saved.trackers.wasser, 0.5);
    equal("Der Freitext ist gespeichert", saved.trackers.dankbarkeit, "Für heute.");
    equal("Die Aktivität ist gespeichert", saved.activities.length, 1);
    equal("Die Notiz ist gespeichert", saved.notes, "Eine Notiz.");
    equal("Kein Skriptfehler im Tagesablauf", errors, []);
  }

  section("Profil bearbeiten");

  {
    const { window, document, $, errors } = boot();
    click(window, $("onboardingNext"));
    click(window, document.querySelectorAll("[data-role-suggestion]")[0]);
    click(window, document.querySelectorAll("[data-role-suggestion]")[1]);
    for (let step = 0; step < 5; step += 1) click(window, $("onboardingNext"));

    click(window, document.querySelector('.nav-button[data-page="profile"]'));
    check("Das Profil ist sichtbar", $("profilePage").classList.contains("active"));

    const before = [...$("profileRoleList").querySelectorAll(".profile-row strong")].map(node => node.textContent);
    click(window, $("profileRoleList").querySelector('[data-move="1"]'));
    const after = [...$("profileRoleList").querySelectorAll(".profile-row strong")].map(node => node.textContent);
    equal("Rollen lassen sich umsortieren", after, [before[1], before[0]]);

    click(window, $("profileRoleList").querySelector("[data-edit]"));
    type(window, $("roleName"), "Gesundheit");
    click(window, document.querySelectorAll("#roleColorPicker [data-color]")[3]);
    click(window, document.querySelector('#roleDayPicker [data-day="3"]'));
    submit(window, $("roleForm"));
    check("Der neue Rollenname erscheint",
      [...$("profileRoleList").querySelectorAll(".profile-row strong")].some(node => node.textContent === "Gesundheit"));

    click(window, $("addScale"));
    type(window, $("scaleLabel"), "Ruhe");
    type(window, $("scaleLow"), "unruhig");
    type(window, $("scaleHigh"), "gelassen");
    submit(window, $("scaleForm"));
    check("Der neue Regler erscheint im Profil",
      [...$("profileScaleList").querySelectorAll(".profile-row strong")].some(node => node.textContent === "Ruhe"));

    click(window, document.querySelector('.nav-button[data-page="entry"]'));
    click(window, document.querySelector('[data-open-checkin-slot="morning"]'));
    equal("Und sofort im Check-in", [...document.querySelectorAll("[data-scale-input]")].map(slider => slider.dataset.scaleInput), ["energy", "mood", "ruhe"]);
    click(window, $("cancelCheckin"));

    click(window, document.querySelector('.nav-button[data-page="profile"]'));
    click(window, $("addTracker"));
    $("trackerType").value = "checklist";
    $("trackerType").dispatchEvent(new window.Event("change", { bubbles: true }));
    type(window, $("trackerLabel"), "Medikamente");
    type(window, $("trackerItemInput"), "Morgens");
    click(window, $("addTrackerItem"));
    submit(window, $("trackerForm"));
    click(window, document.querySelector('.nav-button[data-page="entry"]'));
    const listItem = document.querySelector('[data-tracker-card="medikamente"] [data-checklist-item]');
    check("Die neue Checkliste erscheint in der Eintragung", Boolean(listItem));
    click(window, listItem);
    check("Ein Tippen setzt den Status",
      document.querySelector('[data-tracker-card="medikamente"] .checklist-item').className.includes("is-set"));

    const moduleSwitch = document.querySelector('[data-switch="module:notes"]');
    click(window, document.querySelector('.nav-button[data-page="profile"]'));
    moduleSwitch.checked = false;
    moduleSwitch.dispatchEvent(new window.Event("change", { bubbles: true }));
    click(window, document.querySelector('.nav-button[data-page="entry"]'));
    check("Abgeschaltete Bereiche verschwinden", $("notesCard").hidden);

    equal("Kein Skriptfehler bei der Profilbearbeitung", errors, []);
  }

  section("Migration eines Bestands aus Version 6");

  {
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const seed = {
      [`roleplay-v25-review-${today}`]: JSON.stringify({
        role: "Muslim",
        prayers: { Fajr: "Normal", Dhuhr: "Nicht gebetet" },
        water: 1500, steps: "8200", sleepQualityScore: 1,
        gratitude1: "Gesundheit",
        streaks: { smokeFree: { days: 42, broken: false, todayStatus: "" } },
        activities: [{ title: "Gym", role: "Vitalist", template: "gym" }],
        stateCheckins: [{ id: "a", slot: "morning", time: "08:00", energy: 55, mood: 70, taqwa: 65 }],
        morningRoutineState: "done",
        notes: "Alte Notiz"
      }),
      "roleplay-v25-routines": JSON.stringify({
        morning: { key: "morning", title: "Morgenroutine", theme: "morning", items: [{ id: "m1", emoji: "🕯️", title: "Kerze", minutes: 1, context: "Hinweis" }] }
      })
    };
    const { window, document, $, errors } = boot(seed);

    check("Bestehende Nutzer sehen kein Onboarding", $("onboarding").hidden && !$("appShell").hidden);
    const profile = JSON.parse(window.localStorage.getItem("roleplay-v25-profile"));
    equal("Die sieben früheren Rollen sind jetzt Nutzerobjekte", profile.roles.length, 7);
    equal("Die Gottesfurcht ist ein eigener Regler", profile.scales.map(scale => scale.label), ["Energie", "Laune", "Gottesfurcht"]);
    check("Die Gebete sind eine Checkliste", profile.trackers.some(tracker => tracker.id === "prayers"));
    check("Der frühere Streak ist erhalten", profile.streaks.some(streak => streak.id === "smokeFree"));

    equal("Die Rolle des Tages ist erhalten", $("roleHeroName").textContent, "Muslim");
    equal("Die Notiz ist erhalten", $("notes").value, "Alte Notiz");
    equal("Der Streakstand ist erhalten", document.querySelector("[data-streak-days]").value, "42");
    equal("Der Gebetszustand ist erhalten",
      document.querySelector('[data-tracker-card="prayers"] .checklist-item').className.includes("tone-positive"), true);
    check("Der Wasserstand ist in Liter erhalten",
      document.querySelector('[data-tracker-card="water"] .tracker-value').textContent.startsWith("1,5"));
    check("Die Aktivität ist erhalten", document.querySelector(".activity-row strong").textContent === "Gym");
    check("Die Routine ist erhalten", document.querySelector("#routineTodayList strong").textContent === "Morgenroutine");
    check("Der Check-in ist erhalten", document.querySelectorAll(".state-timeline-item").length === 1);
    check("Und zeigt alle drei Werte", document.querySelector(".state-timeline-item small").textContent.split("·").length === 3);

    click(window, document.querySelector('.nav-button[data-page="analysis"]'));
    check("Die Auswertung zeigt Inhalte", !$("analysisBody").hidden);
    check("Der Verlauf hat drei Kurven", $("trendArea").querySelectorAll(".trend-legend span").length === 3);
    check("Die Rollenpräsenz listet alle Rollen", $("presenceList").querySelectorAll(".role-split-row").length === 7);
    check("Es gibt verständliche Rückblicksätze", $("insightList").querySelectorAll(".insight").length >= 3);

    click(window, document.querySelector('[data-period="month"]'));
    check("Die Monatsansicht zeigt den Monatsnamen", /\d{4}/.test($("periodLabel").textContent));
    check("Und wertet Tage aus", !$("periodSummary").textContent.includes("von 0 Tagen"));

    equal("Kein Skriptfehler bei der Migration", errors, []);
  }

  section("Routinen");

  {
    const { window, document, $, errors } = boot();
    click(window, $("onboardingNext"));
    click(window, document.querySelectorAll("[data-role-suggestion]")[0]);
    for (let step = 0; step < 5; step += 1) click(window, $("onboardingNext"));

    click(window, $("openRoutines"));
    check("Die Routinenseite ist offen", $("routinesPage").classList.contains("active"));
    check("Ohne Routine gibt es einen erklärenden leeren Zustand", !$("routineEmpty").hidden);

    click(window, $("addRoutine"));
    type(window, $("routineTitle"), "Morgenroutine");
    submit(window, $("routineDialogForm"));
    check("Die Routine erscheint", document.querySelector(".routine-hero h3").textContent === "Morgenroutine");

    click(window, document.querySelector("[data-open-routine]"));
    click(window, $("addRoutineItem"));
    type(window, $("routineItemTitle"), "Wasser trinken");
    $("routineItemMinutes").value = "2";
    submit(window, $("routineItemForm"));
    click(window, $("addRoutineItem"));
    type(window, $("routineItemTitle"), "Kurz sitzen");
    $("routineItemMinutes").value = "5";
    submit(window, $("routineItemForm"));
    equal("Beide Schritte sind angelegt", document.querySelectorAll(".routine-item-copy strong").length, 2);

    click(window, $("startRoutineDetail"));
    check("Der Durchlauf startet", $("routineSessionDialog").open);
    equal("Beim ersten Schritt", $("sessionItemTitle").textContent, "Wasser trinken");
    equal("Mit der hinterlegten Dauer", $("sessionTimer").textContent, "02:00");
    click(window, $("sessionComplete"));
    equal("Danach folgt der zweite Schritt", $("sessionItemTitle").textContent, "Kurz sitzen");
    click(window, $("sessionComplete"));
    check("Am Ende schließt der Durchlauf", !$("routineSessionDialog").open);

    click(window, document.querySelector('.nav-button[data-page="entry"]'));
    check("Die Eintragung zeigt die Routine als abgeschlossen",
      document.querySelector("[data-routine-cycle]").className.includes("state-done"));
    equal("Kein Skriptfehler bei den Routinen", errors, []);
  }

  section("Sicherung");

  {
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const seed = {
      [`roleplay-v25-review-${today}`]: JSON.stringify({
        role: "Wirt", notes: "Zu sichern",
        stateCheckins: [{ slot: "morning", time: "08:00", energy: 60, mood: 60 }],
        streaks: { smokeFree: { days: 10 } }
      })
    };
    const source = boot(seed);
    let captured = null;
    source.window.Blob = class { constructor(parts) { this.parts = parts; } };
    source.window.URL.createObjectURL = blob => { captured = blob; return "blob:test"; };
    source.window.URL.revokeObjectURL = () => {};
    source.window.eval("exportBackup()");
    const payload = JSON.parse(captured.parts[0]);
    check("Das Backup enthält das Profil", Array.isArray(payload.profile.roles));
    check("Das Backup enthält die Tage", payload.reviews.length === 1);
    check("Das Backup enthält die Routinen", typeof payload.routines === "object");

    source.window.eval("exportCsv()");
    const csvHeader = captured.parts[0].split("\r\n")[0];
    check("Die CSV nennt jede Skala als Spalte", csvHeader.includes("Energie (Tagesmittel)"));
    check("Die CSV nennt jeden Streak als Spalte", csvHeader.includes("Rauchfrei (Tage)"));
    const csvRow = captured.parts[0].split("\r\n")[1];
    check("Zahlen stehen mit Komma in der CSV", !/;"\d+\.\d+"/.test(csvRow));

    const target = boot();
    target.window.FileReader = class { readAsText() { this.result = JSON.stringify(payload); this.onload(); } };
    target.window.Blob = class { constructor(parts) { this.parts = parts; } };
    target.window.URL.createObjectURL = () => "blob:test";
    target.window.URL.revokeObjectURL = () => {};
    target.window.confirm = () => true;
    check("Vor dem Import läuft das Onboarding", !target.$("onboarding").hidden);
    target.window.eval("importBackup({})");
    check("Nach dem Import ist die App bereit", target.$("onboarding").hidden && !target.$("appShell").hidden);
    equal("Die Notiz ist wieder da", target.$("notes").value, "Zu sichern");
    equal("Die Rolle ist wieder da", target.$("roleHeroName").textContent, "Wirt");
    equal("Kein Skriptfehler bei Sicherung und Import", [...source.errors, ...target.errors], []);
  }
}

/* -------------------------------------------------------------------------- */
console.log(`\n${failures.length ? "FEHLGESCHLAGEN" : "BESTANDEN"} – ${passed} Prüfungen erfolgreich, ${failures.length} fehlgeschlagen.`);
failures.forEach(failure => console.log(`  ✗ ${failure}`));
process.exit(failures.length ? 1 : 0);
