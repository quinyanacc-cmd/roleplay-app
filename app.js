/* ==========================================================================
   ROLEPLAY – OBERFLÄCHE (app.js)

   app.js verbindet das Datenmodell aus logic.js mit der Bedienoberfläche.
   Rechenlogik steht ausschließlich in logic.js und wird hier nie wiederholt.

   Grundprinzip ab Version 7: Die App kennt keine vorgegebenen Rollen,
   Routinen, Tracker oder Streaks. Alles, was der Nutzer sieht, stammt aus
   seinem eigenen Profil. Beim ersten Start ist das Profil leer und das
   Onboarding baut es gemeinsam mit ihm auf.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Speicher und Zustand
   -------------------------------------------------------------------------- */

const STORAGE_NAMESPACE = "roleplay-v25";
const REVIEW_PREFIX = `${STORAGE_NAMESPACE}-review-`;
const PROFILE_STORAGE_KEY = `${STORAGE_NAMESPACE}-profile`;
const ROUTINES_STORAGE_KEY = `${STORAGE_NAMESPACE}-routines`;
const BACKUP_TIMESTAMP_KEY = `${STORAGE_NAMESPACE}-last-backup-at`;
const ROUTINE_SESSION_STORAGE_KEY = `${STORAGE_NAMESPACE}-active-routine-session`;

const $ = id => document.getElementById(id);
const on = (element, event, handler) => { if (element) element.addEventListener(event, handler); };

let profile = null;
let routines = {};
let selectedDate = todayISO();
let currentData = null;
let calendarCursor = firstOfMonth(selectedDate);
let currentPage = "entry";
let routinesReturnPage = "entry";
let activeRoutineKey = null;
let editingRoutineItemId = null;
let routineSession = null;
let autoSaveTimer = null;
let streaksUnlocked = false;
let mediaQueryDark = null;

// Auswertung
let periodKind = "week";
let periodAnchor = todayISO();

// Dialogentwürfe
let roleDraft = null;
let trackerDraft = null;

function storageKey(date) { return `${REVIEW_PREFIX}${date}`; }

function readJSON(key, fallback = null) { return safeParse(localStorage.getItem(key), fallback); }

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    showToast("Speichern nicht möglich – der Gerätespeicher ist voll.", "error");
    return false;
  }
}

/* --------------------------------------------------------------------------
   2. Kleine Oberflächenhelfer
   -------------------------------------------------------------------------- */

let toastTimer = null;
function showToast(message, tone = "info") {
  const toast = $("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.dataset.tone = tone;
  toast.hidden = false;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => { toast.hidden = true; }, 240);
  }, 2600);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(dateFromISO(iso));
}

function formatLongDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(dateFromISO(iso));
}

function formatShortDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" }).format(dateFromISO(iso));
}

function formatMonth(iso) {
  return new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(dateFromISO(`${iso.slice(0, 7)}-01`));
}

function currentClockTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function formatNumber(value, decimals = 0) {
  const numeric = Number(value || 0);
  return numeric.toFixed(decimals).replace(".", ",");
}

/* Einheitlicher leerer Zustand. Er erklärt, was hier entstehen kann, und
   bietet genau eine Handlung an – nie ein leeres Diagramm. */
function emptyStateHTML({ icon = "✦", title, text, actionId = "", actionLabel = "" }) {
  return `<div class="empty-state-inner">
    <span class="empty-state-icon" aria-hidden="true">${icon}</span>
    <strong class="empty-state-title">${escapeHTML(title)}</strong>
    <p class="empty-state-text">${escapeHTML(text)}</p>
    ${actionId ? `<button type="button" class="primary-button compact" id="${actionId}">${escapeHTML(actionLabel)}</button>` : ""}
  </div>`;
}

function roleChipHTML(role, extraClass = "") {
  if (!role) return `<span class="role-chip is-empty ${extraClass}">Keine Rolle</span>`;
  return `<span class="role-chip ${extraClass}" style="--role-color:${role.color};--role-soft:${hexToRgba(role.color, .14)};--role-text:${role.text}">
    <i aria-hidden="true">${escapeHTML(role.emoji)}</i>${escapeHTML(role.name)}</span>`;
}

/* --------------------------------------------------------------------------
   3. Darstellung: hell, dunkel oder automatisch
   -------------------------------------------------------------------------- */

function applyTheme() {
  const choice = profile?.settings?.theme || "system";
  const root = document.documentElement;
  const dark = choice === "dark" || (choice === "system" && mediaQueryDark?.matches);
  root.dataset.theme = choice === "system" ? (dark ? "dark" : "light") : choice;
  root.style.colorScheme = dark ? "dark" : "light";
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.remove());
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = dark ? "#101319" : "#ffffff";
  document.head.appendChild(meta);
  if (currentData) applyHeaderTheme();
}

/* --------------------------------------------------------------------------
   4. Profil laden, speichern, migrieren
   -------------------------------------------------------------------------- */

function collectStoredReviewsRaw() {
  const reviews = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith(REVIEW_PREFIX)) continue;
    const date = key.slice(REVIEW_PREFIX.length);
    if (!isISODate(date)) continue;
    const data = safeParse(localStorage.getItem(key));
    if (data) reviews.push({ date, data });
  }
  return reviews.sort((a, b) => a.date.localeCompare(b.date));
}

/* Liegt noch kein Profil vor, aber bereits ein Bestand aus einer früheren
   Version, wird daraus einmalig ein vollständiges Profil gebaut. Der Nutzer
   findet danach alles wieder – nur eben als eigene, bearbeitbare Objekte. */
function loadProfile() {
  const stored = readJSON(PROFILE_STORAGE_KEY);
  if (stored) return normalizeProfile(stored);

  const legacyReviews = collectStoredReviewsRaw();
  const legacyRoutines = readJSON(ROUTINES_STORAGE_KEY);
  const hasLegacyData = legacyReviews.length > 0 || (legacyRoutines && Object.keys(legacyRoutines).length > 0);
  if (hasLegacyData) {
    const migrated = buildMigratedProfile(legacyReviews, legacyRoutines || {});
    writeJSON(PROFILE_STORAGE_KEY, migrated);
    return migrated;
  }
  return emptyProfile();
}

function saveProfile() {
  profile = normalizeProfile(profile);
  writeJSON(PROFILE_STORAGE_KEY, profile);
}

function loadRoutines() { return normalizeRoutines(readJSON(ROUTINES_STORAGE_KEY)); }
function saveRoutines() { writeJSON(ROUTINES_STORAGE_KEY, routines); }

/* --------------------------------------------------------------------------
   5. Tageseintrag laden und speichern
   -------------------------------------------------------------------------- */

function findPreviousReviewData(date) {
  let cursor = date;
  for (let index = 0; index < 400; index += 1) {
    cursor = addDays(cursor, -1);
    const raw = localStorage.getItem(storageKey(cursor));
    if (raw) {
      const data = safeParse(raw);
      if (data) return data;
    }
  }
  return null;
}

function loadReview(date) {
  const rawText = localStorage.getItem(storageKey(date));
  const raw = rawText ? safeParse(rawText, {}) : {};
  return normalizeReview(raw, date, profile, {
    hasStored: Boolean(rawText),
    previousData: rawText ? null : findPreviousReviewData(date),
    today: todayISO()
  });
}

function hasStoredReview(date) { return Boolean(localStorage.getItem(storageKey(date))); }

function collectForm() {
  if (!currentData) return;
  if ($("notes")) currentData.notes = $("notes").value;
}

function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => saveReview(true), 550);
}

function saveReview(silent = false) {
  if (!currentData) return;
  collectForm();
  writeJSON(storageKey(selectedDate), currentData);
  if (!silent) {
    const button = $("saveButton");
    if (button) {
      const original = button.dataset.label || button.textContent;
      button.dataset.label = original;
      button.textContent = "✓ Gespeichert";
      setTimeout(() => { button.textContent = original; }, 1100);
    }
  }
}

/* Streakstände wirken sich auf alle bereits gespeicherten Folgetage aus.
   Ohne diese Fortschreibung stünde dort weiterhin der alte Zählerstand. */
function propagateStreaksForward(fromDate) {
  let cursor = fromDate;
  let previous = currentData;
  for (let index = 0; index < 400; index += 1) {
    cursor = addDays(cursor, 1);
    const raw = localStorage.getItem(storageKey(cursor));
    if (!raw) break;
    const data = normalizeReview(safeParse(raw, {}), cursor, profile, { hasStored: true, today: todayISO() });
    activeStreaks(profile).forEach(streak => {
      const before = previous.streaks?.[streak.id];
      const now = data.streaks[streak.id] || { days: 0, broken: false, todayStatus: "" };
      if (!before) return;
      if (now.todayStatus === "lapse") { now.days = 0; now.broken = true; return; }
      now.days = before.broken ? 1 : Number(before.days || 0) + 1;
      now.broken = false;
    });
    writeJSON(storageKey(cursor), data);
    previous = data;
  }
}

function setDate(date) {
  selectedDate = date;
  calendarCursor = firstOfMonth(date);
  currentData = loadReview(date);
  if ($("dateButton")) $("dateButton").textContent = formatDate(date);
  renderEntryPage();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

/* --------------------------------------------------------------------------
   6. Tagesphasen-Symbole
   Eine einzige Formsprache für alle fünf Phasen.
   -------------------------------------------------------------------------- */

function phaseGlyph(key) {
  if (key === "night") {
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
      <g transform="rotate(-20)"><path d="M2.60 -10.07 A10.4 10.4 0 1 0 2.60 10.07 A10.4 10.4 0 0 1 2.60 -10.07 Z"></path></g>
      <circle class="spark" cx="8.6" cy="-8" r="1.5"></circle>
      <circle class="spark" cx="11.8" cy="-3" r="1"></circle></svg>`;
  }
  if (key === "midday") {
    const rays = [0, 45, 90, 135, 180, 225, 270, 315].map(degrees => {
      const angle = degrees * Math.PI / 180;
      return `<line x1="${(Math.cos(angle) * 9.2).toFixed(2)}" y1="${(Math.sin(angle) * 9.2).toFixed(2)}" x2="${(Math.cos(angle) * 13).toFixed(2)}" y2="${(Math.sin(angle) * 13).toFixed(2)}"></line>`;
    }).join("");
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true"><circle cx="0" cy="0" r="6"></circle>${rays}</svg>`;
  }
  if (key === "afternoon") {
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
      <circle cx="0" cy="-3.4" r="5.4"></circle>
      <line x1="0" y1="-13.2" x2="0" y2="-10.8"></line>
      <line x1="-8.3" y1="-11.7" x2="-6.5" y2="-9.9"></line>
      <line x1="8.3" y1="-11.7" x2="6.5" y2="-9.9"></line>
      <line x1="-12.2" y1="-3.4" x2="-9.8" y2="-3.4"></line>
      <line x1="12.2" y1="-3.4" x2="9.8" y2="-3.4"></line>
      <line x1="-11.5" y1="8.4" x2="11.5" y2="8.4"></line></svg>`;
  }
  if (key === "morning") {
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
      <path d="M-7.4 3.6a7.4 7.4 0 0 1 14.8 0Z"></path>
      <line x1="-13" y1="3.6" x2="13" y2="3.6"></line>
      <line x1="0" y1="-12.8" x2="0" y2="-9"></line>
      <line x1="-9.8" y1="-6.6" x2="-7.1" y2="-3.9"></line>
      <line x1="9.8" y1="-6.6" x2="7.1" y2="-3.9"></line></svg>`;
  }
  return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
    <path d="M-8.9 1.4A9 9 0 0 1 8.9 1.4Z"></path>
    <line x1="-13" y1="1.4" x2="13" y2="1.4"></line>
    <line x1="-6.2" y1="7.4" x2="6.2" y2="7.4"></line></svg>`;
}

/* --------------------------------------------------------------------------
   7. Kopfzeile und Rollenauswahl
   -------------------------------------------------------------------------- */

function currentRole() { return findRole(profile, currentData?.roleId); }

function renderRolePicker() {
  const select = $("dayRole");
  if (!select) return;
  const roles = activeRoles(profile);
  select.innerHTML = `<option value="">Keine Rolle</option>`
    + roles.map(role => `<option value="${escapeHTML(role.id)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  select.value = currentData?.roleId || "";
  select.disabled = !roles.length;
}

/* Die Kopfzeile nimmt die Farbe der Rolle des Tages auf. Gemischt wird immer
   Richtung Seitenhintergrund – im hellen Modus also nach Weiß, im dunklen
   nach Anthrazit. Ohne das leuchtete der Kopf im Dunkelmodus hell auf. */
function applyHeaderTheme() {
  const role = currentRole();
  const root = document.documentElement;
  const dark = root.dataset.theme === "dark";
  const base = dark ? "#101319" : "#ffffff";
  if (!role) {
    root.style.setProperty("--header-wash-top", dark ? "#1c2436" : "#a1d7ff");
    root.style.setProperty("--header-wash-mid", dark ? "#161a23" : "#e9f5ff");
    root.style.removeProperty("--role-accent");
    return;
  }
  root.style.setProperty("--role-accent", role.color);
  root.style.setProperty("--header-wash-top", mixHex(role.color, base, dark ? .70 : .58));
  root.style.setProperty("--header-wash-mid", mixHex(role.color, base, dark ? .92 : .88));
}

function renderHeader() {
  const role = currentRole();
  if ($("roleHeroIcon")) $("roleHeroIcon").textContent = role?.emoji || "🎭";
  if ($("roleHeroName")) $("roleHeroName").textContent = role?.name || "Keine Rolle";
  const tagline = $("roleTagline");
  if (tagline) {
    const hasRoles = activeRoles(profile).length > 0;
    tagline.textContent = role
      ? (role.description || "Dieser Rolle ist noch keine Bedeutung hinterlegt.")
      : hasRoles
        ? "Welche deiner Rollen steht heute im Vordergrund?"
        : "Lege im Profil deine erste Rolle an.";
  }
  const heroName = $("roleHeroName");
  if (heroName && !role) heroName.textContent = activeRoles(profile).length ? "Rolle wählen" : "Keine Rolle";
  const wrap = $("rolePickerWrap");
  if (wrap && role) {
    wrap.style.setProperty("--role-color", role.color);
    wrap.style.setProperty("--role-soft", hexToRgba(role.color, .16));
  } else if (wrap) {
    wrap.style.removeProperty("--role-color");
    wrap.style.removeProperty("--role-soft");
  }
  applyHeaderTheme();
}

/* --------------------------------------------------------------------------
   8. Eintragung – Check-ins

   Die Tagesbahn zeigt ausschließlich Tagesphase, Symbol und Status. Zahlen
   stehen im Check-in-Dialog und im Verlauf, nicht in der Übersicht.
   -------------------------------------------------------------------------- */

function renderCheckinSlots() {
  const container = $("checkinSlots");
  if (!container || !currentData) return;
  const bySlot = Object.fromEntries((currentData.stateCheckins || []).map(entry => [entry.slot, entry]));
  const pending = pendingSlotKey(currentData);
  const active = activeChronology(currentData);

  const stops = CHECKIN_CHRONOLOGY.map(key => {
    const entry = bySlot[key];
    const state = entry ? "done"
      : !active.includes(key) ? "outside"
      : key === pending ? "current" : "upcoming";
    return { key, phase: phaseMeta(key), entry, state };
  });

  const linkColor = stop => (stop.state === "done" || stop.state === "current") ? stop.phase.line : "var(--journey-idle)";
  const links = stops.slice(0, -1).map((stop, index) =>
    `<i style="--i:${index};--from:${linkColor(stop)};--to:${linkColor(stops[index + 1])}"></i>`).join("");

  const scales = orderedScales(profile);
  const nodes = stops.map(({ key, phase, entry, state }) => {
    const values = entry
      ? scales.map(scale => {
          const value = toNumberOrNull(entry.scales?.[scale.id]);
          return value === null ? "" : `${scale.label} ${value} %`;
        }).filter(Boolean).join(", ")
      : "";
    const status = entry ? (values || "erfasst")
      : state === "outside" ? "für diesen Tag nicht erfasst" : "noch nicht erfasst";
    return `<button type="button" class="journey-stop is-${state}" data-open-checkin-slot="${key}"
        style="--stop-a:${phase.a};--stop-b:${phase.b};--stop-line:${phase.line};--stop-glow:${phase.glow}"
        aria-label="${escapeHTML(phase.short)} ${state === "done" ? "bearbeiten" : "eintragen"}. ${escapeHTML(status)}.">
      <span class="stop-node">
        <span class="stop-icon">${phaseGlyph(key)}</span>
        ${state === "done" ? `<span class="stop-check" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M3 7.4 5.9 10.2 11 4.6"></path></svg></span>` : ""}
      </span>
      <span class="stop-name">${escapeHTML(phase.short)}</span>
    </button>`;
  }).join("");

  container.innerHTML = `<div class="day-journey">
    <div class="journey-stops">
      <span class="journey-links" aria-hidden="true">${links}</span>
      ${nodes}
    </div>
  </div>`;

  container.querySelectorAll("[data-open-checkin-slot]").forEach(element =>
    on(element, "click", () => openCheckinDialog(element.dataset.openCheckinSlot)));
}

function coachImpulseHTML(checkin) {
  if (!profile?.settings?.showCoach) return "";
  const mode = modeForCheckin(checkin, profile);
  const impulse = coachImpulse(checkinScaleValues(checkin, modeScales(profile)), mode?.key);
  if (!impulse) return "";
  return `<div class="coach-impulse">
    <span class="coach-eyebrow">Impuls für jetzt</span>
    <strong class="coach-core">${escapeHTML(impulse.core)}</strong>
    <span class="coach-addition">${escapeHTML(impulse.addition)}</span>
  </div>`;
}

function renderStateSummary() {
  const summary = $("currentStateSummary");
  const timeline = $("stateTimeline");
  if (!summary || !timeline || !currentData) return;

  const checkins = [...(currentData.stateCheckins || [])];
  const latest = latestCheckin(currentData);
  const mode = modeForCheckin(latest, profile);
  const role = currentRole();

  if (!latest) {
    summary.className = "current-state-summary state-readout is-empty";
    summary.removeAttribute("style");
    summary.innerHTML = `<p class="readout-empty">Noch kein Check-in für diesen Tag. Tippe oben auf eine Tagesphase.</p>`;
  } else if (!mode || !profile?.settings?.showCoach) {
    summary.className = "current-state-summary state-readout";
    summary.removeAttribute("style");
    const values = orderedScales(profile).map(scale => {
      const value = toNumberOrNull(latest.scales?.[scale.id]);
      return value === null ? "" : `<span class="readout-value"><i style="--scale-color:${scale.color}"></i>${escapeHTML(scale.label)} <b>${value} %</b></span>`;
    }).filter(Boolean).join("");
    summary.innerHTML = `<div class="readout-head">${role ? `<span class="readout-role">${escapeHTML(role.name)}</span>` : ""}<strong class="readout-mode">${escapeHTML(checkinSlot(latest.slot).label)}</strong></div>
      <div class="readout-values">${values || "<small>Keine Werte erfasst.</small>"}</div>`;
  } else {
    summary.className = "current-state-summary state-readout";
    summary.style.setProperty("--mode-color", mode.color);
    summary.style.setProperty("--mode-soft", hexToRgba(mode.color, .13));
    summary.style.setProperty("--mode-line", hexToRgba(mode.color, .28));
    summary.innerHTML = `
      <div class="readout-head">
        ${role ? `<span class="readout-role">${escapeHTML(role.name)}</span>` : `<span class="readout-role">Rollenmodus</span>`}
        <strong class="readout-mode">${escapeHTML(mode.label)}</strong>
      </div>
      ${coachImpulseHTML(latest)}`;
  }

  const scales = orderedScales(profile);
  timeline.innerHTML = checkins.length ? [...checkins].reverse().map(entry => {
    const entryMode = modeForCheckin(entry, profile);
    const slot = checkinSlot(entry.slot);
    const details = scales.map(scale => {
      const value = toNumberOrNull(entry.scales?.[scale.id]);
      return value === null ? "" : `${value} % ${scale.label}`;
    }).filter(Boolean).join(" · ") || "Keine Werte";
    return `<article class="state-timeline-item" style="--framework-color:${entryMode?.color || "var(--muted)"}">
      <div class="state-timeline-marker"></div>
      <div class="state-timeline-copy">
        <div class="state-timeline-title"><strong>${slot.icon} ${escapeHTML(slot.label)} · ${escapeHTML(entry.time || "")}</strong><span>${escapeHTML(profile.settings.showCoach ? (entryMode?.label || "") : "")}</span></div>
        <small>${escapeHTML(details)}</small>
        ${entry.note ? `<small class="state-timeline-note">${escapeHTML(entry.note)}</small>` : ""}
      </div>
      <button type="button" class="state-delete-button" data-delete-checkin="${escapeHTML(entry.id)}" aria-label="Check-in löschen">×</button>
    </article>`;
  }).join("") : `<p class="state-timeline-empty">Noch keine Momentaufnahme gespeichert.</p>`;

  timeline.querySelectorAll("[data-delete-checkin]").forEach(button => on(button, "click", () => {
    currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.id !== button.dataset.deleteCheckin);
    saveReview(true);
    renderCheckinSlots();
    renderStateSummary();
  }));
}

/* Der Dialog nimmt die Farbwelt der angetippten Tagesphase auf und zeigt
   ausschließlich die Regler, die im Profil hinterlegt sind. */
function fillCheckinForm(slotKey) {
  const requested = CHECKIN_CHRONOLOGY.includes(slotKey) ? slotKey : (pendingSlotKey(currentData) || CHECKIN_CHRONOLOGY[0]);
  const existing = (currentData.stateCheckins || []).find(entry => entry.slot === requested);
  const previous = latestCheckin(currentData);
  const slot = checkinSlot(requested);
  const phase = phaseMeta(requested);

  const dialog = $("checkinDialog");
  dialog.dataset.editingSlot = requested;
  dialog.dataset.phase = requested;
  dialog.style.setProperty("--phase-a", phase.a);
  dialog.style.setProperty("--phase-b", phase.b);
  dialog.style.setProperty("--phase-veil", hexToRgba(phase.a, .16));
  dialog.style.setProperty("--phase-veil-b", hexToRgba(phase.b, .13));

  $("checkinSlotValue").value = requested;
  $("checkinTime").value = existing?.time || (selectedDate === todayISO() ? currentClockTime() : slot.time);
  $("checkinDialogTitle").textContent = phase.short;
  $("checkinSlotDisplay").style.setProperty("--slot-color", phase.line);
  $("checkinSlotDisplay").style.setProperty("--slot-soft", hexToRgba(phase.a, .16));
  $("checkinSlotDisplay").style.setProperty("--slot-glow", phase.glow);
  $("checkinSlotDisplay").innerHTML = `<span class="phase-mark" aria-hidden="true">${phaseGlyph(requested)}</span>
    <span class="phase-copy"><strong>${escapeHTML(phase.short)}</strong><small>Wie geht es dir gerade?</small></span>
    <span class="phase-time">${escapeHTML($("checkinTime").value)}</span>`;

  $("checkinScaleFields").innerHTML = orderedScales(profile).map(scale => {
    const stored = toNumberOrNull(existing?.scales?.[scale.id]);
    const fallback = toNumberOrNull(previous?.scales?.[scale.id]);
    const value = stored ?? fallback ?? 60;
    return `<div class="field-group state-scale-field" style="--scale-color:${scale.color};--scale-soft:${hexToRgba(scale.color, .16)}">
      <div class="label-value-row">
        <label for="scale-${escapeHTML(scale.id)}">${escapeHTML(scale.label)}</label>
        <strong data-scale-value="${escapeHTML(scale.id)}">${value} %</strong>
      </div>
      <input id="scale-${escapeHTML(scale.id)}" data-scale-input="${escapeHTML(scale.id)}" type="range" min="0" max="100" step="5" value="${value}">
      <div class="state-range-legend"><small>${escapeHTML(scale.lowLabel)}</small><small>${escapeHTML(scale.highLabel)}</small></div>
      <small class="state-range-meaning" data-scale-meaning="${escapeHTML(scale.id)}"></small>
    </div>`;
  }).join("");

  $("checkinNote").value = existing?.note || "";
  $("resetCheckin").hidden = !existing;

  $("checkinScaleFields").querySelectorAll("[data-scale-input]").forEach(input =>
    on(input, "input", updateCheckinPreview));
  updateCheckinPreview();
}

function checkinFromForm() {
  const scales = {};
  orderedScales(profile).forEach(scale => {
    const input = document.querySelector(`[data-scale-input="${CSS.escape(scale.id)}"]`);
    scales[scale.id] = input ? clamp(Number(input.value), 0, 100) : null;
  });
  return {
    slot: $("checkinSlotValue").value,
    time: $("checkinTime").value || currentClockTime(),
    scales,
    note: $("checkinNote").value.trim()
  };
}

function updateCheckinPreview() {
  const draft = checkinFromForm();
  orderedScales(profile).forEach(scale => {
    const value = draft.scales[scale.id];
    const display = document.querySelector(`[data-scale-value="${CSS.escape(scale.id)}"]`);
    const meaning = document.querySelector(`[data-scale-meaning="${CSS.escape(scale.id)}"]`);
    if (display) display.textContent = `${value ?? 0} %`;
    if (meaning) meaning.textContent = scaleMeaning(scale, value);
  });
  const preview = $("checkinPreview");
  if (!preview) return;
  if (!profile?.settings?.showCoach) { preview.innerHTML = ""; preview.hidden = true; return; }
  const mode = modeForCheckin(draft, profile);
  if (!mode) { preview.innerHTML = ""; preview.hidden = true; return; }
  preview.hidden = false;
  preview.style.setProperty("--mode-color", mode.color);
  preview.style.setProperty("--mode-soft", hexToRgba(mode.color, .13));
  preview.style.setProperty("--mode-line", hexToRgba(mode.color, .28));
  preview.innerHTML = `<strong>${escapeHTML(mode.label)}</strong>${coachImpulseHTML(draft)}`;
}

function openCheckinDialog(slotKey = null) {
  if (!orderedScales(profile).length) {
    showToast("Lege im Profil zuerst einen Check-in-Regler an.");
    return;
  }
  fillCheckinForm(slotKey || pendingSlotKey(currentData) || CHECKIN_CHRONOLOGY[0]);
  $("checkinDialog").showModal();
}

function saveCheckinFromForm(event) {
  event.preventDefault();
  const entry = checkinFromForm();
  const existing = (currentData.stateCheckins || []).find(item => item.slot === entry.slot);
  entry.id = existing?.id || `state-${selectedDate}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;
  entry.createdAt = existing?.createdAt || `${selectedDate}T${entry.time}:00`;
  // Kompatibilität mit älteren Exporten: die drei bekannten Felder mitschreiben.
  ["energy", "mood", "taqwa"].forEach(key => {
    if (entry.scales[key] !== undefined) entry[key] = entry.scales[key];
  });
  currentData.stateCheckins = [...(currentData.stateCheckins || []).filter(item => item.slot !== entry.slot), entry]
    .sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time));
  if (entry.slot === "afternoon") currentData.checkinStructure = 5;
  $("checkinDialog").close();
  saveReview(true);
  renderCheckinSlots();
  renderStateSummary();
}

function resetCheckin() {
  const slot = $("checkinDialog").dataset.editingSlot;
  currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.slot !== slot);
  $("checkinDialog").close();
  saveReview(true);
  renderCheckinSlots();
  renderStateSummary();
}

/* --------------------------------------------------------------------------
   9. Eintragung – Rollenaktivitäten
   -------------------------------------------------------------------------- */

const ACTIVITY_WEIGHTS = [
  { value: 0.5, label: "Kleiner Beitrag (0,5)" },
  { value: 1, label: "Normal (1)" },
  { value: 1.5, label: "Deutlicher Beitrag (1,5)" },
  { value: 2, label: "Prägend (2)" },
  { value: 3, label: "Sehr prägend (3)" }
];

function renderActivities() {
  const list = $("activityList");
  if (!list || !currentData) return;
  const activities = currentData.activities || [];
  if (!activities.length) {
    const hasRoles = activeRoles(profile).length > 0;
    list.innerHTML = hasRoles
      ? emptyStateHTML({
          icon: "✦",
          title: "Noch keine Aktivität eingetragen",
          text: "Halte fest, was du heute für eine deiner Rollen getan hast – auch Kleines zählt.",
          actionId: "emptyAddActivity",
          actionLabel: "Aktivität hinzufügen"
        })
      : emptyStateHTML({
          icon: "🎭",
          title: "Noch keine Rolle vorhanden",
          text: "Lege zuerst eine Rolle an, dann kannst du ihr Aktivitäten zuordnen.",
          actionId: "emptyAddRoleFromActivity",
          actionLabel: "Rolle erstellen"
        });
    list.className = "stack is-empty";
    on($("emptyAddActivity"), "click", () => openActivityDialog());
    on($("emptyAddRoleFromActivity"), "click", () => openRoleDialog());
    return;
  }
  list.className = "stack";

  const rows = activityPointRows(currentData, selectedDate, profile);
  const pointsById = new Map();
  rows.forEach(row => pointsById.set(row.templateId || row.title, row));
  const shown = new Set();

  list.innerHTML = activities.map((activity, index) => {
    const role = findRole(profile, activity.roleId);
    const key = activity.templateId || activity.title;
    const row = pointsById.get(key);
    const capped = row?.capped && shown.has(key);
    if (row?.capped) shown.add(key);
    const points = capped ? "Tagesbegrenzung erreicht"
      : `${formatPoints(row ? row.points : activity.weight)} ${(row ? row.points : activity.weight) === 1 ? "Punkt" : "Punkte"}`;
    const color = role?.color || "#8b8f9c";
    return `<div class="activity-row" data-activity-index="${index}" style="--activity-color:${color};--activity-soft:${hexToRgba(color, .10)}">
      <div class="activity-main">
        <div class="activity-copy">
          <strong>${escapeHTML(activity.title)}</strong>
          <small>${role ? `${escapeHTML(role.emoji)} ${escapeHTML(role.name)}` : "Ohne Rolle"} · ${escapeHTML(points)}</small>
        </div>
      </div>
      <div class="activity-sort-actions" aria-label="Aktivität sortieren">
        <button type="button" data-move-activity="-1" data-index="${index}" ${index === 0 ? "disabled" : ""} aria-label="Nach oben">↑</button>
        <button type="button" data-move-activity="1" data-index="${index}" ${index === activities.length - 1 ? "disabled" : ""} aria-label="Nach unten">↓</button>
      </div>
      <button type="button" class="delete-button" data-delete-activity="${index}" aria-label="Aktivität löschen">×</button>
    </div>`;
  }).join("");

  list.querySelectorAll("[data-move-activity]").forEach(button => on(button, "click", () => {
    const index = Number(button.dataset.index);
    const target = index + Number(button.dataset.moveActivity);
    if (target < 0 || target >= currentData.activities.length) return;
    [currentData.activities[index], currentData.activities[target]] = [currentData.activities[target], currentData.activities[index]];
    saveReview(true);
    renderActivities();
  }));
  list.querySelectorAll("[data-delete-activity]").forEach(button => on(button, "click", () => {
    currentData.activities.splice(Number(button.dataset.deleteActivity), 1);
    saveReview(true);
    renderActivities();
  }));
}

function fillActivityDialog() {
  const templates = activeTemplates(profile);
  $("activityTemplate").innerHTML = `<option value="">Eigene Aktivität</option>`
    + templates.map(template => {
        const role = findRole(profile, template.roleId);
        return `<option value="${escapeHTML(template.id)}">${escapeHTML(template.title)}${role ? ` · ${escapeHTML(role.name)}` : ""}</option>`;
      }).join("");
  const roles = activeRoles(profile);
  $("activityRole").innerHTML = `<option value="">Ohne Rolle</option>`
    + roles.map(role => `<option value="${escapeHTML(role.id)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("activityWeight").innerHTML = ACTIVITY_WEIGHTS
    .map(item => `<option value="${item.value}">${escapeHTML(item.label)}</option>`).join("");
}

function applyActivityTemplate() {
  const template = activeTemplates(profile).find(item => item.id === $("activityTemplate").value) || null;
  if (template) {
    $("activityTitle").value = template.title;
    $("activityRole").value = template.roleId || "";
    $("activityWeight").value = String(template.weight);
    $("activitySaveTemplate").checked = false;
    $("activitySaveTemplate").disabled = true;
  } else {
    $("activitySaveTemplate").disabled = false;
  }
  const hint = $("activityWeightHint");
  if (hint) {
    hint.textContent = template?.dailyCap
      ? `Diese Vorlage zählt höchstens ${formatPoints(template.dailyCap)} Punkte je Tag, unabhängig von der Anzahl der Einträge.`
      : "Das Gewicht bestimmt, wie stark die Aktivität in der Rollenpräsenz sichtbar wird. Es misst weder Zeit noch Leistung.";
  }
}

function openActivityDialog() {
  if (!activeRoles(profile).length) {
    showToast("Lege im Profil zuerst eine Rolle an.");
    return;
  }
  const role = currentRole();
  $("activityDialogTitle").textContent = role ? `Aktivität für ${role.name}` : "Aktivität hinzufügen";
  fillActivityDialog();
  $("activityTemplate").value = "";
  $("activityTitle").value = "";
  $("activityRole").value = currentData?.roleId || "";
  $("activityWeight").value = "1";
  $("activitySaveTemplate").checked = false;
  applyActivityTemplate();
  $("activityDialog").showModal();
}

function saveActivityFromForm(event) {
  event.preventDefault();
  const title = $("activityTitle").value.trim();
  if (!title) return;
  const templateId = $("activityTemplate").value;
  const roleId = $("activityRole").value;
  const weight = Number($("activityWeight").value) || 1;

  if (!templateId && $("activitySaveTemplate").checked) {
    profile.activityTemplates.push(normalizeActivityTemplate(
      { title, roleId, weight, order: profile.activityTemplates.length },
      profile.activityTemplates.length,
      profile.activityTemplates.map(item => item.id),
      profile.roles.map(role => role.id)));
    saveProfile();
  }

  currentData.activities.push(normalizeActivityEntry(
    { title, roleId, templateId, weight, order: currentData.activities.length },
    profile, currentData.activities.length));
  $("activityDialog").close();
  saveReview(true);
  renderActivities();
}

/* --------------------------------------------------------------------------
   10. Eintragung – Tracking

   Jeder Trackertyp bekommt genau ein Bedienmuster. Neue Tracker funktionieren
   dadurch ohne jede Codeänderung.
   -------------------------------------------------------------------------- */

function trackerValue(tracker) {
  const stored = currentData?.trackers?.[tracker.id];
  return stored === undefined ? emptyTrackerValue(tracker) : stored;
}

function setTrackerValue(tracker, value) {
  currentData.trackers = currentData.trackers || {};
  currentData.trackers[tracker.id] = normalizeTrackerValue(tracker, value);
  saveReview(true);
}

function trackerHeadHTML(tracker, valueText = "") {
  return `<div class="tracker-head">
    <span class="tracker-title">${tracker.emoji ? `<i aria-hidden="true">${escapeHTML(tracker.emoji)}</i>` : ""}${escapeHTML(tracker.label)}</span>
    ${valueText ? `<strong class="tracker-value">${escapeHTML(valueText)}</strong>` : ""}
  </div>`;
}

function trackerBodyHTML(tracker) {
  const value = trackerValue(tracker);
  switch (tracker.type) {
    case "counter": {
      const numeric = Number(value || 0);
      const unit = tracker.unit ? ` ${tracker.unit}` : "";
      const percent = tracker.target ? clamp(Math.round(numeric / tracker.target * 100), 0, 100) : null;
      return `${trackerHeadHTML(tracker, `${formatNumber(numeric, tracker.decimals)}${unit}`)}
        <div class="counter-control">
          <button type="button" class="counter-step" data-counter="-1" aria-label="${escapeHTML(tracker.label)} verringern">−</button>
          ${percent === null ? "" : `<span class="counter-track" aria-hidden="true"><i style="width:${percent}%"></i></span>`}
          <button type="button" class="counter-step gradient-action" data-counter="1" aria-label="${escapeHTML(tracker.label)} erhöhen">+</button>
        </div>
        ${tracker.target ? `<small class="tracker-hint">Ziel: ${escapeHTML(formatNumber(tracker.target, tracker.decimals))}${escapeHTML(unit)}</small>` : ""}`;
    }
    case "number": {
      const numeric = toNumberOrNull(value);
      return `${trackerHeadHTML(tracker)}
        <div class="number-control">
          <input type="number" inputmode="numeric" data-number-input value="${numeric === null ? "" : numeric}" placeholder="${tracker.target ? `z. B. ${tracker.target}` : "Zahl eintragen"}" aria-label="${escapeHTML(tracker.label)}">
          ${tracker.unit ? `<span class="number-unit">${escapeHTML(tracker.unit)}</span>` : ""}
        </div>`;
    }
    case "choice": {
      const options = tracker.options.map(option => {
        const selected = option.id === value;
        const color = option.color || (option.score === null ? "" : option.score >= 66 ? "var(--success)" : option.score >= 34 ? "var(--warning)" : "var(--danger)");
        return `<button type="button" class="choice-chip${selected ? " is-selected" : ""}" data-choice="${escapeHTML(option.id)}"
          ${color ? `style="--choice-color:${color}"` : ""} aria-pressed="${selected ? "true" : "false"}">${escapeHTML(option.label)}</button>`;
      }).join("");
      return `${trackerHeadHTML(tracker)}<div class="choice-row" role="group" aria-label="${escapeHTML(tracker.label)}">${options}</div>`;
    }
    case "toggle": {
      const active = Boolean(value);
      return `<button type="button" class="toggle-tracker${active ? " is-on" : ""}" data-toggle aria-pressed="${active ? "true" : "false"}">
        <span class="tracker-title">${tracker.emoji ? `<i aria-hidden="true">${escapeHTML(tracker.emoji)}</i>` : ""}${escapeHTML(tracker.label)}</span>
        <span class="toggle-mark" aria-hidden="true">${active ? "✓" : ""}</span>
      </button>`;
    }
    case "text": {
      return `${trackerHeadHTML(tracker)}
        <textarea data-text-input rows="${tracker.rows}" placeholder="${escapeHTML(tracker.placeholder || "")}" aria-label="${escapeHTML(tracker.label)}">${escapeHTML(String(value || ""))}</textarea>`;
    }
    case "checklist": {
      const states = tracker.states;
      const positives = states.filter(state => state.tone === "positive").map(state => state.id);
      const doneCount = tracker.items.filter(item => positives.includes(value?.[item.id])).length;
      const items = tracker.items.map(item => {
        const stateId = value?.[item.id] ?? "";
        const state = states.find(entry => entry.id === stateId) || states[0];
        return `<button type="button" class="checklist-item tone-${state.tone}${stateId ? " is-set" : ""}" data-checklist-item="${escapeHTML(item.id)}"
          aria-label="${escapeHTML(item.label)}: ${escapeHTML(state.label)}. Status wechseln.">
          <span class="checklist-mark" aria-hidden="true">${escapeHTML(state.icon)}</span>
          <span class="checklist-label">${escapeHTML(item.label)}</span>
        </button>`;
      }).join("");
      return `${trackerHeadHTML(tracker, `${doneCount}/${tracker.items.length}`)}
        <div class="checklist-row">${items}</div>`;
    }
    default:
      return trackerHeadHTML(tracker);
  }
}

function bindTrackerCard(card, tracker) {
  card.querySelectorAll("[data-counter]").forEach(button => on(button, "click", () => {
    const step = Number(tracker.step) * Number(button.dataset.counter);
    const next = Math.max(0, Math.round((Number(trackerValue(tracker) || 0) + step) * 100) / 100);
    setTrackerValue(tracker, next);
    renderTrackers();
  }));
  const numberInput = card.querySelector("[data-number-input]");
  on(numberInput, "input", () => {
    setTrackerValue(tracker, numberInput.value === "" ? null : Number(numberInput.value));
  });
  card.querySelectorAll("[data-choice]").forEach(button => on(button, "click", () => {
    const next = trackerValue(tracker) === button.dataset.choice ? "" : button.dataset.choice;
    setTrackerValue(tracker, next);
    renderTrackers();
  }));
  on(card.querySelector("[data-toggle]"), "click", () => {
    setTrackerValue(tracker, !trackerValue(tracker));
    renderTrackers();
  });
  const textInput = card.querySelector("[data-text-input]");
  on(textInput, "input", () => {
    currentData.trackers = currentData.trackers || {};
    currentData.trackers[tracker.id] = textInput.value;
    scheduleAutoSave();
  });
  card.querySelectorAll("[data-checklist-item]").forEach(button => on(button, "click", () => {
    const current = { ...(trackerValue(tracker) || {}) };
    const order = tracker.states.map(state => state.id);
    const index = order.indexOf(current[button.dataset.checklistItem] ?? "");
    current[button.dataset.checklistItem] = order[(index + 1) % order.length];
    setTrackerValue(tracker, current);
    renderTrackers();
  }));
}

function renderTrackers() {
  const list = $("trackerList");
  if (!list || !currentData) return;
  const trackers = dayTrackers(profile);
  if (!trackers.length) {
    list.innerHTML = emptyStateHTML({
      icon: "📊",
      title: "Noch kein Tracking eingerichtet",
      text: "Wähle aus, was du täglich festhalten möchtest – Wasser, Schlaf, Bewegung oder etwas ganz Eigenes.",
      actionId: "emptyAddTracker",
      actionLabel: "Tracking einrichten"
    });
    list.className = "tracker-list is-empty";
    on($("emptyAddTracker"), "click", () => openTrackerDialog());
    return;
  }
  list.className = "tracker-list";

  /* Damit die Seite auch bei vielen Trackern ruhig bleibt: schnelle Eingaben
     zuerst, Checklisten darunter, Freitexte eingeklappt. */
  const card = tracker => `<article class="tracker-card type-${tracker.type}" data-tracker-card="${escapeHTML(tracker.id)}">${trackerBodyHTML(tracker)}</article>`;
  const quick = trackers.filter(tracker => ["counter", "number", "toggle", "choice"].includes(tracker.type));
  const lists = trackers.filter(tracker => tracker.type === "checklist");
  const texts = trackers.filter(tracker => tracker.type === "text");
  const filled = texts.filter(tracker => trackerHasValue(tracker, trackerValue(tracker))).length;

  list.innerHTML = [
    quick.length ? `<div class="tracker-grid">${quick.map(card).join("")}</div>` : "",
    lists.map(card).join(""),
    texts.length ? `<details class="tracker-text-details"${filled ? " open" : ""}>
        <summary><strong>Schreiben</strong><small>${pluralDE(texts.length, "Feld", "Felder")}${filled ? ` · ${filled} ausgefüllt` : ""}</small></summary>
        <div class="tracker-text-stack">${texts.map(card).join("")}</div>
      </details>` : ""
  ].join("");

  trackers.forEach(tracker => {
    const element = list.querySelector(`[data-tracker-card="${CSS.escape(tracker.id)}"]`);
    if (element) bindTrackerCard(element, tracker);
  });
}

/* --------------------------------------------------------------------------
   11. Eintragung – Streaks
   -------------------------------------------------------------------------- */

function renderStreaks() {
  const list = $("streakList");
  if (!list || !currentData) return;
  const streaks = activeStreaks(profile);
  if (!streaks.length) {
    list.innerHTML = emptyStateHTML({
      icon: "🔥",
      title: "Noch keine Streaks angelegt",
      text: "Ein Streak zählt die Tage, an denen du etwas durchhältst – und macht sichtbar, wie weit du schon gekommen bist.",
      actionId: "emptyAddStreak",
      actionLabel: "Streak erstellen"
    });
    list.className = "stack streak-list is-empty";
    on($("emptyAddStreak"), "click", () => openStreakDialog());
    return;
  }
  list.className = "stack streak-list";
  list.innerHTML = streaks.map(streak => {
    const state = currentData.streaks?.[streak.id] || { days: 0, broken: false, todayStatus: "" };
    const isActive = !state.broken && Number(state.days || 0) > 0;
    const daily = STREAK_DAILY_STATES[state.todayStatus || ""] || STREAK_DAILY_STATES[""];
    const statusText = state.todayStatus === "lapse" ? "Unterbrochen" : isActive ? "Aktiv" : "Offen";
    const duration = humanDuration(Number(state.days || 0));
    return `<div class="streak-card ${state.broken ? "streak-broken" : ""} ${isActive ? "streak-active" : ""}">
      <div class="streak-card-head">
        <div><strong>${escapeHTML(streak.emoji)} ${escapeHTML(streak.label)}</strong><small>${escapeHTML(daily.label)}</small></div>
        <span class="streak-status">${escapeHTML(statusText)}</span>
      </div>
      <div class="streak-input-wrap">
        <input class="streak-days-large" type="number" min="0" inputmode="numeric" data-streak-days="${escapeHTML(streak.id)}" value="${Number(state.days || 0)}" aria-label="${escapeHTML(streak.label)} Tage">
        <span class="streak-unit">Tage</span>
      </div>
      ${duration ? `<small class="streak-duration">${escapeHTML(duration)}</small>` : ""}
      <div class="streak-daily-actions" role="group" aria-label="Heutigen Status setzen">
        <button type="button" class="${state.todayStatus === "held" ? "active" : ""}" data-streak-daily="held" data-streak-key="${escapeHTML(streak.id)}">Gehalten</button>
        <button type="button" class="danger ${state.todayStatus === "lapse" ? "active" : ""}" data-streak-daily="lapse" data-streak-key="${escapeHTML(streak.id)}">Unterbrechung</button>
      </div>
    </div>`;
  }).join("");

  list.querySelectorAll("[data-streak-days]").forEach(input => on(input, "change", () => {
    const state = currentData.streaks[input.dataset.streakDays];
    state.days = Math.max(0, Number(input.value || 0));
    state.broken = false;
    if (state.todayStatus === "lapse") state.todayStatus = "";
    saveReview(true);
    propagateStreaksForward(selectedDate);
    renderStreaks();
  }));
  list.querySelectorAll("[data-streak-daily]").forEach(button => on(button, "click", () => {
    const state = currentData.streaks[button.dataset.streakKey];
    const next = button.dataset.streakDaily;
    state.todayStatus = state.todayStatus === next ? "" : next;
    state.broken = state.todayStatus === "lapse";
    if (state.broken) state.days = 0;
    saveReview(true);
    propagateStreaksForward(selectedDate);
    renderStreaks();
  }));
}

/* --------------------------------------------------------------------------
   12. Eintragung – Routinen des Tages
   -------------------------------------------------------------------------- */

function routineStateFor(key) { return currentData?.routineStates?.[key] || ""; }

function cycleRoutineState(key) {
  currentData.routineStates = currentData.routineStates || {};
  const order = ROUTINE_STATE_ORDER;
  const index = order.indexOf(routineStateFor(key));
  currentData.routineStates[key] = order[(index + 1) % order.length];
  saveReview(true);
  renderRoutinesToday();
}

function renderRoutinesToday() {
  const container = $("routineTodayList");
  if (!container || !currentData) return;
  const keys = orderedRoutineKeys(routines);
  if (!keys.length) {
    container.innerHTML = emptyStateHTML({
      icon: "🌱",
      title: "Noch keine Routine angelegt",
      text: "Eine Routine ist eine feste Abfolge kleiner Schritte – mit Timer und Kontext, damit du sie wirklich durchziehst.",
      actionId: "emptyAddRoutine",
      actionLabel: "Routine erstellen"
    });
    container.className = "routine-review-grid is-empty";
    on($("emptyAddRoutine"), "click", () => { openRoutinesPage(); openRoutineDialog(); });
    return;
  }
  container.className = "routine-review-grid";
  container.innerHTML = keys.map(key => {
    const routine = routines[key];
    const progress = routineProgressOf(routine, currentData.routineProgress?.[key] || {});
    const state = routineStateFor(key);
    const meta = TASK_STATE_META[state] || TASK_STATE_META[""];
    const role = findRole(profile, routine.roleId);
    const percent = progress.total ? Math.round(progress.resolved / progress.total * 100) : 0;
    return `<article class="routine-review-card ${routine.theme}">
      <button class="routine-review-open" type="button" data-open-routine-today="${escapeHTML(key)}" aria-label="${escapeHTML(routine.title)} öffnen">
        <span class="routine-review-copy">
          <strong>${escapeHTML(routine.title)}</strong>
          <small>${progress.total ? `${progress.resolved}/${progress.total} Schritte` : "Noch keine Schritte"}${role ? ` · ${escapeHTML(role.name)}` : ""}</small>
        </span>
        ${progress.total ? `<span class="routine-hero-track" aria-hidden="true"><i style="width:${percent}%"></i></span>` : ""}
      </button>
      <div class="routine-review-actions">
        <button class="routine-cycle-button state-${meta.className}" type="button" data-routine-cycle="${escapeHTML(key)}" aria-label="Status ${escapeHTML(routine.title)}: ${escapeHTML(meta.label)}. Ändern.">${escapeHTML(meta.icon)}</button>
        ${progress.total ? `<button class="routine-play-button" type="button" data-start-routine-today="${escapeHTML(key)}" aria-label="${escapeHTML(routine.title)} starten">▶</button>` : ""}
      </div>
    </article>`;
  }).join("");

  container.querySelectorAll("[data-open-routine-today]").forEach(button =>
    on(button, "click", () => { openRoutinesPage(); openRoutineDetail(button.dataset.openRoutineToday); }));
  container.querySelectorAll("[data-routine-cycle]").forEach(button =>
    on(button, "click", () => cycleRoutineState(button.dataset.routineCycle)));
  container.querySelectorAll("[data-start-routine-today]").forEach(button =>
    on(button, "click", () => startRoutine(button.dataset.startRoutineToday)));
}

/* --------------------------------------------------------------------------
   13. Eintragung – Seite zusammensetzen

   Sichtbar ist nur, was der Nutzer eingeschaltet und angelegt hat. Ist noch
   gar nichts da, führt ein einziger klarer Hinweis weiter.
   -------------------------------------------------------------------------- */

function renderEntryPage() {
  if (!currentData) return;
  renderRolePicker();
  renderHeader();

  const modules = profile.modules;
  const hasRoles = activeRoles(profile).length > 0;
  const hasScales = orderedScales(profile).length > 0;
  const hasRoutines = Object.keys(routines).length > 0;
  const hasTrackers = dayTrackers(profile).length > 0;
  const hasStreaks = activeStreaks(profile).length > 0;

  const nothingSetUp = !hasRoles && !hasTrackers && !hasStreaks && !hasRoutines;
  const empty = $("entryEmpty");
  if (empty) {
    empty.hidden = !nothingSetUp;
    if (nothingSetUp) {
      empty.innerHTML = emptyStateHTML({
        icon: "🎭",
        title: "Dein ROLEPLAY ist noch leer",
        text: "Welche Rollen spielen in deinem Leben eine wichtige Rolle? Erstelle deine erste Rolle und baue dein persönliches System auf.",
        actionId: "emptyCreateFirstRole",
        actionLabel: "Rolle erstellen"
      });
      on($("emptyCreateFirstRole"), "click", () => openRoleDialog());
    }
  }

  $("checkinCard").hidden = nothingSetUp || !modules.checkins || !hasScales;
  $("activitiesCard").hidden = nothingSetUp || !modules.activities;
  $("routinesCard").hidden = nothingSetUp || !modules.routines;
  $("trackerCard").hidden = nothingSetUp || !modules.trackers;
  $("streakCard").hidden = nothingSetUp || !modules.streaks;
  $("notesCard").hidden = nothingSetUp || !modules.notes;
  $("saveButton").hidden = nothingSetUp;
  $("entryFooter").hidden = nothingSetUp;
  const header = $("appHeader");
  if (header) header.hidden = currentPage !== "entry";

  if (!$("checkinCard").hidden) { renderCheckinSlots(); renderStateSummary(); }
  if (!$("activitiesCard").hidden) renderActivities();
  if (!$("routinesCard").hidden) renderRoutinesToday();
  if (!$("trackerCard").hidden) renderTrackers();
  if (!$("streakCard").hidden) {
    if (profile.settings.protectStreaks && !streaksUnlocked) {
      $("streakList").className = "stack streak-list is-locked";
      $("streakList").innerHTML = `<button type="button" class="streak-unlock" id="unlockStreaks">🔒 Streaks anzeigen</button>`;
      on($("unlockStreaks"), "click", () => $("streakPrivacyDialog").showModal());
    } else {
      renderStreaks();
    }
  }
  if (!$("notesCard").hidden && document.activeElement !== $("notes")) $("notes").value = currentData.notes || "";
}

/* --------------------------------------------------------------------------
   14. Auswertung

   Die Auswertung zeigt nicht nur Zahlen, sondern erklärt sie. Sie bewertet
   nicht: es gibt keinen Gesamtscore und keine Erfolgsquote.
   -------------------------------------------------------------------------- */

function periodDates(kind = periodKind, anchor = periodAnchor) {
  return kind === "month" ? monthDates(anchor.slice(0, 7)) : weekDates(anchor);
}

function periodEntries(dates) {
  return dates.map(date => ({ date, data: loadReview(date), stored: hasStoredReview(date) }));
}

function shiftPeriod(delta) {
  periodAnchor = periodKind === "month" ? addMonths(periodAnchor, delta) : addDays(periodAnchor, delta * 7);
  renderAnalysis();
}

function periodLabelText() {
  if (periodKind === "month") return formatMonth(periodAnchor);
  const dates = periodDates();
  return `${formatShortDate(dates[0])} – ${formatShortDate(dates.at(-1))}`;
}

function buildTrendChart(labels, series, options = {}) {
  const width = 440;
  const height = 300;
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

  // Lücken unterbrechen die Linie, statt Werte zu erfinden.
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
    return segments.filter(segment => segment.length > 1).map(points => {
      let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const point = points[index];
        const mid = (previous.x + point.x) / 2;
        d += ` C${mid.toFixed(1)} ${previous.y.toFixed(1)}, ${mid.toFixed(1)} ${point.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      }
      return `<path class="wellbeing-line" style="--line-color:${item.color}" d="${d}"></path>`;
    }).join("");
  }).join("");

  const dots = series.map(item => item.values.map((value, index) => value === null || value === undefined
    ? ""
    : `<circle class="wellbeing-dot${index === todayIndex ? " today" : ""}" style="--line-color:${item.color}" cx="${xFor(index).toFixed(1)}" cy="${yFor(value).toFixed(1)}" r="${index === todayIndex ? 6 : 4.4}"></circle>`).join("")).join("");

  const bandWidth = labels.length > 1 ? plotWidth / (labels.length - 1) * 0.64 : 40;
  const todayBand = todayIndex < 0 ? ""
    : `<rect class="trend-today-band" x="${(xFor(todayIndex) - bandWidth / 2).toFixed(1)}" y="${padTop}" width="${bandWidth.toFixed(1)}" height="${plotHeight}" rx="10"></rect>`;

  const showEvery = Math.ceil(labels.length / 8);
  const xLabels = labels.map((label, index) => (index % showEvery === 0 || index === labels.length - 1)
    ? `<text x="${xFor(index).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="${index === todayIndex ? "today" : ""}">${escapeHTML(label)}</text>`
    : "").join("");

  const legend = series.map(item =>
    `<span style="--line-color:${item.color}"><i aria-hidden="true"></i>${escapeHTML(item.label)}</span>`).join("");

  return `<div class="trend-panel">
    <div class="trend-legend">${legend}</div>
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Verlauf von ${escapeHTML(series.map(item => item.label).join(", "))}">
      ${todayBand}
      <g class="trend-grid">${grid}</g>
      ${paths}${dots}
      <g class="trend-x-labels">${xLabels}</g>
    </svg>
    <p class="trend-note">Tage ohne Eintrag bleiben leer. Die Darstellung beschreibt den Verlauf und bewertet ihn nicht.</p>
  </div>`;
}

function renderPresence(stats) {
  const card = $("presenceCard");
  if (!card) return;
  const presence = stats.presence;
  card.hidden = !profile.modules.activities || !presence.roleCount;
  if (card.hidden) return;

  $("presenceMetrics").innerHTML = `
    <div class="role-presence-metric"><strong>${presence.activityCount}</strong><span>Aktivitäten</span></div>
    <div class="role-presence-metric"><strong>${formatPoints(presence.total)}</strong><span>Präsenzpunkte</span></div>
    <div class="role-presence-metric"><strong>${presence.represented}/${presence.roleCount}</strong><span>Rollen sichtbar</span></div>`;

  const distribution = $("presenceDistribution");
  if (!presence.total) {
    distribution.innerHTML = `<p class="role-presence-empty">Noch keine Präsenzpunkte in diesem Zeitraum. Trage in der Eintragung eine Rollenaktivität ein.</p>`;
  } else {
    const visible = presence.items.filter(item => item.points > 0);
    distribution.innerHTML = `<div class="role-presence-share" role="img" aria-label="Anteile der Rollen an der erfassten Präsenz">
        ${visible.map(item => `<span class="role-presence-segment" style="--role-color:${item.role.color};--share:${item.points / presence.total * 100}%" title="${escapeHTML(item.role.name)}"></span>`).join("")}
      </div>
      <div class="role-presence-keys">
        ${visible.map(item => `<span class="role-presence-key"><i style="--role-color:${item.role.color}"></i>${escapeHTML(item.role.emoji)} ${escapeHTML(item.role.name)} <b>${Math.round(item.points / presence.total * 100)} %</b></span>`).join("")}
      </div>`;
  }

  const max = Math.max(...presence.items.map(item => item.points), 1);
  $("presenceList").innerHTML = presence.items.map(item => {
    const count = item.rows.length
      ? `${pluralDE(item.rows.length, "Aktivität", "Aktivitäten")} · ${pluralDE(item.activeDays, "Tag", "Tage")}`
      : "keine Aktivität erfasst";
    const status = item.points === 0 ? "nicht erfasst"
      : presence.leader?.roleId === item.roleId ? "Schwerpunkt" : "sichtbar";
    return `<button type="button" class="role-split-row${item.points === 0 ? " is-open" : ""}" data-role-detail="${escapeHTML(item.roleId)}"
      style="--role-color:${item.role.color};--role-soft:${hexToRgba(item.role.color, .16)}"
      aria-label="${escapeHTML(item.role.name)}: ${formatPoints(item.points)} Präsenzpunkte, ${escapeHTML(count)}, ${escapeHTML(status)}. Details öffnen.">
      <span class="role-split-head">
        <span class="role-split-name">${escapeHTML(item.role.emoji)} ${escapeHTML(item.role.name)}</span>
        <b>${formatPoints(item.points)}</b>
      </span>
      <span class="role-split-bar"><i style="--fill:${Math.round(item.points / max * 100)}%"></i></span>
      <small class="role-split-meta"><span>${escapeHTML(count)}</span><span class="role-split-status">${escapeHTML(status)}</span></small>
    </button>`;
  }).join("");

  $("presenceList").querySelectorAll("[data-role-detail]").forEach(button =>
    on(button, "click", () => openRoleDetailDialog(button.dataset.roleDetail, presence)));
}

/* Tagesraster für Routinen und Checklisten: ein Punkt je Tag.

   Bei einem ganzen Monat wäre eine Beschriftung unter jedem der 30 Punkte
   weder lesbar noch unterzubringen – dort trägt nur noch jeder fünfte Tag
   eine Zahl. Die Zusammenfassung steht rechts in der Überschrift. */
function dotGridHTML(labels, cellHTML) {
  const dense = labels.length > 10;
  const step = dense ? 5 : 1;
  return `<div class="dot-grid${dense ? " is-dense" : ""}">${labels.map((label, index) => `<div class="dot-day">
      <small>${escapeHTML(index % step === 0 || index === labels.length - 1 ? label : "")}</small>
      ${cellHTML(index)}
    </div>`).join("")}</div>`;
}

function dotPanelHTML(caption, labels, filled) {
  const done = filled.filter(value => value === true).length;
  const tracked = filled.filter(value => value !== null).length;
  return `<div class="dot-panel">
    <span class="panel-caption">${escapeHTML(caption)}<b>${done}/${tracked}</b></span>
    ${dotGridHTML(labels, index => `<i class="${filled[index] === null ? "" : filled[index] ? "filled" : "missed"}"></i>`)}
  </div>`;
}

function renderHabitPanels(stats) {
  const card = $("habitCard");
  if (!card) return;
  const labels = stats.dates.map(date => periodKind === "month"
    ? String(Number(date.slice(-2)))
    : WEEKDAY_SHORT[weekdayOf(date)]);
  const panels = [];

  if (profile.modules.routines) {
    orderedRoutineKeys(routines).forEach(key => {
      const filled = stats.entries.map(entry => {
        if (!entry.stored) return null;
        const state = entry.data.routineStates?.[key];
        if (state === undefined || state === "") return null;
        return isRoutineSettled(state);
      });
      if (filled.every(value => value === null)) return;
      panels.push(dotPanelHTML(routines[key].title, labels, filled));
    });
  }

  if (profile.modules.trackers) {
    stats.trackers.filter(item => item.days > 0).forEach(item => {
      const tracker = item.tracker;
      if (tracker.type === "toggle") {
        panels.push(dotPanelHTML(tracker.label, labels, stats.entries.map(entry =>
          entry.stored ? Boolean(entry.data.trackers?.[tracker.id]) : null)));
        return;
      }
      if (tracker.type === "checklist") {
        const positives = tracker.states.filter(state => state.tone === "positive").map(state => state.id);
        panels.push(`<div class="dot-panel">
          <span class="panel-caption">${escapeHTML(tracker.label)}<b>${item.checklistDone.done}/${item.checklistDone.possible}</b></span>
          ${dotGridHTML(labels, index => {
            const entry = stats.entries[index];
            const value = entry.stored ? (entry.data.trackers?.[tracker.id] || {}) : null;
            return `<span class="dot-stack">${tracker.items.map(listItem =>
              `<i class="${value && positives.includes(value[listItem.id]) ? "filled" : ""}"></i>`).join("")}</span>`;
          })}
        </div>`);
        return;
      }
      if (tracker.type === "counter" || tracker.type === "number") {
        const unit = tracker.unit ? ` ${tracker.unit}` : "";
        panels.push(`<div class="metric-panel">
          <span class="panel-caption">${escapeHTML(tracker.label)}</span>
          <div class="metric-values">
            <span><b>${escapeHTML(formatNumber(item.average, tracker.decimals || 0))}${escapeHTML(unit)}</b><small>im Schnitt</small></span>
            <span><b>${escapeHTML(formatNumber(item.total, tracker.decimals || 0))}${escapeHTML(unit)}</b><small>gesamt</small></span>
            <span><b>${item.days}</b><small>erfasste Tage</small></span>
          </div>
        </div>`);
        return;
      }
      if (tracker.type === "choice" && item.topOption?.option) {
        panels.push(`<div class="metric-panel">
          <span class="panel-caption">${escapeHTML(tracker.label)}</span>
          <div class="metric-values">
            <span><b>${escapeHTML(item.topOption.option.label)}</b><small>am häufigsten</small></span>
            <span><b>${item.days}</b><small>erfasste Tage</small></span>
          </div>
        </div>`);
      }
    });
  }

  card.hidden = !panels.length;
  const visible = panels.slice(0, 4);
  const hidden = panels.slice(4);
  $("habitPanels").innerHTML = visible.join("")
    + (hidden.length ? `<details class="habit-more">
        <summary><strong>Weitere anzeigen</strong><small>${pluralDE(hidden.length, "Übersicht", "Übersichten")}</small></summary>
        <div class="habit-more-body">${hidden.join("")}</div>
      </details>` : "");
}

function renderStreakStats(stats) {
  const card = $("streakStatsCard");
  if (!card) return;
  const tracked = stats.streaks.filter(item => item.tracked);
  card.hidden = !profile.modules.streaks || !tracked.length;
  if (card.hidden) return;
  $("streakStats").innerHTML = tracked.map(item => `<div class="streak-stat-row">
    <span class="streak-stat-name">${escapeHTML(item.streak.emoji)} ${escapeHTML(item.streak.label)}</span>
    <b>${pluralDE(item.days, "Tag", "Tage")}</b>
    <small>${item.lapses ? pluralDE(item.lapses, "Unterbrechung", "Unterbrechungen") : "ohne Unterbrechung"}</small>
  </div>`).join("");
}

function routineTitleMap() {
  return Object.fromEntries(Object.entries(routines).map(([key, routine]) => [key, routine.title]));
}

function currentStats() {
  const dates = periodDates();
  return buildPeriodStats(dates, periodEntries(dates), profile, { routineTitles: routineTitleMap() });
}

function previousStats() {
  const anchor = periodKind === "month" ? addMonths(periodAnchor, -1) : addDays(periodAnchor, -7);
  const dates = periodDates(periodKind, anchor);
  return buildPeriodStats(dates, periodEntries(dates), profile, { routineTitles: routineTitleMap() });
}

/* Der Rückblick führt, statt aufzuzählen: zuerst das Bild des Zeitraums und
   die Rollen, danach – eingeklappt – die Einzelheiten zu Routinen, Tracking
   und Streaks. So bleibt die Seite lesbar, auch bei vielen Elementen. */
function renderInsights(stats, previous) {
  const insights = buildInsights(stats, profile, { kind: periodKind, previous });

  const patterns = [];
  dayTrackers(profile).filter(tracker => tracker.type === "choice").forEach(tracker => {
    orderedScales(profile).forEach(scale => {
      const pattern = choiceScalePattern(stats.entries, tracker, scale);
      if (pattern) patterns.push(pattern.text);
    });
  });

  const lead = insights.filter(item => item.group === "overview" || item.group === "roles" || item.group === "empty");
  const details = insights.filter(item => !lead.includes(item));
  const line = item => `<p class="insight tone-${item.tone}">${escapeHTML(item.text)}</p>`;

  const patternBlock = patterns.length
    ? `<div class="insight-block"><h3 class="insight-subtitle">Zusammenhänge</h3>${patterns.map(text => `<p class="insight tone-pattern">${escapeHTML(text)}</p>`).join("")}</div>`
    : "";

  const detailBlock = details.length
    ? `<details class="insight-details">
        <summary><strong>Einzelheiten</strong><small>${pluralDE(details.length, "Beobachtung", "Beobachtungen")} zu Routinen, Tracking und Streaks</small></summary>
        ${details.map(line).join("")}
      </details>`
    : "";

  $("insightList").innerHTML = lead.map(line).join("") + patternBlock + detailBlock;
}

function renderAnalysis() {
  if (!$("analysisPage")) return;
  const anyData = collectStoredReviewsRaw().length > 0;
  const empty = $("analysisEmpty");
  const body = $("analysisBody");
  if (empty && body) {
    empty.hidden = anyData;
    body.hidden = !anyData;
    if (!anyData) {
      empty.innerHTML = emptyStateHTML({
        icon: "📈",
        title: "Noch nichts auszuwerten",
        text: "Sobald du deinen ersten Tag einträgst, entstehen hier Verlauf, Rollenpräsenz und verständliche Rückblicke.",
        actionId: "emptyGoToEntry",
        actionLabel: "Zur Eintragung"
      });
      on($("emptyGoToEntry"), "click", () => switchPage("entry"));
      return;
    }
  }

  document.querySelectorAll("[data-period]").forEach(button => {
    const selected = button.dataset.period === periodKind;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  $("periodLabel").textContent = periodLabelText();
  const forward = $("periodForward");
  if (forward) {
    const next = periodKind === "month" ? addMonths(periodAnchor, 1) : addDays(periodAnchor, 7);
    forward.disabled = next > todayISO();
  }

  const stats = currentStats();
  const previous = previousStats();

  $("periodSummary").innerHTML = `
    <div class="period-metric"><strong>${stats.trackedDays}</strong><span>von ${stats.days} Tagen erfasst</span></div>
    ${stats.checkinCount ? `<div class="period-metric"><strong>${stats.checkinCount}</strong><span>Check-ins</span></div>` : ""}
    ${stats.scales.filter(item => item.average !== null).map(item =>
      `<div class="period-metric"><strong style="color:${item.scale.color}">${item.average} %</strong><span>${escapeHTML(item.scale.label)} im Schnitt</span></div>`).join("")}`;

  const trendCard = $("trendCard");
  const usableScales = stats.scales.filter(item => item.perDay.some(value => value !== null));
  trendCard.hidden = !profile.modules.checkins || !usableScales.length;
  if (!trendCard.hidden) {
    const labels = stats.dates.map(date => periodKind === "month" ? String(Number(date.slice(-2))) : WEEKDAY_SHORT[weekdayOf(date)]);
    $("trendArea").innerHTML = buildTrendChart(labels,
      usableScales.map(item => ({ label: item.scale.label, color: item.scale.color, values: item.perDay })),
      { todayIndex: stats.dates.indexOf(todayISO()) });
  }

  renderPresence(stats);
  renderHabitPanels(stats);
  renderStreakStats(stats);

  renderInsights(stats, previous);
}

function openRoleDetailDialog(roleId, presence) {
  if (!$("roleDetailDialog")) return;
  const role = findRole(profile, roleId);
  const entry = presence.items.find(item => item.roleId === roleId);
  $("roleDetailTitle").textContent = role ? `${role.emoji} ${role.name}` : "Rolle";

  const byDate = new Map();
  (entry?.rows || []).forEach(row => {
    if (!byDate.has(row.date)) byDate.set(row.date, []);
    byDate.get(row.date).push(row);
  });
  const days = [...byDate.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([date, rows]) => {
    const daySum = roundPoints(rows.reduce((sum, row) => sum + row.points, 0));
    return `<div class="role-detail-day">
      <div class="role-detail-day-head"><strong>${escapeHTML(formatLongDate(date))}</strong><b>${formatPoints(daySum)}</b></div>
      ${rows.map(row => `<div class="role-detail-row">
        <span>${escapeHTML(row.title)}${row.capped && row.entries > 1 ? ` <small>(${row.entries} Einträge · Tagesbegrenzung)</small>` : ""}</span>
        <b>${formatPoints(row.points)}</b>
      </div>`).join("")}
    </div>`;
  }).join("");

  const goals = (role?.goals || []).length
    ? `<div class="role-detail-goals"><strong>Ziele</strong><ul>${role.goals.map(goal => `<li>${escapeHTML(goal.title)}</li>`).join("")}</ul></div>`
    : "";

  $("roleDetailBody").innerHTML = `${role?.description ? `<p class="role-detail-description">${escapeHTML(role.description)}</p>` : ""}${goals}`
    + (entry && entry.rows.length
      ? `${days}<div class="role-detail-total"><strong>Gesamt</strong><b>${formatPoints(entry.points)}</b></div>`
      : `<p class="section-hint">In diesem Zeitraum sind für diese Rolle noch keine Aktivitäten eingetragen.</p>`);
  $("roleDetailDialog").showModal();
}

/* --------------------------------------------------------------------------
   15. Profil – das persönliche System verwalten
   -------------------------------------------------------------------------- */

function moveProfileItem(list, id, delta) {
  const ordered = sortByOrder(list);
  const index = ordered.findIndex(item => item.id === id);
  const target = index + delta;
  if (index < 0 || target < 0 || target >= ordered.length) return false;
  [ordered[index].order, ordered[target].order] = [ordered[target].order, ordered[index].order];
  return true;
}

function profileRowHTML({ id, icon, title, meta, accent = "", badges = [], first, last }) {
  return `<div class="profile-row" data-profile-id="${escapeHTML(id)}" ${accent ? `style="--row-color:${accent};--row-soft:${hexToRgba(accent, .14)}"` : ""}>
    <button type="button" class="profile-row-main" data-edit="${escapeHTML(id)}">
      <span class="profile-row-icon" aria-hidden="true">${escapeHTML(icon)}</span>
      <span class="profile-row-copy">
        <strong>${escapeHTML(title)}</strong>
        <small>${escapeHTML(meta)}</small>
        ${badges.length ? `<span class="profile-row-badges">${badges.map(badge => `<i>${escapeHTML(badge)}</i>`).join("")}</span>` : ""}
      </span>
    </button>
    <div class="profile-row-sort" aria-label="Reihenfolge ändern">
      <button type="button" data-move="-1" data-id="${escapeHTML(id)}" ${first ? "disabled" : ""} aria-label="Nach oben">↑</button>
      <button type="button" data-move="1" data-id="${escapeHTML(id)}" ${last ? "disabled" : ""} aria-label="Nach unten">↓</button>
    </div>
  </div>`;
}

function renderProfileRoles() {
  const list = $("profileRoleList");
  if (!list) return;
  const roles = activeRoles(profile);
  if (!roles.length) {
    list.innerHTML = emptyStateHTML({
      icon: "🎭",
      title: "Noch keine Rollen angelegt",
      text: "Welche Rollen spielen in deinem Leben eine wichtige Rolle? Erstelle deine erste Rolle und baue dein persönliches ROLEPLAY auf.",
      actionId: "emptyProfileAddRole",
      actionLabel: "Rolle erstellen"
    });
    on($("emptyProfileAddRole"), "click", () => openRoleDialog());
    return;
  }
  list.innerHTML = roles.map((role, index) => {
    const days = role.activeDays.length
      ? WEEKDAY_ORDER.filter(day => role.activeDays.includes(day)).map(day => WEEKDAY_SHORT[day]).join(", ")
      : "";
    const badges = [];
    if (role.goals.length) badges.push(pluralDE(role.goals.length, "Ziel", "Ziele"));
    if (days) badges.push(days);
    return profileRowHTML({
      id: role.id, icon: role.emoji, title: role.name,
      meta: role.description || "Keine Bedeutung hinterlegt",
      accent: role.color, badges,
      first: index === 0, last: index === roles.length - 1
    });
  }).join("");
  list.querySelectorAll("[data-edit]").forEach(button => on(button, "click", () => openRoleDialog(button.dataset.edit)));
  list.querySelectorAll("[data-move]").forEach(button => on(button, "click", () => {
    if (!moveProfileItem(profile.roles, button.dataset.id, Number(button.dataset.move))) return;
    saveProfile();
    renderProfilePage();
  }));
}

function trackerMetaText(tracker) {
  const type = trackerTypeMeta(tracker.type).label;
  switch (tracker.type) {
    case "counter": return `${type} · Schritt ${formatNumber(tracker.step, tracker.decimals)}${tracker.unit ? ` ${tracker.unit}` : ""}`;
    case "number": return `${type}${tracker.unit ? ` · ${tracker.unit}` : ""}`;
    case "choice": return `${type} · ${pluralDE(tracker.options.length, "Option", "Optionen")}`;
    case "checklist": return `${type} · ${pluralDE(tracker.items.length, "Punkt", "Punkte")}`;
    default: return type;
  }
}

function renderProfileTrackers() {
  const list = $("profileTrackerList");
  if (!list) return;
  const trackers = sortByOrder(profile.trackers);
  if (!trackers.length) {
    list.innerHTML = emptyStateHTML({
      icon: "📊",
      title: "Noch kein Tracking eingerichtet",
      text: "Trackingelemente sind das, was du täglich festhalten willst – von Wasser über Schlaf bis zu einem eigenen Ritual.",
      actionId: "emptyProfileAddTracker",
      actionLabel: "Trackingelement erstellen"
    });
    on($("emptyProfileAddTracker"), "click", () => openTrackerDialog());
    return;
  }
  list.innerHTML = trackers.map((tracker, index) => profileRowHTML({
    id: tracker.id, icon: tracker.emoji || "📊", title: tracker.label,
    meta: trackerMetaText(tracker),
    badges: tracker.enabled ? [] : ["ausgeblendet"],
    first: index === 0, last: index === trackers.length - 1
  })).join("");
  list.querySelectorAll("[data-edit]").forEach(button => on(button, "click", () => openTrackerDialog(button.dataset.edit)));
  list.querySelectorAll("[data-move]").forEach(button => on(button, "click", () => {
    if (!moveProfileItem(profile.trackers, button.dataset.id, Number(button.dataset.move))) return;
    saveProfile();
    renderProfilePage();
  }));
}

function renderProfileScales() {
  const list = $("profileScaleList");
  if (!list) return;
  const scales = orderedScales(profile);
  list.innerHTML = scales.map((scale, index) => profileRowHTML({
    id: scale.id, icon: "◐", title: scale.label,
    meta: `${scale.lowLabel} → ${scale.highLabel}`,
    accent: scale.color,
    badges: scale.inMode ? ["Modus"] : [],
    first: index === 0, last: index === scales.length - 1
  })).join("");
  list.querySelectorAll("[data-edit]").forEach(button => on(button, "click", () => openScaleDialog(button.dataset.edit)));
  list.querySelectorAll("[data-move]").forEach(button => on(button, "click", () => {
    if (!moveProfileItem(profile.scales, button.dataset.id, Number(button.dataset.move))) return;
    saveProfile();
    renderProfilePage();
  }));
}

function renderProfileStreaks() {
  const list = $("profileStreakList");
  if (!list) return;
  const streaks = activeStreaks(profile);
  if (!streaks.length) {
    list.innerHTML = emptyStateHTML({
      icon: "🔥",
      title: "Noch keine Streaks angelegt",
      text: "Ein Streak zählt die Tage, an denen du etwas durchhältst – und macht sichtbar, wie weit du gekommen bist.",
      actionId: "emptyProfileAddStreak",
      actionLabel: "Streak erstellen"
    });
    on($("emptyProfileAddStreak"), "click", () => openStreakDialog());
    return;
  }
  list.innerHTML = streaks.map((streak, index) => profileRowHTML({
    id: streak.id, icon: streak.emoji, title: streak.label,
    meta: streak.description || `Aktuell ${pluralDE(Number(currentData?.streaks?.[streak.id]?.days || 0), "Tag", "Tage")}`,
    first: index === 0, last: index === streaks.length - 1
  })).join("");
  list.querySelectorAll("[data-edit]").forEach(button => on(button, "click", () => openStreakDialog(button.dataset.edit)));
  list.querySelectorAll("[data-move]").forEach(button => on(button, "click", () => {
    if (!moveProfileItem(profile.streaks, button.dataset.id, Number(button.dataset.move))) return;
    saveProfile();
    renderProfilePage();
  }));
}

function switchRowHTML(id, label, hint, checked) {
  return `<label class="switch-row">
    <span><strong>${escapeHTML(label)}</strong><small>${escapeHTML(hint)}</small></span>
    <input type="checkbox" data-switch="${escapeHTML(id)}" ${checked ? "checked" : ""}>
  </label>`;
}

function renderProfileSettings() {
  const modules = $("moduleList");
  if (modules) {
    modules.innerHTML = MODULE_KEYS.map(key =>
      switchRowHTML(`module:${key}`, MODULE_META[key].label, MODULE_META[key].hint, profile.modules[key])).join("");
  }
  const settings = $("settingsList");
  if (settings) {
    settings.innerHTML = [
      switchRowHTML("setting:roleRotation", "Rolle automatisch vorschlagen", "Nutzt die festen Wochentage deiner Rollen.", profile.settings.roleRotation),
      switchRowHTML("setting:showCoach", "Rollenmodus und Impuls zeigen", "Eine kurze Einordnung, wie viel du dir heute zumuten solltest.", profile.settings.showCoach),
      switchRowHTML("setting:protectStreaks", "Streaks geschützt anzeigen", "Fragt vor dem Einblenden kurz nach.", profile.settings.protectStreaks)
    ].join("");
  }
  document.querySelectorAll("[data-switch]").forEach(input => on(input, "change", () => {
    const [group, key] = input.dataset.switch.split(":");
    if (group === "module") profile.modules[key] = input.checked;
    else profile.settings[key] = input.checked;
    saveProfile();
    if (key === "roleRotation" && input.checked && !currentData.roleId) {
      currentData.roleId = rotationRoleId(profile, selectedDate);
      saveReview(true);
    }
    renderEntryPage();
    renderProfilePage();
  }));
  if ($("themeSelect")) $("themeSelect").value = profile.settings.theme;
}

function renderProfilePage() {
  if (!profile) return;
  if ($("displayName") && document.activeElement !== $("displayName")) $("displayName").value = profile.displayName || "";
  if ($("profileAvatar")) $("profileAvatar").textContent = activeRoles(profile)[0]?.emoji || "🎭";
  if ($("profileSummary")) {
    const parts = [
      pluralDE(activeRoles(profile).length, "Rolle", "Rollen"),
      pluralDE(Object.keys(routines).length, "Routine", "Routinen"),
      pluralDE(dayTrackers(profile).length, "Trackingelement", "Trackingelemente"),
      pluralDE(activeStreaks(profile).length, "Streak", "Streaks")
    ];
    $("profileSummary").textContent = `Dein System: ${joinDE(parts)}.`;
  }
  if ($("profileRoutineSummary")) {
    const count = Object.keys(routines).length;
    $("profileRoutineSummary").textContent = count
      ? `${pluralDE(count, "Routine", "Routinen")} mit insgesamt ${pluralDE(Object.values(routines).reduce((sum, routine) => sum + routine.items.length, 0), "Schritt", "Schritten")}.`
      : "Noch keine Routine angelegt. Routinen sind feste Abläufe mit Timer und Kontext.";
  }
  renderProfileRoles();
  renderProfileTrackers();
  renderProfileScales();
  renderProfileStreaks();
  renderProfileSettings();
  if ($("appVersionLabel")) $("appVersionLabel").textContent = `ROLEPLAY ${APP_VERSION}`;
}

/* --------------------------------------------------------------------------
   16. Rollen-Editor
   -------------------------------------------------------------------------- */

function renderRoleColorPicker() {
  const picker = $("roleColorPicker");
  if (!picker) return;
  picker.innerHTML = ROLE_COLORS.map(color =>
    `<button type="button" class="color-dot${color.toLowerCase() === roleDraft.color.toLowerCase() ? " is-selected" : ""}"
      style="--dot:${color}" data-color="${color}" role="radio" aria-checked="${color.toLowerCase() === roleDraft.color.toLowerCase()}" aria-label="Farbe ${color}"></button>`).join("");
  picker.querySelectorAll("[data-color]").forEach(button => on(button, "click", () => {
    roleDraft.color = button.dataset.color;
    renderRoleColorPicker();
  }));
}

function renderRoleGoals() {
  const list = $("roleGoalList");
  if (!list) return;
  list.innerHTML = roleDraft.goals.length
    ? roleDraft.goals.map((goal, index) => `<div class="goal-row">
        <span>${escapeHTML(goal.title)}</span>
        <button type="button" class="delete-button" data-remove-goal="${index}" aria-label="Ziel entfernen">×</button>
      </div>`).join("")
    : `<p class="field-hint">Noch keine Ziele. Ziele machen konkret, worauf diese Rolle hinarbeitet.</p>`;
  list.querySelectorAll("[data-remove-goal]").forEach(button => on(button, "click", () => {
    roleDraft.goals.splice(Number(button.dataset.removeGoal), 1);
    renderRoleGoals();
  }));
}

function renderRoleDayPicker() {
  const picker = $("roleDayPicker");
  if (!picker) return;
  picker.innerHTML = WEEKDAY_ORDER.map(day => {
    const selected = roleDraft.activeDays.includes(day);
    return `<button type="button" class="day-chip${selected ? " is-selected" : ""}" data-day="${day}" aria-pressed="${selected}">${WEEKDAY_SHORT[day]}</button>`;
  }).join("");
  picker.querySelectorAll("[data-day]").forEach(button => on(button, "click", () => {
    const day = Number(button.dataset.day);
    roleDraft.activeDays = roleDraft.activeDays.includes(day)
      ? roleDraft.activeDays.filter(item => item !== day)
      : [...roleDraft.activeDays, day].sort((a, b) => a - b);
    renderRoleDayPicker();
  }));
}

function openRoleDialog(roleId = null) {
  const existing = roleId ? findRole(profile, roleId) : null;
  roleDraft = existing
    ? { ...existing, goals: existing.goals.map(goal => ({ ...goal })), activeDays: [...existing.activeDays] }
    : { id: "", name: "", emoji: "🎭", color: nextRoleColor(profile.roles.map(role => role.color)), description: "", goals: [], activeDays: [] };

  $("roleDialogTitle").textContent = existing ? "Rolle bearbeiten" : "Rolle erstellen";
  $("roleDialog").dataset.editing = existing?.id || "";
  $("roleName").value = roleDraft.name;
  $("roleEmoji").value = roleDraft.emoji;
  $("roleDescription").value = roleDraft.description;
  $("roleGoalInput").value = "";
  $("deleteRole").hidden = !existing;
  renderRoleColorPicker();
  renderRoleGoals();
  renderRoleDayPicker();
  $("roleDialog").showModal();
}

function addRoleGoalFromInput() {
  const input = $("roleGoalInput");
  const title = input.value.trim();
  if (!title) return;
  roleDraft.goals.push({ id: uid("goal"), title, done: false, order: roleDraft.goals.length });
  input.value = "";
  renderRoleGoals();
  input.focus();
}

function saveRoleFromForm(event) {
  event.preventDefault();
  const name = $("roleName").value.trim();
  if (!name) return;
  const editingId = $("roleDialog").dataset.editing;
  const payload = {
    id: editingId || slugify(name, "rolle"),
    name,
    emoji: $("roleEmoji").value.trim() || "🎭",
    color: roleDraft.color,
    description: $("roleDescription").value.trim(),
    goals: roleDraft.goals,
    activeDays: roleDraft.activeDays,
    order: editingId ? findRole(profile, editingId).order : profile.roles.length,
    archived: false,
    routineIds: editingId ? findRole(profile, editingId).routineIds : []
  };
  if (editingId) {
    const index = profile.roles.findIndex(role => role.id === editingId);
    profile.roles[index] = normalizeRole(payload, index, profile.roles.filter(role => role.id !== editingId).map(role => role.id));
  } else {
    profile.roles.push(normalizeRole(payload, profile.roles.length, profile.roles.map(role => role.id)));
  }
  saveProfile();
  $("roleDialog").close();
  if (!currentData.roleId) {
    currentData.roleId = rotationRoleId(profile, selectedDate);
    saveReview(true);
  }
  renderEntryPage();
  renderProfilePage();
  showToast(editingId ? "Rolle gespeichert." : "Rolle erstellt.");
}

/* Eine gelöschte Rolle wird archiviert, nicht entfernt: bereits gespeicherte
   Tage behalten dadurch ihre Zuordnung und ihre Auswertung. */
function deleteRoleFromDialog() {
  const roleId = $("roleDialog").dataset.editing;
  const role = findRole(profile, roleId);
  if (!role) return;
  if (!window.confirm(`„${role.name}" wirklich entfernen?\n\nBereits eingetragene Tage behalten ihre Aktivitäten – die Rolle verschwindet nur aus den täglichen Ansichten.`)) return;
  role.archived = true;
  saveProfile();
  $("roleDialog").close();
  if (currentData.roleId === roleId) {
    currentData.roleId = rotationRoleId(profile, selectedDate);
    saveReview(true);
  }
  renderEntryPage();
  renderProfilePage();
  showToast("Rolle archiviert.");
}

/* --------------------------------------------------------------------------
   17. Tracker-Editor

   Die Konfiguration richtet sich nach der gewählten Art. Listenpunkte und
   Optionen werden im Dialog direkt bearbeitet.
   -------------------------------------------------------------------------- */

function renderTrackerConfig() {
  const container = $("trackerConfig");
  if (!container) return;
  const type = trackerDraft.type;
  $("trackerTypeHint").textContent = trackerTypeMeta(type).hint;

  if (type === "counter") {
    container.innerHTML = `<div class="two-column">
        <div class="field-group"><label for="trackerStep">Schrittweite</label>
          <input id="trackerStep" type="number" inputmode="decimal" min="0.1" step="0.1" value="${trackerDraft.step ?? 1}"></div>
        <div class="field-group"><label for="trackerUnit">Einheit</label>
          <input id="trackerUnit" value="${escapeHTML(trackerDraft.unit || "")}" placeholder="z. B. Liter"></div>
      </div>
      <div class="two-column">
        <div class="field-group"><label for="trackerTarget">Tagesziel</label>
          <input id="trackerTarget" type="number" inputmode="decimal" step="0.1" value="${trackerDraft.target ?? ""}" placeholder="optional"></div>
        <div class="field-group"><label for="trackerDecimals">Nachkommastellen</label>
          <select id="trackerDecimals">${[0, 1, 2].map(value => `<option value="${value}" ${Number(trackerDraft.decimals ?? 0) === value ? "selected" : ""}>${value}</option>`).join("")}</select></div>
      </div>`;
    return;
  }
  if (type === "number") {
    container.innerHTML = `<div class="two-column">
      <div class="field-group"><label for="trackerUnit">Einheit</label>
        <input id="trackerUnit" value="${escapeHTML(trackerDraft.unit || "")}" placeholder="z. B. Schritte"></div>
      <div class="field-group"><label for="trackerTarget">Tagesziel</label>
        <input id="trackerTarget" type="number" inputmode="numeric" value="${trackerDraft.target ?? ""}" placeholder="optional"></div>
    </div>`;
    return;
  }
  if (type === "text") {
    container.innerHTML = `<div class="field-group"><label for="trackerPlaceholder">Platzhaltertext</label>
        <input id="trackerPlaceholder" value="${escapeHTML(trackerDraft.placeholder || "")}" placeholder="z. B. Wofür bist du dankbar?"></div>
      <div class="field-group"><label for="trackerRows">Höhe des Feldes</label>
        <select id="trackerRows">${[1, 2, 3, 5, 8].map(value => `<option value="${value}" ${Number(trackerDraft.rows ?? 2) === value ? "selected" : ""}>${value} Zeilen</option>`).join("")}</select></div>`;
    return;
  }
  if (type === "scale") {
    container.innerHTML = `<div class="two-column">
      <div class="field-group"><label for="trackerLow">Unteres Ende</label><input id="trackerLow" value="${escapeHTML(trackerDraft.lowLabel || "niedrig")}"></div>
      <div class="field-group"><label for="trackerHigh">Oberes Ende</label><input id="trackerHigh" value="${escapeHTML(trackerDraft.highLabel || "hoch")}"></div>
    </div>
    <p class="field-hint">Regler erscheinen in jedem Check-in. Du kannst sie auch direkt unter „Check-in-Regler“ verwalten.</p>`;
    return;
  }
  if (type === "choice") {
    container.innerHTML = `<div class="field-group">
      <span class="field-label">Optionen</span>
      <div id="trackerOptionList" class="editable-list"></div>
      <div class="inline-add">
        <input id="trackerOptionInput" placeholder="Option hinzufügen …">
        <button id="addTrackerOption" type="button" class="small-button">Hinzufügen</button>
      </div>
    </div>`;
    renderTrackerOptions();
    on($("addTrackerOption"), "click", addTrackerOption);
    on($("trackerOptionInput"), "keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      addTrackerOption();
    });
    return;
  }
  if (type === "checklist") {
    container.innerHTML = `<div class="field-group">
      <span class="field-label">Punkte der Checkliste</span>
      <div id="trackerItemList" class="editable-list"></div>
      <div class="inline-add">
        <input id="trackerItemInput" placeholder="Punkt hinzufügen …">
        <button id="addTrackerItem" type="button" class="small-button">Hinzufügen</button>
      </div>
      <small class="field-hint">Tippen wechselt im Alltag zwischen: ${trackerDraft.states.map(state => state.label).join(" → ")}.</small>
    </div>`;
    renderTrackerItems();
    on($("addTrackerItem"), "click", addTrackerItem);
    on($("trackerItemInput"), "keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      addTrackerItem();
    });
    return;
  }
  container.innerHTML = "";
}

function renderTrackerOptions() {
  const list = $("trackerOptionList");
  if (!list) return;
  list.innerHTML = trackerDraft.options.length
    ? trackerDraft.options.map((option, index) => `<div class="editable-row">
        <span>${escapeHTML(option.label)}</span>
        <button type="button" class="delete-button" data-remove-option="${index}" aria-label="Option entfernen">×</button>
      </div>`).join("")
    : `<p class="field-hint">Noch keine Optionen.</p>`;
  list.querySelectorAll("[data-remove-option]").forEach(button => on(button, "click", () => {
    trackerDraft.options.splice(Number(button.dataset.removeOption), 1);
    renderTrackerOptions();
  }));
}

function addTrackerOption() {
  const input = $("trackerOptionInput");
  const label = input.value.trim();
  if (!label) return;
  trackerDraft.options.push({ id: uniqueId(slugify(label, "option"), trackerDraft.options.map(option => option.id)), label, score: null, color: "" });
  input.value = "";
  renderTrackerOptions();
  input.focus();
}

function renderTrackerItems() {
  const list = $("trackerItemList");
  if (!list) return;
  list.innerHTML = trackerDraft.items.length
    ? trackerDraft.items.map((item, index) => `<div class="editable-row">
        <span>${escapeHTML(item.label)}</span>
        <button type="button" class="delete-button" data-remove-item="${index}" aria-label="Punkt entfernen">×</button>
      </div>`).join("")
    : `<p class="field-hint">Noch keine Punkte.</p>`;
  list.querySelectorAll("[data-remove-item]").forEach(button => on(button, "click", () => {
    trackerDraft.items.splice(Number(button.dataset.removeItem), 1);
    renderTrackerItems();
  }));
}

function addTrackerItem() {
  const input = $("trackerItemInput");
  const label = input.value.trim();
  if (!label) return;
  trackerDraft.items.push({ id: uniqueId(slugify(label, "punkt"), trackerDraft.items.map(item => item.id)), label });
  input.value = "";
  renderTrackerItems();
  input.focus();
}

function openTrackerDialog(trackerId = null) {
  const existing = trackerId ? findTracker(profile, trackerId) : null;
  trackerDraft = existing
    ? normalizeTracker(JSON.parse(JSON.stringify(existing)), 0, [])
    : normalizeTracker({ type: "counter", step: 1, unit: "", enabled: true }, 0, []);
  if (!trackerDraft.options) trackerDraft.options = [];
  if (!trackerDraft.items) trackerDraft.items = [];
  if (!trackerDraft.states) trackerDraft.states = DEFAULT_CHECKLIST_STATES.map(state => ({ ...state }));

  $("trackerDialogTitle").textContent = existing ? "Trackingelement bearbeiten" : "Trackingelement erstellen";
  $("trackerDialog").dataset.editing = existing?.id || "";
  $("trackerLabel").value = existing?.label || "";
  $("trackerEmoji").value = existing?.emoji || "";
  $("trackerType").innerHTML = TRACKER_TYPES.map(type =>
    `<option value="${type.key}">${escapeHTML(type.label)}</option>`).join("");
  $("trackerType").value = trackerDraft.type;
  $("trackerType").disabled = Boolean(existing);
  $("deleteTracker").hidden = !existing;
  renderTrackerConfig();
  $("trackerDialog").showModal();
}

function trackerConfigFromForm() {
  const type = trackerDraft.type;
  const config = { type };
  if (type === "counter") {
    config.step = Number($("trackerStep")?.value) || 1;
    config.unit = $("trackerUnit")?.value.trim() || "";
    config.target = $("trackerTarget")?.value === "" ? null : Number($("trackerTarget").value);
    config.decimals = Number($("trackerDecimals")?.value) || 0;
  }
  if (type === "number") {
    config.unit = $("trackerUnit")?.value.trim() || "";
    config.target = $("trackerTarget")?.value === "" ? null : Number($("trackerTarget").value);
  }
  if (type === "text") {
    config.placeholder = $("trackerPlaceholder")?.value.trim() || "";
    config.rows = Number($("trackerRows")?.value) || 2;
  }
  if (type === "scale") {
    config.lowLabel = $("trackerLow")?.value.trim() || "niedrig";
    config.highLabel = $("trackerHigh")?.value.trim() || "hoch";
  }
  if (type === "choice") config.options = trackerDraft.options;
  if (type === "checklist") { config.items = trackerDraft.items; config.states = trackerDraft.states; }
  return config;
}

function saveTrackerFromForm(event) {
  event.preventDefault();
  const label = $("trackerLabel").value.trim();
  if (!label) return;
  const editingId = $("trackerDialog").dataset.editing;
  const config = trackerConfigFromForm();

  if (config.type === "choice" && !config.options.length) { showToast("Lege mindestens eine Option an."); return; }
  if (config.type === "checklist" && !config.items.length) { showToast("Lege mindestens einen Punkt an."); return; }

  // Ein Regler gehört zu den Check-in-Skalen, nicht zu den Tagestrackern.
  if (config.type === "scale") {
    const payload = {
      id: editingId || slugify(label, "skala"),
      label, lowLabel: config.lowLabel, highLabel: config.highLabel,
      color: nextRoleColor(profile.scales.map(scale => scale.color)),
      inMode: false, order: profile.scales.length
    };
    profile.scales.push(normalizeScale(payload, profile.scales.length, profile.scales.map(scale => scale.id)));
    saveProfile();
    $("trackerDialog").close();
    renderEntryPage();
    renderProfilePage();
    showToast("Regler angelegt.");
    return;
  }

  const payload = {
    ...config,
    id: editingId || slugify(label, "tracker"),
    label,
    emoji: $("trackerEmoji").value.trim(),
    enabled: editingId ? findTracker(profile, editingId).enabled : true,
    order: editingId ? findTracker(profile, editingId).order : profile.trackers.length
  };
  if (editingId) {
    const index = profile.trackers.findIndex(tracker => tracker.id === editingId);
    profile.trackers[index] = normalizeTracker(payload, index, profile.trackers.filter(tracker => tracker.id !== editingId).map(tracker => tracker.id));
  } else {
    profile.trackers.push(normalizeTracker(payload, profile.trackers.length, profile.trackers.map(tracker => tracker.id)));
    profile.modules.trackers = true;
  }
  saveProfile();
  $("trackerDialog").close();
  currentData = loadReview(selectedDate);
  renderEntryPage();
  renderProfilePage();
  showToast(editingId ? "Trackingelement gespeichert." : "Trackingelement erstellt.");
}

/* Ausblenden statt löschen: der Tracker verschwindet aus dem Alltag, seine
   bisherigen Werte bleiben in den Tagen und in der Auswertung erhalten. */
function deleteTrackerFromDialog() {
  const trackerId = $("trackerDialog").dataset.editing;
  const tracker = findTracker(profile, trackerId);
  if (!tracker) return;
  const remove = window.confirm(`„${tracker.label}" entfernen?\n\nOK: endgültig löschen, auch aus der Auswertung.\nAbbrechen: nur ausblenden – bisherige Werte bleiben erhalten.`);
  if (remove) {
    profile.trackers = profile.trackers.filter(item => item.id !== trackerId);
  } else {
    tracker.enabled = false;
  }
  saveProfile();
  $("trackerDialog").close();
  renderEntryPage();
  renderProfilePage();
  showToast(remove ? "Trackingelement gelöscht." : "Trackingelement ausgeblendet.");
}

/* --------------------------------------------------------------------------
   18. Regler-Editor
   -------------------------------------------------------------------------- */

let scaleDraftColor = "";

function renderScaleColorPicker() {
  const picker = $("scaleColorPicker");
  if (!picker) return;
  picker.innerHTML = ROLE_COLORS.map(color =>
    `<button type="button" class="color-dot${color.toLowerCase() === scaleDraftColor.toLowerCase() ? " is-selected" : ""}"
      style="--dot:${color}" data-scale-color="${color}" role="radio" aria-checked="${color.toLowerCase() === scaleDraftColor.toLowerCase()}" aria-label="Farbe ${color}"></button>`).join("");
  picker.querySelectorAll("[data-scale-color]").forEach(button => on(button, "click", () => {
    scaleDraftColor = button.dataset.scaleColor;
    renderScaleColorPicker();
  }));
}

function openScaleDialog(scaleId = null) {
  const existing = scaleId ? profile.scales.find(scale => scale.id === scaleId) : null;
  scaleDraftColor = existing?.color || nextRoleColor(profile.scales.map(scale => scale.color));
  $("scaleDialogTitle").textContent = existing ? "Regler bearbeiten" : "Regler erstellen";
  $("scaleDialog").dataset.editing = existing?.id || "";
  $("scaleLabel").value = existing?.label || "";
  $("scaleLow").value = existing?.lowLabel || "";
  $("scaleHigh").value = existing?.highLabel || "";
  $("scalePreset").innerHTML = `<option value="">Aus den Beschriftungen ableiten</option>`
    + SCALE_PRESET_KEYS.map(key => `<option value="${key}">${escapeHTML(SCALE_MEANING_PRESETS[key].label)}</option>`).join("");
  $("scalePreset").value = existing?.preset || "";
  $("scaleInMode").checked = existing ? existing.inMode : false;
  // Der letzte modusbildende Regler darf nicht abgewählt werden.
  const modeCount = modeScales(profile).length;
  $("scaleInMode").disabled = Boolean(existing?.inMode && modeCount <= 1);
  $("deleteScale").hidden = !existing || profile.scales.length <= 1;
  renderScaleColorPicker();
  $("scaleDialog").showModal();
}

function saveScaleFromForm(event) {
  event.preventDefault();
  const label = $("scaleLabel").value.trim();
  if (!label) return;
  const editingId = $("scaleDialog").dataset.editing;
  const payload = {
    id: editingId || slugify(label, "skala"),
    label,
    lowLabel: $("scaleLow").value.trim() || "niedrig",
    highLabel: $("scaleHigh").value.trim() || "hoch",
    color: scaleDraftColor,
    preset: $("scalePreset").value,
    inMode: $("scaleInMode").checked,
    order: editingId ? profile.scales.find(scale => scale.id === editingId).order : profile.scales.length
  };
  if (editingId) {
    const index = profile.scales.findIndex(scale => scale.id === editingId);
    profile.scales[index] = normalizeScale(payload, index, profile.scales.filter(scale => scale.id !== editingId).map(scale => scale.id));
  } else {
    profile.scales.push(normalizeScale(payload, profile.scales.length, profile.scales.map(scale => scale.id)));
  }
  saveProfile();
  $("scaleDialog").close();
  currentData = loadReview(selectedDate);
  renderEntryPage();
  renderProfilePage();
  showToast(editingId ? "Regler gespeichert." : "Regler erstellt.");
}

function deleteScaleFromDialog() {
  const scaleId = $("scaleDialog").dataset.editing;
  const scale = profile.scales.find(item => item.id === scaleId);
  if (!scale || profile.scales.length <= 1) return;
  if (!window.confirm(`Regler „${scale.label}" entfernen?\n\nBereits erfasste Werte bleiben in den gespeicherten Tagen enthalten, erscheinen aber nicht mehr in neuen Check-ins.`)) return;
  profile.scales = profile.scales.filter(item => item.id !== scaleId);
  saveProfile();
  $("scaleDialog").close();
  currentData = loadReview(selectedDate);
  renderEntryPage();
  renderProfilePage();
  showToast("Regler entfernt.");
}

/* --------------------------------------------------------------------------
   19. Streak-Editor
   -------------------------------------------------------------------------- */

function openStreakDialog(streakId = null) {
  const existing = streakId ? findStreak(profile, streakId) : null;
  $("streakDialogTitle").textContent = existing ? "Streak bearbeiten" : "Streak erstellen";
  $("streakDialog").dataset.editing = existing?.id || "";
  $("streakLabel").value = existing?.label || "";
  $("streakEmoji").value = existing?.emoji || "🔥";
  $("streakDescription").value = existing?.description || "";
  $("streakStartDays").value = existing ? Number(currentData?.streaks?.[existing.id]?.days || 0) : 0;
  $("streakStartDays").parentElement.hidden = Boolean(existing);
  $("deleteStreak").hidden = !existing;
  $("streakDialog").showModal();
}

function saveStreakFromForm(event) {
  event.preventDefault();
  const label = $("streakLabel").value.trim();
  if (!label) return;
  const editingId = $("streakDialog").dataset.editing;
  const payload = {
    id: editingId || slugify(label, "streak"),
    label,
    emoji: $("streakEmoji").value.trim() || "🔥",
    description: $("streakDescription").value.trim(),
    order: editingId ? findStreak(profile, editingId).order : profile.streaks.length,
    archived: false
  };
  if (editingId) {
    const index = profile.streaks.findIndex(streak => streak.id === editingId);
    profile.streaks[index] = normalizeStreak(payload, index, profile.streaks.filter(streak => streak.id !== editingId).map(streak => streak.id));
  } else {
    const streak = normalizeStreak(payload, profile.streaks.length, profile.streaks.map(item => item.id));
    profile.streaks.push(streak);
    profile.modules.streaks = true;
    saveProfile();
    currentData = loadReview(selectedDate);
    currentData.streaks[streak.id] = { days: Math.max(0, Number($("streakStartDays").value || 0)), broken: false, todayStatus: "" };
    saveReview(true);
  }
  saveProfile();
  $("streakDialog").close();
  currentData = loadReview(selectedDate);
  renderEntryPage();
  renderProfilePage();
  showToast(editingId ? "Streak gespeichert." : "Streak erstellt.");
}

function deleteStreakFromDialog() {
  const streakId = $("streakDialog").dataset.editing;
  const streak = findStreak(profile, streakId);
  if (!streak) return;
  if (!window.confirm(`Streak „${streak.label}" entfernen?\n\nBereits gespeicherte Tage behalten ihren Stand.`)) return;
  streak.archived = true;
  saveProfile();
  $("streakDialog").close();
  renderEntryPage();
  renderProfilePage();
  showToast("Streak archiviert.");
}

/* --------------------------------------------------------------------------
   20. Routinen

   Routinen sind eigene Objekte des Nutzers. Die App bringt keine mit; die
   Übersicht erklärt beim ersten Besuch, wofür sie da sind.
   -------------------------------------------------------------------------- */

function createRoutineKey(title) {
  const base = slugify(title, "routine");
  return uniqueId(base, Object.keys(routines));
}

function renderRoutineCards() {
  const container = $("routineCards");
  const empty = $("routineEmpty");
  if (!container) return;
  const keys = orderedRoutineKeys(routines);
  if (empty) {
    empty.hidden = keys.length > 0;
    if (!keys.length) {
      empty.innerHTML = emptyStateHTML({
        icon: "🌱",
        title: "Noch keine Routine",
        text: "Eine Routine ist eine feste Abfolge kleiner Schritte. Mit Timer und Kontext hilft sie dir, dranzubleiben.",
        actionId: "emptyRoutineCreate",
        actionLabel: "Routine erstellen"
      });
      on($("emptyRoutineCreate"), "click", () => openRoutineDialog());
    }
  }
  container.innerHTML = keys.map(key => {
    const routine = routines[key];
    const progressMap = currentData?.routineProgress?.[key] || {};
    const progress = routineProgressOf(routine, progressMap);
    const remaining = routine.items
      .filter(item => !["done", "skipped"].includes(progressMap[item.id]))
      .reduce((sum, item) => sum + Number(item.minutes || 0), 0);
    const percent = progress.total ? Math.round(progress.resolved / progress.total * 100) : 0;
    const started = progress.resolved > 0;
    const finished = progress.total > 0 && progress.resolved === progress.total;
    const role = findRole(profile, routine.roleId);
    const meta = !routine.items.length ? "Noch keine Schritte"
      : finished ? "Heute abgeschlossen"
      : started ? `${progress.resolved}/${progress.total} · noch ${remaining} Min.`
      : `${pluralDE(routine.items.length, "Schritt", "Schritte")} · ${routineMinutes(routine)} Min.`;
    return `<button type="button" class="routine-hero ${routine.theme} ${finished ? "is-finished" : started ? "is-started" : ""}" data-open-routine="${escapeHTML(key)}">
      <span class="routine-thread" aria-hidden="true"></span>
      ${finished ? `<span class="routine-hero-badge" aria-hidden="true">✓</span>` : ""}
      <div class="routine-hero-top simple">
        <div>
          <h3>${escapeHTML(routine.title)}</h3>
          <p>${escapeHTML(routine.description || (role ? role.name : "Eigene Routine"))}</p>
          <span class="routine-hero-meta">${escapeHTML(meta)}</span>
        </div>
      </div>
      ${progress.total ? `<span class="routine-hero-track" aria-hidden="true"><i style="width:${percent}%"></i></span>` : ""}
      ${routine.items.length ? `<span class="routine-hero-play ${finished ? "done" : ""}" data-start-routine="${escapeHTML(key)}" role="button"
        aria-label="${escapeHTML(routine.title)} ${started && !finished ? "fortsetzen" : "starten"}" tabindex="0">${finished ? "↻" : "▶"}</span>` : ""}
    </button>`;
  }).join("");

  container.querySelectorAll("[data-open-routine]").forEach(card => on(card, "click", event => {
    if (event.target.closest("[data-start-routine]")) return;
    openRoutineDetail(card.dataset.openRoutine);
  }));
  container.querySelectorAll("[data-start-routine]").forEach(button => on(button, "click", event => {
    event.stopPropagation();
    startRoutine(button.dataset.startRoutine);
  }));
}

function openRoutineDetail(key) {
  if (!routines[key]) return;
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
  if (!routine) return;
  const progressMap = currentData?.routineProgress?.[key] || {};
  const progress = routineProgressOf(routine, progressMap);
  const percent = progress.total ? Math.round(progress.resolved / progress.total * 100) : 0;
  const completedMinutes = routine.items.filter(item => progressMap[item.id] === "done").reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  const remainingMinutes = routine.items.filter(item => !["done", "skipped"].includes(progressMap[item.id])).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  const role = findRole(profile, routine.roleId);

  $("routineDetailEyebrow").textContent = role ? role.name.toUpperCase() : "ROUTINE";
  $("routineDetailTitle").textContent = routine.title;
  $("routineDetailMeta").textContent = routine.items.length
    ? `${pluralDE(routine.items.length, "Schritt", "Schritte")} · ${routineMinutes(routine)} Minuten`
    : "Noch keine Schritte";
  $("startRoutineDetail").hidden = !routine.items.length;
  $("routineDetailProgress").innerHTML = routine.items.length
    ? `<div class="routine-progress-head"><strong>${progress.done}/${progress.total} erledigt</strong><span>${percent}%</span></div>
       <div class="routine-progress-track"><i style="width:${percent}%"></i></div>
       <small>ca. ${completedMinutes} Min. erledigt · ${remainingMinutes} Min. offen</small>`
    : "";

  const empty = $("routineItemEmpty");
  if (empty) {
    empty.hidden = routine.items.length > 0;
    if (!routine.items.length) {
      empty.innerHTML = emptyStateHTML({
        icon: "➕",
        title: "Noch keine Schritte",
        text: "Zerlege die Routine in kleine Schritte. Jeder Schritt bekommt eine Dauer und darf einen Hinweis mitbringen."
      });
    }
  }

  $("routineItemList").innerHTML = routine.items.map((item, index) => {
    const state = progressMap[item.id] || "";
    const stateLabel = state === "done" ? " · erledigt" : state === "skipped" ? " · übersprungen" : "";
    return `<div class="routine-item clean ${state ? `is-${state}` : ""}" data-routine-index="${index}">
      <span class="routine-number">${index + 1}</span>
      <span class="routine-emoji-bubble">${escapeHTML(item.emoji)}</span>
      <div class="routine-item-copy">
        <strong>${escapeHTML(item.title)}</strong>
        <small>${item.minutes} Min.${stateLabel}${item.context ? " · Kontext" : ""}</small>
      </div>
      <div class="routine-sort-controls" aria-label="Reihenfolge ändern">
        <button type="button" data-move-routine-item="-1" data-index="${index}" aria-label="Nach oben" ${index === 0 ? "disabled" : ""}>↑</button>
        <button type="button" data-move-routine-item="1" data-index="${index}" aria-label="Nach unten" ${index === routine.items.length - 1 ? "disabled" : ""}>↓</button>
      </div>
      <button type="button" class="routine-item-menu" data-edit-routine-item="${escapeHTML(item.id)}" aria-label="Schritt bearbeiten">⋯</button>
    </div>`;
  }).join("");

  $("routineItemList").querySelectorAll("[data-edit-routine-item]").forEach(button =>
    on(button, "click", () => openRoutineItemDialog(button.dataset.editRoutineItem)));
  $("routineItemList").querySelectorAll("[data-move-routine-item]").forEach(button => on(button, "click", () => {
    const index = Number(button.dataset.index);
    const target = index + Number(button.dataset.moveRoutineItem);
    if (target < 0 || target >= routine.items.length) return;
    [routine.items[index], routine.items[target]] = [routine.items[target], routine.items[index]];
    saveRoutines();
    renderRoutineDetail(key);
  }));
}

function fillRoutineMinuteOptions(currentValue) {
  const select = $("routineItemMinutes");
  if (!select) return;
  select.innerHTML = Array.from({ length: 180 }, (_, index) => index + 1)
    .map(value => `<option value="${value}">${value} Min.</option>`).join("");
  select.value = String(clamp(Math.round(Number(currentValue) || 5), 1, 180));
}

function openRoutineDialog(key = null) {
  const routine = key ? routines[key] : null;
  $("routineDialog").dataset.editingRoutine = key || "";
  $("routineDialogTitle").textContent = routine ? "Routine bearbeiten" : "Routine hinzufügen";
  $("routineTitle").value = routine?.title || "";
  $("routineDescription").value = routine?.description || "";
  $("routineTheme").innerHTML = ROUTINE_THEMES.map(theme =>
    `<option value="${theme.key}">${escapeHTML(theme.label)}</option>`).join("");
  $("routineTheme").value = routine?.theme || "focus";
  $("routineRole").innerHTML = `<option value="">Keiner Rolle zugeordnet</option>`
    + activeRoles(profile).map(role => `<option value="${escapeHTML(role.id)}">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</option>`).join("");
  $("routineRole").value = routine?.roleId || "";
  $("routineDialogSubmit").textContent = routine ? "Sichern" : "Erstellen";
  $("deleteRoutine").hidden = !routine;
  updateRoutineThemePreview();
  $("routineDialog").showModal();
}

function updateRoutineThemePreview() {
  const preview = $("routineThemePreview");
  if (preview) preview.className = `routine-theme-preview ${$("routineTheme").value}`;
}

function saveRoutineFromForm(event) {
  event.preventDefault();
  const title = $("routineTitle").value.trim();
  if (!title) return;
  const editing = $("routineDialog").dataset.editingRoutine;
  if (editing && routines[editing]) {
    routines[editing].title = title;
    routines[editing].description = $("routineDescription").value.trim();
    routines[editing].theme = $("routineTheme").value || "focus";
    routines[editing].roleId = $("routineRole").value;
  } else {
    const key = createRoutineKey(title);
    routines[key] = normalizeRoutine({
      title,
      description: $("routineDescription").value.trim(),
      theme: $("routineTheme").value || "focus",
      roleId: $("routineRole").value,
      order: Object.keys(routines).length,
      items: []
    }, key, Object.keys(routines).length);
    profile.modules.routines = true;
    saveProfile();
  }
  saveRoutines();
  $("routineDialog").close();
  renderRoutineCards();
  renderRoutinesToday();
  renderProfilePage();
  if (editing && !$("routineDetail").hidden) renderRoutineDetail(editing);
}

function deleteRoutineFromDialog() {
  const key = $("routineDialog").dataset.editingRoutine;
  if (!key || !routines[key]) return;
  if (!window.confirm(`„${routines[key].title}" wirklich löschen? Die Schritte gehen dabei verloren. Bereits gespeicherte Tage behalten ihren Fortschritt.`)) return;
  if (routineSession?.key === key) closeRoutineSession();
  delete routines[key];
  saveRoutines();
  $("routineDialog").close();
  closeRoutineDetail();
  renderRoutinesToday();
  renderProfilePage();
}

function openRoutineItemDialog(itemId = null) {
  if (!activeRoutineKey) return;
  const routine = routines[activeRoutineKey];
  const item = itemId ? routine.items.find(entry => entry.id === itemId) : null;
  editingRoutineItemId = item?.id || null;
  $("routineItemDialogTitle").textContent = item ? "Schritt bearbeiten" : "Schritt hinzufügen";
  $("routineItemEmoji").value = item?.emoji || "✨";
  $("routineItemTitle").value = item?.title || "";
  $("routineItemContext").value = item?.context || "";
  fillRoutineMinuteOptions(item?.minutes ?? 5);
  $("deleteRoutineItem").hidden = !item;
  $("routineItemDialog").showModal();
}

function saveRoutineItemFromForm(event) {
  event.preventDefault();
  const routine = routines[activeRoutineKey];
  if (!routine) return;
  const title = $("routineItemTitle").value.trim();
  if (!title) return;
  const payload = {
    emoji: $("routineItemEmoji").value.trim() || "✨",
    title,
    minutes: clamp(Number($("routineItemMinutes").value) || 5, 1, 180),
    context: $("routineItemContext").value.trim()
  };
  if (editingRoutineItemId) {
    const item = routine.items.find(entry => entry.id === editingRoutineItemId);
    Object.assign(item, payload);
  } else {
    routine.items.push({ id: uid(`${activeRoutineKey}-step`), ...payload });
  }
  saveRoutines();
  $("routineItemDialog").close();
  renderRoutineDetail(activeRoutineKey);
  renderRoutinesToday();
}

function deleteRoutineItem() {
  const routine = routines[activeRoutineKey];
  if (!routine || !editingRoutineItemId) return;
  routine.items = routine.items.filter(item => item.id !== editingRoutineItemId);
  saveRoutines();
  $("routineItemDialog").close();
  renderRoutineDetail(activeRoutineKey);
  renderRoutinesToday();
}

/* --------------------------------------------------------------------------
   21. Routine-Durchlauf
   Die Session arbeitet auf einer Kopie der Schritte, damit spätere
   Änderungen an der Routine einen laufenden Durchlauf nicht stören.
   -------------------------------------------------------------------------- */

function startRoutine(key) {
  const routine = routines[key];
  if (!routine?.items.length) return;
  currentData.routineProgress = currentData.routineProgress || {};
  currentData.routineProgress[key] = currentData.routineProgress[key] || {};
  const progress = currentData.routineProgress[key];
  let index = routine.items.findIndex(item => !["done", "skipped"].includes(progress[item.id]));
  if (index < 0) {
    if (!window.confirm("Diese Routine ist heute bereits abgeschlossen. Fortschritt zurücksetzen und erneut starten?")) return;
    currentData.routineProgress[key] = {};
    index = 0;
  }
  const remaining = Math.round(routine.items[index].minutes * 60);
  routineSession = {
    key, index, remaining, running: true, endAt: Date.now() + remaining * 1000,
    interval: null, expiredNotified: false,
    items: routine.items.map(item => ({ ...item }))
  };
  persistRoutineSession();
  $("routineSessionDialog").showModal();
  renderRoutineSession();
  startSessionInterval();
}

function sessionItems() {
  if (!routineSession) return [];
  if (Array.isArray(routineSession.items) && routineSession.items.length) return routineSession.items;
  return routines[routineSession.key]?.items || [];
}

function currentSessionItem() { return sessionItems()[routineSession.index]; }

function sessionRemainingSummary() {
  if (!routineSession) return null;
  const items = sessionItems();
  const progress = currentData?.routineProgress?.[routineSession.key] || {};
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

function formatTimer(seconds) {
  const value = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function renderRoutineSession() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const routine = routines[routineSession.key];
  const item = currentSessionItem();
  if (!routine || !item) return;
  const items = sessionItems();
  const dialog = $("routineSessionDialog");
  dialog.dataset.theme = routine.theme || "focus";
  $("sessionRoutineName").textContent = routine.title;
  $("sessionProgress").textContent = `Schritt ${routineSession.index + 1} von ${items.length}`;
  const resolved = items.filter(entry => (currentData?.routineProgress?.[routineSession.key] || {})[entry.id]).length;
  $("sessionTimerCircle").style.setProperty("--session-progress", `${Math.round(resolved / Math.max(1, items.length) * 100)}%`);
  $("sessionItemTitle").textContent = item.title;
  $("sessionItemEmoji").textContent = item.emoji;
  $("sessionTimer").textContent = formatTimer(routineSession.remaining);
  $("sessionPause").textContent = routineSession.running ? "Ⅱ" : "▶";
  $("sessionContext").hidden = !item.context;
  $("sessionContext").innerHTML = item.context ? linkifyText(item.context) : "";
  const next = items[routineSession.index + 1];
  $("sessionNext").textContent = next ? `Als Nächstes: ${next.title}` : "Letzter Schritt dieser Routine";
  const rest = sessionRemainingSummary();
  if (rest) $("sessionRemaining").textContent = `Noch ${rest.minutes} Min. · ca. ${rest.endLabel} Uhr fertig`;
}

function playTimerDoneTone() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [880, 1175, 988].forEach((frequency, index) => {
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
    // Ton ist nur eine Zugabe; ohne Audiorechte läuft die Routine normal weiter.
  }
}

function persistRoutineSession() {
  if (!routineSession) {
    localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
    return;
  }
  const { interval, ...serializable } = routineSession;
  writeJSON(ROUTINE_SESSION_STORAGE_KEY, serializable);
}

function syncRoutineSessionClock() {
  if (!routineSession?.running || !routineSession.endAt) return;
  const next = Math.max(0, Math.ceil((routineSession.endAt - Date.now()) / 1000));
  routineSession.remaining = next;
  if (next <= 0) {
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
  if ($("sessionTimer")) $("sessionTimer").textContent = formatTimer(routineSession.remaining);
  if ($("sessionPause")) $("sessionPause").textContent = routineSession.running ? "Ⅱ" : "▶";
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
  const stored = readJSON(ROUTINE_SESSION_STORAGE_KEY);
  if (!stored || !routines?.[stored.key] || !routines[stored.key].items?.length) {
    localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
    return;
  }
  routineSession = {
    ...stored, interval: null,
    remaining: Math.max(0, Number(stored.remaining || 0)),
    running: Boolean(stored.running),
    endAt: stored.endAt ? Number(stored.endAt) : null
  };
  if (!currentSessionItem()) { routineSession = null; localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY); return; }
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
  const items = sessionItems();
  const item = currentSessionItem();
  currentData.routineProgress[key] = currentData.routineProgress[key] || {};
  currentData.routineProgress[key][item.id] = status;
  const nextIndex = routineSession.index + 1;
  if (nextIndex >= items.length) {
    const allDone = items.every(entry => currentData.routineProgress[key][entry.id] === "done");
    currentData.routineStates = currentData.routineStates || {};
    currentData.routineStates[key] = allDone ? "done" : "responsiblySkipped";
    saveReview(true);
    closeRoutineSession();
    showToast(allDone ? `${routine.title} abgeschlossen.` : `${routine.title} gewissenhaft beendet.`);
    return;
  }
  routineSession.index = nextIndex;
  routineSession.remaining = Math.round(Number(items[nextIndex].minutes || 0) * 60);
  routineSession.running = true;
  routineSession.endAt = Date.now() + routineSession.remaining * 1000;
  routineSession.expiredNotified = false;
  saveReview(true);
  persistRoutineSession();
  renderRoutineSession();
}

function closeRoutineSession() {
  if (routineSession?.interval) clearInterval(routineSession.interval);
  routineSession = null;
  localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
  if ($("routineSessionDialog").open) $("routineSessionDialog").close();
  renderRoutinesToday();
  renderRoutineCards();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

/* --------------------------------------------------------------------------
   22. Kalender
   -------------------------------------------------------------------------- */

function renderCalendar() {
  const monthDate = dateFromISO(calendarCursor);
  $("calendarMonthLabel").textContent = formatMonth(calendarCursor);
  const start = addDays(calendarCursor, -((monthDate.getDay() + 6) % 7));
  $("calendarGrid").innerHTML = Array.from({ length: 42 }, (_, index) => {
    const date = addDays(start, index);
    const raw = safeParse(localStorage.getItem(storageKey(date)));
    const role = raw ? findRole(profile, raw.roleId || legacyRoleIdForName(raw.role)) : null;
    const classes = ["calendar-day",
      date.slice(0, 7) !== calendarCursor.slice(0, 7) ? "outside" : "",
      date === todayISO() ? "today" : "",
      raw ? "has-entry" : "",
      date === selectedDate ? "selected" : ""].filter(Boolean).join(" ");
    const style = raw && role ? `--entry-color:${role.color};--entry-soft:${hexToRgba(role.color, .18)};--entry-text:${role.text}` : "";
    return `<button type="button" class="${classes}" style="${style}" data-calendar-date="${date}"
      aria-label="${formatDate(date)}${raw ? `, Eintrag vorhanden${role ? ` in Rolle ${role.name}` : ""}` : ""}">${Number(date.slice(-2))}</button>`;
  }).join("");
  $("calendarGrid").querySelectorAll("[data-calendar-date]").forEach(button => on(button, "click", () => {
    setDate(button.dataset.calendarDate);
    $("calendarDialog").close();
  }));
}

function openCalendar() {
  calendarCursor = firstOfMonth(selectedDate);
  renderCalendar();
  $("calendarDialog").showModal();
}

/* --------------------------------------------------------------------------
   23. Sicherung und Export
   -------------------------------------------------------------------------- */

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function allReviews() {
  return collectStoredReviewsRaw().map(({ date, data }) => ({
    date,
    data: normalizeReview(data, date, profile, { hasStored: true, today: todayISO() })
  }));
}

function backupPayload() {
  return {
    app: "ROLEPLAY",
    version: APP_VERSION,
    schemaVersion: PROFILE_SCHEMA,
    exportedAt: new Date().toISOString(),
    profile,
    routines,
    reviews: allReviews()
  };
}

function exportBackup() {
  saveReview(true);
  const payload = backupPayload();
  downloadTextFile(`roleplay-backup-${todayISO()}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  localStorage.setItem(BACKUP_TIMESTAMP_KEY, new Date().toISOString());
  $("backupStatus").textContent = `Backup erstellt: ${pluralDE(payload.reviews.length, "Tag", "Tage")}, dein Profil und ${pluralDE(Object.keys(routines).length, "Routine", "Routinen")}.`;
}

/* Vor jedem Import wird der aktuelle Bestand automatisch heruntergeladen.
   Ein Import kann dadurch nie zu Datenverlust führen. */
function downloadSafetyBackup() {
  const payload = backupPayload();
  payload.safetyBackup = true;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  downloadTextFile(`roleplay-sicherung-vor-import-${stamp}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  return payload.reviews.length;
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const payload = safeParse(reader.result);
    const reviews = Array.isArray(payload?.reviews)
      ? payload.reviews.filter(item => isISODate(item?.date) && item?.data)
      : [];
    if (!reviews.length && !payload?.profile) {
      window.alert("Diese Datei enthält keine gültigen ROLEPLAY-Daten.");
      return;
    }
    if (!window.confirm(`${pluralDE(reviews.length, "Tag", "Tage")} importieren?\n\nVorhandene Einträge mit demselben Datum werden ersetzt. Zuvor wird automatisch eine Sicherung des aktuellen Bestands heruntergeladen.`)) return;
    saveReview(true);
    const secured = downloadSafetyBackup();

    if (payload.profile) {
      profile = normalizeProfile(payload.profile);
      saveProfile();
    } else {
      // Ältere Sicherungen ohne Profil: aus den mitgelieferten Tagen aufbauen.
      profile = buildMigratedProfile(reviews, payload.routines || {});
      saveProfile();
    }
    if (payload.routines) {
      routines = normalizeRoutines(payload.routines);
      saveRoutines();
    }
    reviews.forEach(item => writeJSON(storageKey(item.date), item.data));
    routines = loadRoutines();
    applyTheme();
    // Wer eine Sicherung einspielt, ist kein neuer Nutzer mehr.
    $("onboarding").hidden = true;
    $("appShell").hidden = false;
    setDate(selectedDate);
    renderProfilePage();
    renderAnalysis();
    switchPage("entry");
    $("backupStatus").textContent = `${pluralDE(reviews.length, "Tag", "Tage")} importiert. Sicherung mit ${pluralDE(secured, "Tag", "Tagen")} wurde zuvor heruntergeladen.`;
    showToast("Backup importiert.");
  };
  reader.readAsText(file);
}

function csvEscape(value) {
  // Zahlen mit Komma, damit deutschsprachige Tabellenprogramme sie als Zahl lesen.
  const text = typeof value === "number" ? String(value).replace(".", ",") : String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

/* Der CSV-Export folgt dem Profil: jede Rolle, jeder Regler und jeder
   Tracker bekommt seine eigene Spalte. Fest verdrahtete Spalten gibt es
   nicht mehr. */
function exportCsv() {
  saveReview(true);
  const scales = orderedScales(profile);
  const trackers = sortByOrder(profile.trackers);
  const streaks = sortByOrder(profile.streaks);
  const routineKeys = orderedRoutineKeys(routines);

  const headers = [
    "Datum", "Rolle", "Check-ins",
    ...scales.map(scale => `${scale.label} (Tagesmittel)`),
    ...routineKeys.map(key => `Routine: ${routines[key].title}`),
    ...trackers.flatMap(tracker => tracker.type === "checklist"
      ? tracker.items.map(item => `${tracker.label}: ${item.label}`)
      : [tracker.label]),
    ...streaks.flatMap(streak => [`${streak.label} (Tage)`, `${streak.label} (Status)`]),
    "Aktivitäten", "Präsenzpunkte", "Notizen"
  ];

  const lines = [headers.map(csvEscape).join(";")];
  allReviews().forEach(({ date, data }) => {
    const role = findRole(profile, data.roleId);
    const row = [
      date, role?.name || "",
      (data.stateCheckins || []).length,
      ...scales.map(scale => dailyScaleAverage(data, scale.id) ?? ""),
      ...routineKeys.map(key => TASK_STATE_META[data.routineStates?.[key] || ""].label),
      ...trackers.flatMap(tracker => {
        const value = data.trackers?.[tracker.id];
        if (tracker.type === "checklist") return tracker.items.map(item => (value || {})[item.id] || "");
        if (tracker.type === "choice") return [tracker.options.find(option => option.id === value)?.label || ""];
        if (tracker.type === "toggle") return [value ? "Ja" : "Nein"];
        return [value ?? ""];
      }),
      ...streaks.flatMap(streak => [
        Number(data.streaks?.[streak.id]?.days || 0),
        STREAK_DAILY_STATES[data.streaks?.[streak.id]?.todayStatus || ""].short
      ]),
      (data.activities || []).map(activity => `${activity.title} | ${findRole(profile, activity.roleId)?.name || "–"}`).join(" / "),
      formatPoints(dayPointTotal(data, date, profile)),
      data.notes
    ];
    lines.push(row.map(csvEscape).join(";"));
  });
  downloadTextFile(`roleplay-export-${todayISO()}.csv`, `﻿${lines.join("\r\n")}`, "text/csv;charset=utf-8");
  $("backupStatus").textContent = "CSV-Export wurde erstellt.";
}

function exportPeriodReport() {
  const stats = currentStats();
  const insights = buildInsights(stats, profile, { kind: periodKind, previous: previousStats() });
  const lines = [
    `ROLEPLAY – Rückblick ${periodLabelText()}`,
    profile.displayName ? `Für: ${profile.displayName}` : "",
    "",
    ...insights.map(item => `• ${item.text}`),
    "",
    "Erstellt am " + formatLongDate(todayISO())
  ].filter(Boolean);
  downloadTextFile(`roleplay-rueckblick-${periodAnchor}.txt`, lines.join("\n"), "text/plain;charset=utf-8");
  showToast("Rückblick exportiert.");
}

function resetProfile() {
  if (!window.confirm("Dein ROLEPLAY-System zurücksetzen?\n\nRollen, Tracker, Streaks und Routinen werden entfernt. Deine bereits eingetragenen Tage bleiben gespeichert und erscheinen wieder, sobald du passende Elemente neu anlegst.\n\nLade vorher ein Backup herunter, wenn du sicher gehen willst.")) return;
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  localStorage.removeItem(ROUTINES_STORAGE_KEY);
  localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
  profile = emptyProfile();
  routines = {};
  saveProfile();
  saveRoutines();
  applyTheme();
  setDate(todayISO());
  startOnboarding();
}

/* --------------------------------------------------------------------------
   24. Erklärungen
   Unbekannte Funktionen werden dort erklärt, wo sie auftauchen – kurz und
   ohne Textwüste.
   -------------------------------------------------------------------------- */

const EXPLANATIONS = {
  checkins: {
    title: "Check-ins",
    body: `<p>Ein Check-in ist eine kurze Momentaufnahme: Wie geht es dir gerade? Du kannst pro Tag für jede Tagesphase einen machen – musst aber nicht.</p>
      <p>Aus den Reglern, die du als „Modus“ markiert hast, entsteht der <strong>Rollenmodus</strong>. Er ist kein Urteil, sondern ein Vorschlag, wie viel du dir heute zumuten solltest.</p>
      <p>Welche Regler erscheinen, legst du im Profil unter „Check-in-Regler“ fest.</p>`
  },
  trend: {
    title: "Verlauf",
    body: `<p>Die Linien zeigen den Tagesdurchschnitt deiner Check-in-Regler. Tage ohne Eintrag bleiben leer – es wird nichts geschätzt oder ergänzt.</p>
      <p>Die Darstellung beschreibt, sie bewertet nicht. Es gibt keinen Gesamtscore.</p>`
  },
  presence: {
    title: "Rollenpräsenz",
    body: `<p>Die Rollenpräsenz zeigt, welchen Rollen du durch bewusst erfasste Aktivitäten Raum gegeben hast.</p>
      <p>Das Gewicht einer Aktivität gewichtet ihre <em>Aussagekraft</em> – nicht deinen Zeitaufwand, deine Leistung oder deinen Wert. Eine kurze, prägende Aktivität darf deshalb schwerer wiegen als ein langer Routinetag.</p>
      <p>Eine Rolle ohne Eintrag ist „nicht erfasst“ – nicht vernachlässigt.</p>`
  }
};

function openExplain(key) {
  const entry = EXPLANATIONS[key];
  if (!entry) return;
  $("explainTitle").textContent = entry.title;
  $("explainBody").innerHTML = entry.body;
  $("explainDialog").showModal();
}

/* --------------------------------------------------------------------------
   25. Onboarding

   Kurze Schritte, jeweils eine Entscheidung. Der Nutzer kann jederzeit
   überspringen und später im Profil weiterbauen.
   -------------------------------------------------------------------------- */

let onboardingStep = 0;
let onboardingDraft = null;

const ONBOARDING_STEPS = ["intro", "roles", "detail", "trackers", "streaks", "done"];

function startOnboarding() {
  onboardingStep = 0;
  onboardingDraft = {
    roles: activeRoles(profile).map(role => ({ ...role, goals: role.goals.map(goal => ({ ...goal })) })),
    trackerIds: dayTrackers(profile).map(tracker => tracker.id),
    streakLabels: activeStreaks(profile).map(streak => streak.label),
    detailRoleIndex: 0
  };
  $("appShell").hidden = true;
  $("onboarding").hidden = false;
  renderOnboarding();
}

function finishOnboarding(skipped = false) {
  if (!skipped) applyOnboardingDraft();
  profile.onboardedAt = new Date().toISOString();
  saveProfile();
  $("onboarding").hidden = true;
  $("appShell").hidden = false;
  currentData = loadReview(selectedDate);
  if (!currentData.roleId) currentData.roleId = rotationRoleId(profile, selectedDate);
  saveReview(true);
  setDate(selectedDate);
  switchPage("entry");
  renderProfilePage();
}

function applyOnboardingDraft() {
  const takenRoleIds = [];
  profile.roles = onboardingDraft.roles.map((role, index) => {
    const normalized = normalizeRole({ ...role, id: role.id || slugify(role.name, `rolle-${index + 1}`), order: index }, index, takenRoleIds);
    takenRoleIds.push(normalized.id);
    return normalized;
  });

  const existingIds = new Set(profile.trackers.map(tracker => tracker.id));
  onboardingDraft.trackerIds.forEach((id, index) => {
    if (existingIds.has(id)) return;
    const suggestion = TRACKER_SUGGESTIONS.find(item => item.id === id);
    if (!suggestion) return;
    profile.trackers.push(normalizeTracker({ ...suggestion, order: profile.trackers.length + index },
      profile.trackers.length, profile.trackers.map(tracker => tracker.id)));
  });

  const existingStreaks = new Set(profile.streaks.map(streak => streak.label));
  onboardingDraft.streakLabels.forEach(label => {
    if (existingStreaks.has(label)) return;
    const suggestion = STREAK_SUGGESTIONS.find(item => item.label === label) || { label, emoji: "🔥" };
    profile.streaks.push(normalizeStreak({ ...suggestion, order: profile.streaks.length },
      profile.streaks.length, profile.streaks.map(streak => streak.id)));
  });

  profile.modules.trackers = dayTrackers(profile).length > 0 || profile.modules.trackers;
  profile.modules.streaks = profile.streaks.length > 0;
  profile.displayName = profile.displayName || "";
  saveProfile();
}

function onboardingRoleCardHTML(role, index) {
  return `<div class="onboarding-role" style="--role-color:${role.color};--role-soft:${hexToRgba(role.color, .16)}">
    <span class="onboarding-role-icon" aria-hidden="true">${escapeHTML(role.emoji)}</span>
    <span class="onboarding-role-name">${escapeHTML(role.name)}</span>
    <button type="button" class="delete-button" data-remove-role="${index}" aria-label="${escapeHTML(role.name)} entfernen">×</button>
  </div>`;
}

function renderOnboarding() {
  const step = ONBOARDING_STEPS[onboardingStep];
  const body = $("onboardingBody");
  const progress = $("onboardingProgress");
  progress.innerHTML = ONBOARDING_STEPS.map((_, index) =>
    `<i class="${index <= onboardingStep ? "is-done" : ""}"></i>`).join("");

  $("onboardingBack").hidden = onboardingStep === 0;
  $("onboardingSkip").hidden = step === "done";
  $("onboardingNext").textContent = step === "done" ? "ROLEPLAY starten" : "Weiter";

  if (step === "intro") {
    body.innerHTML = `<div class="onboarding-hero">
        <span class="onboarding-mark" aria-hidden="true">🎭</span>
        <h2>Willkommen bei ROLEPLAY</h2>
        <p class="onboarding-lead">ROLEPLAY hilft dir, deine unterschiedlichen Lebensrollen bewusst zu gestalten, im Alltag sichtbar zu machen und ihre Entwicklung zu reflektieren.</p>
      </div>
      <ul class="onboarding-points">
        <li><b>1</b><span><strong>Rollen festlegen</strong>Vater, Sportlerin, Gründer, Freundin – du entscheidest, welche Rollen dein Leben ausmachen.</span></li>
        <li><b>2</b><span><strong>Alltag eintragen</strong>Kurze Check-ins, Aktivitäten und genau das Tracking, das zu dir passt.</span></li>
        <li><b>3</b><span><strong>Entwicklung sehen</strong>Verständliche Rückblicke statt bloßer Zahlen.</span></li>
      </ul>
      <p class="onboarding-note">Alles bleibt lokal auf deinem Gerät. Es gibt kein Konto und keine Cloud.</p>
      <button type="button" class="text-button onboarding-restore" id="onboardingRestore">Du hast schon ein ROLEPLAY? Backup wiederherstellen</button>`;
    on($("onboardingRestore"), "click", () => $("importBackupInput").click());
    return;
  }

  if (step === "roles") {
    const chosen = new Set(onboardingDraft.roles.map(role => role.name));
    const suggested = new Set(ROLE_SUGGESTIONS.map(item => item.name));
    // Vorschläge zeigen ihre Auswahl schon selbst – hier stehen nur eigene Rollen.
    const ownRoles = onboardingDraft.roles
      .map((role, index) => ({ role, index }))
      .filter(entry => !suggested.has(entry.role.name));
    body.innerHTML = `<h2>Welche Rollen spielst du?</h2>
      <p class="onboarding-lead">Wähle aus den Vorschlägen oder schreibe eigene. Zwei bis fünf Rollen sind ein guter Anfang – ändern kannst du das jederzeit.</p>
      <p class="onboarding-count">${onboardingDraft.roles.length
        ? `${pluralDE(onboardingDraft.roles.length, "Rolle", "Rollen")} gewählt`
        : "Noch keine Rolle gewählt"}</p>
      ${ownRoles.length ? `<div class="onboarding-chosen" id="onboardingChosen">
        ${ownRoles.map(entry => onboardingRoleCardHTML(entry.role, entry.index)).join("")}
      </div>` : ""}
      <div class="suggestion-grid">
        ${ROLE_SUGGESTIONS.map((suggestion, index) => `<button type="button" class="suggestion-chip${chosen.has(suggestion.name) ? " is-selected" : ""}"
          data-role-suggestion="${index}" style="--chip-color:${suggestion.color}" aria-pressed="${chosen.has(suggestion.name)}">
          <i aria-hidden="true">${escapeHTML(suggestion.emoji)}</i>${escapeHTML(suggestion.name)}</button>`).join("")}
      </div>
      <div class="inline-add">
        <input id="onboardingRoleInput" placeholder="Eigene Rolle …" autocomplete="off">
        <button id="onboardingAddRole" type="button" class="small-button">Hinzufügen</button>
      </div>`;

    body.querySelectorAll("[data-role-suggestion]").forEach(button => on(button, "click", () => {
      const suggestion = ROLE_SUGGESTIONS[Number(button.dataset.roleSuggestion)];
      const index = onboardingDraft.roles.findIndex(role => role.name === suggestion.name);
      if (index >= 0) onboardingDraft.roles.splice(index, 1);
      else onboardingDraft.roles.push({
        id: "", name: suggestion.name, emoji: suggestion.emoji, color: suggestion.color,
        description: suggestion.description, activeDays: [],
        goals: suggestion.goals.map(title => ({ id: uid("goal"), title, done: false, order: 0 }))
      });
      renderOnboarding();
    }));
    body.querySelectorAll("[data-remove-role]").forEach(button => on(button, "click", () => {
      onboardingDraft.roles.splice(Number(button.dataset.removeRole), 1);
      renderOnboarding();
    }));
    const addOwnRole = () => {
      const input = $("onboardingRoleInput");
      const name = input.value.trim();
      if (!name) return;
      onboardingDraft.roles.push({
        id: "", name, emoji: "🎭",
        color: nextRoleColor(onboardingDraft.roles.map(role => role.color)),
        description: "", activeDays: [], goals: []
      });
      renderOnboarding();
    };
    on($("onboardingAddRole"), "click", addOwnRole);
    on($("onboardingRoleInput"), "keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      addOwnRole();
    });
    return;
  }

  if (step === "detail") {
    if (!onboardingDraft.roles.length) {
      body.innerHTML = `<h2>Ziele und Bedeutung</h2>
        <p class="onboarding-lead">Du hast noch keine Rolle gewählt. Das ist in Ordnung – du kannst jederzeit im Profil starten.</p>`;
      return;
    }
    const index = clamp(onboardingDraft.detailRoleIndex, 0, onboardingDraft.roles.length - 1);
    onboardingDraft.detailRoleIndex = index;
    const role = onboardingDraft.roles[index];
    body.innerHTML = `<h2>Was bedeutet diese Rolle?</h2>
      <p class="onboarding-lead">Rolle ${index + 1} von ${onboardingDraft.roles.length}. Du kannst Felder leer lassen und später ergänzen.</p>
      <div class="onboarding-role-head" style="--role-color:${role.color};--role-soft:${hexToRgba(role.color, .16)}">
        <span aria-hidden="true">${escapeHTML(role.emoji)}</span><strong>${escapeHTML(role.name)}</strong>
      </div>
      <div class="field-group">
        <label for="onboardingRoleDescription">Bedeutung</label>
        <textarea id="onboardingRoleDescription" rows="2" placeholder="Wofür steht diese Rolle in deinem Leben?">${escapeHTML(role.description || "")}</textarea>
      </div>
      <div class="field-group">
        <span class="field-label">Ziele</span>
        <div class="goal-list" id="onboardingGoals">
          ${role.goals.length ? role.goals.map((goal, goalIndex) => `<div class="goal-row"><span>${escapeHTML(goal.title)}</span>
            <button type="button" class="delete-button" data-remove-goal="${goalIndex}" aria-label="Ziel entfernen">×</button></div>`).join("")
            : `<p class="field-hint">Noch keine Ziele.</p>`}
        </div>
        <div class="inline-add">
          <input id="onboardingGoalInput" placeholder="Ziel hinzufügen …" autocomplete="off">
          <button id="onboardingAddGoal" type="button" class="small-button">Hinzufügen</button>
        </div>
      </div>
      <div class="field-group">
        <span class="field-label">Feste Wochentage</span>
        <small class="field-hint">Optional. An diesen Tagen schlägt ROLEPLAY diese Rolle automatisch vor.</small>
        <div class="day-picker" id="onboardingDays">
          ${WEEKDAY_ORDER.map(day => `<button type="button" class="day-chip${role.activeDays.includes(day) ? " is-selected" : ""}"
            data-day="${day}" aria-pressed="${role.activeDays.includes(day)}">${WEEKDAY_SHORT[day]}</button>`).join("")}
        </div>
      </div>
      ${onboardingDraft.roles.length > 1 ? `<div class="onboarding-role-nav">
        <button type="button" class="secondary-button" id="onboardingPrevRole" ${index === 0 ? "disabled" : ""}>Vorherige Rolle</button>
        <button type="button" class="secondary-button" id="onboardingNextRole" ${index === onboardingDraft.roles.length - 1 ? "disabled" : ""}>Nächste Rolle</button>
      </div>` : ""}`;

    on($("onboardingRoleDescription"), "input", event => { role.description = event.target.value; });
    const addGoal = () => {
      const input = $("onboardingGoalInput");
      const title = input.value.trim();
      if (!title) return;
      role.goals.push({ id: uid("goal"), title, done: false, order: role.goals.length });
      renderOnboarding();
    };
    on($("onboardingAddGoal"), "click", addGoal);
    on($("onboardingGoalInput"), "keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      addGoal();
    });
    body.querySelectorAll("[data-remove-goal]").forEach(button => on(button, "click", () => {
      role.goals.splice(Number(button.dataset.removeGoal), 1);
      renderOnboarding();
    }));
    body.querySelectorAll("[data-day]").forEach(button => on(button, "click", () => {
      const day = Number(button.dataset.day);
      role.activeDays = role.activeDays.includes(day)
        ? role.activeDays.filter(item => item !== day)
        : [...role.activeDays, day].sort((a, b) => a - b);
      renderOnboarding();
    }));
    on($("onboardingPrevRole"), "click", () => { onboardingDraft.detailRoleIndex -= 1; renderOnboarding(); });
    on($("onboardingNextRole"), "click", () => { onboardingDraft.detailRoleIndex += 1; renderOnboarding(); });
    return;
  }

  if (step === "trackers") {
    body.innerHTML = `<h2>Was möchtest du festhalten?</h2>
      <p class="onboarding-lead">Wähle aus, was du täglich tracken willst. Weniger ist am Anfang mehr – eigene Elemente kannst du später jederzeit anlegen.</p>
      <div class="suggestion-grid">
        ${TRACKER_SUGGESTIONS.map(suggestion => {
          const selected = onboardingDraft.trackerIds.includes(suggestion.id);
          return `<button type="button" class="suggestion-chip${selected ? " is-selected" : ""}" data-tracker-suggestion="${escapeHTML(suggestion.id)}" aria-pressed="${selected}">
            <i aria-hidden="true">${escapeHTML(suggestion.emoji)}</i>${escapeHTML(suggestion.label)}</button>`;
        }).join("")}
      </div>
      <p class="onboarding-note">Energie und Laune sind als Check-in-Regler schon eingerichtet. Du kannst sie im Profil umbenennen oder ergänzen.</p>`;
    body.querySelectorAll("[data-tracker-suggestion]").forEach(button => on(button, "click", () => {
      const id = button.dataset.trackerSuggestion;
      onboardingDraft.trackerIds = onboardingDraft.trackerIds.includes(id)
        ? onboardingDraft.trackerIds.filter(item => item !== id)
        : [...onboardingDraft.trackerIds, id];
      renderOnboarding();
    }));
    return;
  }

  if (step === "streaks") {
    body.innerHTML = `<h2>Willst du etwas durchhalten?</h2>
      <p class="onboarding-lead">Ein Streak zählt die Tage am Stück. Das ist optional – überspringe den Schritt einfach, wenn es für dich gerade nicht passt.</p>
      <div class="suggestion-grid">
        ${STREAK_SUGGESTIONS.map(suggestion => {
          const selected = onboardingDraft.streakLabels.includes(suggestion.label);
          return `<button type="button" class="suggestion-chip${selected ? " is-selected" : ""}" data-streak-suggestion="${escapeHTML(suggestion.label)}" aria-pressed="${selected}">
            <i aria-hidden="true">${escapeHTML(suggestion.emoji)}</i>${escapeHTML(suggestion.label)}</button>`;
        }).join("")}
      </div>
      <div class="inline-add">
        <input id="onboardingStreakInput" placeholder="Eigener Streak …" autocomplete="off">
        <button id="onboardingAddStreak" type="button" class="small-button">Hinzufügen</button>
      </div>`;
    body.querySelectorAll("[data-streak-suggestion]").forEach(button => on(button, "click", () => {
      const label = button.dataset.streakSuggestion;
      onboardingDraft.streakLabels = onboardingDraft.streakLabels.includes(label)
        ? onboardingDraft.streakLabels.filter(item => item !== label)
        : [...onboardingDraft.streakLabels, label];
      renderOnboarding();
    }));
    const addStreak = () => {
      const input = $("onboardingStreakInput");
      const label = input.value.trim();
      if (!label || onboardingDraft.streakLabels.includes(label)) return;
      onboardingDraft.streakLabels.push(label);
      renderOnboarding();
    };
    on($("onboardingAddStreak"), "click", addStreak);
    on($("onboardingStreakInput"), "keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      addStreak();
    });
    return;
  }

  const roleNames = onboardingDraft.roles.map(role => `${role.emoji} ${role.name}`);
  body.innerHTML = `<div class="onboarding-hero">
      <span class="onboarding-mark" aria-hidden="true">✨</span>
      <h2>Dein ROLEPLAY steht</h2>
      <p class="onboarding-lead">${roleNames.length
        ? `Du startest mit ${pluralDE(roleNames.length, "Rolle", "Rollen")}: ${escapeHTML(roleNames.join(", "))}.`
        : "Du startest mit einem leeren System – im Profil kannst du jederzeit deine erste Rolle anlegen."}</p>
    </div>
    <div class="field-group">
      <label for="onboardingName">Wie sollen wir dich nennen?</label>
      <input id="onboardingName" placeholder="Optional" autocomplete="name" value="${escapeHTML(profile.displayName || "")}">
    </div>
    <ul class="onboarding-points">
      <li><b>→</b><span><strong>Eintragung</strong>Dein Tag: Check-in, Aktivitäten, Routinen und Tracking.</span></li>
      <li><b>→</b><span><strong>Auswertung</strong>Verlauf, Rollenpräsenz und verständliche Rückblicke.</span></li>
      <li><b>→</b><span><strong>Profil</strong>Hier baust du dein System weiter aus.</span></li>
    </ul>`;
  on($("onboardingName"), "input", event => { profile.displayName = event.target.value; });
}

function onboardingNext() {
  const step = ONBOARDING_STEPS[onboardingStep];
  if (step === "done") { finishOnboarding(); return; }
  // Nach der Rollenauswahl direkt weiter, wenn gar keine Rolle gewählt wurde.
  if (step === "roles" && !onboardingDraft.roles.length) { onboardingStep += 2; renderOnboarding(); return; }
  onboardingStep = Math.min(onboardingStep + 1, ONBOARDING_STEPS.length - 1);
  renderOnboarding();
}

function onboardingBack() {
  onboardingStep = Math.max(0, onboardingStep - 1);
  renderOnboarding();
}

/* --------------------------------------------------------------------------
   26. Navigation
   Drei Hauptbereiche: Eintragung, Auswertung, Profil. Die Routinenübersicht
   ist eine Unterseite und merkt sich, woher sie geöffnet wurde.
   -------------------------------------------------------------------------- */

const PAGE_TITLES = { entry: "Eintragung", analysis: "Auswertung", profile: "Profil", routines: "Routinen" };

function switchPage(page) {
  currentPage = page;
  ["entry", "analysis", "profile", "routines"].forEach(key => {
    const section = $(`${key}Page`);
    if (section) section.classList.toggle("active", key === page);
  });
  $("pageTitle").textContent = PAGE_TITLES[page] || "ROLEPLAY";
  $("appHeader").hidden = page !== "entry";
  const navPage = page === "routines" ? routinesReturnPage : page;
  document.querySelectorAll(".nav-button").forEach(button =>
    button.classList.toggle("active", button.dataset.page === navPage));
  if (page === "entry") renderEntryPage();
  if (page === "analysis") renderAnalysis();
  if (page === "profile") renderProfilePage();
  if (page === "routines") renderRoutineCards();
  if (page !== "entry") streaksUnlocked = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openRoutinesPage() {
  routinesReturnPage = currentPage === "routines" ? routinesReturnPage : currentPage;
  closeRoutineDetail();
  switchPage("routines");
}

/* --------------------------------------------------------------------------
   27. Dialoge: Tastatur und sichtbarer Bereich

   Bei eingeblendeter Tastatur schrumpft der sichtbare Bereich, während die
   Layouthöhe gleich bleibt. Beides wird in CSS-Variablen übersetzt, damit
   der Dialog sichtbar bleibt und seine Aktionen nicht abgeschnitten werden.
   -------------------------------------------------------------------------- */

let dialogScrollOffset = 0;
let dialogScrollLocked = false;

function syncDialogViewport() {
  const view = window.visualViewport;
  if (!view) return;
  const root = document.documentElement;
  const layoutHeight = window.innerHeight || view.height;
  root.style.setProperty("--dialog-vh", `${Math.round(view.height)}px`);
  root.style.setProperty("--dialog-shift", `${Math.round(view.offsetTop + view.height / 2 - layoutHeight / 2)}px`);
}

function updateDialogScrollLock() {
  const anyOpen = Boolean(document.querySelector("dialog[open]"));
  if (anyOpen) syncDialogViewport();
  if (anyOpen && !dialogScrollLocked) {
    dialogScrollOffset = window.scrollY || 0;
    document.body.style.top = `-${dialogScrollOffset}px`;
    document.body.classList.add("dialog-open");
    dialogScrollLocked = true;
  } else if (!anyOpen && dialogScrollLocked) {
    document.body.classList.remove("dialog-open");
    document.body.style.top = "";
    window.scrollTo(0, dialogScrollOffset);
    dialogScrollLocked = false;
  }
}

function setupDialogs() {
  document.querySelectorAll("dialog").forEach(dialog => {
    if (typeof dialog.showModal === "function") {
      const nativeShowModal = dialog.showModal.bind(dialog);
      dialog.showModal = () => { nativeShowModal(); updateDialogScrollLock(); };
    }
    dialog.addEventListener("close", updateDialogScrollLock);
  });
  if (window.visualViewport) {
    ["resize", "scroll"].forEach(event => window.visualViewport.addEventListener(event, () => {
      if (document.querySelector("dialog[open]")) syncDialogViewport();
    }));
  }
}

/* --------------------------------------------------------------------------
   28. Verdrahtung
   -------------------------------------------------------------------------- */

function bindEvents() {
  // Datum
  on($("prevDay"), "click", () => setDate(addDays(selectedDate, -1)));
  on($("nextDay"), "click", () => setDate(addDays(selectedDate, 1)));
  on($("dateButton"), "click", openCalendar);
  on($("calendarPrevMonth"), "click", () => { calendarCursor = addMonths(calendarCursor, -1); renderCalendar(); });
  on($("calendarNextMonth"), "click", () => { calendarCursor = addMonths(calendarCursor, 1); renderCalendar(); });
  on($("calendarToday"), "click", () => { setDate(todayISO()); $("calendarDialog").close(); });
  on($("calendarClose"), "click", () => $("calendarDialog").close());

  // Rolle des Tages
  on($("dayRole"), "change", () => {
    currentData.roleId = $("dayRole").value;
    saveReview(true);
    renderHeader();
  });

  // Navigation
  document.querySelectorAll(".nav-button").forEach(button =>
    on(button, "click", () => switchPage(button.dataset.page)));
  on($("openRoutines"), "click", openRoutinesPage);
  on($("openRoutinesFromProfile"), "click", openRoutinesPage);
  on($("backFromRoutines"), "click", () => switchPage(routinesReturnPage));
  on($("backToRoutineOverview"), "click", closeRoutineDetail);

  // Check-in
  on($("checkinForm"), "submit", saveCheckinFromForm);
  on($("cancelCheckin"), "click", () => $("checkinDialog").close());
  on($("resetCheckin"), "click", resetCheckin);

  // Aktivitäten
  on($("addActivity"), "click", () => openActivityDialog());
  on($("activityForm"), "submit", saveActivityFromForm);
  on($("cancelActivity"), "click", () => $("activityDialog").close());
  on($("activityTemplate"), "change", applyActivityTemplate);

  // Notizen
  on($("notes"), "input", scheduleAutoSave);
  on($("saveButton"), "click", () => saveReview(false));

  // Profil: Rollen, Tracker, Regler, Streaks
  on($("addRole"), "click", () => openRoleDialog());
  on($("roleForm"), "submit", saveRoleFromForm);
  on($("cancelRole"), "click", () => $("roleDialog").close());
  on($("deleteRole"), "click", deleteRoleFromDialog);
  on($("addRoleGoal"), "click", addRoleGoalFromInput);
  on($("roleGoalInput"), "keydown", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addRoleGoalFromInput();
  });

  on($("addTracker"), "click", () => openTrackerDialog());
  on($("manageTrackers"), "click", () => switchPage("profile"));
  on($("trackerForm"), "submit", saveTrackerFromForm);
  on($("cancelTracker"), "click", () => $("trackerDialog").close());
  on($("deleteTracker"), "click", deleteTrackerFromDialog);
  on($("trackerType"), "change", () => {
    trackerDraft.type = $("trackerType").value;
    trackerDraft = normalizeTracker({ ...trackerDraft, type: trackerDraft.type }, 0, []);
    if (!trackerDraft.options) trackerDraft.options = [];
    if (!trackerDraft.items) trackerDraft.items = [];
    if (!trackerDraft.states) trackerDraft.states = DEFAULT_CHECKLIST_STATES.map(state => ({ ...state }));
    renderTrackerConfig();
  });

  on($("addScale"), "click", () => openScaleDialog());
  on($("scaleForm"), "submit", saveScaleFromForm);
  on($("cancelScale"), "click", () => $("scaleDialog").close());
  on($("deleteScale"), "click", deleteScaleFromDialog);

  on($("addStreak"), "click", () => openStreakDialog());
  on($("manageStreaks"), "click", () => switchPage("profile"));
  on($("streakForm"), "submit", saveStreakFromForm);
  on($("cancelStreak"), "click", () => $("streakDialog").close());
  on($("deleteStreak"), "click", deleteStreakFromDialog);
  on($("confirmStreakAccess"), "click", () => {
    streaksUnlocked = true;
    $("streakPrivacyDialog").close();
    renderEntryPage();
  });
  on($("cancelStreakAccess"), "click", () => $("streakPrivacyDialog").close());

  // Profil: Name, Darstellung, Daten
  on($("displayName"), "input", () => {
    profile.displayName = $("displayName").value;
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(saveProfile, 500);
  });
  on($("themeSelect"), "change", () => {
    profile.settings.theme = $("themeSelect").value;
    saveProfile();
    applyTheme();
  });
  on($("exportBackup"), "click", exportBackup);
  on($("importBackupButton"), "click", () => $("importBackupInput").click());
  on($("importBackupInput"), "change", event => {
    const file = event.target.files?.[0];
    if (file) importBackup(file);
    event.target.value = "";
  });
  on($("exportCsv"), "click", exportCsv);
  on($("exportReport"), "click", exportPeriodReport);
  on($("restartOnboarding"), "click", startOnboarding);
  on($("resetProfile"), "click", resetProfile);

  // Auswertung
  document.querySelectorAll("[data-period]").forEach(button => on(button, "click", () => {
    periodKind = button.dataset.period;
    periodAnchor = todayISO();
    renderAnalysis();
  }));
  on($("periodBack"), "click", () => shiftPeriod(-1));
  on($("periodForward"), "click", () => shiftPeriod(1));

  // Routinen
  on($("addRoutine"), "click", () => openRoutineDialog());
  on($("routineDialogForm"), "submit", saveRoutineFromForm);
  on($("cancelRoutine"), "click", () => $("routineDialog").close());
  on($("deleteRoutine"), "click", deleteRoutineFromDialog);
  on($("routineTheme"), "change", updateRoutineThemePreview);
  on($("editRoutineMeta"), "click", () => openRoutineDialog(activeRoutineKey));
  on($("addRoutineItem"), "click", () => openRoutineItemDialog());
  on($("routineItemForm"), "submit", saveRoutineItemFromForm);
  on($("cancelRoutineItem"), "click", () => $("routineItemDialog").close());
  on($("deleteRoutineItem"), "click", deleteRoutineItem);
  on($("startRoutineDetail"), "click", () => startRoutine(activeRoutineKey));

  // Routine-Durchlauf
  on($("sessionPause"), "click", toggleRoutineSessionRunning);
  on($("sessionComplete"), "click", () => completeSessionItem("done"));
  on($("sessionSkip"), "click", () => completeSessionItem("skipped"));
  on($("sessionMinus"), "click", () => adjustRoutineSessionMinutes(-1));
  on($("sessionPlus"), "click", () => adjustRoutineSessionMinutes(1));
  on($("closeRoutineSession"), "click", closeRoutineSession);
  on($("routineSessionDialog"), "cancel", event => { event.preventDefault(); closeRoutineSession(); });

  // Erklärungen
  document.querySelectorAll("[data-explain]").forEach(button =>
    on(button, "click", () => openExplain(button.dataset.explain)));
  on($("closeExplain"), "click", () => $("explainDialog").close());
  on($("closeRoleDetail"), "click", () => $("roleDetailDialog").close());

  // Onboarding
  on($("onboardingNext"), "click", onboardingNext);
  on($("onboardingBack"), "click", onboardingBack);
  on($("onboardingSkip"), "click", () => finishOnboarding(true));

  // Der laufende Timer holt nach dem Zurückkehren die vergangene Zeit auf.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    if (routineSession) { syncRoutineSessionClock(); renderRoutineSession(); }
    if (selectedDate !== todayISO() && !hasStoredReview(selectedDate)) return;
  });
}

/* --------------------------------------------------------------------------
   29. Start
   -------------------------------------------------------------------------- */

function init() {
  mediaQueryDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  if (mediaQueryDark?.addEventListener) mediaQueryDark.addEventListener("change", applyTheme);

  profile = loadProfile();
  routines = loadRoutines();
  applyTheme();
  setupDialogs();
  bindEvents();

  selectedDate = todayISO();
  currentData = loadReview(selectedDate);

  const lastBackupAt = localStorage.getItem(BACKUP_TIMESTAMP_KEY);
  if (lastBackupAt && $("backupStatus")) {
    $("backupStatus").textContent = `Letztes Backup: ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastBackupAt))}`;
  }

  if (!profile.onboardedAt) {
    startOnboarding();
  } else {
    $("appShell").hidden = false;
    setDate(selectedDate);
    switchPage("entry");
    restoreRoutineSession();
  }
  registerServiceWorker();
}

/* Der neue Service Worker übernimmt sofort. Nur wenn die Seite vorher bereits
   von einem Worker kontrolliert wurde, wird einmalig neu geladen – so greift
   die neue Version zuverlässig, ohne beim ersten Installieren eine Schleife
   zu erzeugen. */
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
