# ROLEPLAY App 5.5.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Der State Cycle

Diese Version baut die Zustandsdarstellung zum visuellen Herzstück aus.

### Ein durchgehender Verlauf, keine Segmente

Der Ring besteht nicht mehr aus vier abgegrenzten Vierteln. Rund um den Kreis
liegen siebzehn Farbanker, zwischen denen fortlaufend interpoliert wird –
gezeichnet als 240 feine Teilstücke. Nacht, Morgen, Mittag und Abend gehen
dadurch fließend ineinander über, ohne jede sichtbare Grenze.

Der Farbweg folgt einem echten Tag: tiefes Indigo, violette Dämmerung,
Sonnenaufgang, Gold, klarer Mittagshimmel, weicher Nachmittag,
Sonnenuntergang, Abendrot, Abenddämmerung – und zurück ins Indigo.

### Die anstehende Phase tritt hervor

Die als nächste fällige Tagesphase schwillt weich nach außen (13 px, über eine
Kosinus-Rampe eingeblendet) und trägt eine farbige Lichtkante. Sie steht damit
sichtbar heraus, ohne herausgeschnitten zu wirken.

Damit die Außenkante dabei glatt bleibt, werden alle Teilstücke bis zum
äußersten Radius gezeichnet und über einen Beschnittpfad auf die tatsächliche
Kontur zurückgeschnitten. Ohne diesen Schritt entstünde eine sägezahnartige
Kante.

### Hell und Dunkel über eine Maske

Erfasste Phasen leuchten, noch offene bleiben gedämpft. Gesteuert wird das
über eine weichgezeichnete SVG-Maske. Über Einzeltransparenzen ginge es nicht:
An jeder Überlappung addierte sich der Alphawert und der Ring bekäme radiale
Streifen.

### Ohne Beschriftung, ohne Emoji

Die Textlabels sind entfallen. Jede Phase trägt nur noch ihre abstrakte Marke:
eine Horizontlinie mit einem Lichtkörper, dessen Höhe die Tageszeit erzählt –
darunter Nacht, aufsteigend Morgen, hochstehend Mittag, absinkend Abend.
Dieselbe Marke erscheint im Check-in-Dialog.

### Auswertung unter dem Kreis

Der Kern ist frei; die Mitte trägt nur ein weiches Licht in der Modusfarbe.
Die Aussage des Systems steht darunter in einer eigenen Karte: Tagesrolle und
Rollenmodus, die beiden Messwerte mit Balken, die heutige Priorität und die
begrenzende Bedingung. Die frühere Doppelung – Modus im Kreis *und* in der
Karte – ist damit aufgelöst.

Der Zeitzeiger am Außenrand markiert am heutigen Tag die aktuelle Uhrzeit auf
der Tagesbahn.

Umgesetzt in SVG und CSS. Keine Dauer-Animation, kein Canvas.

## Datenmodell

**Unverändert.** Keine Migration, kein neuer Schlüssel. Namespace bleibt
`roleplay-v25`. Alle bestehenden Check-ins, Gebete, Routinen, Aktivitäten und
Streaks werden unverändert weiterverwendet.

## Geänderte Dateien

`app.js`, `style.css`, `manifest.webmanifest`, `service-worker.js`.

## Tests

- **285** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel
- Keine doppelten Funktionsdefinitionen, keine Konsolenfehler
