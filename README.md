# ROLEPLAY App 4.0.1 – Systemkern-Integration

Diese Fassung überführt den universellen ROLEPLAY-Systemkern erstmals systematisch in die bestehende Tagesreview-App. Die bisherige Designsprache, lokale Speicherung, Routinen, Tagesreflexion, Streaks sowie PDF-, CSV- und Backup-Funktionen bleiben erhalten.

Die Version ist ein praktischer Prototyp. Die abgeleiteten Orientierungswerte sind weder Diagnosen noch wissenschaftlich validierte Messinstrumente.

## Zentrale Systemlogik in der App

Die App trennt nun konsequent:

1. innere Verfassung: körperlicher, emotionaler, kognitiver und motivationaler Zustand,
2. äußeren Kontext: Umfeld und verfügbare Unterstützung,
3. Verantwortungsrahmen: Rolle, Verantwortungsquelle, Dringlichkeit, Tragweite, Anpassungsspielraum und mögliche Konflikte,
4. Handlungsspielraum und Rollenmodus,
5. tatsächliche Handlungsausprägung,
6. Wirkung, Restverantwortung, Korrektur und Lernen.

Damit wird nicht mehr nur gefragt, was abstrakt getan werden sollte, sondern welche zulässige und verantwortbare Form unter den tatsächlichen Bedingungen möglich ist.

## Neu und überarbeitet

- Vier feste Zustands- und Verantwortungs-Check-ins: Morgen, Mittag, Abend und Nacht.
- Der Nacht-Check-in ist ausdrücklich auf Wirkung, Restverantwortung und Lernen ausgerichtet.
- Innerer Zustand und äußerer Kontext sind begrifflich getrennt.
- Der Verantwortungsrahmen wird nicht mehr aus dem Zustand abgeleitet, sondern eigenständig erfasst.
- Erfassung von primärer Rolle, Verantwortungsquelle, Dringlichkeit, Tragweite, Anpassungsspielraum und Verantwortungskonflikt.
- Orientierende Ableitung eines Rollenmodus: Gestaltungs-, regulärer, reduzierter, Sicherungs- oder Schutz- und Regenerationsmodus.
- Hinweise zu Mindesthandlung, Hilfe, Delegation, Grenzsetzung, Konfliktabwägung und Restverantwortung.
- Persönliche Rolle „Ich-Person“ gemäß Anwendungsglossar; ältere Einträge mit „Yannick“ oder „Ich“ werden automatisch übernommen.
- Routinen und Aktivitäten besitzen die Status:
  - offen,
  - erledigt,
  - angepasst erfüllt,
  - verantwortungsvoll nicht erledigt,
  - versäumt.
- Eine verantwortliche Anpassung oder ein verantwortliches Nichtausführen wird in der Rollentreue vollwertig behandelt. Die App weist zugleich darauf hin, dass dies eine echte Verantwortungsprüfung und Absicherung voraussetzt.
- Pflichtgebete werden differenziert dokumentiert; freiwillige und Sunnah-Gebete sind zusätzlich erfassbar und erzeugen bei Auslassung keine negative Wertung.
- Streaks unterscheiden geschützte Tage, aktiv widerstandene Herausforderungen und Unterbrechungen.
- Das aktive Widerstehen einer realen Begierde wird als besonderer Schutz- und Verantwortungserfolg hervorgehoben.
- Die Wochenkurve „Rollentreue“ berücksichtigt Pflichtgebete, Routinen, Aktivitäten und Schutzentscheidungen.
- Die separate „Prüfschleife“ bewertet die eigene Reflexion zu Sachlage, Zustand, Verantwortung, Rolle, Angemessenheit, Wirkung und Lernen.
- Neue Wochenwerte für vier Check-ins, Nacht-Check-ins, Handlungsspielraum, verantwortliche Anpassungen, Schutzentscheidungen und freiwillige Gebete.
- CSV, Backup und Wochenplan-PDF enthalten die neuen Systemkern-Daten.

## Bewertungslogik

Die Rollentreue ist kein Urteil über den Wert der Person. Sie fasst ausschließlich dokumentierte Handlungen zusammen. Offene Einträge werden nicht automatisch als Misserfolg gewertet.

Bei Routinen und Aktivitäten zählen „erledigt“, „angepasst erfüllt“ und „verantwortungsvoll nicht erledigt“ vollwertig. Pflichtgebete werden entsprechend ihrer dokumentierten Ausprägung differenziert einbezogen. Sunnah- und freiwillige Gebete werden nur positiv dokumentiert.

Die Verantwortungsreflexion bleibt davon getrennt. Dadurch kann ein formal produktiver Tag einen erkannten Korrekturbedarf zeigen, während ein reduzierter Tag bei verantwortlicher Anpassung stimmig sein kann.

## Datenkompatibilität

Der bestehende lokale Datenspeicher `roleplay-v25` wird weiterverwendet. Vorhandene Tagesreviews und Routinen bleiben grundsätzlich erhalten. Ältere Begriffe und Status werden beim Laden in die neue Struktur überführt.

Vor jeder Aktualisierung wird dennoch ein aktuelles Backup empfohlen.

## Aktualisierung

1. In der bisherigen App unter „Export & Sicherung“ ein Backup speichern.
2. Den Inhalt des bisherigen Hosting-Ordners vollständig durch den Inhalt dieses Ordners ersetzen.
3. Die App vollständig schließen und erneut öffnen.
4. Erscheint weiterhin die ältere Fassung, die Web-App vom Home-Bildschirm entfernen und über Safari erneut hinzufügen oder den Website-Cache leeren.
5. Ein Backup nur importieren, wenn die bisherigen Daten nicht automatisch erscheinen.

Alle Einträge werden ausschließlich lokal im Browser beziehungsweise in der installierten Web-App gespeichert. ROLEPLAY ersetzt keine medizinische, psychotherapeutische, rechtliche, religiöse oder sonstige fachliche Beurteilung.
