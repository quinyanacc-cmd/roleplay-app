/* ==========================================================================
   ROLEPLAY – Testlauf

       node run-tests.mjs

   Führt beide Testdateien nacheinander aus und fasst das Ergebnis zusammen.

   test-logic.js prüft die Kernlogik ohne jede Abhängigkeit.
   test-dom.js prüft Markup, Stylesheet und Verdrahtung – und startet die App
   zusätzlich in jsdom, falls das Paket installiert ist:

       npm install --no-save jsdom
   ========================================================================== */

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const suites = ["test-logic.js", "test-dom.js"];

let failed = false;

for (const suite of suites) {
  console.log(`\n${"=".repeat(70)}\n${suite}\n${"=".repeat(70)}`);
  const result = spawnSync(process.execPath, [join(here, suite)], { stdio: "inherit", cwd: here });
  if (result.status !== 0) failed = true;
}

console.log(`\n${"=".repeat(70)}`);
console.log(failed ? "MINDESTENS EINE PRÜFUNG IST FEHLGESCHLAGEN." : "ALLE PRÜFUNGEN BESTANDEN.");
process.exit(failed ? 1 : 0);
