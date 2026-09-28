import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import type { Root, RootContent } from "mdast";
import { stringToSlug } from "../utils/stringToSlug.ts";

export interface ArticleHeading {
  id: string;
  title: string;
  depth: number;
  line: number;
}
export interface ArticleSection {
  id: string;
  title: string;
  markdown: string;
  text: string;
  startLine: number;
  headings: ArticleHeading[];
  record?: { date?: string; workstream?: string; version?: string };
}
export interface ArticleDocument {
  intro: string;
  sections: ArticleSection[];
  headings: ArticleHeading[];
  sample: boolean;
  wordCount: number;
}

// One syntax tree supplies section boundaries, anchors, contents and search text.
function plainText(
  node:
    | Root
    | RootContent
    | { type: string; value?: string; alt?: string; children?: unknown[] },
): string {
  if (node.type === "html") return "";
  if ("children" in node && node.children) {
    const inline = [
      "paragraph",
      "heading",
      "strong",
      "emphasis",
      "delete",
      "link",
      "linkReference",
      "tableCell",
    ].includes(node.type);
    return (node.children as RootContent[])
      .map(plainText)
      .join(inline ? "" : " ")
      .replace(/\s+/g, " ");
  }
  if ("alt" in node && node.alt) return node.alt;
  return "value" in node ? (node.value ?? "") : "";
}

export function parseArticle(source: string): ArticleDocument {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source);
  const used = new Set<string>();
  const headings: ArticleHeading[] = tree.children
    .filter((node) => node.type === "heading")
    .map((node) => {
      const title = plainText(node);
      const base = `article-${stringToSlug(title) || "section"}`;
      let id = base;
      for (let suffix = 2; used.has(id); suffix++) id = `${base}-${suffix}`;
      used.add(id);
      return { id, title, depth: node.depth, line: node.position!.start.line };
    });
  const starts = tree.children.filter(
    (node) => node.type === "heading" && node.depth === 2,
  );
  const sections = starts.map((node, index): ArticleSection => {
    const start = node.position!.start;
    const end = starts[index + 1]?.position?.start.offset ?? source.length;
    const markdown = source.slice(start.offset, end);
    const sectionHeadings = headings.filter(
      (h) =>
        h.line >= start.line &&
        h.line < (starts[index + 1]?.position?.start.line ?? Infinity),
    );
    const metadata = markdown.match(/<!--\s*record\s+([^]*?)-->/)?.[1];
    const record =
      metadata === undefined
        ? undefined
        : Object.fromEntries(
            [...metadata.matchAll(/(date|workstream|version)="([^"]*)"/g)].map(
              (m) => [m[1], m[2]],
            ),
          );
    const sectionNodes = tree.children.filter(
      (child) =>
        (child.position?.start.offset ?? 0) >= start.offset! &&
        (child.position?.start.offset ?? 0) < end,
    );
    return {
      id: sectionHeadings[0].id,
      title: plainText(node),
      markdown,
      text: sectionNodes.map(plainText).join(" "),
      startLine: start.line,
      headings: sectionHeadings,
      record,
    };
  });
  return {
    intro: source.slice(0, starts[0]?.position?.start.offset ?? source.length),
    sections,
    headings,
    sample: /<!--\s*LAYOUT_SAMPLE\s*-->/.test(source),
    wordCount: plainText(tree).trim().split(/\s+/).filter(Boolean).length,
  };
}
