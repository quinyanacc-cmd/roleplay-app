# ROLEPLAY App 5.6.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Der State Cycle – nach Vorlage neu gestaltet

Der Ring besteht jetzt aus **vier Bogensegmenten mit runden Enden**, getrennt
durch weiche Abstände. Jedes Segment trägt einen eigenen pastelligen Verlauf,
der innerhalb der Phase weiterfließt:

- Nacht (oben links): Lavendel bis Flieder
- Morgen (oben rechts): Pfirsich bis Gold
- Mittag (unten rechts): helles Cyan bis Himmelblau
- Abend (unten links): Lila bis Rosé

**Symbole und Beschriftung.** Jede Phase trägt ein eigenes reduziertes Symbol –
Mondsichel, aufgehende Sonne, Sonne mit Strahlen, untergehende Sonne – in der
Tinte der jeweiligen Phase, darunter die Beschriftung. Keine Emojis, sondern
eigene Zeichnungen in der Formsprache der App.

**Zustände.** Erfasste Phasen leuchten voll und werfen einen weichen Schatten.
Noch offene bleiben zurückhaltend, die als nächste anstehende Phase deutlich
sichtbarer als der Rest. Ein heller Punkt läuft als Zeiger auf der Bahn und
markiert am heutigen Tag die aktuelle Uhrzeit.

**Der Kern** ist eine ruhige Glasfläche. Ohne Eintrag steht dort ein Gesicht
mit „Noch kein Check-in“ und „Wie fühlst du dich heute?“. Sobald ein Zustand
erfasst ist, zeigt er Tagesrolle, Rollenmodus sowie Energie und Laune.

Die ausführliche Auswertung mit Priorität und begrenzender Bedingung steht
weiterhin in der Karte darunter.

## Neu: Zustand zurücksetzen

Im Check-in-Dialog gibt es jetzt **Zurücksetzen**. Die Schaltfläche erscheint
nur, wenn für diese Tagesphase bereits etwas gespeichert ist, steht links und
tritt bewusst zurück – sie ist die seltene, nicht die naheliegende Handlung.

Zurückgesetzt wird ausschließlich die eine Tagesphase. Alle übrigen Angaben des
Tages – die anderen Check-ins, Gebete, Mahlzeiten, Aktivitäten – bleiben
unberührt.

## Korrekturen

- **Rollennamen wurden abgeschnitten** („Familienmens…“). Zwei Ursachen: eine
  spätere Regel überschrieb die Schriftgröße, und eine Medienabfrage deckelte
  die Breite auf 168 px. „Familienmensch“ passt jetzt an allen geprüften
  Breiten vollständig.
- **Dark Mode:** Symbole und Beschriftung wurden auf den gedimmten Bögen
  aufgehellt – aber nur dort. Auf einem hell leuchtenden Bogen bliebe helle
  Schrift unlesbar, dort behält die dunkle Tinte den Kontrast.
- Der Zeiger ist in beiden Modi hell; zuvor wurde er im Dark Mode zu einem
  dunklen Fleck.
- Die ausgefransten Kanten und radialen Streifen der Vorversion entfallen mit
  der neuen Bogenzeichnung vollständig.

## Datenmodell

**Unverändert.** Keine Migration, kein neuer Schlüssel. Namespace bleibt
`roleplay-v25`. Das Zurücksetzen entfernt einen Eintrag aus `stateCheckins`
und schreibt den Tag normal zurück.

## Tests

- **306** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark,
  darunter sieben für das Zurücksetzen (Sichtbarkeit der Schaltfläche, Wirkung
  auf genau eine Phase, Erhalt der übrigen, Bestand nach Neuladen)
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel, keine doppelten Funktionen, keine Konsolenfehler
- Breite des längsten Rollennamens an drei Gerätebreiten vermessen
