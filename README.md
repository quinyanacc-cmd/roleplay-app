# ROLEPLAY App 5.4.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Schwerpunkt dieser Version: der State Cycle

Die Darstellung von Zustand und Rollenmodus ist zum visuellen Herzstück
ausgebaut worden.

**Konzept:** kein Fortschrittsring, sondern ein vollständiger Tageszyklus. Die
vier Tagesphasen laufen im Uhrzeigersinn – Nacht oben links, Morgen oben
rechts, Mittag unten rechts, Abend unten links – und ihre Farbwelten gehen
ineinander über. Das Ende jeder Phase liegt nahe am Anfang der nächsten, der
Abend läuft zurück in die Nacht. Dadurch liest sich der Ring als ein
zusammenhängender Zyklus statt als vier eingefärbte Buttons.

**Ohne Emojis.** Jede Phase trägt eine eigene abstrakte Marke: eine
Horizontlinie mit einem Lichtkörper, dessen Höhe über dem Horizont die
Tageszeit erzählt – darunter Nacht, aufsteigend Morgen, hochstehend Mittag,
absinkend Abend. Ein System statt vier Bildzeichen.

**Zustandsaufnahme statt Erledigt.** Eine Phase ohne Aufnahme bleibt gedämpft
(16 % Deckkraft). Nach dem Check-in wird sie voll beleuchtet, erhält eine feine
Lichtkante und ihre Marke tritt hervor. Beleuchtet bedeutet ausdrücklich nicht
"erledigt", sondern: für diese Phase liegt eine Zustandsaufnahme vor.

**Zeitzeiger.** Am heutigen Tag markiert ein feiner Punkt am Außenrand die
aktuelle Uhrzeit auf der Tagesbahn (03:00 liegt in der Mitte der Nacht).

**Kern statt Zähler.** In der Mitte steht die Aussage des Systems: Tagesrolle,
Rollenmodus und die beiden Messwerte als feine Messlatten. Sämtliche
Check-in-Zähler ("0/4", "4/4") sind entfernt.

Umgesetzt in SVG plus CSS-Übergängen. Keine Dauer-Animation, kein Canvas –
bewusst leichtgewichtig für das iPhone.

## Weitere Änderungen

### Fachliche Korrektur

Der Bereich heißt jetzt **Zustand & Rollenmodus** statt "Zustand und
Verantwortung". Verantwortung ist kein zweiter Messwert: der Rollenmodus *ist*
die verantwortungsvolle Anpassung einer Rolle an die realen Bedingungen.

Die Ergebniskarte darunter wurde neutralisiert. Sie trug zuvor eine flächige
Einfärbung in der Modusfarbe – ein Schonmodus sah dadurch aus wie eine
Warnung. Jetzt markiert nur eine schmale Farbkante links und das Symbol den
Modus.

### Check-in

"Kontext ergänzen" war inhaltsleer und ist vollständig entfernt. Der Dialog
nimmt jetzt die Lichtstimmung der geöffneten Tagesphase auf und trägt deren
abstrakte Marke statt eines Emojis.

Der Leerzustand zeigt nur noch "Noch kein Check-in" – ohne den Rollennamen
dahinter.

### Wochenübersicht

- Laune im Verlauf ist **orange** (`#E8913A`) statt violett – in Legende,
  Linie und Datenpunkten.
- Zahlen unter den Gebetspunkten ("5/5", "3/5") sind entfernt. Bei allen fünf
  Pflichtgebeten erscheint ein Stern, sonst nichts.
- Bei den Routinen dieselbe Logik: Stern, wenn **beide** Routinen
  verantwortungsvoll abgeschlossen sind.

**Verantwortungsvoll abgeschlossen** heißt: tatsächlich durchgeführt *oder*
aufgrund des Zustands bewusst und gewissenhaft nicht durchgeführt. Beides zählt
gleich. Nur offen gelassene oder unreflektiert versäumte Routinen zählen nicht.
Die Wochenübersicht unterscheidet die beiden positiven Fälle nicht – die
genauere Information bleibt im Routine-Check-in gespeichert.

Der Stern ist ein eigenes SVG mit feinem Glow, kein Emoji: türkis bei den
Gebeten, rot bei den Routinen.

### Feinjustierung

- Kopfzeile: Schriftgröße leicht reduziert, `line-height` auf 1.30 und
  Innenabstand ergänzt. Die Unterlänge des "g" in "Tagesreflexion" endet jetzt
  gemessen 3–4 px über der Boxunterkante statt angeschnitten zu werden. Die
  Kopfzeile ist dadurch nicht höher geworden.
- Aktivitätskarten: mehr horizontaler Abstand zwischen Rollenbalken und Text,
  ohne die Karten zu vergrößern.

## Geänderte Dateien

`app.js`, `style.css`, `index.html`, `manifest.webmanifest`,
`service-worker.js`.

## Datenmodell

**Unverändert.** Keine Migration, kein neuer Schlüssel, keine geänderte
Struktur. Der Namespace bleibt `roleplay-v25`. Alte Felder (`load`, `emotion`,
`note`, `selectedFrameworkKey`) bleiben in bestehenden Datensätzen erhalten und
werden weiterhin nicht gelesen.

## Tests

- **279** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel (abgeschnittener Text, Touchflächen, Überlappungen,
  horizontaler Überlauf)
- Kopfzeilen-Unterlängen an drei Breiten vermessen
- Alle vier Check-ins, Rollenmodus-Grenzfälle, Zyklus-Anordnung, Gebete 1/5
  bis 5/5, Sunnah, Routine-Session mit Template-Schutz, Wochenlogik,
  Persistenz nach Neuladen
