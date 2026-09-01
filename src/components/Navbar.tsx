import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavGroups } from "./NavGroups";
import { ReadingProgress } from "./ReadingProgress";
import { MobileSearchRow, SearchBar } from "./SearchBar";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="site-nav-shell" ref={shellRef}>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="site-container site-nav__inner">
          <NavLink
            className="brand"
            to="/"
            aria-label="Worldshaper-Nanjing home"
          >
            <span className="brand__mark" aria-hidden="true">
              WN
            </span>
            <span className="brand__text">
              <strong>Strength Over Time</strong>
              <small>Worldshaper-Nanjing</small>
            </span>
          </NavLink>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="primary-links"
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
            <span className="visually-hidden">Toggle navigation</span>
          </button>

          <div
            className={`site-nav__links${open ? " is-open" : ""}`}
            id="primary-links"
          >
            <MobileSearchRow />
            <NavLink className="nav-home-link" to="/">
              Home
            </NavLink>
            <NavGroups drawerOpen={open} shellRef={shellRef} />
          </div>

          <SearchBar
            idPrefix="site-search-desktop"
            className="site-search--desktop"
          />
        </div>
      </nav>
      <ReadingProgress />
    </div>
  );
}
