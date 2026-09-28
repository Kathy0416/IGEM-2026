import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { ArticleHeading } from "../content/parseArticle";

export function ArticleContents({ headings }: { headings: ArticleHeading[] }) {
  const [active, setActive] = useState("");
  const details = useRef<HTMLDetailsElement>(null);
  const location = useLocation();
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const threshold =
        (document.querySelector(".site-nav-shell")?.getBoundingClientRect()
          .height ?? 96) + 48;
      let current = headings[0]?.id ?? "";
      for (const heading of headings) {
        if (heading.depth > 3) continue;
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= threshold)
          current = heading.id;
      }
      setActive(current);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings, location.pathname]);
  const links = (
    <ol>
      {headings
        .filter((h) => h.depth <= 3)
        .map((h) => (
          <li
            key={h.id}
            className={h.depth === 3 ? "article-contents__sub" : undefined}
          >
            <Link
              to={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              onClick={() => {
                if (details.current) details.current.open = false;
              }}
            >
              {h.title}
            </Link>
          </li>
        ))}
    </ol>
  );
  return (
    <aside className="article-contents">
      <nav className="article-contents__desktop" aria-label="On this page">
        <p>On this page</p>
        {links}
      </nav>
      <details className="article-contents__mobile" ref={details}>
        <summary>
          On this page <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Page sections">{links}</nav>
      </details>
    </aside>
  );
}
