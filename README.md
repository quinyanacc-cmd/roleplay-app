# ROLEPLAY App 4.1.0

Lokale iPhone-PWA für Tagesreview, Routinen und Reflexion. Alle Daten bleiben
im Browser des Geräts (localStorage), es gibt keine Serververbindung.

## Installation

Dateien entpacken und den Ordner ausliefern (z. B. GitHub Pages). Auf dem
iPhone in Safari öffnen und über "Teilen -> Zum Home-Bildschirm" installieren.

## Was sich gegenüber 4.0.4 geändert hat

**Gestaltung**
- style.css komplett neu aufgebaut: rund 1.650 statt 5.924 Zeilen, ein
  einziger Token-Satz für Abstände, Rundungen, Schriftgrößen, Feldhöhen und
  Farben. Die alten, sich gegenseitig überschreibenden !important-Schichten
  sind entfernt.
- Typografie auf die Systemschrift (SF Pro) umgestellt.
- Auswahlzustände appweit einheitlich: dezente Hinterlegung, klarer Rand,
  sichtbares Icon. Keine Strahlen- oder Sonnenformen, kein Dauerleuchten.
  Nur die untere Navigation behält ihren dezenten Schein.

**Kopfbereich**
- Flacher: schmalere Pfeile, niedrigeres Datumsfeld.
- Beim Scrollen klappen "ROLEPLAY", "Tagesreflexion" und der Rollenwähler
  ein; sticky bleibt nur die kompakte Datumsleiste. Zwei getrennte
  Schwellwerte (72 px / 28 px) verhindern Springen an der Grenze.
- Der Rollenwähler nutzt in Light und Dark dieselbe transluzente Gestaltung
  und fügt sich in die rollenfarbige Kopfzeile ein.

**Zustand und Verantwortung**
- Nur noch eine Überschrift, kein "Adaptiver Rahmen".
- Check-ins heißen Nacht, Morgens, Mittags, Abends.
- Vier Rollenmodi statt fünf: Entwicklungs-, Regulärer, Reduzierter und
  Stabilisierungsmodus. Keine Punktzahl, stattdessen ein konkreter Satz, der
  die tatsächlich erfassten Werte benennt.
- Anzeigefehler behoben: die Vorschau zeigte bisher das Icon des gewählten,
  aber das Label des empfohlenen Modus.

**Vitalität**
- Mahlzeiten als vier gleich hohe, vollbreite Felder untereinander.
- Acht Kategorien, keine Uhrzeit, keine moralische Bewertung.
- Trinkmenge: Plus/Minus als vollwertige 48-px-Touchflächen, Tropfen laufen
  nicht mehr über den Rand.

**Routinen**
- Vier Zustände: Offen, Erledigt, Nicht erledigt, Gewissenhaft.
- "Gewissenhaft" nutzt denselben Haken wie "Erledigt", mit eigener türkiser
  Akzentfarbe zur Unterscheidung, und denselben Kartenaufbau in beiden Modi.

**Gebete**
- Keine Zwischenüberschriften mehr, die Auswahl ist direkt sichtbar.
- Alle fünf Pflichtgebete nutzen exakt dieselbe Karte: gleiche Höhe, gleiche
  Innenabstände, gleiche Haken- und Statuslogik, zentriert.
- Sunnah- und freiwillige Gebete bleiben eingeklappt erhalten.

**Aktivitäten**
- Die Sortierpfeile sind wieder sichtbar. Die Logik war vorhanden, wurde aber
  vom alten CSS verdeckt. Die Reihenfolge wird sofort gespeichert.

**7-Tage-Verlauf**
- Neue Überschrift "7-Tage-Verlauf: Energie, Belastung und Gebete".
- Drei Linien auf gemeinsamer 0-100-%-Skala. Gebete werden in 20-%-Schritten
  normalisiert (0/5 = 0 %, 5/5 = 100 %).
- Echte Catmull-Rom-Glättung statt der starren Treppenkurve.
- Die grafische Gebetsübersicht mit fünf Punkten und Tageswert bleibt darunter.

**Export**
- "Wochenplan als PDF" vollständig entfernt, inklusive 312 Zeilen
  PDF-Generator, toter Event-Handler und CSS-Regeln.
- Backup sichern, Backup importieren und Excel-/CSV-Export bleiben erhalten.

**Aufräumen**
- 21 tote Funktionen entfernt. hydrationContextScore war doppelt definiert.
- renderSleepQualityChoices zielte auf ein nicht mehr existierendes Element.

## Datenkompatibilität

Der Speicherschlüssel bleibt roleplay-v25. Es werden keine neuen
Speicherbereiche angelegt. Automatisch migriert wird beim Laden:

| Alt | Neu |
| --- | --- |
| Routinenstatus adapted ("angepasst erfüllt") | responsiblySkipped ("Gewissenhaft") |
| Rollenmodus recovery, protection | stabilization (Stabilisierungsmodus) |
| Schlafdaten außerhalb der Check-ins | Nacht-Check-in, nur wenn noch keiner existiert |
| Mahlzeitenkategorien mixed, irregular, other | bleiben lesbar und exportierbar |

Datensätze ohne die neuen Felder verursachen keine Fehler.
