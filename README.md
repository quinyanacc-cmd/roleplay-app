# ROLEPLAY 7.0

**ROLEPLAY hilft dir, deine unterschiedlichen Lebensrollen bewusst zu
gestalten, im Alltag sichtbar zu machen und ihre Entwicklung zu
reflektieren.**

Eine installierbare Web-App (PWA), die vollständig lokal auf dem Gerät
arbeitet: kein Konto, kein Server, kein Framework, keine externen
Bibliotheken. Alle Daten liegen im `localStorage` des Browsers.

---

## Was Version 7 verändert

Bis Version 6 war ROLEPLAY auf eine einzelne Person zugeschnitten: sieben
fest einprogrammierte Rollen, feste Streaks, fest eingebaute Gebete,
Mahlzeiten, Wasser und ein dritter Regler namens „Gottesfurcht“.

Version 7 dreht das um. **Es gibt keine vorgegebenen Rollen, Routinen,
Tracker oder Streaks mehr.** Alles davon sind Objekte im Profil des Nutzers,
die er selbst anlegt, benennt, einfärbt, sortiert und wieder entfernt.

Die App startet als weitgehend leeres System. Ein kurzes Onboarding baut es
gemeinsam mit dem Nutzer auf.

### Bestehende Daten gehen nicht verloren

Findet die App beim Start bereits Einträge aus Version 6, aber noch kein
Profil, baut sie daraus **einmalig** ein vollständiges Profil:

| Version 6 (fest eingebaut) | Version 7 (Objekt im Profil) |
| --- | --- |
| Sieben Rollen samt Wochentagsrotation | Sieben Rollen mit `activeDays` |
| Regler „Gottesfurcht“ | Dritter Check-in-Regler, frei umbenennbar |
| Pflicht- und Sunnah-Gebete | Zwei Checklisten-Tracker mit den **unveränderten** Zustandswerten |
| Wasser in Millilitern | Zähler-Tracker in Litern |
| Schritte | Zahl-Tracker |
| Schlafqualität, Traumkategorie | Auswahl-Tracker |
| Mahlzeiten und ihre Notizen | Auswahl- und Text-Tracker |
| Dankbarkeit, Name Allahs, Traumnotiz | Text-Tracker |
| Fastentag, offene Fastentage | Schalter- und Zahl-Tracker |
| Vier Streaks | Vier Streak-Objekte |
| Aktivitätsvorlagen samt Tagesbegrenzung | Vorlagen im Profil |

Aufgenommen wird nur, was im Bestand tatsächlich vorkommt: Wer nie Gebete
erfasst hat, bekommt auch keinen Gebetstracker. Das Onboarding entfällt für
bestehende Nutzer.

Die gespeicherten Tage selbst bleiben unter denselben Schlüsseln liegen
(`roleplay-v25-review-JJJJ-MM-TT`). Beim Laden werden die alten Felder in die
neue Form gespiegelt – wiederholbar und ohne je etwas zu überschreiben.

---

## Die drei Bereiche

### Eintragung

Die tägliche Ansicht. Sichtbar ist nur, was der Nutzer eingeschaltet und
angelegt hat:

- **Zustand** – bis zu fünf Check-ins über den Tag (Morgen, Mittag,
  Nachmittag, Abend, Nacht) mit den Reglern aus dem eigenen Profil. Daraus
  entsteht der **Rollenmodus** und ein kurzer Impuls.
- **Rollenaktivitäten** – was heute für welche Rolle getan wurde.
- **Routinen** – Status setzen oder den Durchlauf mit Timer starten.
- **Tracking** – die eigenen Trackingelemente. Schnelle Eingaben stehen im
  Raster, Checklisten darunter, Freitexte eingeklappt.
- **Streaks** und **Tagesnotiz**.

### Auswertung

Woche oder Monat, frei navigierbar:

- Kennzahlen des Zeitraums
- Verlauf aller Check-in-Regler als Liniendiagramm (Lücken bleiben Lücken)
- Rollenpräsenz mit Verteilung und Detailansicht je Rolle
- Wochenraster für Routinen und Checklisten, Kennzahlen für Zähler
- Streaks
- **Rückblick**: verständliche Sätze statt bloßer Zahlen, Einzelheiten
  eingeklappt, plus erkannte Zusammenhänge

### Profil

Hier entsteht und wächst das persönliche System: Rollen, Routinen, Tracking,
Check-in-Regler, Streaks, sichtbare Bereiche, Darstellung und Daten.

---

## Datenmodell

### Rolle

```js
{
  id, name, emoji, color, text,   // text wird aus color berechnet (Kontrast)
  description,
  goals: [{ id, title, done, order }],
  routineIds: [],
  activeDays: [0…6],              // leer = keine feste Wochentagsrolle
  order, archived
}
```

Gelöschte Rollen werden **archiviert**, nicht entfernt: gespeicherte Tage
behalten ihre Zuordnung und ihre Auswertung.

### Tracker

Sieben Arten decken zusammen alles ab, was früher fest eingebaut war:

| Art | Wofür | Wert |
| --- | --- | --- |
| `scale` | Regler 0–100 je Check-in | Zahl, liegt im Check-in |
| `counter` | schrittweise erhöhen | Zahl |
| `number` | freie Zahl pro Tag | Zahl |
| `choice` | Option aus eigener Liste | Options-ID |
| `checklist` | mehrere Punkte, eigene Zustände | `{ punktId: zustandId }` |
| `toggle` | Ja / Nein | Wahrheitswert |
| `text` | kurzer Freitext | Zeichenkette |

Eine Checkliste bringt ihre eigenen Zustände mit. Deshalb konnten die
Gebetszustände (`Normal`, `Gemeinschaft`, `Verspätet`, `Nachgeholt`,
`Nicht gebetet`) **wortgleich** übernommen werden.

### Tageseintrag

```js
{
  roleId,
  activities: [{ id, title, roleId, templateId, weight, order }],
  stateCheckins: [{ id, slot, time, scales: { skalaId: 0…100 }, note }],
  trackers: { trackerId: wert },
  routineProgress: { routineKey: { schrittId: "done" | "skipped" } },
  routineStates: { routineKey: "" | "done" | "responsiblySkipped" | "missed" },
  streaks: { streakId: { days, broken, todayStatus } },
  notes, checkinStructure
}
```

### Rollenmodus

Der Modus entsteht aus den Reglern, die im Profil als modusbildend markiert
sind – standardmäßig die beiden ersten. Die Gewichtung ist so gewählt, dass
sie die Rechnung aus Version 6 exakt reproduziert:

- zwei Werte → `0,42 / 0,58`
- drei Werte → `0,32 / 0,36 / 0,32`
- ab vier Werten → gleich gewichtet

Schutzregeln können den Modus nur **begrenzen**, nie anheben. Ein sehr
niedriger Einzelwert bedeutet immer den Schon-Modus.

Der Modus ist eine Lesehilfe, keine Bewertung. Es gibt keinen Gesamtscore und
keine Erfolgsquote.

---

## Dateien

| Datei | Inhalt |
| --- | --- |
| `index.html` | Markup: drei Bereiche, Onboarding, Dialoge |
| `logic.js` | Reine Logik: Datum, Profilmodell, Migration, Auswertung. Kein DOM, kein `localStorage` |
| `app.js` | Oberfläche und Verdrahtung |
| `style.css` | Designsystem samt hellem und dunklem Erscheinungsbild |
| `service-worker.js` | Offline-Hülle, Netz zuerst, Cache als Rückfallebene |
| `manifest.webmanifest` | Installation als App |
| `test-logic.js`, `test-dom.js`, `run-tests.mjs` | Tests |

`logic.js` wird im Browser **vor** `app.js` geladen; in Node ist es über
`module.exports` testbar. Beide Dateien deklarieren nichts doppelt – das wird
geprüft.

---

## Speicherschlüssel

| Schlüssel | Inhalt |
| --- | --- |
| `roleplay-v25-profile` | Das persönliche System |
| `roleplay-v25-review-JJJJ-MM-TT` | Ein Tag |
| `roleplay-v25-routines` | Alle Routinen |
| `roleplay-v25-active-routine-session` | Laufender Routinendurchlauf |
| `roleplay-v25-last-backup-at` | Zeitpunkt des letzten Backups |

---

## Sicherung

- **Backup speichern** schreibt Profil, Routinen und alle Tage in eine
  JSON-Datei.
- **Backup importieren** lädt **vorher automatisch** eine Sicherung des
  aktuellen Bestands herunter. Ein Import kann daher nie zu Datenverlust
  führen. Der Import ist auch direkt aus dem Onboarding erreichbar – für ein
  neues Gerät.
- **CSV exportieren** folgt dem Profil: jede Rolle, jeder Regler, jede
  Routine, jeder Tracker und jeder Streak bekommt seine eigene Spalte. Zahlen
  stehen mit Komma, damit deutschsprachige Tabellenprogramme sie als Zahl
  lesen.
- **Rückblick exportieren** legt die Sätze des Zeitraums als Textdatei ab.

---

## Tests

```bash
node run-tests.mjs
```

Geprüft werden:

- **`test-logic.js`** – Datumsrechnung, Rollenmodus, Bedeutungstexte,
  Profilmodell, Trackertypen, Migration eines Version-6-Bestands,
  Rollenpräsenz, Zeitraum-Auswertung, Rückblick, Routinen.
- **`test-dom.js`** – Markup, Stylesheet, Service Worker, Manifest,
  Informationsarchitektur, leere Zustände, Verdrahtung (jede angesprochene
  Kennung existiert, jedes Bedienelement ist verdrahtet, jede benutzte Klasse
  ist gestaltet, jedes Eingabefeld ist beschriftet) und ausdrücklich, dass
  **keine persönlichen Inhalte mehr fest eingebaut** sind.

Ist `jsdom` installiert, startet `test-dom.js` die App zusätzlich wirklich
und spielt die Hauptabläufe durch – Onboarding, Tagesablauf, Profilbearbeitung,
Migration, Routinen, Sicherung und Import:

```bash
npm install --no-save jsdom
node run-tests.mjs
```

Ohne `jsdom` läuft der Rest unverändert; der Ablaufteil wird übersprungen.

---

## Grundsätze

- **Lokal.** Kein Konto, kein Server, keine Analyse von außen.
- **Nichts erfinden.** Tage ohne Eintrag bleiben leer. Es wird nichts
  geschätzt, ergänzt oder hochgerechnet.
- **Beschreiben statt bewerten.** Kein Gesamtscore, keine Erfolgsquote. Eine
  Rolle ohne Eintrag ist „nicht erfasst“ – nicht vernachlässigt.
- **Einfach starten, später vertiefen.** Die App beginnt leer und wächst mit
  dem Nutzer.
- **Nichts wegwerfen.** Löschen heißt im Zweifel archivieren oder ausblenden;
  gespeicherte Tage bleiben lesbar.
