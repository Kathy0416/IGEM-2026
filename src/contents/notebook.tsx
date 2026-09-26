import {
  ContentNotice,
  PageSection,
  ResponsiveTable,
  Timeline,
} from "../components/ContentBlocks";

export function Notebook() {
  return (
    <>
      <ContentNotice title="Chronology awaiting laboratory records">
        This is intentionally a readable chronological activity log. Add dated
        entries from the team&apos;s actual notebook and link each technical
        entry to its protocol, data, and engineering cycle.
      </ContentNotice>

      <PageSection eyebrow="Find an entry" title="Browse the season record">
        <p>[TEAM CONTENT REQUIRED] Add dated entries with workstream labels as records become available. Keep the newest and earliest dates clear and link each entry to its source record.</p>
      </PageSection>

      <PageSection
        eyebrow="Season record"
        title="Decisions over time"
        intro="Entries should document decisions and setbacks as carefully as successful work."
      >
        <Timeline
          items={[
            {
              label: "Date required",
              title: "Project definition",
              body: <p>[TEAM CONTENT REQUIRED] Decision, participants, and evidence.</p>,
            },
            {
              label: "Date required",
              title: "First technical milestone",
              body: <p>[TEAM CONTENT REQUIRED] Work completed, observations, and files.</p>,
            },
            {
              label: "Date required",
              title: "Learning and revision",
              body: <p>[TEAM CONTENT REQUIRED] What changed and where it is documented.</p>,
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Index" title="Notebook entry register" tone="tint">
        <ResponsiveTable
          caption="Notebook entries"
          headers={["Date", "Area", "Activity", "Outcome", "Linked evidence"]}
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
