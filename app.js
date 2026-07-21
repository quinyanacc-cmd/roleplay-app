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
  { value: "Ärgerlich", label: "😠 Ärgerlich" },
  { value: "Überfordert", label: "😫 Überfordert" },
  { value: "Erschöpft", label: "🥱 Erschöpft" },
  { value: "Leer", label: "🫥 Leer" },
  { value: "Gestresst", label: "😵‍💫 Gestresst" },
  { value: "Stolz", label: "😌 Stolz" },
  { value: "Verbunden", label: "🤝 Verbunden" }
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
      { id: "e-candle", emoji: "🕯️", title: "Kerze", minutes: 1, context: "Den Tag bewusst beenden und zur Ruhe kommen." },
      { id: "e-clothes", emoji: "👕", title: "Kleidung vorbereiten", minutes: 3, context: "Kleidung für den nächsten Tag bereitlegen." },
      { id: "e-hygiene", emoji: "🚿", title: "Hygiene", minutes: 8, context: "Duschen oder waschen, Zähne putzen und Körperpflege." },
      { id: "e-cat", emoji: "🐈", title: "Katze versorgen", minutes: 3, context: "Futter, Wasser und Katzenbereich prüfen." },
      { id: "e-tidy", emoji: "🧹", title: "Kurz aufräumen", minutes: 10, context: "Nur die wichtigsten Flächen und Dinge für morgen ordnen." },
      { id: "e-review", emoji: "📓", title: "Tagesreview", minutes: 10, context: "Den Tag wahrheitsgemäß eintragen, ohne dich zu verurteilen." },
      { id: "e-ibada", emoji: "🤲", title: "Ibāda", minutes: 15, context: "Ishā, Witr, Dhikr oder Qur'an entsprechend deiner Planung." },
      { id: "e-phone", emoji: "📵", title: "Handy weglegen", minutes: 2, context: "Wecker stellen und das Handy außer Reichweite legen." },
      { id: "e-bed", emoji: "🛌", title: "Schlaf vorbereiten", minutes: 8, context: "Zimmer abdunkeln, lüften und ruhig werden." },
      { id: "e-lights", emoji: "🌙", title: "Licht aus", minutes: 1, context: "Den Tag abschließen und schlafen." }
    ]
  }
};

const QUICK_EMOJIS = ["🕯️","🔛","🧎🏻","🤸🏻","🛏️","🥗","🪷","📋","💡","🔤","📒","📝","🎒","👕","🚿","🐈","🧹","📓","🤲","📵","🛌","🌙"];
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

function storageKey(date) { return `roleplay-review-${date}`; }
function safeParse(text, fallback = null) { try { return JSON.parse(text); } catch { return fallback; } }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function escapeHTML(value = "") { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }

function getRole(name) {
  const normalized = name === "Ich-Person" ? "Yannick" : name;
  return ROLES.find(role => role.name === normalized) || ROLES[0];
}

function defaultRoleForDate(date) {
  const weekday = new Date(`${date}T12:00:00`).getDay();
  const names = ["Familienmensch", "Yannick", "Vitalist", "Unternehmer", "Absolvent", "Muslim", "Wirt"];
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
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "dreams", "gratitude1", "gratitude2", "allahName", "notes"].forEach(id => {
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
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "dreams", "gratitude1", "gratitude2", "allahName", "notes"].forEach(id => {
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
  renderStreaks();
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

function routineStateIconHTML(value, size = "small") {
  if (value === "done") return statusCircle("✓", "gradient", size);
  if (value === "missed") return statusCircle("✕", "missed", size);
  return statusCircle("", "neutral", size);
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
  document.querySelectorAll("[data-routine-state]").forEach(group => {
    const state = group.dataset.routineState === "morning" ? currentData.morningRoutineState : currentData.eveningRoutineState;
    group.querySelectorAll("button").forEach(button => {
      const isActive = button.dataset.state === state;
      button.classList.toggle("active", isActive);
      button.innerHTML = routineStateIconHTML(button.dataset.state, "small");
    });
  });
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
  $("streakList").innerHTML = STREAKS.map(streak => {
    const state = currentData.streaks?.[streak.key] || { days: 0, broken: false };
    return `<div class="streak-card ${state.broken ? "streak-broken" : ""}">
      <div class="streak-card-head">
        <strong>${escapeHTML(streak.label)}</strong>
        <span class="streak-status">${state.broken ? "Unterbrochen" : "Aktiv"}</span>
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

function reviewCompletion(data) {
  const prayerScore = PRAYERS.filter(prayer => data.prayers?.[prayer] && data.prayers[prayer] !== "Nicht gebetet").length;
  let earned = 0;
  earned += [data.breakfast, data.lunch, data.dinner, data.snack].some(Boolean) ? 1 : 0;
  earned += Number(data.water || 0) >= 2000 ? 1 : 0;
  earned += Number(data.steps || 0) >= 5000 ? 1 : 0;
  earned += data.morningRoutineState === "done" ? 1 : 0;
  earned += data.eveningRoutineState === "done" ? 1 : 0;
  earned += prayerScore;
  earned += data.sleepQualityScore !== "" && data.sleepQualityScore !== undefined && data.sleepQualityScore !== null ? 1 : 0;
  earned += data.mood ? 1 : 0;
  earned += (data.gratitude1 || data.gratitude2 || data.allahName) ? 1 : 0;
  earned += (data.activities || []).length ? 1 : 0;
  earned += data.notes ? 1 : 0;
  return Math.round((earned / 16) * 100);
}

function renderStats() {
  if (!currentData) return;
  const dates = weekDates();
  const reviews = dates.map(date => ({ date, data: loadReview(date), stored: Boolean(localStorage.getItem(storageKey(date))) }));
  const prayerCount = reviews.reduce((sum, item) => sum + PRAYERS.filter(prayer => item.data.prayers?.[prayer] && item.data.prayers[prayer] !== "Nicht gebetet").length, 0);
  const mosqueCount = reviews.reduce((sum, item) => sum + PRAYERS.filter(prayer => item.data.prayers?.[prayer] === "Gemeinschaft").length, 0);
  const routineDone = reviews.reduce((sum, item) => sum + [item.data.morningRoutineState, item.data.eveningRoutineState].filter(state => state === "done").length, 0);
  const sleepValues = reviews.map(item => item.data.sleepQualityScore).filter(value => value !== "" && value !== undefined && value !== null).map(Number);
  const averageSleep = sleepValues.length ? (sleepValues.reduce((a, b) => a + b, 0) / sleepValues.length).toFixed(1) : "–";
  const totalSteps = reviews.reduce((sum, item) => sum + Number(item.data.steps || 0), 0);
  const averageWater = reviews.reduce((sum, item) => sum + Number(item.data.water || 0), 0) / 7000;
  const fastDays = reviews.filter(item => item.data.fastingCompleted).length;
  const weeklyScore = Math.round(reviews.reduce((sum, item) => sum + reviewCompletion(item.data), 0) / 7);
  const storedDays = reviews.filter(item => item.stored).length;
  const bestDay = [...reviews].sort((a, b) => reviewCompletion(b.data) - reviewCompletion(a.data))[0];
  const moodCounts = {};
  reviews.forEach(item => { if (item.data.mood) moodCounts[item.data.mood] = (moodCounts[item.data.mood] || 0) + 1; });
  const topMood = Object.entries(moodCounts).sort((a,b) => b[1]-a[1])[0]?.[0] || "–";
  const bestDayName = bestDay ? new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(new Date(`${bestDay.date}T12:00:00`)) : "–";

  $("weekLabel").textContent = `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`;
  $("statsGrid").innerHTML = `
    <div class="week-summary">
      <div class="score-ring" style="--score:${weeklyScore}%"><div><strong>${weeklyScore}%</strong><span>Wochenfokus</span></div></div>
      <div class="week-summary-copy">
        <strong>${storedDays}/7 Tage reflektiert</strong>
        <p>${weeklyScore >= 75 ? "Starke Woche: viel Struktur, gute Routinen und klare Gebetsdisziplin." : weeklyScore >= 45 ? "Gute Basis. Unten siehst du farbige Wochenverläufe für Gebet, Routinen und Versorgung." : "Die Woche ist ein Spiegel, kein Urteil. Nutze die Übersicht als Orientierung für morgen."}</p>
      </div>
    </div>
    <div class="stats-metrics colorful-metrics">
      ${statTile(`${prayerCount}/35`, "Gebete")}
      ${statTile(String(mosqueCount), "Moschee")}
      ${statTile(`${routineDone}/14`, "Routinen")}
      ${statTile(`${averageSleep}/5`, "Ø Schlaf")}
      ${statTile(totalSteps.toLocaleString("de-DE"), "Schritte")}
      ${statTile(`${averageWater.toFixed(1)} L`, "Wasser / Tag")}
      ${statTile(String(fastDays), "Fastentage")}
      ${statTile(String(reviews.reduce((sum, item) => sum + (item.data.activities || []).length, 0)), "Aktivitäten")}
    </div>
    <div class="insight-grid">
      <div class="insight-card role-highlight" style="--role-soft:rgba(74,140,255,.12);--role-text:#245ca5;">
        <span class="insight-label">Bester Tag</span>
        <strong>${bestDayName}</strong>
        <small>${bestDay ? `${reviewCompletion(bestDay.data)}% Fokus · ${formatLongDate(bestDay.date)}` : "–"}</small>
      </div>
      <div class="insight-card">
        <span class="insight-label">Häufigste Emotion</span>
        <strong>${escapeHTML(topMood)}</strong>
        <small>Achtsamkeits-Tendenz dieser Woche</small>
      </div>
      <div class="insight-card">
        <span class="insight-label">Wochentrend</span>
        <strong>${routineDone >= 8 ? "Stabil" : routineDone >= 4 ? "Im Aufbau" : "Neu sortieren"}</strong>
        <small>${routineDone}/14 Routinen · ${fastDays} Fastentage</small>
      </div>
    </div>
    <div class="day-performance">
      ${reviews.map(item => {
        const role = getRole(item.data.role);
        const score = reviewCompletion(item.data);
        const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
        return `<div class="day-performance-row"><span class="day-label">${day}</span><div class="day-bar" style="--day-color:${role.color}"><span style="width:${score}%"></span></div><span class="day-score">${score}%</span></div>`;
      }).join("")}
    </div>
    <div class="weekly-visual-grid">
      <div class="visual-panel">
        <h3>Gebetswoche</h3>
        ${reviews.map(item => {
          const prayed = PRAYERS.filter(prayer => item.data.prayers?.[prayer] && item.data.prayers[prayer] !== "Nicht gebetet").length;
          const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
          return `<div class="mini-track-row"><span>${day}</span><div class="mini-track"><i style="width:${(prayed/5)*100}%"></i></div><strong>${prayed}/5</strong></div>`;
        }).join("")}
      </div>
      <div class="visual-panel">
        <h3>Routinewoche</h3>
        ${reviews.map(item => {
          const routineCount = [item.data.morningRoutineState, item.data.eveningRoutineState].filter(v => v === "done").length;
          const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
          return `<div class="mini-track-row"><span>${day}</span><div class="mini-track warm"><i style="width:${(routineCount/2)*100}%"></i></div><strong>${routineCount}/2</strong></div>`;
        }).join("")}
      </div>
      <div class="visual-panel">
        <h3>Wasserwoche</h3>
        ${reviews.map(item => {
          const liters = Number(item.data.water || 0) / 1000;
          const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
          return `<div class="mini-track-row"><span>${day}</span><div class="mini-track"><i style="width:${Math.min(100, (liters / 3) * 100)}%"></i></div><strong>${liters.toFixed(1)}L</strong></div>`;
        }).join("")}
      </div>
      <div class="visual-panel">
        <h3>Schlafwoche</h3>
        ${reviews.map(item => {
          const rawSleep = item.data.sleepQualityScore === "" || item.data.sleepQualityScore === undefined ? null : Number(item.data.sleepQualityScore);
          const score = rawSleep === null ? 0 : Math.max(0, 6 - rawSleep);
          const day = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${item.date}T12:00:00`)).replace(".", "");
          return `<div class="mini-track-row"><span>${day}</span><div class="mini-track warm"><i style="width:${rawSleep === null ? 0 : (score/6)*100}%"></i></div><strong>${rawSleep === null ? "–" : SLEEP_LABELS[rawSleep]}</strong></div>`;
        }).join("")}
      </div>
    </div>`;
}

function statTile(value, label) {
  return `<div class="stat-tile"><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></div>`;
}


function getAllReviews() {
  const reviews = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith("roleplay-review-")) continue;
    const date = key.replace("roleplay-review-", "");
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
    version: "2.2",
    schemaVersion: 3,
    exportedAt: new Date().toISOString(),
    reviews: getAllReviews(),
    routines
  };
  downloadTextFile(`roleplay-backup-${todayISO()}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  localStorage.setItem("roleplay-last-backup-at", new Date().toISOString());
  $("backupStatus").textContent = `Backup erstellt: ${payload.reviews.length} Tagesreviews und beide Routinen.`;
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
  const headers = ["Datum", "Rolle", "Frühstück", "Mittagessen", "Abendessen", "Snack", "Wasser_ml", "Schritte", "Morgenroutine", "Abendroutine", ...PRAYERS, "Ramadan_Tage", "Fastentag", "Schlafqualität_1_bis_5", "Träume", "Emotion", "Dankbarkeit", "Name_Allahs", "Cannabis_Tage", "Begierde_Tage", "Alkohol_Tage", "Rauchfrei_Tage", "Aktivitäten", "Notizen"];
  const lines = [headers.map(csvEscape).join(";")];
  getAllReviews().forEach(({ date, data }) => {
    const activities = (data.activities || []).map(activity => `${activity.title} | ${activity.role}`).join(" / ");
    const row = [date, data.role, data.breakfast, data.lunch, data.dinner, data.snack, data.water, data.steps, data.morningRoutineState, data.eveningRoutineState, ...PRAYERS.map(prayer => data.prayers?.[prayer] || ""), data.ramadanDays, data.fastingCompleted ? "Ja" : "Nein", data.sleepQualityScore, data.dreams, data.mood, data.gratitude1, data.allahName, ...STREAKS.map(streak => Number(data.streaks?.[streak.key]?.days || 0)), activities, data.notes];
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
  const W = 842, H = 595, margin = 20;
  const commands = [];
  pdfFillRect(commands, 0, 0, W, H, "FFFFFF");
  pdfText(commands, "ROLEPLAY", margin, H - 24, 8, true, "7C8493");
  pdfText(commands, "Wochenreflexion", margin, H - 44, 18, true, "17181C");
  pdfText(commands, `${formatLongDate(reviews[0].date)} – ${formatLongDate(reviews[6].date)}`, W - 220, H - 40, 8, false, "616876");

  const tableX = margin, tableYTop = H - 64, tableW = W - margin * 2;
  const labelW = 108, dayW = (tableW - labelW) / 7;
  const rows = weeklyPdfRows(reviews);
  const headerH = 46;
  const rowH = (tableYTop - margin - headerH) / rows.length;

  pdfFillRect(commands, tableX, tableYTop - headerH, tableW, headerH, "F7F8FB");
  pdfStrokeRect(commands, tableX, tableYTop - headerH, tableW, headerH, "E3E6ED", .7);
  pdfText(commands, "EINTRAG", tableX + 10, tableYTop - 18, 7, true, "69707F");

  reviews.forEach((item, index) => {
    const role = getRole(item.data.role);
    const x = tableX + labelW + index * dayW;
    pdfFillRect(commands, x + 7, tableYTop - 39, dayW - 14, 13, "F2F4F7");
    pdfText(commands, new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(new Date(`${item.date}T12:00:00`)), x + 5, tableYTop - 16, 6.1, true, "17181C");
    pdfText(commands, formatLongDate(item.date), x + 5, tableYTop - 27, 5.2, false, "616876");
    pdfText(commands, role.name, x + 10, tableYTop - 29.5, 5.2, true, role.color.slice(1));
    pdfStrokeLine(commands, x, tableYTop - headerH, x, margin, "ECEFF4", .45);
  });

  let currentY = tableYTop - headerH;
  rows.forEach((row, rowIndex) => {
    const y = currentY - rowH;
    pdfFillRect(commands, tableX + 4, y + 3, tableW - 8, rowH - 6, rowIndex % 2 ? "FFFFFF" : "FBFCFE");
    pdfStrokeRect(commands, tableX + 4, y + 3, tableW - 8, rowH - 6, "EDF0F4", .5);
    pdfText(commands, row.label, tableX + 10, y + rowH / 2 - 2, 6.0, true, "252933");
    row.values.forEach((value, index) => {
      const x = tableX + labelW + index * dayW;
      pdfText(commands, pdfFit(value, row.maxChars || 24), x + 4, y + rowH / 2 - 2, row.fontSize || 5.2, false, "30343D");
    });
    currentY = y;
  });

  for (let index = 0; index <= 7; index += 1) {
    const x = tableX + labelW + index * dayW;
    pdfStrokeLine(commands, x, margin, x, tableYTop, "F0F2F6", .35);
  }
  pdfStrokeRect(commands, tableX, margin, tableW, tableYTop - margin, "DCE1E8", .75);
  return assemblePdf(commands.join("\n"), W, H);
}

function weeklyPdfRows(reviews) {
  const value = getter => reviews.map(item => getter(item.data));
  const meals = data => [data.breakfast, data.lunch, data.dinner, data.snack].filter(Boolean).join(" / ") || "-";
  const routineState = state => state === "done" ? "✓" : state === "missed" ? "×" : "○";
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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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
  const stored = safeParse(localStorage.getItem("roleplay-routines-v2"));
  return normalizeRoutines(stored);
}

function saveRoutines() {
  localStorage.setItem("roleplay-routines-v2", JSON.stringify(routines));
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
  $("routineDetailEyebrow").textContent = key === "morning" ? "MORGEN" : key === "evening" ? "ABEND" : "FOKUS";
  $("routineDetailTitle").textContent = routine.title;
  $("routineDetailMeta").textContent = `${routine.items.length} Schritte · ${routineMinutes(routine)} Minuten`;
  $("routineItemList").innerHTML = routine.items.map((item, index) => {
    const state = currentData.routineProgress?.[key]?.[item.id] || "";
    return `<div class="routine-item clean" draggable="true" data-routine-index="${index}">
      <span class="routine-number">${index + 1}</span>
      <span class="routine-emoji-bubble">${escapeHTML(item.emoji)}</span>
      <div class="routine-item-copy">
        <strong>${escapeHTML(item.title)}</strong>
        <small>${item.minutes} Min.${state === "done" ? " · erledigt" : state === "skipped" ? " · übersprungen" : progress.done ? "" : ""}</small>
      </div>
      <button type="button" class="routine-item-menu" data-edit-routine-item="${escapeHTML(item.id)}" aria-label="Bearbeiten">⋯</button>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-edit-routine-item]").forEach(button => button.addEventListener("click", () => openRoutineItemDialog(button.dataset.editRoutineItem)));
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
}

function deleteRoutineItem() {
  if (!editingRoutineItemId || !confirm("Diesen Schritt wirklich löschen?")) return;
  const list = routines[activeRoutineKey].items;
  const index = list.findIndex(item => item.id === editingRoutineItemId);
  if (index >= 0) list.splice(index, 1);
  delete currentData.routineProgress?.[activeRoutineKey]?.[editingRoutineItemId];
  saveRoutines(); saveReview(true);
  $("routineItemDialog").close();
  renderRoutineDetail(activeRoutineKey); renderRoutineCards();
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
  routineSession = { key, index, remaining: routine.items[index].minutes * 60, running: true, interval: null, contextOpen: true };
  $("routineSessionDialog").showModal();
  renderRoutineSession();
  startSessionInterval();
}

function currentSessionItem() {
  return routines[routineSession.key].items[routineSession.index];
}

function renderRoutineSession() {
  if (!routineSession) return;
  const routine = routines[routineSession.key];
  const item = currentSessionItem();
  $("routineSessionDialog").dataset.theme = routine.theme || "focus";
  $("sessionRoutineName").textContent = routine.title;
  $("sessionProgress").textContent = `Schritt ${routineSession.index + 1} von ${routine.items.length}`;
  $("sessionItemTitle").textContent = item.title;
  $("sessionItemEmoji").textContent = item.emoji;
  $("sessionTimer").textContent = formatTimer(routineSession.remaining);
  $("sessionPause").textContent = routineSession.running ? "Ⅱ" : "▶";
  $("sessionContextToggle").hidden = true;
  $("sessionContext").hidden = !item.context;
  $("sessionContext").textContent = item.context || "";
  const next = routine.items[routineSession.index + 1];
  $("sessionNext").textContent = next ? `Als Nächstes: ${next.title}` : "Letzter Schritt dieser Routine";
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

function startSessionInterval() {
  clearInterval(routineSession?.interval);
  if (!routineSession) return;
  routineSession.interval = setInterval(() => {
    if (!routineSession?.running) return;
    routineSession.remaining -= 1;
    if (routineSession.remaining <= 0) {
      routineSession.remaining = 0;
      routineSession.running = false;
      playTimerDoneTone();
    }
    renderRoutineSession();
  }, 1000);
}

function completeSessionItem(status) {
  if (!routineSession) return;
  const key = routineSession.key;
  const routine = routines[key];
  const item = currentSessionItem();
  currentData.routineProgress[key][item.id] = status;
  const nextIndex = routineSession.index + 1;
  if (nextIndex >= routine.items.length) {
    const allDone = routine.items.every(entry => currentData.routineProgress[key][entry.id] === "done");
    if (key === "morning") currentData.morningRoutineState = allDone ? "done" : "missed";
    else if (key === "evening") currentData.eveningRoutineState = allDone ? "done" : "missed";
    saveReview(true);
    closeRoutineSession();
    alert(allDone ? `${routine.title} abgeschlossen.` : `${routine.title} beendet. Übersprungene Schritte wurden markiert.`);
    return;
  }
  routineSession.index = nextIndex;
  routineSession.remaining = routine.items[nextIndex].minutes * 60;
  routineSession.running = true;
  routineSession.contextOpen = false;
  saveReview(true);
  renderRoutineSession();
}

function closeRoutineSession() {
  if (routineSession?.interval) clearInterval(routineSession.interval);
  routineSession = null;
  if ($("routineSessionDialog").open) $("routineSessionDialog").close();
  updateRoutineStateButtons();
  renderRoutineCards();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

function switchPage(page) {
  const review = page === "review";
  $("reviewPage").classList.toggle("active", review);
  $("routinesPage").classList.toggle("active", !review);
  $("pageTitle").textContent = review ? "Tagesreview" : "Routinen";
  $("rolePickerWrap").hidden = !review;
  $("dateNavigation").hidden = !review;
  document.querySelectorAll(".nav-button").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  if (!review) { renderRoutineCards();  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initOptions() {
  $("dayRole").innerHTML = ROLES.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("activityRole").innerHTML = ROLES.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("mood").innerHTML = EMOTIONS.map(emotion => `<option value="${escapeHTML(emotion.value)}">${escapeHTML(emotion.label)}</option>`).join("");
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
  if (localStorage.getItem("roleplay-hard-reset-v23")) return;
  const keysToRemove = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith("roleplay-review-") || key === "roleplay-routines") keysToRemove.push(key);
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
  localStorage.setItem("roleplay-hard-reset-v23", "true");
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
  $("saveButton").addEventListener("click", () => saveReview(false));
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "dreams", "gratitude1", "gratitude2", "allahName", "notes", "mood"].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener("change", () => saveReview(true));
    $(id).addEventListener("input", () => { collectForm(); scheduleAutoSave(); });
  });
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
  document.querySelectorAll("[data-routine-state] button").forEach(button => button.addEventListener("click", () => {
    const key = button.closest("[data-routine-state]").dataset.routineState;
    if (key === "morning") currentData.morningRoutineState = button.dataset.state;
    else currentData.eveningRoutineState = button.dataset.state;
    updateRoutineStateButtons(); saveReview(true);
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
  $("routineSessionDialog").addEventListener("cancel", event => { event.preventDefault(); closeRoutineSession(); });
  $("sessionPause").addEventListener("click", () => { routineSession.running = !routineSession.running; renderRoutineSession(); });
  $("sessionComplete").addEventListener("click", () => completeSessionItem("done"));
  $("sessionSkip").addEventListener("click", () => completeSessionItem("skipped"));
  $("sessionMinus").addEventListener("click", () => { routineSession.remaining = Math.max(0, routineSession.remaining - 60); renderRoutineSession(); });
  $("sessionPlus").addEventListener("click", () => { routineSession.remaining += 60; renderRoutineSession(); });
  $("sessionContextToggle").addEventListener("click", () => {});

  window.addEventListener("scroll", () => $("appHeader").classList.toggle("compact", window.scrollY > 80), { passive: true });
}

function init() {
  resetAllStreaksOnce();
  initOptions();
  routines = loadRoutines();
  bindEvents();
  const lastBackupAt = localStorage.getItem("roleplay-last-backup-at");
  if (lastBackupAt) $("backupStatus").textContent = `Letztes Backup: ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastBackupAt))}`;
  setDate(todayISO());
  switchPage("review");
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

document.addEventListener("DOMContentLoaded", init);
