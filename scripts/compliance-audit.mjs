import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const strict = process.argv.includes("--strict");
const sourceRoot = join(root, "src");
const textExtensions = new Set([".ts", ".tsx", ".css", ".html"]);
const requiredRoutes = [
  "/",
  "/description",
  "/engineering",
  "/human-practices",
  "/contribution",
  "/safety-and-security",
];
const forbiddenText = [
  "Lorem ipsum",
  "Essential First Steps",
  "iGEM Competition Calendar",
  "migraine",
  "problemParticles",
  "problem-signal-field",
];
const allowedExternalHosts = new Set([
  "competition.igem.org",
  "creativecommons.org",
  "gitlab.igem.org",
  "static.igem.wiki",
  "video.igem.org",
]);

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(sourceRoot).filter((file) =>
  textExtensions.has(extname(file)),
);
const contents = files.map((file) => ({
  file,
  text: readFileSync(file, "utf8"),
}));
const errors = [];
const warnings = [];

for (const { file, text } of contents) {
  for (const forbidden of forbiddenText) {
    if (text.toLowerCase().includes(forbidden.toLowerCase())) {
      errors.push(`${relative(root, file)} contains forbidden text: ${forbidden}`);
    }
  }

  const imageTags = text.match(/<img\b[^>]*>/g) ?? [];
  for (const tag of imageTags) {
    if (!/\balt\s*=/.test(tag)) {
      errors.push(`${relative(root, file)} contains an image without alt text`);
    }
  }

  const urls = text.match(/https?:\/\/[^\s"'`)<>]+/g) ?? [];
  for (const value of urls) {
    const host = new URL(value).hostname;
    if (!allowedExternalHosts.has(host)) {
      errors.push(`${relative(root, file)} references unsupported host: ${host}`);
    }
  }
}

const pagesSource = readFileSync(join(sourceRoot, "pages.ts"), "utf8");
const routeMatches = [...pagesSource.matchAll(/\bpath:\s*"([^"]+)"/g)].map(
  (match) => match[1],
);
const routeSet = new Set(routeMatches);

for (const route of requiredRoutes) {
  if (!routeSet.has(route)) {
    errors.push(`Required direct route is missing: ${route}`);
  }
}

const internalLinks = contents.flatMap(({ file, text }) =>
  [...text.matchAll(/\bto="(\/[^"]*)"/g)].map((match) => ({
    file,
    path: match[1],
  })),
);

for (const link of internalLinks) {
  if (!routeSet.has(link.path)) {
    errors.push(
      `${relative(root, link.file)} links to undefined route: ${link.path}`,
    );
  }
}

const placeholders = contents.reduce(
  (total, { text }) =>
    total + (text.match(/\[TEAM CONTENT REQUIRED\]/g)?.length ?? 0),
  0,
);
const env = readFileSync(join(root, ".env"), "utf8");

if (env.includes("TEAM_ID_REQUIRED")) {
  warnings.push("VITE_TEAM_ID still requires the official iGEM team ID.");
}
if (placeholders > 0) {
  warnings.push(`${placeholders} team-content placeholders remain.`);
}
if (strict && placeholders > 0) {
  errors.push("Strict audit forbids unresolved team-content placeholders.");
}
if (strict && env.includes("TEAM_ID_REQUIRED")) {
  errors.push("Strict audit requires the official VITE_TEAM_ID.");
}

console.log(`Compliance audit checked ${files.length} source files.`);
for (const warning of warnings) console.warn(`WARNING: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

if (errors.length > 0) {
  process.exitCode = 1;
} else {
  console.log("Compliance audit passed.");
}
