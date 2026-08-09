# ROLEPLAY App 5.8.1

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Zustand & Rollenmodus: die Tagesbahn

    Nacht  →  Morgen  →  Mittag  →  Abend

Vier Stationen auf einer durchgehenden Linie, jede mit Symbol, Namen sowie
Energie und Laune darunter.

**Erledigt** – farbiger Knoten mit kräftigem Verlauf und Häkchen, darunter die
gespeicherten Werte.
**Jetzt dran** – der nächste offene Check-in ist um 22 % vergrößert, hat einen
weichen Schein und einen farbig gefüllten Namen.
**Später** – ruhiger Knoten, graues Symbol, „– %“ als Platzhalter.

Die Verbindungslinie nimmt die Farben der bereits erreichten Stationen auf und
wird dahinter neutral.

## Änderungen in 5.8.1

**Alles größer und breiter.** Knoten von 50 auf 58 px, Symbole von 26 auf
31 px, Stationsnamen eine Stufe größer. Die Bahn zieht sich jetzt leicht in den
Kartenrand hinein und gewinnt dadurch Breite.

**Prozentwerte deutlich lesbarer.** Von 11 auf 13,5 px erhöht und gegen
Umbruch gesichert. Nachgemessen bei 375, 390, 393 und 430 px Breite mit dem
Extremfall „100 %“ auf allen vier Stationen: kein Umbruch, keine Überlappung.
Dieser Fall läuft jetzt dauerhaft im Test mit.

**Die Aufforderung „Morgen eintragen“ ist entfallen.** Der aktive Knoten ist
durch Größe, Schein und farbigen Namen ohnehin eindeutig; der zusätzliche
Hinweis kostete nur Platz.

**Mondsichel neu gezeichnet.** Sie besteht jetzt aus zwei Bögen mit exakt
berechneten Spitzen. Über zwei Kreise mit `fill-rule` ging es nicht: dort wird
auch der überstehende Teil des zweiten Kreises gefüllt, wodurch die Sichel sich
zum Ring schloss. Ein senkrechter Versatz zwischen den Kreisen hätte unten
ebenfalls einen Rand stehen lassen – die Neigung übernimmt deshalb eine
Drehung.

**Sonnenuntergang neu gezeichnet.** Statt zweier Pfeile ist die Sonnenscheibe
jetzt zum Teil hinter dem Horizont verschwunden, darunter liegt ihre
Spiegelung. Das unterscheidet sich klar vom Morgen und wirkt ruhiger.

## Datenmodell

**Unverändert.** Es wurde ausschließlich die Darstellungsschicht geändert:
`renderCheckinSlots` und das zugehörige CSS. Namespace bleibt `roleplay-v25`.

## Tests

- **348** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark
- Darunter dauerhaft: dreistellige Werte ohne Umbruch, keine Überlappung
  benachbarter Knoten, Mindestschriftgröße der Prozentwerte, Stationsnamen
  vollständig, Bahn bleibt in der Karte
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel, keine doppelten Funktionen, keine Konsolenfehler
