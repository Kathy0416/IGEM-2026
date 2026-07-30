import {
  ContentNotice,
  InfoCard,
  PageSection,
  ResponsiveTable,
} from "../components/ContentBlocks";

export function Contribution() {
  return (
    <>
      <ContentNotice title="Contribution deliverables awaiting completion">
        Describe only resources the team has actually produced and made
        accessible. Explain who can use each contribution, where it is hosted,
        how it was validated, and what license applies.
      </ContentNotice>

      <PageSection
        eyebrow="For future teams"
        title="Useful, documented, reusable"
        intro="A contribution should help others do something more effectively—not simply repeat a summary of our project."
      >
        <div className="card-grid card-grid--three">
          <InfoCard title="Resource">
            <p>[TEAM CONTENT REQUIRED] Protocol, part documentation, dataset, tool, or guidance.</p>
          </InfoCard>
          <InfoCard title="Evidence of usefulness">
            <p>[TEAM CONTENT REQUIRED] Testing, feedback, comparison, or demonstrated reuse.</p>
          </InfoCard>
          <InfoCard title="Access">
            <p>[TEAM CONTENT REQUIRED] Stable link, file format, license, and instructions.</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection eyebrow="Contribution index" title="What we are sharing" tone="tint">
        <ResponsiveTable
          caption="Team contributions"
          headers={["Contribution", "Intended user", "Validation", "Access", "License"]}
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

      <PageSection eyebrow="Reproducibility" title="How another team can build on it">
        <div className="focus-statement">
          <p>
            [TEAM CONTENT REQUIRED] Provide complete instructions, prerequisites,
            known limitations, version information, and a contact or issue
            process that does not expose personal information.
          </p>
        </div>
      </PageSection>
    </>
  );
}
