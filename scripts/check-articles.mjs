import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { parseArticle } from "../src/content/parseArticle.ts";

const root = resolve(import.meta.dirname, "..");
const directory = resolve(root, "src/content/pages");
const pages = readFileSync(resolve(root, "src/pages.ts"), "utf8");
const routes = [...pages.matchAll(/\bpath:\s*"([^"]+)"/g)].map(
  (match) => match[1],
);
const names = readdirSync(directory).filter((name) => name.endsWith(".md"));
const expected = routes
  .map((route) => `${route === "/" ? "home" : route.slice(1)}.md`)
  .sort();
assert.deepEqual(
  names.sort(),
  expected,
  "Every route must have exactly one Markdown document",
);
const documents = new Map(
  names.map((name) => [
    name.replace(/\.md$/, ""),
    parseArticle(readFileSync(resolve(directory, name), "utf8")),
  ]),
);

for (const [name, document] of documents) {
  assert(document.sections.length > 0, `${name}: missing article sections`);
  const ids = document.headings.map((heading) => heading.id);
  assert.equal(new Set(ids).size, ids.length, `${name}: duplicate heading IDs`);
  assert(
    document.headings.every((h) => h.depth >= 2),
    `${name}: extra page-level title`,
  );
  const source = readFileSync(resolve(directory, `${name}.md`), "utf8");
  for (const match of source.matchAll(/\]\((\/[^)\s]*|#[^)\s]*)\)/g)) {
    const [route, hash] = match[1].split("#");
    if (route)
      assert(routes.includes(route), `${name}: unknown route ${route}`);
    const target = route
      ? documents.get(route === "/" ? "home" : route.slice(1))
      : document;
    if (hash)
      assert(
        target.headings.some((h) => h.id === hash),
        `${name}: missing anchor ${match[1]}`,
      );
  }
  if (name === "notebook") {
    const dates = document.sections
      .filter((s) => s.record)
      .map((s) => s.record.date);
    assert(
      dates.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)),
      "Notebook records need ISO dates",
    );
    assert.deepEqual(
      dates,
      [...dates].sort(),
      "Notebook records must be chronological",
    );
  }
  console.log(
    `${name}: ${document.wordCount} words, ${document.headings.length} headings${document.sample ? " (layout sample)" : ""}`,
  );
}

const regression = parseArticle(
  '<!-- LAYOUT_SAMPLE -->\n\n## Cycle\n\n### Design\n\nFirst **paragraph**.\n\n## Cycle\n\n<!-- record date="2026-01-12" workstream="Wet Lab" -->\n\n### Design\n\nSecond paragraph.\n\n### Design-2\n\nA third paragraph.\n',
);
assert.deepEqual(
  regression.headings.map((h) => h.id),
  [
    "article-cycle",
    "article-design",
    "article-cycle-2",
    "article-design-2",
    "article-design-2-2",
  ],
);
assert.equal(regression.sections[1].record.date, "2026-01-12");
assert.equal(regression.sections[1].record.workstream, "Wet Lab");
assert(regression.sample);
assert(regression.sections[0].text.includes("First paragraph"));
assert(
  !regression.sections[1].text.includes("record date"),
  "Metadata must not enter search text",
);
assert.equal(
  regression.sections[1].headings[1].line -
    regression.sections[1].startLine +
    1,
  5,
  "Heading line offsets must match the rendered section",
);
console.log(
  "Article routes, links, metadata, and heading regression checks passed.",
);
