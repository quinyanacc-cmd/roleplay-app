# Roleplay 2.9

Version 2.9 baut auf dem Datenmodell von Version 2.8 auf. Der lokale Speicher-Namespace bleibt bewusst unverändert, damit bestehende Tagesreflexionen und Routinen erhalten bleiben. Vor dem Aktualisieren ist trotzdem ein Backup empfehlenswert.

## Neuerungen

- Neue Emoji-Navigation: 📝 Tagesreflexion, 🌅 Routinen und 🔥 Streaks
- Streaks auf einer eigenen, vorgeschalteten Datenschutzseite
- Optionaler Zugriff per Face ID beziehungsweise Gerätebiometrie, sofern die App über HTTPS beziehungsweise als iPhone-Web-App läuft und WebAuthn unterstützt wird
- Morgen- und Abendroutine als kompakte Bildkarten in der Tagesreflexion
- Routine-Status als schneller Zyklus: Offen → Erledigt → Nicht erledigt
- Kompaktere Routinenansicht mit Fortschritt, Restzeit und Sortierpfeilen
- Anklickbare Weblinks innerhalb des Routine-Kontexts
- Timer auf Zeitstempelbasis: läuft beim Wechsel in den Hintergrund korrekt weiter und wird nach einem Neustart wiederhergestellt
- Bestmögliche lokale Timer-Benachrichtigung, sofern iOS beziehungsweise der Browser dies zulässt
- Vollständig überarbeitete Wochenstatistik mit Erfüllungsquote, Routinen pro Tag, Vorwochenvergleich und Liniendiagramm
- Aktive Streaks werden grün, unterbrochene Streaks rot hervorgehoben
- Verbesserter Dark Mode für Gebetsauswahl, Dialoge, Aktivitäten, Rückkehr- und Sortierbuttons
- Kleinerer Plus-Button bei Aktivitäten
- Wochenplan-PDF mit weißem Seitenhintergrund

## Installation

Den Ordner auf den bisherigen Webspace beziehungsweise das bisherige GitHub-Pages-Projekt hochladen und die vorhandenen Dateien ersetzen. Danach die Web-App auf dem iPhone einmal vollständig schließen und neu öffnen. Falls weiterhin die alte Oberfläche erscheint, Safari beziehungsweise die installierte Web-App neu laden, damit der Service-Worker-Cache `roleplay-v2-9` aktiv wird.

Alle Daten bleiben lokal im Browser gespeichert. Die Datenschutzabfrage vor der Streak-Seite verhindert versehentliches Öffnen, stellt jedoch keine Verschlüsselung der lokalen Daten dar.
