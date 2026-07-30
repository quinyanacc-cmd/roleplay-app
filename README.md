# ROLEPLAY App 4.0.2 – schlanke Systemkern-Integration

Diese Version verdichtet die Systemkern-Logik der App, damit die tägliche Nutzung nicht selbst zur administrativen Belastung wird. Die bestehende Designsprache, lokale Datenspeicherung, Routinen, Tagesreflexion, Gebete, Streaks sowie PDF-, CSV- und Backup-Funktionen bleiben erhalten.

Die abgeleiteten Orientierungswerte sind Hilfen zur Selbstreflexion. Sie sind keine Diagnosen und keine wissenschaftlich validierten Messinstrumente.

## Wesentliche Änderungen

- Deutlich schmalerer Kopfbereich, Datumsnavigation und untere Hauptnavigation.
- Kurze ROLEPLAY-Erklärung statt eines langen Einführungstextes.
- Vier direkt anwählbare Tages-Check-ins ohne zusätzlichen „Check-in“-Knopf.
- Reihenfolge der Check-ins: Nacht, Morgen, Mittag und Abend.
- Der Nacht-Check-in enthält Schlafqualität, Traumkategorie und eine optionale Traum-Notiz.
- Die normale Check-in-Ansicht beschränkt sich auf Energie, Körper, Gefühl, Umfeld und eine optionale konkrete Verantwortung.
- Fokus, Motivation, Rolle, Dringlichkeit, Anpassungsspielraum, Unterstützung und weitere Systemkern-Felder bleiben unter „Mehr Präzision“ freiwillig verfügbar.
- Erfasste beziehungsweise ausgewählte Elemente werden in der vorhandenen Strahlen-Designsprache markiert.
- Mahlzeiten werden nach Kategorien erfasst, darunter nichts gegessen, ausgewogen, leicht, eiweißreich, süß, fettig und stark verarbeitet. Eine konkrete Mahlzeit kann optional ergänzt werden.
- Trinkmenge und kategorisierte Mahlzeiten fließen behutsam in den Vitalitätskontext des jeweils folgenden Check-ins ein.
- Gefühle sind in einem Dropdown von sehr positiv bis stark belastet geordnet und deutlich erweitert.
- Aktivitäten dienen ausschließlich der Dokumentation. Sie werden nicht als Leistung, Verantwortungserfüllung oder Rollentreue bewertet.
- Die Rollentreue-Auswertung stützt sich auf Pflichtgebete, Routinen und Schutzentscheidungen; Aktivitäten bleiben außerhalb der Bewertung.
- Verlauf, Begründung und Detaildaten sind standardmäßig eingeklappt, damit die Tagesansicht ruhig bleibt.

## Check-in-Logik

Die App verbindet wenige sichtbare Angaben mit bereits vorhandenen Tagesdaten:

1. innerer Zustand: Energie, Körper, Gefühl sowie bei Bedarf Fokus und Motivation,
2. äußerer Kontext: Umfeld und bei Bedarf verfügbare Unterstützung,
3. Vitalitätskontext: Trinkmenge, Mahlzeitenkategorien und beim Nacht-Check-in Schlaf,
4. Verantwortungsrahmen: Tagesrolle und optional die konkret zu sichernde Verantwortung,
5. orientierender Rollenmodus: Gestaltung, regulär, reduziert, Sicherung oder Schutz und Regeneration.

Der Rollenmodus ist kein Urteil und keine automatische Entbindung von Verantwortung. Er soll eine angemessene Form der Rollenausübung nahelegen.

## Datenkompatibilität

Der lokale Datenspeicher `roleplay-v25` wird weiterverwendet. Vorhandene Tagesreviews, Routinen und ältere Einträge werden beim Laden normalisiert. Alte Aktivitätsstatus bleiben nicht Teil der neuen Bewertung; Titel und zugeordnete Rolle werden weiterhin übernommen.

Vor jeder Aktualisierung wird ein Backup empfohlen.

## Aktualisierung

1. In der bisherigen App unter „Export & Sicherung“ ein Backup speichern.
2. Den Inhalt des bisherigen Hosting-Ordners vollständig durch den Inhalt dieses Ordners ersetzen.
3. Die App vollständig schließen und erneut öffnen.
4. Wird weiterhin eine alte Fassung angezeigt, den Website-Cache leeren oder die Web-App vom Home-Bildschirm entfernen und über Safari erneut hinzufügen.
5. Ein Backup nur importieren, wenn die bisherigen Daten nicht automatisch erscheinen.

Alle Einträge werden ausschließlich lokal im Browser beziehungsweise in der installierten Web-App gespeichert. ROLEPLAY ersetzt keine medizinische, psychotherapeutische, rechtliche, religiöse oder sonstige fachliche Beurteilung.
