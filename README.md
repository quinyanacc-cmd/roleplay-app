# ROLEPLAY App 5.7.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Der State Cycle – ein geschlossener Farbkreis

Der Ring ist jetzt ein **durchgehender Kegelverlauf** ohne jede Segmentkante.
Der Farbweg führt von der tiefblauen Nacht über Violett und Rosé in das Orange
des Morgens, weiter über Gold ins Türkis des Mittags und über Blau und Magenta
des Abends zurück in die Nacht. Der Kreis schließt sich also farblich.

Das Band reicht weit nach innen; in der Mitte bleibt eine ruhige Fläche für
Tagesrolle, Rollenmodus, Energie und Laune.

**Nur noch Symbole.** Die Beschriftungen NACHT / MORGEN / MITTAG / ABEND sind
entfallen – sie passten nicht sauber ins Band. Stattdessen trägt jede Phase ihr
eigenes weißes Symbol, exakt in der Bandmitte des Quadranten zentriert:
Mondsichel, aufgehende Sonne, Sonne mit Strahlen, untergehende Sonne.

**Erfasst oder offen** steuert eine zweite Ebene mit ebenfalls weich
verlaufender Abdunklung. Auch dieser Wechsel bleibt dadurch fließend statt
kantig: erfasste Phasen leuchten voll, offene sind gedämpft, die als nächste
anstehende dazwischen.

Der weiße Zeigerpunkt ist entfallen.

Technisch: ein CSS-Kegelverlauf mit radialer Maske. Keine hunderte
SVG-Teilstücke mehr, dadurch keine Streifen, keine Sägezahnkanten und
deutlich weniger Rechenaufwand.

## Weitere Korrekturen

**Energie fehlte im Wochenverlauf.** `dailyAverageEnergy` schloss die Nacht
noch aus – ein Überbleibsel aus der Zeit, als der Nacht-Check-in keine Energie
erfasste. An Tagen mit reinem Nacht-Check-in fehlte der Wert deshalb ganz,
während die Laune angezeigt wurde. Beide Kurven rechnen jetzt gleich.

**Der Farbstreifen an der Auswertung** unter dem Kreis ist entfernt; die Karte
wirkt damit ruhiger und nicht mehr wie eine Warnung.

**Die Dialogschaltflächen** liegen jetzt in einem Raster: „Abbrechen“ und
„Speichern“ gleich breit nebeneinander, „Zurücksetzen“ über die volle Breite
darunter.

**Die beiden Wochenpanels** – Pflichtgebete und Routinen – teilen sich jetzt
Gestaltung, Raster, Punktgröße und Abstand. Zuvor hatten sie unterschiedliche
Punktgrößen (7 px gegen 9 px), verschiedene Hintergründe und einen zu großen
Abstand zueinander. Beim Gebets-Panel lagen außerdem zwei sich überschreibende
Regeln vor, die zusammengeführt wurden.

## Datenmodell

**Unverändert.** Keine Migration, kein neuer Schlüssel. Namespace bleibt
`roleplay-v25`.

## Tests

- **333** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark
- Darunter dauerhafte Geometrieprüfungen: Symbole zentriert im Ring und ohne
  Überlappung mit dem Kern, kein Überlauf der Dialogschaltflächen
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel, keine doppelten Funktionen, keine Konsolenfehler
