import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { documents } from "../content/documents";
import { ArticleContents } from "./ArticleContents";
import { ArticleMarkdown } from "./ArticleMarkdown";
import type { ArticleHeading } from "../content/parseArticle";

export type ReadingLayout =
  | "article"
  | "cycles"
  | "protocols"
  | "notebook"
  | "viewer"
  | "team"
  | "home";

const rosterHeadings: ArticleHeading[] = [
  {
    id: "strength-comes-from-people",
    title: "Meet the team",
    depth: 2,
    line: 0,
  },
  {
    id: "guidance-pending-confirmation",
    title: "Instructors and advisors",
    depth: 2,
    line: 0,
  },
  { id: "credit-must-be-precise", title: "Acknowledgments", depth: 2, line: 0 },
];

export function ArticlePage({
  pageKey,
  variant = "article",
  children,
}: {
  pageKey: string;
  variant?: ReadingLayout;
  children?: ReactNode;
}) {
  const document = documents[pageKey];
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [workstream, setWorkstream] = useState("");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const reset = () => {
    setQuery("");
    setWorkstream("");
    setFrom("");
    setUntil("");
  };
  useEffect(() => {
    reset();
  }, [pageKey, location.hash, location.key]);
  const records = document.sections.filter((s) => s.record);
  const streams = [
    ...new Set(
      records.map((s) => s.record?.workstream).filter((s): s is string => !!s),
    ),
  ];
  const invalidRange = !!(from && until && from > until);
  const sections = useMemo(
    () =>
      document.sections.filter(
        (section) =>
          !section.record ||
          (!invalidRange &&
            query
              .toLowerCase()
              .split(/\s+/)
              .every((term) => section.text.toLowerCase().includes(term)) &&
            (!workstream || section.record.workstream === workstream) &&
            (!from || (section.record.date ?? "") >= from) &&
            (!until || (section.record.date ?? "") <= until)),
      ),
    [document, query, workstream, from, until, invalidRange],
  );
  const headings = useMemo(
    () => [
      ...(variant === "team" ? rosterHeadings : []),
      ...sections.flatMap((s) => s.headings),
    ],
    [sections, variant],
  );
  const shown = sections.filter((s) => s.record).length;
  return (
    <div
      className={`reading-layout reading-layout--${variant}`}
      data-content-page={pageKey}
    >
      <ArticleContents headings={headings} />
      <div className="reading-layout__main">
        <div className="article-meta">
          <span>
            {variant === "team" ? "People & purpose" : "Project documentation"}
          </span>
          <span>
            {Math.max(1, Math.ceil(document.wordCount / 220))} min read
          </span>
        </div>
        {document.sample && (
          <aside className="layout-sample" aria-label="Sample content">
            <strong>Layout sample — Shakespeare text</strong>
            <span>
              Passages from <cite>The Winter’s Tale</cite> are temporary reading
              samples. Replace them with your team’s text.
            </span>
          </aside>
        )}
        {children}
        {(variant === "protocols" || variant === "notebook") && (
          <div className="record-browser">
            <div className="record-browser__title">
              <h2>
                {variant === "protocols"
                  ? "Find a protocol"
                  : "Browse the notebook"}
              </h2>
              <span>
                {document.sample ? "Demonstration records" : "Records"}
              </span>
            </div>
            <div className="record-filters">
              <label>
                Search {variant === "protocols" ? "protocols" : "entries"}
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles and text"
                />
              </label>
              {variant === "notebook" && (
                <>
                  <label>
                    Workstream
                    <select
                      value={workstream}
                      onChange={(e) => setWorkstream(e.target.value)}
                    >
                      <option value="">All workstreams</option>
                      {streams.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    From
                    <input
                      type="date"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </label>
                  <label>
                    To
                    <input
                      type="date"
                      value={until}
                      onChange={(e) => setUntil(e.target.value)}
                    />
                  </label>
                </>
              )}
              <button type="button" onClick={reset}>
                Reset filters
              </button>
            </div>
            <p role="status">
              {invalidRange
                ? "Choose an end date on or after the start date."
                : `${shown} of ${records.length} records shown${shown === 0 ? ". Try another search or reset the filters." : "."}`}
            </p>
            {shown > 0 && (
              <ol className="record-index">
                {sections
                  .filter((s) => s.record)
                  .map((s) => (
                    <li key={s.id}>
                      <Link to={`#${s.id}`}>{s.title}</Link>
                      <small>
                        {[
                          s.record?.date,
                          s.record?.workstream,
                          s.record?.version,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </small>
                    </li>
                  ))}
              </ol>
            )}
          </div>
        )}
        {document.intro.trim() && (
          <div className="article-prose">
            <ArticleMarkdown
              section={{
                id: "intro",
                title: "Introduction",
                markdown: document.intro,
                text: "",
                startLine: 1,
                headings: [],
              }}
            />
          </div>
        )}
        {sections.map((section, index) => (
          <section
            key={section.id}
            className={`article-section article-prose${section.record ? " article-section--record" : ""}`}
            aria-label={section.title}
          >
            <div className="article-section__meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.record && (
                <span>
                  {[
                    section.record.date,
                    section.record.workstream,
                    section.record.version,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              )}
            </div>
            {variant === "viewer" && index === 0 && (
              <div className="viewer-reservation">
                <span aria-hidden="true">◎</span>
                <strong>Binder viewer</strong>
                <p>
                  Interactive visualization pending verified structure data.
                </p>
              </div>
            )}
            <ArticleMarkdown section={section} />
          </section>
        ))}
        <nav className="article-related" aria-label="Continue reading">
          <span>Continue exploring</span>
          <Link to="/description">Project description →</Link>
          <Link to="/engineering">Engineering →</Link>
          <Link to="/human-practices">Human Practices →</Link>
        </nav>
      </div>
    </div>
  );
}
