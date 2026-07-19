
const PRAYERS = ["Fajr","Dhuhr","ʿAsr","Maghrib","ʿIschāʾ"];
const PRAYER_STATES = ["Normal","Gemeinschaft","Verspätet","Nachgeholt","Nicht gebetet"];
const ROLES = [
  {name:"Ich-Person", emoji:"🌀", color:"#54b7ff"},
  {name:"Vitalist", emoji:"🧬", color:"#234eae"},
  {name:"Unternehmer", emoji:"💰", color:"#f5c622"},
  {name:"Absolvent", emoji:"🎓", color:"#d92f38"},
  {name:"Muslim", emoji:"🕋", color:"#31c9c2"},
  {name:"Wirt", emoji:"🏡", color:"#ff2a2a"},
  {name:"Familienmensch", emoji:"💌", color:"#32a852"}
];
const STREAKS = [
  {key:"smokeFree", label:"🚭 Rauchfrei"},
  {key:"cannabisFree", label:"🍁 Cannabisfrei"},
  {key:"abstinence", label:"❤️ Enthaltsamkeit"},
  {key:"alcoholFree", label:"🍺 Alkoholfrei"}
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
    prayers:Object.fromEntries(PRAYERS.map(p=>[p,"Normal"])),
    activities:[],
    streaks:Object.fromEntries(STREAKS.map(s=>[s.key,true])),
    mood:"",
    gratitude1:"", gratitude2:"", allahName:"",
    notes:""
  };
}
function loadReview(date) {
  try { return {...emptyReview(), ...JSON.parse(localStorage.getItem(storageKey(date)) || "{}")}; }
  catch { return emptyReview(); }
}
function saveReview(silent=false) {
  collectForm();
  localStorage.setItem(storageKey(selectedDate), JSON.stringify(currentData));
  updateProgress();
  renderWeek();
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
  renderWeek();
  renderStats();
  updateProgress();
}
function fillForm() {
  ["breakfast","lunch","dinner","snack","water","steps","gratitude1","gratitude2","allahName","notes"].forEach(id=>{
    if($(id)) $(id).value=currentData[id] ?? "";
  });
  $("morningRoutine").checked=!!currentData.morningRoutine;
  $("eveningRoutine").checked=!!currentData.eveningRoutine;
  renderPrayers();
  renderActivities();
  renderStreaks();
  document.querySelectorAll("#moodGrid button").forEach(b=>b.classList.toggle("active",b.dataset.value===currentData.mood));
}
function collectForm() {
  ["breakfast","lunch","dinner","snack","water","steps","gratitude1","gratitude2","allahName","notes"].forEach(id=>currentData[id]=$(id).value);
  currentData.morningRoutine=$("morningRoutine").checked;
  currentData.eveningRoutine=$("eveningRoutine").checked;
}
function renderPrayers() {
  $("prayerList").innerHTML=PRAYERS.map(p=>`
    <div class="prayer-row">
      <strong>${p}</strong>
      <select data-prayer="${p}">
        ${PRAYER_STATES.map(s=>`<option ${currentData.prayers?.[p]===s?"selected":""}>${s}</option>`).join("")}
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
  $("streakList").innerHTML=STREAKS.map(s=>`
    <label class="streak-row">
      <span>${s.label}</span>
      <input type="checkbox" data-streak="${s.key}" ${currentData.streaks?.[s.key]!==false?"checked":""}>
    </label>`).join("");
  document.querySelectorAll("[data-streak]").forEach(c=>c.onchange=()=>{
    currentData.streaks[c.dataset.streak]=c.checked; saveReview(true);
  });
}
function completionScore(data) {
  const checks = [
    data.breakfast||data.lunch||data.dinner||data.snack,
    Number(data.water)>0,
    Number(data.steps)>0,
    data.morningRoutine,
    data.eveningRoutine,
    PRAYERS.every(p=>data.prayers?.[p] && data.prayers[p]!=="Nicht gebetet"),
    (data.activities||[]).length>0,
    STREAKS.every(s=>data.streaks?.[s.key]!==false),
    !!data.mood,
    !!data.gratitude1,
    !!data.gratitude2,
    !!data.allahName,
    !!data.notes
  ];
  return Math.round(checks.filter(Boolean).length/checks.length*100);
}
function updateProgress(){
  collectForm();
  const p=completionScore(currentData);
  $("progressLabel").textContent=`${p} %`;
  $("progressBar").style.width=`${p}%`;
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
function renderWeek() {
  $("weekSummary").innerHTML=weekDates().map(date=>{
    const d=loadReview(date);
    const prayerCount=PRAYERS.filter(p=>d.prayers?.[p] && d.prayers[p]!=="Nicht gebetet").length;
    const streakCount=STREAKS.filter(s=>d.streaks?.[s.key]!==false).length;
    return `<div class="week-day" data-date="${date}">
      <div class="week-date"><strong>${new Intl.DateTimeFormat("de-DE",{weekday:"short"}).format(new Date(date+"T12:00:00"))}</strong><small>${date.slice(8,10)}.${date.slice(5,7)}.</small></div>
      <div class="week-metrics">
        <span class="pill">☀️ ${d.morningRoutine?"✓":"–"}</span>
        <span class="pill">🕋 ${prayerCount}/5</span>
        <span class="pill">💧 ${(Number(d.water)/1000).toFixed(1)} L</span>
        <span class="pill">👣 ${Number(d.steps||0).toLocaleString("de-DE")}</span>
        <span class="pill">🔥 ${streakCount}/4</span>
      </div>
    </div>`;
  }).join("");
  document.querySelectorAll("[data-date]").forEach(el=>el.onclick=()=>setDate(el.dataset.date));
}
function renderStats() {
  const reviews=weekDates().map(loadReview);
  const prayers=reviews.reduce((n,d)=>n+PRAYERS.filter(p=>d.prayers?.[p] && d.prayers[p]!=="Nicht gebetet").length,0);
  const steps=reviews.reduce((n,d)=>n+Number(d.steps||0),0);
  const water=reviews.reduce((n,d)=>n+Number(d.water||0),0);
  const morning=reviews.filter(d=>d.morningRoutine).length;
  const evening=reviews.filter(d=>d.eveningRoutine).length;
  const streakDays=reviews.reduce((n,d)=>n+(STREAKS.every(s=>d.streaks?.[s.key]!==false)?1:0),0);
  const stats=[
    [prayers+"/35","Gebete"],
    [steps.toLocaleString("de-DE"),"Schritte"],
    [(water/1000).toFixed(1)+" L","Wasser"],
    [morning+"/7","Morgenroutine"],
    [evening+"/7","Abendroutine"],
    [streakDays+"/7","Alle Streaks"]
  ];
  $("statsGrid").innerHTML=stats.map(([v,l])=>`<div class="stat"><strong>${v}</strong><span>${l}</span></div>`).join("");
}
function escapeHTML(s=""){ return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c])); }

function init() {
  $("allahName").innerHTML='<option value="">Bitte auswählen …</option>'+ALLAH_NAMES.map(n=>`<option>${n}</option>`).join("");
  $("activityRole").innerHTML=ROLES.map(r=>`<option value="${r.name}">${r.emoji} ${r.name}</option>`).join("");

  $("prevDay").onclick=()=>setDate(addDays(selectedDate,-1));
  $("nextDay").onclick=()=>setDate(addDays(selectedDate,1));
  $("dateButton").onclick=()=>$("datePicker").showPicker?.() || $("datePicker").click();
  $("datePicker").onchange=e=>setDate(e.target.value);
  $("goToday").onclick=()=>setDate(todayISO());
  $("saveButton").onclick=()=>saveReview(false);

  document.querySelectorAll("input,select,textarea").forEach(el=>{
    if(!el.closest("#activityDialog") && el.id!=="datePicker") {
      el.addEventListener("change",()=>saveReview(true));
      el.addEventListener("input",()=>{collectForm(); updateProgress();});
    }
  });

  document.querySelectorAll("#moodGrid button").forEach(b=>b.onclick=()=>{
    currentData.mood=b.dataset.value;
    document.querySelectorAll("#moodGrid button").forEach(x=>x.classList.toggle("active",x===b));
    saveReview(true);
  });

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

  setDate(todayISO());
  if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
}
document.addEventListener("DOMContentLoaded",init);
