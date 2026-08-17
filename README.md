# ROLEPLAY App 8.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), keine Serververbindung,
kein Framework, keine externen Bibliotheken.

Systemlogik unverändert:

    Zustand erfassen → Rollenmodus bestimmen → Verantwortung realistisch
    gestalten → handlungsfähig bleiben → den Tag reflektieren

## Was 8.0 ist

Ein vollständiger gestalterischer Relaunch auf Basis des neuen Logos, dazu
vier kleine, tief integrierte Funktionen. Fachliche Logik, Berechnungen,
Speicherformate, Rollen, Texte und Navigationswege sind unverändert.

### Designsystem

* **Typografie.** Nativer System-Font-Stack (`-apple-system` → SF Pro auf
  Apple-Geräten) statt Futura. Rückholbar über den einen Token `--font`.
* **Raster.** Striktes 4/8-Punkt-System (`--sp-1…7`), fünf Radienstufen
  (`--r-xs/sm/md/lg/xl` plus `--r-pill`), vier Höhenstufen (`--e-0…3`),
  Mindesttrefferfläche `--touch-min: 44px`.
* **Marke.** Violett, Blau, Cyan, Pink und Orange stammen aus dem neuen Logo
  und bilden `--brand-gradient`. Der Verlauf markiert ausschließlich besondere
  Momente: Rollenkapsel, Herzstück-Karte, aktive Navigation, Speichern,
  ausgewählter Kalendertag. Alle übrigen Flächen bleiben ruhig.
* **Material.** Glas ausschließlich für schwebende Ebenen (Kopfzeile,
  Navigation, Sheets, schwebende Aktionen), mit `@supports`-Fallback auf
  deckende Flächen.
* **Semantik unangetastet.** Rollenfarben, Modusfarben, Phasenfarben und
  Diagrammfarben behalten exakt ihre bisherigen Werte.

### Icon-System

Ein einziges SVG-Inventar in `ICON_PATHS` (app.js): 24er-ViewBox,
Strichstärke 1.7, runde Enden, `currentColor`, gleiche optische Größe.
`hydrateIcons()` füllt alle `data-icon`-Platzhalter im Markup. Ersetzt wurden
sämtliche Emoji und Schriftglyphen der Bedienoberfläche (‹ › × ✓ ▶ Ⅱ ↻ ↑ ↓ 💧
🕌 🕓 ↩️ 🔥) sowie die Chevrons in Auswahlfeldern und Accordions (als Maske,
damit sie die Textfarbe übernehmen). Emoji bleiben nur dort, wo sie Inhalt
sind: in den Routineschritten.

Die fünf Tagesphasen-Symbole wurden in derselben Strichsprache neu gezeichnet
und tragen jetzt `currentColor` statt fester Füllungen.

### Rollen-Control

Das frühere Auswahlfeld zeigte die Rolle über ein Emoji, das auf vielen
Systemen als leeres Kästchen erschien. Neu ist eine **Rollenkapsel** mit
Emblem, Label, Rollennamen und Wechselindikator, mindestens 44 px hoch, mit
Rollenfarbe, Auswahl- und Druckzustand. Ein Tippen öffnet ein Rollen-Sheet mit
sieben Rollenkarten.

Das native `select#dayRole` bleibt als einzige Datenquelle erhalten (visuell
verborgen); die Kapsel schreibt ausschließlich über dessen `change`-Ereignis.
Gespeicherte Rollennamen ändern sich nicht.

### Tagesbahn ohne Prozentwerte

In der gespeicherten Tageszeit-Übersicht erscheinen keine Zahlen und keine
Prozentzeichen mehr. Stattdessen:

* erfasst → farbiger Knoten, Häkchen und zwei feine Intensitätsbalken
  (oben Energie, unten Laune – dieselbe Farbzuordnung wie im Readout),
* jetzt dran → größerer, leuchtender Knoten und Wortmarke „Jetzt“,
* offen → ruhiger Knoten und Wortmarke „Offen“,
* nicht Teil des Tages → stark zurückgenommen, ausdrücklich kein Versäumnis.

Alle Stationen haben eine gleich hohe Fußzeile, damit beim Speichern nichts
springt. Die Werte selbst bleiben unverändert gespeichert, fließen weiterhin
vollständig in die Modusberechnung ein, stehen im `aria-label` („Energie 60 von
100“) und sichtbar unter **Verlauf & Details**.

### Neue Funktionen

| Funktion | Nutzen |
| --- | --- |
| **Rollen-Sheet** | Macht die Rolle des Tages sichtbar und wechselbar, ohne das systemeigene Auswahlrad – der Kern des ROLEPLAY-Systems wird als solcher erkennbar. |
| **Heute-Rückkehr** | Schwebende Schaltfläche, die nur erscheint, wenn ein anderer Tag geöffnet ist – ein Tippen statt mehrfachem Blättern. |
| **Rückgängig-Schritt** | Nach dem Löschen oder Zurücksetzen eines Check-ins und nach dem Löschen einer Aktivität sechs Sekunden lang wiederherstellbar – Bedienfehler kosten keine Daten mehr. |
| **Modus-Erklärung** | Ein „i“ neben der Überschrift erklärt Stufen, Gewichtung und Schutzregeln – alle Angaben werden aus den vorhandenen Konstanten erzeugt, die Berechnung bleibt unberührt. |
| **Fortschrittszeile** | „2 von 5 erfasst · Als Nächstes Mittag“ – nutzt vorhandene Daten und beantwortet die häufigste Frage sofort. |
| **Leerzustand mit Handlung** | Statt „Noch kein Check-in“ ein Satz plus Schaltfläche direkt in die fällige Phase. |
| **Haptik** | Kurze Rückmeldung bei Rollenwechsel, Check-in, Speichern und Löschen, sofern das Gerät sie unterstützt und keine Bewegungsreduktion aktiv ist. |

Keine dieser Funktionen erzeugt einen neuen Pflichtschritt, verändert die
Modusberechnung, überschreibt Daten oder setzt ein Konto voraus.

### Logo

Das neue Logo ersetzt `logo.jpeg` vollständig. Abgeleitet werden
`logo-32/96/180/192/512.png` sowie `logo-maskable-192/512.png`. Für die
Maskable-Variante wurde der Verlauf per normalisierter Faltung rekonstruiert
und die weiße Marke auf 76 Prozent gesetzt – dadurch entsteht eine echte Safe
Area, ohne Motiv oder Farben zu verändern. In der App erscheint das Logo genau
einmal: als Markenzeichen in der Kopfzeile.

## Datenmodell

Unverändert. Namespace `roleplay-v25`, Backup-Schema 6, `checkinStructure`,
`roleplayBalance`, Streaks, Routinen, Gebete, CSV-Export – alles wie in 6.0.

## Tests

    node test-v8.js

63 Prüfungen: Versionierung, Logo-Referenzen, Speicherschlüssel, Modusleiter,
Gewichtung, Schutzregeln samt Anhebungsregel, Vollständigkeit aller von app.js
adressierten IDs, Icon-Inventar, Rollen-Embleme, Rendern von Tagesbahn,
Readout, Leerzustand, Rollen-Sheet und Modus-Erklärung sowie der ausdrückliche
Nachweis, dass die Tagesbahn keine sichtbaren Zahlen oder Prozentzeichen mehr
enthält und die gespeicherten Werte unverändert bleiben.

Die Prüfungen laufen ohne Netzwerk und ohne Abhängigkeiten in einem Mini-DOM.
