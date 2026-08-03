import {
  ContentNotice,
  InfoCard,
  PageSection,
  ResponsiveTable,
} from "../components/ContentBlocks";

export function Team() {
  return (
    <>
      <ContentNotice title="Names and portraits require consent">
        Team members, instructors, advisors, and collaborators will be added
        only after names, roles, biographies, photographs, and publication
        consent are confirmed. Do not include personal phone numbers, private
        email addresses, or unrelated personal details.
      </ContentNotice>

      <PageSection
        eyebrow="Worldshaper-Nanjing"
        title="Built by a multidisciplinary team"
        intro="This page will introduce the people behind the work while the formal Attributions Form records exactly who contributed to each activity."
      >
        <div className="card-grid card-grid--three">
          <InfoCard title="Student team">
            <p>[TEAM CONTENT REQUIRED] Approved names, roles, and short biographies.</p>
          </InfoCard>
          <InfoCard title="Instructors and PIs">
            <p>[TEAM CONTENT REQUIRED] Approved names and areas of supervision.</p>
          </InfoCard>
          <InfoCard title="Advisors and support">
            <p>[TEAM CONTENT REQUIRED] Approved contributors and support provided.</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection eyebrow="Responsibilities" title="Team role matrix" tone="tint">
        <ResponsiveTable
          caption="Team roles and consent status"
          headers={["Display name", "Role", "Areas of work", "Portrait approved", "Bio approved"]}
          rows={[
            [
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "Pending",
              "Pending",
            ],
            [
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "Pending",
              "Pending",
            ],
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Attribution" title="Credit must be precise">
        <div className="focus-statement">
          <p>
            [TEAM CONTENT REQUIRED] Link the final public Attributions Form and
            summarize the distinction between student work, supervision,
            institutional support, external collaboration, and AI-assisted
            development.
          </p>
        </div>
      </PageSection>
    </>
  );
}
