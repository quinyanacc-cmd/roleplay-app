# ROLEPLAY App 5.9.1

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Neu in 5.9.0

### Reihenfolge der Tagesreflexion

    Zustand & Rollenmodus · Islam · Aktivitäten · Routinen ·
    Vitalität · Dankbarkeit · Tagesnotiz

Darunter folgen wie bisher Wochenrückblick sowie Export & Sicherung.

### Prozentwerte in der Tagesbahn

Auf 12 px verkleinert, damit sie in den Stationen mehr Luft haben. Der
Extremfall „100 %“ auf allen vier Stationen bleibt weiterhin einzeilig und
überlappungsfrei – geprüft bei 375, 390, 393 und 430 px.

### Routinen: Kopfbilder

Jede Routine lässt sich mit einem von fünf Kopfbildern versehen:

- Sonnenaufgang
- Nachthimmel
- Bergsee am Tag *(neu)*
- Dämmerung *(neu)*
- Zuhause *(neu)*
- Ohne Bild

Der Bearbeiten-Dialog zeigt eine Vorschau des gewählten Motivs. Das Kopfbild
erscheint auf der Routinenkarte, in der Wochenübersicht und als Atmosphäre in
der laufenden Routine.

Die Bilder wurden für die PWA aufbereitet: von 8,8 MB auf zusammen 124 KB
(900 px breit, JPEG). Der Service-Worker-Cache wurde entsprechend angepasst.

### Routinen: bearbeiten und löschen

Über „Kopfbild & Titel ändern“ in der Routinenansicht lassen sich Titel,
Beschreibung und Kopfbild nachträglich anpassen – die Schritte bleiben dabei
unangetastet. Im selben Dialog steht „Routine löschen“.

Gelöscht wird mit Rückfrage. Die jeweils letzte verbliebene Routine lässt sich
nicht löschen, damit die Seite nicht leer zurückbleibt.

**Behoben:** `normalizeRoutines` mischte die Standardroutinen bei jedem Start
neu dazu – eine gelöschte Morgen- oder Abendroutine kehrte deshalb nach dem
Neuladen zurück. Liegt ein Speicherstand vor, ist er jetzt maßgeblich; die
Vorlagen dienen nur noch als Grundgerüst für fehlende Felder.

### Routinenübersicht

Die Kacheln sind von 118 auf 164 px gewachsen und zeigen jetzt den Stand des
heutigen Tages statt nur ein Bild:

- noch unberührt: „13 Schritte · 119 Min.“
- begonnen: „3/13 · noch 90 Min.“ und ein Fortschrittsbalken am unteren Rand
- abgeschlossen: „Abgeschlossen“, ein Häkchen oben rechts, die Starttaste wird
  zum Wiederholen-Symbol

Der Textblock endet vor der Starttaste, damit nichts darunter läuft; die
Statuszeile bleibt immer einzeilig.

### Laufende Routine: neues Design

Die Session übernimmt das Kopfbild ihrer Routine als weich ausblendende
Atmosphäre im oberen Bereich. Der Timer sitzt in einem Fortschrittsring, der
den Anteil der bereits erledigten Schritte zeigt. Emoji und Kreis haben
weichere Schatten bekommen.

## Datenmodell

Erweitert um ein bestehendes, bereits vorhandenes Feld: `routines[key].theme`
nimmt nun auch die Werte `tag`, `daemmerung` und `zuhause` an. Alte Werte
(`morning`, `evening`, `focus`) funktionieren unverändert weiter. Namespace
bleibt `roleplay-v25`.

## Tests

- **348** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark
- **20** Routinen-Tests: Reihenfolge der Tagesreflexion, Bearbeiten-Dialog,
  Kopfbildauswahl und -vorschau, Speichern ohne Verlust der Schritte, Löschen
  mit Bestand nach Neuladen, Start der Session mit Kopfbild und Fortschrittsring,
  Kachelgröße, erkannter Tagesfortschritt, Statuszeile ohne Umbruch, kein Text
  unter der Starttaste
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel, keine doppelten Funktionen, keine Konsolenfehler
