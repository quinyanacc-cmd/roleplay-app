# ROLEPLAY App 5.0.0

Lokale iPhone-PWA für Tagesreview, Routinen und adaptive Reflexion. Alle Daten bleiben im Browser des Geräts (`localStorage`); es gibt keine Serververbindung.

## Installation

Dateien entpacken und den Ordner ausliefern, beispielsweise über GitHub Pages. Auf dem iPhone in Safari öffnen und über **Teilen → Zum Home-Bildschirm** installieren.

## Änderungen in Version 5.0

### Gestaltung
- Appweite Schriftfamilie auf Futura mit systemnahen Fallbacks umgestellt.
- Farbliche Seitenstreifen aus Check-ins, Rollenmodus-Empfehlung, Dialogen und Aktivitäten entfernt.
- Auswahlzustände nutzen nun dezente Farbverläufe und weiche Glow-Effekte statt linker Markierungen.
- Abrundungen von Feldern, Chips und Statuskarten vereinheitlicht.
- Untere Navigation auf 54 px verschlankt; aktive Emojis leuchten ohne zusätzlichen Kreis.
- Routinenstatus-Kreise besitzen klare Hell-Dunkel-Verläufe.

### Zustand und Verantwortung
- Zusätzlicher Regler **Laune** ergänzt; das qualitative Gefühls-Dropdown bleibt erhalten.
- Laune beeinflusst die Rollenmodus-Empfehlung neben Energie, Belastung und Gefühl.
- Sieben differenzierte Rollenmodi: Entwicklungs-, Gestaltungs-, Fokus-, regulärer, reduzierter, Schon- und Stabilisierungsmodus.
- Check-in-Karten und Rollenmodus-Empfehlung verwenden die jeweilige Tageszeit- beziehungsweise Modusfarbe als ruhigen Glow.

### Gebete und Fastentage
- Pflichtgebete erhalten individuelle, harmonische Farbverläufe.
- Erfasste Gebete leuchten dezent; nicht gebetete Gebete bleiben klar rot markiert.
- Sunnah-Gebete werden bei Verrichtung türkis hervorgehoben.
- Offene Fastentage sind rot; erst bei 0 wird die Zahl grün.

### Streaks
- Karten und Bedienelemente kompakter gestaltet.
- Die Tageszahl wird farblich und mit Glow hervorgehoben.
- Schutzentscheidungen bleiben unverändert funktionsfähig.

### Verlauf
- Energie: dunkelblau.
- Belastung: rot.
- Pflichtgebete: türkis.
- Türkise Punkte auch in der separaten Gebetsübersicht.

## Datenkompatibilität

Der Speicherschlüssel bleibt `roleplay-v25`. Bestehende Tagesreviews, Routinen, Check-ins, Gebete, Aktivitäten und Streaks werden weiterverwendet. Alte Check-ins ohne Launenwert bleiben gültig; beim erneuten Öffnen wird ein neutraler Ausgangswert angeboten.
