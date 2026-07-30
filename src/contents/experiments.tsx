import {
  ContentNotice,
  InfoCard,
  PageSection,
  ResponsiveTable,
} from "../components/ContentBlocks";

export function Experiments() {
  return (
    <>
      <ContentNotice title="Protocols must reflect work actually performed">
        Add versioned, reproducible protocols only after the team confirms the
        materials, equipment, conditions, controls, and safety requirements.
      </ContentNotice>

      <PageSection
        eyebrow="Protocol index"
        title="Experiments and methods"
        intro="Each protocol will receive a stable identifier so results and notebook entries can link back to the exact method used."
      >
        <div className="card-grid card-grid--three">
          <InfoCard number="EXP-01" title="Construct preparation">
            <p>[TEAM CONTENT REQUIRED] Purpose, version, and status.</p>
          </InfoCard>
          <InfoCard number="EXP-02" title="System characterization">
            <p>[TEAM CONTENT REQUIRED] Purpose, version, and status.</p>
          </InfoCard>
          <InfoCard number="EXP-03" title="Functional evaluation">
            <p>[TEAM CONTENT REQUIRED] Purpose, version, and status.</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection eyebrow="Reproducibility" title="Protocol record" tone="tint">
        <ResponsiveTable
          caption="Experiment protocol register"
          headers={["ID", "Materials", "Controls", "Output", "Safety reference"]}
          rows={[
            [
              "EXP-01",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
            ],
            [
              "EXP-02",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
            ],
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Documentation" title="What every protocol must include">
        <ul className="check-list">
          <li>Version, date, author, and linked notebook entry</li>
          <li>Materials with suppliers or Registry identifiers where relevant</li>
          <li>Step-by-step method with units, timings, and conditions</li>
          <li>Positive, negative, and process controls</li>
          <li>Data-processing method and predefined evaluation criteria</li>
          <li>Risk assessment, waste handling, and approval references</li>
        </ul>
      </PageSection>
    </>
  );
}
