import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const dist = resolve(import.meta.dirname, "../dist");

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const files = filesIn(dist)
  .map((path) => ({ path, name: relative(dist, path).split(sep).join("/") }))
  .filter(({ name }) => name !== "sw.js" && name !== "offline-manifest.json")
  .sort((a, b) => a.name.localeCompare(b.name));
const hash = createHash("sha256");
for (const { path, name } of files) {
  hash.update(name);
  hash.update(readFileSync(path));
}
const manifest = {
  version: hash.digest("hex").slice(0, 16),
  files: files.map(({ name }) => name),
};
writeFileSync(join(dist, "offline-manifest.json"), `${JSON.stringify(manifest)}\n`);
