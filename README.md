# ROLEPLAY App 5.8.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung.

## Zustand & Rollenmodus: die Tagesbahn

Die kreisförmige Darstellung ist einem horizontalen Tagesverlauf gewichen:

    Nacht  →  Morgen  →  Mittag  →  Abend

Vier Stationen auf einer durchgehenden Linie, jede mit Symbol, Namen sowie
Energie und Laune darunter.

### Drei Zustände, sofort erkennbar

**Erledigt** – farbiger Knoten mit kräftigem Verlauf und einem kleinen Häkchen
oben rechts. Darunter stehen die gespeicherten Werte.

**Jetzt dran** – der nächste offene Check-in wird um 22 % vergrößert, erhält
einen weichen Schein und darüber die Aufforderung „Morgen eintragen“ mit einem
Pfeil auf den Knoten. Der Name darunter ist farbig gefüllt.

**Später** – ruhiger Knoten, graues Symbol, reduzierte Deckkraft, „– %“ als
Platzhalter.

Nach dem Speichern wandert die Hervorhebung weiter zur nächsten offenen
Station. Die Übergänge laufen über CSS-Transitions von 320 ms.

### Verbindungslinie

Die Linie nimmt die Farben der bereits erreichten Stationen auf und wird
dahinter neutral. Die Farbstopps sitzen genau unter den Knoten, sodass der
Übergang weich verläuft.

### Farbwelten

- Nacht: Blau nach Indigo-Violett
- Morgen: Violett über Koralle nach warmem Orange
- Mittag: Gold nach Türkis
- Abend: Rosé nach Violett

### Trennung von Eingabe und Ergebnis

Die Tagesbahn oben ist die **Eingabe** und der zeitliche Verlauf. Die Karte
darunter ist das **Ergebnis** – Tagesrolle, Rollenmodus, Priorität und
begrenzende Bedingung. Der Rollenmodus steht deshalb nicht mehr mitten im
Verlauf.

## Datenmodell

**Unverändert.** Es wurde ausschließlich die Darstellungsschicht getauscht:
`renderCheckinSlots` und das zugehörige CSS. Speicherung, Modusberechnung,
Check-in-Dialog, Wochenrückblick, Routinen und Navigation blieben unberührt.
Namespace bleibt `roleplay-v25`.

## Tests

- **339** Funktionstests über 390×844, 393×852 und 430×932 in Light und Dark
- Darunter neu: Reihenfolge der Stationen, horizontale Anordnung, genau eine
  aktive Station, Häkchen an erledigten, Platzhalter an offenen, keine
  Überlappung benachbarter Knoten, Aufforderung bleibt in der Karte,
  Stationsnamen und Werte ohne Umbruch
- **15** Tests mit Altdatensätzen aus 3.x und 5.x
- **0** Layoutmängel, keine doppelten Funktionen, keine Konsolenfehler
