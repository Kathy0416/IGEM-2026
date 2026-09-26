import {
  ContentNotice,
  InfoCard,
  PageSection,
  ResponsiveTable,
  Timeline,
} from "../components/ContentBlocks";

export function HumanPractices() {
  return (
    <>
      <ContentNotice title="Stakeholder records and consent required">
        Add only interactions that actually occurred. Record purpose, method,
        consent, key learning, and how the learning changed the project. Do not
        invent quotations or identify participants without permission.
      </ContentNotice>

      <PageSection
        eyebrow="Responsibility"
        title="How the world shapes the project"
        intro="Human Practices should show an evidence-backed feedback loop between stakeholder perspectives and technical decisions."
      >
        <div className="card-grid card-grid--three">
          <InfoCard title="Values">
            <p>[TEAM CONTENT REQUIRED] Which values guide the project and why?</p>
          </InfoCard>
          <InfoCard title="Stakeholders">
            <p>[TEAM CONTENT REQUIRED] Who may affect or be affected by the work?</p>
          </InfoCard>
          <InfoCard title="Responsiveness">
            <p>[TEAM CONTENT REQUIRED] What changed because the team listened?</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Integration"
        title="Engage, learn, change, revisit"
        tone="tint"
      >
        <Timeline
          items={[
            {
              label: "Engage",
              title: "Define the question together",
              body: <p>[TEAM CONTENT REQUIRED] Activity and consent approach.</p>,
            },
            {
              label: "Learn",
              title: "Document perspectives accurately",
              body: <p>[TEAM CONTENT REQUIRED] Evidence and key learning.</p>,
            },
            {
              label: "Change",
              title: "Integrate feedback into design",
              body: <p>[TEAM CONTENT REQUIRED] Specific technical or project change.</p>,
            },
            {
              label: "Revisit",
              title: "Return for evaluation",
              body: <p>[TEAM CONTENT REQUIRED] Follow-up and remaining disagreement.</p>,
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Traceability" title="Feedback-to-design matrix">
        <ResponsiveTable
          caption="Human Practices integration matrix"
          headers={["Stakeholder group", "Method", "Learning", "Project change", "Follow-up"]}
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
    </>
  );
}
