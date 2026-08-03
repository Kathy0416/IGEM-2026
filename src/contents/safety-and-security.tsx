import {
  ContentNotice,
  InfoCard,
  PageSection,
  ResponsiveTable,
} from "../components/ContentBlocks";

export function SafetyAndSecurity() {
  return (
    <>
      <ContentNotice title="Safety details require PI and team confirmation">
        This page does not replace iGEM safety forms or institutional approval.
        Add organisms, parts, procedures, containment, training, approvals, and
        disposal practices only after verification by the responsible team
        members and PI.
      </ContentNotice>

      <PageSection
        eyebrow="Safety by design"
        title="Identify hazards before work begins"
        intro="The final safety record should connect each hazard to exposure routes, existing controls, residual risk, and responsible oversight."
      >
        <div className="card-grid card-grid--three">
          <InfoCard title="Biological">
            <p>[TEAM CONTENT REQUIRED] Organisms, parts, activities, and containment.</p>
          </InfoCard>
          <InfoCard title="Laboratory">
            <p>[TEAM CONTENT REQUIRED] Equipment, chemicals, training, and waste.</p>
          </InfoCard>
          <InfoCard title="Use context">
            <p>[TEAM CONTENT REQUIRED] Misuse, deployment, environmental, and equity risks.</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection eyebrow="Risk register" title="Hazards and controls" tone="tint">
        <ResponsiveTable
          caption="Project risk register"
          headers={["Hazard", "Who/what is exposed", "Control", "Residual risk", "Owner"]}
          rows={[
            [
              "[TEAM CONTENT REQUIRED]",
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
              "[TEAM CONTENT REQUIRED]",
            ],
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Governance" title="Approvals and documentation">
        <ul className="check-list">
          <li>[TEAM CONTENT REQUIRED] Institutional biosafety approval or status</li>
          <li>[TEAM CONTENT REQUIRED] iGEM safety-form and check-in status</li>
          <li>[TEAM CONTENT REQUIRED] Training and supervision records</li>
          <li>[TEAM CONTENT REQUIRED] Incident and waste-management procedures</li>
          <li>[TEAM CONTENT REQUIRED] Safety changes resulting from design reviews</li>
        </ul>
      </PageSection>
    </>
  );
}
