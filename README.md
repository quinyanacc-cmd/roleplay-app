# ROLEPLAY App 5.3.0

Lokale iPhone-PWA für Tagesreflexion, Routinen und adaptive Rollenmodi.
Alle Daten bleiben im Browser des Geräts (`localStorage`), es gibt keine
Serververbindung.

## Die zentrale Logik

    ENERGIE + LAUNE  →  Zustand  →  Rollenmodus  →  Tagesrolle  →  Handlung

Nicht maximale Leistung entscheidet über einen guten Tag, sondern
verantwortliches Handeln unter den realen Bedingungen.

## Neu in 5.3.0

### Zustandscheck vereinfacht

Der Check-in fragt nur noch Energie und Laune ab. Entfernt wurden Belastung,
Gefühl, Kontext-Freitext und die manuelle Rollenmodus-Auswahl. Alle vier
Check-ins – auch die Nacht – erfassen jetzt Energie und Laune; die Nacht
zusätzlich Schlafqualität und Traum.

### Automatischer Rollenmodus

Der Modus entsteht ausschließlich aus Energie und Laune. Laune wiegt bewusst
etwas schwerer (0,58 gegenüber 0,42), ein sehr niedriger Einzelwert wird aber
nicht wegkompensiert:

    Energie 12 %, Laune 100 %   →  Stabilisierungsmodus
    Energie 100 %, Laune 12 %   →  Stabilisierungsmodus
    Energie 30 %, Laune 60 %    →  Reduzierter Modus
    Energie 30 %, Laune 85 %    →  Regulärer Modus  (Ausnahme greift)
    Energie 50 %, Laune 80 %    →  Regulärer Modus
    Energie 80 %, Laune 50 %    →  Regulärer Modus

### Tageskreis

Die vier rechteckigen Karten sind einem gefüllten Kreis mit vier Segmenten
gewichen. Jedes Segment ist eine echte Schaltfläche und öffnet den jeweiligen
Check-in. Ohne Eintrag bleibt das Segment neutral, danach trägt es die
Modusfarbe.

### Feste Tagesrollen

Montag Ich · Dienstag Vitalist · Mittwoch Absolvent · Donnerstag Unternehmer ·
Freitag Muslim · Samstag Wirt · Sonntag Familienmensch.

Die Empfehlung nennt Rolle und Modus zusammen, dazu die konkrete Priorität:

    Vitalist · Fokusmodus
    Priorität heute: Gym · ca. 2 Stunden.

In den beiden Schutzstufen lautet sie schlicht "Heute nur die Gebete." – ohne
Zusatzaufgabe und ohne schuldinduzierende Sprache.

### Wochenrückblick

Immer eine vollständige Kalenderwoche von Montag bis Sonntag, kein gleitendes
Fenster mehr. Der Graph zeigt Energie, Laune und Pflichtgebete; Belastung ist
entfallen. Blättern per Wischgeste oder über die Pfeile, eine Bewegung
entspricht genau einer Woche. Zukünftige Wochen sind nicht erreichbar.

Unter der Gebetsübersicht steht eine zweite Wochenmatrix mit exakt zwei roten
Punkten je Tag: erster Punkt Morgenroutine, zweiter Punkt Abendroutine.

Bei fünf von fünf Pflichtgebeten erscheint ein kleiner Stern. Bei weniger
erscheint nichts – kein Minuswert, kein Warnsymbol.

### Routinen

Zwei Fehler behoben:

- Das Umsortieren während eines laufenden Durchlaufs veränderte bisher das
  dauerhaft gespeicherte Routine-Template (`saveRoutines()` wurde aufgerufen).
  Die Session arbeitet jetzt auf einer eigenen Kopie. Dauerhafte Änderungen
  laufen ausschließlich über "Routine bearbeiten".
- `completeSessionItem` las weiterhin das Template statt der Session. Nach
  einem Umsortieren wäre die alte Reihenfolge abgearbeitet worden.

Neu: verbleibende Dauer und voraussichtliche Endzeit, bei jedem Rendern neu
berechnet – also auch nach Erledigen, Überspringen und Umsortieren.

Die Karten auf der Hauptseite sind kompakter. Der Lesbarkeitsverlauf lag wegen
`z-index: -1` hinter dem Hintergrundbild und wirkte deshalb nicht – weiße
Schrift stand ungeschützt auf dem hellen Morgenbild. Gemessener Textkontrast
jetzt 6,13:1 (Morgen) und 10,78:1 (Abend) in beiden Modi.

### Sunnah-Gebete

Antippen wechselt unmittelbar zum nächsten Status, ohne Dialog. Die
vorhandenen Statuswerte und gespeicherten Daten bleiben unverändert:
Offen → Verrichtet → Heute nicht vorgesehen → Offen.

### Aufgeräumt

Dankbarkeit ohne Leitfragen (zwei Freitextfelder plus Namen Allahs),
Verantwortungsreflexion aus der Oberfläche entfernt, beide Erklärungstexte
gestrichen, Hauptüberschriften responsiv verkleinert.

## Zentrale Konfiguration

Alle Grenzwerte, Gewichtungen und Rollentexte stehen am Anfang von `app.js` an
genau einer Stelle:

    STATE_WEIGHTS      Gewichtung von Laune und Energie
    MODE_THRESHOLDS    Untergrenze je Modus
    MODE_RULES         Schutzregeln und die Laune-Ausnahme
    MODE_LADDER        Reihenfolge der sieben Modi
    MODE_LEVEL_MAP     Modus → Handlungsebene
    DAY_ROLE_MAP       Wochentag → Rolle
    ROLE_CONFIG        Aufgaben je Rolle und Ebene

Grenzwerte lassen sich dort nach einigen Wochen echter Nutzung anpassen, ohne
die Oberfläche anzufassen. Der Absolvent trägt einen eigenen Hinweis für den
späteren Studienbeginn.

## Datenkompatibilität

Der Speicherschlüssel bleibt `roleplay-v25`. Alte Felder (`load`, `emotion`,
`note`, `selectedFrameworkKey`, `frameworkOverrideReason`) bleiben in
bestehenden Datensätzen vollständig erhalten und werden lediglich nicht mehr
gelesen. Geprüft mit Altdatensätzen aus 3.x und 5.x: alte Rollennamen,
Check-ins ohne Launenwert, der entfernte Status "angepasst erfüllt" und alte
Modus-Schlüssel werden migriert, ohne Fehler auszulösen.

Neu hinzugekommen ist `roleplay-v25-weekly-tasks` für wöchentliche
Mindestverantwortungen wie "Post & E-Mails". Additiv – bestehende Daten bleiben
unberührt.

## Aktualisierung

1. In der bisherigen App ein Backup speichern.
2. Den Inhalt dieses Ordners auf dem bisherigen Hosting vollständig ersetzen.
3. Die App vollständig schließen und erneut öffnen.
4. Das Backup nur importieren, falls die bisherigen Einträge nicht automatisch
   erscheinen.
