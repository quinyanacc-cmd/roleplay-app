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

const ROLES = [
  { name: "Ich-Person", emoji: "🫆", color: "#4AA8FF", text: "#174E7A" },
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

const MEAL_CATEGORY_META = {
  "": { label: "Kategorie auswählen …", score: null },
  none: { label: "Nichts gegessen", score: 28 },
  light: { label: "Leicht", score: 78 },
  balanced: { label: "Ausgewogen", score: 90 },
  protein: { label: "Eiweißreich", score: 84 },
  sweet: { label: "Süß", score: 52 },
  fatty: { label: "Fettig", score: 44 },
  fastfood: { label: "Stark verarbeitet / Fast Food", score: 36 },
  irregular: { label: "Unregelmäßig / nebenbei", score: 48 },
  large: { label: "Sehr große Mahlzeit", score: 46 },
  mixed: { label: "Gemischt", score: 62 },
  other: { label: "Sonstiges", score: 60 }
};

const DREAM_CATEGORIES = [
  ["", "Nicht erfasst"],
  ["none", "Kein Traum erinnert"],
  ["pleasant", "Angenehm"],
  ["neutral", "Neutral"],
  ["unusual", "Ungewöhnlich"],
  ["burdening", "Belastend"],
  ["nightmare", "Albtraum"],
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
  { key: "night", label: "Letzte Nacht", icon: "🌙", time: "07:00", color: "#6256C7" },
  { key: "morning", label: "Morgen", icon: "🌅", time: "08:00", color: "#F2A93B" },
  { key: "midday", label: "Mittag", icon: "☀️", time: "13:00", color: "#E5B52E" },
  { key: "evening", label: "Abend", icon: "🌇", time: "19:00", color: "#D36A67" }
];
const CHECKIN_CHRONOLOGY = ["night", "morning", "midday", "evening"];
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

const FRAMEWORKS = [
  { min: 76, key: "development", label: "Gestaltungsmodus", icon: "✦", color: "#5B72FF", summary: "Der Handlungsspielraum erlaubt neben Kernverantwortungen auch Gestaltung und Entwicklung.", focus: ["Kernverantwortungen zuerst sichern", "Entwicklung gezielt auswählen", "Pausen und Grenzen trotz guter Kraft wahren"] },
  { min: 56, key: "balance", label: "Regulärer Modus", icon: "◐", color: "#2EC4B6", summary: "Wesentliche Verantwortungen und begrenzte Entwicklung sind realistisch.", focus: ["Primäre Verantwortung klären", "Zusatzvorhaben bewusst begrenzen", "Zustand später erneut prüfen"] },
  { min: 36, key: "maintenance", label: "Reduzierter Modus", icon: "⌁", color: "#E7A31A", summary: "Die Form der Rollenausübung sollte reduziert, vereinfacht oder unterstützt werden.", focus: ["Pflichten und Schutzgüter priorisieren", "Routinen anpassen statt starr erfüllen", "Unterstützung und Mindesthandlungen nutzen"] },
  { min: 21, key: "recovery", label: "Sicherungsmodus", icon: "☾", color: "#E8798D", summary: "Sichere das Notwendige und schütze die weitere Handlungsfähigkeit.", focus: ["Unaufschiebbare Verantwortung absichern", "Kommunizieren, delegieren oder Hilfe holen", "Keine kompensierende Überforderung erzeugen"] },
  { min: 0, key: "protection", label: "Schutz- & Regenerationsmodus", icon: "◇", color: "#C557B7", summary: "Sicherheit, Grundversorgung, Hilfe und Wiederherstellung haben Vorrang.", focus: ["Sicherheit und Grundversorgung", "Verantwortung geordnet übergeben oder Hilfe aktivieren", "Zusatzanforderungen innerhalb des zulässigen Spielraums aussetzen"] }
];

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

const ROUTINE_STATE_ORDER = ["", "done", "adapted", "responsiblySkipped", "missed"];
const TASK_STATE_META = {
  "": { label: "Offen", short: "Offen", icon: "–", score: null, className: "open" },
  done: { label: "Erledigt", short: "Erledigt", icon: "✓", score: 1, className: "done" },
  adapted: { label: "Angepasst erfüllt", short: "Angepasst", icon: "≈", score: 1, className: "adapted" },
  responsiblySkipped: { label: "Verantwortungsvoll nicht erledigt", short: "Bewusst nicht", icon: "↷", score: 1, className: "responsible-skip" },
  missed: { label: "Nicht erledigt", short: "Versäumt", icon: "×", score: 0, className: "missed" }
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

const QUICK_EMOJIS = ["🕯️","🔛","🧎🏻","🤸🏻","🛏️","🥗","🪷","📋","💡","🔤","📒","📝","🎒","👕","🚿","🐈","🧹","📓","🤲","📵","🛌","🌙"];
const APP_VERSION = "4.0.3";
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
  merged.sunnahPrayers = { ...base.sunnahPrayers, ...(raw?.sunnahPrayers || {}) };
  merged.activities = Array.isArray(raw?.activities) ? raw.activities.map(item => ({
    title: String(item.title || ""),
    role: getRole(item.role || "Ich-Person").name
  })).filter(item => item.title) : [];
  merged.mealCategories = Object.fromEntries(["breakfast", "lunch", "dinner", "snack"].map(key => {
    const value = raw?.mealCategories?.[key] || "";
    return [key, MEAL_CATEGORY_META[value] ? value : ""];
  }));
  merged.dreamCategory = DREAM_CATEGORIES.some(([value]) => value === raw?.dreamCategory) ? raw.dreamCategory : "";
  const morningState = raw?.morningRoutineState || (raw?.morningRoutine ? "done" : "");
  const eveningState = raw?.eveningRoutineState || (raw?.eveningRoutine ? "done" : "");
  merged.morningRoutineState = TASK_STATE_META[morningState] ? morningState : "";
  merged.eveningRoutineState = TASK_STATE_META[eveningState] ? eveningState : "";
  const normalizedSleep = raw?.sleepQualityScore ?? legacySleepScore(raw?.sleepQuality);
  merged.sleepQualityScore = normalizedSleep === "" || normalizedSleep === undefined || normalizedSleep === null ? "" : Number(normalizedSleep);
  merged.routineProgress = {
    morning: { ...(raw?.routineProgress?.morning || {}) },
    evening: { ...(raw?.routineProgress?.evening || {}) }
  };
  merged.stateCheckins = Array.isArray(raw?.stateCheckins) ? raw.stateCheckins.map((entry, index) => {
    const time = /^\d{2}:\d{2}$/.test(entry.time || "") ? entry.time : "12:00";
    const inferredSlot = entry.slot || slotForTime(time);
    return {
      id: String(entry.id || `state-${date}-${index}`),
      slot: CHECKIN_SLOTS.some(slot => slot.key === inferredSlot) ? inferredSlot : slotForTime(time),
      time,
      energy: entry.energy === "" || entry.energy === undefined || entry.energy === null ? null : clamp(Number(entry.energy), 0, 100),
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
      selectedFrameworkKey: FRAMEWORKS.some(item => item.key === entry.selectedFrameworkKey) ? entry.selectedFrameworkKey : "",
      recommendedFrameworkKey: FRAMEWORKS.some(item => item.key === entry.recommendedFrameworkKey) ? entry.recommendedFrameworkKey : "",
      frameworkOverrideReason: String(entry.frameworkOverrideReason || ""),
      note: String(entry.note || ""),
      createdAt: entry.createdAt || `${date}T${time}:00`
    };
  }).sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time)) : [];
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
    if (select) currentData.mealCategories[key] = MEAL_CATEGORY_META[select.value] ? select.value : "";
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
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "gratitude1", "gratitude2", "allahName", "responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep", "notes"].forEach(id => {
    if ($(id)) $(id).value = currentData[id] ?? "";
  });
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const select = $(`${key}Category`);
    if (select) select.value = currentData.mealCategories?.[key] || "";
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
  renderStreaks();
}

function currentClockTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function slotForTime(time = currentClockTime()) {
  const hour = Number(String(time).slice(0, 2));
  if (hour < 10) return "morning";
  if (hour < 16) return "midday";
  if (hour < 21) return "evening";
  return "night";
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
  if (slot === "evening") return ["breakfast", "lunch", "snack", "dinner"];
  return ["breakfast", "lunch", "snack", "dinner"];
}

function mealContextScore(slot, data = currentData) {
  const values = mealKeysForSlot(slot).map(key => data?.mealCategories?.[key] || "").filter(Boolean);
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + (MEAL_CATEGORY_META[value]?.score ?? 62), 0) / values.length);
}

function mealCategoryLabel(value) {
  return MEAL_CATEGORY_META[value]?.label || "Noch offen";
}

function mealSummary(data, key, label = "") {
  const category = data?.mealCategories?.[key] || "";
  const note = String(data?.[key] || "").trim();
  const prefix = label ? `${label}: ` : "";
  if (!category && !note) return `${prefix}-`;
  const categoryText = category ? mealCategoryLabel(category) : "Ohne Kategorie";
  return `${prefix}${categoryText}${note ? ` · ${note}` : ""}`;
}

function hydrationContextScore(slot, ml) {
  const target = { morning: 500, midday: 1000, evening: 1500, night: 2000 }[slot] || 1000;
  const amount = Math.max(0, Number(ml || 0));
  const ratio = Math.min(1.25, amount / target);
  return Math.round(clamp(34 + ratio * 52, 34, 96));
}

function vitalityContextScore(checkin) {
  if (!checkin) return null;
  const values = [];
  const hydration = hydrationContextScore(checkin.slot, checkin.hydrationMl);
  if (Number.isFinite(hydration)) values.push({ value: hydration, weight: .42 });
  const nutrition = Number.isFinite(Number(checkin.nutritionScore)) ? Number(checkin.nutritionScore) : null;
  if (nutrition !== null) values.push({ value: nutrition, weight: .30 });
  const sleep = sleepCapacityScore(checkin.sleepQualityScore);
  if (sleep !== null) values.push({ value: sleep, weight: .28 });
  if (!values.length) return 65;
  return Math.round(values.reduce((sum, item) => sum + item.value * item.weight, 0) / values.reduce((sum, item) => sum + item.weight, 0));
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
  const emotion = emotionStateScore(checkin.emotion);
  const load = LOAD_OPTIONS[checkin.load]?.score ?? LOAD_OPTIONS.normal.score;
  return Math.round(energy * .56 + emotion * .22 + load * .22);
}

function hydrationContextScore(slot, ml) {
  const thresholds = { morning: 500, midday: 1000, evening: 1500, night: 1800 };
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

function recommendedFrameworkForCheckin(checkin, data = currentData) {
  const capacity = stateCapacity(checkin, data);
  if (capacity === null) return null;
  const base = FRAMEWORKS.find(item => capacity >= item.min) || FRAMEWORKS.at(-1);
  return { ...base, capacity };
}

function frameworkForCheckin(checkin, data = currentData) {
  const recommended = recommendedFrameworkForCheckin(checkin, data);
  if (!recommended) return null;
  const chosen = FRAMEWORKS.find(item => item.key === checkin?.selectedFrameworkKey) || recommended;
  return {
    ...chosen,
    capacity: recommended.capacity,
    recommendedKey: recommended.key,
    recommendedLabel: recommended.label,
    isOverride: chosen.key !== recommended.key,
    overrideReason: checkin?.frameworkOverrideReason || ""
  };
}

function recommendationForCheckin(checkin, framework = frameworkForCheckin(checkin), data = currentData) {
  if (!checkin || !framework) return "";
  if (checkin.slot === "night") {
    const sleep = sleepCapacityScore(checkin.sleepQualityScore);
    if (sleep !== null && sleep < 40) return "Die Nacht war wenig erholsam. Beginne den Morgen reduziert, sichere Grundversorgung und Pflichtgebete und prüfe deine Energie nach dem Morgen-Check-in erneut.";
    if (sleep !== null && sleep >= 80) return "Die Nacht war erholsam. Nutze den Morgen für das Wesentliche und prüfe erst danach, ob Raum für zusätzliche Entwicklung besteht.";
    return "Nimm die Schlafqualität als Ausgangslage, nicht als Urteil. Der Morgen-Check-in präzisiert den passenden Rollenmodus.";
  }
  const action = {
    development: "Sichere zuerst das Wesentliche und wähle anschließend höchstens eine zusätzliche Entwicklungsaufgabe.",
    balance: "Bearbeite deine wesentlichen Verantwortungen und begrenze zusätzliche Vorhaben bewusst.",
    maintenance: "Reduziere Umfang und Komplexität. Sichere Pflichten und verschiebe nicht notwendige Zusatzaufgaben.",
    recovery: "Sichere das Unaufschiebbare, nutze Unterstützung und plane bewusst Regeneration ein.",
    protection: "Grundversorgung, Sicherheit, Hilfe und eine verantwortungssichernde Mindesthandlung haben Vorrang."
  }[framework.key];
  return `${action} Pflichtgebete bleiben unabhängig vom Rollenmodus als eigener Anker sichtbar.`;
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

function stateMetaLine(checkin) {
  if (!checkin) return "";
  const body = STATE_BODY_OPTIONS[checkin.body] || STATE_BODY_OPTIONS.stable;
  const mind = STATE_MIND_OPTIONS[checkin.mind] || STATE_MIND_OPTIONS.normal;
  const context = CONTEXT_OPTIONS[checkin.context] || CONTEXT_OPTIONS.normal;
  const hydration = `${(Number(checkin.hydrationMl || 0) / 1000).toFixed(1).replace(".", ",")} L`;
  return `${body.icon} ${body.label} · ${mind.icon} ${mind.label}${checkin.emotion ? ` · ${checkin.emotion}` : ""} · ${context.icon} ${context.label} · 💧 ${hydration}`;
}

function responsibilityFrameMeta(checkin) {
  if (!checkin) return "";
  const role = getRole(checkin.primaryRole);
  const source = RESPONSIBILITY_SOURCE_LABELS[checkin.responsibilitySource] || RESPONSIBILITY_SOURCE_LABELS.role;
  return `${role.emoji} ${role.name} · ${source} · Dringlichkeit ${URGENCY_LABELS[checkin.urgency] || "mittel"} · Anpassung ${FLEXIBILITY_LABELS[checkin.flexibility] || "mittel"}`;
}

function renderCheckinSlots() {
  const container = $("checkinSlots");
  if (!container || !currentData) return;
  const bySlot = Object.fromEntries((currentData.stateCheckins || []).map(entry => [entry.slot, entry]));
  container.innerHTML = CHECKIN_SLOTS.map(slot => {
    const entry = bySlot[slot.key];
    const framework = frameworkForCheckin(entry);
    const detail = !entry ? "Offen" : slot.key === "night" && entry.sleepQualityScore !== "" && entry.sleepQualityScore !== undefined
      ? (SLEEP_LABELS[Number(entry.sleepQualityScore)] || "Erfasst")
      : (framework?.label || "Erfasst");
    const color = framework?.color || slot.color;
    return `<button type="button" class="checkin-slot ${entry ? "complete" : ""}" data-open-checkin-slot="${slot.key}" style="--slot-color:${color}" aria-label="${escapeHTML(slot.label)}-Check-in ${entry ? "bearbeiten" : "erfassen"}">
      <span>${slot.icon}</span><div><strong>${escapeHTML(slot.label)}</strong><small>${escapeHTML(detail)}</small></div>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-open-checkin-slot]").forEach(button => button.addEventListener("click", () => openStateCheckinDialog(button.dataset.openCheckinSlot)));
}

function renderStateOverview() {
  const summary = $("currentStateSummary");
  const timeline = $("stateTimeline");
  if (!summary || !timeline || !currentData) return;
  renderCheckinSlots();
  const checkins = [...(currentData.stateCheckins || [])].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time));
  const latest = [...checkins].at(-1);
  const framework = frameworkForCheckin(latest);
  $("stateCheckinCount").textContent = `${checkins.length}/4 Check-ins`;
  if ($("adaptiveRoutineHint")) $("adaptiveRoutineHint").hidden = true;

  if (!latest || !framework) {
    summary.className = "current-state-summary empty-state-summary compact-empty-state";
    summary.innerHTML = `<div class="empty-state-icon" aria-hidden="true">◇</div><div><strong>Noch kein Check-in</strong><p>Tippe auf „Letzte Nacht“, „Morgen“, „Mittag“ oder „Abend“. Wenige Angaben genügen.</p></div>`;
  } else {
    const slot = checkinSlot(latest.slot);
    const factors = checkinReasonFactors(latest);
    const overrideNote = framework.isOverride ? `<p class="mode-override-note"><strong>Bewusst angepasst:</strong> ${escapeHTML(framework.overrideReason || "Eigene Einschätzung")}</p>` : "";
    summary.className = `current-state-summary compact-state-summary framework-${framework.key}`;
    summary.style.setProperty("--framework-color", framework.color);
    summary.innerHTML = `
      <div class="compact-framework-main lean-framework-main">
        <div class="framework-icon" aria-hidden="true">${framework.icon}</div>
        <div class="framework-copy">
          <span>${slot.icon} ${escapeHTML(slot.label)} · ${escapeHTML(latest.time)} Uhr${framework.isOverride ? " · angepasst" : ""}</span>
          <strong>${escapeHTML(framework.label)}</strong>
          <p>${escapeHTML(recommendationForCheckin(latest, framework))}</p>
        </div>
      </div>
      <details class="framework-details">
        <summary>Begründung</summary>
        <div class="reason-factor-list">${factors.map(item => `<span>${escapeHTML(item)}</span>`).join("")}</div>
        ${framework.isOverride ? `<small>Systemempfehlung: ${escapeHTML(framework.recommendedLabel)}</small>` : ""}
        ${overrideNote}
      </details>`;
  }

  timeline.innerHTML = checkins.length ? [...checkins].reverse().map(entry => {
    const entryFramework = frameworkForCheckin(entry);
    const slot = checkinSlot(entry.slot);
    const details = entry.slot === "night"
      ? `${entry.sleepQualityScore !== "" ? SLEEP_LABELS[Number(entry.sleepQualityScore)] || "Schlaf erfasst" : "Schlaf nicht bewertet"}${entry.dreamCategory ? ` · ${dreamCategoryLabel(entry.dreamCategory)}` : ""}`
      : `${entry.energy ?? "–"}% Energie · ${entry.emotion || "Gefühl offen"} · Belastung ${LOAD_OPTIONS[entry.load]?.label || "Normal"}`;
    return `<article class="state-timeline-item" style="--framework-color:${entryFramework.color}">
      <div class="state-timeline-marker"></div>
      <div class="state-timeline-copy">
        <div class="state-timeline-title"><strong>${slot.icon} ${escapeHTML(slot.label)} · ${escapeHTML(entry.time)}</strong><span>${escapeHTML(entryFramework.label.replace(" Modus", ""))}</span></div>
        <small>${escapeHTML(details)}</small>
        ${entry.note ? `<p>${escapeHTML(entry.note)}</p>` : ""}
      </div>
      <button type="button" class="state-delete-button" data-delete-state-checkin="${escapeHTML(entry.id)}" aria-label="Check-in löschen">×</button>
    </article>`;
  }).join("") : `<p class="state-timeline-empty">Noch keine Momentaufnahme gespeichert.</p>`;

  document.querySelectorAll("[data-delete-state-checkin]").forEach(button => button.addEventListener("click", () => {
    currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.id !== button.dataset.deleteStateCheckin);
    saveReview(true);
    renderStateOverview();
  }));
}

function emotionOptionsHTML() {
  return `<option value="">Noch nicht eingetragen</option>${EMOTION_GROUPS.map(group => `<optgroup label="${escapeHTML(group.label)}">${group.options.map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`).join("")}</optgroup>`).join("")}`;
}

function populateStateCheckinEmotion() {
  const select = $("stateEmotion");
  if (select) select.innerHTML = emotionOptionsHTML();
}

function dreamCategoryLabel(value) {
  return DREAM_CATEGORIES.find(([key]) => key === value)?.[1] || "Nicht erfasst";
}

function renderSleepQualityChoices(selectedValue = "") {
  const container = $("sleepQualityChoices");
  if (!container) return;
  container.innerHTML = SLEEP_CHOICES.map(value => `<button type="button" class="${String(selectedValue) === String(value) ? "active" : ""}" data-sleep-quality="${value}" aria-pressed="${String(selectedValue) === String(value)}">${escapeHTML(SLEEP_LABELS[value] || "-")}</button>`).join("");
  container.querySelectorAll("[data-sleep-quality]").forEach(button => button.addEventListener("click", () => {
    $("stateSleepQuality").value = button.dataset.sleepQuality;
    renderSleepQualityChoices(button.dataset.sleepQuality);
    updateStateCheckinPreview();
  }));
}

function renderLoadChoices(selected = "normal") {
  $("stateLoad").value = LOAD_OPTIONS[selected] ? selected : "normal";
  document.querySelectorAll("[data-state-load]").forEach(button => {
    const active = button.dataset.stateLoad === $("stateLoad").value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function toggleNightCheckinFields(slotKey) {
  const isNight = slotKey === "night";
  if ($("nightCheckinSection")) $("nightCheckinSection").hidden = !isNight;
  if ($("dayCheckinSection")) $("dayCheckinSection").hidden = isNight;
}

function fillStateCheckinForm(slotKey) {
  const requestedSlot = slotKey || slotForTime();
  const existing = (currentData.stateCheckins || []).find(entry => entry.slot === requestedSlot);
  const latestDay = [...(currentData.stateCheckins || [])].filter(entry => entry.slot !== "night").sort((a,b) => slotIndex(a.slot)-slotIndex(b.slot)).at(-1);
  const slot = checkinSlot(requestedSlot);
  $("stateCheckinDialog").dataset.editingSlot = requestedSlot;
  $("stateSlot").value = requestedSlot;
  $("stateSlotDisplay").style.setProperty("--slot-color", slot.color);
  $("stateSlotDisplay").innerHTML = `<span aria-hidden="true">${slot.icon}</span><strong>${escapeHTML(slot.label)}</strong><small>${requestedSlot === "night" ? "Schlafbereich" : "kurzer Check-in"}</small>`;
  $("stateEnergy").value = existing?.energy ?? latestDay?.energy ?? 60;
  $("stateEmotion").value = existing?.emotion || latestDay?.emotion || "";
  renderLoadChoices(existing?.load || latestDay?.load || "normal");
  $("stateTime").value = existing?.time || (selectedDate === todayISO() ? currentClockTime() : slot.time);
  $("stateNote").value = existing?.note || "";
  const sleepValue = existing?.sleepQualityScore ?? currentData.sleepQualityScore ?? "";
  $("stateSleepQuality").value = sleepValue;
  $("stateDreamCategory").value = existing?.dreamCategory || currentData.dreamCategory || "";
  $("stateDreamNote").value = existing?.dreamNote || currentData.dreams || "";
  $("stateFrameworkReason").value = existing?.frameworkOverrideReason || "";
  $("stateCheckinDialog").dataset.frameworkManuallySelected = existing?.selectedFrameworkKey ? "true" : "false";
  renderSleepQualityChoices(sleepValue);
  toggleNightCheckinFields(requestedSlot);
  $("stateDialogDescription").textContent = requestedSlot === "night"
    ? "Schlafqualität und Traumkategorie bilden die Ausgangslage für den neuen Tag."
    : "Energie, Gefühl und Belastung genügen. Ernährung, Trinkmenge und die letzte Nacht werden automatisch berücksichtigt.";
  updateStateCheckinPreview(existing?.selectedFrameworkKey || "");
}

function openStateCheckinDialog(slotKey = null) {
  fillStateCheckinForm(slotKey || slotForTime());
  $("stateCheckinDialog").showModal();
}

function stateCheckinFromForm() {
  const slot = $("stateSlot").value;
  const nightSleep = $("stateSleepQuality").value;
  return {
    slot,
    energy: slot === "night" ? null : Number($("stateEnergy").value || 60),
    load: slot === "night" ? "normal" : $("stateLoad").value,
    body: "stable",
    mind: "normal",
    motivation: "available",
    context: "normal",
    support: "available",
    emotion: slot === "night" ? "" : $("stateEmotion").value,
    primaryRole: currentData.role,
    responsibilitySource: "role",
    responsibility: "",
    urgency: "medium",
    impact: "medium",
    flexibility: "medium",
    conflict: "no",
    hydrationMl: Math.max(0, Number(currentData.water || 0)),
    nutritionScore: mealContextScore(slot),
    sleepQualityScore: slot === "night" ? (nightSleep === "" ? "" : Number(nightSleep)) : "",
    dreamCategory: slot === "night" ? $("stateDreamCategory").value : "",
    dreamNote: slot === "night" ? $("stateDreamNote").value.trim() : "",
    selectedFrameworkKey: $("stateSelectedFramework").value,
    frameworkOverrideReason: $("stateFrameworkReason").value.trim(),
    time: $("stateTime").value || currentClockTime(),
    note: slot === "night" ? "" : $("stateNote").value.trim()
  };
}

function updateFrameworkOverrideVisibility(recommendedKey) {
  const selected = $("stateSelectedFramework").value;
  const changed = Boolean(selected && recommendedKey && selected !== recommendedKey);
  $("frameworkOverrideReasonWrap").hidden = !changed;
  $("stateFrameworkReason").required = changed;
  if (!changed) $("stateFrameworkReason").setCustomValidity("");
}

function updateStateCheckinPreview(preferredFrameworkKey = null) {
  if (!$("stateEnergy")) return;
  const draft = stateCheckinFromForm();
  const recommended = recommendedFrameworkForCheckin(draft);
  if (!recommended) return;
  if (preferredFrameworkKey !== null) {
    const validPreferred = FRAMEWORKS.some(item => item.key === preferredFrameworkKey);
    $("stateSelectedFramework").value = validPreferred ? preferredFrameworkKey : recommended.key;
    $("stateCheckinDialog").dataset.frameworkManuallySelected = validPreferred && preferredFrameworkKey !== recommended.key ? "true" : "false";
  } else if ($("stateCheckinDialog").dataset.frameworkManuallySelected !== "true") {
    $("stateSelectedFramework").value = recommended.key;
  }
  const selected = FRAMEWORKS.find(item => item.key === $("stateSelectedFramework").value) || recommended;
  draft.selectedFrameworkKey = selected.key;
  const framework = frameworkForCheckin(draft);
  $("stateEnergyValue").textContent = `${draft.energy ?? 0} %`;
  $("stateFrameworkPreview").textContent = framework.label;
  $("stateFrameworkPreview").style.setProperty("--framework-color", framework.color);
  const factors = checkinReasonFactors(draft).slice(0, 4);
  $("stateFrameworkPreviewText").style.setProperty("--framework-color", framework.color);
  $("stateFrameworkPreviewText").innerHTML = `<strong>${framework.icon} Empfehlung: ${escapeHTML(recommended.label)}</strong><span>${escapeHTML(recommendationForCheckin(draft, framework))}</span>${factors.length ? `<div class="preview-factor-list">${factors.map(item => `<i>${escapeHTML(item)}</i>`).join("")}</div>` : ""}`;
  updateFrameworkOverrideVisibility(recommended.key);
  $("stateCheckinDialog").dataset.recommendedFramework = recommended.key;
}

function saveStateCheckin(event) {
  event.preventDefault();
  const entry = stateCheckinFromForm();
  const recommended = recommendedFrameworkForCheckin(entry);
  entry.recommendedFrameworkKey = recommended?.key || "";
  if (entry.selectedFrameworkKey && recommended && entry.selectedFrameworkKey !== recommended.key && !entry.frameworkOverrideReason) {
    $("stateFrameworkReason").setCustomValidity("Bitte begründe kurz, warum ein anderer Rollenmodus besser passt.");
    $("frameworkOverrideReasonWrap").hidden = false;
    $("stateFrameworkReason").reportValidity();
    $("stateFrameworkReason").focus();
    return;
  }
  $("stateFrameworkReason").setCustomValidity("");
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
  $("stateCheckinDialog").close();
  saveReview(true);
  renderStateOverview();
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

function taskStateScore(value) {
  return TASK_STATE_META[value]?.score ?? null;
}

function prayerCompletionScore(value) {
  if (!value) return null;
  return ({ Gemeinschaft: 1, Normal: 1, "Verspätet": .75, "Nachgeholt": .4, "Nicht gebetet": 0 })[value] ?? null;
}

function prayerWasPerformed(value) {
  return Boolean(value) && value !== "Nicht gebetet";
}

function averageKnown(values) {
  const known = values.filter(value => value !== null && value !== undefined && Number.isFinite(Number(value))).map(Number);
  return known.length ? known.reduce((sum, value) => sum + value, 0) / known.length : null;
}

function roleFidelityBreakdown(data = currentData) {
  if (!data) return { score: null, prayers: null, routines: null, protection: null };
  const prayers = averageKnown(PRAYERS.map(prayer => prayerCompletionScore(data.prayers?.[prayer] || "")));
  const routines = averageKnown([taskStateScore(data.morningRoutineState), taskStateScore(data.eveningRoutineState)]);
  const protection = averageKnown(STREAKS.map(streak => STREAK_DAILY_STATES[data.streaks?.[streak.key]?.todayStatus || ""]?.score ?? null));
  const components = [
    { value: prayers, weight: .50 },
    { value: routines, weight: .25 },
    { value: protection, weight: .25 }
  ].filter(component => component.value !== null);
  const score = components.length ? Math.round(components.reduce((sum, component) => sum + component.value * component.weight, 0) / components.reduce((sum, component) => sum + component.weight, 0) * 100) : null;
  return { score, prayers, routines, protection };
}

function roleFidelityScore(data = currentData) {
  return roleFidelityBreakdown(data).score;
}

function protectionVictories(data = currentData) {
  return STREAKS.filter(streak => data?.streaks?.[streak.key]?.todayStatus === "resisted");
}

function responsibilityLabel(score) {
  if (score === null) return { label: "Noch offen", tone: "open", text: "Die Prüfschleife bleibt offen, bis Situation, Verantwortung, Handlung und Wirkung ehrlich betrachtet wurden." };
  if (score >= 85) return { label: "Sehr stimmig", tone: "strong", text: "Sachlage, Zustand, Verantwortung, Rolle, Angemessenheit und Wirkung wurden nach deiner Einschätzung sehr stimmig verbunden." };
  if (score >= 65) return { label: "Verantwortungsvoll", tone: "good", text: "Die Entscheidung war überwiegend begründbar. Einzelne Spannungen werden zu konkreten Lernhinweisen." };
  if (score >= 40) return { label: "Teilweise stimmig", tone: "mixed", text: "Ein Teil der Verantwortung wurde angemessen beantwortet; zugleich bleiben Restverantwortung oder Korrekturbedarf sichtbar." };
  return { label: "Korrekturbedarf erkannt", tone: "warning", text: "Die Reflexion zeigt eine deutliche Lücke zwischen Verantwortung und Handlung. Erkenntnis, Korrektur und Hilfe sind selbst verantwortliche nächste Schritte." };
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
  const meta = TASK_STATE_META[value] || TASK_STATE_META[""];
  return `${routineStateIconHTML(value, "small")}<strong class="routine-state-button-label">${escapeHTML(meta.label)}</strong>`;
}

function routineStateIconHTML(value, size = "small") {
  if (value === "done") return statusCircle("✓", "gradient", size);
  if (value === "adapted") return statusCircle("≈", "adapted", size);
  if (value === "responsiblySkipped") return statusCircle("↷", "responsible-skip", size);
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
    const meta = TASK_STATE_META[state] || TASK_STATE_META[""];
    button.dataset.state = state;
    button.classList.toggle("is-done", state === "done");
    button.classList.toggle("is-adapted", state === "adapted");
    button.classList.toggle("is-responsible-skip", state === "responsiblySkipped");
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
    return `<div class="prayer-card prayer-card-compact" data-state="${escapeHTML(state)}">
      <strong>${escapeHTML(prayer)}</strong>
      <button type="button" class="prayer-state-button" data-open-prayer="${escapeHTML(prayer)}" data-prayer-kind="obligatory" aria-label="Status ${escapeHTML(prayer)}: ${escapeHTML(meta.label)}">
        ${prayerStateIconHTML(state, "medium")}
      </button>
      <small>${escapeHTML(meta.short)}</small>
    </div>`;
  }).join("");

  const sunnahList = $("sunnahPrayerList");
  if (sunnahList) {
    sunnahList.innerHTML = SUNNAH_PRAYERS.map(prayer => {
      const state = currentData.sunnahPrayers?.[prayer] || "";
      const meta = SUNNAH_PRAYER_STATES.find(option => option.value === state) || SUNNAH_PRAYER_STATES[0];
      return `<button type="button" class="sunnah-prayer-chip state-${state === "Verrichtet" ? "done" : state === "Nicht vorgesehen" ? "neutral" : "open"}" data-open-prayer="${escapeHTML(prayer)}" data-prayer-kind="sunnah" aria-label="${escapeHTML(prayer)}: ${escapeHTML(meta.label)}"><span>${state === "Verrichtet" ? "✓" : state === "Nicht vorgesehen" ? "–" : "○"}</span><strong>${escapeHTML(prayer)}</strong><small>${escapeHTML(meta.short)}</small></button>`;
    }).join("");
    const done = SUNNAH_PRAYERS.filter(prayer => currentData.sunnahPrayers?.[prayer] === "Verrichtet").length;
    if ($("sunnahPrayerSummary")) $("sunnahPrayerSummary").textContent = done ? `${done} verrichtet` : "Noch nichts erfasst";
  }

  document.querySelectorAll("[data-open-prayer]").forEach(button => button.addEventListener("click", () => openPrayerDialog(button.dataset.openPrayer, button.dataset.prayerKind || "obligatory")));
}

function openPrayerDialog(prayer, kind = "obligatory") {
  $("prayerDialogTitle").textContent = prayer;
  $("prayerDialog").dataset.prayer = prayer;
  $("prayerDialog").dataset.kind = kind;
  const states = kind === "sunnah" ? SUNNAH_PRAYER_STATES : PRAYER_STATES;
  const store = kind === "sunnah" ? currentData.sunnahPrayers : currentData.prayers;
  const current = store?.[prayer] || "";
  $("prayerStateOptions").innerHTML = states.map(option => `
    <button type="button" class="prayer-option ${current === option.value ? "active" : ""}" data-prayer-option="${escapeHTML(option.value)}">
      ${kind === "sunnah" ? statusCircle(option.value === "Verrichtet" ? "✓" : option.value === "Nicht vorgesehen" ? "–" : "", option.value === "Verrichtet" ? "gradient" : "neutral", "medium") : prayerStateIconHTML(option.value, "medium")}
      <strong>${escapeHTML(option.label)}</strong>
    </button>`).join("");
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
  button.textContent = currentData?.fastingCompleted ? "Fastentag geschafft ✓" : "Fastentag geschafft";
}

function renderActivities() {
  const list = $("activityList");
  if (!list) return;
  const activities = currentData.activities || [];
  list.innerHTML = activities.length ? activities.map((activity, index) => {
    const role = getRole(activity.role);
    return `<div class="activity-row tracking-activity" data-activity-index="${index}" style="--activity-color:${role.color}">
      <div class="activity-main">
        <span class="activity-role-bar" style="background:${role.color}"></span>
        <div class="activity-copy"><strong>${escapeHTML(activity.title)}</strong><small>${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</small></div>
      </div>
      <div class="activity-sort-actions" aria-label="Aktivität sortieren">
        <button type="button" data-move-activity="-1" data-activity-index="${index}" ${index === 0 ? "disabled" : ""} aria-label="Nach oben">↑</button>
        <button type="button" data-move-activity="1" data-activity-index="${index}" ${index === activities.length - 1 ? "disabled" : ""} aria-label="Nach unten">↓</button>
      </div>
      <button type="button" class="delete-button" data-delete-activity="${index}" aria-label="Aktivität löschen">×</button>
    </div>`;
  }).join("") : `<p class="activity-empty">Noch keine Aktivität dokumentiert.</p>`;

  document.querySelectorAll("[data-move-activity]").forEach(button => button.addEventListener("click", () => {
    moveArrayItem(currentData.activities, Number(button.dataset.activityIndex), Number(button.dataset.moveActivity));
    saveReview(true);
    renderActivities();
  }));
  document.querySelectorAll("[data-delete-activity]").forEach(button => button.addEventListener("click", () => {
    currentData.activities.splice(Number(button.dataset.deleteActivity), 1);
    saveReview(true);
    renderActivities();
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
    const resistedLabel = streak.key === "compulsionFree" ? "Begierde widerstanden" : "Herausforderung widerstanden";
    return `<div class="streak-card ${state.broken ? "streak-broken" : ""} ${isActive ? "streak-active" : ""} ${state.todayStatus === "resisted" ? "streak-victory" : ""}">
      <div class="streak-card-head">
        <div><strong>${escapeHTML(streak.label)}</strong><small>${escapeHTML(daily.label)}</small></div>
        <span class="streak-status">${state.todayStatus === "resisted" ? "Starker Schutzsieg" : state.broken ? "Unterbrochen" : isActive ? "Aktiv" : "Offen"}</span>
      </div>
      <div class="streak-input-wrap">
        <input class="streak-days-large" type="number" min="0" inputmode="numeric" data-streak-days="${streak.key}" value="${Number(state.days || 0)}" aria-label="${escapeHTML(streak.label)} Tage">
        <span class="streak-unit">Tage</span>
      </div>
      <div class="streak-daily-actions" role="group" aria-label="Heutige Schutzentscheidung">
        <button type="button" class="${state.todayStatus === "protected" ? "active" : ""}" data-streak-daily="protected" data-streak-key="${streak.key}">Geschützt</button>
        <button type="button" class="victory ${state.todayStatus === "resisted" ? "active" : ""}" data-streak-daily="resisted" data-streak-key="${streak.key}">${escapeHTML(resistedLabel)}</button>
        <button type="button" class="danger ${state.todayStatus === "lapse" ? "active" : ""}" data-streak-daily="lapse" data-streak-key="${streak.key}">Unterbrechung</button>
      </div>
      ${state.todayStatus === "resisted" ? `<p class="streak-victory-note">Das Widerstehen einer realen Begierde wird als eigenständiger Verantwortungserfolg hervorgehoben – unabhängig davon, wie viele Routinen heute erledigt wurden.</p>` : ""}
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
    const next = button.dataset.streakDaily;
    state.todayStatus = state.todayStatus === next ? "" : next;
    if (state.todayStatus === "lapse") { state.days = 0; state.broken = true; }
    else if (state.todayStatus) { state.broken = false; if (Number(state.days || 0) === 0) state.days = 1; }
    saveReview(true); propagateStreaksForward(selectedDate); renderStreaks(); renderStats();
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

function buildWeeklyTrendChart(labels, series, options = {}) {
  const width = 430;
  const height = 245;
  const padX = 35;
  const padTop = 20;
  const padBottom = 38;
  const chartW = width - padX * 2;
  const chartH = height - padTop - padBottom;
  const todayIndex = Number.isInteger(options.todayIndex) ? options.todayIndex : -1;
  const xFor = index => labels.length <= 1 ? padX + chartW / 2 : padX + (index / (labels.length - 1)) * chartW;
  const yFor = value => padTop + chartH - (clamp(Number(value || 0), 0, 100) / 100) * chartH;
  const pathFor = values => {
    const segments = [];
    let current = [];
    values.forEach((value, index) => {
      if (value === null || value === undefined) { if (current.length) segments.push(current); current = []; }
      else current.push({ x: xFor(index), y: yFor(value) });
    });
    if (current.length) segments.push(current);
    return segments.map(points => {
      if (points.length === 1) return `M${points[0].x} ${points[0].y}`;
      return points.reduce((path, point, index) => {
        if (!index) return `M${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
        const prev = points[index - 1];
        const middle = (prev.x + point.x) / 2;
        return `${path} C${middle.toFixed(1)} ${prev.y.toFixed(1)}, ${middle.toFixed(1)} ${point.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      }, "");
    }).join(" ");
  };
  const grid = [0, 25, 50, 75, 100].map(value => `<g><line x1="${padX}" y1="${yFor(value)}" x2="${width-padX}" y2="${yFor(value)}"></line><text x="${padX-7}" y="${yFor(value)+4}" text-anchor="end">${value}</text></g>`).join("");
  const xLabels = labels.map((label, index) => `<text class="${index === todayIndex ? "today" : ""}" x="${xFor(index)}" y="${height-10}" text-anchor="middle">${escapeHTML(label)}</text>`).join("");
  const lines = series.map(item => `<path class="wellbeing-line ${item.className}" d="${pathFor(item.values)}"></path>`).join("");
  const dots = series.map(item => item.values.map((value,index) => value === null || value === undefined ? "" : `<circle class="wellbeing-dot ${item.className}" cx="${xFor(index)}" cy="${yFor(value)}" r="${index === todayIndex ? 5 : 4}"></circle>`).join("")).join("");
  const legend = series.map(item => `<span class="${item.className}">${escapeHTML(item.label)}</span>`).join("");
  return `<div class="trend-panel wellbeing-trend-panel">
    <div class="trend-panel-head"><div><h3>Wochenverlauf</h3><small>0–100 als gemeinsame Darstellungsskala; keine Gesamtwertung</small></div><div class="trend-legend wellbeing-legend">${legend}</div></div>
    <div class="trend-chart-scroll"><svg class="trend-chart wellbeing-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Verlauf von Energie, Belastung und Pflichtgebeten">
      <g class="trend-grid">${grid}</g>${lines}<g>${dots}</g><g class="trend-x-labels">${xLabels}</g>
    </svg></div>
  </div>`;
}

function dailyAverageEnergy(data) {
  const values = (data.stateCheckins || []).filter(entry => entry.slot !== "night" && entry.energy !== null && entry.energy !== undefined).map(entry => Number(entry.energy));
  return values.length ? Math.round(values.reduce((sum,value)=>sum+value,0)/values.length) : null;
}

function dailyAverageLoad(data) {
  const values = (data.stateCheckins || []).filter(entry => entry.slot !== "night").map(entry => ({ low: 25, normal: 55, high: 85 }[entry.load] ?? 55));
  return values.length ? Math.round(values.reduce((sum,value)=>sum+value,0)/values.length) : null;
}

function dailyPrayerProgress(data) {
  const states = PRAYERS.map(prayer => data.prayers?.[prayer] || "");
  if (!states.some(Boolean)) return { value: null, count: null };
  const count = states.filter(prayerWasPerformed).length;
  return { value: Math.round(count / PRAYERS.length * 100), count };
}

function renderStats() {
  if (!currentData) return;
  const dates = weekDates();
  const reviews = dates.map(date => ({ date, data: loadReview(date), stored: Boolean(localStorage.getItem(storageKey(date))) }));
  const labels = dates.map(date => new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${date}T12:00:00`)).replace(".", ""));
  const energy = reviews.map(item => item.stored ? dailyAverageEnergy(item.data) : null);
  const load = reviews.map(item => item.stored ? dailyAverageLoad(item.data) : null);
  const prayers = reviews.map(item => item.stored ? dailyPrayerProgress(item.data).value : null);
  const prayerCounts = reviews.map(item => item.stored ? dailyPrayerProgress(item.data).count : null);
  $("weekLabel").textContent = `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`;
  $("statsGrid").innerHTML = `
    ${buildWeeklyTrendChart(labels, [
      { label: "Energie", className: "energy", values: energy },
      { label: "Belastung", className: "load", values: load },
      { label: "Pflichtgebete", className: "prayers", values: prayers }
    ], { todayIndex: dates.indexOf(todayISO()) })}
    <div class="prayer-progress-row" aria-label="Pflichtgebete pro Tag">
      ${labels.map((label,index) => `<div><small>${escapeHTML(label)}</small><strong>${prayerCounts[index] === null ? "–" : `${prayerCounts[index]}/5`}</strong></div>`).join("")}
    </div>
    <div class="week-mode-strip">
      ${reviews.map((item,index) => {
        const latest = latestStateCheckin(item.data);
        const framework = latest ? frameworkForCheckin(latest, item.data) : null;
        return `<div><small>${escapeHTML(labels[index])}</small><span style="--mode-color:${framework?.color || "#A7ACB7"}">${framework ? escapeHTML(framework.label.replace(" Modus", "")) : "–"}</span></div>`;
      }).join("")}
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
    schemaVersion: 5,
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
    "Checkins_Anzahl", "Letzter_Checkin", "Empfohlener_Rollenmodus", "Gewählter_Rollenmodus", "Abweichungsbegründung", "Energie", "Gefühl", "Belastung", "Kontextnotiz",
    "Dankbarkeit", "Bewusste_Wahrnehmung", "Name_Allahs",
    "Wichtigste_Verantwortung", "Anpassung_oder_Vermeidung", "Nächster_verantwortlicher_Schritt",
    ...STREAKS.flatMap(streak => [`${streak.label}_Tage`, `${streak.label}_Heute`]), "Aktivitäten", "Notizen"
  ];
  const lines = [headers.map(csvEscape).join(";")];
  getAllReviews().forEach(({ date, data }) => {
    const activities = (data.activities || []).map(activity => `${activity.title} | ${activity.role}`).join(" / ");
    const latest = latestStateCheckin(data);
    const framework = frameworkForCheckin(latest, data);
    const recommended = latest ? recommendedFrameworkForCheckin(latest, data) : null;
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
      data.stateCheckins?.length || 0, latest ? checkinSlot(latest.slot).label : "", recommended?.label || "", framework?.label || "", latest?.frameworkOverrideReason || "", latest?.energy ?? "", latest?.emotion || "", LOAD_OPTIONS[latest?.load]?.label || "", latest?.note || "",
      data.gratitude1, data.gratitude2, data.allahName,
      data.responsibilityMain, data.responsibilityAdaptation, data.responsibilityNextStep,
      ...STREAKS.flatMap(streak => [Number(data.streaks?.[streak.key]?.days || 0), data.streaks?.[streak.key]?.todayStatus || ""]), activities, data.notes
    ];
    lines.push(row.map(csvEscape).join(";"));
  });
  downloadTextFile(`roleplay-export-${todayISO()}.csv`, `﻿${lines.join("\r\n")}`, "text/csv;charset=utf-8");
  $("backupStatus").textContent = "CSV-Export mit Check-ins, Gebeten und Reflexion wurde erstellt.";
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
    const framework = frameworkForCheckin(latestState, data);
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
    const routineLabel = state => TASK_STATE_META[state]?.short || "Offen";
    const prayerLine = name => {
      const state = data.prayers?.[name] || "";
      return `${name.replace("ʿ", "")}: ${prayerStateMeta(state).short}`;
    };
    const meal = (label, key) => mealSummary(data, key, label);
    const compactWrap = value => pdfWrapText(value || "-", 31, 5);
    const noteLines = pdfWrapText(data.notes || "-", 31, 55);
    const reflexionLines = [
      ...compactWrap(`Gefühl: ${latestState?.emotion || '-'}`),
      ...compactWrap(`Träume: ${dreamCategoryLabel(data.dreamCategory || "")}${data.dreams ? ` · ${data.dreams}` : ""}`),
      ...compactWrap(`Dankbar: ${[data.gratitude1, data.gratitude2].filter(Boolean).join(' / ') || '-'}`),
      ...compactWrap(`Allah: ${latinAllahName(data.allahName) || '-'}`),
      ...noteLines.map((value, noteIndex) => `${noteIndex === 0 ? 'Notiz: ' : ''}${value}`)
    ];
    const activityLines = (data.activities || []).length
      ? (data.activities || []).slice(0, 18).flatMap(entry => pdfWrapText(`- ${entry.title}${entry.role ? ` (${entry.role})` : ""}`, 31, 3))
      : ["- Keine Aktivitäten"];
    const streakLines = STREAKS.map(streak => `${streak.label.replace("frei", "")}: ${Number(data.streaks?.[streak.key]?.days || 0)} / ${STREAK_DAILY_STATES[data.streaks?.[streak.key]?.todayStatus || ""]?.short || "Offen"}`);
    const stateLines = latestState && framework ? [
      `Modus: ${framework.label}${framework.isOverride ? " (angepasst)" : ""}`,
      `Check-in: ${checkinSlot(latestState.slot).label} / ${latestState.time}`,
      latestState.slot === "night" ? `Schlaf: ${SLEEP_LABELS[Number(latestState.sleepQualityScore)] || '-'}` : `Energie: ${latestState.energy ?? '-'}%`,
      latestState.slot === "night" ? `Traum: ${dreamCategoryLabel(latestState.dreamCategory || '')}` : `Gefühl: ${latestState.emotion || '-'}`,
      latestState.slot === "night" ? `Traumnotiz: ${latestState.dreamNote || '-'}` : `Belastung: ${LOAD_OPTIONS[latestState.load]?.label || '-'}`,
      `Kontext: ${latestState.note || '-'}`,
      framework.isOverride ? `Begründung: ${latestState.frameworkOverrideReason || '-'}` : `Empfehlung übernommen`
    ] : ["Noch kein Check-in"];
    const responsibilityLines = [
      `Wichtigste Verantwortung: ${data.responsibilityMain || '-'}`,
      `Anpassung / Vermeidung: ${data.responsibilityAdaptation || '-'}`,
      `Nächster Schritt: ${data.responsibilityNextStep || '-'}`
    ];

    const sections = [
      {
        title: "Vitalität",
        lines: [
          meal("Frühstück", "breakfast"),
          meal("Mittag", "lunch"),
          meal("Abend", "dinner"),
          meal("Snack", "snack"),
          `Getrunken: ${(Number(data.water || 0) / 1000).toFixed(1).replace('.', ',')} L`,
          `Schritte: ${data.steps ? Number(data.steps).toLocaleString('de-DE') : '-'}`
        ],
        height: 62
      },
      {
        title: "Zustand",
        lines: stateLines,
        height: 84
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
        lines: [...PRAYERS.map(prayerLine), `Sunnah: ${SUNNAH_PRAYERS.filter(prayer => data.sunnahPrayers?.[prayer] === "Verrichtet").length}`],
        height: 62
      },
      {
        title: "Verantwortung",
        lines: responsibilityLines,
        height: 92
      },
      {
        title: "Reflexion",
        lines: reflexionLines,
        height: 199,
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
  const meals = data => [
    mealSummary(data, "breakfast", "F"), mealSummary(data, "lunch", "M"), mealSummary(data, "dinner", "A"), mealSummary(data, "snack", "S")
  ].filter(value => !value.endsWith(": -")).join(" / ") || "-";
  const routineState = state => TASK_STATE_META[state]?.icon || "○";
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
    { label: "Rollenmodus", values: value(data => { const framework = frameworkForCheckin(latestStateCheckin(data), data); return framework ? framework.label : "-"; }), maxChars: 18, fontSize: 4.8 },
    { label: "Energie", values: value(data => { const latest = latestStateCheckin(data); return latest?.energy === null || latest?.energy === undefined ? "-" : `${latest.energy}%`; }) },
    { label: "Belastung", values: value(data => { const latest = latestStateCheckin(data); return LOAD_OPTIONS[latest?.load]?.label || "-"; }) },
    { label: "Gefühl", values: value(data => latestStateCheckin(data)?.emotion || "-") },
    { label: "Dankbarkeit", values: value(data => data.gratitude1 || "-"), maxChars: 24, fontSize: 4.8 },
    { label: "Achtsamkeit", values: value(data => data.gratitude2 || "-"), maxChars: 24, fontSize: 4.8 },
    { label: "Nächster Schritt", values: value(data => data.responsibilityNextStep || "-"), maxChars: 24, fontSize: 4.8 },
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

function updateMealSelectionStyles() {
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const entry = document.querySelector(`[data-meal-entry="${key}"]`);
    const select = $(`${key}Category`);
    if (!entry || !select) return;
    entry.classList.toggle("is-selected", Boolean(select.value));
    entry.classList.toggle("meal-none", select.value === "none");
  });
}

function mealCategoryOptionsHTML() {
  return Object.entries(MEAL_CATEGORY_META).map(([value, meta]) => `<option value="${escapeHTML(value)}">${escapeHTML(meta.label)}</option>`).join("");
}

function initOptions() {
  const roleOptions = ROLES.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("dayRole").innerHTML = roleOptions;
  $("activityRole").innerHTML = roleOptions;
  $("stateSlot").innerHTML = CHECKIN_SLOTS.map(slot => `<option value="${slot.key}">${slot.icon} ${escapeHTML(slot.label)}</option>`).join("");
  populateStateCheckinEmotion();
  $("stateSelectedFramework").innerHTML = FRAMEWORKS.map(item => `<option value="${item.key}">${escapeHTML(item.label)}</option>`).join("");
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => { if ($(`${key}Category`)) $(`${key}Category`).innerHTML = mealCategoryOptionsHTML(); });
  if ($("stateDreamCategory")) $("stateDreamCategory").innerHTML = DREAM_CATEGORIES.map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`).join("");
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
  ["stateEnergy", "stateEmotion", "stateDreamCategory", "stateDreamNote", "stateNote", "stateFrameworkReason"].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener(["stateEnergy", "stateDreamNote", "stateNote", "stateFrameworkReason"].includes(id) ? "input" : "change", () => updateStateCheckinPreview());
  });
  $("stateSelectedFramework").addEventListener("change", () => {
    $("stateCheckinDialog").dataset.frameworkManuallySelected = "true";
    updateStateCheckinPreview();
  });
  document.querySelectorAll("[data-state-load]").forEach(button => button.addEventListener("click", () => {
    renderLoadChoices(button.dataset.stateLoad);
    updateStateCheckinPreview();
  }));
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
