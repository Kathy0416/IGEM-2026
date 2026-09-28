import pages from "../pages.ts";
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

interface SectionSeed {
  path: string;
  title: string;
  keywords: string[];
}

// Only sections rendered by active route components belong here. Simple
// placeholder pages with only an h1 remain searchable through their page entry.
const sectionSeeds: SectionSeed[] = [
  {
    path: "/",
    title: "A project built around three connected questions",
    keywords: ["our direction", "themes", "understand", "engineer", "integrate"],
  },
  {
    path: "/",
    title: "Follow the work from question to evidence",
    keywords: [
      "project record",
      "pathway",
      "description",
      "engineering",
      "human practices",
      "contribution",
    ],
  },
  {
    path: "/description",
    title: "Why this project?",
    keywords: ["context", "why", "muscle health", "motivation"],
  },
  {
    path: "/description",
    title: "Project objectives",
    keywords: ["definition", "objectives", "research question", "technical objective"],
  },
  {
    path: "/description",
    title: "What is—and is not—being claimed",
    keywords: ["boundaries", "claims", "limitations", "project status"],
  },
  {
    path: "/description",
    title: "References and evidence",
    keywords: ["citations", "references", "sources"],
  },
  {
    path: "/contribution",
    title: "Useful, documented, reusable",
    keywords: ["future teams", "resource", "usefulness", "access"],
  },
  {
    path: "/contribution",
    title: "What we are sharing",
    keywords: ["contribution index", "sharing", "license", "validation"],
  },
  {
    path: "/contribution",
    title: "How another team can build on it",
    keywords: ["reproducibility", "instructions", "prerequisites", "limitations"],
  },
  {
    path: "/engineering",
    title: "Engineering design cycle",
    keywords: ["cycle 01", "design", "build", "test", "learn"],
  },
  {
    path: "/engineering",
    title: "Decision and evidence register",
    keywords: ["traceability", "decisions", "register", "iterations"],
  },
  {
    path: "/engineering",
    title: "What the team will change",
    keywords: ["next iteration", "design change", "lessons learned"],
  },
  {
    path: "/experiments",
    title: "Experiments and methods",
    keywords: [
      "protocol index",
      "construct preparation",
      "system characterization",
      "functional evaluation",
    ],
  },
  {
    path: "/experiments",
    title: "Protocol record",
    keywords: ["reproducibility", "materials", "controls", "register"],
  },
  {
    path: "/experiments",
    title: "What every protocol must include",
    keywords: ["documentation", "checklist", "versioning", "risk assessment"],
  },
  {
    path: "/notebook",
    title: "Decisions over time",
    keywords: ["season record", "project definition", "milestone", "revision"],
  },
  {
    path: "/notebook",
    title: "Notebook entry register",
    keywords: ["index", "entries", "dates", "evidence links"],
  },
  {
    path: "/team",
    title: "Strength comes from people",
    keywords: ["our team", "captains", "members", "introductions"],
  },
  {
    path: "/team",
    title: "Guidance pending confirmation",
    keywords: ["instructors", "advisors", "roles", "responsibilities"],
  },
  {
    path: "/team",
    title: "Credit must be precise",
    keywords: ["attribution", "credit", "acknowledgements"],
  },
];

const sectionEntries: SearchEntry[] = sectionSeeds.flatMap((section) => {
  const page = pageByPath.get(section.path);
  if (!page) {
    return [];
  }

  return [
    {
      path: section.path,
      pageName: page.name,
      pageTitle: page.title,
      group: page.group,
      kind: "section",
      sectionTitle: section.title,
      anchor: stringToSlug(section.title),
      keywords: section.keywords,
    },
  ];
});

export const searchIndex: SearchEntry[] = [...pageEntries, ...sectionEntries];

export default searchIndex;
