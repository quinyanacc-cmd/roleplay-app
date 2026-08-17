const PRAYERS = ["Fajr", "Dhuhr", "ʿAsr", "Maghrib", "ʿIschāʾ"];
const SUNNAH_PRAYERS = ["2 vor Fajr", "Ḍuḥā", "vor Dhuhr", "nach Dhuhr", "nach Maghrib", "nach ʿIschāʾ", "Witr", "Qiyām"];
const SUNNAH_PRAYER_STATES = [
  { value: "", label: "Offen", icon: "○", short: "Offen" },
  { value: "Verrichtet", label: "Verrichtet", icon: "✓", short: "Verrichtet" },
  { value: "Nicht vorgesehen", label: "Heute nicht vorgesehen", icon: "–", short: "Nicht vorgesehen" }
];
const PRAYER_STATES = [
  { value: "", label: "Offen", icon: "○", short: "Offen" },
  { value: "Normal", label: "Gebetet", icon: "●", short: "Gebet" },
  { value: "Gemeinschaft", label: "Moschee", icon: "🕌", short: "Moschee" },
  { value: "Verspätet", label: "Verspätet", icon: "🕓", short: "Verspätet" },
  { value: "Nachgeholt", label: "Nachgeholt", icon: "↩️", short: "Nachgeholt" },
  { value: "Nicht gebetet", label: "Nicht gebetet", icon: "❌", short: "Nicht gebetet" }
];

const PRAYER_COLOR_META = {
  Fajr: { a: "#6D63F6", b: "#27C7E8" },
  Dhuhr: { a: "#FFD15C", b: "#F2A13B" },
  "ʿAsr": { a: "#F6A54C", b: "#EC6A55" },
  Maghrib: { a: "#F36D8B", b: "#B96AF2" },
  "ʿIschāʾ": { a: "#2F7FE9", b: "#20D6CA" }
};

const ROLES = [
  { name: "Ich-Person", emoji: "🫆", color: "#4AA8FF", text: "#174E7A" },
  { name: "Vitalist", emoji: "🧬", color: "#193C8C", text: "#FFFFFF" },
  { name: "Absolvent", emoji: "🎓", color: "#F07A32", text: "#6D2E09" },
  { name: "Unternehmer", emoji: "💰", color: "#F2C94C", text: "#5D4800" },
  { name: "Muslim", emoji: "🕋", color: "#2EC4B6", text: "#075C55" },
  { name: "Wirt", emoji: "🏡", color: "#8E2F45", text: "#FFFFFF" },
  { name: "Familienmensch", emoji: "💌", color: "#72C472", text: "#205B29" }
];


/* ==========================================================================
   ICON-SYSTEM (ROLEPLAY 8.0)
   Ein einziges SVG-System für die gesamte App: 24er-Raster, gleiche optische
   Größe, Strichstärke 1.7, runde Enden und Ecken, currentColor. Es gibt
   bewusst keine zweite Icon-Quelle und keine Emoji in der Bedienoberfläche –
   Emoji bleiben ausschließlich dort, wo sie Inhalt sind (Routineschritte).
   ========================================================================== */
const ICON_PATHS = {
  "chevron-left": '<path d="M14.25 5.5 7.75 12l6.5 6.5"/>',
  "chevron-right": '<path d="M9.75 5.5 16.25 12l-6.5 6.5"/>',
  "chevron-down": '<path d="M5.5 9.25 12 15.75l6.5-6.5"/>',
  "chevron-updown": '<path d="M8.4 10.1 12 6.5l3.6 3.6"/><path d="M8.4 13.9 12 17.5l3.6-3.6"/>',
  plus: '<path d="M12 5.6v12.8M5.6 12h12.8"/>',
  minus: '<path d="M5.6 12h12.8"/>',
  close: '<path d="m6.9 6.9 10.2 10.2M17.1 6.9 6.9 17.1"/>',
  check: '<path d="m5.8 12.4 4.3 4.3 8.1-9.4"/>',
  "check-small": '<path d="m6 12.2 4 4 8-9"/>',
  dot: '<circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/>',
  circle: '<circle cx="12" cy="12" r="6.6"/>',
  dash: '<path d="M7.5 12h9"/>',
  play: '<path d="M9 6.4v11.2L18 12z" stroke-linejoin="round"/>',
  pause: '<path d="M9.5 6.5v11M14.5 6.5v11"/>',
  skip: '<path d="M7 6.5 14 12l-7 5.5z" stroke-linejoin="round"/><path d="M17.4 6.5v11"/>',
  replay: '<path d="M4.9 12a7.1 7.1 0 1 0 2.2-5.1"/><path d="M4.6 5.4v3.9h3.9"/>',
  sliders: '<path d="M6 8.5h12M6 15.5h12"/><circle cx="9.6" cy="8.5" r="2.1"/><circle cx="14.4" cy="15.5" r="2.1"/>',
  info: '<circle cx="12" cy="12" r="8.1"/><path d="M12 11.1v5"/><circle cx="12" cy="8.1" r="1.05" fill="currentColor" stroke="none"/>',
  today: '<rect x="4.2" y="5.4" width="15.6" height="14.4" rx="3.6"/><path d="M4.2 9.9h15.6M8.6 3.9v3M15.4 3.9v3"/><circle cx="12" cy="14.9" r="1.9" fill="currentColor" stroke="none"/>',
  lock: '<rect x="5.2" y="10.3" width="13.6" height="9.5" rx="3.2"/><path d="M8.6 10.3V8.1a3.4 3.4 0 0 1 6.8 0v2.2"/>',
  drop: '<path d="M12 4.4c3.1 3.4 5.4 6 5.4 8.9A5.4 5.4 0 0 1 12 19.6a5.4 5.4 0 0 1-5.4-6.3c0-2.9 2.3-5.5 5.4-8.9Z"/>',
  mosque: '<path d="M12 4.2c2.4 1.9 3.7 3.5 3.7 5.3H8.3c0-1.8 1.3-3.4 3.7-5.3Z"/><path d="M5.6 19.8v-6.2a2.4 2.4 0 0 1 4.8 0v6.2M13.6 19.8v-6.2a2.4 2.4 0 0 1 4.8 0v6.2M4 19.8h16"/>',
  clock: '<circle cx="12" cy="12" r="7.9"/><path d="M12 7.7V12l2.9 1.9"/>',
  "arrow-return": '<path d="M18.6 6.6v3.2a3.4 3.4 0 0 1-3.4 3.4H5.6"/><path d="m9.4 9.2-3.8 4 3.8 4"/>',
  trash: '<path d="M6.4 7.6h11.2M9.9 7.6V6.2a1.6 1.6 0 0 1 1.6-1.6h1a1.6 1.6 0 0 1 1.6 1.6v1.4"/><path d="M7.9 7.6v10.2a2 2 0 0 0 2 2h4.2a2 2 0 0 0 2-2V7.6"/>',
  "nav-review": '<rect x="4.8" y="3.6" width="14.4" height="16.8" rx="3.8"/><path d="M8.6 8.8h6.8M8.6 12h6.8M8.6 15.2h4.2"/>',
  "nav-routines": '<path d="M7.2 15.4a4.8 4.8 0 0 1 9.6 0"/><path d="M3.8 15.4h16.4M12 4.2v2.6M6.1 6.6l1.8 1.8M17.9 6.6l-1.8 1.8M6.9 19.2h10.2"/>',
  "nav-streaks": '<path d="M12 20.6a5.6 5.6 0 0 0 5.6-5.6c0-3.9-2.9-6.4-5.6-9.4-2.7 3-5.6 5.5-5.6 9.4A5.6 5.6 0 0 0 12 20.6Z"/><path d="M12 20.6a2.5 2.5 0 0 0 2.5-2.5c0-1.6-1.2-2.7-2.5-4-1.3 1.3-2.5 2.4-2.5 4a2.5 2.5 0 0 0 2.5 2.5Z"/>',
  star: '<path d="m12 4.6 2.35 4.9 5.25.72-3.8 3.75.92 5.32L12 16.75l-4.72 2.54.92-5.32-3.8-3.75 5.25-.72z" stroke-linejoin="round"/>',
  fingerprint: '<path d="M5.6 12a6.4 6.4 0 0 1 12.8 0"/><path d="M8.6 12.6a3.4 3.4 0 0 1 6.8-.3"/><path d="M8.7 19.1c1-1.4 1.5-3 1.5-4.7M15.3 18.9c.6-1.5.9-3.1.9-4.7"/><circle cx="12" cy="12.2" r="1.15" fill="currentColor" stroke="none"/><path d="M3.9 8.6A9.1 9.1 0 0 1 20.1 8.6"/>',
  pulse: '<path d="M3.6 12.4h3.5l2.1-5 3.2 9.6 2.3-4.6h5.7"/>',
  cap: '<path d="m12 5.1 8.2 3.7-8.2 3.7-8.2-3.7z" stroke-linejoin="round"/><path d="M7.2 10.7v4.4c0 1.6 2.1 2.9 4.8 2.9s4.8-1.3 4.8-2.9v-4.4M20.2 8.8v4.7"/>',
  growth: '<path d="M4.4 18.2v-4.5M9.6 18.2V9.9M14.8 18.2v-6.4M20 18.2V6.2"/>',
  crescent: '<path d="M17.4 15.1A6.9 6.9 0 0 1 9.1 6.4a7.6 7.6 0 1 0 8.3 8.7Z" stroke-linejoin="round"/>',
  home: '<path d="M4.6 10.6 12 4.6l7.4 6v7.2a2 2 0 0 1-2 2H6.6a2 2 0 0 1-2-2z" stroke-linejoin="round"/><path d="M9.9 19.8v-5.3h4.2v5.3"/>',
  heart: '<path d="M12 19.3s-6.9-4.2-6.9-9a3.9 3.9 0 0 1 6.9-2.5 3.9 3.9 0 0 1 6.9 2.5c0 4.8-6.9 9-6.9 9Z" stroke-linejoin="round"/>',
  handle: '<path d="M8 8.6h8M8 12h8M8 15.4h8"/>'
};

/* Baut ein Icon. Größe und Farbe kommen ausschließlich aus dem CSS. */
function icon(name, extraClass = "") {
  const body = ICON_PATHS[name];
  if (!body) return "";
  const cls = extraClass ? `rp-icon ${extraClass}` : "rp-icon";
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
}

/* Ersetzt alle im Markup vorgemerkten Icon-Platzhalter. Dadurch steht das
   gesamte Icon-Inventar an genau einer Stelle im Code. */
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(element => {
    const markup = icon(element.dataset.icon);
    if (markup) element.innerHTML = markup;
  });
}

/* Rollen-Embleme: je Rolle ein eigenes Zeichen im selben Strichstil.
   Sie ersetzen die früheren Emoji, die auf älteren Systemen als leeres
   Kästchen erschienen. Die gespeicherten Rollennamen bleiben unverändert. */
const ROLE_EMBLEMS = {
  "Ich-Person": "fingerprint",
  Vitalist: "pulse",
  Absolvent: "cap",
  Unternehmer: "growth",
  Muslim: "crescent",
  Wirt: "home",
  Familienmensch: "heart"
};

function roleEmblem(roleName) {
  return icon(ROLE_EMBLEMS[roleName] || "fingerprint");
}

/* Kurze, unaufdringliche Rückmeldung auf Geräten, die Vibration unterstützen.
   Ohne Unterstützung passiert schlicht nichts. */
function haptic(pattern = 8) {
  try {
    if (navigator.vibrate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigator.vibrate(pattern);
    }
  } catch (error) { /* Vibration ist optional */ }
}

const STREAKS = [
  { key: "cannabisFree", label: "Cannabisfrei" },
  { key: "compulsionFree", label: "Begierde" },
  { key: "alcoholFree", label: "Alkoholfrei" },
  { key: "smokeFree", label: "Rauchfrei" }
];

const EMOTION_GROUPS = [
  { label: "Sehr positiv", options: [
    ["Euphorisch", "🤩 Euphorisch"], ["Erfüllt", "🌟 Erfüllt"], ["Freudig", "😄 Freudig"], ["Begeistert", "🥳 Begeistert"], ["Inspiriert", "💡 Inspiriert"], ["Stolz", "🙌 Stolz"]
  ]},
  { label: "Positiv & tragend", options: [
    ["Zufrieden", "🙂 Zufrieden"], ["Dankbar", "🥰 Dankbar"], ["Hoffnungsvoll", "🌤️ Hoffnungsvoll"], ["Zuversichtlich", "✨ Zuversichtlich"], ["Motiviert", "🔥 Motiviert"], ["Fokussiert", "🎯 Fokussiert"], ["Neugierig", "🔎 Neugierig"], ["Verbunden", "🤝 Verbunden"], ["Liebevoll", "💗 Liebevoll"], ["Sicher", "🛡️ Sicher"], ["Erleichtert", "😮‍💨 Erleichtert"]
  ]},
  { label: "Ruhig & ausgeglichen", options: [
    ["Friedlich", "🕊️ Friedlich"], ["Gelassen", "🧘 Gelassen"], ["Ruhig", "😌 Ruhig"], ["Geerdet", "🌿 Geerdet"], ["Klar", "🧭 Klar"], ["Ausgeglichen", "⚖️ Ausgeglichen"], ["Gottesfürchtig", "🤲 Gottesfürchtig"]
  ]},
  { label: "Neutral & gemischt", options: [
    ["Neutral", "😐 Neutral"], ["Nachdenklich", "🤔 Nachdenklich"], ["Sehnsüchtig", "🌙 Sehnsüchtig"], ["Unentschlossen", "↔️ Unentschlossen"], ["Verwirrt", "😵 Verwirrt"], ["Gelangweilt", "🥱 Gelangweilt"], ["Hungrig", "🍽️ Hungrig"], ["Müde", "😴 Müde"]
  ]},
  { label: "Belastet", options: [
    ["Unsicher", "😕 Unsicher"], ["Besorgt", "😟 Besorgt"], ["Enttäuscht", "😞 Enttäuscht"], ["Frustriert", "😣 Frustriert"], ["Traurig", "😔 Traurig"], ["Einsam", "🥺 Einsam"], ["Unruhig", "😬 Unruhig"], ["Gestresst", "😵‍💫 Gestresst"], ["Gereizt", "😤 Gereizt"], ["Ärgerlich", "😠 Ärgerlich"], ["Scham", "🫣 Scham"], ["Reue", "🥀 Reue"], ["Schuldig", "😞 Schuldig"], ["Versucht", "🧲 Versuchung"], ["Begehrlich", "❤️‍🔥 Große Begierde"]
  ]},
  { label: "Stark belastet", options: [
    ["Ängstlich", "😰 Ängstlich"], ["Panik", "😱 Panik"], ["Wütend", "😡 Wütend"], ["Überfordert", "😫 Überfordert"], ["Überreizt", "🤯 Überreizt"], ["Erschöpft", "🪫 Erschöpft"], ["Leer", "🫥 Leer"], ["Hoffnungslos", "🌑 Hoffnungslos"], ["Verzweifelt", "🕳️ Verzweifelt"], ["Krank", "🤒 Krank"], ["Schmerzen", "🤕 Schmerzen"]
  ]}
];

const EMOTIONS = [
  { value: "", label: "Noch nicht eingetragen" },
  ...EMOTION_GROUPS.flatMap(group => group.options.map(([value, label]) => ({ value, label, group: group.label })))
];

// Sichtbare Auswahl. Die Werte beschreiben nur Zusammenhänge mit Energie und Befinden,
// sie sind keine moralische Bewertung der Mahlzeit.
const MEAL_CATEGORY_META = {
  "": { label: "Kategorie auswählen …", score: null },
  none: { label: "Nichts gegessen", score: 28 },
  light: { label: "Leicht", score: 78 },
  balanced: { label: "Ausgewogen", score: 90 },
  protein: { label: "Eiweißreich", score: 84 },
  sweet: { label: "Süß", score: 52 },
  fatty: { label: "Fettig", score: 44 },
  fastfood: { label: "Stark verarbeitet", score: 36 },
  large: { label: "Sehr große Mahlzeit", score: 46 }
};

// Nicht mehr angebotene Kategorien aus älteren Versionen: bleiben lesbar und exportierbar,
// erscheinen aber nur noch dann im Dropdown, wenn sie tatsächlich gespeichert sind.
const LEGACY_MEAL_CATEGORY_META = {
  irregular: { label: "Unregelmäßig / nebenbei", score: 48 },
  mixed: { label: "Gemischt", score: 62 },
  other: { label: "Sonstiges", score: 60 }
};

function mealCategoryMeta(value) {
  return MEAL_CATEGORY_META[value] || LEGACY_MEAL_CATEGORY_META[value] || null;
}

const DREAM_CATEGORIES = [
  ["", "Nicht erfasst"],
  ["none", "Kein Traum erinnert"],
  ["pleasant", "Angenehm"],
  ["neutral", "Neutral"],
  ["unusual", "Ungewöhnlich"],
  ["burdening", "Belastend"],
  ["nightmare", "Alptraum"],
  ["relapse", "Konsum- oder Rückfalltraum"],
  ["wet", "Feuchter Traum"],
  ["spiritual", "Religiös oder bedeutsam empfunden"]
];

const SLEEP_CHOICES = [0, 1, 2, 4, 5, 6];

const SLEEP_LABELS = [
  "Sehr erholsam",
  "Erholsam",
  "Okay",
  "",
  "Unruhig",
  "Kaum Schlaf",
  "Kein Schlaf"
];

const SLEEP_COLORS = ["#38d4c3", "#53d38f", "#c6de5f", "#d9dee9", "#f7b54a", "#f47c5f", "#df4050"];

const STATE_BODY_OPTIONS = {
  fit: { label: "Fit", icon: "⚡", score: 95 },
  stable: { label: "Stabil", icon: "🌿", score: 75 },
  tired: { label: "Müde", icon: "😴", score: 52 },
  exhausted: { label: "Erschöpft", icon: "🥱", score: 28 },
  sick: { label: "Krank", icon: "🤒", score: 24 },
  pain: { label: "Schmerzen", icon: "🤕", score: 30 }
};

const STATE_MIND_OPTIONS = {
  clear: { label: "Klar", icon: "🧭", score: 92 },
  normal: { label: "Ausgeglichen", icon: "🧠", score: 72 },
  scattered: { label: "Ablenkbar", icon: "🫧", score: 54 },
  strained: { label: "Angespannt", icon: "〰️", score: 44 },
  overloaded: { label: "Überfordert", icon: "🌪️", score: 25 }
};

const STATE_MOTIVATION_OPTIONS = {
  driven: { label: "Entschlossen", icon: "🔥", score: 92 },
  available: { label: "Verfügbar", icon: "→", score: 72 },
  hesitant: { label: "Zögerlich", icon: "…", score: 54 },
  resistant: { label: "Starker Widerstand", icon: "↔", score: 36 },
  blocked: { label: "Blockiert", icon: "■", score: 20 }
};

const CONTEXT_OPTIONS = {
  supportive: { label: "Unterstützend", icon: "🤝", score: 92 },
  normal: { label: "Normal", icon: "🏠", score: 72 },
  pressure: { label: "Zeitdruck", icon: "⏱️", score: 46 },
  conflict: { label: "Konflikt", icon: "⚠️", score: 34 },
  overstimulating: { label: "Überreizend", icon: "🔊", score: 29 }
};

const SUPPORT_OPTIONS = {
  strong: { label: "Gut verfügbar", score: 95 },
  available: { label: "Bei Bedarf verfügbar", score: 75 },
  limited: { label: "Begrenzt", score: 48 },
  none: { label: "Nicht verfügbar", score: 28 }
};

const CHECKIN_SLOTS = [
  { key: "night", label: "Nacht", icon: "🌙", time: "07:00", color: "#6256C7" },
  { key: "morning", label: "Morgens", icon: "🌅", time: "08:00", color: "#F2A93B" },
  { key: "midday", label: "Mittags", icon: "☀️", time: "13:00", color: "#E5B52E" },
  { key: "afternoon", label: "Nachmittags", icon: "🌤️", time: "16:00", color: "#E29A63" },
  { key: "evening", label: "Abends", icon: "🌇", time: "19:00", color: "#B268C4" }
];
/* Verbindliche Reihenfolge der Tagesreise. Sie bestimmt allein, welcher
   Check-in als nächster offen ist – die Uhrzeit tut das ausdrücklich nicht. */
const CHECKIN_CHRONOLOGY = ["night", "morning", "midday", "afternoon", "evening"];
// Tage vor Version 6 kennen nur vier Phasen; der Nachmittag fehlt dort.
const LEGACY_CHECKIN_CHRONOLOGY = ["night", "morning", "midday", "evening"];
const LOAD_OPTIONS = {
  low: { label: "Niedrig", score: 86, icon: "○" },
  normal: { label: "Normal", score: 62, icon: "◐" },
  high: { label: "Hoch", score: 28, icon: "●" }
};

const RESPONSIBILITY_SOURCE_LABELS = {
  role: "Rolle / Auftrag",
  relationship: "Beziehung",
  self: "Selbst übernommen",
  contract: "Beruf / Vertrag",
  law: "Recht / Norm",
  religion: "Religiöse Norm",
  cause: "Verursachung / Schutz"
};
const URGENCY_LABELS = { low: "gering", medium: "mittel", high: "hoch", immediate: "unmittelbar" };
const IMPACT_LABELS = { low: "gering", medium: "mittel", high: "hoch" };
const FLEXIBILITY_LABELS = { high: "hoch", medium: "mittel", low: "gering", none: "kein" };

const POSITIVE_EMOTIONS = new Set(["Euphorisch", "Erfüllt", "Freudig", "Begeistert", "Inspiriert", "Stolz", "Zufrieden", "Dankbar", "Hoffnungsvoll", "Zuversichtlich", "Motiviert", "Fokussiert", "Neugierig", "Verbunden", "Liebevoll", "Sicher", "Erleichtert", "Friedlich", "Gelassen", "Ruhig", "Geerdet", "Klar", "Ausgeglichen", "Gottesfürchtig"]);
const HEAVY_EMOTIONS = new Set(["Ängstlich", "Panik", "Wütend", "Überfordert", "Überreizt", "Erschöpft", "Leer", "Hoffnungslos", "Verzweifelt", "Krank", "Schmerzen"]);

/* ==========================================================================
   ZENTRALE KONFIGURATION DER ROLLENLOGIK
   Alle Grenzwerte, Gewichtungen und Rollentexte stehen ausschließlich hier.
   Die Oberfläche liest daraus – nirgends sonst werden diese Zahlen wiederholt.
   ========================================================================== */

/* Fünf verbindliche Modi, aufsteigend: Index 0 ist der schonendste Modus.
   Es gibt keine weiteren sichtbaren Modusbezeichnungen mehr. */
const MODE_LADDER = ["gentle", "minimum", "standard", "focus", "development"];

// Sichtbare Beschriftung und Farbe je Modus. Einzige Quelle für beides.
const MODES = [
  { key: "gentle",      label: "Schon-Modus",       icon: "◔", color: "#E77D4D" },
  { key: "minimum",     label: "Minimum",           icon: "⌁", color: "#E5A22E" },
  { key: "standard",    label: "Standard",          icon: "◐", color: "#27B9A9" },
  { key: "focus",       label: "Fokus",             icon: "◎", color: "#3D7BE8" },
  { key: "development", label: "Entwicklungsmodus", icon: "✦", color: "#7258E8" }
];

/* Frühere Modusschlüssel werden beim Laden auf die neue Fünfer-Systematik
   abgebildet. Gespeicherte Tage behalten dadurch ihre Aussage. */
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

// Gewichtung des Zustands. Laune zählt bewusst etwas stärker als Energie.
const STATE_WEIGHTS = {
  mood: 0.58,
  energy: 0.42
};

// Untergrenze je Modus, bezogen auf den gewichteten Wert 0–100.
const MODE_THRESHOLDS = {
  gentle: 0,
  minimum: 40,
  standard: 55,
  focus: 70,
  development: 92
};

/* Schutzregeln. Sie können den Modus ausschließlich begrenzen, nie anheben –
   damit ein sehr niedriger Einzelwert nicht durch einen hohen anderen Wert
   wegkompensiert wird.

   hardFloor = erzwingt genau diesen Modus
   caps      = höchstens dieser Modus
   lift      = Ausnahme, die eine Begrenzung um n Stufen anheben darf        */
const MODE_RULES = {
  // Ein extrem niedriger Einzelwert bedeutet immer den Schon-Modus.
  hardFloor: { threshold: 15, mode: "gentle" },

  caps: [
    { when: { energyBelow: 25 }, cap: "gentle" },
    { when: { moodBelow: 25 }, cap: "gentle" },
    { when: { moodBelow: 35 }, cap: "minimum" },
    { when: { energyBelow: 35 }, cap: "minimum" }
  ],

  // Sehr gute Laune darf eine energiebedingte Begrenzung um eine Stufe anheben.
  lift: {
    when: { energyFrom: 25, energyTo: 34, moodFrom: 80 },
    steps: 1
  }
};

// Feste Tagesrollen. Schlüssel entspricht getDay() (0 = Sonntag).
const DAY_ROLE_MAP = {
  1: "ich",
  2: "vitalist",
  3: "absolvent",
  4: "unternehmer",
  5: "muslim",
  6: "wirt",
  0: "familienmensch"
};

/* Tagesrollen. Der Modus erteilt bewusst keine rollenspezifischen Aufgaben
   mehr – hier steht deshalb nur noch, wie die Rolle des Tages heißt. */
const ROLE_CONFIG = {
  ich: { label: "Ich", roleName: "Ich-Person" },
  vitalist: { label: "Vitalist", roleName: "Vitalist" },
  absolvent: { label: "Absolvent", roleName: "Absolvent" },
  unternehmer: { label: "Unternehmer", roleName: "Unternehmer" },
  muslim: { label: "Muslim", roleName: "Muslim" },
  wirt: { label: "Wirt", roleName: "Wirt" },
  familienmensch: { label: "Familienmensch", roleName: "Familienmensch" }
};

/* --------------------------------------------------------------------------
   Berechnung
   -------------------------------------------------------------------------- */

function modeIndex(key) {
  const i = MODE_LADDER.indexOf(key);
  return i < 0 ? MODE_LADDER.indexOf("standard") : i;
}

// Gewichteter Zustandswert aus Energie und Laune.
function stateScore(energy, mood) {
  if (energy === null || energy === undefined || mood === null || mood === undefined) return null;
  const e = clamp(Number(energy), 0, 100);
  const m = clamp(Number(mood), 0, 100);
  return Math.round(m * STATE_WEIGHTS.mood + e * STATE_WEIGHTS.energy);
}

// Modus aus dem Zustandswert, bevor Schutzregeln greifen.
function modeFromScore(score) {
  let result = MODE_LADDER[0];
  MODE_LADDER.forEach(key => { if (score >= MODE_THRESHOLDS[key]) result = key; });
  return result;
}

/* Ermittelt den Rollenmodus aus Energie und Laune. */
function resolveMode(energy, mood) {
  const score = stateScore(energy, mood);
  if (score === null) return null;
  const e = clamp(Number(energy), 0, 100);
  const m = clamp(Number(mood), 0, 100);

  // Harte Untergrenze: ein extrem niedriger Wert bedeutet immer Schon-Modus.
  const floor = MODE_RULES.hardFloor;
  if (e <= floor.threshold || m <= floor.threshold) {
    return { key: floor.mode, score, capped: true, lifted: false };
  }

  const base = modeFromScore(score);
  let index = modeIndex(base);
  let capped = false;

  // Obergrenzen anwenden: die strengste gewinnt.
  MODE_RULES.caps.forEach(rule => {
    const hit = (rule.when.energyBelow !== undefined && e < rule.when.energyBelow)
      || (rule.when.moodBelow !== undefined && m < rule.when.moodBelow);
    if (!hit) return;
    const capIndex = modeIndex(rule.cap);
    if (capIndex <= index) { capped = capped || capIndex < index; index = Math.min(index, capIndex); }
  });

  // Ausnahme: sehr gute Laune hebt eine energiebedingte Begrenzung um eine Stufe.
  const lift = MODE_RULES.lift;
  let lifted = false;
  if (capped
      && e >= lift.when.energyFrom && e <= lift.when.energyTo
      && m >= lift.when.moodFrom) {
    const raised = Math.min(index + lift.steps, modeIndex(base));
    if (raised > index) { index = raised; lifted = true; }
  }

  return { key: MODE_LADDER[index], score, capped, lifted };
}

// Tagesrolle aus dem Datum – fest zugeordnet, unabhängig vom Zustand.
function dayRoleKey(iso = selectedDate) {
  return DAY_ROLE_MAP[new Date(`${iso}T12:00:00`).getDay()] || "ich";
}

function dayRoleConfig(iso = selectedDate) {
  return ROLE_CONFIG[dayRoleKey(iso)] || ROLE_CONFIG.ich;
}

/* ==========================================================================
   COACH-IMPULS
   Der Modus beschreibt Umfang, Tempo und Form des Handelns – nicht die
   Aufgaben. Der Coach besteht aus einem festen Kernsatz je Modus und einem
   deterministischen Zusatzsatz je Zustandskategorie. Gleiche Werte ergeben
   immer denselben Text; es gibt keinerlei Zufall.
   ========================================================================== */

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
    moodLeads: "Deine Stimmung trägt dich, aber deine Kraft braucht heute Maß.",
    energyLeads: "Kraft ist vorhanden, doch innerlich brauchst du heute weniger Druck.",
    balanced: "Ein ruhiger, leichter Rhythmus ist heute vollkommen angemessen.",
    bothHigh: "Trotz des Schwungs bleibt heute ein schonender Rahmen sinnvoll."
  },
  minimum: {
    bothLow: "Ein überschaubarer Anfang genügt; danach darfst du neu entscheiden.",
    moodLeads: "Deine Stimmung hilft dir beim Anfangen – teile deine Kraft dennoch klug ein.",
    energyLeads: "Warte nicht auf perfekte Motivation; ein klarer Anfang kann dich tragen.",
    balanced: "Ein verlässlicher nächster Schritt reicht als gute Richtung.",
    bothHigh: "Nutze den Schwung für einen klaren Schritt, ohne den Rahmen unnötig auszuweiten."
  },
  standard: {
    bothLow: "Halte den Rhythmus einfach und verlässlich, ohne zusätzlichen Druck.",
    moodLeads: "Die innere Bereitschaft ist da; plane deine Kraft mit Augenmaß.",
    energyLeads: "Energie ist verfügbar; ein klarer Rhythmus gibt ihr Richtung.",
    balanced: "Energie und Laune bilden eine tragfähige Basis.",
    bothHigh: "Die Basis trägt gut; bleib klar, statt unnötig zu beschleunigen."
  },
  focus: {
    bothLow: "Wähle einen einzigen Schwerpunkt und schütze deine verbleibende Kraft.",
    moodLeads: "Deine innere Bereitschaft ist stark; bündele sie, statt dich zu verzetteln.",
    energyLeads: "Kraft ist da; gib ihr eine klare Richtung, ohne auf den perfekten Antrieb zu warten.",
    balanced: "Du hast genug Stabilität für Tiefe – halte Ablenkungen klein.",
    bothHigh: "Energie und Laune ziehen gemeinsam – schütze deinen Fokus vor zu vielen Baustellen."
  },
  development: {
    bothLow: "Entwicklung bedeutet heute nicht mehr Menge, sondern eine kluge Verbesserung.",
    moodLeads: "Deine Begeisterung öffnet Raum; gib ihr eine klare Entwicklungsrichtung.",
    energyLeads: "Deine Kraft ist hoch; setze sie für Aufbau statt für bloßes Tempo ein.",
    balanced: "Setze einen mutigen Entwicklungsakzent, statt einfach nur mehr zu tun.",
    bothHigh: "Nutze den Schwung mutig – aber verliere dich nicht im bloßen Mehr."
  }
};

/* Zustandskategorie. Die Prüfreihenfolge ist verbindlich und darf nicht
   verändert werden: bothHigh, bothLow, moodLeads, energyLeads, balanced. */
function coachStateCategory(energy, mood) {
  const e = clamp(Number(energy), 0, 100);
  const m = clamp(Number(mood), 0, 100);
  if (e >= 80 && m >= 80) return "bothHigh";
  if (e < 40 && m < 40) return "bothLow";
  if (m - e >= 15) return "moodLeads";
  if (e - m >= 15) return "energyLeads";
  return "balanced";
}

/* Einzige Textquelle des Coaches. Hauptansicht und Check-in-Vorschau rufen
   ausschließlich diese Funktion auf – doppelte Logik gibt es nicht. */
function coachImpulse(energy, mood, key) {
  const mode = modeMeta(key);
  if (!mode || energy === null || energy === undefined || mood === null || mood === undefined) return null;
  const category = coachStateCategory(energy, mood);
  return {
    modeKey: mode.key,
    category,
    core: MODE_COACH_CORE[mode.key],
    addition: MODE_COACH_ADDITION[mode.key][category]
  };
}

const RESPONSIBILITY_KEYS = ["situationState", "responsibilityClarity", "roleScope", "appropriateness", "effectLearning"];
const ROLE_REFLECTION_ORDER = ["", "fulfilled", "adapted", "deferred", "missed", "overextended"];
const ROLE_REFLECTION_META = {
  "": { label: "Nicht reflektiert", short: "Offen", icon: "○", score: null },
  fulfilled: { label: "Verantwortungsvoll erfüllt", short: "Erfüllt", icon: "✓", score: 2 },
  adapted: { label: "Verantwortungsvoll angepasst", short: "Angepasst", icon: "≈", score: 2 },
  deferred: { label: "Verantwortungsvoll zurückgestellt", short: "Zurückgestellt", icon: "↷", score: 2 },
  missed: { label: "Nicht angemessen beantwortet", short: "Versäumt", icon: "×", score: 0 },
  overextended: { label: "Rolle überdehnt", short: "Überdehnt", icon: "!", score: 0 }
};

/* ==========================================================================
   ROLEPLAY-BILANZ
   Strukturierter Tagesabschluss ohne Freitext und ohne Punktzahl. Die
   Hauptantwort baut auf ROLE_REFLECTION_META auf; jede Antwort führt zu
   genau einer kurzen, kontrollierten Folgeauswahl.
   ========================================================================== */

const BALANCE_OUTCOMES = ["fulfilled", "adapted", "deferred", "missed", "overextended"];

// Mehrfachauswahl, höchstens zwei Angaben.
const BALANCE_DETAILS = {
  fulfilled: {
    question: "Was hat heute getragen?",
    max: 2,
    options: [
      ["clearMandate", "Klarer Auftrag"], ["fittingMode", "Passender Modus"], ["goodPreparation", "Gute Vorbereitung"],
      ["support", "Unterstützung"], ["enoughTime", "Ausreichend Zeit"], ["concentration", "Konzentration"]
    ]
  },
  adapted: {
    question: "Was wurde angepasst?",
    max: 2,
    options: [
      ["scope", "Umfang"], ["pace", "Tempo"], ["timing", "Zeitpunkt"],
      ["order", "Reihenfolge"], ["approach", "Vorgehen"], ["supportUsed", "Unterstützung genutzt"]
    ]
  },
  overextended: {
    question: "Was hat gefehlt?",
    max: 2,
    options: [
      ["boundary", "Klare Grenze"], ["time", "Zeit"], ["energy", "Energie"],
      ["authority", "Befugnis"], ["support", "Unterstützung"], ["prioritization", "Priorisierung"]
    ]
  }
};

// Einzelauswahl. dateFor benennt die Antworten mit nativem Datumsfeld.
const BALANCE_FOLLOW_UPS = {
  deferred: {
    question: "Wie wird die Restverantwortung wieder aufgenommen?",
    dateFor: ["specificDate"],
    options: [
      ["nextRoleDay", "Am nächsten Rollentag"], ["specificDate", "Zu einem konkreten Termin"],
      ["clarifyFirst", "Zuerst klären"], ["delegate", "Übergeben oder delegieren"]
    ]
  },
  missed: {
    question: "Was ist jetzt der nächste verantwortliche Umgang?",
    dateFor: ["catchUp", "replan"],
    options: [
      ["catchUp", "Nachholen"], ["makeAmends", "Wiedergutmachen"], ["clarify", "Klären"],
      ["getSupport", "Unterstützung holen"], ["replan", "Neu planen"]
    ]
  }
};

const BALANCE_MODE_FIT = [
  ["tooDemanding", "Zu fordernd"],
  ["fitting", "Passend"],
  ["tooGentle", "Zu schonend"]
];

function emptyRoleplayBalance() {
  return { outcome: "", detailKeys: [], followUpAction: "", followUpDate: "", modeFit: "", evaluatedModeKey: "", evaluatedRoleName: "" };
}

const ROUTINE_STATE_ORDER = ["", "done", "missed", "responsiblySkipped"];
const TASK_STATE_META = {
  "": { label: "Offen", short: "Offen", icon: "–", score: null, className: "open" },
  done: { label: "Erledigt", short: "Erledigt", icon: "✓", score: 1, className: "done" },
  responsiblySkipped: { label: "Gewissenhaft", short: "Gewissenhaft", icon: "✓", score: 1, className: "conscientious" },
  missed: { label: "Nicht erledigt", short: "Nicht erledigt", icon: "×", score: 0, className: "missed" }
};

const STREAK_DAILY_STATES = {
  "": { label: "Heute offen", short: "Offen", score: null },
  protected: { label: "Geschützt", short: "Geschützt", score: 1 },
  resisted: { label: "Herausforderung widerstanden", short: "Widerstanden", score: 1 },
  lapse: { label: "Unterbrechung", short: "Unterbrochen", score: 0 }
};

const ALLAH_NAMES = [
"الرَّحْمَن / Ar-Rahmān – Der Allerbarmer",
"الرَّحِيم / Ar-Rahīm – Der Barmherzige",
"الْمَلِك / Al-Malik – Der König",
"الْقُدُّوس / Al-Quddūs – Der Heilige",
"السَّلَام / As-Salām – Der Frieden",
"الْمُؤْمِن / Al-Muʾmin – Der Gewährer der Sicherheit",
"الْمُهَيْمِن / Al-Muhaymin – Der Beschützer",
"الْعَزِيز / Al-ʿAzīz – Der Allmächtige",
"الْجَبَّار / Al-Jabbār – Der Bezwinger",
"الْمُتَكَبِّر / Al-Mutakabbir – Der Erhabene",
"الْخَالِق / Al-Khāliq – Der Schöpfer",
"الْبَارِئ / Al-Bāriʾ – Der Erschaffer",
"الْمُصَوِّر / Al-Musawwir – Der Gestalter",
"الْغَفَّار / Al-Ghaffār – Der stets Vergebende",
"الْقَهَّار / Al-Qahhār – Der Allbezwinger",
"الْوَهَّاب / Al-Wahhāb – Der Schenkende",
"الرَّزَّاق / Ar-Razzāq – Der Versorger",
"الْفَتَّاح / Al-Fattāh – Der Öffnende",
"الْعَلِيم / Al-ʿAlīm – Der Allwissende",
"الْقَابِض / Al-Qābid – Der Zurückhaltende",
"الْبَاسِط / Al-Bāsit – Der Gewährende",
"الْخَافِض / Al-Khāfid – Der Erniedrigende",
"الرَّافِع / Ar-Rāfiʿ – Der Erhöhende",
"الْمُعِزّ / Al-Muʿizz – Der Ehrende",
"الْمُذِلّ / Al-Mudhill – Der Demütigende",
"السَّمِيع / As-Samīʿ – Der Allhörende",
"الْبَصِير / Al-Basīr – Der Allsehende",
"الْحَكَم / Al-Hakam – Der Richter",
"الْعَدْل / Al-ʿAdl – Der Gerechte",
"اللَّطِيف / Al-Latīf – Der Feinfühlige",
"الْخَبِير / Al-Khabīr – Der Kundige",
"الْحَلِيم / Al-Halīm – Der Nachsichtige",
"الْعَظِيم / Al-ʿAzīm – Der Gewaltige",
"الْغَفُور / Al-Ghafūr – Der Allvergebende",
"الشَّكُور / Ash-Shakūr – Der Dankbar Anerkennende",
"الْعَلِيّ / Al-ʿAliyy – Der Höchste",
"الْكَبِير / Al-Kabīr – Der Große",
"الْحَفِيظ / Al-Hafīz – Der Bewahrende",
"الْمُقِيت / Al-Muqīt – Der Ernährende",
"الْحَسِيب / Al-Hasīb – Der Abrechnende",
"الْجَلِيل / Al-Jalīl – Der Majestätische",
"الْكَرِيم / Al-Karīm – Der Großzügige",
"الرَّقِيب / Ar-Raqīb – Der Wachende",
"الْمُجِيب / Al-Mujīb – Der Erhörende",
"الْوَاسِع / Al-Wāsiʿ – Der Allumfassende",
"الْحَكِيم / Al-Hakīm – Der Allweise",
"الْوَدُود / Al-Wadūd – Der Liebevolle",
"الْمَجِيد / Al-Majīd – Der Ruhmreiche",
"الْبَاعِث / Al-Bāʿith – Der Erweckende",
"الشَّهِيد / Ash-Shahīd – Der Zeuge",
"الْحَق / Al-Haqq – Die Wahrheit",
"الْوَكِيل / Al-Wakīl – Der Sachwalter",
"الْقَوِي / Al-Qawiyy – Der Starke",
"الْمَتِين / Al-Matīn – Der Unerschütterliche",
"الْوَلِي / Al-Waliyy – Der Schutzherr",
"الْحَمِيد / Al-Hamīd – Der Lobenswerte",
"الْمُحْصِي / Al-Muhsī – Der alles Erfassende",
"الْمُبْدِئ / Al-Mubdiʾ – Der Urheber",
"الْمُعِيد / Al-Muʿīd – Der Wiederbringende",
"الْمُحْيِي / Al-Muhyī – Der Lebensspendende",
"الْمُمِيت / Al-Mumīt – Der den Tod Bestimmende",
"الْحَي / Al-Hayy – Der Lebendige",
"الْقَيُّوم / Al-Qayyūm – Der Beständige",
"الْوَاجِد / Al-Wājid – Der Findende",
"الْمَاجِد / Al-Mājid – Der Edle",
"الْوَاحِد / Al-Wāhid – Der Eine",
"الْأَحَد / Al-Ahad – Der Einzige",
"الصَّمَد / As-Samad – Der Absolute",
"الْقَادِر / Al-Qādir – Der Mächtige",
"الْمُقْتَدِر / Al-Muqtadir – Der vollkommen Mächtige",
"الْمُقَدِّم / Al-Muqaddim – Der Voranstellende",
"الْمُؤَخِّر / Al-Muʾakhkhir – Der Aufschiebende",
"الْأَوَّل / Al-Awwal – Der Erste",
"الْآخِر / Al-Ākhir – Der Letzte",
"الظَّاهِر / Az-Zāhir – Der Offenbare",
"الْبَاطِن / Al-Bātin – Der Verborgene",
"الْوَالِي / Al-Wālī – Der Herrschende",
"الْمُتَعَالِي / Al-Mutaʿālī – Der überaus Erhabene",
"الْبَر / Al-Barr – Der Gütige",
"التَّوَّاب / At-Tawwāb – Der Reue Annehmende",
"الْمُنْتَقِم / Al-Muntaqim – Der Vergelter",
"العَفُو / Al-ʿAfuww – Der Verzeihende",
"الرَّؤُوف / Ar-Raʾūf – Der Mitfühlende",
"مَالِكُ الْمُلْك / Mālik al-Mulk – Der Besitzer aller Herrschaft",
"ذُوالْجَلَالِ وَالْإِكْرَام / Dhul-Jalāli wal-Ikrām – Der Herr von Majestät und Ehre",
"الْمُقْسِط / Al-Muqsit – Der Ausgleichend Gerechte",
"الْجَامِع / Al-Jāmiʿ – Der Versammelnde",
"الْغَنِي / Al-Ghaniyy – Der Unabhängige",
"الْمُغْنِي / Al-Mughnī – Der Reichmachende",
"الْمَانِع / Al-Māniʿ – Der Abwehrende",
"الضَّار / Ad-Dārr – Der Schaden Zulassende",
"النَّافِع / An-Nāfiʿ – Der Nutzen Gewährende",
"النُّور / An-Nūr – Das Licht",
"الْهَادِي / Al-Hādī – Der Rechtleitende",
"الْبَدِيع / Al-Badīʿ – Der unvergleichliche Schöpfer",
"الْبَاقِي / Al-Bāqī – Der Bleibende",
"الْوَارِث / Al-Wārith – Der Erbe",
"الرَّشِيد / Ar-Rashīd – Der Rechtleitende",
"الصَّبُور / As-Sabūr – Der Geduldige"
];

const DEFAULT_ROUTINES = {
  morning: {
    key: "morning",
    title: "Morgenroutine",
    description: "Starte deinen Tag mit Klarheit und Fokus.",
    theme: "morning",
    autoNext: false,
    items: [
      { id: "m-candle", emoji: "🕯️", title: "Kerze", minutes: 1, context: "Alles Lob gebührt Allah, Der uns nach dem Tod wieder lebendig machte - und zu Ihm ist die Auferstehung." },
      { id: "m-medicine-cat", emoji: "🔛", title: "Tabletten / Katze", minutes: 3, context: "Medikamente einnehmen, Wasser trinken und Zizo versorgen." },
      { id: "m-ibada", emoji: "🧎🏻", title: "Ibāda", minutes: 25, context: "Gebet, Dhikr und eine bewusste Hinwendung zu Allah." },
      { id: "m-sport", emoji: "🤸🏻", title: "Sport", minutes: 5, context: "Kurz aktiv werden. Entscheidend ist, überhaupt anzufangen." },
      { id: "m-bed", emoji: "🛏️", title: "Fertigmachen + Bett", minutes: 15, context: "Waschen, anziehen, Bett machen und den Raum in Ordnung bringen." },
      { id: "m-breakfast", emoji: "🥗", title: "Frühstücken", minutes: 2, context: "Frühstück vorbereiten oder bewusst einplanen." },
      { id: "m-thumb-yoga", emoji: "🪷", title: "Daumen Yoga", minutes: 3, context: "Kurze Mobilisation der Hände und Finger." },
      { id: "m-quizlet", emoji: "📋", title: "Quizlet", minutes: 5, context: "Wiederholung statt Perfektion." },
      { id: "m-peak", emoji: "💡", title: "Peak", minutes: 15, context: "Kognitives Training konzentriert durchführen." },
      { id: "m-english", emoji: "🔤", title: "Englisch", minutes: 25, context: "Eine klar definierte Lerneinheit abschließen." },
      { id: "m-arabic", emoji: "📒", title: "Arabisch", minutes: 5, context: "Auch eine kurze Wiederholung zählt." },
      { id: "m-writing", emoji: "📝", title: "Schreiben", minutes: 10, context: "Gedanken festhalten oder am Buch weiterarbeiten." },
      { id: "m-finish", emoji: "🎒", title: "Fertigmachen", minutes: 5, context: "Alles Nötige einpacken und den nächsten Übergang vorbereiten." }
    ]
  },
  evening: {
    key: "evening",
    title: "Abendroutine",
    description: "Schließe deinen Tag bewusst und ruhig ab.",
    theme: "evening",
    autoNext: false,
    items: [
      { id: "e-candle-1", emoji: "🕯️", title: "Kerze", minutes: 2.5, context: "https://diegebetszeiten.de/koran/al-ihlas\n\nOh Allah, hilf mir, Deiner zu gedenken, Dir zu danken und Dir auf die beste Weise zu dienen" },
      { id: "e-clothes", emoji: "👕", title: "Kleidung", minutes: 10, context: "Kleidung für den nächsten Tag vollständig bereitlegen." },
      { id: "e-bathroom", emoji: "🧼", title: "Badezimmer", minutes: 5, context: "Waschen, Zähne putzen und dich ruhig auf die Nacht einstellen." },
      { id: "e-kitchen", emoji: "🍵", title: "Küche", minutes: 10, context: "Küche kurz ordnen und alles für morgen sauber hinterlassen." },
      { id: "e-plan", emoji: "🗓️", title: "Tag vorbereiten", minutes: 5, context: "Kurz den morgigen Tag gedanklich vorbereiten." },
      { id: "e-weekplan", emoji: "📋", title: "Wochenplan", minutes: 10, context: "Plane bewusst und prüfe, was morgen wirklich wichtig ist." },
      { id: "e-quizlet", emoji: "📰", title: "Quizlet", minutes: 5, context: "Nur eine kurze Wiederholung – Kontinuität zählt." },
      { id: "e-english", emoji: "🔤", title: "Englisch", minutes: 10, context: "Lerneinheit abschließen oder kurz wiederholen." },
      { id: "e-arabic", emoji: "📒", title: "Arabisch", minutes: 5, context: "Eine kurze Wiederholung oder ein kleiner Lernschritt reicht aus." },
      { id: "e-candle-2", emoji: "🕯️", title: "Kerze", minutes: 2.5, context: "https://diegebetszeiten.de/koran/al-baqara/#255\n\nĀyat al-Kursī lesen und den Tag im Gedenken an Allah abschließen." }
    ]
  }
};

// Dauerauswahl im Schritt-Editor: 1 bis 180 Minuten als native iOS-Auswahl.
const ROUTINE_MINUTE_CHOICES = Array.from({ length: 180 }, (_, index) => index + 1);
const APP_VERSION = "8.0";
const STORAGE_NAMESPACE = "roleplay-v25";
const ROUTINES_STORAGE_KEY = `${STORAGE_NAMESPACE}-routines`;
const BACKUP_TIMESTAMP_KEY = `${STORAGE_NAMESPACE}-last-backup-at`;
const ROUTINE_SESSION_STORAGE_KEY = `${STORAGE_NAMESPACE}-active-routine-session`;
const $ = id => document.getElementById(id);

let selectedDate = todayISO();
let currentData = null;
let calendarCursor = firstOfMonth(selectedDate);
let routines = null;
let activeRoutineKey = null;
let editingRoutineItemId = null;
let activityDragIndex = null;
let routineDragIndex = null;
let routineSession = null;
let autoSaveTimer = null;
let streaksUnlocked = false;

function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function dateToISO(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function addDays(iso, amount) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + amount);
  return dateToISO(d);
}

/* --------------------------------------------------------------------------
   Kalenderwochen
   Die Woche läuft immer von Montag bis Sonntag – kein gleitendes Fenster.
   -------------------------------------------------------------------------- */
function mondayOf(iso) {
  const d = new Date(`${iso}T12:00:00`);
  const shift = (d.getDay() + 6) % 7;   // Montag = 0
  d.setDate(d.getDate() - shift);
  return dateToISO(d);
}

// Stabiler Schlüssel einer Kalenderwoche: das Datum ihres Montags.
function firstOfMonth(iso) {
  return `${iso.slice(0, 7)}-01`;
}

function storageKey(date) { return `${STORAGE_NAMESPACE}-review-${date}`; }
function safeParse(text, fallback = null) { try { return JSON.parse(text); } catch { return fallback; } }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function escapeHTML(value = "") { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }

function linkifyText(value = "") {
  const escaped = escapeHTML(value);
  return escaped
    .replace(/(https?:\/\/[^\s<]+)/gi, url => {
      const clean = url.replace(/[),.;!?]+$/, "");
      const suffix = url.slice(clean.length);
      return `<a href="${clean}" target="_blank" rel="noopener noreferrer">${clean}</a>${suffix}`;
    })
    .replace(/\n/g, "<br>");
}

function getRole(name) {
  const normalized = ["Yannick", "Ich"].includes(name) ? "Ich-Person" : name;
  return ROLES.find(role => role.name === normalized) || ROLES[0];
}

function defaultRoleForDate(date) {
  const weekday = new Date(`${date}T12:00:00`).getDay();
  const names = ["Familienmensch", "Ich-Person", "Vitalist", "Absolvent", "Unternehmer", "Muslim", "Wirt"];
  return names[weekday];
}

function findPreviousReview(date) {
  let cursor = date;
  for (let i = 0; i < 3650; i += 1) {
    cursor = addDays(cursor, -1);
    const rawText = localStorage.getItem(storageKey(cursor));
    if (!rawText) continue;
    const data = safeParse(rawText);
    if (data) return { date: cursor, data };
  }
  return null;
}

function inheritedStreaks(previousData) {
  return Object.fromEntries(STREAKS.map(streak => {
    const old = previousData?.streaks?.[streak.key];
    const previousDays = typeof old === "object" && old !== null ? Number(old.days || 0) : 0;
    const wasBroken = typeof old === "object" && old !== null ? Boolean(old.broken || old.status === "broken") : false;
    return [streak.key, { days: wasBroken ? 0 : previousDays + 1, broken: false, todayStatus: "" }];
  }));
}

function emptyReview(date) {
  const previous = findPreviousReview(date)?.data;
  return {
    role: defaultRoleForDate(date),
    breakfast: "", lunch: "", dinner: "", snack: "",
    mealCategories: { breakfast: "", lunch: "", dinner: "", snack: "" },
    water: "0", steps: "",
    morningRoutineState: "", eveningRoutineState: "",
    morningRoutine: false, eveningRoutine: false,
    routineProgress: { morning: {}, evening: {} },
    prayers: Object.fromEntries(PRAYERS.map(prayer => [prayer, ""])),
    sunnahPrayers: Object.fromEntries(SUNNAH_PRAYERS.map(prayer => [prayer, ""])),
    ramadanDays: previous?.ramadanDays !== undefined ? Number(previous.ramadanDays) : -29,
    fastingCompleted: false,
    sleepQualityScore: "",
    dreamCategory: "",
    dreams: "",
    activities: [],
    streaks: inheritedStreaks(previous),
    mood: "",
    gratitude1: "", gratitude2: "", allahName: "",
    stateCheckins: [],
    responsibility: Object.fromEntries(RESPONSIBILITY_KEYS.map(key => [key, null])),
    roleReflections: Object.fromEntries(ROLES.map(role => [role.name, ""])),
    responsibilityNote: "",
    responsibilityMain: "", responsibilityAdaptation: "", responsibilityNextStep: "",
    roleplayBalance: emptyRoleplayBalance(),
    // Neue Tage arbeiten mit fünf Check-ins; historische Tage bleiben bei vier.
    checkinStructure: 5,
    notes: ""
  };
}

/* Prüft die Bilanz gegen feste erlaubte Listen. Unbekannte oder nicht mehr
   passende Werte werden verworfen, ohne andere Angaben zu verlieren. */
function normalizeRoleplayBalance(raw, fallbackOutcome = "") {
  const balance = emptyRoleplayBalance();
  balance.outcome = BALANCE_OUTCOMES.includes(raw?.outcome) ? raw.outcome
    : BALANCE_OUTCOMES.includes(fallbackOutcome) ? fallbackOutcome : "";

  const detail = BALANCE_DETAILS[balance.outcome];
  if (detail) {
    const allowed = detail.options.map(([key]) => key);
    const seen = new Set();
    balance.detailKeys = (Array.isArray(raw?.detailKeys) ? raw.detailKeys : [])
      .filter(key => allowed.includes(key) && !seen.has(key) && seen.add(key) !== false)
      .slice(0, detail.max);
  }

  const followUp = BALANCE_FOLLOW_UPS[balance.outcome];
  if (followUp) {
    const allowed = followUp.options.map(([key]) => key);
    balance.followUpAction = allowed.includes(raw?.followUpAction) ? raw.followUpAction : "";
    if (balance.followUpAction && followUp.dateFor.includes(balance.followUpAction)
        && /^\d{4}-\d{2}-\d{2}$/.test(String(raw?.followUpDate || ""))) {
      balance.followUpDate = raw.followUpDate;
    }
  }

  balance.modeFit = BALANCE_MODE_FIT.some(([key]) => key === raw?.modeFit) ? raw.modeFit : "";
  balance.evaluatedModeKey = modeKey(raw?.evaluatedModeKey);
  balance.evaluatedRoleName = String(raw?.evaluatedRoleName || "");
  return balance;
}

function legacySleepScore(value) {
  return ({ "Sehr gut": 1, "Gut": 2, "Neutral": 2, "Schlecht": 4, "Sehr schlecht": 5 })[value] ?? "";
}

function normalizeReview(raw, date, hasStoredValue) {
  const base = emptyReview(date);
  const merged = { ...base, ...(raw || {}) };
  merged.role = getRole(raw?.role || base.role).name;
  merged.prayers = { ...base.prayers, ...(raw?.prayers || {}) };
  merged.sunnahPrayers = { ...base.sunnahPrayers, ...(raw?.sunnahPrayers || {}) };
  merged.activities = Array.isArray(raw?.activities) ? raw.activities.map(item => ({
    title: String(item.title || ""),
    role: getRole(item.role || "Ich-Person").name
  })).filter(item => item.title) : [];
  merged.mealCategories = Object.fromEntries(["breakfast", "lunch", "dinner", "snack"].map(key => {
    const value = raw?.mealCategories?.[key] || "";
    return [key, mealCategoryMeta(value) ? value : ""];
  }));
  merged.dreamCategory = DREAM_CATEGORIES.some(([value]) => value === raw?.dreamCategory) ? raw.dreamCategory : "";
  const normalizeRoutineState = value => {
    // "angepasst erfüllt" aus älteren Versionen wird zu "Gewissenhaft".
    const migrated = ["adapted", "adaptedFulfilled", "responsibly-skipped", "angepasst"].includes(value) ? "responsiblySkipped" : value;
    return TASK_STATE_META[migrated] ? migrated : "";
  };
  const morningState = raw?.morningRoutineState || (raw?.morningRoutine ? "done" : "");
  const eveningState = raw?.eveningRoutineState || (raw?.eveningRoutine ? "done" : "");
  merged.morningRoutineState = normalizeRoutineState(morningState);
  merged.eveningRoutineState = normalizeRoutineState(eveningState);
  const normalizedSleep = raw?.sleepQualityScore ?? legacySleepScore(raw?.sleepQuality);
  merged.sleepQualityScore = normalizedSleep === "" || normalizedSleep === undefined || normalizedSleep === null ? "" : Number(normalizedSleep);
  merged.routineProgress = {
    morning: { ...(raw?.routineProgress?.morning || {}) },
    evening: { ...(raw?.routineProgress?.evening || {}) }
  };
  merged.stateCheckins = Array.isArray(raw?.stateCheckins) ? raw.stateCheckins.map((entry, index) => {
    const time = /^\d{2}:\d{2}$/.test(entry.time || "") ? entry.time : "12:00";
    const inferredSlot = entry.slot || legacySlotForTime(time);
    return {
      id: String(entry.id || `state-${date}-${index}`),
      slot: CHECKIN_SLOTS.some(slot => slot.key === inferredSlot) ? inferredSlot : legacySlotForTime(time),
      time,
      energy: entry.energy === "" || entry.energy === undefined || entry.energy === null ? null : clamp(Number(entry.energy), 0, 100),
      mood: entry.mood === "" || entry.mood === undefined || entry.mood === null ? null : clamp(Number(entry.mood), 0, 100),
      load: LOAD_OPTIONS[entry.load] ? entry.load : "normal",
      body: STATE_BODY_OPTIONS[entry.body] ? entry.body : "stable",
      mind: STATE_MIND_OPTIONS[entry.mind] ? entry.mind : "normal",
      motivation: STATE_MOTIVATION_OPTIONS[entry.motivation] ? entry.motivation : "available",
      context: CONTEXT_OPTIONS[entry.context || entry.environment] ? (entry.context || entry.environment) : "normal",
      support: SUPPORT_OPTIONS[entry.support] ? entry.support : "available",
      emotion: EMOTIONS.some(option => option.value === entry.emotion) ? entry.emotion : "",
      primaryRole: getRole(entry.primaryRole || raw?.role || base.role).name,
      responsibilitySource: RESPONSIBILITY_SOURCE_LABELS[entry.responsibilitySource] ? entry.responsibilitySource : "role",
      responsibility: String(entry.responsibility || ""),
      urgency: URGENCY_LABELS[entry.urgency] ? entry.urgency : "medium",
      impact: IMPACT_LABELS[entry.impact] ? entry.impact : "medium",
      flexibility: FLEXIBILITY_LABELS[entry.flexibility] ? entry.flexibility : "medium",
      conflict: ["no", "possible", "yes"].includes(entry.conflict) ? entry.conflict : "no",
      hydrationMl: Math.max(0, Number(entry.hydrationMl ?? raw?.water ?? 0)),
      nutritionScore: Number.isFinite(Number(entry.nutritionScore)) ? clamp(Number(entry.nutritionScore), 0, 100) : null,
      sleepQualityScore: entry.sleepQualityScore === "" || entry.sleepQualityScore === undefined || entry.sleepQualityScore === null ? "" : clamp(Number(entry.sleepQualityScore), 0, 6),
      dreamCategory: DREAM_CATEGORIES.some(([value]) => value === entry.dreamCategory) ? entry.dreamCategory : "",
      dreamNote: String(entry.dreamNote || ""),
      selectedFrameworkKey: modeKey(entry.selectedFrameworkKey),
      recommendedFrameworkKey: modeKey(entry.recommendedFrameworkKey),
      frameworkOverrideReason: String(entry.frameworkOverrideReason || ""),
      note: String(entry.note || ""),
      createdAt: entry.createdAt || `${date}T${time}:00`
    };
  }).sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time)) : [];
  // Migration: früher lag der Schlafbereich außerhalb der Check-ins. Vorhandene alte
  // Schlafdaten werden einmalig in einen Nacht-Check-in überführt, sofern noch keiner existiert.
  if (hasStoredValue && !merged.stateCheckins.some(entry => entry.slot === "night")) {
    const legacySleep = merged.sleepQualityScore;
    const legacyDream = merged.dreamCategory || "";
    const legacyDreamNote = String(raw?.dreams || "");
    if (legacySleep !== "" || legacyDream || legacyDreamNote) {
      merged.stateCheckins = [{
        id: `state-${date}-night-migrated`,
        slot: "night", time: "07:00",
        energy: null, mood: null, load: "normal", body: "stable", mind: "normal", motivation: "available",
        context: "normal", support: "available", emotion: "",
        primaryRole: merged.role, responsibilitySource: "role", responsibility: "",
        urgency: "medium", impact: "medium", flexibility: "medium", conflict: "no",
        hydrationMl: Math.max(0, Number(raw?.water || 0)), nutritionScore: null,
        sleepQualityScore: legacySleep, dreamCategory: legacyDream, dreamNote: legacyDreamNote,
        selectedFrameworkKey: "", recommendedFrameworkKey: "", frameworkOverrideReason: "",
        note: "", createdAt: `${date}T07:00:00`
      }, ...merged.stateCheckins];
    }
  }

  const legacyResponsibility = raw?.responsibility || {};
  const migratedResponsibility = {
    situationState: legacyResponsibility.situationState ?? legacyResponsibility.stateHonesty,
    responsibilityClarity: legacyResponsibility.responsibilityClarity ?? legacyResponsibility.amanahCare,
    roleScope: legacyResponsibility.roleScope ?? legacyResponsibility.boundaryRespect,
    appropriateness: legacyResponsibility.appropriateness ?? legacyResponsibility.roleFidelity,
    effectLearning: legacyResponsibility.effectLearning ?? null
  };
  merged.responsibility = Object.fromEntries(RESPONSIBILITY_KEYS.map(key => {
    const value = migratedResponsibility[key];
    return [key, [0, 1, 2].includes(Number(value)) ? Number(value) : null];
  }));
  merged.roleReflections = Object.fromEntries(ROLES.map(role => {
    const legacyValue = raw?.roleReflections?.[role.name] ?? (role.name === "Ich-Person" ? raw?.roleReflections?.Yannick : undefined);
    const value = legacyValue === "responsible" ? "fulfilled" : legacyValue === "partial" ? "adapted" : legacyValue;
    return [role.name, ROLE_REFLECTION_ORDER.includes(value) ? value : ""];
  }));
  merged.responsibilityNote = String(raw?.responsibilityNote || "");
  merged.responsibilityMain = String(raw?.responsibilityMain || "");
  merged.responsibilityAdaptation = String(raw?.responsibilityAdaptation || "");
  merged.responsibilityNextStep = String(raw?.responsibilityNextStep || raw?.responsibilityNote || "");
  /* Tagesstruktur: gespeicherte Angabe hat Vorrang. Fehlt sie, gilt ein
     bereits gespeicherter zurückliegender Tag als Vierer-Tag – der Nachmittag
     wird dort nicht rückwirkend als Versäumnis gewertet. Sobald dort ein
     Nachmittag eingetragen ist, gilt die Fünfer-Struktur. */
  const storedStructure = Number(raw?.checkinStructure);
  merged.checkinStructure = storedStructure === 4 || storedStructure === 5
    ? storedStructure
    : (hasStoredValue && date < todayISO() ? 4 : 5);
  if (merged.stateCheckins.some(entry => entry.slot === "afternoon")) merged.checkinStructure = 5;

  /* Bilanz: ältere Tage können ihre bisherige Rollenreflexion als
     Hauptantwort weiterverwenden. Vorhandene Felder bleiben unberührt. */
  merged.roleplayBalance = normalizeRoleplayBalance(raw?.roleplayBalance, merged.roleReflections?.[merged.role] || "");

  merged.streaks = hasStoredValue ? { ...base.streaks } : base.streaks;
  STREAKS.forEach(streak => {
    const old = raw?.streaks?.[streak.key];
    if (old && typeof old === "object") {
      const broken = Boolean(old.broken || old.status === "broken" || old.todayStatus === "lapse");
      merged.streaks[streak.key] = { days: Math.max(0, Number(old.days || 0)), broken, todayStatus: STREAK_DAILY_STATES[old.todayStatus] ? old.todayStatus : (broken ? "lapse" : "") };
    } else if (!merged.streaks[streak.key]) {
      merged.streaks[streak.key] = { days: 0, broken: false, todayStatus: "" };
    }
  });
  return merged;
}

function loadReview(date) {
  const rawText = localStorage.getItem(storageKey(date));
  const raw = rawText ? safeParse(rawText, {}) : {};
  return normalizeReview(raw, date, Boolean(rawText));
}

function collectForm() {
  if (!currentData) return;
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "gratitude1", "gratitude2", "allahName", "responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep", "notes"].forEach(id => {
    if ($(id)) currentData[id] = $(id).value;
  });
  currentData.mealCategories = currentData.mealCategories || { breakfast: "", lunch: "", dinner: "", snack: "" };
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const select = $(`${key}Category`);
    if (select) currentData.mealCategories[key] = mealCategoryMeta(select.value) ? select.value : "";
  });
  currentData.ramadanDays = Number(currentData.ramadanDays || 0);
  currentData.role = $("dayRole")?.value || currentData.role;
  currentData.morningRoutine = currentData.morningRoutineState === "done";
  currentData.eveningRoutine = currentData.eveningRoutineState === "done";
}

function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => saveReview(true), 550);
}

function saveReview(silent = false) {
  collectForm();
  localStorage.setItem(storageKey(selectedDate), JSON.stringify(currentData));
  renderStats();
  renderRoutineCards();
  if (!silent) {
    const button = $("saveButton");
    const original = button.innerHTML;
    button.innerHTML = `${icon("check")}<span>Gespeichert</span>`;
    button.classList.add("is-saved");
    haptic();
    setTimeout(() => { button.innerHTML = original; button.classList.remove("is-saved"); }, 1200);
  }
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00`));
}

function formatLongDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00`));
}

function formatShortDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" }).format(new Date(`${iso}T12:00:00`));
}

function setDate(date) {
  weekOffset = 0;
  balanceModeFitNotice = false;
  selectedDate = date;
  calendarCursor = firstOfMonth(date);
  currentData = loadReview(date);
  $("dateButton").textContent = formatDate(date);
  updateTodayJump();
  dismissUndo();
  fillForm();
  renderStats();
  renderRoutineCards();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

function fillForm() {
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "gratitude1", "gratitude2", "allahName", "responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep", "notes"].forEach(id => {
    if ($(id)) $(id).value = currentData[id] ?? "";
  });
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const select = $(`${key}Category`);
    if (!select) return;
    const value = currentData.mealCategories?.[key] || "";
    select.innerHTML = mealCategoryOptionsHTML(value);
    select.value = value;
  });
  updateMealSelectionStyles();
  $("dayRole").value = getRole(currentData.role).name;
  applyRolePickerStyle();
  renderWaterControl();
  updateRamadanDisplay();
  updateRoutineStateButtons();
  renderPrayers();
  renderActivities();
  renderStateOverview();
  renderResponsibilityReflection();
  renderRoleplayBalance();
  renderStreaks();
}

function currentClockTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

/* Nur noch für Altdaten: Einträge aus früheren Versionen ohne gespeicherte
   Phase bekommen daraus ihre Zuordnung. Für die Frage, welcher Check-in als
   nächster offen ist, wird die Uhrzeit ausdrücklich nicht mehr verwendet. */
function legacySlotForTime(time = currentClockTime()) {
  const hour = Number(String(time).slice(0, 2));
  if (hour < 10) return "morning";
  if (hour < 16) return "midday";
  if (hour < 21) return "evening";
  return "night";
}

/* Struktur des angezeigten Tages: 5 Phasen (ab Version 6) oder 4 Phasen
   (historische Tage). Historische Tage bekommen den Nachmittag nicht
   nachträglich als Versäumnis angerechnet. */
function checkinStructure(data = currentData) {
  return Number(data?.checkinStructure) === 4 ? 4 : 5;
}

function activeChronology(data = currentData) {
  return checkinStructure(data) === 4 ? LEGACY_CHECKIN_CHRONOLOGY : CHECKIN_CHRONOLOGY;
}

function slotIndex(key) {
  const index = CHECKIN_CHRONOLOGY.indexOf(key);
  return index < 0 ? CHECKIN_CHRONOLOGY.length : index;
}

function checkinSlot(key) {
  return CHECKIN_SLOTS.find(slot => slot.key === key) || CHECKIN_SLOTS[0];
}

function emotionStateScore(value) {
  if (!value) return 65;
  if (POSITIVE_EMOTIONS.has(value)) return 88;
  if (HEAVY_EMOTIONS.has(value)) return 26;
  if (["Traurig", "Besorgt", "Enttäuscht", "Frustriert", "Gestresst", "Gereizt", "Ärgerlich", "Scham", "Reue", "Schuldig", "Einsam", "Unruhig", "Versucht", "Begehrlich"].includes(value)) return 43;
  return 62;
}

function sleepCapacityScore(value) {
  if (value === "" || value === undefined || value === null || Number(value) === 3) return null;
  return ({ 0: 95, 1: 86, 2: 72, 4: 48, 5: 28, 6: 12 })[Number(value)] ?? null;
}

function mealKeysForSlot(slot) {
  if (slot === "morning") return ["breakfast"];
  if (slot === "midday") return ["breakfast", "lunch"];
  if (slot === "afternoon") return ["breakfast", "lunch", "snack"];
  if (slot === "evening") return ["breakfast", "lunch", "snack", "dinner"];
  return ["breakfast", "lunch", "snack", "dinner"];
}

function mealContextScore(slot, data = currentData) {
  const values = mealKeysForSlot(slot).map(key => data?.mealCategories?.[key] || "").filter(Boolean);
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + (mealCategoryMeta(value)?.score ?? 62), 0) / values.length);
}

function mealCategoryLabel(value) {
  return mealCategoryMeta(value)?.label || "Noch offen";
}

function latestNightCheckin(data = currentData) {
  return (data?.stateCheckins || []).find(entry => entry.slot === "night") || null;
}

function innerStateCapacity(checkin) {
  if (!checkin) return null;
  if (checkin.slot === "night") {
    return sleepCapacityScore(checkin.sleepQualityScore) ?? 62;
  }
  const energy = checkin.energy === null || checkin.energy === undefined ? 60 : clamp(Number(checkin.energy), 0, 100);
  const mood = checkin.mood === null || checkin.mood === undefined ? emotionStateScore(checkin.emotion) : clamp(Number(checkin.mood), 0, 100);
  const emotion = emotionStateScore(checkin.emotion);
  const load = LOAD_OPTIONS[checkin.load]?.score ?? LOAD_OPTIONS.normal.score;
  return Math.round(energy * .40 + mood * .28 + emotion * .12 + load * .20);
}

function hydrationContextScore(slot, ml) {
  const thresholds = { morning: 500, midday: 1000, afternoon: 1250, evening: 1500, night: 1800 };
  const target = thresholds[slot] || 1000;
  if (!Number.isFinite(Number(ml)) || Number(ml) <= 0) return null;
  return clamp(Math.round(Number(ml) / target * 100), 0, 100);
}

function stateCapacity(checkin, data = currentData) {
  const inner = innerStateCapacity(checkin);
  if (inner === null) return null;
  if (checkin.slot === "night") return inner;
  const night = latestNightCheckin(data);
  const sleep = sleepCapacityScore(night?.sleepQualityScore);
  const hydration = hydrationContextScore(checkin.slot, checkin.hydrationMl);
  const nutrition = checkin.nutritionScore;
  const weighted = [{ value: inner, weight: .78 }];
  if (sleep !== null) weighted.push({ value: sleep, weight: .10 });
  if (hydration !== null) weighted.push({ value: hydration, weight: .06 });
  if (nutrition !== null) weighted.push({ value: nutrition, weight: .06 });
  return Math.round(weighted.reduce((sum, item) => sum + item.value * item.weight, 0) / weighted.reduce((sum, item) => sum + item.weight, 0));
}

/* --------------------------------------------------------------------------
   Rollenmodus-Empfehlung
   Der Modus entsteht ausschließlich aus Energie und Laune. Die Gewichtung,
   die Schwellen und die Schutzregeln stehen zentral in STATE_WEIGHTS,
   MODE_THRESHOLDS und MODE_RULES – hier werden keine Zahlen wiederholt.

   Eine manuelle Auswahl gibt es nicht mehr; der Modus ist immer automatisch.
   -------------------------------------------------------------------------- */

// Liefert Energie und Laune eines Check-ins, oder null wenn nicht erfasst.
function checkinValues(checkin) {
  if (!checkin) return null;
  const e = checkin.energy === null || checkin.energy === undefined ? null : clamp(Number(checkin.energy), 0, 100);
  const m = checkin.mood === null || checkin.mood === undefined ? null : clamp(Number(checkin.mood), 0, 100);
  if (e === null || m === null) return null;
  return { energy: e, mood: m };
}

function recommendedModeForCheckin(checkin, data = currentData) {
  const values = checkinValues(checkin);
  if (!values) return null;
  const resolved = resolveMode(values.energy, values.mood);
  if (!resolved) return null;
  const mode = modeMeta(resolved.key) || MODES[0];
  return {
    ...mode,
    score: resolved.score,
    lifted: Boolean(resolved.lifted),
    energy: values.energy,
    mood: values.mood
  };
}

// Es gibt keine manuelle Auswahl: der empfohlene Modus ist zugleich der gültige.
function modeForCheckin(checkin, data = currentData) {
  return recommendedModeForCheckin(checkin, data);
}

// Maßgeblicher Modus des Tages: der zuletzt erfasste Check-in bestimmt ihn.
function currentDayMode(data = currentData) {
  return modeForCheckin(latestStateCheckin(data), data);
}


function checkinReasonFactors(checkin, data = currentData) {
  if (!checkin) return [];
  const factors = [];
  if (checkin.slot === "night") {
    if (checkin.sleepQualityScore !== "" && checkin.sleepQualityScore !== undefined) factors.push(`Schlaf: ${SLEEP_LABELS[Number(checkin.sleepQualityScore)] || "erfasst"}`);
    if (checkin.dreamCategory) factors.push(`Traum: ${dreamCategoryLabel(checkin.dreamCategory)}`);
    return factors;
  }
  factors.push(`Energie: ${checkin.energy ?? "–"} %`);
  factors.push(`Laune: ${checkin.mood ?? "–"} %`);
  if (checkin.emotion) factors.push(`Gefühl: ${checkin.emotion}`);
  factors.push(`Belastung: ${LOAD_OPTIONS[checkin.load]?.label || "Normal"}`);
  const night = latestNightCheckin(data);
  if (night?.sleepQualityScore !== "" && night?.sleepQualityScore !== undefined) factors.push(`Schlaf: ${SLEEP_LABELS[Number(night.sleepQualityScore)] || "erfasst"}`);
  const water = Number(checkin.hydrationMl || 0);
  if (water > 0) factors.push(`Getrunken: ${(water / 1000).toFixed(1).replace(".", ",")} L`);
  const meals = mealKeysForSlot(checkin.slot).map(key => data?.mealCategories?.[key]).filter(Boolean);
  if (meals.length) factors.push(`Ernährung: ${meals.map(mealCategoryLabel).join(" · ")}`);
  return factors;
}

function latestStateCheckin(data = currentData) {
  const entries = Array.isArray(data?.stateCheckins) ? data.stateCheckins : [];
  return [...entries].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time)).at(-1) || null;
}

/* Kreisförmige Tagesdarstellung mit vier Segmenten.
   Jedes Segment ist eine echte Schaltfläche und öffnet den jeweiligen
   Check-in – der Kreis ersetzt die früheren Karten also auch funktional. */
/* ==========================================================================
   ROLEPLAY STATE CYCLE
   Kein Fortschrittsring, sondern ein vollständiger Tageszyklus.

   Die vier Tagesphasen laufen im Uhrzeigersinn:
     oben links   Nacht    (180°–270°)
     oben rechts  Morgen   (270°–360°)
     unten rechts Mittag   (0°–90°)
     unten links  Abend    (90°–180°)

   Die Farbwelten sind so gewählt, dass sie ineinander übergehen: das Ende
   jeder Phase liegt nahe am Anfang der nächsten, und Abend läuft zurück in
   die Nacht. Dadurch liest sich der Ring als EIN Zyklus, nicht als vier
   eingefärbte Buttons.

   Eine Phase ohne Zustandsaufnahme bleibt gedämpft. "Beleuchtet" bedeutet
   ausdrücklich nicht "erledigt", sondern: für diese Phase liegt eine
   Zustandsaufnahme vor.
   ========================================================================== */

/* Farbwelten der vier Tageszeiten. a und b spannen den Verlauf des Knotens,
   line ist die Farbe in der Verbindungslinie, glow der weiche Schein. */
const CYCLE_PHASES = {
  night:     { short: "Nacht",      from: 180, a: "#4F5BD5", b: "#8145D8", line: "#6B4FD6", glow: "rgba(101,79,214,.42)" },
  morning:   { short: "Morgen",     from: 270, a: "#9B5CF0", b: "#F79A3C", line: "#E4735F", glow: "rgba(233,124,80,.45)" },
  midday:    { short: "Mittag",     from: 0,   a: "#F7B733", b: "#2FBEDD", line: "#63C3C9", glow: "rgba(60,190,214,.40)" },
  // Nachmittag: der Türkis-Gold-Ton des Mittags läuft in wärmere Abendfarben.
  afternoon: { short: "Nachmittag", from: 60,  a: "#54C6D6", b: "#F0A15C", line: "#E29A63", glow: "rgba(226,154,99,.40)" },
  evening:   { short: "Abend",      from: 120, a: "#E0619B", b: "#6A4FCF", line: "#A65AB6", glow: "rgba(166,90,182,.40)" }
};

/* Farbanker rund um den Tag. Zwischen ihnen wird interpoliert, deshalb gibt
   es keine Segmentgrenzen: der Ring läuft als ein einziger Verlauf durch.

   Der Weg folgt einem echten Tag – tiefes Indigo, violette Dämmerung,
   Sonnenaufgang, Gold, klarer Mittagshimmel, weicher Nachmittag,
   Sonnenuntergang, Abendrot, Abenddämmerung und zurück ins Indigo. */
const CYCLE_STOPS = [
  { at: 180, c: "#2A2E6B" },   // Abend geht in die Nacht über
  { at: 205, c: "#1D2456" },
  { at: 225, c: "#171F4F" },   // tiefste Nacht
  { at: 250, c: "#3B2F6E" },
  { at: 270, c: "#6B4C86" },   // Dämmerung
  { at: 292, c: "#C2705F" },
  { at: 315, c: "#F0906A" },   // Sonnenaufgang
  { at: 337, c: "#F7BE6C" },
  { at: 360, c: "#EFD98F" },   // später Vormittag
  { at: 22,  c: "#BCDDD8" },
  { at: 45,  c: "#86D2E8" },   // klarer Mittagshimmel
  { at: 68,  c: "#9AC8E6" },
  { at: 90,  c: "#B3B9DE" },   // Nachmittag wird weicher
  { at: 112, c: "#E9A87A" },   // Sonnenuntergang
  { at: 135, c: "#D2708F" },   // Abendrot
  { at: 157, c: "#8A5794" },   // Abenddämmerung
  { at: 180, c: "#2A2E6B" }
];

// Ergänzt einen rgb()-Wert um einen Alphakanal.
function rgbWithAlpha(rgb, alpha) {
  const m = String(rgb).match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!m) return rgb;
  return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})`;
}

function hexToRgbTriple(hex) {
  const v = hex.replace("#", "");
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

/* Die Ankerwinkel werden einmalig zu einer aufsteigenden Folge ab 180°
   aufgerollt (180 … 540), damit die Suche auch über den Nullpunkt hinweg
   funktioniert. */
const CYCLE_STOPS_UNWRAPPED = (() => {
  let previous = CYCLE_STOPS[0].at;
  return CYCLE_STOPS.map((stop, index) => {
    if (index === 0) return { at: previous, c: stop.c };
    let at = stop.at;
    while (at <= previous) at += 360;
    previous = at;
    return { at, c: stop.c };
  });
})();

// Farbe an einem beliebigen Winkel – lineare Mischung der beiden Nachbaranker.
function cycleColorAt(angle) {
  const base = CYCLE_STOPS_UNWRAPPED[0].at;
  const a = ((angle - base) % 360 + 360) % 360 + base;
  for (let i = 0; i < CYCLE_STOPS_UNWRAPPED.length - 1; i += 1) {
    const s0 = CYCLE_STOPS_UNWRAPPED[i];
    const s1 = CYCLE_STOPS_UNWRAPPED[i + 1];
    if (a >= s0.at && a <= s1.at) {
      const t = s1.at === s0.at ? 0 : (a - s0.at) / (s1.at - s0.at);
      const c0 = hexToRgbTriple(s0.c);
      const c1 = hexToRgbTriple(s1.c);
      return `rgb(${c0.map((v, k) => Math.round(v + (c1[k] - v) * t)).join(",")})`;
    }
  }
  return CYCLE_STOPS_UNWRAPPED[0].c;
}


/* Hervorgehoben wird immer der erste noch nicht ausgefüllte Check-in in der
   festen Reihenfolge – unabhängig von der Uhrzeit. Sind alle erledigt,
   leuchtet keiner mehr. */
function pendingPhaseKey() {
  const bySlot = Object.fromEntries((currentData?.stateCheckins || []).map(e => [e.slot, e]));
  return activeChronology().find(key => !bySlot[key]) || null;
}

/* Tageszeit-Symbole in einheitlichem Strichstil, mittig auf 0 0 gezeichnet.
   Bewusst eine einzige Formsprache statt gemischter Icon-Stile. */
function phaseGlyph(key) {
  if (key === "night") {
    // Sichel aus zwei Bögen, dazu zwei ruhige Lichtpunkte.
    return `<svg viewBox="-16 -16 32 32" class="phase-glyph" aria-hidden="true">
      <g transform="rotate(-18)">
        <path d="M6.2 -8.1A10.2 10.2 0 1 0 6.2 8.1A9.2 9.2 0 0 1 6.2 -8.1Z"></path>
      </g>
      <circle class="phase-spark" cx="9.4" cy="-8.6" r="1.25"></circle>
      <circle class="phase-spark" cx="12.4" cy="-3.4" r="0.9"></circle>
    </svg>`;
  }
  if (key === "morning") {
    // Aufgehende Sonne: Halbbogen über dem Horizont, Strahlen nach oben.
    return `<svg viewBox="-16 -16 32 32" class="phase-glyph" aria-hidden="true">
      <path d="M-7.2 3.4A7.2 7.2 0 0 1 7.2 3.4"></path>
      <path d="M-12.6 3.4H12.6"></path>
      <path d="M0 -12.6V-9.6"></path>
      <path d="M-9.6 -6.4 -7.4 -4.2"></path>
      <path d="M9.6 -6.4 7.4 -4.2"></path>
      <path d="M-6.4 8.6H6.4"></path>
    </svg>`;
  }
  if (key === "midday") {
    const rays = [0, 45, 90, 135, 180, 225, 270, 315].map(degree => {
      const angle = degree * Math.PI / 180;
      return `<path d="M${(Math.cos(angle) * 9.4).toFixed(2)} ${(Math.sin(angle) * 9.4).toFixed(2)}
        L${(Math.cos(angle) * 12.8).toFixed(2)} ${(Math.sin(angle) * 12.8).toFixed(2)}"></path>`;
    }).join("");
    return `<svg viewBox="-16 -16 32 32" class="phase-glyph" aria-hidden="true">
      <circle cx="0" cy="0" r="6"></circle>${rays}
    </svg>`;
  }
  if (key === "afternoon") {
    // Sonne steht klar über dem Horizont, aber nicht mehr im Zenit.
    return `<svg viewBox="-16 -16 32 32" class="phase-glyph" aria-hidden="true">
      <circle cx="0" cy="-3.2" r="5.2"></circle>
      <path d="M0 -13V-10.6"></path>
      <path d="M-8.2 -11.4 -6.5 -9.7"></path>
      <path d="M8.2 -11.4 6.5 -9.7"></path>
      <path d="M-12.2 -3.2H-9.8"></path>
      <path d="M12.2 -3.2H9.8"></path>
      <path d="M-11.6 8.2H11.6"></path>
    </svg>`;
  }
  // Abend: die Scheibe sinkt hinter den Horizont, darunter die Spiegelung.
  return `<svg viewBox="-16 -16 32 32" class="phase-glyph" aria-hidden="true">
    <path d="M-7.6 1.2A7.6 7.6 0 0 1 7.6 1.2"></path>
    <path d="M-12.6 1.2H12.6"></path>
    <path d="M-7.4 6.4H7.4"></path>
    <path d="M-3.8 11H3.8"></path>
  </svg>`;
}

/* Horizontale Tagesbahn über fünf Phasen: Nacht → Morgen → Mittag →
   Nachmittag → Abend. Vier sichtbar unterscheidbare Zustände:
     erledigt  – farbig, mit Haken
     jetzt     – moderat größer und farbig
     später    – ruhig und neutral
     nicht Teil des Tages – historische Vierer-Tage ohne Nachmittag
   Die Verbindungslinie besteht aus eigenständigen Segmenten, die
   ausschließlich die Zwischenräume füllen und die Kreise nicht berühren. */
function renderCheckinSlots() {
  const container = $("checkinSlots");
  if (!container || !currentData) return;
  const bySlot = Object.fromEntries((currentData.stateCheckins || []).map(entry => [entry.slot, entry]));
  const pending = pendingPhaseKey();
  const active = activeChronology();

  const stops = CHECKIN_CHRONOLOGY.map(key => {
    const phase = CYCLE_PHASES[key];
    const entry = bySlot[key];
    const state = entry ? "done"
      : !active.includes(key) ? "outside"
      : key === pending ? "current" : "upcoming";
    return { key, phase, entry, state };
  });

  // Ein Segment je Zwischenraum. Farbe links und rechts aus den Nachbarn.
  const linkColor = stop => (stop.state === "done" || stop.state === "current") ? stop.phase.line : "var(--journey-idle)";
  const links = stops.slice(0, -1).map((stop, index) =>
    `<i style="--i:${index};--from:${linkColor(stop)};--to:${linkColor(stops[index + 1])}"></i>`).join("");

  /* Ab Version 8 stehen in der gespeicherten Übersicht keine Zahlen und keine
     Prozentzeichen mehr. Der Status wird über Farbe, Häkchen, Wortmarke und –
     bei erfassten Phasen – über zwei feine Intensitätsbalken vermittelt.
     Energie und Laune bleiben unverändert gespeichert, fließen weiterhin
     vollständig in die Modusberechnung ein und stehen für Hilfstechnologien
     im aria-label sowie sichtbar unter „Verlauf & Details“. */
  const nodes = stops.map(stop => {
    const { key, phase, entry, state } = stop;
    const action = state === "done" ? "bearbeiten" : "eintragen";
    const readable = entry
      ? `erfasst, Energie ${entry.energy ?? "nicht angegeben"} von 100, Laune ${entry.mood ?? "nicht angegeben"} von 100`
      : state === "outside" ? "für diesen Tag nicht vorgesehen"
      : state === "current" ? "jetzt an der Reihe" : "noch nicht erfasst";
    const statusWord = state === "done" ? "Erfasst"
      : state === "current" ? "Jetzt"
      : state === "outside" ? "–" : "Offen";
    const foot = state === "done"
      ? `<span class="stop-meters" aria-hidden="true">
           <i class="stop-meter energy" style="--fill:${clamp(Number(entry.energy ?? 0), 0, 100)}%"></i>
           <i class="stop-meter mood" style="--fill:${clamp(Number(entry.mood ?? 0), 0, 100)}%"></i>
         </span>`
      : `<span class="stop-status" aria-hidden="true">${statusWord}</span>`;
    return `<button type="button" class="journey-stop is-${state}" data-open-checkin-slot="${key}"
        style="--stop-a:${phase.a};--stop-b:${phase.b};--stop-line:${phase.line};--stop-glow:${phase.glow}"
        aria-label="${escapeHTML(phase.short)} ${action}. ${escapeHTML(readable)}.">
      <span class="stop-node">
        <span class="stop-icon">${phaseGlyph(key)}</span>
        ${state === "done" ? `<span class="stop-check" aria-hidden="true">${icon("check-small")}</span>` : ""}
      </span>
      <span class="stop-name">${escapeHTML(phase.short)}</span>
      <span class="stop-foot">${foot}</span>
    </button>`;
  }).join("");

  container.innerHTML = `<div class="day-journey">
    <div class="journey-stops">
      <span class="journey-links" aria-hidden="true">${links}</span>
      ${nodes}
    </div>
  </div>`;

  container.querySelectorAll("[data-open-checkin-slot]").forEach(element => {
    element.addEventListener("click", () => { haptic(); openStateCheckinDialog(element.dataset.openCheckinSlot); });
  });

  renderCheckinProgress(stops);
}

/* Ruhige Orientierungszeile über der Tagesbahn: wie viele Phasen sind
   erfasst und welche ist als nächste dran. Ersetzt keine Anzeige, sondern
   nutzt bereits vorhandene Daten. */
function renderCheckinProgress(stops) {
  const label = $("checkinProgress");
  if (!label) return;
  const relevant = stops.filter(stop => stop.state !== "outside");
  const done = relevant.filter(stop => stop.state === "done").length;
  const next = stops.find(stop => stop.state === "current");
  label.textContent = done === 0
    ? `Noch nichts erfasst · Start mit ${next ? next.phase.short : "der Nacht"}`
    : done >= relevant.length
      ? `Alle ${relevant.length} Phasen erfasst`
      : `${done} von ${relevant.length} erfasst · Als Nächstes ${next ? next.phase.short : ""}`.trim();
}

/* Coach-Fläche: kleine Überschrift, kräftiger Kernsatz, ruhiger Zusatzsatz.
   Beide Texte stammen ausschließlich aus coachImpulse(). */
function coachImpulseHTML(energy, mood, key) {
  const impulse = coachImpulse(energy, mood, key);
  if (!impulse) return "";
  return `<div class="coach-impulse">
    <span class="coach-eyebrow">Impuls für jetzt</span>
    <strong class="coach-core">${escapeHTML(impulse.core)}</strong>
    <span class="coach-addition">${escapeHTML(impulse.addition)}</span>
  </div>`;
}

function renderStateOverview() {
  const summary = $("currentStateSummary");
  const timeline = $("stateTimeline");
  if (!summary || !timeline || !currentData) return;
  renderCheckinSlots();
  const checkins = [...(currentData.stateCheckins || [])].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || (a.time || "").localeCompare(b.time || ""));
  // Maßgeblich ist der neueste vorhandene Check-in des Tages.
  const latest = [...checkins].at(-1);
  const mode = modeForCheckin(latest);
  const role = dayRoleConfig(selectedDate);

  if (!latest || !mode) {
    /* Leerzustand mit konkreter Orientierung: er benennt, was zu tun ist,
       und führt mit einem Tippen genau dorthin. */
    const nextKey = pendingPhaseKey() || CHECKIN_CHRONOLOGY[0];
    const nextPhase = CYCLE_PHASES[nextKey] || CYCLE_PHASES.morning;
    summary.className = "current-state-summary state-readout is-empty";
    summary.removeAttribute("style");
    summary.innerHTML = `
      <p class="readout-empty"><strong>Noch kein Check-in</strong>Energie und Laune genügen – daraus ergibt sich der Rollenmodus für diesen Tag.</p>
      <button type="button" class="readout-empty-action" data-open-checkin-slot="${nextKey}">
        ${icon("plus")}<span>${escapeHTML(nextPhase.short)} eintragen</span>
      </button>`;
    summary.querySelectorAll("[data-open-checkin-slot]").forEach(button =>
      button.addEventListener("click", () => { haptic(); openStateCheckinDialog(button.dataset.openCheckinSlot); }));
  } else {
    /* Die Auswertung liest sich als Ergebnis: zuerst Tagesrolle und Modus,
       dann die beiden Messwerte, darunter der Coach-Impuls. Es erscheinen
       hier bewusst keine Aufgaben und keine Begründungstexte. */
    summary.className = "current-state-summary state-readout";
    summary.style.setProperty("--mode-color", mode.color);
    summary.style.setProperty("--mode-soft", hexToRgba(mode.color, .13));
    summary.style.setProperty("--mode-line", hexToRgba(mode.color, .28));
    summary.innerHTML = `
      <div class="readout-head">
        <span class="readout-role">${escapeHTML(role.roleName)}</span>
        <strong class="readout-mode">${escapeHTML(mode.label)}</strong>
      </div>
      <div class="readout-metrics">
        <div class="readout-metric energy">
          <span>Energie</span><b>${latest.energy ?? "–"} %</b>
          <i style="--fill:${clamp(Number(latest.energy ?? 0), 0, 100)}%"></i>
        </div>
        <div class="readout-metric mood">
          <span>Laune</span><b>${latest.mood ?? "–"} %</b>
          <i style="--fill:${clamp(Number(latest.mood ?? 0), 0, 100)}%"></i>
        </div>
      </div>
      ${coachImpulseHTML(latest.energy, latest.mood, mode.key)}`;
  }

  timeline.innerHTML = checkins.length ? [...checkins].reverse().map(entry => {
    const entryMode = modeForCheckin(entry);
    const slot = checkinSlot(entry.slot);
    const sleep = entry.slot === "night" && entry.sleepQualityScore !== "" && entry.sleepQualityScore !== undefined
      ? ` · ${SLEEP_LABELS[Number(entry.sleepQualityScore)] || "Schlaf erfasst"}` : "";
    const details = `${entry.energy ?? "–"} % Energie · ${entry.mood ?? "–"} % Laune${sleep}`;
    return `<article class="state-timeline-item" style="--framework-color:${entryMode?.color || "var(--muted)"}">
      <div class="state-timeline-marker"></div>
      <div class="state-timeline-copy">
        <div class="state-timeline-title"><strong><span class="timeline-phase" aria-hidden="true">${phaseGlyph(entry.slot)}</span>${escapeHTML(slot.label)} · ${escapeHTML(entry.time || "")}</strong><span>${escapeHTML(entryMode?.label || "")}</span></div>
        <small>${escapeHTML(details)}</small>
      </div>
      <button type="button" class="state-delete-button" data-delete-state-checkin="${escapeHTML(entry.id)}" aria-label="Check-in löschen">${icon("trash")}</button>
    </article>`;
  }).join("") : `<p class="state-timeline-empty">Noch keine Momentaufnahme gespeichert.</p>`;

  timeline.querySelectorAll("[data-delete-state-checkin]").forEach(button => button.addEventListener("click", () => {
    const removed = (currentData.stateCheckins || []).find(entry => entry.id === button.dataset.deleteStateCheckin);
    currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.id !== button.dataset.deleteStateCheckin);
    saveReview(true);
    syncRoleplayBalanceMode();
    renderStateOverview();
    renderRoleplayBalance();
    haptic(12);
    if (removed) offerUndo(`${checkinSlot(removed.slot).label} gelöscht`, () => {
      currentData.stateCheckins = [...(currentData.stateCheckins || []), removed];
      saveReview(true);
      syncRoleplayBalanceMode();
      renderStateOverview();
      renderRoleplayBalance();
      renderStats();
    });
  }));
}

function emotionOptionsHTML() {
  return `<option value="">Noch nicht eingetragen</option>${EMOTION_GROUPS.map(group => `<optgroup label="${escapeHTML(group.label)}">${group.options.map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`).join("")}</optgroup>`).join("")}`;
}


function dreamCategoryLabel(value) {
  return DREAM_CATEGORIES.find(([key]) => key === value)?.[1] || "Nicht erfasst";
}


function toggleNightCheckinFields(slotKey) {
  const isNight = slotKey === "night";
  // Die Nacht zeigt zusätzlich Schlaf und Traum – Energie und Laune bleiben sichtbar.
  if ($("nightCheckinSection")) $("nightCheckinSection").hidden = !isNight;
  if ($("dayCheckinSection")) $("dayCheckinSection").hidden = false;
}

function fillStateCheckinForm(slotKey) {
  const requestedSlot = CHECKIN_CHRONOLOGY.includes(slotKey) ? slotKey : (pendingPhaseKey() || CHECKIN_CHRONOLOGY[0]);
  const existing = (currentData.stateCheckins || []).find(entry => entry.slot === requestedSlot);
  const latest = [...(currentData.stateCheckins || [])].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot)).at(-1);
  const slot = checkinSlot(requestedSlot);
  $("stateCheckinDialog").dataset.editingSlot = requestedSlot;
  $("stateSlot").value = requestedSlot;
  // Der Dialog nimmt die Farbwelt der angetippten Tagesphase auf, damit er
  // sich wie eine Fortsetzung der Zyklusdarstellung anfühlt.
  const phase = CYCLE_PHASES[requestedSlot] || CYCLE_PHASES.morning;
  // Die Farben stammen direkt aus dem Tageszyklus: Anfang, Mitte und Ende der
  // Phase. Dadurch trägt der Dialog dieselbe Lichtstimmung wie der Ring.
  const phaseStart = cycleColorAt(phase.from + 12);
  const phaseMid = cycleColorAt(phase.from + 45);
  const phaseEnd = cycleColorAt(phase.from + 78);
  const dialog = $("stateCheckinDialog");
  dialog.dataset.phase = requestedSlot;
  dialog.style.setProperty("--phase-a", phaseStart);
  dialog.style.setProperty("--phase-b", phaseEnd);
  dialog.style.setProperty("--phase-veil", rgbWithAlpha(phaseStart, .16));
  dialog.style.setProperty("--phase-veil-b", rgbWithAlpha(phaseEnd, .13));
  $("stateSlotDisplay").style.setProperty("--slot-color", phaseMid);
  $("stateSlotDisplay").style.setProperty("--slot-soft", rgbWithAlpha(phaseMid, .16));
  $("stateSlotDisplay").style.setProperty("--slot-glow", rgbWithAlpha(phaseEnd, .28));
  $("stateSlotDisplay").innerHTML = `<span class="phase-mark" aria-hidden="true"><svg viewBox="0 0 40 30">${phaseGlyph(requestedSlot, 20, 15)}</svg></span>`
    + `<strong>${escapeHTML(phase.short)}</strong><small>${requestedSlot === "night" ? "Schlaf und Zustand" : "Zustandsaufnahme"}</small>`;
  // Energie und Laune gelten für alle vier Check-ins, auch für die Nacht.
  $("stateEnergy").value = existing?.energy ?? latest?.energy ?? 60;
  $("stateMood").value = existing?.mood ?? latest?.mood ?? 60;
  $("stateTime").value = existing?.time || (selectedDate === todayISO() ? currentClockTime() : slot.time);
  const sleepValue = existing?.sleepQualityScore ?? currentData.sleepQualityScore ?? "";
  $("stateSleepQuality").value = sleepValue;
  $("stateDreamCategory").value = existing?.dreamCategory || currentData.dreamCategory || "";
  $("stateDreamNote").value = existing?.dreamNote || currentData.dreams || "";
  toggleNightCheckinFields(requestedSlot);
  // Zurücksetzen nur anbieten, wenn für diese Tagesphase etwas gespeichert ist.
  const resetButton = $("resetStateCheckin");
  if (resetButton) resetButton.hidden = !existing;
  if ($("stateDialogTitle")) $("stateDialogTitle").textContent = phase.short;
  updateStateCheckinPreview();
}

function openStateCheckinDialog(slotKey = null) {
  fillStateCheckinForm(slotKey || pendingPhaseKey() || CHECKIN_CHRONOLOGY[0]);
  $("stateCheckinDialog").showModal();
}

/* Entfernt die Zustandsaufnahme einer einzelnen Tagesphase. Die übrigen
   Angaben des Tages bleiben unberührt – nur dieser eine Eintrag verschwindet. */
function resetStateCheckin(slotKey) {
  if (!currentData || !slotKey) return;
  const before = (currentData.stateCheckins || []).length;
  const removed = (currentData.stateCheckins || []).filter(entry => entry.slot === slotKey);
  currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.slot !== slotKey);
  if (currentData.stateCheckins.length === before) return;
  if (removed.length) offerUndo(`${checkinSlot(slotKey).label} zurückgesetzt`, () => {
    currentData.stateCheckins = [...(currentData.stateCheckins || []), ...removed];
    saveReview(true);
    syncRoleplayBalanceMode();
    renderStateOverview();
    renderRoleplayBalance();
    renderStats();
  });
  saveReview(true);
  syncRoleplayBalanceMode();
  renderStateOverview();
  renderRoleplayBalance();
  renderStats();
}

function stateCheckinFromForm() {
  const slot = $("stateSlot").value;
  const nightSleep = $("stateSleepQuality").value;
  const energyRaw = $("stateEnergy").value;
  const moodRaw = $("stateMood").value;
  const existing = (currentData.stateCheckins || []).find(entry => entry.slot === slot);
  return {
    slot,
    energy: Number(energyRaw === "" ? 60 : energyRaw),
    mood: Number(moodRaw === "" ? 60 : moodRaw),
    primaryRole: currentData.role,
    hydrationMl: Math.max(0, Number(currentData.water || 0)),
    sleepQualityScore: slot === "night" ? (nightSleep === "" ? "" : Number(nightSleep)) : "",
    dreamCategory: slot === "night" ? $("stateDreamCategory").value : "",
    dreamNote: slot === "night" ? $("stateDreamNote").value.trim() : "",
    time: $("stateTime").value || currentClockTime(),
    // Frühere Felder bleiben erhalten, damit alte Tage unverändert bestehen –
    // für die Modusberechnung werden sie nicht mehr gelesen.
    ...(existing ? {
      load: existing.load,
      emotion: existing.emotion,
      note: existing.note,
      selectedFrameworkKey: existing.selectedFrameworkKey,
      frameworkOverrideReason: existing.frameworkOverrideReason
    } : {})
  };
}


function updateStateCheckinPreview() {
  if (!$("stateEnergy")) return;
  const draft = stateCheckinFromForm();
  const mode = modeForCheckin(draft);
  $("stateEnergyValue").textContent = `${draft.energy ?? 0} %`;
  $("stateMoodValue").textContent = `${draft.mood ?? 0} %`;
  const preview = $("stateFrameworkPreviewText");
  if (!preview) return;
  if (!mode) { preview.innerHTML = ""; return; }
  const role = dayRoleConfig(selectedDate);
  preview.style.setProperty("--framework-color", mode.color);
  preview.style.setProperty("--framework-soft", hexToRgba(mode.color, .12));
  preview.style.setProperty("--framework-glow", hexToRgba(mode.color, .24));
  preview.style.setProperty("--mode-color", mode.color);
  preview.style.setProperty("--mode-soft", hexToRgba(mode.color, .13));
  preview.style.setProperty("--mode-line", hexToRgba(mode.color, .28));
  // Dieselbe zentrale Textfunktion wie in der Hauptansicht.
  preview.innerHTML = `<strong>${escapeHTML(role.roleName)} · ${escapeHTML(mode.label)}</strong>`
    + coachImpulseHTML(draft.energy, draft.mood, mode.key);
}

function saveStateCheckin(event) {
  event.preventDefault();
  const entry = stateCheckinFromForm();
  const recommended = recommendedModeForCheckin(entry);
  entry.recommendedFrameworkKey = recommended?.key || "";
    const existing = (currentData.stateCheckins || []).find(item => item.slot === entry.slot);
  entry.id = existing?.id || `state-${selectedDate}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  entry.createdAt = existing?.createdAt || `${selectedDate}T${entry.time}:00`;
  currentData.stateCheckins = [...(currentData.stateCheckins || []).filter(item => item.slot !== entry.slot), entry]
    .sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time));
  if (entry.slot === "night") {
    currentData.sleepQualityScore = entry.sleepQualityScore;
    currentData.dreamCategory = entry.dreamCategory;
    currentData.dreams = entry.dreamNote;
  }
  // Wird ein Nachmittag bewusst eingetragen, wechselt der Tag dauerhaft
  // auf die Fünfer-Struktur. Werte werden dabei nie erfunden.
  if (entry.slot === "afternoon") currentData.checkinStructure = 5;
  $("stateCheckinDialog").close();
  saveReview(true);
  syncRoleplayBalanceMode();
  renderStateOverview();
  renderRoleplayBalance();
}

/* Hinweis nach einer kontrollierten Rücksetzung der Moduspassung.
   Gilt nur für die laufende Ansicht, wird nicht gespeichert. */
let balanceModeFitNotice = false;

/* Ändert sich der maßgebliche Modus nachträglich, wird ausschließlich die
   Passungsbewertung zurückgesetzt. Die Verantwortungsbilanz bleibt erhalten. */
function syncRoleplayBalanceMode() {
  if (!currentData) return;
  const balance = currentData.roleplayBalance;
  const mode = currentDayMode();
  if (!balance || !mode) return;
  if (balance.modeFit && balance.evaluatedModeKey && balance.evaluatedModeKey !== mode.key) {
    balance.modeFit = "";
    balance.evaluatedModeKey = mode.key;
    balance.evaluatedRoleName = dayRoleConfig(selectedDate).roleName;
    balanceModeFitNotice = true;
    saveReview(true);
  }
}

function balanceChipHTML(action, value, label, selected, disabled = false) {
  return `<button type="button" class="balance-chip${selected ? " is-selected" : ""}${disabled ? " is-disabled" : ""}"
    data-balance-action="${action}" data-balance-value="${escapeHTML(value)}"
    aria-pressed="${selected ? "true" : "false"}"${disabled ? " aria-disabled=\"true\"" : ""}>${escapeHTML(label)}</button>`;
}

function renderRoleplayBalance() {
  const container = $("roleplayBalance");
  if (!container || !currentData) return;
  const balance = currentData.roleplayBalance = normalizeRoleplayBalance(currentData.roleplayBalance);
  const mode = currentDayMode();

  const outcomeChips = BALANCE_OUTCOMES
    .map(key => balanceChipHTML("outcome", key, ROLE_REFLECTION_META[key].short, balance.outcome === key))
    .join("");

  let followUpBlock = "";
  const detail = BALANCE_DETAILS[balance.outcome];
  if (detail) {
    const full = balance.detailKeys.length >= detail.max;
    followUpBlock = `<div class="balance-block">
      <p class="balance-question" id="balanceDetailQuestion">${escapeHTML(detail.question)}</p>
      <div class="balance-options" role="group" aria-labelledby="balanceDetailQuestion">
        ${detail.options.map(([key, label]) => {
          const selected = balance.detailKeys.includes(key);
          return balanceChipHTML("detail", key, label, selected, !selected && full);
        }).join("")}
      </div>
      <small class="balance-hint">Höchstens zwei Angaben.</small>
    </div>`;
  }

  const followUp = BALANCE_FOLLOW_UPS[balance.outcome];
  if (followUp) {
    const showDate = balance.followUpAction && followUp.dateFor.includes(balance.followUpAction);
    followUpBlock = `<div class="balance-block">
      <p class="balance-question" id="balanceFollowUpQuestion">${escapeHTML(followUp.question)}</p>
      <div class="balance-options" role="group" aria-labelledby="balanceFollowUpQuestion">
        ${followUp.options.map(([key, label]) => balanceChipHTML("followUp", key, label, balance.followUpAction === key)).join("")}
      </div>
      ${showDate ? `<div class="balance-date field-group">
        <label for="balanceFollowUpDate">Datum</label>
        <input id="balanceFollowUpDate" type="date" value="${escapeHTML(balance.followUpDate)}">
      </div>` : ""}
    </div>`;
  }

  const fitLabel = mode ? `${mode.label} bewerten` : "Nach dem ersten Check-in verfügbar.";
  const fitOptions = BALANCE_MODE_FIT.map(([key, label]) =>
    `<button type="button" class="balance-segment${balance.modeFit === key ? " is-selected" : ""}"
      data-balance-action="modeFit" data-balance-value="${key}"
      aria-pressed="${balance.modeFit === key ? "true" : "false"}"${mode ? "" : " disabled"}>${escapeHTML(label)}</button>`).join("");

  container.innerHTML = `
    <div class="balance-block">
      <p class="balance-question" id="balanceOutcomeQuestion">Wie habe ich meine Verantwortung heute beantwortet?</p>
      <div class="balance-options" role="group" aria-labelledby="balanceOutcomeQuestion">${outcomeChips}</div>
    </div>
    ${followUpBlock}
    <div class="balance-block">
      <p class="balance-question" id="balanceModeFitQuestion">War der empfohlene Rollenmodus rückblickend passend?</p>
      <small class="balance-hint${mode ? " is-mode" : ""}"${mode ? ` style="color:${mode.color}"` : ""}>${escapeHTML(fitLabel)}</small>
      <div class="balance-segmented${mode ? "" : " is-disabled"}" role="group" aria-labelledby="balanceModeFitQuestion">${fitOptions}</div>
      ${balanceModeFitNotice && mode ? `<small class="balance-hint">Der maßgebliche Modus hat sich geändert – bitte erneut einschätzen.</small>` : ""}
    </div>`;
}

/* Ein einziger delegierter Listener für die gesamte Bilanz. Die Karte wird
   bei jeder Änderung neu gezeichnet; es entstehen keine verwaisten Handler. */
function bindRoleplayBalance() {
  const container = $("roleplayBalance");
  if (!container) return;

  container.addEventListener("click", event => {
    const button = event.target.closest("button[data-balance-action]");
    if (!button || button.disabled || button.classList.contains("is-disabled") || !currentData) return;
    const balance = currentData.roleplayBalance = normalizeRoleplayBalance(currentData.roleplayBalance);
    const value = button.dataset.balanceValue;

    if (button.dataset.balanceAction === "outcome") {
      // Wechselt die Hauptantwort, werden unpassende Detailangaben verworfen.
      balance.outcome = balance.outcome === value ? "" : value;
      balance.detailKeys = [];
      balance.followUpAction = "";
      balance.followUpDate = "";
    } else if (button.dataset.balanceAction === "detail") {
      const detail = BALANCE_DETAILS[balance.outcome];
      if (!detail) return;
      if (balance.detailKeys.includes(value)) balance.detailKeys = balance.detailKeys.filter(key => key !== value);
      else if (balance.detailKeys.length < detail.max) balance.detailKeys = [...balance.detailKeys, value];
    } else if (button.dataset.balanceAction === "followUp") {
      const followUp = BALANCE_FOLLOW_UPS[balance.outcome];
      if (!followUp) return;
      balance.followUpAction = balance.followUpAction === value ? "" : value;
      if (!balance.followUpAction || !followUp.dateFor.includes(balance.followUpAction)) balance.followUpDate = "";
    } else if (button.dataset.balanceAction === "modeFit") {
      const mode = currentDayMode();
      if (!mode) return;
      balance.modeFit = balance.modeFit === value ? "" : value;
      balance.evaluatedModeKey = balance.modeFit ? mode.key : "";
      balance.evaluatedRoleName = balance.modeFit ? dayRoleConfig(selectedDate).roleName : "";
      balanceModeFitNotice = false;
    } else return;

    saveReview(true);
    renderRoleplayBalance();
  });

  container.addEventListener("change", event => {
    if (event.target.id !== "balanceFollowUpDate" || !currentData) return;
    const balance = currentData.roleplayBalance;
    balance.followUpDate = /^\d{4}-\d{2}-\d{2}$/.test(event.target.value) ? event.target.value : "";
    saveReview(true);
  });
}

function balanceOptionLabel(source, key) {
  return source?.options.find(([value]) => value === key)?.[1] || "";
}

function prayerWasPerformed(value) {
  return Boolean(value) && value !== "Nicht gebetet";
}

function renderResponsibilityReflection() {
  if (!currentData) return;
  ["responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep"].forEach(id => {
    if ($(id) && document.activeElement !== $(id)) $(id).value = currentData[id] || "";
  });
}

function applyRolePickerStyle() {
  const role = getRole($("dayRole").value || currentData?.role);
  const picker = $("dayRole");
  picker.style.setProperty("--role-color", role.color);
  picker.style.setProperty("--role-soft", hexToRgba(role.color, .18));
  picker.style.setProperty("--role-text", role.text);
  renderRoleCapsule(role);
  applyHeaderTheme(role);
}

/* Rollen-Control oben rechts: Emblem, Name und Wechselhinweis in einer
   Kapsel. Der native Auswahlfeld-Wert bleibt die einzige Datenquelle –
   die Kapsel schreibt ausschließlich über ihn. */
function renderRoleCapsule(role = getRole($("dayRole")?.value || currentData?.role || ROLES[0].name)) {
  const capsule = $("roleCapsule");
  if (!capsule) return;
  capsule.style.setProperty("--role-color", role.color);
  capsule.style.setProperty("--role-soft", hexToRgba(role.color, .16));
  capsule.style.setProperty("--role-line", hexToRgba(role.color, .38));
  capsule.style.setProperty("--role-glow", hexToRgba(role.color, .26));
  capsule.setAttribute("aria-label", `Rolle des Tages: ${role.name}. Antippen zum Wechseln.`);
  if ($("roleCapsuleEmblem")) $("roleCapsuleEmblem").innerHTML = roleEmblem(role.name);
  if ($("roleCapsuleName")) $("roleCapsuleName").textContent = role.name;
}

function renderRoleSheet() {
  const list = $("roleSheetList");
  if (!list) return;
  const activeName = getRole($("dayRole")?.value || currentData?.role).name;
  list.innerHTML = ROLES.map(role => {
    const selected = role.name === activeName;
    return `<button type="button" role="radio" aria-checked="${selected}" class="role-option${selected ? " is-selected" : ""}"
        data-role-option="${escapeHTML(role.name)}"
        style="--role-color:${role.color};--role-soft:${hexToRgba(role.color, .14)};--role-line:${hexToRgba(role.color, .40)}">
      <span class="role-option-emblem" aria-hidden="true">${roleEmblem(role.name)}</span>
      <span class="role-option-name">${escapeHTML(role.name)}</span>
      <span class="role-option-check" aria-hidden="true">${selected ? icon("check-small") : ""}</span>
    </button>`;
  }).join("");
  list.querySelectorAll("[data-role-option]").forEach(button => button.addEventListener("click", () => {
    const picker = $("dayRole");
    if (picker.value !== button.dataset.roleOption) {
      picker.value = button.dataset.roleOption;
      picker.dispatchEvent(new Event("change"));
      haptic();
    }
    closeRoleSheet();
  }));
}

function openRoleSheet() {
  renderRoleSheet();
  if ($("roleCapsule")) $("roleCapsule").setAttribute("aria-expanded", "true");
  $("roleSheet").showModal();
}

function closeRoleSheet() {
  if ($("roleCapsule")) $("roleCapsule").setAttribute("aria-expanded", "false");
  if ($("roleSheet").open) $("roleSheet").close();
}

/* Dezente Erklärung des Rollenmodus. Sämtliche Angaben werden aus den
   vorhandenen Konstanten erzeugt – die Berechnung selbst bleibt unberührt. */
function openModeInfo() {
  const ladder = $("modeInfoLadder");
  const rules = $("modeInfoRules");
  if (ladder) {
    ladder.innerHTML = MODE_LADDER.map(key => {
      const mode = modeMeta(key);
      const from = MODE_THRESHOLDS[key];
      const nextKey = MODE_LADDER[MODE_LADDER.indexOf(key) + 1];
      const to = nextKey ? MODE_THRESHOLDS[nextKey] - 1 : 100;
      return `<div class="mode-info-row" style="--mode-color:${mode.color};--mode-soft:${hexToRgba(mode.color, .14)}">
        <span class="mode-info-dot" aria-hidden="true"></span>
        <strong>${escapeHTML(mode.label)}</strong>
        <span class="mode-info-range">${from}–${to}</span>
      </div>`;
    }).join("");
  }
  if (rules) {
    const moodWeight = Math.round(STATE_WEIGHTS.mood * 100);
    const energyWeight = Math.round(STATE_WEIGHTS.energy * 100);
    rules.innerHTML = `
      <p><strong>Zustandswert.</strong> Laune zählt ${moodWeight} Prozent, Energie ${energyWeight} Prozent.</p>
      <p><strong>Schutzregeln.</strong> Ein Einzelwert von höchstens ${MODE_RULES.hardFloor.threshold} führt immer in den Schon-Modus. Unter 25 wird auf Schon-Modus, unter 35 auf Minimum begrenzt.</p>
      <p><strong>Ausnahme.</strong> Eine sehr gute Laune ab ${MODE_RULES.lift.when.moodFrom} hebt eine energiebedingte Begrenzung um eine Stufe an.</p>
      <p class="mode-info-note">Maßgeblich ist immer der zuletzt erfasste Check-in des Tages. Eine manuelle Auswahl des Modus gibt es bewusst nicht.</p>`;
  }
  $("modeInfoDialog").showModal();
}

/* Rückkehr zum heutigen Tag – erscheint nur, wenn ein anderer Tag offen ist. */
function updateTodayJump() {
  const button = $("jumpToToday");
  if (!button) return;
  button.hidden = selectedDate === todayISO();
}

/* Ein sicherer Rückgängig-Schritt nach löschenden Aktionen. Immer nur eine
   Rückmeldung gleichzeitig, sie verschwindet nach wenigen Sekunden. */
let undoTimer = null;
let undoAction = null;

function offerUndo(text, action) {
  const toast = $("undoToast");
  if (!toast) return;
  undoAction = action;
  if ($("undoToastText")) $("undoToastText").textContent = text;
  toast.hidden = false;
  toast.classList.add("is-visible");
  window.clearTimeout(undoTimer);
  undoTimer = window.setTimeout(dismissUndo, 6000);
}

function dismissUndo() {
  const toast = $("undoToast");
  if (!toast) return;
  window.clearTimeout(undoTimer);
  undoAction = null;
  toast.classList.remove("is-visible");
  toast.hidden = true;
}

function runUndo() {
  const action = undoAction;
  dismissUndo();
  if (typeof action === "function") { action(); haptic(); }
}

/* Mischt eine Farbe in Richtung einer Zielfarbe. Rein visuell – die
   gespeicherten Rollenfarben selbst bleiben unverändert. */
function mixHex(hex, target, amount) {
  const a = hexToRgbTriple(hex);
  const b = hexToRgbTriple(target);
  const mixed = a.map((value, index) => Math.round(value + (b[index] - value) * amount));
  return `rgb(${mixed.join(",")})`;
}

/* Die Kopfzeile ist Glas: die Rollenfarbe trägt nur noch Verlauf, Akzentlinie
   und Schrifttönung. Weil helle Rollenfarben auf Glas sonst verschwinden
   würden, wird die Schriftfarbe aus der Rollenfarbe abgeleitet statt aus dem
   früheren Vollton-Kontrastwert. */
function applyHeaderTheme(role = getRole($("dayRole")?.value || currentData?.role || ROLES[0].name)) {
  const header = $("appHeader");
  if (!header) return;
  header.style.setProperty("--header-role", role.color);
  header.style.setProperty("--header-role-soft", hexToRgba(role.color, .88));
  header.style.setProperty("--header-role-fade", hexToRgba(role.color, .16));
  header.style.setProperty("--header-role-veil", hexToRgba(role.color, .17));
  header.style.setProperty("--header-role-line", hexToRgba(role.color, .34));
  header.style.setProperty("--header-role-ink-light", mixHex(role.color, "#0d1017", .58));
  header.style.setProperty("--header-role-ink-dark", mixHex(role.color, "#ffffff", .62));
}

function statusCircle(icon, variant = "neutral", size = "medium") {
  return `<span class="status-circle ${variant} ${size}">${icon}</span>`;
}

function prayerStateMeta(value) {
  return PRAYER_STATES.find(option => option.value === value) || PRAYER_STATES[0];
}

function prayerStateTheme(value) {
  switch (value) {
    case "Normal":
      return { a: "#6A76F8", b: "#5BA2FF", softA: .16, softB: .13, glow: .26 };
    case "Gemeinschaft":
      return { a: "#59D7F7", b: "#3FC4E8", softA: .18, softB: .14, glow: .24 };
    case "Verspätet":
      return { a: "#F6B14A", b: "#F08A35", softA: .18, softB: .14, glow: .24 };
    case "Nachgeholt":
      return { a: "#FF7A86", b: "#E05261", softA: .18, softB: .14, glow: .24 };
    case "Nicht gebetet":
      return { a: "#E05A66", b: "#B54A5A", softA: .18, softB: .14, glow: .18 };
    default:
      return { a: "#7A839A", b: "#5C6478", softA: .09, softB: .06, glow: .0 };
  }
}

function prayerStateIconHTML(value, size = "medium") {
  const meta = prayerStateMeta(value);
  // Die Farbe folgt dem Status, nicht dem Namen des Gebets.
  if (value === "") return statusCircle("", "neutral", size);
  if (value === "Nicht gebetet") return statusCircle(icon("close"), "missed", size);
  if (value === "Nachgeholt") return statusCircle(icon("arrow-return"), "recovered", size);
  if (value === "Verspätet") return statusCircle(icon("clock"), "warning", size);
  if (value === "Gemeinschaft") return statusCircle(icon("mosque"), "conscientious", size);
  return statusCircle(icon("check"), "gradient", size);
}

function routineStateIconHTML(value, size = "small") {
  if (value === "done") return statusCircle(icon("check"), "gradient", size);
  if (value === "responsiblySkipped") return statusCircle(icon("check"), "conscientious", size);
  if (value === "missed") return statusCircle(icon("close"), "missed", size);
  return statusCircle(icon("dash"), "neutral", size);
}

function renderWaterControl() {
  const waterMl = Number(currentData?.water || 0);
  if ($("water")) $("water").value = String(waterMl);
  if ($("waterTotalDisplay")) $("waterTotalDisplay").textContent = `${(waterMl / 1000).toFixed(1).replace(".", ",")} Liter`;
  if ($("waterDroplets")) {
    const count = Math.max(1, Math.min(8, Math.round(waterMl / 500) || 1));
    const filled = Math.min(8, Math.round(waterMl / 500));
    $("waterDroplets").innerHTML = Array.from({length: count}, (_, index) => `<button type="button" class="water-drop ${index < filled ? 'filled' : ''}" data-water-direct="${(index + 1) * 500}" aria-label="${(index + 1) * 0.5} Liter">${icon("drop")}</button>`).join("");
    document.querySelectorAll("[data-water-direct]").forEach(button => button.addEventListener("click", () => {
      currentData.water = String(Number(button.dataset.waterDirect || 0));
      renderWaterControl(); saveReview(true);
    }));
  }
}

function updateRoutineStateButtons() {
  document.querySelectorAll("[data-routine-cycle]").forEach(button => {
    const key = button.dataset.routineCycle;
    const state = key === "morning" ? currentData.morningRoutineState : currentData.eveningRoutineState;
    const meta = TASK_STATE_META[state] || TASK_STATE_META[""];
    button.dataset.state = state;
    button.classList.toggle("is-done", state === "done");
    button.classList.remove("is-adapted", "is-responsible-skip");
    button.classList.toggle("is-conscientious", state === "responsiblySkipped");
    button.classList.toggle("is-missed", state === "missed");
    button.innerHTML = `${routineStateIconHTML(state, "small")}<span>${escapeHTML(meta.label)}</span>`;
    button.setAttribute("aria-label", `${key === "morning" ? "Morgenroutine" : "Abendroutine"}: ${meta.label}. Antippen zum Ändern.`);
  });
}

function cycleRoutineState(key) {
  const current = key === "morning" ? currentData.morningRoutineState : currentData.eveningRoutineState;
  const index = ROUTINE_STATE_ORDER.indexOf(current);
  const next = ROUTINE_STATE_ORDER[(index + 1) % ROUTINE_STATE_ORDER.length];
  if (key === "morning") currentData.morningRoutineState = next;
  else currentData.eveningRoutineState = next;
  updateRoutineStateButtons();
  saveReview(true);
}

function renderPrayers() {
  $("prayerList").innerHTML = PRAYERS.map(prayer => {
    const state = currentData.prayers?.[prayer] || "";
    const meta = prayerStateMeta(state);
    const theme = prayerStateTheme(state);
    // Die gesamte Karte ist die Schaltfläche – der Statuskreis allein war als
    // Trefferfläche zu klein und lag teilweise unter dem Kartennamen.
    return `<button type="button" class="prayer-card prayer-card-compact" data-state="${escapeHTML(state)}" data-open-prayer="${escapeHTML(prayer)}" data-prayer-kind="obligatory" style="--prayer-a:${theme.a};--prayer-b:${theme.b};--prayer-soft:${hexToRgba(theme.a, theme.softA)};--prayer-soft-b:${hexToRgba(theme.b, theme.softB)};--prayer-glow:${hexToRgba(theme.b, theme.glow)}" aria-label="${escapeHTML(prayer)}: ${escapeHTML(meta.label)}. Antippen zum Ändern.">
      <strong>${escapeHTML(prayer)}</strong>
      <span class="prayer-state-button">${prayerStateIconHTML(state, "medium")}</span>
    </button>`;
  }).join("");

  const sunnahList = $("sunnahPrayerList");
  if (sunnahList) {
    sunnahList.innerHTML = SUNNAH_PRAYERS.map(prayer => {
      const state = currentData.sunnahPrayers?.[prayer] || "";
      const meta = SUNNAH_PRAYER_STATES.find(option => option.value === state) || SUNNAH_PRAYER_STATES[0];
      // Antippen wechselt unmittelbar zum nächsten Status – wie bei den Routinen.
      return `<button type="button" class="sunnah-prayer-chip state-${state === "Verrichtet" ? "done" : state === "Nicht vorgesehen" ? "neutral" : "open"}" data-cycle-sunnah="${escapeHTML(prayer)}" aria-label="${escapeHTML(prayer)}: ${escapeHTML(meta.label)}. Antippen für den nächsten Status."><span class="sunnah-mark" aria-hidden="true">${state === "Verrichtet" ? icon("check-small") : state === "Nicht vorgesehen" ? icon("dash") : icon("circle")}</span><strong>${escapeHTML(prayer)}</strong><small>${escapeHTML(meta.short)}</small></button>`;
    }).join("");
    const done = SUNNAH_PRAYERS.filter(prayer => currentData.sunnahPrayers?.[prayer] === "Verrichtet").length;
    if ($("sunnahPrayerSummary")) $("sunnahPrayerSummary").textContent = done ? `${done} verrichtet` : "Noch nichts erfasst";
  }

  document.querySelectorAll("[data-open-prayer]").forEach(button => button.addEventListener("click", () => openPrayerDialog(button.dataset.openPrayer, button.dataset.prayerKind || "obligatory")));
  document.querySelectorAll("[data-cycle-sunnah]").forEach(button => button.addEventListener("click", () => cycleSunnahPrayer(button.dataset.cycleSunnah)));
}

function openPrayerDialog(prayer, kind = "obligatory") {
  $("prayerDialogTitle").textContent = prayer;
  $("prayerDialog").dataset.prayer = prayer;
  $("prayerDialog").dataset.kind = kind;
  const states = kind === "sunnah" ? SUNNAH_PRAYER_STATES : PRAYER_STATES;
  const store = kind === "sunnah" ? currentData.sunnahPrayers : currentData.prayers;
  const current = store?.[prayer] || "";
  $("prayerStateOptions").innerHTML = states.map(option => {
    const stateClass = (option.value || "open").toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
    return `
    <button type="button" class="prayer-option state-${stateClass} ${current === option.value ? "active" : ""}" data-prayer-option="${escapeHTML(option.value)}">
      ${kind === "sunnah" ? statusCircle(option.value === "Verrichtet" ? icon("check") : option.value === "Nicht vorgesehen" ? icon("dash") : "", option.value === "Verrichtet" ? "gradient" : "neutral", "medium") : prayerStateIconHTML(option.value, "medium")}
      <strong>${escapeHTML(option.label)}</strong>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-prayer-option]").forEach(button => button.addEventListener("click", () => {
    const prayerName = $("prayerDialog").dataset.prayer;
    const prayerKind = $("prayerDialog").dataset.kind;
    if (prayerKind === "sunnah") currentData.sunnahPrayers[prayerName] = button.dataset.prayerOption;
    else currentData.prayers[prayerName] = button.dataset.prayerOption;
    saveReview(true);
    renderPrayers();
    $("prayerDialog").close();
  }));
  $("prayerDialog").showModal();
}

function propagateRamadanForward(fromDate) {
  let runningValue = Number(currentData.ramadanDays || 0);
  for (let offset = 1; offset <= 3650; offset += 1) {
    const date = addDays(fromDate, offset);
    const rawText = localStorage.getItem(storageKey(date));
    if (!rawText) continue;
    const raw = safeParse(rawText);
    if (!raw) continue;
    if (raw.fastingCompleted) runningValue += 1;
    raw.ramadanDays = runningValue;
    localStorage.setItem(storageKey(date), JSON.stringify(raw));
  }
}

function propagateStreaksForward(fromDate) {
  let running = Object.fromEntries(STREAKS.map(streak => {
    const state = currentData.streaks?.[streak.key] || { days: 0, broken: false, todayStatus: "" };
    return [streak.key, { days: Number(state.days || 0), broken: Boolean(state.broken) }];
  }));

  for (let offset = 1; offset <= 3650; offset += 1) {
    const date = addDays(fromDate, offset);
    const rawText = localStorage.getItem(storageKey(date));
    if (!rawText) continue;
    const raw = safeParse(rawText);
    if (!raw) continue;
    raw.streaks = raw.streaks || {};
    STREAKS.forEach(streak => {
      const existing = raw.streaks[streak.key] || {};
      const todayStatus = STREAK_DAILY_STATES[existing.todayStatus] ? existing.todayStatus : "";
      const brokenHere = Boolean(existing.broken || existing.status === "broken" || todayStatus === "lapse");
      const next = brokenHere
        ? { days: 0, broken: true, todayStatus: "lapse" }
        : { days: running[streak.key].broken ? 0 : running[streak.key].days + 1, broken: false, todayStatus };
      raw.streaks[streak.key] = next;
      running[streak.key] = next;
    });
    localStorage.setItem(storageKey(date), JSON.stringify(raw));
  }
}

function updateRamadanDisplay() {
  const value = Number($("ramadanDays").value || 0);
  const display = $("ramadanDisplay");
  display.className = value < 0 ? "ramadan-negative" : value === 0 ? "ramadan-zero" : "ramadan-positive";
  display.textContent = value < 0 ? `${Math.abs(value)} Tage offen` : value === 0 ? "Alle Tage nachgeholt" : `${value} zusätzliche Tage`;
  const button = $("ramadanComplete");
  button.disabled = Boolean(currentData?.fastingCompleted);
  button.innerHTML = currentData?.fastingCompleted
    ? `${icon("check-small")}<span>Fastentag geschafft</span>`
    : "<span>Fastentag geschafft</span>";
}

function renderActivities() {
  const list = $("activityList");
  if (!list) return;
  const activities = currentData.activities || [];
  list.innerHTML = activities.length ? activities.map((activity, index) => {
    const role = getRole(activity.role);
    return `<div class="activity-row tracking-activity" data-activity-index="${index}" style="--activity-color:${role.color};--activity-soft:${hexToRgba(role.color,.10)};--activity-glow:${hexToRgba(role.color,.18)}">
      <div class="activity-main">
        <div class="activity-copy"><strong>${escapeHTML(activity.title)}</strong><small><span class="activity-role-emblem" aria-hidden="true">${roleEmblem(role.name)}</span>${escapeHTML(role.name)}</small></div>
      </div>
      <div class="activity-sort-actions" aria-label="Aktivität sortieren">
        <button type="button" data-move-activity="-1" data-activity-index="${index}" ${index === 0 ? "disabled" : ""} aria-label="Nach oben">${icon("chevron-down", "is-up")}</button>
        <button type="button" data-move-activity="1" data-activity-index="${index}" ${index === activities.length - 1 ? "disabled" : ""} aria-label="Nach unten">${icon("chevron-down")}</button>
      </div>
      <button type="button" class="delete-button" data-delete-activity="${index}" aria-label="Aktivität löschen">${icon("trash")}</button>
    </div>`;
  }).join("") : `<p class="activity-empty">Noch keine Aktivität dokumentiert.</p>`;

  document.querySelectorAll("[data-move-activity]").forEach(button => button.addEventListener("click", () => {
    moveArrayItem(currentData.activities, Number(button.dataset.activityIndex), Number(button.dataset.moveActivity));
    saveReview(true);
    renderActivities();
  }));
  document.querySelectorAll("[data-delete-activity]").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.deleteActivity);
    const [removed] = currentData.activities.splice(index, 1);
    saveReview(true);
    renderActivities();
    haptic(12);
    if (removed) offerUndo(`„${removed.title}" gelöscht`, () => {
      currentData.activities.splice(Math.min(index, currentData.activities.length), 0, removed);
      saveReview(true);
      renderActivities();
    });
  }));
}

function moveArrayItem(array, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= array.length) return;
  [array[index], array[target]] = [array[target], array[index]];
}

function renderStreaks() {
  const list = $("streakList");
  if (!list || !currentData) return;
  list.innerHTML = STREAKS.map(streak => {
    const state = currentData.streaks?.[streak.key] || { days: 0, broken: false, todayStatus: "" };
    const isActive = !state.broken && Number(state.days || 0) > 0;
    const daily = STREAK_DAILY_STATES[state.todayStatus || ""] || STREAK_DAILY_STATES[""];
    const statusText = state.todayStatus === "lapse" ? "Unterbrochen" : isActive ? "Aktiv" : "Offen";
    return `<div class="streak-card ${state.broken ? "streak-broken" : ""} ${isActive ? "streak-active" : ""} ${state.todayStatus === "resisted" ? "streak-victory" : ""}">
      <div class="streak-card-head">
        <div><strong>${escapeHTML(streak.label)}</strong><small>${escapeHTML(daily.label)}</small></div>
        <span class="streak-status">${statusText}</span>
      </div>
      <div class="streak-input-wrap">
        <input class="streak-days-large" type="number" min="0" inputmode="numeric" data-streak-days="${streak.key}" value="${Number(state.days || 0)}" aria-label="${escapeHTML(streak.label)} Tage">
        <span class="streak-unit">Tage</span>
      </div>
      <div class="streak-daily-actions" role="group" aria-label="Unterbrechung erfassen">
        <button type="button" class="danger ${state.todayStatus === "lapse" ? "active" : ""}" data-streak-daily="lapse" data-streak-key="${streak.key}">Unterbrechung</button>
      </div>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-streak-days]").forEach(input => input.addEventListener("change", () => {
    const state = currentData.streaks[input.dataset.streakDays];
    state.days = Math.max(0, Number(input.value || 0));
    state.broken = false;
    if (state.todayStatus === "lapse") state.todayStatus = "";
    saveReview(true); propagateStreaksForward(selectedDate); renderStreaks();
  }));
  document.querySelectorAll("[data-streak-daily]").forEach(button => button.addEventListener("click", () => {
    const state = currentData.streaks[button.dataset.streakKey];
    state.todayStatus = state.todayStatus === "lapse" ? "" : "lapse";
    state.broken = state.todayStatus === "lapse";
    if (state.broken) state.days = 0;
    saveReview(true); propagateStreaksForward(selectedDate); renderStreaks(); renderStats();
  }));
}

/* --------------------------------------------------------------------------
   Wochenrückblick
   Sieben Tage bis einschließlich des gewählten Datums. Die Auswertung bleibt
   beschreibend: keine Erfolgsquote, kein Gesamtscore, keine Bewertung.
   -------------------------------------------------------------------------- */
/* Immer eine vollständige Kalenderwoche, Montag bis Sonntag.
   weekOffset zählt Wochen zurück; 0 ist die Woche des gewählten Tages.
   Zukünftige Wochen sind nicht erreichbar (siehe shiftWeek). */
let weekOffset = 0;

function weekDates(reference = selectedDate, offset = weekOffset) {
  const monday = addDays(mondayOf(reference), offset * 7);
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

// Laune eines Tages: Mittel der erfassten Tages-Check-ins.
function dailyAverageMood(data) {
  const values = (data?.stateCheckins || [])
    .filter(entry => entry.mood !== null && entry.mood !== undefined)
    .map(entry => clamp(Number(entry.mood), 0, 100));
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

// Morgen- und Abendroutine eines Tages, in genau dieser Reihenfolge.
function dailyRoutineStates(data) {
  return [data?.morningRoutineState || "", data?.eveningRoutineState || ""];
}

function shiftWeek(delta) {
  const next = weekOffset + delta;
  // Nicht über die aktuelle Kalenderwoche hinaus.
  if (next > 0) return false;
  const limit = -520;
  if (next < limit) return false;
  weekOffset = next;
  renderStats();
  return true;
}

// Energie eines Tages: Mittel der erfassten Tages-Check-ins (die Nacht trägt
// keinen Energiewert und bleibt deshalb außen vor).
function dailyAverageEnergy(data) {
  // Seit alle vier Check-ins Energie erfassen, zählt auch die Nacht mit –
  // sonst fehlte an Tagen mit reinem Nacht-Check-in der Energiewert.
  const values = (data?.stateCheckins || [])
    .filter(entry => entry.energy !== null && entry.energy !== undefined)
    .map(entry => clamp(Number(entry.energy), 0, 100));
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

// Belastung als eigenständige Kurve: hoher Wert bedeutet hohe Belastung.
function dailyAverageLoad(data) {
  const levels = { low: 20, normal: 50, high: 85 };
  const values = (data?.stateCheckins || [])
    .filter(entry => entry.slot !== "night")
    .map(entry => levels[entry.load] ?? levels.normal);
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function dailyPrayerProgress(data) {
  const count = PRAYERS.filter(prayer => prayerWasPerformed(data?.prayers?.[prayer])).length;
  return { count, total: PRAYERS.length };
}

function buildWeeklyTrendChart(labels, series, options = {}) {
  const width = 440;
  const height = 250;
  const padLeft = 30;
  const padRight = 12;
  const padTop = 14;
  const padBottom = 28;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const xFor = index => padLeft + (labels.length === 1 ? plotWidth / 2 : plotWidth * index / (labels.length - 1));
  const yFor = value => padTop + plotHeight * (1 - clamp(value, 0, 100) / 100);
  const todayIndex = Number.isInteger(options.todayIndex) ? options.todayIndex : -1;

  const grid = [0, 25, 50, 75, 100].map(value => {
    const y = yFor(value);
    return `<line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - padRight}" y2="${y.toFixed(1)}"></line>
      <text x="${padLeft - 6}" y="${(y + 3.5).toFixed(1)}" text-anchor="end">${value}</text>`;
  }).join("");

  // Lücken (Tage ohne Eintrag) unterbrechen die Linie, statt sie zu erfinden.
  // Die Kurvenführung ist aus der früheren Designsprache übernommen: weiche
  // Bézier-Segmente statt harter Knicke.
  const paths = series.map(item => {
    const segments = [];
    let current = [];
    item.values.forEach((value, index) => {
      if (value === null || value === undefined) {
        if (current.length) segments.push(current);
        current = [];
        return;
      }
      current.push({ x: xFor(index), y: yFor(value) });
    });
    if (current.length) segments.push(current);
    return segments
      .filter(segment => segment.length > 1)
      .map(points => {
        let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
        for (let i = 1; i < points.length; i += 1) {
          const prev = points[i - 1];
          const point = points[i];
          const mid = (prev.x + point.x) / 2;
          d += ` C${mid.toFixed(1)} ${prev.y.toFixed(1)}, ${mid.toFixed(1)} ${point.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
        }
        return `<path class="wellbeing-line ${item.className}" d="${d}"></path>`;
      })
      .join("");
  }).join("");

  const dots = series.map(item => item.values.map((value, index) => value === null || value === undefined
    ? ""
    : `<circle class="wellbeing-dot ${item.className} ${index === todayIndex ? "today" : ""}" cx="${xFor(index).toFixed(1)}" cy="${yFor(value).toFixed(1)}" r="${index === todayIndex ? 4.6 : 3.4}"></circle>`).join("")).join("");

  // Ruhige Markierung des heutigen Tages – ohne Wertung, nur zur Orientierung.
  const bandWidth = labels.length > 1 ? plotWidth / (labels.length - 1) * 0.64 : 40;
  const todayBand = todayIndex < 0 ? "" :
    `<rect class="trend-today-band" x="${(xFor(todayIndex) - bandWidth / 2).toFixed(1)}" y="${padTop}" width="${bandWidth.toFixed(1)}" height="${plotHeight}" rx="10"></rect>`;

  const xLabels = labels.map((label, index) =>
    `<text x="${xFor(index).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="${index === todayIndex ? "today" : ""}">${escapeHTML(label)}</text>`).join("");

  const legend = series.map(item =>
    `<span class="${item.className}"><i aria-hidden="true"></i>${escapeHTML(item.label)}</span>`).join("");

  return `<div class="trend-panel">
    <div class="trend-legend">${legend}</div>
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Wochenverlauf von Energie, Belastung und Pflichtgebeten">
      ${todayBand}
      <g class="trend-grid">${grid}</g>
      ${paths}
      ${dots}
      <g class="trend-x-labels">${xLabels}</g>
    </svg>
    <p class="trend-note">Tage ohne Eintrag bleiben leer. Die Darstellung beschreibt den Verlauf und bewertet ihn nicht.</p>
  </div>`;
}

/* Kleines eigenes Stern-Symbol. Signalisiert ausschließlich, dass ein
   Bereich an diesem Tag vollständig verantwortungsvoll abgeschlossen wurde –
   keine Punktzahl, keine Bewertung, keine Gamification. */
function achievementStar(label) {
  return `<svg class="achievement-star" viewBox="0 0 24 24" role="img" aria-label="${escapeHTML(label)}">
    <path d="M12 3.2l2.28 5.02 5.47.6-4.07 3.7 1.12 5.38L12 15.2l-4.8 2.7 1.12-5.38L4.25 8.82l5.47-.6z"></path>
  </svg>`;
}

function buildPrayerWeekPanel(labels, counts) {
  const days = labels.map((label, index) => {
    const count = counts[index];
    const dots = Array.from({ length: PRAYERS.length }, (_, dot) =>
      `<i class="${count !== null && count !== undefined && dot < count ? "filled" : ""}"></i>`).join("");
    return `<div class="prayer-week-day">
      <small>${escapeHTML(label)}</small>
      <div class="prayer-week-dots">${dots}</div>
      <b class="week-mark">${count === PRAYERS.length ? achievementStar("Alle Pflichtgebete erfüllt") : ""}</b>
    </div>`;
  }).join("");
  return `<div class="prayer-week-panel">
    <span class="panel-caption">Pflichtgebete pro Tag</span>
    <div class="prayer-week-grid">${days}</div>
  </div>`;
}

function renderStats() {
  if (!currentData) return;
  const dates = weekDates();
  const reviews = dates.map(date => ({ date, data: loadReview(date), stored: Boolean(localStorage.getItem(storageKey(date))) }));
  const labels = dates.map(date => new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${date}T12:00:00`)).replace(".", ""));
  const energy = reviews.map(item => item.stored ? dailyAverageEnergy(item.data) : null);
  const mood = reviews.map(item => item.stored ? dailyAverageMood(item.data) : null);
  const prayerCounts = reviews.map(item => item.stored ? dailyPrayerProgress(item.data).count : null);
  // 0/5 = 0 %, 1/5 = 20 % … 5/5 = 100 % – gleiche Skala wie Energie und Laune.
  const prayerPercent = prayerCounts.map(count => count === null ? null : Math.round(count / PRAYERS.length * 100));
  const routineStates = reviews.map(item => item.stored ? dailyRoutineStates(item.data) : ["", ""]);
  const today = todayISO();

  const label = $("weekLabel");
  // Kurz halten: neben der Überschrift steht auf schmalen Geräten wenig Platz.
  if (label) label.textContent = weekOffset === 0 && dates.includes(today)
    ? "Diese Woche"
    : `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`;

  const range = $("weekRange");
  if (range) range.textContent = `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`;
  const back = $("weekBack");
  const forward = $("weekForward");
  if (back) back.disabled = false;
  if (forward) forward.disabled = weekOffset >= 0;

  $("statsGrid").innerHTML = `
    ${buildWeeklyTrendChart(labels, [
      { label: "Energie", className: "energy", values: energy },
      { label: "Laune", className: "mood", values: mood },
      { label: "Pflichtgebete", className: "prayers", values: prayerPercent }
    ], { todayIndex: dates.indexOf(today) })}
    ${buildPrayerWeekPanel(labels, prayerCounts)}
    ${buildRoutineWeekPanel(labels, routineStates)}`;
}

/* Zweite Wochenübersicht direkt unter den Gebeten: zwei Punkte pro Tag.
   Erster Punkt Morgenroutine, zweiter Punkt Abendroutine – ohne Beschriftung. */
function buildRoutineWeekPanel(labels, states) {
  // Verantwortungsvoll abgeschlossen heißt: tatsächlich durchgeführt ODER
  // bewusst und gewissenhaft nicht durchgeführt. Beides zählt gleich.
  const isSettled = state => state === "done" || state === "responsiblySkipped";
  const days = labels.map((label, index) => {
    const pair = states[index] || ["", ""];
    const dots = pair.map(state => `<i class="${isSettled(state) ? "filled" : ""}"></i>`).join("");
    const both = pair.length === 2 && pair.every(isSettled);
    return `<div class="routine-week-day">
      <small>${escapeHTML(label)}</small>
      <div class="routine-week-dots">${dots}</div>
      <b class="week-mark">${both ? achievementStar("Beide Routinen verantwortungsvoll abgeschlossen") : ""}</b>
    </div>`;
  }).join("");
  return `<div class="routine-week-panel">
    <span class="panel-caption">Routinen pro Tag</span>
    <div class="routine-week-grid">${days}</div>
  </div>`;
}

function getAllReviews() {
  const reviews = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith(`${STORAGE_NAMESPACE}-review-`)) continue;
    const date = key.replace(`${STORAGE_NAMESPACE}-review-`, "");
    const raw = safeParse(localStorage.getItem(key));
    if (raw) reviews.push({ date, data: normalizeReview(raw, date, true) });
  }
  return reviews.sort((a, b) => a.date.localeCompare(b.date));
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function exportBackup() {
  saveReview(true);
  const payload = {
    app: "Roleplay",
    version: APP_VERSION,
    schemaVersion: 6,
    exportedAt: new Date().toISOString(),
    reviews: getAllReviews(),
    routines
  };
  downloadTextFile(`roleplay-backup-${todayISO()}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  localStorage.setItem(BACKUP_TIMESTAMP_KEY, new Date().toISOString());
  $("backupStatus").textContent = `Backup erstellt: ${payload.reviews.length} Tagesreviews und ${Object.keys(routines || {}).length} Routinen.`;
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const payload = safeParse(reader.result);
    const validReviews = Array.isArray(payload?.reviews) ? payload.reviews.filter(item => /^\d{4}-\d{2}-\d{2}$/.test(item?.date) && item?.data) : [];
    if (!validReviews.length) { alert("Diese Datei enthält keine gültigen Roleplay-Tagesreviews."); return; }
    if (!confirm(`${validReviews.length} Tagesreviews importieren? Vorhandene Einträge mit demselben Datum werden ersetzt.`)) return;
    validReviews.forEach(item => localStorage.setItem(storageKey(item.date), JSON.stringify(item.data)));
    if (payload.routines) {
      routines = normalizeRoutines(payload.routines);
      saveRoutines();
    }
    localStorage.setItem("roleplay-last-import-at", new Date().toISOString());
    setDate(selectedDate);
    $("backupStatus").textContent = `${validReviews.length} Tagesreviews erfolgreich importiert.`;
    alert("Backup wurde erfolgreich importiert.");
  };
  reader.readAsText(file);
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function exportCsv() {
  saveReview(true);
  const headers = [
    "Datum", "Tagesrolle", "Frühstück_Kategorie", "Frühstück", "Mittag_Kategorie", "Mittagessen", "Abend_Kategorie", "Abendessen", "Snack_Kategorie", "Snack", "Wasser_ml", "Schritte",
    "Morgenroutine", "Abendroutine", ...PRAYERS, ...SUNNAH_PRAYERS.map(prayer => `Sunnah_${prayer}`),
    "Ramadan_Tage", "Fastentag", "Schlafqualität", "Traumkategorie", "Traumnotiz",
    "Checkins_Anzahl", "Letzter_Checkin", "Empfohlener_Rollenmodus", "Gewählter_Rollenmodus", "Abweichungsbegründung", "Energie", "Laune", "Gefühl", "Belastung", "Kontextnotiz",
    "Dankbarkeit", "Bewusste_Wahrnehmung", "Name_Allahs",
    "Verantwortungsbilanz", "Bilanz_Detailauswahl", "Bilanz_Folgehandlung", "Bilanz_Folgedatum", "Moduspassung", "Bewerteter_Modus",
    "Wichtigste_Verantwortung", "Anpassung_oder_Vermeidung", "Nächster_verantwortlicher_Schritt",
    ...STREAKS.flatMap(streak => [`${streak.label}_Tage`, `${streak.label}_Heute`]), "Aktivitäten", "Notizen"
  ];
  const lines = [headers.map(csvEscape).join(";")];
  getAllReviews().forEach(({ date, data }) => {
    const activities = (data.activities || []).map(activity => `${activity.title} | ${activity.role}`).join(" / ");
    const latest = latestStateCheckin(data);
    const mode = modeForCheckin(latest, data);
    const balance = data.roleplayBalance || emptyRoleplayBalance();
    const balanceDetails = (balance.detailKeys || [])
      .map(key => balanceOptionLabel(BALANCE_DETAILS[balance.outcome], key)).filter(Boolean).join(" · ");
    const row = [
      date, data.role,
      mealCategoryLabel(data.mealCategories?.breakfast || ""), data.breakfast,
      mealCategoryLabel(data.mealCategories?.lunch || ""), data.lunch,
      mealCategoryLabel(data.mealCategories?.dinner || ""), data.dinner,
      mealCategoryLabel(data.mealCategories?.snack || ""), data.snack,
      data.water, data.steps,
      TASK_STATE_META[data.morningRoutineState]?.label || "Offen", TASK_STATE_META[data.eveningRoutineState]?.label || "Offen",
      ...PRAYERS.map(prayer => data.prayers?.[prayer] || ""), ...SUNNAH_PRAYERS.map(prayer => data.sunnahPrayers?.[prayer] || ""),
      data.ramadanDays, data.fastingCompleted ? "Ja" : "Nein", data.sleepQualityScore, dreamCategoryLabel(data.dreamCategory || ""), data.dreams,
      data.stateCheckins?.length || 0, latest ? checkinSlot(latest.slot).label : "", mode?.label || "", mode?.label || "", latest?.frameworkOverrideReason || "", latest?.energy ?? "", latest?.mood ?? "", latest?.emotion || "", LOAD_OPTIONS[latest?.load]?.label || "", latest?.note || "",
      data.gratitude1, data.gratitude2, data.allahName,
      balance.outcome ? ROLE_REFLECTION_META[balance.outcome].short : "",
      balanceDetails,
      balanceOptionLabel(BALANCE_FOLLOW_UPS[balance.outcome], balance.followUpAction),
      balance.followUpDate || "",
      BALANCE_MODE_FIT.find(([key]) => key === balance.modeFit)?.[1] || "",
      modeMeta(balance.evaluatedModeKey)?.label || "",
      data.responsibilityMain, data.responsibilityAdaptation, data.responsibilityNextStep,
      ...STREAKS.flatMap(streak => [Number(data.streaks?.[streak.key]?.days || 0), data.streaks?.[streak.key]?.todayStatus || ""]), activities, data.notes
    ];
    lines.push(row.map(csvEscape).join(";"));
  });
  downloadTextFile(`roleplay-export-${todayISO()}.csv`, `﻿${lines.join("\r\n")}`, "text/csv;charset=utf-8");
  $("backupStatus").textContent = "CSV-Export mit Check-ins, Gebeten, Bilanz und Reflexion wurde erstellt.";
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16), g = parseInt(clean.slice(2, 4), 16), b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function rawReviewForCalendar(date) {
  const rawText = localStorage.getItem(storageKey(date));
  if (!rawText) return null;
  return safeParse(rawText, {});
}

function renderCalendar() {
  const monthDate = new Date(`${calendarCursor}T12:00:00`);
  $("calendarMonthLabel").textContent = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(monthDate);
  const weekdayOffset = (monthDate.getDay() + 6) % 7;
  const start = addDays(calendarCursor, -weekdayOffset);
  $("calendarGrid").innerHTML = Array.from({ length: 42 }, (_, index) => {
    const date = addDays(start, index);
    const raw = rawReviewForCalendar(date);
    const role = getRole(raw?.role || defaultRoleForDate(date));
    const outside = date.slice(0, 7) !== calendarCursor.slice(0, 7);
    const classes = ["calendar-day", outside ? "outside" : "", date === todayISO() ? "today" : "", raw ? "has-entry" : "", date === selectedDate ? "selected" : ""].filter(Boolean).join(" ");
    const style = raw ? `--entry-color:${role.color};--entry-soft:${hexToRgba(role.color,.18)};--entry-text:${role.text}` : "";
    return `<button type="button" class="${classes}" style="${style}" data-calendar-date="${date}" aria-label="${formatDate(date)}${raw ? `, Eintrag in Rolle ${role.name}` : ""}">${Number(date.slice(-2))}</button>`;
  }).join("");
  document.querySelectorAll("[data-calendar-date]").forEach(button => button.addEventListener("click", () => {
    setDate(button.dataset.calendarDate);
    $("calendarDialog").close();
  }));
}

function openCalendar() {
  calendarCursor = firstOfMonth(selectedDate);
  renderCalendar();
  $("calendarDialog").showModal();
}

function normalizeRoutines(value) {
  const defaults = JSON.parse(JSON.stringify(DEFAULT_ROUTINES));
  const incoming = value && typeof value === "object" ? value : {};
  /* Liegt bereits ein Speicherstand vor, ist er maßgeblich: sonst kehrte eine
     gelöschte Standardroutine beim nächsten Start zurück. Die Vorlagen dienen
     dann nur noch als Grundgerüst für fehlende Felder. */
  const hasStored = Object.keys(incoming).length > 0;
  const keys = hasStored ? Object.keys(incoming) : Object.keys(defaults);
  const output = {};
  keys.forEach((key, index) => {
    const base = defaults[key] || {
      key,
      title: incoming[key]?.title || `Routine ${index + 1}`,
      description: incoming[key]?.description || "Eigene Routine",
      theme: incoming[key]?.theme || "focus",
      autoNext: false,
      items: []
    };
    const merged = { ...base, ...(incoming[key] || {}) };
    merged.key = key;
    merged.theme = merged.theme || (key === "morning" ? "morning" : key === "evening" ? "evening" : "focus");
    merged.items = Array.isArray(merged.items) ? merged.items.map((item, idx) => ({
      id: item.id || `${key}-${Date.now()}-${idx}`,
      emoji: item.emoji || "✨",
      title: item.title || "Neuer Schritt",
      minutes: clamp(Number(item.minutes || 5), 1, 180),
      context: item.context || ""
    })) : [];
    output[key] = merged;
  });
  return output;
}

function loadRoutines() {
  const stored = safeParse(localStorage.getItem(ROUTINES_STORAGE_KEY));
  return normalizeRoutines(stored);
}

function saveRoutines() {
  localStorage.setItem(ROUTINES_STORAGE_KEY, JSON.stringify(routines));
}

function orderedRoutineKeys() {
  return Object.keys(routines || {}).sort((a, b) => {
    const rank = key => key === "morning" ? 0 : key === "evening" ? 1 : 2;
    return rank(a) - rank(b) || (routines[a]?.title || a).localeCompare(routines[b]?.title || b, "de");
  });
}

function routineMinutes(routine) {
  return routine.items.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}

function routineProgress(key) {
  const progress = currentData?.routineProgress?.[key] || {};
  const items = routines[key].items;
  const done = items.filter(item => progress[item.id] === "done").length;
  const resolved = items.filter(item => ["done", "skipped"].includes(progress[item.id])).length;
  return { done, resolved, total: items.length };
}

function renderRoutineCards() {
  if (!routines || !currentData) return;
  $("routineCards").innerHTML = orderedRoutineKeys().map(key => {
    const routine = routines[key];
    const progress = routineProgress(key);
    const progressMap = currentData.routineProgress?.[key] || {};
    const remaining = routine.items
      .filter(item => !["done", "skipped"].includes(progressMap[item.id]))
      .reduce((sum, item) => sum + Number(item.minutes || 0), 0);
    const percent = progress.total ? Math.round(progress.resolved / progress.total * 100) : 0;
    const started = progress.resolved > 0;
    const finished = progress.total > 0 && progress.resolved === progress.total;

    // Die Zeile unter dem Titel beantwortet: Wo stehe ich heute damit?
    // Kurz halten: die Zeile steht neben der Starttaste und darf nicht umbrechen.
    const meta = !routine.items.length
      ? "Noch keine Schritte"
      : finished
        ? "Abgeschlossen"
        : started
          ? `${progress.resolved}/${progress.total} · noch ${remaining} Min.`
          : `${routine.items.length} Schritte · ${routineMinutes(routine)} Min.`;

    return `<button type="button" class="routine-hero ${routine.theme} ${finished ? "is-finished" : started ? "is-started" : ""}" data-open-routine="${key}">
      <span class="routine-thread" aria-hidden="true"></span>
      ${finished ? `<span class="routine-hero-badge" aria-hidden="true">${icon("check-small")}</span>` : ""}
      <div class="routine-hero-top simple">
        <div>
          <h2>${escapeHTML(routine.title)}</h2>
          <p>${escapeHTML(routine.description)}</p>
          <span class="routine-hero-meta">${escapeHTML(meta)}</span>
        </div>
      </div>
      ${progress.total ? `<span class="routine-hero-track" aria-hidden="true"><i style="width:${percent}%"></i></span>` : ""}
      <span class="routine-hero-play ${finished ? "done" : ""}" data-start-routine="${key}" role="button"
        aria-label="${escapeHTML(routine.title)} ${started && !finished ? "fortsetzen" : "starten"}" tabindex="0">${finished ? icon("replay") : icon("play")}</span>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-open-routine]").forEach(card => card.addEventListener("click", event => {
    if (event.target.closest("[data-start-routine]")) return;
    openRoutineDetail(card.dataset.openRoutine);
  }));
  document.querySelectorAll("[data-start-routine]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    startRoutine(button.dataset.startRoutine);
  }));
}

function openRoutineDetail(key) {
  activeRoutineKey = key;
  $("routineOverview").hidden = true;
  $("routineDetail").hidden = false;
  $("routineDetail").dataset.routineKey = key;
  renderRoutineDetail(key);
}

function closeRoutineDetail() {
  activeRoutineKey = null;
  $("routineDetail").hidden = true;
  $("routineOverview").hidden = false;
  renderRoutineCards();
}

function renderRoutineDetail(key) {
  const routine = routines[key];
  const progress = routineProgress(key);
  const progressPercent = progress.total ? Math.round((progress.resolved / progress.total) * 100) : 0;
  const progressMap = currentData.routineProgress?.[key] || {};
  const completedMinutes = routine.items.filter(item => progressMap[item.id] === "done").reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  const remainingMinutes = routine.items.filter(item => !["done", "skipped"].includes(progressMap[item.id])).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  $("routineDetailEyebrow").textContent = key === "morning" ? "MORGEN" : key === "evening" ? "ABEND" : "FOKUS";
  $("routineDetailTitle").textContent = routine.title;
  $("routineDetailMeta").textContent = `${routine.items.length} Schritte · ${routineMinutes(routine)} Minuten`;
  $("routineDetailProgress").innerHTML = `<div class="routine-progress-head"><strong>${progress.done}/${progress.total} erledigt</strong><span>${progressPercent}%</span></div><div class="routine-progress-track"><i style="width:${progressPercent}%"></i></div><small>ca. ${completedMinutes} Min. erledigt · ${remainingMinutes} Min. offen</small>`;
  $("routineItemList").innerHTML = routine.items.map((item, index) => {
    const state = progressMap[item.id] || "";
    const stateLabel = state === "done" ? " · erledigt" : state === "skipped" ? " · übersprungen" : "";
    return `<div class="routine-item clean ${state ? `is-${state}` : ""}" draggable="true" data-routine-index="${index}">
      <span class="routine-number">${index + 1}</span>
      <span class="routine-emoji-bubble">${escapeHTML(item.emoji)}</span>
      <div class="routine-item-copy">
        <strong>${escapeHTML(item.title)}</strong>
        <small>${item.minutes} Min.${stateLabel}${item.context ? " · Kontext" : ""}</small>
      </div>
      <div class="routine-sort-controls" aria-label="Reihenfolge ändern">
        <button type="button" data-move-routine-item="up" data-routine-control="${index}" aria-label="Nach oben" ${index === 0 ? "disabled" : ""}>↑</button>
        <button type="button" data-move-routine-item="down" data-routine-control="${index}" aria-label="Nach unten" ${index === routine.items.length - 1 ? "disabled" : ""}>↓</button>
      </div>
      <button type="button" class="routine-item-menu" data-edit-routine-item="${escapeHTML(item.id)}" aria-label="Bearbeiten">⋯</button>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-edit-routine-item]").forEach(button => button.addEventListener("click", () => openRoutineItemDialog(button.dataset.editRoutineItem)));
  document.querySelectorAll("[data-routine-control]").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.routineControl);
    moveArrayItem(routine.items, index, button.dataset.moveRoutineItem === "up" ? -1 : 1);
    saveRoutines(); renderRoutineDetail(key); renderRoutineCards();
  }));
  document.querySelectorAll("[data-routine-index]").forEach(row => {
    row.addEventListener("dragstart", () => { routineDragIndex = Number(row.dataset.routineIndex); row.classList.add("dragging"); });
    row.addEventListener("dragend", () => { routineDragIndex = null; row.classList.remove("dragging"); });
    row.addEventListener("dragover", event => event.preventDefault());
    row.addEventListener("drop", event => {
      event.preventDefault();
      const targetIndex = Number(row.dataset.routineIndex);
      if (routineDragIndex === null || routineDragIndex === targetIndex) return;
      const [item] = routine.items.splice(routineDragIndex, 1);
      routine.items.splice(targetIndex, 0, item);
      saveRoutines(); renderRoutineDetail(key); renderRoutineCards();
    });
  });
}


function renderSessionRoutineEditor() {
  if (!routineSession || !$('sessionRoutineItemList')) return;
  const routine = routines[routineSession.key];
  if (!routine) return;
  const currentId = currentSessionItem()?.id;
  const editor = $('sessionRoutineEditor');
  if (editor) editor.dataset.currentItemId = currentId || '';

  $('sessionRoutineItemList').innerHTML = sessionItems().map((item, index) => {
    const state = currentData.routineProgress?.[routineSession.key]?.[item.id] || '';
    const stateLabel = item.id === currentId ? 'läuft gerade' : state === 'done' ? 'erledigt' : state === 'skipped' ? 'übersprungen' : '';
    return `<div class="session-editor-item ${item.id === currentId ? 'is-current' : ''}" data-session-item-id="${escapeHTML(item.id)}">
      <button class="session-editor-drag-handle" type="button" aria-label="${escapeHTML(item.title)} verschieben" data-session-drag-handle>
        <span></span><span></span><span></span>
      </button>
      <span class="session-editor-emoji">${escapeHTML(item.emoji)}</span>
      <div class="session-editor-copy">
        <strong>${escapeHTML(item.title)}</strong>
        <small>${item.minutes} Min.${stateLabel ? ` · ${stateLabel}` : ''}</small>
      </div>
      <button type="button" class="session-editor-start ${item.id === currentId ? 'is-current' : ''}" data-session-start="${escapeHTML(item.id)}" aria-label="${item.id === currentId ? 'Läuft gerade' : `${escapeHTML(item.title)} starten`}" ${item.id === currentId ? 'disabled' : ''}>
        <span aria-hidden="true">${item.id === currentId ? icon("dot") : icon("play")}</span>
      </button>
    </div>`;
  }).join('');

  document.querySelectorAll('[data-session-start]').forEach(button => button.addEventListener('click', () => {
    startSessionItemById(button.dataset.sessionStart);
  }));
  bindSessionEditorReordering();
}

function bindSessionEditorReordering() {
  const list = $('sessionRoutineItemList');
  if (!list) return;

  list.querySelectorAll('[data-session-drag-handle]').forEach(handle => {
    handle.addEventListener('pointerdown', event => {
      if (!routineSession || event.button > 0) return;
      const row = handle.closest('.session-editor-item');
      if (!row) return;
      const currentItemId = currentSessionItem()?.id;
      const pointerId = event.pointerId;
      event.preventDefault();
      handle.setPointerCapture?.(pointerId);
      row.classList.add('is-dragging');
      document.body.classList.add('session-editor-sorting');

      const move = moveEvent => {
        const target = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY)?.closest('.session-editor-item');
        if (!target || target === row || target.parentElement !== list) return;
        const box = target.getBoundingClientRect();
        const placeAfter = moveEvent.clientY > box.top + box.height / 2;
        list.insertBefore(row, placeAfter ? target.nextSibling : target);

        const listBox = list.getBoundingClientRect();
        if (moveEvent.clientY < listBox.top + 70) list.scrollTop -= 14;
        if (moveEvent.clientY > listBox.bottom - 70) list.scrollTop += 14;
      };

      const finish = () => {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', finish);
        document.removeEventListener('pointercancel', finish);
        row.classList.remove('is-dragging');
        document.body.classList.remove('session-editor-sorting');
        try { handle.releasePointerCapture?.(pointerId); } catch (_) {}

        const order = [...list.querySelectorAll('.session-editor-item')].map(entry => entry.dataset.sessionItemId);
        const byId = new Map(sessionItems().map(item => [item.id, item]));
        // Nur die Session-Kopie wird neu geordnet – das Template bleibt unberührt.
        routineSession.items = order.map(id => byId.get(id)).filter(Boolean);
        routineSession.index = Math.max(0, routineSession.items.findIndex(item => item.id === currentItemId));
        persistRoutineSession();
        renderRoutineSession();
        renderSessionRoutineEditor();
        renderRoutineCards();
        if (activeRoutineKey === routineSession.key) renderRoutineDetail(activeRoutineKey);
      };

      document.addEventListener('pointermove', move, { passive: false });
      document.addEventListener('pointerup', finish, { once: true });
      document.addEventListener('pointercancel', finish, { once: true });
    });
  });
}

function startSessionItemById(itemId) {
  if (!routineSession) return;
  const items = sessionItems();
  const index = items.findIndex(item => item.id === itemId);
  if (index < 0) return;

  const item = items[index];
  routineSession.index = index;
  routineSession.remaining = Math.round(Number(item.minutes || 0) * 60);
  routineSession.running = true;
  routineSession.endAt = Date.now() + routineSession.remaining * 1000;
  routineSession.expiredNotified = false;
  routineSession.contextOpen = false;
  delete currentData.routineProgress?.[routineSession.key]?.[item.id];
  saveReview(true);
  persistRoutineSession();
  renderRoutineSession();
  renderSessionRoutineEditor();
}

function toggleSessionRoutineEditor(force) {
  const panel = $("sessionRoutineEditor");
  const button = $("sessionEditRoutine");
  if (!panel) return;
  const show = typeof force === "boolean" ? force : panel.hidden;
  panel.hidden = !show;
  if (button) {
    button.setAttribute("aria-expanded", String(show));
    button.classList.toggle("is-open", show);
    const label = button.querySelector("span:last-child");
    if (label) label.textContent = show ? "Anpassen geöffnet" : "Anpassen";
  }
  if (show) renderSessionRoutineEditor();
}

/* Minutenauswahl als natives select – auf dem iPhone öffnet dadurch das
   Auswahlrad. Eine abweichend gespeicherte Dauer (etwa 2,5) bleibt als
   zusätzliche Option erhalten und wird nicht verändert. */
function fillRoutineMinuteOptions(currentValue) {
  const select = $("routineItemMinutes");
  if (!select) return;
  const value = Number(currentValue);
  const options = ROUTINE_MINUTE_CHOICES.map(minutes =>
    `<option value="${minutes}">${minutes} ${minutes === 1 ? "Minute" : "Minuten"}</option>`);
  if (Number.isFinite(value) && value > 0 && !ROUTINE_MINUTE_CHOICES.includes(value)) {
    const label = String(value).replace(".", ",");
    options.unshift(`<option value="${value}">${label} ${value === 1 ? "Minute" : "Minuten"}</option>`);
  }
  select.innerHTML = options.join("");
  select.value = String(Number.isFinite(value) && value > 0 ? value : 5);
}

function setRoutineEmojiError(visible) {
  const field = $("routineItemEmoji");
  const error = $("routineItemEmojiError");
  if (error) error.hidden = !visible;
  if (field) {
    field.classList.toggle("has-error", visible);
    field.setAttribute("aria-invalid", visible ? "true" : "false");
  }
}

function openRoutineItemDialog(itemId = null) {
  editingRoutineItemId = itemId;
  const item = itemId ? routines[activeRoutineKey].items.find(entry => entry.id === itemId) : null;
  $("routineItemDialogTitle").textContent = item ? "Schritt bearbeiten" : "Schritt hinzufügen";
  // Neuer Schritt: leeres Emoji-Feld, kein Standardwert.
  $("routineItemEmoji").value = item?.emoji || "";
  $("routineItemTitle").value = item?.title || "";
  fillRoutineMinuteOptions(item?.minutes ?? 5);
  $("routineItemContext").value = item?.context || "";
  $("deleteRoutineItem").hidden = !item;
  setRoutineEmojiError(false);
  $("routineItemDialog").showModal();
}

function saveRoutineItemFromForm(event) {
  event.preventDefault();
  const title = $("routineItemTitle").value.trim();
  const emoji = $("routineItemEmoji").value.trim();
  // Das Emoji ist Pflicht; es wird kein Standardwert eingesetzt.
  if (!emoji) {
    setRoutineEmojiError(true);
    $("routineItemEmoji").focus();
    return;
  }
  setRoutineEmojiError(false);
  if (!title) return;
  const selectedMinutes = Number($("routineItemMinutes").value);
  const item = {
    id: editingRoutineItemId || `${activeRoutineKey}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    emoji,
    title,
    minutes: Number.isFinite(selectedMinutes) && selectedMinutes > 0 ? clamp(selectedMinutes, 0.5, 180) : 5,
    context: $("routineItemContext").value.trim()
  };
  const list = routines[activeRoutineKey].items;
  const index = list.findIndex(entry => entry.id === editingRoutineItemId);
  if (index >= 0) list[index] = item; else list.push(item);
  saveRoutines();
  $("routineItemDialog").close();
  renderRoutineDetail(activeRoutineKey); renderRoutineCards();
  if (routineSession?.key === activeRoutineKey) {
    const editedIndex = routines[activeRoutineKey].items.findIndex(entry => entry.id === item.id);
    if (editingRoutineItemId && editedIndex >= 0 && currentSessionItem()?.id === item.id && routineSession.remaining > item.minutes * 60) {
      routineSession.remaining = item.minutes * 60;
      if (routineSession.running) routineSession.endAt = Date.now() + routineSession.remaining * 1000;
    }
    persistRoutineSession(); renderRoutineSession(); renderSessionRoutineEditor();
  }
}

function deleteRoutineItem() {
  if (!editingRoutineItemId || !confirm("Diesen Schritt wirklich löschen?")) return;
  const list = routines[activeRoutineKey].items;
  const index = list.findIndex(item => item.id === editingRoutineItemId);
  const deletingCurrentSessionItem = routineSession?.key === activeRoutineKey && currentSessionItem()?.id === editingRoutineItemId;
  if (index >= 0) list.splice(index, 1);
  delete currentData.routineProgress?.[activeRoutineKey]?.[editingRoutineItemId];
  if (routineSession?.key === activeRoutineKey) {
    if (!list.length) { closeRoutineSession(); }
    else {
      routineSession.index = Math.min(index, list.length - 1);
      if (deletingCurrentSessionItem) {
        routineSession.remaining = Math.round(list[routineSession.index].minutes * 60);
        routineSession.running = true;
        routineSession.endAt = Date.now() + routineSession.remaining * 1000;
        routineSession.expiredNotified = false;
      }
      persistRoutineSession();
    }
  }
  saveRoutines(); saveReview(true);
  $("routineItemDialog").close();
  renderRoutineDetail(activeRoutineKey); renderRoutineCards();
  if (routineSession) { renderRoutineSession(); renderSessionRoutineEditor(); }
}

function startRoutine(key) {
  const routine = routines[key];
  if (!routine.items.length) return;
  currentData.routineProgress[key] = currentData.routineProgress[key] || {};
  const progress = currentData.routineProgress?.[key] || {};
  let index = routine.items.findIndex(item => !["done", "skipped"].includes(progress[item.id]));
  if (index < 0) {
    if (!confirm("Diese Routine ist heute bereits abgeschlossen. Fortschritt zurücksetzen und erneut starten?")) return;
    currentData.routineProgress[key] = {};
    index = 0;
  }
  const remaining = Math.round(routine.items[index].minutes * 60);
  // Die Session arbeitet auf einer Kopie. Umsortieren während des Durchlaufs
  // verändert damit ausschließlich diesen Durchlauf, nie das gespeicherte
  // Routine-Template. Dauerhafte Änderungen laufen über "Routine bearbeiten".
  routineSession = { key, index, remaining, running: true, endAt: Date.now() + remaining * 1000, interval: null, contextOpen: true, expiredNotified: false,
    items: (routines[key]?.items || []).map(item => ({ ...item })) };
  persistRoutineSession();
  $("routineSessionDialog").showModal();
  renderRoutineSession();
  startSessionInterval();
}

/* Schritte des laufenden Durchlaufs. Fällt auf das Template zurück, damit
   Sessions aus früheren Versionen ohne eigene Kopie weiterhin laufen. */
function sessionItems() {
  if (!routineSession) return [];
  if (Array.isArray(routineSession.items) && routineSession.items.length) return routineSession.items;
  return routines[routineSession.key]?.items || [];
}

/* Verbleibende Dauer und voraussichtliche Endzeit.
   Wird bei jedem Rendern neu berechnet – also auch nach Erledigen,
   Überspringen, Umsortieren und Zeitänderung. */
function sessionRemainingSummary() {
  if (!routineSession) return null;
  const items = sessionItems();
  const progress = currentData?.routineProgress?.[routineSession.key] || {};
  // Laufender Schritt: tatsächliche Restzeit. Danach: geplante Dauer.
  const upcoming = items.slice(routineSession.index + 1)
    .filter(item => !progress[item.id])
    .reduce((sum, item) => sum + Number(item.minutes || 0) * 60, 0);
  const totalSeconds = Math.max(0, Math.round(routineSession.remaining)) + upcoming;
  const end = new Date(Date.now() + totalSeconds * 1000);
  return {
    minutes: Math.max(0, Math.round(totalSeconds / 60)),
    endLabel: `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`
  };
}

function currentSessionItem() {
  return sessionItems()[routineSession.index];
}

function renderRoutineSession() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const routine = routines[routineSession.key];
  const item = currentSessionItem();
  if (!routine || !item) return;
  $("routineSessionDialog").dataset.theme = routine.theme || "focus";
  $("sessionRoutineName").textContent = routine.title;
  const items = sessionItems();
  $("sessionProgress").textContent = `Schritt ${routineSession.index + 1} von ${items.length}`;
  // Die Session übernimmt das Kopfbild ihrer Routine als ruhige Atmosphäre.
  const dialogEl = $("routineSessionDialog");
  dialogEl.dataset.theme = routine.theme || "focus";
  // Fortschrittsring um den Timer: Anteil der bereits erledigten Schritte.
  const resolved = items.filter(item => (currentData?.routineProgress?.[routineSession.key] || {})[item.id]).length;
  const ring = Math.round(resolved / Math.max(1, items.length) * 100);
  $("sessionTimerCircle").style.setProperty("--session-progress", `${ring}%`);
  $("sessionItemTitle").textContent = item.title;
  $("sessionItemEmoji").textContent = item.emoji;
  $("sessionTimer").textContent = formatTimer(routineSession.remaining);
  $("sessionPause").innerHTML = routineSession.running ? icon("pause") : icon("play");
  $("sessionContext").hidden = !item.context;
  $("sessionContext").innerHTML = item.context ? linkifyText(item.context) : "";
  const next = items[routineSession.index + 1];
  $("sessionNext").textContent = next ? `Als Nächstes: ${next.title}` : "Letzter Schritt dieser Routine";
  const rest = sessionRemainingSummary();
  const restEl = $("sessionRemaining");
  if (restEl && rest) restEl.textContent = `Noch ${rest.minutes} Min. · ca. ${rest.endLabel} Uhr fertig`;
  const editor = $("sessionRoutineEditor");
  if (editor && !editor.hidden && editor.dataset.currentItemId !== item.id) renderSessionRoutineEditor();
}

function formatTimer(seconds) {
  const value = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function playTimerDoneTone() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [880, 1175, 988];
    notes.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      const start = ctx.currentTime + index * 0.18;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
      oscillator.start(start);
      oscillator.stop(start + 0.16);
    });
  } catch (error) {
    console.warn("Ton konnte nicht abgespielt werden", error);
  }
}

function persistRoutineSession() {
  if (!routineSession) {
    localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
    return;
  }
  const { interval, ...serializable } = routineSession;
  localStorage.setItem(ROUTINE_SESSION_STORAGE_KEY, JSON.stringify(serializable));
}

function syncRoutineSessionClock() {
  if (!routineSession?.running || !routineSession.endAt) return;
  const nextRemaining = Math.max(0, Math.ceil((routineSession.endAt - Date.now()) / 1000));
  routineSession.remaining = nextRemaining;
  if (nextRemaining <= 0) {
    routineSession.running = false;
    routineSession.endAt = null;
    if (!routineSession.expiredNotified) {
      routineSession.expiredNotified = true;
      playTimerDoneTone();
    }
    persistRoutineSession();
  }
}

function updateRoutineSessionClockDisplay() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const timer = $("sessionTimer");
  if (timer) timer.textContent = formatTimer(routineSession.remaining);
  const pause = $("sessionPause");
  if (pause) pause.innerHTML = routineSession.running ? icon("pause") : icon("play");
}

function startSessionInterval() {
  if (routineSession?.interval) clearInterval(routineSession.interval);
  if (!routineSession) return;
  updateRoutineSessionClockDisplay();
  routineSession.interval = window.setInterval(updateRoutineSessionClockDisplay, 250);
}

function toggleRoutineSessionRunning() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  if (routineSession.running) {
    routineSession.running = false;
    routineSession.endAt = null;
  } else if (routineSession.remaining > 0) {
    routineSession.running = true;
    routineSession.endAt = Date.now() + routineSession.remaining * 1000;
    routineSession.expiredNotified = false;
  }
  persistRoutineSession();
  renderRoutineSession();
}

function adjustRoutineSessionMinutes(deltaMinutes) {
  if (!routineSession) return;
  syncRoutineSessionClock();
  routineSession.remaining = Math.max(0, routineSession.remaining + deltaMinutes * 60);
  if (routineSession.running) routineSession.endAt = Date.now() + routineSession.remaining * 1000;
  routineSession.expiredNotified = false;
  persistRoutineSession();
  renderRoutineSession();
}

function restoreRoutineSession() {
  const stored = safeParse(localStorage.getItem(ROUTINE_SESSION_STORAGE_KEY));
  if (!stored || !routines?.[stored.key] || !routines[stored.key].items?.[stored.index]) {
    localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
    return;
  }
  routineSession = { ...stored, interval: null, remaining: Math.max(0, Number(stored.remaining || 0)), running: Boolean(stored.running), endAt: stored.endAt ? Number(stored.endAt) : null };
  syncRoutineSessionClock();
  if (!$("routineSessionDialog").open) $("routineSessionDialog").showModal();
  renderRoutineSession();
  startSessionInterval();
}

function completeSessionItem(status) {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const key = routineSession.key;
  const routine = routines[key];
  // Die Abfolge richtet sich nach der Session-Kopie, damit ein Umsortieren
  // während des Durchlaufs auch tatsächlich die Reihenfolge bestimmt.
  const items = sessionItems();
  const item = currentSessionItem();
  currentData.routineProgress[key][item.id] = status;
  const nextIndex = routineSession.index + 1;
  if (nextIndex >= items.length) {
    const allDone = items.every(entry => currentData.routineProgress[key][entry.id] === "done");
    if (key === "morning") currentData.morningRoutineState = allDone ? "done" : "responsiblySkipped";
    else if (key === "evening") currentData.eveningRoutineState = allDone ? "done" : "responsiblySkipped";
    saveReview(true);
    closeRoutineSession();
    alert(allDone ? `${routine.title} abgeschlossen.` : `${routine.title} gewissenhaft beendet. Übersprungene Schritte bleiben dokumentiert.`);
    return;
  }
  routineSession.index = nextIndex;
  routineSession.remaining = Math.round(Number(items[nextIndex].minutes || 0) * 60);
  routineSession.running = true;
  routineSession.endAt = Date.now() + routineSession.remaining * 1000;
  routineSession.expiredNotified = false;
  routineSession.contextOpen = false;
  saveReview(true);
  persistRoutineSession();
  renderRoutineSession();
  if ($("sessionRoutineEditor") && !$("sessionRoutineEditor").hidden) renderSessionRoutineEditor();
}

function closeRoutineSession() {
  if (routineSession?.interval) clearInterval(routineSession.interval);
  routineSession = null;
  localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
  if ($("routineSessionDialog").open) $("routineSessionDialog").close();
  const editor = $("sessionRoutineEditor");
  if (editor) { editor.hidden = true; editor.dataset.currentItemId = ""; }
  const editButton = $("sessionEditRoutine");
  if (editButton) { editButton.setAttribute("aria-expanded", "false"); editButton.classList.remove("is-open"); }
  updateRoutineStateButtons();
  renderRoutineCards();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

function requestStreakAccess() {
  const dialog = $("streakPrivacyDialog");
  if (dialog && !dialog.open) dialog.showModal();
}

function grantStreakAccess() {
  streaksUnlocked = true;
  const dialog = $("streakPrivacyDialog");
  if (dialog?.open) dialog.close();
  switchPage("streaks", { skipGuard: true });
}

function switchPage(page, options = {}) {
  if (page === "streaks" && !streaksUnlocked && !options.skipGuard) {
    requestStreakAccess();
    return;
  }
  const titles = { review: "Tagesreflexion", routines: "Routinen", streaks: "Streaks" };
  $("reviewPage").classList.toggle("active", page === "review");
  $("routinesPage").classList.toggle("active", page === "routines");
  $("streaksPage").classList.toggle("active", page === "streaks");
  $("pageTitle").textContent = titles[page] || "Roleplay";
  $("rolePickerWrap").hidden = false;
  $("dateNavigation").hidden = false;
  document.querySelectorAll(".nav-button").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  if (page === "routines") renderRoutineCards();
  if (page === "streaks") renderStreaks();
  if (page !== "streaks") streaksUnlocked = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateMealSelectionStyles() {
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const entry = document.querySelector(`[data-meal-entry="${key}"]`);
    const select = $(`${key}Category`);
    if (!entry || !select) return;
    entry.classList.toggle("is-selected", Boolean(select.value));
    entry.classList.toggle("meal-none", select.value === "none");
  });
}

function mealCategoryOptionsHTML(currentValue = "") {
  const entries = Object.entries(MEAL_CATEGORY_META);
  if (currentValue && LEGACY_MEAL_CATEGORY_META[currentValue]) {
    entries.push([currentValue, LEGACY_MEAL_CATEGORY_META[currentValue]]);
  }
  return entries.map(([value, meta]) => `<option value="${escapeHTML(value)}">${escapeHTML(meta.label)}</option>`).join("");
}

function initOptions() {
  const roleOptions = ROLES.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("dayRole").innerHTML = roleOptions;
  $("activityRole").innerHTML = roleOptions;
  $("stateSlot").innerHTML = CHECKIN_SLOTS.map(slot => `<option value="${slot.key}">${slot.icon} ${escapeHTML(slot.label)}</option>`).join("");
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => { if ($(`${key}Category`)) $(`${key}Category`).innerHTML = mealCategoryOptionsHTML(); });
  if ($("stateSleepQuality")) $("stateSleepQuality").innerHTML = `<option value="">Nicht erfasst</option>${SLEEP_CHOICES.map(value => `<option value="${value}">${escapeHTML(SLEEP_LABELS[value] || "-")}</option>`).join("")}`;
  if ($("stateDreamCategory")) $("stateDreamCategory").innerHTML = DREAM_CATEGORIES.map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`).join("");
  $("allahName").innerHTML = `<option value="">Name Allahs auswählen …</option>${ALLAH_NAMES.map(name => `<option>${escapeHTML(name)}</option>`).join("")}`;
  fillRoutineMinuteOptions(5);
}


function createRoutineKey(title) {
  const base = title.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-+|-+$/g, "") || `routine-${Date.now()}`;
  let key = base, counter = 2;
  while (routines[key]) { key = `${base}-${counter++}`; }
  return key;
}

/* Derselbe Dialog legt neue Routinen an und bearbeitet bestehende. Wird ein
   Schlüssel übergeben, sind Löschen möglich und die Felder vorbelegt. */
function openRoutineDialog(key = null) {
  const routine = key ? routines[key] : null;
  const dialog = $("routineDialog");
  dialog.dataset.editingRoutine = key || "";
  $("routineTitle").value = routine?.title || "";
  $("routineDescription").value = routine?.description || "";
  $("routineTheme").value = routine?.theme || "focus";
  const heading = dialog.querySelector("h3");
  if (heading) heading.textContent = routine ? "Routine bearbeiten" : "Routine hinzufügen";
  if ($("routineDialogSubmit")) $("routineDialogSubmit").textContent = routine ? "Sichern" : "Erstellen";
  // Die letzte verbliebene Routine bleibt erhalten – sonst stünde die Seite leer.
  if ($("deleteRoutine")) $("deleteRoutine").hidden = !routine || Object.keys(routines).length <= 1;
  updateRoutineThemePreview();
  dialog.showModal();
}

function updateRoutineThemePreview() {
  const preview = $("routineThemePreview");
  if (!preview) return;
  preview.className = `routine-theme-preview ${$("routineTheme").value}`;
}

/* Entfernt eine Routine samt ihrem Fortschritt des laufenden Tages.
   Gespeicherte Tage bleiben unberührt – dort steht der Fortschritt weiterhin. */
function deleteRoutine() {
  const key = $("routineDialog").dataset.editingRoutine;
  if (!key || !routines[key]) return;
  if (Object.keys(routines).length <= 1) return;
  if (!window.confirm(`„${routines[key].title}" wirklich löschen? Die Schritte gehen dabei verloren.`)) return;
  if (routineSession?.key === key) closeRoutineSession();
  delete routines[key];
  saveRoutines();
  $("routineDialog").close();
  if ($("routineDetail")) $("routineDetail").hidden = true;
  renderRoutineCards();
}

function saveRoutineFromForm(event) {
  event.preventDefault();
  const title = $("routineTitle").value.trim();
  if (!title) return;
  const editing = $("routineDialog").dataset.editingRoutine;
  if (editing && routines[editing]) {
    // Beim Bearbeiten bleiben Schlüssel und Schritte unangetastet.
    routines[editing].title = title;
    routines[editing].description = $("routineDescription").value.trim() || routines[editing].description;
    routines[editing].theme = $("routineTheme").value || "focus";
  } else {
    const key = createRoutineKey(title);
    routines[key] = {
      key,
      title,
      description: $("routineDescription").value.trim() || "Eigene Routine",
      theme: $("routineTheme").value || "focus",
      autoNext: false,
      items: []
    };
  }
  saveRoutines();
  $("routineDialog").close();
  renderRoutineCards();
  if (editing && $("routineDetail") && !$("routineDetail").hidden) openRoutineDetail(editing);
}

// Beim Scrollen klappen Titel und Rollenwähler ein; sichtbar bleibt nur die kompakte
// Datumsleiste. Zwei getrennte Schwellen verhindern Springen genau an der Grenze.
function bindHeaderCollapse() {
  const header = $("appHeader");
  if (!header) return;
  let collapsed = false;
  let ticking = false;
  const apply = () => {
    ticking = false;
    const offset = window.scrollY || document.documentElement.scrollTop || 0;
    if (!collapsed && offset > 72) { collapsed = true; header.classList.add("compact"); }
    else if (collapsed && offset < 28) { collapsed = false; header.classList.remove("compact"); }
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(apply);
  }, { passive: true });
  apply();
}

function bindEvents() {
  $("prevDay").addEventListener("click", () => setDate(addDays(selectedDate, -1)));
  $("nextDay").addEventListener("click", () => setDate(addDays(selectedDate, 1)));
  $("dateButton").addEventListener("click", openCalendar);
  $("calendarPrevMonth").addEventListener("click", () => {
    const date = new Date(`${calendarCursor}T12:00:00`); date.setMonth(date.getMonth() - 1); calendarCursor = dateToISO(date); renderCalendar();
  });
  $("calendarNextMonth").addEventListener("click", () => {
    const date = new Date(`${calendarCursor}T12:00:00`); date.setMonth(date.getMonth() + 1); calendarCursor = dateToISO(date); renderCalendar();
  });
  $("calendarToday").addEventListener("click", () => { setDate(todayISO()); $("calendarDialog").close(); });
  $("calendarClose").addEventListener("click", () => $("calendarDialog").close());
  $("prayerDialogClose").addEventListener("click", () => $("prayerDialog").close());

  $("dayRole").addEventListener("change", () => { currentData.role = $("dayRole").value; applyRolePickerStyle(); saveReview(true); });

  // Rollen-Control: Kapsel öffnet das Rollen-Sheet, die Auswahl schreibt
  // ausschließlich über das vorhandene Auswahlfeld.
  $("roleCapsule").addEventListener("click", () => { haptic(); openRoleSheet(); });
  $("roleSheetClose").addEventListener("click", closeRoleSheet);
  $("roleSheet").addEventListener("cancel", event => { event.preventDefault(); closeRoleSheet(); });
  $("roleSheet").addEventListener("close", () => {
    if ($("roleCapsule")) $("roleCapsule").setAttribute("aria-expanded", "false");
  });

  $("modeInfoButton").addEventListener("click", openModeInfo);
  $("modeInfoClose").addEventListener("click", () => $("modeInfoDialog").close());
  $("modeInfoDialog").addEventListener("cancel", event => { event.preventDefault(); $("modeInfoDialog").close(); });

  $("jumpToToday").addEventListener("click", () => {
    haptic();
    setDate(todayISO());
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  $("undoToastAction").addEventListener("click", runUndo);
  $("saveButton").addEventListener("click", () => saveReview(false));
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "gratitude1", "gratitude2", "allahName", "responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep", "notes"].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener("change", () => saveReview(true));
    $(id).addEventListener("input", () => { collectForm(); scheduleAutoSave(); });
  });
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const select = $(`${key}Category`);
    if (!select) return;
    select.addEventListener("change", () => { collectForm(); updateMealSelectionStyles(); saveReview(true); });
  });
  $("cancelStateCheckin").addEventListener("click", () => $("stateCheckinDialog").close());
  $("stateCheckinDialog").addEventListener("cancel", event => { event.preventDefault(); $("stateCheckinDialog").close(); });
  $("stateCheckinForm").addEventListener("submit", saveStateCheckin);
  ["stateEnergy", "stateMood", "stateSleepQuality", "stateDreamCategory", "stateDreamNote"].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener(["stateEnergy", "stateMood", "stateDreamNote"].includes(id) ? "input" : "change", () => updateStateCheckinPreview());
  });
  const changeWater = delta => {
    currentData.water = String(Math.max(0, Math.min(10000, Number(currentData.water || 0) + delta)));
    renderWaterControl();
    saveReview(true);
    renderStateOverview();
  };
  if ($("resetStateCheckin")) $("resetStateCheckin").addEventListener("click", () => {
    const slot = $("stateCheckinDialog").dataset.editingSlot;
    resetStateCheckin(slot);
    $("stateCheckinDialog").close();
  });
  if ($("weekBack")) $("weekBack").addEventListener("click", () => shiftWeek(-1));
  if ($("weekForward")) $("weekForward").addEventListener("click", () => shiftWeek(1));
  bindWeekSwipe();
  if ($("waterMinus")) $("waterMinus").addEventListener("click", () => changeWater(-500));
  if ($("waterPlus")) $("waterPlus").addEventListener("click", () => changeWater(500));
  document.querySelectorAll("[data-routine-cycle]").forEach(button => button.addEventListener("click", () => cycleRoutineState(button.dataset.routineCycle)));
  document.querySelectorAll("[data-review-open-routine]").forEach(button => button.addEventListener("click", () => {
    switchPage("routines");
    openRoutineDetail(button.dataset.reviewOpenRoutine);
  }));

  $("addActivity").addEventListener("click", () => { $("activityTitle").value = ""; $("activityDialog").showModal(); setTimeout(() => $("activityTitle").focus(), 50); });
  $("cancelActivity").addEventListener("click", () => $("activityDialog").close());
  $("activityForm").addEventListener("submit", event => {
    event.preventDefault();
    const title = $("activityTitle").value.trim();
    if (!title) return;
    currentData.activities.push({ title, role: $("activityRole").value });
    $("activityDialog").close(); saveReview(true); renderActivities();
  });

  $("exportBackup").addEventListener("click", exportBackup);
  $("exportCsv").addEventListener("click", exportCsv);
  $("importBackupButton").addEventListener("click", () => $("importBackupInput").click());
  $("importBackupInput").addEventListener("change", event => {
    const file = event.target.files?.[0]; if (file) importBackup(file); event.target.value = "";
  });

  document.querySelectorAll(".nav-button").forEach(button => button.addEventListener("click", () => switchPage(button.dataset.page)));
  $("cancelStreakAccess").addEventListener("click", () => $("streakPrivacyDialog").close());
  $("confirmStreakAccess").addEventListener("click", grantStreakAccess);
  $("streakPrivacyDialog").addEventListener("cancel", event => { event.preventDefault(); $("streakPrivacyDialog").close(); });
  $("openRoutines").addEventListener("click", () => switchPage("routines"));
  $("backToRoutineOverview").addEventListener("click", closeRoutineDetail);
  $("startRoutineDetail").addEventListener("click", () => startRoutine(activeRoutineKey));
  if ($("addRoutine")) $("addRoutine").addEventListener("click", () => openRoutineDialog());
  if ($("deleteRoutine")) $("deleteRoutine").addEventListener("click", deleteRoutine);
  if ($("routineTheme")) $("routineTheme").addEventListener("change", updateRoutineThemePreview);
  if ($("editRoutineMeta")) $("editRoutineMeta").addEventListener("click", () => {
    const key = $("routineDetail")?.dataset.routineKey;
    if (key) openRoutineDialog(key);
  });
  $("routineDialogForm").addEventListener("submit", saveRoutineFromForm);
  $("cancelRoutine").addEventListener("click", () => $("routineDialog").close());
  $("addRoutineItem").addEventListener("click", () => openRoutineItemDialog());
  $("routineItemForm").addEventListener("submit", saveRoutineItemFromForm);
  $("cancelRoutineItem").addEventListener("click", () => $("routineItemDialog").close());
  $("deleteRoutineItem").addEventListener("click", deleteRoutineItem);
  $("routineItemEmoji").addEventListener("input", () => {
    if ($("routineItemEmoji").value.trim()) setRoutineEmojiError(false);
  });
  bindRoleplayBalance();

  $("closeRoutineSession").addEventListener("click", closeRoutineSession);
  $("routineSessionDialog").addEventListener("cancel", event => {
    event.preventDefault();
    const editor = $("sessionRoutineEditor");
    if (editor && !editor.hidden) toggleSessionRoutineEditor(false);
    else closeRoutineSession();
  });
  $("sessionPause").addEventListener("click", toggleRoutineSessionRunning);
  $("sessionComplete").addEventListener("click", () => completeSessionItem("done"));
  $("sessionSkip").addEventListener("click", () => completeSessionItem("skipped"));
  $("sessionMinus").addEventListener("click", () => adjustRoutineSessionMinutes(-1));
  $("sessionPlus").addEventListener("click", () => adjustRoutineSessionMinutes(1));
  $("sessionEditRoutine").addEventListener("click", () => toggleSessionRoutineEditor());
  $("sessionEditorDone").addEventListener("click", () => toggleSessionRoutineEditor(false));
  $("sessionRoutineEditor").addEventListener("click", event => {
    if (event.target === $("sessionRoutineEditor")) toggleSessionRoutineEditor(false);
  });

  bindHeaderCollapse();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && routineSession) { syncRoutineSessionClock(); renderRoutineSession(); }
    persistRoutineSession();
  });
  window.addEventListener("focus", () => { if (routineSession) { syncRoutineSessionClock(); renderRoutineSession(); } });
  window.addEventListener("pageshow", () => { if (routineSession) { syncRoutineSessionClock(); renderRoutineSession(); } });
  window.addEventListener("pagehide", persistRoutineSession);
}

function init() {
  hydrateIcons();
  initOptions();
  if ($("appVersionLabel")) $("appVersionLabel").textContent = `ROLEPLAY ${APP_VERSION}`;
  routines = loadRoutines();
  bindEvents();
  const lastBackupAt = localStorage.getItem(BACKUP_TIMESTAMP_KEY);
  if (lastBackupAt) $("backupStatus").textContent = `Letztes Backup: ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastBackupAt))}`;
  setDate(todayISO());
  switchPage("review");
  restoreRoutineSession();
  registerServiceWorker();
}

/* Aktualisierung: Der neue Service Worker übernimmt sofort (skipWaiting und
   clients.claim). Nur wenn die Seite vorher bereits von einem Worker
   kontrolliert wurde, wird einmalig neu geladen – so greift die neue
   Version zuverlässig, ohne beim ersten Installieren eine Schleife zu
   erzeugen. */
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloading) return;
    reloading = true;
    window.location.reload();
  });
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

document.addEventListener("DOMContentLoaded", init);

/* Sunnah-Gebete: zyklischer Wechsel durch die vorhandenen Statuswerte.
   Die bestehende Datenstruktur bleibt unverändert – gespeichert werden
   weiterhin genau die Werte aus SUNNAH_PRAYER_STATES. */
function cycleSunnahPrayer(prayer) {
  if (!currentData) return;
  currentData.sunnahPrayers = currentData.sunnahPrayers || {};
  const order = SUNNAH_PRAYER_STATES.map(item => item.value);
  const current = currentData.sunnahPrayers[prayer] || "";
  const next = order[(order.indexOf(current) + 1 + order.length) % order.length];
  currentData.sunnahPrayers[prayer] = next;
  saveReview(true);
  renderPrayers();
}

/* Horizontales Blättern durch Kalenderwochen.
   Eine Wischbewegung entspricht genau einer Woche; über die aktuelle
   Kalenderwoche hinaus wird nicht navigiert (siehe shiftWeek). */
function bindWeekSwipe() {
  const area = $("statsSwipe");
  if (!area || area.dataset.swipeBound === "true") return;
  area.dataset.swipeBound = "true";
  let startX = 0, startY = 0, active = false;

  area.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX = event.clientX; startY = event.clientY; active = true;
  });

  area.addEventListener("pointerup", event => {
    if (!active) return;
    active = false;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    // Nur eindeutig horizontale Bewegungen zählen, damit Scrollen nicht stört.
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    const moved = shiftWeek(dx > 0 ? -1 : 1);
    if (moved) area.animate(
      [{ opacity: .45, transform: `translateX(${dx > 0 ? 14 : -14}px)` }, { opacity: 1, transform: "none" }],
      { duration: 190, easing: "ease-out" });
  });

  area.addEventListener("pointercancel", () => { active = false; });
}
