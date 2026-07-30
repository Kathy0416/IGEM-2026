import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import pages, { PageGroup } from "../pages.ts";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const groups: PageGroup[] = ["Project", "Research", "People"];

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="site-container site-nav__inner">
        <NavLink className="brand" to="/" aria-label="Worldshaper-Nanjing home">
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
          <NavLink className="nav-home-link" to="/">
            Home
          </NavLink>
          {groups.map((group) => (
            <details className="nav-group" key={group}>
              <summary>{group}</summary>
              <div className="nav-group__menu">
                {pages
                  .filter((page) => page.group === group)
                  .map((page) => (
                    <NavLink key={page.path} to={page.path}>
                      {page.name}
                    </NavLink>
                  ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </nav>
  );
}
