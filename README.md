# ROLEPLAY App 5.1.3

Lokale iPhone-PWA für Tagesreview, Routinen und adaptive Reflexion. Alle Daten bleiben im Browser des Geräts (`localStorage`); es gibt keine Serververbindung.

## Installation

Dateien entpacken und den Ordner ausliefern, beispielsweise über GitHub Pages. Auf dem iPhone in Safari öffnen und über **Teilen → Zum Home-Bildschirm** installieren.

## Version 5.1.3 – Reparaturversion

### Ursache der Ausfälle in 5.1.2

Im Wochenrückblick fehlten sechs Funktionen vollständig: `weekDates`,
`dailyAverageEnergy`, `dailyAverageLoad`, `dailyPrayerProgress`,
`buildWeeklyTrendChart` und `buildPrayerWeekPanel`. Das zugehörige CSS war
unversehrt, nur das JavaScript war verlorengegangen.

Dadurch warf `renderStats()` bei jedem Aufruf einen Fehler. Sowohl `saveReview()`
als auch `setDate()` rufen `renderStats()` mitten in ihrer Ablaufkette auf –
alles danach wurde nie ausgeführt:

    saveReview()  ->  localStorage.setItem() OK  ->  renderStats() ABBRUCH
                                                     renderRoutineCards()  nie
                                                     Speicherbestaetigung  nie

Gespeicherte Daten waren dabei nie gefährdet, weil `localStorage.setItem` vor
dem Abbruch steht. Ausgefallen ist ausschließlich die Aktualisierung der
Anzeige. Das erklärt den Großteil der gemeldeten Fehler.

### Reparierte Funktionen

- Wochenrückblick-Modul wiederhergestellt, passend zum vorhandenen CSS.
- Check-in speichern: Karte aktualisiert sich wieder unmittelbar.
- Gebetsdialog: schließt nach der Auswahl und schreibt den Status auf die Karte.
- Gebetskarte: die gesamte Karte ist antippbar, nicht nur der Statuskreis.
- Aktivität hinzufügen, löschen und sortieren erscheinen wieder sofort.
- "Tagesreview speichern" zeigt die Bestätigung wieder an.
- `switchPage()` und `restoreRoutineSession()` laufen beim Start wieder durch.
- Trinkmenge: Plus-Zeichen war weiß auf weißem Grund und damit unsichtbar.
- Wassertropfen werden nicht mehr abgeschnitten.
- Maghrib wird ohne Auslassungspunkte vollständig angezeigt.

### Rollenmodus-Logik neu aufgebaut

Statt eines einzelnen Mittelwerts gilt jetzt ein zweistufiges Verfahren:

1. Gesamtlage – gewichtete Mischung aller Angaben.
2. Obergrenze je Einzelwert – Energie, Laune, Belastung, Gefühl und Schlaf
   legen jeweils fest, welcher Modus höchstens noch vertretbar ist.

Ein Einzelwert kann den Modus dadurch nur noch begrenzen, nie anheben:

- Energie 10 % mit Laune 100 % ergibt Stabilisierungsmodus.
- Hohe Belastung deckelt trotz sehr guter Werte auf Reduzierten Modus.
- Die obersten beiden Modi setzen geringe Belastung voraus.

Die Begründung nennt den tatsächlich ausschlaggebenden Wert, zum Beispiel
"Begrenzend wirkt, dass die Energie bei 30 % liegt." Eine Punktzahl wird
nirgends angezeigt.

### Gestaltung

- Check-in-Karten tragen die Farbe ihrer Tageszeit statt der Modusfarbe und
  bleiben ohne gespeicherten Eintrag neutral und ohne Glow.
- Abend-Farbwelt von Rot auf Violett/Rosa umgestellt.
- Gebetsfarben folgen dem Status, nicht dem Namen des Gebets. Offene Karten sind
  vollständig neutral. Verspätet ist orange, Nachgeholt rötlich.
- Aktivitäten-Rollenstreifen liegt sauber innerhalb der Karte.
- Unterbrochene Streaks erhalten eine rote Kontur.

### Aufgeräumt

Die am Dateiende angehängten Hotfix-Blöcke wurden aufgelöst und in die
jeweiligen Komponenten eingearbeitet:

- `#waterPlus { display:grid !important; visibility:visible !important; ... }`
  entfernt – die Ursache war die Textfarbe, nicht die Sichtbarkeit.
- `.streak-card .streak-daily-actions button:not(.danger) { display:none }`
  entfernt – die betroffenen Buttons werden ohnehin nicht mehr gerendert.
- Doppelte `.checkin-slot`- und `.checkin-slot.complete`-Regeln zusammengeführt.
- Achtsamkeits- und Verantwortungsregeln in ihre Komponenten verschoben.

Verbliebene `!important`-Deklarationen sind ausschließlich die dokumentierten
Standardfälle: `[hidden]`, die `.sr-only`-Hilfsklasse und die
`prefers-reduced-motion`-Regel. Der Hack `#waterPlus { ... !important }` ist
entfernt.

## Datenkompatibilität

Der Speicherschlüssel bleibt `roleplay-v25`. Bestehende Tagesreviews, Routinen,
Check-ins, Gebete, Aktivitäten und Streaks werden unverändert weiterverwendet.
Geprüft mit Altdatensätzen: alte Rollennamen, Check-ins ohne Launenwert, der
entfernte Routinenstatus "angepasst erfüllt" und alte Modus-Schlüssel werden
migriert, ohne Fehler auszulösen.
