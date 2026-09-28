import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pages from "../pages.ts";
import { searchIndex, type SearchEntry } from "../search/search-index.ts";

const MAX_RESULTS = 8;

const leadByPath = new Map(pages.map((page) => [page.path, page.lead]));

interface RankedResult {
  entry: SearchEntry;
  /** 0 = title prefix hit, 1 = keyword hit, 2 = any other haystack hit. */
  score: number;
  titleTokens: number;
  order: number;
}

function resultTitle(entry: SearchEntry): string {
  return entry.kind === "section"
    ? (entry.sectionTitle ?? "")
    : entry.pageTitle;
}

/**
 * Case-insensitive multi-token AND search over the static index. Every token
 * must appear in the entry haystack (page name + page title + section title +
 * anchor + keywords). Survivors are ranked: title prefix hits first, then
 * keyword hits, then any other match; ties break by number of matched title
 * tokens, shorter title, then original index order. Page results are listed
 * before section results and the merged list is capped at MAX_RESULTS.
 */
function searchSite(query: string): SearchEntry[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return [];
  }

  const ranked: RankedResult[] = [];

  searchIndex.forEach((entry, order) => {
    const haystack = [
      entry.pageName,
      entry.pageTitle,
      entry.sectionTitle ?? "",
      entry.anchor ?? "",
      entry.keywords.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    if (!tokens.every((token) => haystack.includes(token))) {
      return;
    }

    const title = resultTitle(entry).toLowerCase();
    const keywords = entry.keywords.map((keyword) => keyword.toLowerCase());
    const prefixMatch = tokens.some((token) => title.startsWith(token));
    const keywordMatch = tokens.some((token) =>
      keywords.some(
        (keyword) => keyword === token || keyword.split(" ").includes(token),
      ),
    );

    ranked.push({
      entry,
      score: prefixMatch ? 0 : keywordMatch ? 1 : 2,
      titleTokens: tokens.filter((token) => title.includes(token)).length,
      order,
    });
  });

  const compareRank = (a: RankedResult, b: RankedResult) =>
    a.score - b.score ||
    b.titleTokens - a.titleTokens ||
    resultTitle(a.entry).length - resultTitle(b.entry).length ||
    a.order - b.order;

  const pageResults = ranked
    .filter((result) => result.entry.kind === "page")
    .sort(compareRank);
  const sectionResults = ranked
    .filter((result) => result.entry.kind === "section")
    .sort(compareRank);

  return [...pageResults, ...sectionResults]
    .slice(0, MAX_RESULTS)
    .map((result) => result.entry);
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Case-insensitive highlighting of the displayed string only; matches are
 * wrapped in <mark class="search-hit">.
 */
function Highlighted({ text, tokens }: { text: string; tokens: string[] }) {
  const unique = [...new Set(tokens.filter((token) => token.length > 0))];
  if (unique.length === 0) {
    return <>{text}</>;
  }
  const pattern = new RegExp(`(${unique.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark className="search-hit" key={`${index}-${part}`}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

interface SearchBarProps {
  /** Unique per instance so the desktop bar and the mobile panel never share ids. */
  idPrefix: string;
  /** Move keyboard focus into the input right after mount (mobile expanded row). */
  focusOnMount?: boolean;
  className?: string;
}

/**
 * ARIA combobox search widget over the static site index. The input keeps DOM
 * focus at all times; the listbox is driven with aria-activedescendant.
 */
export function SearchBar({
  idPrefix,
  focusOnMount = false,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const results = useMemo(() => searchSite(query), [query]);
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

  // Route changes close the listbox; the query text itself is kept.
  useEffect(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, [location.pathname]);

  // Close on pointerdown outside the search wrapper.
  useEffect(() => {
    if (!open) {
      return;
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        event.target instanceof Node &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (focusOnMount) {
      inputRef.current?.focus();
    }
  }, [focusOnMount]);

  const closeListbox = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const navigateToResult = (entry: SearchEntry) => {
    navigate(
      entry.kind === "section" && entry.anchor
        ? `${entry.path}#${entry.anchor}`
        : entry.path,
    );
    closeListbox();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      if (results.length === 0) {
        return;
      }
      setActiveIndex((index) => {
        if (event.key === "ArrowDown") {
          return (index + 1) % results.length;
        }
        return index <= 0 ? results.length - 1 : index - 1;
      });
    } else if (event.key === "Enter") {
      if (open && results.length > 0) {
        event.preventDefault();
        navigateToResult(
          activeIndex >= 0 && activeIndex < results.length
            ? results[activeIndex]
            : results[0],
        );
      }
    } else if (event.key === "Escape" || event.key === "Tab") {
      if (open) {
        closeListbox();
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={className ? `site-search ${className}` : "site-search"}
    >
      <label className="site-search__field">
        <svg
          className="site-search__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <input
          ref={inputRef}
          className="site-search__input"
          type="search"
          role="combobox"
          placeholder="Search pages"
          aria-label="Search the wiki"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? `${idPrefix}-listbox` : undefined}
          aria-activedescendant={
            open && activeIndex >= 0
              ? `${idPrefix}-opt-${activeIndex}`
              : undefined
          }
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </label>

      {open && (
        <ul
          id={`${idPrefix}-listbox`}
          role="listbox"
          aria-label="Search results"
          className="site-search__listbox"
        >
          {results.map((entry, index) => (
            <li
              key={`${entry.path}-${entry.kind}-${entry.sectionTitle ?? "page"}`}
              id={`${idPrefix}-opt-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={`site-search__option${
                index === activeIndex ? " is-active" : ""
              }${entry.kind === "section" ? " site-search__option--section" : ""}`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => navigateToResult(entry)}
            >
              <span className="site-search__page">
                <Highlighted text={entry.pageName} tokens={tokens} />
                {entry.group && (
                  <span className="site-search__badge">{entry.group}</span>
                )}
              </span>
              <span className="site-search__context">
                {entry.kind === "section" ? (
                  <>
                    <span className="site-search__section-label">Section</span>
                    <Highlighted
                      text={entry.sectionTitle ?? ""}
                      tokens={tokens}
                    />
                  </>
                ) : (
                  <Highlighted
                    text={leadByPath.get(entry.path) ?? ""}
                    tokens={tokens}
                  />
                )}
              </span>
            </li>
          ))}
          {results.length === 0 && (
            <li role="status" className="site-search__status">
              {query.trim() === ""
                ? "Type to search pages and sections"
                : `No results for "${query}"`}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/**
 * Collapsed "Search" row shown as the first item of the mobile nav panel;
 * tapping it expands the full search bar and focuses its input. Route
 * changes collapse the row again.
 */
export function MobileSearchRow() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => setExpanded(false), [location.pathname]);

  return (
    <div className="site-search-mobile-row">
      {expanded ? (
        <SearchBar idPrefix="site-search-mobile" focusOnMount />
      ) : (
        <button
          type="button"
          className="site-search__mobile-toggle"
          onClick={() => setExpanded(true)}
        >
          Search
        </button>
      )}
    </div>
  );
}
