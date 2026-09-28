import {
  ContentNotice,
  FigurePlaceholder,
  InfoCard,
  PageSection,
  ResponsiveTable,
} from "../components/ContentBlocks";

export function Results() {
  return (
    <>
      <ContentNotice title="No experimental results have been entered">
        The previous site&apos;s numerical outcomes were illustrative and have
        been removed. Add only team-generated data with controls, sample sizes,
        analysis methods, uncertainty, and raw-data provenance.
      </ContentNotice>

      <PageSection
        eyebrow="Evidence"
        title="Results at a glance"
        intro="This summary will report what was measured and what the evidence supports—without turning expectations into conclusions."
      >
        <div className="card-grid card-grid--three">
          <InfoCard title="Build verification">
            <p>[TEAM CONTENT REQUIRED] Method, outcome, and evidence link.</p>
          </InfoCard>
          <InfoCard title="Characterization">
            <p>[TEAM CONTENT REQUIRED] Measurement, controls, and uncertainty.</p>
          </InfoCard>
          <InfoCard title="Functional test">
            <p>[TEAM CONTENT REQUIRED] Outcome and limits of interpretation.</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection eyebrow="Data" title="Figures and analysis" tone="tint">
        <div className="figure-grid">
          <FigurePlaceholder
            title="Primary result"
            description="Include axes, units, sample size, error definition, statistical method, and a complete caption."
          />
          <FigurePlaceholder
            title="Control comparison"
            description="Show the controls needed to interpret the primary result and link the underlying data."
          />
        </div>
      </PageSection>

      <PageSection eyebrow="Interpretation" title="Claims mapped to evidence">
        <ResponsiveTable
          caption="Result interpretation register"
          headers={["Observation", "Evidence", "Supported conclusion", "Limitation"]}
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

      <PageSection eyebrow="Reflection" title="What failed and what comes next">
        <div className="claim-boundary">
          <div>
            <h3>Unexpected or negative results</h3>
            <p>[TEAM CONTENT REQUIRED] Report honestly and connect to learning.</p>
          </div>
          <div>
            <h3>Next experiment</h3>
            <p>[TEAM CONTENT REQUIRED] State the next test and why it matters.</p>
          </div>
        </div>
      </PageSection>
    </>
  );
}
