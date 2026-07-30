import { Link } from "react-router-dom";
import { stringToSlug } from "../utils";

export function Footer() {
  const teamYear = import.meta.env.VITE_TEAM_YEAR;
  const teamName = import.meta.env.VITE_TEAM_NAME;
  const teamSlug = stringToSlug(teamName);

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__top">
          <div>
            <p className="eyebrow">Worldshaper-Nanjing · iGEM 2026</p>
            <h2>Strength is built through iteration.</h2>
            <p className="site-footer__summary">
              This wiki is being developed as an honest, reproducible record of
              our team&apos;s work. Draft fields are clearly marked until the
              team provides verified content.
            </p>
          </div>
          <div>
            <h3>Key pages</h3>
            <ul className="footer-links">
              <li>
                <Link to="/engineering">Engineering</Link>
              </li>
              <li>
                <Link to="/human-practices">Human Practices</Link>
              </li>
              <li>
                <Link to="/contribution">Contribution</Link>
              </li>
              <li>
                <Link to="/safety-and-security">Safety</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Official resources</h3>
            <ul className="footer-links">
              <li>
                <a href="https://competition.igem.org/about/rules-and-policies">
                  Rules and policies
                </a>
              </li>
              <li>
                <a href="https://competition.igem.org/judging/medals">
                  Medal criteria
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>
            © {teamYear} Worldshaper-Nanjing. Content is licensed under a{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              rel="license"
            >
              Creative Commons Attribution 4.0 International license
            </a>
            .
          </p>
          <p>
            The source repository for this wiki will be available at{" "}
            <a href={`https://gitlab.igem.org/${teamYear}/${teamSlug}`}>
              gitlab.igem.org/{teamYear}/{teamSlug}
            </a>
            . The official repository has not yet been connected.
          </p>
        </div>
      </div>
    </footer>
  );
}
