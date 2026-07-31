# ROLEPLAY App 5.2.0

Lokale iPhone-PWA für Tagesreview, Routinen und adaptive Reflexion. Alle Daten
bleiben im Browser des Geräts (`localStorage`); es gibt keine Serververbindung.

## Was diese Version ist

Zusammenführung zweier Stände:

- **Funktionsbasis:** Version 5.1.2 mit den vier Tages-Check-ins, Laune-Regler,
  Mahlzeitenkategorien und Rollenmodus-Logik – vollständig repariert.
- **Designsprache:** Version 3.10, die optisch gelungene frühere Fassung.

## Reparaturen aus 5.1.2

In 5.1.2 fehlten sechs Funktionen des Wochenrückblicks vollständig
(`weekDates`, `dailyAverageEnergy`, `dailyAverageLoad`, `dailyPrayerProgress`,
`buildWeeklyTrendChart`, `buildPrayerWeekPanel`). Dadurch warf `renderStats()`
bei jedem Aufruf einen Fehler – und sowohl `saveReview()` als auch `setDate()`
rufen diese Funktion mitten in ihrer Ablaufkette auf. Alles danach wurde nie
ausgeführt.

Gespeichert wurde dabei immer korrekt; ausgefallen war ausschließlich die
Aktualisierung der Anzeige. Behoben sind damit unter anderem:

- Check-in speichern aktualisiert die Karte wieder unmittelbar
- Gebetsdialog schließt und schreibt den Status auf die Karte
- Aktivitäten erscheinen nach dem Hinzufügen, Löschen und Sortieren sofort
- "Tagesreview speichern" zeigt die Bestätigung wieder an
- Plus-Zeichen der Trinkmenge war weiß auf weißem Grund
- Maghrib wird ohne Auslassungspunkte vollständig angezeigt
- gesamte Gebetskarte ist antippbar, nicht nur der kleine Statuskreis

## Designsprache aus 3.10 übernommen

- violetter Akzent `#9a6dff` statt Blau, im Dark Mode `#76a7ff`
- Grundschrift 16 px statt 15 px; verhindert zugleich das automatische
  Hineinzoomen von iOS beim Antippen von Eingabefeldern
- Überschriften in 700 statt 800, ohne negative Laufweite
- Kartenrundung 18 px, weicherer und tieferer Schatten
- untere Navigation 66 px statt 50 px, Emojis 24 px
- Kopfzeilen-Glas `blur(24px) saturate(1.3)`
- Wochenkurven als weiche Bézier-Segmente statt harter Knicke
- ruhige Markierung des heutigen Tages im Verlauf

Nicht übernommen wurde die Erfolgsquoten-Kurve aus 3.10: Der Wochenrückblick
zeigt weiterhin Energie, Belastung und Pflichtgebete – ohne Gesamtscore.

## Rollenmodus-Logik

Zweistufig statt einfacher Mittelwertbildung:

1. Gesamtlage – gewichtete Mischung aller Angaben.
2. Obergrenze je Einzelwert – Energie, Laune, Belastung, Gefühl und Schlaf
   legen jeweils fest, welcher Modus höchstens noch vertretbar ist.

Ein Einzelwert kann den Modus dadurch nur begrenzen, nie anheben. Energie 10 %
mit Laune 100 % ergibt Stabilisierungsmodus; hohe Belastung deckelt trotz sehr
guter Werte auf den Reduzierten Modus. Die Begründung benennt den
ausschlaggebenden Wert. Eine Punktzahl wird nirgends angezeigt.

## Datenkompatibilität

Der Speicherschlüssel bleibt `roleplay-v25`. Bestehende Tagesreviews, Routinen,
Check-ins, Gebete, Aktivitäten und Streaks werden unverändert weiterverwendet.
Geprüft mit Altdatensätzen aus 3.x: alte Rollennamen, Check-ins ohne
Launenwert, der entfernte Routinenstatus "angepasst erfüllt" und alte
Modus-Schlüssel werden migriert, ohne Fehler auszulösen.

## Aktualisierung

1. In der bisherigen App ein Backup speichern.
2. Den Inhalt dieses Ordners auf dem bisherigen Hosting vollständig ersetzen.
3. Die App vollständig schließen und erneut öffnen.
4. Das Backup nur importieren, falls die bisherigen Einträge nicht
   automatisch erscheinen.
