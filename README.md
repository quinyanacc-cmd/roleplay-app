# ROLEPLAY App 5.6.1

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Der State Cycle

Vier Bogensegmente mit runden Enden, getrennt durch weiche Abstände. Jedes
Segment trägt einen pastelligen Verlauf, ein eigenes reduziertes Symbol und
seine Beschriftung in der Tinte der Phase:

- Nacht (oben links): Lavendel, Mondsichel
- Morgen (oben rechts): Pfirsich bis Gold, aufgehende Sonne
- Mittag (unten rechts): Cyan bis Himmelblau, Sonne mit Strahlen
- Abend (unten links): Lila bis Rosé, untergehende Sonne

Erfasste Phasen leuchten voll, offene bleiben zurückhaltend, die als nächste
anstehende deutlich sichtbarer. Ein heller Punkt läuft als Zeiger auf der
Außenkante und markiert am heutigen Tag die Uhrzeit.

Im Kern steht ohne Eintrag „Noch kein Check-in / Wie fühlst du dich heute?“,
mit Eintrag Tagesrolle, Rollenmodus sowie Energie und Laune. Die ausführliche
Auswertung mit Priorität und begrenzender Bedingung steht darunter.

## Korrekturen in 5.6.1

**Die runden Bogenenden überlappten sich.** Ein runder Abschluss verlängert den
Bogen an jeder Seite um die halbe Bandbreite – hier rund 11,4°. Der Abstand
zwischen den Phasen betrug aber nur 7°, sodass sich benachbarte Kappen
berührten. Band auf 42 verschmälert, Abstand auf 15° erhöht: es bleibt eine
sichtbare Lücke von gut 7°.

**Der Kern überdeckte die Beschriftung.** Waagerechter Text auf einem Kreis
kommt an seinen Ecken näher an den Mittelpunkt als der Radius vermuten lässt –
bei „MORGEN“ genau bis an den Kernrand. Kern verkleinert, Beschriftung nach
außen gerückt, Schrift leicht reduziert. Nachgemessen bleiben an allen
geprüften Breiten 8 bis 13 px Abstand.

**Die Symbole ragten über den Bogen hinaus.** Auf 82 % verkleinert und nach
innen gerückt; sie liegen jetzt vollständig im Band.

**Der Modus- und Rollenname lief aus dem Kern.** „Stabilisierungsmodus“ ist
breiter als der Kerndurchmesser. Schriftgrößen angepasst, Silbentrennung
erlaubt.

**Die Dialogschaltflächen liefen über.** Mit sichtbarem „Zurücksetzen“
brauchten die drei Schaltflächen rund 400 px bei 321 px Platz – „Speichern“
wurde abgeschnitten. „Zurücksetzen“ steht jetzt in einer eigenen Zeile
darunter.

**Der Dialogtitel** nennt die Tagesphase wie im Ring („Morgen“ statt
„Morgens“).

## Zustand zurücksetzen

Im Check-in-Dialog entfernt „Zurücksetzen“ die Zustandsaufnahme einer einzelnen
Tagesphase. Die Schaltfläche erscheint nur, wenn dort etwas gespeichert ist.
Alle übrigen Angaben des Tages bleiben unberührt.

## Datenmodell

**Unverändert.** Keine Migration, kein neuer Schlüssel. Namespace bleibt
`roleplay-v25`.

## Tests

- **324** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark
- Darunter dauerhafte Geometrieprüfungen: Abstand der Beschriftung zum Kern,
  Symbole innerhalb des Bogens, kein Überlauf der Dialogschaltflächen
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel, keine doppelten Funktionen, keine Konsolenfehler
