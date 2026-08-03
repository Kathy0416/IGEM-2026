import type { ReactNode } from "react";

interface SectionProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "light" | "tint" | "dark";
}

export function PageSection({
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
}: SectionProps) {
  return (
    <section className={`content-section content-section--${tone}`}>
      <div className="content-section__heading">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

interface NoticeProps {
  title?: string;
  children: ReactNode;
}

export function ContentNotice({
  title = "Team content required",
  children,
}: NoticeProps) {
  return (
    <aside className="content-notice" aria-label={title}>
      <span className="content-notice__marker">[TEAM CONTENT REQUIRED]</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </aside>
  );
}

interface CardProps {
  number?: string;
  title: string;
  children: ReactNode;
}

export function InfoCard({ number, title, children }: CardProps) {
  return (
    <article className="info-card">
      {number && <span className="info-card__number">{number}</span>}
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}

interface FigurePlaceholderProps {
  title: string;
  description: string;
}

export function FigurePlaceholder({
  title,
  description,
}: FigurePlaceholderProps) {
  return (
    <figure className="figure-placeholder">
      <div className="figure-placeholder__canvas" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <figcaption>
        <strong>[TEAM CONTENT REQUIRED] {title}</strong>
        <p>{description}</p>
      </figcaption>
    </figure>
  );
}

interface TableProps {
  caption: string;
  headers: string[];
  rows: ReactNode[][];
}

export function ResponsiveTable({ caption, headers, rows }: TableProps) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label={caption}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${caption}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${caption}-${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface TimelineItem {
  label: string;
  title: string;
  body: ReactNode;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={`${item.label}-${item.title}`}>
          <span className="timeline__label">{item.label}</span>
          <div>
            <h3>{item.title}</h3>
            <div>{item.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export interface Citation {
  id: string;
  text: string;
  href?: string;
}

export function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <section className="citations" aria-labelledby="references-title">
      <h2 id="references-title">References and evidence</h2>
      <ol>
        {citations.map((citation) => (
          <li id={`reference-${citation.id}`} key={citation.id}>
            {citation.href ? (
              <a href={citation.href}>{citation.text}</a>
            ) : (
              citation.text
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
