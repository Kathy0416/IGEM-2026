import pages from "../pages.ts";
import { documents } from "../content/documents";
import { stringToSlug } from "../utils/stringToSlug.ts";

export interface SearchEntry {
  path: string;
  pageName: string;
  pageTitle: string;
  group?: string;
  kind: "page" | "section";
  sectionTitle?: string;
  anchor?: string;
  keywords: string[];
  text?: string;
}

// Page aliases and judging terms live here; route-facing metadata comes from
// pages.ts so navigation, routing, and page-level search cannot drift.
const pageKeywords: Record<string, string[]> = {
  "/": [
    "igem 2026",
    "worldshaper nanjing",
    "strength over time",
    "synthetic biology",
    "team wiki",
    "homepage",
    "overview",
  ],
  "/description": [
    "project description",
    "abstract",
    "motivation",
    "background",
    "context",
    "objectives",
    "scope",
    "research question",
  ],
  "/contribution": [
    "bronze 3",
    "bronze criterion 3",
    "contribution",
    "parts",
    "documentation",
    "reusable resources",
    "future teams",
    "open source",
    "reproducibility",
  ],
  "/engineering": [
    "silver 1",
    "silver criterion 1",
    "engineering success",
    "dbtl",
    "design build test learn",
    "engineering cycle",
    "iteration",
    "prototype",
  ],
  "/experiments": [
    "experiments",
    "methods",
    "lab procedures",
    "controls",
    "materials",
    "characterization",
  ],
  "/part": [
    "part",
    "parts",
    "biological parts",
    "registry",
    "construct",
    "design",
  ],
  "/protocol": [
    "protocol",
    "protocols",
    "methods",
    "procedure",
    "reproducibility",
    "lab instructions",
  ],
  "/measurement": [
    "best measurement",
    "measurement award",
    "measurement",
    "metrics",
    "quantification",
    "calibration",
  ],
  "/notebook": [
    "notebook",
    "lab notes",
    "timeline",
    "dates",
    "chronological record",
    "decision log",
    "milestones",
  ],
  "/safety-and-security": [
    "safety and security award",
    "safety",
    "security",
    "biosafety",
    "biosecurity",
    "risk assessment",
    "hazards",
    "containment",
  ],
  "/model": [
    "best model",
    "model award",
    "model",
    "modelling",
    "simulation",
    "prediction",
  ],
  "/binder-viewer": [
    "binder viewer",
    "binder design",
    "interactive visualization",
    "dry lab",
  ],
  "/human-practices": [
    "silver 2",
    "silver criterion 2",
    "human practices",
    "ihp",
    "integrated human practices",
    "best integrated human practices",
    "stakeholders",
    "responsibility",
  ],
  "/education": [
    "best education",
    "education award",
    "education",
    "learning",
    "teaching",
    "outreach",
  ],
  "/entrepreneurship": [
    "best entrepreneurship",
    "entrepreneurship award",
    "entrepreneurship",
    "business",
    "market",
    "commercialization",
  ],
  "/team": [
    "team",
    "members",
    "captains",
    "instructors",
    "advisors",
    "roles",
    "about us",
    "introductions",
  ],
  "/attributions": [
    "attributions",
    "acknowledgements",
    "credits",
    "contributors",
    "responsibilities",
  ],
};

const pageByPath = new Map(pages.map((page) => [page.path, page]));

const pageEntries: SearchEntry[] = pages.map((page) => ({
  path: page.path,
  pageName: page.name,
  pageTitle: page.title,
  group: page.group,
  kind: "page",
  keywords: pageKeywords[page.path] ?? [],
}));

// Markdown headings and search share their anchor IDs with the reader.
const sectionEntries: SearchEntry[] = pages.flatMap(page => {
  const document = documents[page.path === "/" ? "home" : page.path.slice(1)];
  return document.sections.flatMap(section => section.headings.filter(h => h.depth <= 3).map(heading => ({
    path: page.path, pageName: page.name, pageTitle: page.title, group: page.group,
    kind: "section" as const, sectionTitle: heading.title, anchor: heading.id,
    keywords: [], text: heading.depth === 2 ? section.text : "",
  })));
});

const preservedSections = [
  { path: "/", title: "A project built around three connected questions" },
  { path: "/", title: "Follow the work from question to evidence" },
  { path: "/team", title: "Strength comes from people" },
  { path: "/team", title: "Guidance pending confirmation" },
  { path: "/team", title: "Credit must be precise" },
].map(({path, title}): SearchEntry => ({
  path, pageName: pageByPath.get(path)!.name, pageTitle: pageByPath.get(path)!.title,
  group: pageByPath.get(path)!.group, kind: "section", sectionTitle: title,
  anchor: stringToSlug(title), keywords: [],
}));

export const searchIndex: SearchEntry[] = [...pageEntries, ...sectionEntries, ...preservedSections];
export default searchIndex;
