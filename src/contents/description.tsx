import {
  CitationList,
  ContentNotice,
  FigurePlaceholder,
  InfoCard,
  PageSection,
} from "../components/ContentBlocks";

export function Description() {
  return (
    <>
      <ContentNotice title="Project description awaiting team verification">
        Add the team-approved project title, abstract, motivation, scope, and
        primary literature. Do not reuse claims or numbers from the former
        static website without verification.
      </ContentNotice>

      <PageSection
        eyebrow="Context"
        title="Why this project?"
        intro="Worldshaper-Nanjing is investigating whether synthetic biology can contribute to the broader challenge of maintaining muscle health with age."
      >
        <div className="split-layout">
          <div className="prose">
            <p>
              The final description should begin with the real-world context,
              narrow to the biological problem, and explain why the team chose
              this question. It should clearly distinguish established
              literature from the team&apos;s own hypotheses.
            </p>
            <p>
              Every scientific statement, prevalence estimate, mechanism, and
              prior result must be linked to a traceable source in the
              references section.
            </p>
          </div>
          <FigurePlaceholder
            title="Project overview figure"
            description="Upload a team-created, licensed diagram through the iGEM uploads tool and describe what each element represents."
          />
        </div>
      </PageSection>

      <PageSection eyebrow="Research gap" title="The question this project addresses" tone="tint">
        <div className="focus-statement"><p>[TEAM CONTENT REQUIRED] Explain what prior research establishes, where uncertainty remains, and the specific gap the proposed system addresses. Cite primary sources.</p></div>
      </PageSection>

      <PageSection eyebrow="Proposed solution" title="How the proposed system would work">
        <FigurePlaceholder title="Proposed system diagram" description="Show components, expected interactions, and the measurable output. Distinguish proposed behavior from tested results." />
      </PageSection>

      <PageSection eyebrow="Definition" title="Measurable project objectives" tone="tint">
        <div className="card-grid card-grid--three">
          <InfoCard number="01" title="Research question">
            <p>[TEAM CONTENT REQUIRED] State the precise biological question.</p>
          </InfoCard>
          <InfoCard number="02" title="Technical objective">
            <p>[TEAM CONTENT REQUIRED] Define what the team plans to design and test.</p>
          </InfoCard>
          <InfoCard number="03" title="Responsible outcome">
            <p>[TEAM CONTENT REQUIRED] Describe intended users, limits, and context.</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection eyebrow="Boundaries" title="What is—and is not—being claimed">
        <div className="claim-boundary">
          <div>
            <h3>Current project status</h3>
            <p>
              [TEAM CONTENT REQUIRED] Describe completed work using precise
              language such as “designed,” “assembled,” “tested,” or
              “proposed.”
            </p>
          </div>
          <div>
            <h3>Limitations</h3>
            <p>
              [TEAM CONTENT REQUIRED] State what has not been demonstrated and
              what evidence would be needed next.
            </p>
          </div>
        </div>
      </PageSection>

      <CitationList
        citations={[
          {
            id: "description-1",
            text: "[TEAM CONTENT REQUIRED] Primary source supporting the problem context.",
          },
          {
            id: "description-2",
            text: "[TEAM CONTENT REQUIRED] Primary source supporting the proposed biological mechanism.",
          },
        ]}
      />
    </>
  );
}
