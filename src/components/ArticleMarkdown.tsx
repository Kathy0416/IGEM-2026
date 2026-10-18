import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import type { ArticleSection } from "../content/parseArticle";

export function ArticleMarkdown({ section }: { section: ArticleSection }) {
  const headingId = (line?: number) =>
    section.headings.find((h) => h.line === (line ?? 1) + section.startLine - 1)
      ?.id;
  const components: Components = {
    h1: ({ children }) => <h2>{children}</h2>,
    h2: ({ node, children }) => (
      <h2 id={headingId(node?.position?.start.line)} tabIndex={-1}>
        {children}
      </h2>
    ),
    h3: ({ node, children }) => (
      <h3 id={headingId(node?.position?.start.line)} tabIndex={-1}>
        {children}
      </h3>
    ),
    h4: ({ node, children }) => (
      <h4 id={headingId(node?.position?.start.line)} tabIndex={-1}>
        {children}
      </h4>
    ),
    a: ({ href, children }) =>
      href?.startsWith("/") || href?.startsWith("#") ? (
        <Link to={href}>{children}</Link>
      ) : (
        <a href={href}>{children}</a>
      ),
    // Standalone Markdown images become figures, not invalid figures inside paragraphs.
    p: ({ node, children }) =>
      node?.children.some(
        (child) => child.type === "element" && child.tagName === "img",
      ) ? (
        <div className="article-figure-wrap">{children}</div>
      ) : (
        <p>{children}</p>
      ),
    img: ({ src, alt, title }) => (
      <figure className="article-figure">
        {typeof src === "string" && src.startsWith("sample-figure/") ? (
          <div
            className="article-figure__placeholder"
            role="img"
            aria-label={alt || "Sample figure slot"}
          >
            <svg viewBox="0 0 480 120" aria-hidden="true" fill="none">
              <path d="M80 60h320" />
              <rect x="30" y="25" width="100" height="70" rx="12" />
              <circle cx="240" cy="60" r="35" />
              <rect x="350" y="25" width="100" height="70" rx="12" />
            </svg>
            <span>Sample visual slot</span>
            <small>{alt}</small>
          </div>
        ) : (
          <img src={src} alt={alt ?? ""} loading="lazy" />
        )}
        {title && <figcaption>{title}</figcaption>}
      </figure>
    ),
    table: ({ children }) => (
      <div
        className="article-table"
        role="region"
        aria-label={`Table in ${section.title}`}
        tabIndex={0}
      >
        <table>{children}</table>
      </div>
    ),
    pre: ({ children }) => <pre tabIndex={0}>{children}</pre>,
  };
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
      {section.markdown}
    </Markdown>
  );
}
