
const PRAYERS = ["Fajr","Dhuhr","ʿAsr","Maghrib","ʿIschāʾ"];
const PRAYER_STATES = ["","Normal","Gemeinschaft","Verspätet","Nachgeholt","Nicht gebetet"];
const ROLES = [
  {name:"Ich-Person", emoji:"🫆", color:"#54b7ff"},
  {name:"Vitalist", emoji:"🧬", color:"#234eae"},
  {name:"Unternehmer", emoji:"💰", color:"#f5c622"},
  {name:"Absolvent", emoji:"🎓", color:"#d92f38"},
  {name:"Muslim", emoji:"🕋", color:"#31c9c2"},
  {name:"Wirt", emoji:"🏡", color:"#ff2a2a"},
  {name:"Familienmensch", emoji:"💌", color:"#32a852"}
];
const STREAKS = [
  {key:"cannabisFree", label:"Cannabis"},
  {key:"compulsionFree", label:"Zwang"},
  {key:"alcoholFree", label:"Alkohol"},
  {key:"smokeFree", label:"Zigaretten"}
];
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

const $ = id => document.getElementById(id);
let selectedDate = todayISO();
let currentData = null;

function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}
function addDays(iso, amount) {
  const d = new Date(iso+"T12:00:00");
  d.setDate(d.getDate()+amount);
  return d.toISOString().slice(0,10);
}
function storageKey(date){ return `roleplay-review-${date}`; }
function emptyReview() {
  return {
    breakfast:"", lunch:"", dinner:"", snack:"",
    water:"0", steps:"",
    morningRoutine:false, eveningRoutine:false,
    prayers:Object.fromEntries(PRAYERS.map(p=>[p,""])),
    ramadanDays:-29,
    sleepQuality:"",
    dreams:"",
    activities:[],
    streaks:Object.fromEntries(STREAKS.map(s=>[s.key,{days:0,broken:false}])),
    mood:"",
    gratitude1:"", gratitude2:"", allahName:"",
    notes:""
  };
}
function findPreviousStreaks(date) {
  let cursor = date;
  for (let i = 0; i < 3650; i++) {
    cursor = addDays(cursor, -1);
    const rawText = localStorage.getItem(storageKey(cursor));
    if (!rawText) continue;
    try {
      const raw = JSON.parse(rawText);
      if (!raw.streaks) continue;
      const inherited = {};
      STREAKS.forEach(s => {
        const old = raw.streaks[s.key];
        const previousDays = typeof old === "object" && old !== null
          ? Number(old.days || 0)
          : 0;
        const wasBroken = typeof old === "object" && old !== null
          ? Boolean(old.broken || old.status === "broken")
          : false;

        inherited[s.key] = {
          days: wasBroken ? 0 : previousDays + 1,
          broken: false
        };
      });
      return inherited;
    } catch {}
  }
  return Object.fromEntries(STREAKS.map(s => [s.key, {days:0,broken:false}]));
}

function loadReview(date) {
  try {
    const rawText = localStorage.getItem(storageKey(date));
    const raw = rawText ? JSON.parse(rawText) : {};
    const base = emptyReview();

    if (!rawText) {
      base.streaks = findPreviousStreaks(date);
    }

    const merged = {...base, ...raw};
    merged.prayers = {...emptyReview().prayers, ...(raw.prayers || {})};
    merged.streaks = {...base.streaks};

    STREAKS.forEach(s => {
      const old = raw.streaks?.[s.key];
      if (typeof old === "object" && old !== null) {
        merged.streaks[s.key] = {
          days:Number(old.days || 0),
          broken:Boolean(old.broken || old.status === "broken")
        };
      } else {
        merged.streaks[s.key] = merged.streaks[s.key] || {days:0,broken:false};
      }
    });

    return merged;
  } catch {
    return emptyReview();
  }
}
function saveReview(silent=false) {
  collectForm();
  localStorage.setItem(storageKey(selectedDate), JSON.stringify(currentData));
  renderStats();
  if(!silent) {
    const btn=$("saveButton");
    const old=btn.textContent;
    btn.textContent="✓ Gespeichert";
    setTimeout(()=>btn.textContent=old,1000);
  }
}
function formatDate(iso) {
  return new Intl.DateTimeFormat("de-DE",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(new Date(iso+"T12:00:00"));
}
function setDate(date) {
  selectedDate=date;
  currentData=loadReview(date);
  $("dateButton").textContent=formatDate(date);
  $("datePicker").value=date;
  fillForm();
  renderStats();
}
function fillForm() {
  ["breakfast","lunch","dinner","snack","water","steps","ramadanDays","dreams","gratitude1","gratitude2","allahName","notes"].forEach(id=>{
    if($(id)) $(id).value=currentData[id] ?? "";
  });
  $("morningRoutine").checked=!!currentData.morningRoutine;
  $("eveningRoutine").checked=!!currentData.eveningRoutine;
  updateRamadanDisplay();
  renderPrayers();
  renderActivities();
  renderStreaks();
  document.querySelectorAll("#moodGrid button").forEach(b=>b.classList.toggle("active",b.dataset.value===currentData.mood));
  document.querySelectorAll("#sleepGrid button").forEach(b=>b.classList.toggle("active",b.dataset.value===currentData.sleepQuality));
}
function collectForm() {
  ["breakfast","lunch","dinner","snack","water","steps","ramadanDays","dreams","gratitude1","gratitude2","allahName","notes"].forEach(id=>currentData[id]=$(id).value);
  currentData.morningRoutine=$("morningRoutine").checked;
  currentData.eveningRoutine=$("eveningRoutine").checked;
}
function renderPrayers() {
  $("prayerList").innerHTML=PRAYERS.map(p=>`
    <div class="prayer-row">
      <strong>${p}</strong>
      <select data-prayer="${p}">
        ${PRAYER_STATES.map(s=>`<option value="${s}" ${currentData.prayers?.[p]===s?"selected":""}>${s || "Noch nicht eingetragen"}</option>`).join("")}
      </select>
    </div>`).join("");
  document.querySelectorAll("[data-prayer]").forEach(sel=>sel.onchange=()=>{
    currentData.prayers[sel.dataset.prayer]=sel.value; saveReview(true);
  });
}
function renderActivities() {
  $("activityList").innerHTML=(currentData.activities||[]).map((a,i)=>{
    const r=ROLES.find(x=>x.name===a.role)||ROLES[0];
    return `<div class="activity-row">
      <div class="activity-main">
        <span class="role-dot" style="background:${r.color}"></span>
        <div class="activity-copy"><strong>${r.emoji} ${escapeHTML(a.title)}</strong><small>${a.role} · ${a.minutes} Min.</small></div>
      </div>
      <button class="delete-button" data-delete-activity="${i}">🗑️</button>
    </div>`;
  }).join("");
  document.querySelectorAll("[data-delete-activity]").forEach(b=>b.onclick=()=>{
    currentData.activities.splice(Number(b.dataset.deleteActivity),1); saveReview(true); renderActivities();
  });
}
function renderStreaks() {
  $("streakList").innerHTML = STREAKS.map(s => {
    const state = currentData.streaks?.[s.key] || {days:0,broken:false};

    return `<div class="streak-card ${state.broken ? "streak-broken" : ""}">
      <div class="streak-card-head">
        <strong>${s.label}</strong>
        <span>${state.broken ? "Unterbrochen" : "Aktueller Stand"}</span>
      </div>

      <div class="streak-input-wrap">
        <input
          class="streak-days-large"
          type="number"
          min="0"
          inputmode="numeric"
          data-streak-days="${s.key}"
          value="${Number(state.days || 0)}"
          aria-label="${s.label} Tage"
        >
        <span class="streak-unit">Tage</span>
      </div>

      <button
        type="button"
        class="break-button-large ${state.broken ? "active" : ""}"
        data-break-streak="${s.key}">
        Unterbrechen
      </button>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-streak-days]").forEach(inp => {
    inp.oninput = () => {
      const state = currentData.streaks[inp.dataset.streakDays];
      state.days = Math.max(0, Number(inp.value || 0));
      state.broken = false;
      saveReview(true);
    };
  });

  document.querySelectorAll("[data-break-streak]").forEach(btn => {
    btn.onclick = () => {
      const state = currentData.streaks[btn.dataset.breakStreak];
      state.days = 0;
      state.broken = true;
      saveReview(true);
      renderStreaks();
    };
  });
}


function weekDates() {
  const base=new Date(selectedDate+"T12:00:00");
  const day=(base.getDay()+6)%7;
  const monday=new Date(base); monday.setDate(base.getDate()-day);
  return Array.from({length:7},(_,i)=>{
    const d=new Date(monday); d.setDate(monday.getDate()+i);
    return d.toISOString().slice(0,10);
  });
}

function renderStats() {
  const dates=weekDates();
  const reviews=dates.map(loadReview);
  const prayers=reviews.reduce((n,d)=>n+PRAYERS.filter(p=>d.prayers?.[p] && d.prayers[p]!=="Nicht gebetet").length,0);
  const morning=reviews.filter(d=>d.morningRoutine).length;
  const evening=reviews.filter(d=>d.eveningRoutine).length;
  const ramadan=Number(currentData.ramadanDays || 0);

  const topStats = [
    [prayers+"/35","Gebete"],
    [morning+"/7","Morgenroutine"],
    [evening+"/7","Abendroutine"],
    [ramadan < 0 ? Math.abs(ramadan)+" offen" : ramadan === 0 ? "0 offen" : ramadan+" zusätzlich",
     "Ramadan", ramadan < 0 ? "negative" : "positive"]
  ];

  const topHtml = topStats.map(([v,l,c=""])=>`
    <div class="stat ${c}">
      <strong>${v}</strong>
      <span>${l}</span>
    </div>`).join("");
$("statsGrid").innerHTML = `<div class="stats-top">${topHtml}</div>`;
}
function updateRamadanDisplay(){
  const n=Number(currentData.ramadanDays||0);
  const el=$("ramadanDisplay");
  if(n<0){
    el.textContent=`${Math.abs(n)} Tage offen`;
    el.className="ramadan-negative";
  } else if(n===0){
    el.textContent="Keine Tage offen";
    el.className="ramadan-zero";
  } else {
    el.textContent=`${n} zusätzliche Fastentage`;
    el.className="ramadan-positive";
  }
}
function getAllReviews() {
  const reviews = [];
  for (let i=0; i<localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith("roleplay-review-")) continue;
    const date = key.replace("roleplay-review-","");
    try {
      reviews.push({date, data:JSON.parse(localStorage.getItem(key))});
    } catch {}
  }
  return reviews.sort((a,b)=>a.date.localeCompare(b.date));
}

function downloadTextFile(filename, text, type="application/json") {
  const blob = new Blob([text], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function exportBackup() {
  saveReview(true);
  const payload = getBackupPayload();
  downloadTextFile(
    `roleplay-backup-${todayISO()}.json`,
    JSON.stringify(payload,null,2)
  );
  localStorage.setItem("roleplay-last-backup-at", payload.exportedAt);
  const status = $("backupStatus");
  if (status) {
    status.textContent = `Letztes Backup: ${new Intl.DateTimeFormat("de-DE",{
      dateStyle:"medium", timeStyle:"short"
    }).format(new Date(payload.exportedAt))}`;
  }
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      if (!payload || !Array.isArray(payload.reviews)) {
        throw new Error("Ungültiges Backup");
      }

      const validReviews = payload.reviews.filter(item =>
        item && typeof item.date === "string" && item.data && typeof item.data === "object"
      );

      if (!validReviews.length && payload.reviews.length) {
        throw new Error("Keine gültigen Einträge");
      }

      if (!confirm(`${validReviews.length} Tagesreviews importieren? Vorhandene Einträge mit demselben Datum werden ersetzt.`)) {
        return;
      }

      validReviews.forEach(item => {
        localStorage.setItem(storageKey(item.date), JSON.stringify(item.data));
      });

      localStorage.setItem("roleplay-last-import-at", new Date().toISOString());
      setDate(selectedDate);

      const status = $("backupStatus");
      if (status) status.textContent = `${validReviews.length} Tagesreviews erfolgreich importiert.`;
      alert("Backup wurde erfolgreich importiert.");
    } catch {
      alert("Diese Datei ist kein gültiges Roleplay-Backup.");
    }
  };
  reader.readAsText(file);
}

function pdfValue(value, fallback="–") {
  if (value === true) return "Ja";
  if (value === false) return "Nein";
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function buildPdfDocument() {
  saveReview(true);
  const reviews=getAllReviews();
  const rows=reviews.map(({date,data})=>{
    const prayerText=PRAYERS.map(p=>`${p}: ${pdfValue(data.prayers?.[p],"Nicht eingetragen")}`).join("<br>");
    const activities=(data.activities||[]).map(a=>`${escapeHTML(a.title)} (${escapeHTML(a.role)}, ${a.minutes} Min.)`).join("<br>") || "–";
    const streakText=STREAKS.map(s=>{
      const st=data.streaks?.[s.key] || {};
      const status=st.broken ? "unterbrochen" : "aktiv";
      return `${s.label}: ${Number(st.days||0)} Tage (${status})`;
    }).join("<br>");
    const meals=[data.breakfast,data.lunch,data.dinner,data.snack].filter(Boolean).map(escapeHTML).join("<br>") || "–";
    return `<section class="pdf-day">
      <h2>${formatDate(date)}</h2>
      <div class="pdf-grid">
        <div><b>Vitalität</b><br>Mahlzeiten: ${meals}<br>Wasser: ${(Number(data.water||0)/1000).toFixed(1)} L<br>Schritte: ${Number(data.steps||0).toLocaleString("de-DE")}</div>
        <div><b>Routinen</b><br>Morgen: ${pdfValue(data.morningRoutine)}<br>Abend: ${pdfValue(data.eveningRoutine)}</div>
        <div><b>Islam</b><br>${prayerText}<br>Ramadan: ${Math.abs(Math.min(0,Number(data.ramadanDays||0)))} Tage offen</div>
        <div><b>Schlaf</b><br>Qualität: ${pdfValue(data.sleepQuality)}<br>Träume: ${escapeHTML(pdfValue(data.dreams))}</div>
        <div><b>Aktivitäten</b><br>${activities}</div>
        <div><b>Streaks</b><br>${streakText}</div>
        <div><b>Achtsamkeit</b><br>Stimmung: ${pdfValue(data.mood)}<br>Dankbarkeit 1: ${escapeHTML(pdfValue(data.gratitude1))}<br>Dankbarkeit 2: ${escapeHTML(pdfValue(data.gratitude2))}<br>Name Allahs: ${escapeHTML(pdfValue(data.allahName))}</div>
        <div><b>Tagesnotiz</b><br>${escapeHTML(pdfValue(data.notes))}</div>
      </div>
    </section>`;
  }).join("");

  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
    <title>Roleplay Export ${todayISO()}</title>
    <style>
      @page { size:A4; margin:14mm; }
      body { font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif; color:#111; font-size:10.5pt; }
      h1 { margin:0 0 4px; font-size:22pt; }
      .meta { color:#666; margin-bottom:18px; }
      .pdf-day { break-inside:avoid; page-break-inside:avoid; border-top:1px solid #bbb; padding:12px 0 16px; }
      .pdf-day h2 { font-size:15pt; margin:0 0 9px; }
      .pdf-grid { display:grid; grid-template-columns:1fr 1fr; gap:9px 14px; }
      .pdf-grid > div { line-height:1.45; overflow-wrap:anywhere; }
      b { font-weight:700; }
      @media print { .pdf-day { break-inside:avoid; } }
    </style></head><body>
    <h1>Roleplay Tagesreview</h1>
    <div class="meta">Exportiert am ${new Intl.DateTimeFormat("de-DE",{dateStyle:"long",timeStyle:"short"}).format(new Date())} · ${reviews.length} Tage</div>
    ${rows || "<p>Noch keine Einträge vorhanden.</p>"}
    </body></html>`;
}

function exportPdf() {
  const printWindow=window.open("","_blank");
  if (!printWindow) {
    alert("Bitte erlaube Pop-ups, damit der PDF-Export geöffnet werden kann.");
    return;
  }
  printWindow.document.open();
  printWindow.document.write(buildPdfDocument());
  printWindow.document.close();
  printWindow.onload=()=>setTimeout(()=>printWindow.print(),300);
}


function csvEscape(value) {
  const text = value === undefined || value === null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function exportCsv() {
  saveReview(true);
  const reviews = getAllReviews();

  const headers = [
    "Datum",
    "Frühstück","Mittagessen","Abendessen","Snack",
    "Wasser_ml","Schritte",
    "Morgenroutine","Abendroutine",
    "Fajr","Dhuhr","Asr","Maghrib","Ishaa",
    "Ramadan_Tage",
    "Schlafqualität","Träume",
    "Stimmung","Dankbarkeit_1","Dankbarkeit_2","Name_Allahs",
    "Cannabis_Tage","Cannabis_Status",
    "Zwang_Tage","Zwang_Status",
    "Alkohol_Tage","Alkohol_Status",
    "Zigaretten_Tage","Zigaretten_Status",
    "Aktivitäten","Notizen"
  ];

  const lines = [headers.map(csvEscape).join(";")];

  reviews.forEach(({date,data}) => {
    const activities = (data.activities || [])
      .map(a => `${a.title || ""} | ${a.role || ""} | ${Number(a.minutes || 0)} Min.`)
      .join(" / ");

    const streak = key => data.streaks?.[key] || {days:0,status:"open"};

    const row = [
      date,
      data.breakfast, data.lunch, data.dinner, data.snack,
      Number(data.water || 0), Number(data.steps || 0),
      data.morningRoutine ? "Ja" : "Nein",
      data.eveningRoutine ? "Ja" : "Nein",
      data.prayers?.Fajr || "",
      data.prayers?.Dhuhr || "",
      data.prayers?.Asr || "",
      data.prayers?.Maghrib || "",
      data.prayers?.Ishaa || "",
      Number(data.ramadanDays || 0),
      data.sleepQuality || "",
      data.dreams || "",
      data.mood || "",
      data.gratitude1 || "",
      data.gratitude2 || "",
      data.allahName || "",
      Number(streak("cannabis").days || 0), streak("cannabis").broken ? "unterbrochen" : "aktiv",
      Number(streak("zwang").days || 0), streak("zwang").broken ? "unterbrochen" : "aktiv",
      Number(streak("alcohol").days || 0), streak("alcohol").broken ? "unterbrochen" : "aktiv",
      Number(streak("cigarettes").days || 0), streak("cigarettes").broken ? "unterbrochen" : "aktiv",
      activities,
      data.notes || ""
    ];

    lines.push(row.map(csvEscape).join(";"));
  });

  const bom = "\ufeff";
  downloadTextFile(
    `roleplay-export-${todayISO()}.csv`,
    bom + lines.join("\r\n"),
    "text/csv;charset=utf-8"
  );

  const status = $("backupStatus");
  if (status) status.textContent = `CSV-Export erstellt: ${reviews.length} Tagesreviews.`;
}

function getBackupPayload() {
  return {
    app:"Roleplay Tagesreview",
    version:"1.5",
    schemaVersion:2,
    exportedAt:new Date().toISOString(),
    reviews:getAllReviews()
  };
}

function escapeHTML(s=""){ return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c])); }

function updateHeaderCompactState() {
  document.querySelector(".app-header")?.classList.toggle("compact", window.scrollY > 80);
}

function init() {
  $("allahName").innerHTML='<option value="">Bitte auswählen …</option>'+ALLAH_NAMES.map(n=>`<option>${n}</option>`).join("");
  $("activityRole").innerHTML=ROLES.map(r=>`<option value="${r.name}">${r.emoji} ${r.name}</option>`).join("");

  $("prevDay").onclick=()=>setDate(addDays(selectedDate,-1));
  $("nextDay").onclick=()=>setDate(addDays(selectedDate,1));
  $("dateButton").onclick=()=>$("datePicker").showPicker?.() || $("datePicker").click();
  $("datePicker").onchange=e=>setDate(e.target.value);
  $("saveButton").onclick=()=>saveReview(false);

  document.querySelectorAll("input,select,textarea").forEach(el=>{
    if(!el.closest("#activityDialog") && el.id!=="datePicker") {
      el.addEventListener("change",()=>saveReview(true));
      el.addEventListener("input",()=>{collectForm();});
    }
  });

  document.querySelectorAll("#moodGrid button").forEach(b=>b.onclick=()=>{
    currentData.mood=b.dataset.value;
    document.querySelectorAll("#moodGrid button").forEach(x=>x.classList.toggle("active",x===b));
    saveReview(true);
  });
  document.querySelectorAll("#sleepGrid button").forEach(b=>b.onclick=()=>{
    currentData.sleepQuality=b.dataset.value;
    document.querySelectorAll("#sleepGrid button").forEach(x=>x.classList.toggle("active",x===b));
    saveReview(true);
  });
  $("ramadanComplete").onclick=()=>{
    currentData.ramadanDays=Number(currentData.ramadanDays||0)+1;
    $("ramadanDays").value=currentData.ramadanDays;
    updateRamadanDisplay();
    saveReview(true);
  };
  $("ramadanDays").oninput=()=>{
    currentData.ramadanDays=Number($("ramadanDays").value||0);
    updateRamadanDisplay();
    saveReview(true);
  };

  $("exportPdf").onclick=exportPdf;
  $("exportBackup").onclick=exportBackup;
  $("exportCsv").onclick=exportCsv;
  $("importBackupButton").onclick=()=>$("importBackupInput").click();
  $("importBackupInput").onchange=e=>{
    const file=e.target.files?.[0];
    if(file) importBackup(file);
    e.target.value="";
  };

  $("addActivity").onclick=()=>$("activityDialog").showModal();
  $("confirmActivity").onclick=e=>{
    const title=$("activityTitle").value.trim();
    if(!title){ e.preventDefault(); return; }
    currentData.activities.push({
      title,
      role:$("activityRole").value,
      minutes:Number($("activityMinutes").value||30)
    });
    $("activityTitle").value="";
    saveReview(true); renderActivities();
  };

  const lastBackupAt = localStorage.getItem("roleplay-last-backup-at");
  if (lastBackupAt && $("backupStatus")) {
    $("backupStatus").textContent = `Letztes Backup: ${new Intl.DateTimeFormat("de-DE",{
      dateStyle:"medium", timeStyle:"short"
    }).format(new Date(lastBackupAt))}`;
  }

  window.addEventListener("scroll", updateHeaderCompactState, {passive:true});
  updateHeaderCompactState();

  setDate(todayISO());
  if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
}
document.addEventListener("DOMContentLoaded",init);
