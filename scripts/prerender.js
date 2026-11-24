// Injects the server-rendered app into build/index.html, then removes the
// temporary SSR bundle. Runs after both `vite build` steps.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ssrDir = path.join(root, "build-ssr");
const htmlPath = path.join(root, "build", "index.html");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const appHtml = render();
const html = await readFile(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("prerender: #root marker not found in build/index.html");
await writeFile(htmlPath, html.replace(marker, `<div id="root">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} KB of HTML`);
