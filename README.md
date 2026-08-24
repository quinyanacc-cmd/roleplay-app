# ROLEPLAY App 8.0.0

Lokale iPhone-PWA für Tagesreflexion, Rollen, Routinen und Auswertung.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung,
kein Backend, kein Framework, keine externen Bibliotheken, keine Chartbibliothek.

Dateien: `index.html`, `logic.js`, `app.js`, `style.css`, `service-worker.js`,
`manifest.webmanifest`, Bilder, `test-logic.js`, `test-dom.js`.

## Aufbau ab 8.0.0

`logic.js` ist neu und enthält die **reine Kernlogik** ohne DOM-, Storage- oder
Netzzugriff: Rollen, Modusberechnung, Aktivitäts- und Fastenmodell, Wochenfokus,
Rollenkompass, SMA-Normalisierung, Streak-Umrechnung, Reporttexte und die
Aufbereitung der Auswertung. Im Browser wird die Datei als klassisches Skript
**vor** `app.js` geladen (gemeinsamer globaler Gültigkeitsbereich), in Node über
`module.exports` getestet. `app.js` bleibt für Oberfläche, Speicherung und
Ereignisse zuständig.

## Neu in 8.0.0

### 1. Vierter Reiter „Auswertung“

Neue Hauptseite mit Diagramm-Symbol. Der bisherige Wochenrückblick aus der
Tagesreflexion ist vollständig dorthin umgezogen; der Tagesrollen-Picker
erscheint dort nicht mehr.

Oben ein iOS-Segmented-Control **Woche / Monat / Jahr** plus Periodennavigation
vor und zurück. Bereiche in dieser Reihenfolge:

1. **Report** – lokal erzeugte „Stimme aus dem Off“
2. **Rollenkompass** – Präsenz je Rolle im Zeitraum
3. **Energie, Laune und Check-in-Verlauf**
4. **Routinen und Pflichtgebete**
5. **Fasten und Streaks**
6. **Datenbasis und Export**

Alle Diagramme sind handgeschriebenes SVG/HTML/CSS mit `aria-label` und
Textalternative. Leere oder in der Zukunft liegende Tage erzeugen **keine
Nullwerte**, sondern Lücken; die Datenabdeckung wird ausgewiesen.

### 2. SMA-Arbeit innerhalb der Rolle Unternehmer

Es gibt weiterhin keine Rolle „Arbeitnehmer“. SMA-Arbeit ist Kontext einer
Unternehmer-Aktivität, nicht eine eigene Rolle.

- **Ein-Tipp-Schalter „SMA-Arbeitstag“** auf der Tagesseite, unabhängig von der
  gewählten Tagesrolle.
- Unternehmer-Aktivitäten erhalten einen Kontext aus fester Liste:
  **SMA-Regelarbeit / Eigene Entwicklung / Sonstiger Beitrag**. Kein Freitext.
- Mehrere SMA-Aktivitäten am selben Tag zählen als **ein** Arbeitstag; die
  Detailansicht zeigt sie einzeln.
- Normalisierung: `SMA-Wochenbeitrag = erfasste Tage / geplante Tage`, hart
  gedeckelt bei 1,0. Standard sind 5 geplante Tage, in der Auswertung auf 0–7
  änderbar. Bei 0 geplanten Tagen wird nichts geteilt, sondern „ohne Planwert“
  ausgewiesen. Eigene Projekte werden durch SMA-Tage nicht kleiner gerechnet.

### 3. Aktivitätsgröße

Klein = 1, Mittel = 2, Groß = 3 Beitragspunkte, **Mittel vorausgewählt**. Die
Punkte fließen ausschließlich in die Rollenübersicht. Es entsteht daraus
ausdrücklich **kein Leistungsscore und keine Erfolgsquote**.

### 4. Rollenpriorität statt Rangliste

Die Priorität ergibt sich aus **Grundpräsenz** (wie oft eine Rolle real
vorkommt) und **Wochenfokus**. Der Fokus wird über farbige Rollen-Chips gesetzt:
ein Hauptfokus, optional ein Zweitfokus, gespeichert je ISO-Kalenderwoche
(`2026-W34`). Frühere Wochen bleiben unverändert erhalten.

Die App darf einen Fokus **vorschlagen**, speichert ihn aber **nie ungefragt**.
Die laufende Woche wird nie als Versäumnis gewertet.

### 5. Lokaler Report

Für Woche, Monat und Jahr, vollständig lokal erzeugt, in fester Gliederung:
Lage, höchstens drei Entwicklungen, Rollenkompass, mögliche Zusammenhänge,
**genau ein** nächster Schritt, Datenbasis.

Tatsache, Muster, Interpretation und Vorschlag werden sprachlich getrennt.
Ausgeschlossen sind Wörter wie „Versagen“ oder „undiszipliniert“, Diagnosen,
Kausalbehauptungen und moralische Urteile; Zusammenhänge erscheinen nur als
Möglichkeit. Reicht die Datenbasis nicht, erscheint wörtlich:

> Für eine belastbare Entwicklung fehlen noch genügend Einträge.

Es gibt keine Gesamtpunktzahl.

### 6. Optionale KI-Tiefenanalyse ohne API

Kein Schlüssel, keine Verbindung, kein automatischer Versand. Der Button „Mit KI
vertiefen“ erzeugt ein Datenpaket über 30 oder 90 Tage. Freitexte (Tagesnotiz,
Dankbarkeit, Träume) sind **standardmäßig ausgeschaltet** und einzeln zuschaltbar.
Vor jedem Export erscheint eine Vorschau. Ausgabe als TXT, JSON, über Kopieren
oder über die Web-Share-Funktion. Ein fester Analyseauftrag mit acht Regeln wird
automatisch angehängt.

### 7. ROLEPLAY-Bilanz radikal vereinfacht

Genau eine Frage: **„Wie hast du deine wichtigste Verantwortung heute
beantwortet?“** – Erfüllt, Angepasst, Zurückgestellt, Versäumt, Überdehnt.
Ein Tipp, sofort gespeichert. Keine Folgefragen, keine Detailauswahl, kein
Datumsfeld, keine Moduspassung. Bereits gespeicherte alte Angaben bleiben in
Backup und Export vollständig erhalten.

### 8. Streaks

Funktional unverändert: vier Streaks, Tage direkt editierbar, Unterbrechung,
Sichtschutz, Fortschreibung. Neu ist nur die **Umrechnung**: zusätzlich zu den
Tagen werden Wochen sowie eine kalendarische Angabe in Jahren, Monaten und Tagen
und ein daraus abgeleitetes Startdatum angezeigt. Die kalendarische Rechnung
folgt echten Monatslängen. Editierbar bleiben ausschließlich die Tage.

### 9. Fasten neu gedacht

Drei Arten und ein Leerwert, **genau eine Angabe je Tag**:

| Wert | Bedeutung |
| --- | --- |
| `""` | nicht erfasst |
| `catchUp` | Nachholtag (Ramadan) |
| `voluntary` | freiwilliges Fasten |
| `ramadan` | Fasten im Ramadan |
| `legacy` | nur Altdaten, Art unbekannt |

Der Nachholstand wird **positiv** formuliert: „Noch X Nachholtage offen“.

Die Berechnung ist **idempotent**: Der sichtbare Stand wird jedes Mal neu aus
`Grundstand − erfasste Nachholtage` abgeleitet und nie fortgeschrieben. Ein
zurückgenommener Nachholtag stellt den vorherigen Stand deshalb exakt wieder her,
und ein doppelter Aufruf verringert nichts doppelt.

Wochenziel Nachholfasten: Standard 1. Freiwilliges Fasten hat kein Ziel und wird
nur gezählt, nicht bewertet.

### 10. Empfindungssätze

Unter dem Energie- und dem Laune-Regler steht je ein kurzer Satz aus fünf festen
Bändern, aktualisiert über `aria-live="polite"`. Keine Eingabefelder. Die
Modusberechnung bleibt unverändert.

### 11. Dialogzentrierung

Alle Dialoge sitzen zuverlässig in der Bildschirmmitte, auch in iOS Safari und
als Home-Screen-PWA:

    position: fixed; inset: 0; margin: auto;
    max-height: min(calc(var(--modal-viewport-h) − Safe Areas), 88dvh);
    transform: translateY(var(--modal-viewport-shift));

`--modal-viewport-h` und `--modal-viewport-shift` werden aus `visualViewport`
gepflegt, sodass eine eingeblendete Tastatur den Dialog verschiebt statt ihn
abzuschneiden. Für ältere Browser gibt es einen `@supports`-Fallback ohne `dvh`.
Lange Inhalte scrollen innerhalb des Dialogs, der Hintergrund bleibt fixiert.
Hochformat, Querformat, Dark Mode, Backdrop, Fokus, Escape und Formularabsenden
funktionieren unverändert.

## Datenmodell und Migration

Namespace bleibt **`roleplay-v25`**. Backup-Schema steigt auf **8**. Ältere
Backups (Schema 5, 6, 7) lassen sich weiterhin importieren.

### Neue Felder je Tag

    activities: [{ title, role, size, context }]
    smaWorkday: boolean
    fasting: { type: "" | "catchUp" | "voluntary" | "ramadan" | "legacy" }

### Neuer Einstellungsblock

Gespeichert unter `roleplay-v25-settings`, im Backup als `settings`:

    smaPlannedDaysPerWeek: 5
    fastingCatchUpBaseline: 0
    fastingCatchUpWeeklyGoal: 1
    fastingVoluntaryWeeklyGoal: 0
    fastingMigrated: false
    weekFocus: { "2026-W34": { primary, secondary } }
    aiExport: { rangeDays, includeNotes, includeGratitude, includeDreams }

### Migrationsregeln

**Aktivitäten.** Bestehende Einträge behalten Titel und Rolle und bekommen
`size: "medium"` sowie `context: "none"`. Der Kontext wird **niemals** aus dem
Titel abgeleitet – ein alter Eintrag „SMA Meeting“ wird also nicht automatisch
als SMA-Regelarbeit gewertet. SMA-Tage entstehen ausschließlich durch den
Tagesschalter oder durch eine bewusst gesetzte Unternehmer-Aktivität.

**Fasten.** Ein alter Tag mit `fastingCompleted: true` und ohne neue Angabe wird
als `fasting.type = "legacy"` geführt, also als abgeschlossener Fastentag ohne
sicher bekannte Art. Er wird nicht als Nachholtag gezählt und verringert den
offenen Stand deshalb nicht. Das alte Feld `fastingCompleted` bleibt erhalten.
Ein negativer Altwert in `ramadanDays` wird einmalig als Grundstand offener
Nachholtage übernommen (`fastingCatchUpBaseline = |ramadanDays|`); der Vorgang
wird über `fastingMigrated` gemerkt und läuft deshalb genau einmal. `ramadanDays`
selbst bleibt unverändert im Datensatz stehen.

**Bilanz.** Die alte Detailauswahl wird nach `detailOutcome` gespiegelt und in
Backup und CSV weiterhin ausgegeben, obwohl die Oberfläche sie nicht mehr abfragt.
`roleplayBalance.outcome` bleibt der führende Wert.

**Check-ins.** `checkinStructure` (5 oder 4) gilt unverändert weiter: fehlt der
Wert bei einem zurückliegenden Tag, gilt er als Vierer-Tag, der Nachmittag
erscheint neutral mit „–“ und wird nicht rückwirkend als Versäumnis gewertet.
Energie- und Launenwerte werden nie erfunden.

**Roundtrip.** Export → Import → Export erzeugt denselben Datenbestand; alle
neuen Felder sind in Backup und CSV enthalten und werden beim Laden zentral gegen
feste erlaubte Listen validiert.

## Tests

    node test-logic.js
    node test-dom.js

`test-logic.js` (203 Prüfungen) deckt die reine Logik ab: Modusleiter und
Schutzregeln, Coach-Texte, Check-in-Reihenfolge, Aktivitätsgrößen und -kontexte,
SMA-Normalisierung samt Deckelung und Division durch null, Fasten-Idempotenz und
Rücknahme, Legacy-Migration, Wochenfokus je ISO-Woche, Rollenkompass,
Streak-Umrechnung über echte Monatslängen, Reportregeln inklusive verbotener
Formulierungen und Mindestdatenbasis sowie Empfindungssätze.

`test-dom.js` (188 Prüfungen) prüft die Auslieferung statisch: `node --check`
für alle JavaScript-Dateien, Version 8.0.0 in allen Dateien, Service-Worker-Cache
und Dateiliste, vier Reiter, Vorhandensein und Verdrahtung aller Bedienelemente,
`aria`-Auszeichnung, Dialogzentrierungsregeln im CSS, Abwesenheit externer
Skripte und Bibliotheken sowie die Trennung von `logic.js` (kein DOM, kein
`window`, kein `localStorage`, kein Netzwerk).

Beide Suiten laufen ohne Netzwerk und ohne Abhängigkeiten.

### Nicht automatisiert

Die Tests sind statische Struktur- und Kompilierprüfungen plus reine
Logikprüfungen. Es gibt keine Laufzeit-DOM-Emulation und keinen echten Browser.
Manuell zu prüfen bleiben daher: Darstellung auf schmalen iPhone-Displays,
Dialogverhalten bei eingeblendeter Tastatur, Home-Screen-PWA, Dark Mode,
Querformat und das Verhalten des Service Workers beim Versionswechsel.
