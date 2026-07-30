import { Link } from "react-router-dom";
import {
  ContentNotice,
  InfoCard,
  PageSection,
} from "../components/ContentBlocks";

export function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__mesh" aria-hidden="true" />
        <div className="site-container home-hero__content">
          <p className="eyebrow">Worldshaper-Nanjing · iGEM 2026</p>
          <h1>
            Strength
            <span>Over Time</span>
          </h1>
          <p className="home-hero__lead">
            A developing synthetic biology project exploring new ways to
            address age-related muscle decline.
          </p>
          <div className="button-row">
            <Link className="button-link button-link--primary" to="/description">
              Explore the project
            </Link>
            <Link className="button-link button-link--ghost" to="/engineering">
              Follow our engineering
            </Link>
          </div>
          <div className="home-hero__status">
            <span aria-hidden="true" />
            Draft wiki · verified team content is still being collected
          </div>
        </div>
        <div className="home-hero__system" aria-hidden="true">
          <div className="system-ring system-ring--one" />
          <div className="system-ring system-ring--two" />
          <div className="system-core">WN</div>
        </div>
      </section>

      <div className="site-container home-content">
        <ContentNotice title="A transparent starting point">
          The former static website contained illustrative data that did not
          come from the team. This rebuild intentionally uses placeholders
          until Worldshaper-Nanjing supplies evidence, citations, and approved
          media.
        </ContentNotice>

        <PageSection
          eyebrow="Our direction"
          title="A project built around three connected questions"
          intro="These themes define the structure of the wiki. The team will replace each draft field with documented work as the project develops."
        >
          <div className="card-grid card-grid--three">
            <InfoCard number="01" title="Understand">
              <p>
                Define the problem carefully, review prior work, and identify
                the biological questions the team can responsibly investigate.
              </p>
            </InfoCard>
            <InfoCard number="02" title="Engineer">
              <p>
                Record design decisions, builds, tests, failures, and learning
                as connected engineering cycles.
              </p>
            </InfoCard>
            <InfoCard number="03" title="Integrate">
              <p>
                Use safety analysis and stakeholder feedback to change the
                project—not merely describe it after the fact.
              </p>
            </InfoCard>
          </div>
        </PageSection>

        <PageSection
          eyebrow="Project record"
          title="Follow the work from question to evidence"
          tone="tint"
        >
          <div className="pathway">
            {[
              ["Problem", "Define the need and its context.", "/problem"],
              ["Solution", "Explain the proposed design logic.", "/solution"],
              ["Engineering", "Document iterative technical work.", "/engineering"],
              ["Results", "Report evidence without overclaiming.", "/results"],
            ].map(([title, body, path], index) => (
              <Link className="pathway__item" to={path} key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      </div>
    </>
  );
}
