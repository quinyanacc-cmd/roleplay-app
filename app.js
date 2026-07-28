const PRAYERS = ["Fajr", "Dhuhr", "ʿAsr", "Maghrib", "ʿIschāʾ"];
const PRAYER_STATES = [
  { value: "", label: "Offen", icon: "○", short: "Offen" },
  { value: "Normal", label: "Gebetet", icon: "●", short: "Gebet" },
  { value: "Gemeinschaft", label: "Moschee", icon: "🕌", short: "Moschee" },
  { value: "Verspätet", label: "Verspätet", icon: "🕓", short: "Verspätet" },
  { value: "Nachgeholt", label: "Nachgeholt", icon: "↩️", short: "Nachgeholt" },
  { value: "Nicht gebetet", label: "Nicht gebetet", icon: "❌", short: "Nicht gebetet" }
];

const ROLES = [
  { name: "Yannick", emoji: "🫆", color: "#4AA8FF", text: "#174E7A" },
  { name: "Vitalist", emoji: "🧬", color: "#193C8C", text: "#FFFFFF" },
  { name: "Absolvent", emoji: "🎓", color: "#F07A32", text: "#6D2E09" },
  { name: "Unternehmer", emoji: "💰", color: "#F2C94C", text: "#5D4800" },
  { name: "Muslim", emoji: "🕋", color: "#2EC4B6", text: "#075C55" },
  { name: "Wirt", emoji: "🏡", color: "#8E2F45", text: "#FFFFFF" },
  { name: "Familienmensch", emoji: "💌", color: "#72C472", text: "#205B29" }
];

const STREAKS = [
  { key: "cannabisFree", label: "Cannabisfrei" },
  { key: "compulsionFree", label: "Begierde" },
  { key: "alcoholFree", label: "Alkoholfrei" },
  { key: "smokeFree", label: "Rauchfrei" }
];

const EMOTIONS = [
  { value: "", label: "Noch nicht eingetragen" },
  { value: "Freudig", label: "😄 Freudig" },
  { value: "Zufrieden", label: "🙂 Zufrieden" },
  { value: "Ruhig", label: "😌 Ruhig" },
  { value: "Dankbar", label: "🥰 Dankbar" },
  { value: "Motiviert", label: "🔥 Motiviert" },
  { value: "Fokussiert", label: "🎯 Fokussiert" },
  { value: "Gelassen", label: "🧘 Gelassen" },
  { value: "Hoffnungsvoll", label: "🌤️ Hoffnungsvoll" },
  { value: "Liebevoll", label: "💗 Liebevoll" },
  { value: "Nachdenklich", label: "🤔 Nachdenklich" },
  { value: "Neutral", label: "😐 Neutral" },
  { value: "Unsicher", label: "😕 Unsicher" },
  { value: "Besorgt", label: "😟 Besorgt" },
  { value: "Traurig", label: "😔 Traurig" },
  { value: "Ängstlich", label: "😰 Ängstlich" },
  { value: "Ärgerlich", label: "😠 Ärgerlich" },
  { value: "Wütend", label: "😡 Wütend" },
  { value: "Überfordert", label: "😫 Überfordert" },
  { value: "Gestresst", label: "😵‍💫 Gestresst" },
  { value: "Erschöpft", label: "🥱 Erschöpft" },
  { value: "Müde", label: "😴 Müde" },
  { value: "Leer", label: "🫥 Leer" },
  { value: "Hungrig", label: "🍽️ Hungrig" },
  { value: "Krank", label: "🤒 Krank" },
  { value: "Schmerzen", label: "🤕 Schmerzen" },
  { value: "Begehrlich", label: "❤️‍🔥 Große Begierde" },
  { value: "Versucht", label: "🧲 Versuchung" },
  { value: "Einsam", label: "🥺 Einsam" },
  { value: "Verbunden", label: "🤝 Verbunden" },
  { value: "Scham", label: "🫣 Scham" },
  { value: "Reue", label: "🥀 Reue" },
  { value: "Schuldig", label: "😞 Schuldig" },
  { value: "Überreizt", label: "🤯 Überreizt" },
  { value: "Unruhig", label: "😬 Unruhig" },
  { value: "Sehnsüchtig", label: "🌙 Sehnsüchtig" },
  { value: "Zuversichtlich", label: "✨ Zuversichtlich" },
  { value: "Stolz", label: "😌 Stolz" },
  { value: "Inspiriert", label: "💡 Inspiriert" },
  { value: "Klar", label: "🧭 Klar" },
  { value: "Geerdet", label: "🌿 Geerdet" },
  { value: "Friedlich", label: "🕊️ Friedlich" },
  { value: "Gottesfürchtig", label: "🤲 Gottesfürchtig" },
  { value: "Erleichtert", label: "😮‍💨 Erleichtert" }
];

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

const STATE_ENVIRONMENT_OPTIONS = {
  supportive: { label: "Unterstützend", icon: "🤝", score: 92 },
  normal: { label: "Normal", icon: "🏠", score: 72 },
  pressure: { label: "Zeitdruck", icon: "⏱️", score: 46 },
  conflict: { label: "Konflikt", icon: "⚠️", score: 34 },
  overstimulating: { label: "Überreizend", icon: "🔊", score: 29 }
};

const POSITIVE_EMOTIONS = new Set(["Freudig", "Zufrieden", "Ruhig", "Dankbar", "Motiviert", "Fokussiert", "Gelassen", "Hoffnungsvoll", "Liebevoll", "Verbunden", "Zuversichtlich", "Stolz", "Inspiriert", "Klar", "Geerdet", "Friedlich", "Gottesfürchtig", "Erleichtert"]);
const HEAVY_EMOTIONS = new Set(["Überfordert", "Erschöpft", "Leer", "Krank", "Schmerzen", "Überreizt", "Wütend", "Ängstlich"]);

const FRAMEWORKS = [
  { min: 76, key: "development", label: "Entfaltung", icon: "✦", color: "#5B72FF", summary: "Kraft für Gestaltung, Wachstum und zusätzliche Vorhaben.", focus: ["Wesentliche Pflichten bewusst sichern", "Entwicklung und Gestaltung einplanen", "Pausen trotz guter Kraft beibehalten"] },
  { min: 56, key: "balance", label: "Balance", icon: "◐", color: "#2EC4B6", summary: "Wesentliches und begrenzte Entwicklung sind realistisch.", focus: ["Kernaufgaben zuerst", "Zusätzliche Vorhaben bewusst begrenzen", "Energie im Tagesverlauf erneut prüfen"] },
  { min: 36, key: "maintenance", label: "Erhaltung", icon: "⌁", color: "#E7A31A", summary: "Stabilität, Versorgung und Kernverantwortung stehen im Vordergrund.", focus: ["Pflichten und Versorgung priorisieren", "Routinen kürzen oder anpassen", "Regeneration als Verantwortung anerkennen"] },
  { min: 21, key: "recovery", label: "Regeneration", icon: "☾", color: "#E8798D", summary: "Nur das Notwendige, Schutz und Erholung sind heute angemessen.", focus: ["Notwendiges sichern", "Unterstützung und Entlastung zulassen", "Keine nachholende Überforderung erzeugen"] },
  { min: 0, key: "protection", label: "Schutz", icon: "◇", color: "#C557B7", summary: "Sicherheit, Versorgung und Hilfe haben Vorrang vor jeder Zusatzanforderung.", focus: ["Sicherheit und Grundversorgung", "Hilfe annehmen oder Kontakt aufnehmen", "Zusätzliche Erwartungen vollständig aussetzen"] }
];

const RESPONSIBILITY_KEYS = ["stateHonesty", "boundaryRespect", "amanahCare", "roleFidelity"];
const ROLE_REFLECTION_ORDER = ["", "responsible", "partial", "overextended"];
const ROLE_REFLECTION_META = {
  "": { label: "Nicht reflektiert", short: "Offen", icon: "○", score: null },
  responsible: { label: "Verantwortungsvoll gelebt", short: "Verantwortungsvoll", icon: "✓", score: 2 },
  partial: { label: "Teilweise angemessen", short: "Teilweise", icon: "≈", score: 1 },
  overextended: { label: "Mich dabei überfordert", short: "Überfordert", icon: "!", score: 0 }
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

const QUICK_EMOJIS = ["🕯️","🔛","🧎🏻","🤸🏻","🛏️","🥗","🪷","📋","💡","🔤","📒","📝","🎒","👕","🚿","🐈","🧹","📓","🤲","📵","🛌","🌙"];
const APP_VERSION = "4.0";
const STORAGE_NAMESPACE = "roleplay-v25";
const ROUTINES_STORAGE_KEY = `${STORAGE_NAMESPACE}-routines`;
const BACKUP_TIMESTAMP_KEY = `${STORAGE_NAMESPACE}-last-backup-at`;
const ROUTINE_SESSION_STORAGE_KEY = `${STORAGE_NAMESPACE}-active-routine-session`;
const ROUTINE_STATE_ORDER = ["", "done", "adapted", "missed"];
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

function bytesToBase64Url(bytes) {
  let binary = "";
  new Uint8Array(bytes).forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const padLength = (4 - (value.length % 4)) % 4;
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  const binary = atob(padded);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function randomBytes(length = 32) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function getRole(name) {
  const normalized = name === "Ich-Person" ? "Yannick" : name;
  return ROLES.find(role => role.name === normalized) || ROLES[0];
}

function defaultRoleForDate(date) {
  const weekday = new Date(`${date}T12:00:00`).getDay();
  const names = ["Familienmensch", "Yannick", "Vitalist", "Absolvent", "Unternehmer", "Muslim", "Wirt"];
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
    return [streak.key, { days: wasBroken ? 0 : previousDays + 1, broken: false }];
  }));
}

function emptyReview(date) {
  const previous = findPreviousReview(date)?.data;
  return {
    role: defaultRoleForDate(date),
    breakfast: "", lunch: "", dinner: "", snack: "",
    water: "0", steps: "",
    morningRoutineState: "", eveningRoutineState: "",
    morningRoutine: false, eveningRoutine: false,
    routineProgress: { morning: {}, evening: {} },
    prayers: Object.fromEntries(PRAYERS.map(prayer => [prayer, ""])),
    ramadanDays: previous?.ramadanDays !== undefined ? Number(previous.ramadanDays) : -29,
    fastingCompleted: false,
    sleepQualityScore: "",
    dreams: "",
    activities: [],
    streaks: inheritedStreaks(previous),
    mood: "",
    gratitude1: "", gratitude2: "", allahName: "",
    stateCheckins: [],
    responsibility: Object.fromEntries(RESPONSIBILITY_KEYS.map(key => [key, null])),
    roleReflections: Object.fromEntries(ROLES.map(role => [role.name, ""])),
    responsibilityNote: "",
    notes: ""
  };
}

function legacySleepScore(value) {
  return ({ "Sehr gut": 1, "Gut": 2, "Neutral": 2, "Schlecht": 4, "Sehr schlecht": 5 })[value] ?? "";
}

function normalizeReview(raw, date, hasStoredValue) {
  const base = emptyReview(date);
  const merged = { ...base, ...(raw || {}) };
  merged.role = getRole(raw?.role || base.role).name;
  merged.prayers = { ...base.prayers, ...(raw?.prayers || {}) };
  merged.activities = Array.isArray(raw?.activities) ? raw.activities.map(item => ({
    title: String(item.title || ""),
    role: getRole(item.role || "Yannick").name
  })).filter(item => item.title) : [];
  merged.morningRoutineState = raw?.morningRoutineState || (raw?.morningRoutine ? "done" : "");
  merged.eveningRoutineState = raw?.eveningRoutineState || (raw?.eveningRoutine ? "done" : "");
  const normalizedSleep = raw?.sleepQualityScore ?? legacySleepScore(raw?.sleepQuality);
  merged.sleepQualityScore = normalizedSleep === "" || normalizedSleep === undefined || normalizedSleep === null ? "" : Number(normalizedSleep);
  merged.routineProgress = {
    morning: { ...(raw?.routineProgress?.morning || {}) },
    evening: { ...(raw?.routineProgress?.evening || {}) }
  };
  merged.stateCheckins = Array.isArray(raw?.stateCheckins) ? raw.stateCheckins.map((entry, index) => ({
    id: String(entry.id || `state-${date}-${index}`),
    time: /^\d{2}:\d{2}$/.test(entry.time || "") ? entry.time : "12:00",
    energy: clamp(Number(entry.energy ?? 60), 0, 100),
    body: STATE_BODY_OPTIONS[entry.body] ? entry.body : "stable",
    mind: STATE_MIND_OPTIONS[entry.mind] ? entry.mind : "normal",
    environment: STATE_ENVIRONMENT_OPTIONS[entry.environment] ? entry.environment : "normal",
    emotion: EMOTIONS.some(option => option.value === entry.emotion) ? entry.emotion : "",
    note: String(entry.note || ""),
    createdAt: entry.createdAt || `${date}T${entry.time || "12:00"}:00`
  })).sort((a, b) => a.time.localeCompare(b.time)) : [];
  merged.responsibility = Object.fromEntries(RESPONSIBILITY_KEYS.map(key => {
    const value = raw?.responsibility?.[key];
    return [key, [0, 1, 2].includes(Number(value)) ? Number(value) : null];
  }));
  merged.roleReflections = Object.fromEntries(ROLES.map(role => {
    const value = raw?.roleReflections?.[role.name];
    return [role.name, ROLE_REFLECTION_ORDER.includes(value) ? value : ""];
  }));
  merged.responsibilityNote = String(raw?.responsibilityNote || "");
  merged.streaks = hasStoredValue ? { ...base.streaks } : base.streaks;
  STREAKS.forEach(streak => {
    const old = raw?.streaks?.[streak.key];
    if (old && typeof old === "object") {
      merged.streaks[streak.key] = { days: Math.max(0, Number(old.days || 0)), broken: Boolean(old.broken || old.status === "broken") };
    } else if (!merged.streaks[streak.key]) {
      merged.streaks[streak.key] = { days: 0, broken: false };
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
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "dreams", "gratitude1", "gratitude2", "allahName", "responsibilityNote", "notes"].forEach(id => {
    if ($(id)) currentData[id] = $(id).value;
  });
  currentData.ramadanDays = Number(currentData.ramadanDays || 0);
  const sleepValue = Number($("sleepQuality")?.value ?? 3);
  currentData.sleepQualityScore = sleepValue === 3 ? "" : sleepValue;
  currentData.mood = $("mood")?.value || "";
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
    const original = button.textContent;
    button.textContent = "✓ Gespeichert";
    setTimeout(() => { button.textContent = original; }, 1100);
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
  selectedDate = date;
  calendarCursor = firstOfMonth(date);
  currentData = loadReview(date);
  $("dateButton").textContent = formatDate(date);
  fillForm();
  renderStats();
  renderRoutineCards();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

function fillForm() {
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "dreams", "gratitude1", "gratitude2", "allahName", "responsibilityNote", "notes"].forEach(id => {
    if ($(id)) $(id).value = currentData[id] ?? "";
  });
  $("dayRole").value = getRole(currentData.role).name;
  applyRolePickerStyle();
  $("sleepQuality").value = currentData.sleepQualityScore === "" || currentData.sleepQualityScore === undefined || currentData.sleepQualityScore === null ? 3 : Number(currentData.sleepQualityScore);
  $("mood").value = currentData.mood || "";
  updateSleepLabel();
  renderWaterControl();
  updateRamadanDisplay();
  updateRoutineStateButtons();
  renderPrayers();
  renderActivities();
  renderStateOverview();
  renderResponsibilityReflection();
  renderStreaks();
}

function currentClockTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function emotionStateScore(value) {
  if (!value) return 65;
  if (POSITIVE_EMOTIONS.has(value)) return 88;
  if (HEAVY_EMOTIONS.has(value)) return 28;
  if (["Traurig", "Besorgt", "Gestresst", "Scham", "Reue", "Schuldig", "Einsam", "Unruhig", "Versucht", "Begehrlich"].includes(value)) return 44;
  return 62;
}

function stateCapacity(checkin) {
  if (!checkin) return null;
  const energy = clamp(Number(checkin.energy ?? 60), 0, 100);
  const body = STATE_BODY_OPTIONS[checkin.body]?.score ?? 75;
  const mind = STATE_MIND_OPTIONS[checkin.mind]?.score ?? 72;
  const environment = STATE_ENVIRONMENT_OPTIONS[checkin.environment]?.score ?? 72;
  const emotion = emotionStateScore(checkin.emotion);
  return Math.round(energy * .42 + body * .24 + mind * .19 + environment * .10 + emotion * .05);
}

function frameworkForCheckin(checkin) {
  const capacity = stateCapacity(checkin);
  if (capacity === null) return null;
  const framework = FRAMEWORKS.find(item => capacity >= item.min) || FRAMEWORKS[FRAMEWORKS.length - 1];
  return { ...framework, capacity };
}

function latestStateCheckin(data = currentData) {
  const entries = Array.isArray(data?.stateCheckins) ? data.stateCheckins : [];
  return [...entries].sort((a, b) => a.time.localeCompare(b.time)).at(-1) || null;
}

function stateMetaLine(checkin) {
  if (!checkin) return "";
  const body = STATE_BODY_OPTIONS[checkin.body] || STATE_BODY_OPTIONS.stable;
  const mind = STATE_MIND_OPTIONS[checkin.mind] || STATE_MIND_OPTIONS.normal;
  const environment = STATE_ENVIRONMENT_OPTIONS[checkin.environment] || STATE_ENVIRONMENT_OPTIONS.normal;
  return `${body.icon} ${body.label} · ${mind.icon} ${mind.label} · ${environment.icon} ${environment.label}${checkin.emotion ? ` · ${checkin.emotion}` : ""}`;
}

function renderStateOverview() {
  const summary = $("currentStateSummary");
  const timeline = $("stateTimeline");
  if (!summary || !timeline || !currentData) return;
  const checkins = [...(currentData.stateCheckins || [])].sort((a, b) => a.time.localeCompare(b.time));
  const latest = checkins.at(-1);
  const framework = frameworkForCheckin(latest);
  $("stateCheckinCount").textContent = checkins.length ? `${checkins.length} ${checkins.length === 1 ? "Check-in" : "Check-ins"}` : "Noch kein Check-in";

  if (!latest || !framework) {
    summary.className = "current-state-summary empty-state-summary";
    summary.innerHTML = `<div class="empty-state-icon" aria-hidden="true">◇</div><div><strong>Noch kein Verantwortungsrahmen</strong><p>Erfasse deinen aktuellen Zustand. Die App hilft dir anschließend, Anforderungen angemessen einzuordnen.</p></div>`;
    $("adaptiveRoutineHint").hidden = true;
  } else {
    summary.className = `current-state-summary framework-${framework.key}`;
    summary.style.setProperty("--framework-color", framework.color);
    summary.innerHTML = `
      <div class="framework-main">
        <div class="framework-icon" aria-hidden="true">${framework.icon}</div>
        <div class="framework-copy">
          <span>Aktueller Verantwortungsrahmen · ${escapeHTML(latest.time)} Uhr</span>
          <strong>${escapeHTML(framework.label)}</strong>
          <p>${escapeHTML(framework.summary)}</p>
        </div>
        <div class="capacity-indicator" aria-label="Verfügbarer Handlungsspielraum ${framework.capacity} Prozent">
          <strong>${framework.capacity}</strong><small>Spielraum</small>
        </div>
      </div>
      <div class="state-meta-line">${escapeHTML(stateMetaLine(latest))}</div>
      <div class="framework-focus-list">${framework.focus.map(item => `<span>${escapeHTML(item)}</span>`).join("")}</div>`;
    const hint = $("adaptiveRoutineHint");
    hint.hidden = false;
    hint.style.setProperty("--framework-color", framework.color);
    const routineText = framework.key === "development"
      ? "Die vollständigen Routinen können heute stimmig sein – bewahre trotzdem Pausen und Maß."
      : framework.key === "balance"
        ? "Beginne mit den Kernschritten. Zusätzliche Schritte bleiben eine bewusste Entscheidung."
        : framework.key === "maintenance"
          ? "Eine gekürzte oder angepasste Routine kann heute verantwortungsvoller sein als vollständige Erfüllung."
          : framework.key === "recovery"
            ? "Sichere nur notwendige Schritte. Überspringen und Regeneration dürfen bewusste Anpassungen sein."
            : "Versorgung, Sicherheit und Hilfe haben Vorrang. Zusätzliche Routineanforderungen ruhen.";
    hint.innerHTML = `<strong>Adaptive Einordnung</strong><span>${escapeHTML(routineText)}</span>`;
  }

  timeline.innerHTML = checkins.length ? [...checkins].reverse().map(entry => {
    const entryFramework = frameworkForCheckin(entry);
    return `<article class="state-timeline-item" style="--framework-color:${entryFramework.color}">
      <div class="state-timeline-marker"></div>
      <div class="state-timeline-copy">
        <div class="state-timeline-title"><strong>${escapeHTML(entry.time)} Uhr · ${escapeHTML(entryFramework.label)}</strong><span>${entryFramework.capacity}</span></div>
        <small>${escapeHTML(stateMetaLine(entry))}</small>
        ${entry.note ? `<p>${escapeHTML(entry.note)}</p>` : ""}
      </div>
      <button type="button" class="state-delete-button" data-delete-state-checkin="${escapeHTML(entry.id)}" aria-label="Zustands-Check-in löschen">×</button>
    </article>`;
  }).join("") : `<p class="state-timeline-empty">Zustände verändern sich. Erfasse bei einer deutlichen Veränderung einen neuen Check-in, statt den ganzen Tag rückwirkend als gleich zu bewerten.</p>`;

  document.querySelectorAll("[data-delete-state-checkin]").forEach(button => button.addEventListener("click", () => {
    currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.id !== button.dataset.deleteStateCheckin);
    saveReview(true);
    renderStateOverview();
    renderResponsibilityReflection();
  }));
}

function populateStateCheckinEmotion() {
  const select = $("stateEmotion");
  if (!select) return;
  select.innerHTML = EMOTIONS.map(emotion => `<option value="${escapeHTML(emotion.value)}">${escapeHTML(emotion.label)}</option>`).join("");
}

function openStateCheckinDialog() {
  const latest = latestStateCheckin();
  $("stateEnergy").value = latest?.energy ?? 60;
  $("stateBody").value = latest?.body || "stable";
  $("stateMind").value = latest?.mind || "normal";
  $("stateEnvironment").value = latest?.environment || "normal";
  $("stateEmotion").value = latest?.emotion || currentData.mood || "";
  $("stateTime").value = selectedDate === todayISO() ? currentClockTime() : (latest?.time || "12:00");
  $("stateNote").value = "";
  updateStateCheckinPreview();
  $("stateCheckinDialog").showModal();
}

function stateCheckinFromForm() {
  return {
    energy: clamp(Number($("stateEnergy").value || 0), 0, 100),
    body: $("stateBody").value,
    mind: $("stateMind").value,
    environment: $("stateEnvironment").value,
    emotion: $("stateEmotion").value,
    time: $("stateTime").value || "12:00",
    note: $("stateNote").value.trim()
  };
}

function updateStateCheckinPreview() {
  if (!$("stateEnergy")) return;
  const draft = stateCheckinFromForm();
  const framework = frameworkForCheckin(draft);
  $("stateEnergyValue").textContent = `${draft.energy} %`;
  $("stateFrameworkPreview").textContent = framework.label;
  $("stateFrameworkPreview").style.setProperty("--framework-color", framework.color);
  $("stateFrameworkPreviewText").innerHTML = `<strong>${framework.icon} ${escapeHTML(framework.label)}</strong><span>${escapeHTML(framework.summary)}</span>`;
}

function saveStateCheckin(event) {
  event.preventDefault();
  const entry = stateCheckinFromForm();
  entry.id = `state-${selectedDate}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  entry.createdAt = `${selectedDate}T${entry.time}:00`;
  currentData.stateCheckins = [...(currentData.stateCheckins || []), entry].sort((a, b) => a.time.localeCompare(b.time));
  if (!currentData.mood && entry.emotion) {
    currentData.mood = entry.emotion;
    $("mood").value = entry.emotion;
  }
  $("stateCheckinDialog").close();
  saveReview(true);
  renderStateOverview();
  renderResponsibilityReflection();
}

function responsibilityScore(data = currentData) {
  if (!data) return null;
  const questionValues = RESPONSIBILITY_KEYS.map(key => data.responsibility?.[key]).filter(value => [0, 1, 2].includes(Number(value))).map(Number);
  const roleValues = ROLES.map(role => ROLE_REFLECTION_META[data.roleReflections?.[role.name]]?.score).filter(value => value !== null && value !== undefined);
  const questionScore = questionValues.length ? questionValues.reduce((sum, value) => sum + value, 0) / (questionValues.length * 2) * 100 : null;
  const roleScore = roleValues.length ? roleValues.reduce((sum, value) => sum + value, 0) / (roleValues.length * 2) * 100 : null;
  if (questionScore === null && roleScore === null) return null;
  if (questionScore === null) return Math.round(roleScore);
  if (roleScore === null) return Math.round(questionScore);
  return Math.round(questionScore * .7 + roleScore * .3);
}

function responsibilityLabel(score) {
  if (score === null) return { label: "Noch offen", tone: "open", text: "Die Verantwortung des Tages wird durch deine ehrliche Reflexion sichtbar – nicht durch eine automatische Leistungswertung." };
  if (score >= 85) return { label: "Sehr stimmig", tone: "strong", text: "Du hast Zustand, Grenzen, Rollen und Amānah nach deiner Einschätzung sehr stimmig miteinander verbunden." };
  if (score >= 65) return { label: "Verantwortungsvoll", tone: "good", text: "Der Tag war überwiegend angemessen. Einzelne Spannungen dürfen als Hinweis für morgen dienen." };
  if (score >= 40) return { label: "Teilweise stimmig", tone: "mixed", text: "Du erkennst sowohl verantwortungsvolle Schritte als auch Bereiche, in denen Anspruch und Zustand nicht zusammenpassten." };
  return { label: "Überforderung erkannt", tone: "warning", text: "Die Reflexion zeigt eine deutliche Soll-Spannung. Die Erkenntnis ist kein Versagen, sondern ein Signal für Schutz, Anpassung und Unterstützung." };
}

function renderResponsibilityReflection() {
  if (!currentData) return;
  RESPONSIBILITY_KEYS.forEach(key => {
    const value = currentData.responsibility?.[key];
    document.querySelectorAll(`[data-responsibility-question="${key}"] [data-responsibility-value]`).forEach(button => {
      const active = Number(button.dataset.responsibilityValue) === Number(value) && value !== null;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  });

  const grid = $("roleReflectionGrid");
  grid.innerHTML = ROLES.map(role => {
    const status = currentData.roleReflections?.[role.name] || "";
    const meta = ROLE_REFLECTION_META[status];
    const selected = currentData.role === role.name;
    return `<button type="button" class="role-reflection-chip status-${status || "open"} ${selected ? "selected-day-role" : ""}" data-cycle-role-reflection="${escapeHTML(role.name)}" style="--role-color:${role.color};--role-soft:${hexToRgba(role.color,.14)};--role-text:${role.text}" aria-label="${escapeHTML(role.name)}: ${escapeHTML(meta.label)}">
      <span class="role-reflection-identity"><b>${escapeHTML(role.emoji)}</b><strong>${escapeHTML(role.name)}</strong></span>
      <span class="role-reflection-state"><i>${escapeHTML(meta.icon)}</i>${escapeHTML(meta.short)}</span>
    </button>`;
  }).join("");

  document.querySelectorAll("[data-cycle-role-reflection]").forEach(button => button.addEventListener("click", () => {
    const roleName = button.dataset.cycleRoleReflection;
    const current = currentData.roleReflections?.[roleName] || "";
    const next = ROLE_REFLECTION_ORDER[(ROLE_REFLECTION_ORDER.indexOf(current) + 1) % ROLE_REFLECTION_ORDER.length];
    currentData.roleReflections[roleName] = next;
    saveReview(true);
    renderResponsibilityReflection();
  }));

  const score = responsibilityScore();
  const assessment = responsibilityLabel(score);
  const badge = $("responsibilityScoreBadge");
  badge.className = `responsibility-score-badge tone-${assessment.tone}`;
  badge.textContent = score === null ? assessment.label : `${score} · ${assessment.label}`;
  const framework = frameworkForCheckin(latestStateCheckin());
  const context = framework ? `Dein letzter Zustand lag im Rahmen „${framework.label}“. ` : "";
  $("responsibilityGuidance").className = `responsibility-guidance tone-${assessment.tone}`;
  $("responsibilityGuidance").innerHTML = `<strong>${escapeHTML(assessment.label)}</strong><p>${escapeHTML(context + assessment.text)}</p>`;
}

function applyRolePickerStyle() {
  const role = getRole($("dayRole").value || currentData?.role);
  const picker = $("dayRole");
  picker.style.setProperty("--role-color", role.color);
  picker.style.setProperty("--role-soft", hexToRgba(role.color, .18));
  picker.style.setProperty("--role-text", role.text);
  applyHeaderTheme(role);
}

function applyHeaderTheme(role = getRole($("dayRole")?.value || currentData?.role || ROLES[0].name)) {
  const header = $("appHeader");
  if (!header) return;
  header.style.setProperty("--header-role", role.color);
  header.style.setProperty("--header-role-soft", hexToRgba(role.color, .88));
  header.style.setProperty("--header-role-fade", hexToRgba(role.color, .16));
  header.style.setProperty("--header-role-text", role.text);
}

function statusCircle(icon, variant = "neutral", size = "medium") {
  return `<span class="status-circle ${variant} ${size}">${icon}</span>`;
}

function prayerStateMeta(value) {
  return PRAYER_STATES.find(option => option.value === value) || PRAYER_STATES[0];
}

function prayerStateIconHTML(value, size = "medium") {
  const meta = prayerStateMeta(value);
  if (value === "") return statusCircle("", "neutral", size);
  if (value === "Normal") return statusCircle("✓", "gradient", size);
  if (value === "Nicht gebetet") return statusCircle("✕", "missed", size);
  return `<span class="status-emoji ${size}">${meta.icon}</span>`;
}

function routineStateButtonHTML(value) {
  const labels = {
    "": "Offen",
    done: "Erledigt",
    adapted: "Angepasst",
    missed: "Nicht erledigt"
  };
  return `${routineStateIconHTML(value, "small")}<strong class="routine-state-button-label">${labels[value] || "Offen"}</strong>`;
}

function routineStateIconHTML(value, size = "small") {
  if (value === "done") return statusCircle("✓", "gradient", size);
  if (value === "adapted") return statusCircle("≈", "adapted", size);
  if (value === "missed") return statusCircle("✕", "missed", size);
  return statusCircle("–", "neutral", size);
}

function renderWaterControl() {
  const waterMl = Number(currentData?.water || 0);
  if ($("water")) $("water").value = String(waterMl);
  if ($("waterTotalDisplay")) $("waterTotalDisplay").textContent = `${(waterMl / 1000).toFixed(1).replace(".", ",")} Liter`;
  if ($("waterDroplets")) {
    const count = Math.max(1, Math.min(8, Math.round(waterMl / 500) || 1));
    const filled = Math.min(8, Math.round(waterMl / 500));
    $("waterDroplets").innerHTML = Array.from({length: count}, (_, index) => `<button type="button" class="water-drop ${index < filled ? 'filled' : ''}" data-water-direct="${(index + 1) * 500}" aria-label="${(index + 1) * 0.5} Liter">💧</button>`).join("");
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
    const label = state === "done" ? "Erledigt" : state === "adapted" ? "Angepasst" : state === "missed" ? "Nicht erledigt" : "Offen";
    button.dataset.state = state;
    button.classList.toggle("is-done", state === "done");
    button.classList.toggle("is-adapted", state === "adapted");
    button.classList.toggle("is-missed", state === "missed");
    button.innerHTML = `${routineStateIconHTML(state, "small")}<span>${label}</span>`;
    button.setAttribute("aria-label", `${key === "morning" ? "Morgenroutine" : "Abendroutine"}: ${label}. Antippen zum Ändern.`);
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
    return `<div class="prayer-card prayer-card-compact" data-state="${escapeHTML(state)}">
      <strong>${escapeHTML(prayer)}</strong>
      <button type="button" class="prayer-state-button" data-open-prayer="${escapeHTML(prayer)}" aria-label="Status ${escapeHTML(prayer)}: ${escapeHTML(meta.label)}">
        ${prayerStateIconHTML(state, "medium")}
      </button>
      <small>${escapeHTML(meta.short)}</small>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-open-prayer]").forEach(button => button.addEventListener("click", () => openPrayerDialog(button.dataset.openPrayer)));
}

function openPrayerDialog(prayer) {
  $("prayerDialogTitle").textContent = prayer;
  $("prayerDialog").dataset.prayer = prayer;
  const current = currentData.prayers?.[prayer] || "";
  $("prayerStateOptions").innerHTML = PRAYER_STATES.map(option => `
    <button type="button" class="prayer-option ${current === option.value ? "active" : ""}" data-prayer-option="${escapeHTML(option.value)}">
      ${prayerStateIconHTML(option.value, "medium")}
      <strong>${escapeHTML(option.label)}</strong>
    </button>`).join("");
  document.querySelectorAll("[data-prayer-option]").forEach(button => button.addEventListener("click", () => {
    const prayerName = $("prayerDialog").dataset.prayer;
    currentData.prayers[prayerName] = button.dataset.prayerOption;
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
    const state = currentData.streaks?.[streak.key] || { days: 0, broken: false };
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
      const existing = raw.streaks[streak.key];
      const brokenHere = Boolean(existing?.broken || existing?.status === "broken");
      const next = brokenHere ? { days: 0, broken: true } : { days: running[streak.key].broken ? 0 : running[streak.key].days + 1, broken: false };
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
  button.textContent = currentData?.fastingCompleted ? "Fastentag geschafft ✓" : "Fastentag geschafft";
}

function updateSleepLabel() {
  const rawValue = Number($("sleepQuality")?.value ?? 3);
  const label = rawValue === 3 ? "–" : (SLEEP_LABELS[rawValue] || "–");
  if ($("sleepQualityLabel")) $("sleepQualityLabel").textContent = label;
  if ($("sleepMeterPill")) $("sleepMeterPill").textContent = label;
  if ($("sleepMeterFill")) {
    const progress = rawValue === 3 ? 0 : (rawValue / 6) * 100;
    $("sleepMeterFill").style.width = `${progress}%`;
    $("sleepMeterFill").style.background = rawValue === 3 ? '#dfe5ef' : 'linear-gradient(90deg,#38d4c3,#53d38f,#c6de5f,#f7b54a,#f47c5f,#df4050)';
  }
}

function renderActivities() {
  const list = $("activityList");
  list.innerHTML = (currentData.activities || []).map((activity, index) => {
    const role = getRole(activity.role);
    return `<div class="activity-row legacy-activity" draggable="true" data-activity-index="${index}" style="--activity-color:${role.color}">
      <div class="activity-main">
        <div class="activity-copy">
          <strong>${escapeHTML(activity.title)}</strong>
          <small>${escapeHTML(role.name)}</small>
        </div>
      </div>
      <div class="activity-actions compact with-arrows">
        <button type="button" class="move-button" data-move-activity="up" data-activity-control="${index}" aria-label="Nach oben">↑</button>
        <button type="button" class="move-button" data-move-activity="down" data-activity-control="${index}" aria-label="Nach unten">↓</button>
        <button type="button" class="delete-button" data-delete-activity="${index}" aria-label="Löschen">×</button>
      </div>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-delete-activity]").forEach(button => button.addEventListener("click", () => {
    currentData.activities.splice(Number(button.dataset.deleteActivity), 1);
    saveReview(true); renderActivities();
  }));
  document.querySelectorAll("[data-activity-control]").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.activityControl);
    const direction = button.dataset.moveActivity;
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= currentData.activities.length) return;
    [currentData.activities[index], currentData.activities[swapIndex]] = [currentData.activities[swapIndex], currentData.activities[index]];
    saveReview(true); renderActivities();
  }));
  document.querySelectorAll("[data-activity-index]").forEach(row => {
    row.addEventListener("dragstart", () => { activityDragIndex = Number(row.dataset.activityIndex); row.classList.add("dragging"); });
    row.addEventListener("dragend", () => { activityDragIndex = null; row.classList.remove("dragging"); });
    row.addEventListener("dragover", event => event.preventDefault());
    row.addEventListener("drop", event => {
      event.preventDefault();
      const targetIndex = Number(row.dataset.activityIndex);
      if (activityDragIndex === null || activityDragIndex === targetIndex) return;
      const [item] = currentData.activities.splice(activityDragIndex, 1);
      currentData.activities.splice(targetIndex, 0, item);
      saveReview(true); renderActivities();
    });
  });
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
    const state = currentData.streaks?.[streak.key] || { days: 0, broken: false };
    const isActive = !state.broken && Number(state.days || 0) > 0;
    return `<div class="streak-card ${state.broken ? "streak-broken" : ""} ${isActive ? "streak-active" : ""}">
      <div class="streak-card-head">
        <strong>${escapeHTML(streak.label)}</strong>
        <span class="streak-status">${state.broken ? "Unterbrochen" : isActive ? "Aktiv" : "Offen"}</span>
      </div>
      <div class="streak-input-wrap">
        <input class="streak-days-large" type="number" min="0" inputmode="numeric" data-streak-days="${streak.key}" value="${Number(state.days || 0)}" aria-label="${escapeHTML(streak.label)} Tage">
        <span class="streak-unit">Tage</span>
      </div>
      <button type="button" class="break-button-large ${state.broken ? "active" : ""}" data-break-streak="${streak.key}">${state.broken ? "Unterbrechung eingetragen" : "Streak unterbrechen"}</button>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-streak-days]").forEach(input => input.addEventListener("change", () => {
    const state = currentData.streaks[input.dataset.streakDays];
    state.days = Math.max(0, Number(input.value || 0));
    state.broken = false;
    saveReview(true); propagateStreaksForward(selectedDate); renderStreaks();
  }));
  document.querySelectorAll("[data-break-streak]").forEach(button => button.addEventListener("click", () => {
    const state = currentData.streaks[button.dataset.breakStreak];
    state.days = 0; state.broken = true;
    saveReview(true); propagateStreaksForward(selectedDate); renderStreaks();
  }));
}

function weekDates(reference = selectedDate) {
  const base = new Date(`${reference}T12:00:00`);
  const day = (base.getDay() + 6) % 7;
  const monday = new Date(base);
  monday.setDate(base.getDate() - day);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return dateToISO(date);
  });
}

function prayerStatePoints(state) {
  const points = {
    "Gemeinschaft": 22,
    "Normal": 20,
    "Verspätet": 15,
    "Nachgeholt": 8,
    "Nicht gebetet": 0
  };
  return Object.prototype.hasOwnProperty.call(points, state) ? points[state] : null;
}

function prayerStateWeight(state) {
  const points = prayerStatePoints(state);
  return points === null ? 0 : points / 20;
}

function buildWeeklyTrendChart(labels, currentValues, previousValues, options = {}) {
  const title = options.title || "Verantwortungsbalance";
  const subtitle = options.subtitle || "Aktuelle Woche im Vergleich zur Vorwoche";
  const target = Number.isFinite(options.target) ? options.target : null;
  const maxValue = Number.isFinite(options.maxValue) ? options.maxValue : 100;
  const todayIndex = Number.isInteger(options.todayIndex) ? options.todayIndex : -1;
  const width = 420;
  const height = 224;
  const padX = 35;
  const padTop = 18;
  const padBottom = 34;
  const chartW = width - padX * 2;
  const chartH = height - padTop - padBottom;
  const xFor = index => labels.length <= 1 ? padX + chartW / 2 : padX + (index / (labels.length - 1)) * chartW;
  const yFor = value => padTop + chartH - (clamp(Number(value || 0), 0, maxValue) / maxValue) * chartH;

  const smoothPathFor = values => {
    const segments = [];
    let current = [];
    values.forEach((value, index) => {
      if (value === null || value === undefined) {
        if (current.length) segments.push(current);
        current = [];
      } else {
        current.push({ x: xFor(index), y: yFor(value) });
      }
    });
    if (current.length) segments.push(current);
    return segments.map(points => {
      if (points.length === 1) return `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      let path = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const point = points[index];
        const midpoint = (previous.x + point.x) / 2;
        path += ` C${midpoint.toFixed(1)} ${previous.y.toFixed(1)}, ${midpoint.toFixed(1)} ${point.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      }
      return path;
    }).join(" ");
  };

  const dots = (values, cssClass) => values.map((value, index) => value === null || value === undefined ? "" : `<circle class="${cssClass} ${index === todayIndex ? 'today' : ''}" cx="${xFor(index)}" cy="${yFor(value)}" r="${index === todayIndex ? 5.5 : 4.3}"></circle>`).join("");
  const ticks = [0, 20, 40, 60, 80, 100].filter(value => value <= maxValue);
  if (maxValue > 100) ticks.push(maxValue);
  const grid = ticks.map(value => `<g><line x1="${padX}" y1="${yFor(value)}" x2="${width-padX}" y2="${yFor(value)}"></line><text x="${padX-7}" y="${yFor(value)+4}" text-anchor="end">${value}%</text></g>`).join("");
  const xLabels = labels.map((label, index) => `<text class="${index === todayIndex ? 'today' : ''}" x="${xFor(index)}" y="${height-9}" text-anchor="middle">${escapeHTML(label)}</text>`).join("");
  const targetLine = target === null ? "" : `<line class="trend-target-line" x1="${padX}" y1="${yFor(target)}" x2="${width-padX}" y2="${yFor(target)}"></line><text class="trend-target-label" x="${padX+4}" y="${yFor(target)-7}" text-anchor="start">Ziel ${target}%</text>`;
  const todayBandWidth = labels.length > 1 ? chartW / (labels.length - 1) * 0.64 : 40;
  const todayBand = todayIndex < 0 ? "" : `<rect class="trend-today-band" x="${xFor(todayIndex) - todayBandWidth/2}" y="${padTop}" width="${todayBandWidth}" height="${chartH}" rx="10"></rect>`;

  return `<div class="trend-panel top-priority-panel">
    <div class="trend-panel-head"><div><h3>${escapeHTML(title)}</h3><small>${escapeHTML(subtitle)}</small></div><div class="trend-legend"><span class="current">Diese Woche</span><span class="previous">Vorwoche</span>${target === null ? "" : '<span class="target">Zielgrenze</span>'}</div></div>
    <div class="trend-chart-scroll"><svg class="trend-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Verlauf der ${escapeHTML(title)}">
      ${todayBand}
      <g class="trend-grid">${grid}</g>
      ${targetLine}
      <path class="trend-line previous" d="${smoothPathFor(previousValues)}"></path>
      <path class="trend-line current" d="${smoothPathFor(currentValues)}"></path>
      <g class="trend-dots">${dots(previousValues, "previous")}${dots(currentValues, "current")}</g>
      <g class="trend-x-labels">${xLabels}</g>
    </svg></div>
  </div>`;
}

function renderStats() {
  if (!currentData) return;
  const dates = weekDates();
  const selectedIndex = Math.max(0, dates.indexOf(selectedDate));
  const visibleDates = dates.slice(0, selectedIndex + 1);
  const reviews = visibleDates.map(date => ({ date, data: loadReview(date), stored: Boolean(localStorage.getItem(storageKey(date))) }));
  const previousReviews = visibleDates.map(date => {
    const previousDate = addDays(date, -7);
    return { date: previousDate, data: loadReview(previousDate), stored: Boolean(localStorage.getItem(storageKey(previousDate))) };
  });

  const scoredReviews = reviews.map(item => ({ ...item, score: responsibilityScore(item.data) })).filter(item => item.score !== null);
  const previousScored = previousReviews.map(item => ({ ...item, score: responsibilityScore(item.data) })).filter(item => item.score !== null);
  const responsibilityAverage = scoredReviews.length ? Math.round(scoredReviews.reduce((sum, item) => sum + item.score, 0) / scoredReviews.length) : null;
  const previousAverage = previousScored.length ? Math.round(previousScored.reduce((sum, item) => sum + item.score, 0) / previousScored.length) : null;
  const scoreDelta = responsibilityAverage === null || previousAverage === null ? null : responsibilityAverage - previousAverage;

  const latestStates = reviews.map(item => ({ ...item, checkin: latestStateCheckin(item.data) })).filter(item => item.checkin);
  const capacityValues = latestStates.map(item => stateCapacity(item.checkin));
  const averageCapacity = capacityValues.length ? Math.round(capacityValues.reduce((sum, value) => sum + value, 0) / capacityValues.length) : null;
  const frameworkCounts = {};
  latestStates.forEach(item => {
    const label = frameworkForCheckin(item.checkin)?.label;
    if (label) frameworkCounts[label] = (frameworkCounts[label] || 0) + 1;
  });
  const commonFramework = Object.entries(frameworkCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "–";

  const totalCheckins = reviews.reduce((sum, item) => sum + (item.data.stateCheckins?.length || 0), 0);
  const boundaryAnswers = reviews.map(item => item.data.responsibility?.boundaryRespect).filter(value => [0, 1, 2].includes(Number(value))).map(Number);
  const amanahAnswers = reviews.map(item => item.data.responsibility?.amanahCare).filter(value => [0, 1, 2].includes(Number(value))).map(Number);
  const boundaryYes = boundaryAnswers.filter(value => value === 2).length;
  const amanahYes = amanahAnswers.filter(value => value === 2).length;
  const overextendedRoles = reviews.reduce((sum, item) => sum + ROLES.filter(role => item.data.roleReflections?.[role.name] === "overextended").length, 0);
  const responsibleRoles = reviews.reduce((sum, item) => sum + ROLES.filter(role => item.data.roleReflections?.[role.name] === "responsible").length, 0);

  const prayerCount = reviews.reduce((sum, item) => sum + PRAYERS.filter(prayer => prayerStateWeight(item.data.prayers?.[prayer] || "") > 0).length, 0);
  const prayerTarget = Math.max(1, reviews.length * 5);
  const mosqueCount = reviews.reduce((sum, item) => sum + PRAYERS.filter(prayer => item.data.prayers?.[prayer] === "Gemeinschaft").length, 0);
  const routineDone = reviews.reduce((sum, item) => sum + [item.data.morningRoutineState, item.data.eveningRoutineState].filter(state => state === "done").length, 0);
  const routineAdapted = reviews.reduce((sum, item) => sum + [item.data.morningRoutineState, item.data.eveningRoutineState].filter(state => state === "adapted").length, 0);
  const routineTarget = Math.max(1, reviews.length * 2);
  const totalWaterMl = reviews.reduce((sum, item) => sum + Number(item.data.water || 0), 0);
  const totalSteps = reviews.reduce((sum, item) => sum + Number(item.data.steps || 0), 0);
  const averageWater = totalWaterMl / Math.max(1, reviews.length) / 1000;
  const averageSteps = Math.round(totalSteps / Math.max(1, reviews.length));

  const moodCounts = {};
  reviews.forEach(item => { if (item.data.mood) moodCounts[item.data.mood] = (moodCounts[item.data.mood] || 0) + 1; });
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "–";

  const currentScores = dates.map(date => date <= selectedDate ? responsibilityScore(loadReview(date)) : null);
  const previousScores = dates.map(date => {
    const previousDate = addDays(date, -7);
    return localStorage.getItem(storageKey(previousDate)) ? responsibilityScore(loadReview(previousDate)) : null;
  });
  const labels = dates.map(date => new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${date}T12:00:00`)).replace(".", ""));
  const deltaText = scoreDelta === null ? "Noch keine Vergleichsbasis" : `${scoreDelta >= 0 ? "+" : ""}${scoreDelta} Punkte zur Vorwoche`;

  $("weekLabel").textContent = `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`;
  $("statsGrid").innerHTML = `
    ${buildWeeklyTrendChart(labels, currentScores, previousScores, { title: "Verantwortungsbalance", subtitle: "Selbsteinschätzung aus Zustand, Grenzen, Amānah und Rollentreue – keine Leistungsquote", target: null, maxValue: 100, todayIndex: dates.indexOf(todayISO()) })}
    <div class="stats-metrics colorful-metrics">
      ${statTile(responsibilityAverage === null ? "–" : String(responsibilityAverage), "Verantwortungsbalance")}
      ${statTile(scoreDelta === null ? "–" : `${scoreDelta >= 0 ? "+" : ""}${scoreDelta}`, "Pkt. zur Vorwoche")}
      ${statTile(averageCapacity === null ? "–" : String(averageCapacity), "Ø Handlungsspielraum")}
      ${statTile(String(totalCheckins), "Zustands-Check-ins")}
      ${statTile(`${boundaryYes}/${boundaryAnswers.length || 0}`, "Grenzen geachtet")}
      ${statTile(`${amanahYes}/${amanahAnswers.length || 0}`, "Amānah gewahrt")}
      ${statTile(String(routineAdapted), "Routinen angepasst")}
      ${statTile(String(responsibleRoles), "Rollen stimmig gelebt")}
    </div>
    <div class="insight-grid compact-insights">
      <div class="insight-card"><span class="insight-label">Häufigster Rahmen</span><strong>${escapeHTML(commonFramework)}</strong><small>${latestStates.length}/${reviews.length} Tage mit Zustandsdaten</small></div>
      <div class="insight-card"><span class="insight-label">Soll-Spannung erkannt</span><strong>${overextendedRoles}</strong><small>Rollen als überfordernd reflektiert</small></div>
      <div class="insight-card"><span class="insight-label">Häufigste Emotion</span><strong>${escapeHTML(topMood)}</strong><small>${escapeHTML(deltaText)}</small></div>
    </div>
    <div class="weekly-visual-grid adaptive-week-grid">
      <div class="visual-panel">
        <h3>Zustandswoche</h3>
        ${reviews.map(item => {
          const checkin = latestStateCheckin(item.data);
          const framework = frameworkForCheckin(checkin);
          const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
          return `<div class="mini-track-row"><span>${day}</span><div class="mini-track state-track"><i style="width:${framework?.capacity || 0}%;--track-color:${framework?.color || '#D9DEE9'}"></i></div><strong>${framework ? framework.capacity : "–"}</strong></div>`;
        }).join("")}
      </div>
      <div class="visual-panel">
        <h3>Verantwortungswoche</h3>
        ${reviews.map(item => {
          const score = responsibilityScore(item.data);
          const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
          return `<div class="mini-track-row"><span>${day}</span><div class="mini-track responsibility-track"><i style="width:${score ?? 0}%"></i></div><strong>${score ?? "–"}</strong></div>`;
        }).join("")}
      </div>
      <div class="visual-panel">
        <h3>Gebete dokumentiert</h3>
        ${reviews.map(item => {
          const prayed = PRAYERS.filter(prayer => prayerStateWeight(item.data.prayers?.[prayer] || "") > 0).length;
          const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
          return `<div class="mini-track-row"><span>${day}</span><div class="mini-track"><i style="width:${(prayed / 5) * 100}%"></i></div><strong>${prayed}/5</strong></div>`;
        }).join("")}
      </div>
      <div class="visual-panel overview-panel">
        <h3>Fakten, nicht Urteil</h3>
        <div class="summary-pair"><span>Routinen vollständig</span><strong>${routineDone}/${routineTarget}</strong></div>
        <div class="summary-pair"><span>Routinen angepasst</span><strong>${routineAdapted}</strong></div>
        <div class="summary-pair"><span>Gebete erfasst</span><strong>${prayerCount}/${prayerTarget}</strong></div>
        <div class="summary-pair"><span>Gemeinschaftsgebete</span><strong>${mosqueCount}</strong></div>
        <div class="summary-pair"><span>Wasser / Tag</span><strong>${averageWater.toFixed(1).replace(".", ",")} L</strong></div>
        <div class="summary-pair"><span>Schritte / Tag</span><strong>${averageSteps.toLocaleString("de-DE")}</strong></div>
      </div>
    </div>`;
}

function responsibilityAnswerLabel(value) {
  return Number(value) === 2 ? "Ja" : Number(value) === 1 ? "Teilweise" : Number(value) === 0 ? "Nein" : "-";
}

function statTile(value, label) {
  return `<div class="stat-tile"><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></div>`;
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
    schemaVersion: 4,
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
  const headers = ["Datum", "Rolle", "Frühstück", "Mittagessen", "Abendessen", "Snack", "Wasser_ml", "Schritte", "Morgenroutine", "Abendroutine", ...PRAYERS, "Ramadan_Tage", "Fastentag", "Schlafqualität", "Träume", "Emotion", "Dankbarkeit", "Name_Allahs", "Zustands_Checkins", "Letzter_Verantwortungsrahmen", "Letzter_Handlungsrahmen", "Zustand_ehrlich", "Grenzen_respektiert", "Amanah_gewahrt", "Rollentreue", "Verantwortungsbalance", "Rollenreflexion", "Verantwortungsvollster_Schritt", "Cannabis_Tage", "Begierde_Tage", "Alkohol_Tage", "Rauchfrei_Tage", "Aktivitäten", "Notizen"];
  const lines = [headers.map(csvEscape).join(";")];
  getAllReviews().forEach(({ date, data }) => {
    const activities = (data.activities || []).map(activity => `${activity.title} | ${activity.role}`).join(" / ");
    const latest = latestStateCheckin(data);
    const framework = frameworkForCheckin(latest);
    const responsibilityValues = RESPONSIBILITY_KEYS.map(key => data.responsibility?.[key] === null || data.responsibility?.[key] === undefined ? "" : data.responsibility[key]);
    const roleReflection = ROLES.map(role => `${role.name}: ${ROLE_REFLECTION_META[data.roleReflections?.[role.name] || ""].short}`).join(" / ");
    const row = [date, data.role, data.breakfast, data.lunch, data.dinner, data.snack, data.water, data.steps, data.morningRoutineState, data.eveningRoutineState, ...PRAYERS.map(prayer => data.prayers?.[prayer] || ""), data.ramadanDays, data.fastingCompleted ? "Ja" : "Nein", data.sleepQualityScore, data.dreams, data.mood, data.gratitude1, data.allahName, data.stateCheckins?.length || 0, framework?.label || "", framework?.capacity ?? "", ...responsibilityValues, responsibilityScore(data) ?? "", roleReflection, data.responsibilityNote || "", ...STREAKS.map(streak => Number(data.streaks?.[streak.key]?.days || 0)), activities, data.notes];
    lines.push(row.map(csvEscape).join(";"));
  });
  downloadTextFile(`roleplay-export-${todayISO()}.csv`, `\ufeff${lines.join("\r\n")}`, "text/csv;charset=utf-8");
  $("backupStatus").textContent = "CSV-Export wurde erstellt.";
}

function exportWeeklyPdf() {
  saveReview(true);
  const dates = weekDates();
  const reviews = dates.map(date => ({ date, data: loadReview(date) }));
  const pdfBytes = buildWeeklyPdf(reviews);
  downloadBlob(`roleplay-wochenplan-${dates[0]}-${dates[6]}.pdf`, new Blob([pdfBytes], { type: "application/pdf" }));
  $("backupStatus").textContent = `PDF-Wochenplan ${formatShortDate(dates[0])} – ${formatShortDate(dates[6])} erstellt.`;
}

function buildWeeklyPdf(reviews) {
  const W = 1260, H = 842;
  const margin = 10, gap = 5;
  const commands = [];
  const rect = (x, top, width, height, hex) => pdfFillRect(commands, x, H - top - height, width, height, hex);
  const stroke = (x, top, width, height, hex, lw = 0.7) => pdfStrokeRect(commands, x, H - top - height, width, height, hex, lw);
  const textAt = (value, x, top, size, bold, hex) => pdfText(commands, value, x, H - top - size, size, bold, hex);
  const line = (x1, top1, x2, top2, hex, lw = 0.6) => pdfStrokeLine(commands, x1, H - top1, x2, H - top2, hex, lw);
  const weekdayLabel = date => new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(new Date(`${date}T12:00:00`));

  pdfFillRect(commands, 0, 0, W, H, "FFFFFF");
  textAt("ROLEPLAY", margin, 8, 7.2, true, "758093");
  textAt("Wochenplan", margin, 19, 16, true, "17181C");
  textAt(`${formatLongDate(reviews[0].date)} - ${formatLongDate(reviews[6].date)}`, margin + 126, 22, 7.4, false, "6B7382");

  const cardsTop = 42;
  const cardW = (W - margin * 2 - gap * 6) / 7;
  const cardH = H - cardsTop - 8;

  reviews.forEach((item, index) => {
    const role = getRole(item.data.role);
    const data = item.data;
    const latestState = latestStateCheckin(data);
    const framework = frameworkForCheckin(latestState);
    const responsibilityValue = responsibilityScore(data);
    const x = margin + index * (cardW + gap);
    const headerH = 40;
    const bodyPad = 5;
    const sectionGap = 4;
    const innerX = x + bodyPad;
    const innerW = cardW - bodyPad * 2;

    rect(x, cardsTop, cardW, cardH, "FFFFFF");
    stroke(x, cardsTop, cardW, cardH, "DCE2EC", 0.8);
    rect(x, cardsTop, cardW, headerH, role.color.replace('#',''));
    textAt(role.name, x + 7, cardsTop + 5, 8, true, pdfContrast(role.color));
    textAt(weekdayLabel(item.date), x + 7, cardsTop + 16, 6.2, true, pdfContrast(role.color));
    textAt(formatLongDate(item.date), x + 7, cardsTop + 27, 5.4, false, pdfContrast(role.color));

    let cursorTop = cardsTop + headerH + 5;
    const routineLabel = state => state === "done" ? "Erledigt" : state === "adapted" ? "Angepasst" : state === "missed" ? "Nicht erledigt" : "Offen";
    const prayerLine = name => {
      const state = data.prayers?.[name] || "";
      return `${name.replace("ʿ", "")}: ${prayerStateMeta(state).short}`;
    };
    const meal = (label, value) => `${label}: ${value || "-"}`;
    const compactWrap = value => pdfWrapText(value || "-", 31, 5);
    const noteLines = pdfWrapText(data.notes || "-", 31, 55);
    const reflexionLines = [
      ...compactWrap(`Gefühl: ${data.mood || '-'}`),
      ...compactWrap(`Träume: ${data.dreams || '-'}`),
      ...compactWrap(`Dankbar: ${[data.gratitude1, data.gratitude2].filter(Boolean).join(' / ') || '-'}`),
      ...compactWrap(`Allah: ${latinAllahName(data.allahName) || '-'}`),
      ...noteLines.map((value, noteIndex) => `${noteIndex === 0 ? 'Notiz: ' : ''}${value}`)
    ];
    const activityLines = (data.activities || []).length
      ? (data.activities || []).slice(0, 18).flatMap(entry => pdfWrapText(`- ${entry.title}`, 31, 3))
      : ["- Keine Aktivitäten"];
    const streakLines = STREAKS.map(streak => `${streak.label.replace("frei", "")}: ${Number(data.streaks?.[streak.key]?.days || 0)}`);
    const stateLines = latestState && framework ? [
      `Rahmen: ${framework.label} (${framework.capacity})`,
      `Zeit: ${latestState.time} Uhr`,
      `Energie: ${latestState.energy}%`,
      `Körper: ${STATE_BODY_OPTIONS[latestState.body]?.label || '-'}`,
      `Geist: ${STATE_MIND_OPTIONS[latestState.mind]?.label || '-'}`,
      `Emotion: ${latestState.emotion || '-'}`
    ] : ["Noch kein Zustands-Check-in"];
    const responsibilityLines = [
      `Balance: ${responsibilityValue === null ? '-' : responsibilityValue}`,
      `Zustand ehrlich: ${responsibilityAnswerLabel(data.responsibility?.stateHonesty)}`,
      `Grenzen: ${responsibilityAnswerLabel(data.responsibility?.boundaryRespect)}`,
      `Amanah: ${responsibilityAnswerLabel(data.responsibility?.amanahCare)}`,
      `Rollentreue: ${responsibilityAnswerLabel(data.responsibility?.roleFidelity)}`,
      `Schritt: ${data.responsibilityNote || '-'}`
    ];

    const sections = [
      {
        title: "Vitalität",
        lines: [
          meal("Frühstück", data.breakfast),
          meal("Mittag", data.lunch),
          meal("Abend", data.dinner),
          meal("Snack", data.snack),
          `Getrunken: ${(Number(data.water || 0) / 1000).toFixed(1).replace('.', ',')} L`,
          `Schritte: ${data.steps ? Number(data.steps).toLocaleString('de-DE') : '-'}`
        ],
        height: 62
      },
      {
        title: "Zustand",
        lines: stateLines,
        height: 68
      },
      {
        title: "Routinen",
        lines: [
          `Morgen: ${routineLabel(data.morningRoutineState)}`,
          `Abend: ${routineLabel(data.eveningRoutineState)}`,
          `Schlaf: ${data.sleepQualityScore === '' || data.sleepQualityScore === undefined ? '-' : (SLEEP_LABELS[Number(data.sleepQualityScore)] || '-')}`,
          `Fasten: ${data.fastingCompleted ? 'Geschafft' : `${Number(data.ramadanDays || 0)} offen`}`
        ],
        height: 46
      },
      {
        title: "Gebete",
        lines: PRAYERS.map(prayerLine),
        height: 54
      },
      {
        title: "Verantwortung",
        lines: responsibilityLines,
        height: 80
      },
      {
        title: "Reflexion",
        lines: reflexionLines,
        height: 235,
        lineHeight: 7.45,
        fontSize: 6.25,
        fitChars: 31,
        padX: 4,
        contentTop: 18
      },
      {
        title: "Aktivitäten",
        lines: activityLines,
        height: 95,
        lineHeight: 7.45,
        fontSize: 6.25,
        fitChars: 31,
        padX: 4,
        contentTop: 18
      },
      {
        title: "Streaks",
        lines: streakLines,
        height: 45
      }
    ];

    sections.forEach(section => {
      rect(innerX, cursorTop, innerW, section.height, "F7F8FB");
      stroke(innerX, cursorTop, innerW, section.height, "E5E9F0", 0.55);
      const padX = section.padX ?? 4;
      const contentTop = section.contentTop ?? 18;
      const lineHeight = section.lineHeight ?? 7.45;
      const fontSize = section.fontSize ?? 6.25;
      const fitChars = section.fitChars ?? 31;
      textAt(section.title, innerX + padX, cursorTop + 5, fontSize, true, "1E2330");
      line(innerX + padX, cursorTop + 14.5, innerX + innerW - padX, cursorTop + 14.5, "EDF1F6", 0.35);
      let lineTop = cursorTop + contentTop;
      const maxLines = Math.floor((section.height - (contentTop + 3)) / lineHeight);
      const renderedLines = section.lines.flatMap(lineText => pdfWrapText(lineText, fitChars, 8));
      renderedLines.slice(0, maxLines).forEach(lineText => {
        textAt(pdfFit(lineText, fitChars), innerX + padX, lineTop, fontSize, false, "404757");
        lineTop += lineHeight;
      });
      cursorTop += section.height + sectionGap;
    });
  });

  return assemblePdf(commands.join("\n"), W, H);
}
function pdfWrapText(value, maxChars = 24, maxLines = 3) {
  const clean = pdfPlainText(value).replace(/\s+/g, ' ').trim();
  if (!clean) return ["-"];
  const words = clean.split(' ');
  const lines = [];
  let current = '';
  words.forEach(word => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) current = candidate;
    else {
      if (current) lines.push(current);
      current = word;
    }
  });
  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;
  const trimmed = lines.slice(0, maxLines);
  trimmed[maxLines - 1] = pdfFit(trimmed[maxLines - 1], Math.max(8, maxChars - 1));
  return trimmed;
}

function pdfPlainText(value) {
  return String(value ?? "")
    .replace(/[–—]/g, "-")
    .replace(/[ʿ‘’]/g, "'")
    .replace(/[āĀ]/g, "a")
    .replace(/[īĪ]/g, "i")
    .replace(/[ūŪ]/g, "u")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "");
}

function weeklyPdfRows(reviews) {
  const value = getter => reviews.map(item => getter(item.data));
  const meals = data => [data.breakfast, data.lunch, data.dinner, data.snack].filter(Boolean).join(" / ") || "-";
  const routineState = state => state === "done" ? "✓" : state === "adapted" ? "≈" : state === "missed" ? "×" : "○";
  const prayer = (data, name) => prayerStateMeta(data.prayers?.[name] || "").short;
  const activity = data => (data.activities || []).map(item => item.title).join(" / ") || "-";
  const streak = data => STREAKS.map(s => `${s.label}: ${Number(data.streaks?.[s.key]?.days || 0)}`).join(" · ");
  return [
    { label: "Rolle", values: value(data => data.role || "-"), maxChars: 16 },
    { label: "Mahlzeiten", values: value(meals), maxChars: 22, fontSize: 4.8 },
    { label: "Wasser", values: value(data => `${(Number(data.water || 0) / 1000).toFixed(1)} L`) },
    { label: "Schritte", values: value(data => Number(data.steps || 0).toLocaleString("de-DE")) },
    { label: "Schlaf", values: value(data => data.sleepQualityScore === "" || data.sleepQualityScore === undefined ? "-" : (SLEEP_LABELS[Number(data.sleepQualityScore)] || "-")) },
    { label: "Morgen", values: value(data => routineState(data.morningRoutineState)) },
    { label: "Abend", values: value(data => routineState(data.eveningRoutineState)) },
    { label: "Gebete", values: value(data => PRAYERS.map(name => `${name}: ${prayer(data, name)}`).join(" · ")), maxChars: 32, fontSize: 4.6 },
    { label: "Fasten", values: value(data => data.fastingCompleted ? `✓ (${Number(data.ramadanDays || 0)})` : `${Number(data.ramadanDays || 0)} offen`) },
    { label: "Zustand", values: value(data => { const framework = frameworkForCheckin(latestStateCheckin(data)); return framework ? `${framework.label} (${framework.capacity})` : "-"; }), maxChars: 18, fontSize: 4.8 },
    { label: "Verantwortung", values: value(data => responsibilityScore(data) ?? "-"), maxChars: 12 },
    { label: "Emotion", values: value(data => data.mood || "-") },
    { label: "Dankbarkeit", values: value(data => [data.gratitude1, data.gratitude2].filter(Boolean).join(" / ") || "-"), maxChars: 24, fontSize: 4.8 },
    { label: "Allah", values: value(data => latinAllahName(data.allahName) || "-"), maxChars: 14, fontSize: 4.8 },
    { label: "Aktivitäten", values: value(activity), maxChars: 24, fontSize: 4.8 },
    { label: "Streaks", values: value(streak), maxChars: 26, fontSize: 4.6 },
    { label: "Notiz", values: value(data => data.notes || "-"), maxChars: 24, fontSize: 4.8 }
  ];
}

function latinAllahName(value) {
  if (!value) return "";
  return value.includes("/") ? value.split("/").slice(1).join("/").trim() : value;
}

function pdfFit(value, maxChars) {
  const clean = pdfSafeText(value).replace(/\s+/g, " ").trim();
  return clean.length > maxChars ? `${clean.slice(0, Math.max(0, maxChars - 3))}...` : clean;
}

function pdfSafeText(value) {
  return String(value ?? "")
    .replace(/[–—]/g, "-")
    .replace(/[ʿ‘’]/g, "'")
    .replace(/[āĀ]/g, "a")
    .replace(/[īĪ]/g, "i")
    .replace(/[ūŪ]/g, "u")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function pdfFillRect(commands, x, y, width, height, hex) {
  const [r, g, b] = pdfRgb(hex);
  commands.push(`q ${r} ${g} ${b} rg ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re f Q`);
}
function pdfStrokeRect(commands, x, y, width, height, hex, lineWidth) {
  const [r, g, b] = pdfRgb(hex);
  commands.push(`q ${r} ${g} ${b} RG ${lineWidth} w ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re S Q`);
}
function pdfStrokeLine(commands, x1, y1, x2, y2, hex, lineWidth) {
  const [r, g, b] = pdfRgb(hex);
  commands.push(`q ${r} ${g} ${b} RG ${lineWidth} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S Q`);
}
function pdfText(commands, text, x, y, size, bold, hex) {
  const [r, g, b] = pdfRgb(hex);
  commands.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${pdfSafeText(text)}) Tj ET`);
}
function pdfRgb(hex) {
  const clean = hex.replace("#", "");
  return [0, 2, 4].map(index => (parseInt(clean.slice(index, index + 2), 16) / 255).toFixed(3));
}
function pdfContrast(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16), g = parseInt(clean.slice(2, 4), 16), b = parseInt(clean.slice(4, 6), 16);
  return ((r * 299 + g * 587 + b * 114) / 1000) > 155 ? "17202A" : "FFFFFF";
}

function assemblePdf(content, width, height) {
  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = "<< /Type /Pages /Kids [5 0 R] /Count 1 >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
  objects[5] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents 6 0 R >>`;
  objects[6] = `<< /Length ${binaryLength(content)} >>\nstream\n${content}\nendstream`;

  let pdf = "%PDF-1.4\n%âãÏÓ\n";
  const offsets = [0];
  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = binaryLength(pdf);
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
  }
  const xrefOffset = binaryLength(pdf);
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let index = 1; index < objects.length; index += 1) pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return binaryStringToUint8Array(pdf);
}

function binaryLength(text) { return text.length; }
function binaryStringToUint8Array(text) {
  const bytes = new Uint8Array(text.length);
  for (let index = 0; index < text.length; index += 1) bytes[index] = text.charCodeAt(index) & 0xFF;
  return bytes;
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
  const keys = Array.from(new Set([...Object.keys(defaults), ...Object.keys(incoming)]));
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
    return `<button type="button" class="routine-hero ${routine.theme}" data-open-routine="${key}">
      <span class="routine-thread" aria-hidden="true"></span>
      <div class="routine-hero-top simple">
        <div>
          <h2>${escapeHTML(routine.title)}</h2>
          <p>${escapeHTML(routine.description)}</p>
        </div>
      </div>
      <span class="routine-hero-play" data-start-routine="${key}" role="button" aria-label="${escapeHTML(routine.title)} starten" tabindex="0">▶</span>
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

  $('sessionRoutineItemList').innerHTML = routine.items.map((item, index) => {
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
        <span aria-hidden="true">${item.id === currentId ? '●' : '▶'}</span>
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
        const byId = new Map(routines[routineSession.key].items.map(item => [item.id, item]));
        routines[routineSession.key].items = order.map(id => byId.get(id)).filter(Boolean);
        routineSession.index = Math.max(0, routines[routineSession.key].items.findIndex(item => item.id === currentItemId));
        saveRoutines();
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
  const routine = routines[routineSession.key];
  const index = routine?.items.findIndex(item => item.id === itemId) ?? -1;
  if (index < 0) return;

  const item = routine.items[index];
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

function openRoutineItemDialog(itemId = null) {
  editingRoutineItemId = itemId;
  const item = itemId ? routines[activeRoutineKey].items.find(entry => entry.id === itemId) : null;
  $("routineItemDialogTitle").textContent = item ? "Schritt bearbeiten" : "Schritt hinzufügen";
  $("routineItemEmoji").value = item?.emoji || "✨";
  $("routineItemTitle").value = item?.title || "";
  $("routineItemMinutes").value = item?.minutes || 5;
  $("routineItemContext").value = item?.context || "";
  $("deleteRoutineItem").hidden = !item;
  $("routineItemDialog").showModal();
}

function saveRoutineItemFromForm(event) {
  event.preventDefault();
  const title = $("routineItemTitle").value.trim();
  if (!title) return;
  const item = {
    id: editingRoutineItemId || `${activeRoutineKey}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    emoji: $("routineItemEmoji").value.trim() || "✨",
    title,
    minutes: clamp(Number($("routineItemMinutes").value || 5), 1, 180),
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
  routineSession = { key, index, remaining, running: true, endAt: Date.now() + remaining * 1000, interval: null, contextOpen: true, expiredNotified: false };
  persistRoutineSession();
  $("routineSessionDialog").showModal();
  renderRoutineSession();
  startSessionInterval();
}

function currentSessionItem() {
  return routines[routineSession.key].items[routineSession.index];
}

function renderRoutineSession() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const routine = routines[routineSession.key];
  const item = currentSessionItem();
  if (!routine || !item) return;
  $("routineSessionDialog").dataset.theme = routine.theme || "focus";
  $("sessionRoutineName").textContent = routine.title;
  $("sessionProgress").textContent = `Schritt ${routineSession.index + 1} von ${routine.items.length}`;
  $("sessionItemTitle").textContent = item.title;
  $("sessionItemEmoji").textContent = item.emoji;
  $("sessionTimer").textContent = formatTimer(routineSession.remaining);
  $("sessionPause").textContent = routineSession.running ? "Ⅱ" : "▶";
  const contextToggle = $("sessionContextToggle");
  if (contextToggle) contextToggle.hidden = true;
  $("sessionContext").hidden = !item.context;
  $("sessionContext").innerHTML = item.context ? linkifyText(item.context) : "";
  const next = routine.items[routineSession.index + 1];
  $("sessionNext").textContent = next ? `Als Nächstes: ${next.title}` : "Letzter Schritt dieser Routine";
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
  if (pause) pause.textContent = routineSession.running ? "Ⅱ" : "▶";
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
  const item = currentSessionItem();
  currentData.routineProgress[key][item.id] = status;
  const nextIndex = routineSession.index + 1;
  if (nextIndex >= routine.items.length) {
    const allDone = routine.items.every(entry => currentData.routineProgress[key][entry.id] === "done");
    if (key === "morning") currentData.morningRoutineState = allDone ? "done" : "adapted";
    else if (key === "evening") currentData.eveningRoutineState = allDone ? "done" : "adapted";
    saveReview(true);
    closeRoutineSession();
    alert(allDone ? `${routine.title} abgeschlossen.` : `${routine.title} angepasst abgeschlossen. Übersprungene Schritte bleiben dokumentiert.`);
    return;
  }
  routineSession.index = nextIndex;
  routineSession.remaining = Math.round(routine.items[nextIndex].minutes * 60);
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

function initOptions() {
  $("dayRole").innerHTML = ROLES.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("activityRole").innerHTML = ROLES.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("mood").innerHTML = EMOTIONS.map(emotion => `<option value="${escapeHTML(emotion.value)}">${escapeHTML(emotion.label)}</option>`).join("");
  populateStateCheckinEmotion();
  $("allahName").innerHTML = `<option value="">Name Allahs auswählen …</option>${ALLAH_NAMES.map(name => `<option>${escapeHTML(name)}</option>`).join("")}`;
  $("emojiQuickPicks").innerHTML = QUICK_EMOJIS.map(emoji => `<button type="button" data-emoji="${escapeHTML(emoji)}">${escapeHTML(emoji)}</button>`).join("");
}

function createRoutineKey(title) {
  const base = title.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-+|-+$/g, "") || `routine-${Date.now()}`;
  let key = base, counter = 2;
  while (routines[key]) { key = `${base}-${counter++}`; }
  return key;
}

function openRoutineDialog() {
  $("routineTitle").value = "";
  $("routineDescription").value = "";
  $("routineTheme").value = "focus";
  $("routineDialog").showModal();
}

function saveRoutineFromForm(event) {
  event.preventDefault();
  const title = $("routineTitle").value.trim();
  if (!title) return;
  const key = createRoutineKey(title);
  routines[key] = {
    key,
    title,
    description: $("routineDescription").value.trim() || "Eigene Routine",
    theme: $("routineTheme").value || "focus",
    autoNext: false,
    items: []
  };
  saveRoutines();
  $("routineDialog").close();
  renderRoutineCards();
}

function resetAllStreaksOnce() {
  if (localStorage.getItem("roleplay-hard-reset-v25")) return;
  const keysToRemove = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (
      key?.startsWith("roleplay-review-") ||
      key?.startsWith("roleplay-routines") ||
      key?.startsWith("roleplay-v24") ||
      key?.startsWith(STORAGE_NAMESPACE) ||
      key === "roleplay-last-backup-at" ||
      key === "roleplay-last-import-at"
    ) keysToRemove.push(key);
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
  localStorage.setItem("roleplay-hard-reset-v25", "true");
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

  $("dayRole").addEventListener("change", () => { currentData.role = $("dayRole").value; applyRolePickerStyle(); saveReview(true); renderResponsibilityReflection(); });
  $("saveButton").addEventListener("click", () => saveReview(false));
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "dreams", "gratitude1", "gratitude2", "allahName", "responsibilityNote", "notes", "mood"].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener("change", () => saveReview(true));
    $(id).addEventListener("input", () => { collectForm(); scheduleAutoSave(); });
  });
  $("openStateCheckin").addEventListener("click", openStateCheckinDialog);
  $("cancelStateCheckin").addEventListener("click", () => $("stateCheckinDialog").close());
  $("stateCheckinDialog").addEventListener("cancel", event => { event.preventDefault(); $("stateCheckinDialog").close(); });
  $("stateCheckinForm").addEventListener("submit", saveStateCheckin);
  ["stateEnergy", "stateBody", "stateMind", "stateEnvironment", "stateEmotion", "stateTime"].forEach(id => {
    $(id).addEventListener(id === "stateEnergy" ? "input" : "change", updateStateCheckinPreview);
  });
  document.querySelectorAll("[data-responsibility-question] [data-responsibility-value]").forEach(button => button.addEventListener("click", () => {
    const key = button.closest("[data-responsibility-question]").dataset.responsibilityQuestion;
    currentData.responsibility[key] = Number(button.dataset.responsibilityValue);
    saveReview(true);
    renderResponsibilityReflection();
  }));

  if ($("waterPlus")) $("waterPlus").addEventListener("click", () => { currentData.water = String(Math.min(5000, Number(currentData.water || 0) + 500)); renderWaterControl(); saveReview(true); });
  if ($("waterMinus")) $("waterMinus").addEventListener("click", () => { currentData.water = String(Math.max(0, Number(currentData.water || 0) - 500)); renderWaterControl(); saveReview(true); });
  $("sleepQuality").addEventListener("input", () => { updateSleepLabel(); collectForm(); scheduleAutoSave(); });
  $("sleepQuality").addEventListener("change", () => saveReview(true));
  $("ramadanDays").addEventListener("input", () => { currentData.ramadanDays = Number($("ramadanDays").value || 0); updateRamadanDisplay(); });
  $("ramadanDays").addEventListener("change", () => { saveReview(true); propagateRamadanForward(selectedDate); });
  $("ramadanComplete").addEventListener("click", () => {
    if (currentData.fastingCompleted) return;
    currentData.ramadanDays = Number(currentData.ramadanDays || 0) + 1;
    currentData.fastingCompleted = true;
    $("ramadanDays").value = currentData.ramadanDays;
    updateRamadanDisplay(); saveReview(true); propagateRamadanForward(selectedDate);
  });
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

  $("exportPdf").addEventListener("click", exportWeeklyPdf);
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
  if ($("addRoutine")) $("addRoutine").addEventListener("click", openRoutineDialog);
  $("routineDialogForm").addEventListener("submit", saveRoutineFromForm);
  $("cancelRoutine").addEventListener("click", () => $("routineDialog").close());
  $("addRoutineItem").addEventListener("click", () => openRoutineItemDialog());
  $("routineItemForm").addEventListener("submit", saveRoutineItemFromForm);
  $("cancelRoutineItem").addEventListener("click", () => $("routineItemDialog").close());
  $("deleteRoutineItem").addEventListener("click", deleteRoutineItem);
  document.querySelectorAll("[data-emoji]").forEach(button => button.addEventListener("click", () => { $("routineItemEmoji").value = button.dataset.emoji; }));

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

  window.addEventListener("scroll", () => $("appHeader").classList.toggle("compact", window.scrollY > 80), { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && routineSession) { syncRoutineSessionClock(); renderRoutineSession(); }
    persistRoutineSession();
  });
  window.addEventListener("focus", () => { if (routineSession) { syncRoutineSessionClock(); renderRoutineSession(); } });
  window.addEventListener("pageshow", () => { if (routineSession) { syncRoutineSessionClock(); renderRoutineSession(); } });
  window.addEventListener("pagehide", persistRoutineSession);
}

function init() {
  resetAllStreaksOnce();
  initOptions();
  routines = loadRoutines();
  bindEvents();
  const lastBackupAt = localStorage.getItem(BACKUP_TIMESTAMP_KEY);
  if (lastBackupAt) $("backupStatus").textContent = `Letztes Backup: ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastBackupAt))}`;
  setDate(todayISO());
  switchPage("review");
  restoreRoutineSession();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

document.addEventListener("DOMContentLoaded", init);
