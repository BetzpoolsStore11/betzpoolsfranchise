import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(process.env.USERPROFILE ?? "", "Documents", "franchise.txt");
const out = path.join(root, "app", "franchise", "wp-franchise.css");

const t = fs.readFileSync(src, "utf8");
const blocks = [];
let i = 0;
const close = "</style>";
while (i < t.length) {
  const start = t.indexOf("<style>", i);
  if (start === -1) break;
  const contentStart = start + "<style>".length;
  const end = t.indexOf(close, contentStart);
  if (end === -1) break;
  blocks.push(t.slice(contentStart, end).trim());
  i = end + close.length;
}

let css = [
  "/* Extracted from franchise.txt (WordPress) — do not edit by hand; re-run scripts/extract-wp-franchise-css.mjs */",
  ...blocks,
].join("\n\n");

// Avoid duplicate Google Fonts fetch; layout uses next/font for Montserrat + Playfair.
css = css.replace(
  /@import\s+url\(['"]https:\/\/fonts\.googleapis\.com\/css2\?[^'"]+['"]\);\s*/g,
  "/* @import fonts removed — loaded via next/font in app/layout.tsx */\n",
);

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, css, "utf8");
console.log("Wrote", out, "| blocks:", blocks.length, "| chars:", css.length);
