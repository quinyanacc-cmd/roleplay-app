# ROLEPLAY App 6.0.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung,
kein Framework, keine externen Bibliotheken.

## Visueller Relaunch (6.0.0-Design)

Rein gestalterische Überarbeitung: Inhalte, Texte, Daten, Berechnungen,
Speicherformate, Service Worker und Manifest sind unverändert geblieben.

**Designsystem.** Vier Radienstufen (`--r-sm/md/lg/pill`) statt einer, vier
Oberflächen (`card`, `raised`, `glass`, `base`), vier Höhenstufen (`--e-0…3`)
mit Randlicht statt Schlagschatten im Dark Mode, Bewegungs-Tokens
(`--dur-*`, `--ease-*`) und ein einziger `--focus-ring` für die ganze App.

**Futura bleibt** die Grundschrift. Die Typoskala wurde an ihre kleine x-Höhe
angepasst: offenere Zeilenhöhen, `--ls-display` für Überschriften,
`--ls-caps` für Versalien-Labels.

**Kopfzeile** ist jetzt Glas mit Rollenfarbe als Verlauf und Akzentlinie
statt Vollton. Die Schriftfarbe wird aus der Rollenfarbe abgeleitet
(`--header-role-ink-light/-dark`), damit helle Rollen auf Glas lesbar bleiben.
Die gespeicherten Rollenfarben selbst sind unverändert.

**Navigation** trägt eigene SVG-Icons im Strichstil der Tagesphasen-Symbole;
der aktive Tab wird durch Pille **und** Farbe markiert. `aria-label`, `title`
und `data-page` sind unverändert.

**Herzstück.** Der Modus-Readout trägt die Modusfarbe als weiches Licht von
oben, die aktive Station der Tagesbahn ist der hellste Punkt.

**Barrierearmut.** Auswahl wird nie nur über Farbe angezeigt (Bilanz-Chips
mit Haken, ausgewählter Kalendertag zusätzlich fett), `prefers-reduced-motion`
schaltet Bewegung zentral ab, `@supports`-Fallback liefert deckende Flächen,
wenn `backdrop-filter` fehlt.

## Neu in 6.0.0

### Rollenmodus ohne Aufgaben

ROLEPLAY ist kein Habit-Tracker. Der Rollenmodus beschreibt ab dieser Version
ausschließlich **Umfang, Tempo und Form** des Handelns – er verteilt keine
Aufgaben mehr.

Die Systemlogik lautet:

    Zustand → angemessener Rollenmodus → Coach-Impuls →
    eigenverantwortliches Handeln → spätere ROLEPLAY-Bilanz

Entfernt wurden dabei die Rollenmatrix (`ROLE_CONFIG.levels`), `dayPriorityText`,
`recommendationForCheckin`, `PROTECTIVE_LEVEL_TEXT`, `MODE_LEVEL_MAP`,
`stateCauseSentence` sowie die ausschließlich dafür genutzte Wochenaufgabenlogik.
Der Modus hebt dabei keine Verantwortung auf: Gebete, Fastentage, Streaks,
Routinen und Aktivitäten bleiben vollständig erhalten.

### Fünf verbindliche Modi

| Modus | Ab Wert | Farbe |
| --- | --- | --- |
| Schon-Modus | 0 | Koralle `#E77D4D` |
| Minimum | 40 | Amber `#E5A22E` |
| Standard | 55 | Türkis `#27B9A9` |
| Fokus | 70 | Blau `#3D7BE8` |
| Entwicklungsmodus | 92 | Violett `#7258E8` |

Die Berechnung bleibt unverändert: Laune 0,58, Energie 0,42, harte Untergrenze
bei einem Einzelwert ≤ 15, Deckelung bei < 25 und < 35 sowie die Ausnahme, dass
eine sehr gute Laune eine energiebedingte Begrenzung um eine Stufe anheben darf.
Eine manuelle Auswahl gibt es weiterhin nicht.

Alte Modusschlüssel werden beim Laden abgebildet:
`stabilization|recovery|protection → gentle`, `maintenance → minimum`,
`balance → standard`, `design → focus`, `peak → development`.

### Coach-Impuls

Statt Aufgaben- und Begründungstext erscheint eine kompakte, in der Modusfarbe
getönte Fläche mit der Überschrift **IMPULS FÜR JETZT**, einem festen Kernsatz je
Modus und einem zustandsabhängigen Zusatzsatz.

Die Zustandskategorie wird in dieser Reihenfolge bestimmt: `bothHigh`, `bothLow`,
`moodLeads`, `energyLeads`, `balanced`. Gleiche Werte ergeben immer denselben
Text – es gibt keinen Zufall. Hauptansicht und Check-in-Vorschau nutzen mit
`coachImpulse()` dieselbe zentrale Textfunktion.

### Fünf Check-ins pro Tag

    Nacht · Morgen · Mittag · Nachmittag · Abend

Der Nachmittag hat ein eigenes SVG im vorhandenen Strichstil und eine eigene
Farbwelt, die den Türkis-Gold-Ton des Mittags in die wärmeren Abendfarben führt.

Hervorgehoben wird **immer der erste noch nicht ausgefüllte Check-in in der
festen Reihenfolge** – nicht mehr der zur Uhrzeit passende. Die Uhrzeit wird
weiterhin als Eintragszeit gespeichert. Alle fünf Stationen bleiben antippbar
und bearbeitbar.

### Tagesbahn

Fünf gleichmäßige Spalten ohne horizontales Scrollen, kleinere Grundkreise
(42 px, auf schmalen Geräten 38 px), der aktive Kreis nur moderat größer
(Faktor 1,1). Energie und Laune stehen untereinander statt nebeneinander; die
senkrechte Trennlinie ist entfallen. Die Verbindungslinie besteht jetzt aus vier
eigenständigen Segmenten, die ausschließlich die Zwischenräume füllen, hinter den
Stationen liegen und mit Abstand vor dem Kreisrand enden.

### Routine-Schritt-Editor

Die Emoji-Vorauswahl ist vollständig entfallen (`QUICK_EMOJIS`, Raster,
Listener, automatisches ✨). Das Emoji-Feld ist bei neuen Schritten leer und
verpflichtend; ohne Eingabe wird nicht gespeichert, sondern eine kurze
Inline-Rückmeldung gezeigt. Die Dauer ist ein natives `select` von 1 bis 180
Minuten (auf dem iPhone das Auswahlrad) mit korrekten Singular- und
Pluralformen. Abweichende gespeicherte Dauern – etwa 2,5 Minuten – bleiben als
zusätzliche Option erhalten und werden nicht verändert.

### ROLEPLAY-Bilanz

Neue Karte zwischen „Dankbarkeit“ und „Tagesnotiz“. Sie arbeitet mit antippbaren
Karten, Chips und einem Segmented Control – bewusst ohne Schieberegler, weil
diese eine Rangordnung suggerieren würden, und ohne neue Freitextfelder.

1. **Verantwortungsbilanz** – Erfüllt · Angepasst · Zurückgestellt · Versäumt ·
   Überdehnt. Je nach Antwort folgt genau eine kurze, kontrollierte
   Folgeauswahl; bei „Zu einem konkreten Termin“, „Nachholen“ und „Neu planen“
   erscheint ein natives Datumsfeld. Es entsteht keine Punktzahl, keine
   Erfolgsquote und keine moralische Bewertung.
2. **Passung des Rollenmodus** – Zu fordernd · Passend · Zu schonend. Die
   Auswahl verändert die Modusberechnung nicht; sie dient nur als transparente
   Rückmeldung. Ohne Check-in bleibt sie deaktiviert.

### Doppeltipp-Zoom

`touch-action: manipulation` auf `html`, `body`, `.app-shell` und `dialog`.
Scrollen, Regler, Selects, Datumsfelder, Wischgesten und Sortieren funktionieren
unverändert; Pinch-to-Zoom bleibt erhalten. Kein `maximum-scale`, kein
`user-scalable=no`, kein globales `preventDefault()`.

## Datenmodell

Namespace bleibt `roleplay-v25`, Backup-Schema steigt auf **6**. Ältere Backups
lassen sich weiterhin importieren.

Neu je Tag:

    roleplayBalance: {
      outcome, detailKeys[], followUpAction, followUpDate,
      modeFit, evaluatedModeKey, evaluatedRoleName
    }
    checkinStructure: 5 | 4

`checkinStructure` unterscheidet neue Fünfer-Tage von historischen Vierer-Tagen.
Fehlt der Wert, gilt ein bereits gespeicherter zurückliegender Tag als
Vierer-Tag: der Nachmittag erscheint dort neutral mit „–“ und wird ausdrücklich
nicht rückwirkend als Versäumnis gewertet. Wird dort bewusst ein Nachmittag
eingetragen, wechselt der Tag dauerhaft auf die Fünfer-Struktur. Energie- oder
Launenwerte werden dabei nie erfunden.

Alle Werte werden beim Laden gegen feste erlaubte Listen geprüft. Vorhandene
`roleReflections` bleiben erhalten und dienen als Ausgangswert für die
Verantwortungsbilanz. CSV-Export und Backup enthalten die neuen Felder.

## Tests

`node test-regression.js` (42 Prüfungen) vergleicht die redesignte App mit der
Fassung davor: sichtbare Texte, IDs, `data-*`-Attribute, DOM-Zugriffe,
Speicherschlüssel und Logikkonstanten müssen identisch sein.

`node test-logic.js` (98 Prüfungen) und `node test-dom.js` (74 Prüfungen) decken
Modusleiter, Schutzregeln, Coach-Texte, Check-in-Reihenfolge, Migration alter
Tage, Bilanzvalidierung, CSV-Export und den Schritt-Editor ab. Beide laufen ohne
Netzwerk und ohne Abhängigkeiten.
