import {
  CitationList,
  ContentNotice,
  InfoCard,
  PageSection,
  Timeline,
} from "../components/ContentBlocks";

export function Problem() {
  return (
    <>
      <ContentNotice title="Evidence required before publication">
        The progression, population impact, and biological mechanisms on this
        page must be written from verified primary or authoritative sources.
        No statistics from the earlier static site have been retained.
      </ContentNotice>

      <PageSection
        eyebrow="The challenge"
        title="Muscle health changes across a lifetime"
        intro="The team will use this page to explain the problem at human, physiological, and molecular scales without treating aging or disability as a stereotype."
      >
        <div className="card-grid card-grid--three">
          <InfoCard title="Human context">
            <p>
              [TEAM CONTENT REQUIRED] Describe affected communities and daily
              needs using respectful, sourced language.
            </p>
          </InfoCard>
          <InfoCard title="Biological context">
            <p>
              [TEAM CONTENT REQUIRED] Explain the relevant mechanisms and mark
              uncertainty clearly.
            </p>
          </InfoCard>
          <InfoCard title="Existing approaches">
            <p>
              [TEAM CONTENT REQUIRED] Compare current interventions and the gap
              the project seeks to explore.
            </p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Progression"
        title="A source-backed narrative, not an invented timeline"
        tone="tint"
      >
        <Timeline
          items={[
            {
              label: "Stage 01",
              title: "Baseline and risk factors",
              body: (
                <p>
                  [TEAM CONTENT REQUIRED] Define the starting state and cite the
                  evidence used.
                </p>
              ),
            },
            {
              label: "Stage 02",
              title: "Biological change",
              body: (
                <p>
                  [TEAM CONTENT REQUIRED] Explain measured changes without
                  implying a universal pathway.
                </p>
              ),
            },
            {
              label: "Stage 03",
              title: "Functional impact",
              body: (
                <p>
                  [TEAM CONTENT REQUIRED] Connect biology to lived outcomes and
                  stakeholder perspectives.
                </p>
              ),
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Research gap" title="The question our team can test">
        <div className="focus-statement">
          <p>
            [TEAM CONTENT REQUIRED] Insert one precise, testable research
            question. It should connect directly to the proposed solution,
            engineering cycles, experimental plan, and evaluation criteria.
          </p>
        </div>
      </PageSection>

      <CitationList
        citations={[
          {
            id: "problem-1",
            text: "[TEAM CONTENT REQUIRED] Authoritative definition and diagnostic framework.",
          },
          {
            id: "problem-2",
            text: "[TEAM CONTENT REQUIRED] Primary literature for biological mechanisms.",
          },
          {
            id: "problem-3",
            text: "[TEAM CONTENT REQUIRED] Source for population or social context.",
          },
        ]}
      />
    </>
  );
}
