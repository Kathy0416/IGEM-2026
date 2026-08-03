import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="empty-state" aria-labelledby="not-found-title">
      <p className="eyebrow">404</p>
      <h2 id="not-found-title">This page is not part of the current wiki.</h2>
      <p>
        Optional award pages remain disabled until Worldshaper-Nanjing confirms
        which work the team will document.
      </p>
      <Link className="button-link" to="/">
        Return home
      </Link>
    </section>
  );
}
