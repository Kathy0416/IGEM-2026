import { Link } from "react-router-dom";
import {
  ContentNotice,
  FigurePlaceholder,
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
          <h1>Strength Over Time</h1>
          <span className="home-hero__red-line" aria-hidden="true" />
          <p className="home-hero__lead">
            A developing synthetic biology project exploring new ways to address
            age-related muscle decline.
          </p>
          <div className="button-row">
            <Link
              className="button-link button-link--primary"
              to="/description"
            >
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
        <a className="scroll-indicator" href="#home-content">
          Explore
        </a>
      </section>

      <div className="site-container home-content" id="home-content">
        <ContentNotice title="A transparent starting point">
          The former static website contained illustrative data that did not
          come from the team. This rebuild intentionally uses placeholders until
          Worldshaper-Nanjing supplies evidence, citations, and approved media.
        </ContentNotice>

        <PageSection eyebrow="Project question" title="What could help maintain muscle strength with age?" intro="This is the question guiding the team's proposed synthetic biology work; a tested intervention has not yet been demonstrated.">
          <div className="focus-statement"><p>The wiki follows the question from biological context through design, experiments, modeling, and responsible use. Each result will be linked to its method and evidence when verified.</p></div>
        </PageSection>

        <PageSection eyebrow="System overview" title="How the proposed system fits together" tone="tint">
          <FigurePlaceholder title="Project system overview" description="Add a team-created diagram of the proposed inputs, engineered components, and measurable outputs after the design is verified." />
        </PageSection>

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

        <PageSection eyebrow="Evidence and progress" title="What has been documented so far">
          <div className="card-grid card-grid--three">
            <InfoCard title="Design"><p>Review the proposed system and its boundaries in the project description.</p><Link to="/description">Read the description</Link></InfoCard>
            <InfoCard title="Experiments"><p>Protocols and results will be connected to the engineering record after verification.</p><Link to="/experiments">See experiments</Link></InfoCard>
            <InfoCard title="Responsibility"><p>Safety review and stakeholder input will shape project decisions.</p><Link to="/human-practices">See Human Practices</Link></InfoCard>
          </div>
        </PageSection>

        <PageSection
          eyebrow="Project record"
          title="Explore each part of the project"
          tone="tint"
        >
          <div className="pathway">
            {[
              ["Description", "Define the need and its context.", "/description"],
              ["Engineering", "Document iterative technical work.", "/engineering"],
              [
                "Human Practices",
                "Connect stakeholder learning to project decisions.",
                "/human-practices",
              ],
              [
                "Contribution",
                "Share documented resources that future teams can reuse.",
                "/contribution",
              ],
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
