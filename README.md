# Roleplay App 3.4

Version 3.4 baut auf Version 3.1 auf. Der bestehende lokale Datenspeicher (`roleplay-v25`) bleibt unverändert, sodass vorhandene Einträge und importierte Backups weiterhin kompatibel sind. Vor dem Austausch der Dateien wird dennoch ein aktuelles Backup empfohlen.

## Neu in Version 3.4

- Dark-Mode-Kopfzeile wieder dezent in der Farbe der ausgewählten Tagesrolle.
- Wochenstatistik ohne zusätzliche Balken- oder Kreisvisualisierung unterhalb der Erfolgskurve.
- Wochenplan-PDF mit größerer, einheitlicher Schrift und besserer Nutzung der verfügbaren Textflächen.

- Intelligente Erfolgsquote mit differenzierter Gebetsqualität:
  - Gemeinschaftsgebet: 22 Punkte
  - pünktlich gebetet: 20 Punkte
  - verspätet gebetet: 15 Punkte
  - nachgeholt: 8 Punkte
  - nicht gebetet: 0 Punkte
  - Morgen- und Abendroutine: jeweils 10 Punkte
- Fünf pünktliche Gebete und beide Routinen ergeben 100 Prozent; Gemeinschaftsgebete ermöglichen einen Bonus bis 108 Prozent.
- Noch offene Gebete werden am laufenden Tag neutral behandelt und erst an vergangenen Tagen mit 0 bewertet.
- Geglättete Wochenkurve mit Montag bis Sonntag, 80-Prozent-Zielgrenze und Markierung des heutigen Tages.
- Korrigierter Überblick in der Wochenstatistik ohne überlappende Werte.
- Streak-Seite mit schlankem Einleitungstext statt einer zusätzlichen Informationskarte.
- Kompaktere Streak-Karten, kleinere Statuschips sowie sauber ausgerichtete Tagesangabe.
- Schutzdialog mit gleich breiten Schaltflächen: Abbrechen links, Öffnen rechts.
- Leicht verfeinerte Routine-Karten und Navigation.
- Neu gewichteter Wochenplan-PDF:
  - kompaktere Kopf-, Vitalitäts-, Routine- und Gebetsbereiche
  - wesentlich mehr Platz für Reflexion und Notizen
  - mehr Platz für Aktivitäten
  - kompakter Streak-Bereich mit allen vier Einträgen
  - weißer Hintergrund und korrekte deutsche Umlaute

## Aktualisierung

1. In der bisherigen App ein Backup speichern.
2. Den Inhalt dieses Ordners auf dem bisherigen Hosting vollständig ersetzen.
3. Die App vollständig schließen und erneut öffnen.
4. Falls weiterhin eine ältere Version erscheint, die Web-App vom Home-Bildschirm entfernen und über Safari erneut hinzufügen oder den Browser-Cache leeren.
5. Das Backup nur importieren, wenn die bisherigen Einträge nicht automatisch erscheinen.

Die Daten werden ausschließlich lokal im Browser beziehungsweise in der installierten Web-App gespeichert. Die Bestätigungsabfrage vor den Streaks verhindert versehentliche Einsicht, verschlüsselt die lokal gespeicherten Daten jedoch nicht.


## Version 3.5
- Laufende Routinen können direkt im Timer bearbeitet, ergänzt und umsortiert werden.
- Timerzustand wird weiterhin anhand eines absoluten Endzeitpunkts gespeichert und beim Zurückkehren korrekt synchronisiert.
