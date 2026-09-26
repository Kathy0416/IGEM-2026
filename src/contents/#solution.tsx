import {
  ContentNotice,
  FigurePlaceholder,
  InfoCard,
  PageSection,
  ResponsiveTable,
} from "../components/ContentBlocks";

export function Solution() {
  return (
    <>
      <ContentNotice title="Proposed design—not a demonstrated therapy">
        Replace these fields with the team&apos;s approved design. Until results
        support stronger language, describe the system as a proposal,
        prototype, or research concept rather than a treatment.
      </ContentNotice>

      <PageSection
        eyebrow="Design concept"
        title="From sensing to a measurable output"
        intro="The final page should make each biological input, engineered component, output, and containment assumption explicit."
      >
        <div className="system-flow">
          {["Input", "Sensing", "Processing", "Output", "Validation"].map(
            (step, index) => (
              <div className="system-flow__step" key={step}>
                <span>0{index + 1}</span>
                <h3>{step}</h3>
                <p>[TEAM CONTENT REQUIRED]</p>
              </div>
            ),
          )}
        </div>
      </PageSection>

      <PageSection eyebrow="System" title="Proposed components" tone="tint">
        <div className="split-layout">
          <FigurePlaceholder
            title="System architecture"
            description="Provide a team-created diagram with part identifiers, directionality, and a complete figure legend."
          />
          <div className="card-stack">
            <InfoCard title="Chassis or platform">
              <p>[TEAM CONTENT REQUIRED] Identity, rationale, provenance, and safety status.</p>
            </InfoCard>
            <InfoCard title="Genetic design">
              <p>[TEAM CONTENT REQUIRED] Parts, assembly logic, and Registry links.</p>
            </InfoCard>
            <InfoCard title="Expected behavior">
              <p>[TEAM CONTENT REQUIRED] A testable expectation, not a claimed result.</p>
            </InfoCard>
          </div>
        </div>
      </PageSection>

      <PageSection eyebrow="Evaluation" title="How the concept will be tested">
        <ResponsiveTable
          caption="Proposed solution evaluation plan"
          headers={["Design question", "Measurement", "Control", "Success criterion"]}
          rows={[
            [
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
            ],
            [
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
            ],
          ]}
        />
      </PageSection>
    </>
  );
}
