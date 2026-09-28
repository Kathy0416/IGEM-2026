import { parseArticle } from "./parseArticle";

const files = import.meta.glob<string>("./pages/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
export const documents = Object.fromEntries(
  Object.entries(files).map(([path, source]) => [
    path.split("/").pop()!.replace(/\.md$/, ""),
    parseArticle(source),
  ]),
);
