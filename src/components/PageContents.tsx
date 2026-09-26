import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type SectionLink = { id: string; title: string };

export function PageContents() {
  const { pathname } = useLocation();
  const [sections, setSections] = useState<SectionLink[]>([]);

  useEffect(() => {
    const frame = document.querySelector(".page-frame");
    const headings = frame?.querySelectorAll<HTMLElement>(
      ".content-section[id] > .content-section__heading > h2, .citations[id] > h2",
    );
    setSections(
      Array.from(headings ?? []).map((heading) => ({
        id: heading.closest<HTMLElement>("section[id]")!.id,
        title: heading.textContent?.trim() ?? "Section",
      })),
    );
  }, [pathname]);

  if (sections.length < 2) return null;

  return (
    <nav className="page-contents" aria-label="On this page">
      <strong>On this page</strong>
      <div className="page-contents__links">
        {sections.map(({ id, title }) => (
          <a key={id} href={`#${id}`}>{title}</a>
        ))}
      </div>
    </nav>
  );
}
