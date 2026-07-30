import {
  ContentNotice,
  PageSection,
  ResponsiveTable,
  Timeline,
} from "../components/ContentBlocks";

const cycleStages = [
  {
    label: "Design",
    title: "Define the requirement",
    body: (
      <p>
        [TEAM CONTENT REQUIRED] State the problem, constraints, proposed design,
        and expected performance before building.
      </p>
    ),
  },
  {
    label: "Build",
    title: "Create the testable system",
    body: (
      <p>
        [TEAM CONTENT REQUIRED] Record parts, methods, assembly evidence,
        deviations, and Registry identifiers.
      </p>
    ),
  },
  {
    label: "Test",
    title: "Measure against controls",
    body: (
      <p>
        [TEAM CONTENT REQUIRED] Provide raw-data links, controls, replicates,
        analysis methods, and uncertainties.
      </p>
    ),
  },
  {
    label: "Learn",
    title: "Use evidence to change the next design",
    body: (
      <p>
        [TEAM CONTENT REQUIRED] Explain what worked, what failed, and the exact
        design change that follows.
      </p>
    ),
  },
];

export function Engineering() {
  return (
    <>
      <ContentNotice title="Engineering evidence has not yet been supplied">
        This standard URL is ready for the team&apos;s real Design–Build–Test–Learn
        record. Add at least one complete iteration and connect the learning to
        a subsequent design decision.
      </ContentNotice>

      <PageSection
        eyebrow="Cycle 01"
        title="Engineering design cycle"
        intro="Each stage should be documented with dates, responsible team members, evidence, and links to the relevant experiment or Registry page."
      >
        <Timeline items={cycleStages} />
      </PageSection>

      <PageSection
        eyebrow="Traceability"
        title="Decision and evidence register"
        tone="tint"
      >
        <ResponsiveTable
          caption="Engineering decision register"
          headers={["Iteration", "Decision", "Evidence used", "Resulting change"]}
          rows={[
            [
              "Cycle 01",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
            ],
            [
              "Cycle 02",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
              "[TEAM CONTENT REQUIRED]",
            ],
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Next iteration" title="What the team will change">
        <div className="focus-statement">
          <p>
            [TEAM CONTENT REQUIRED] Summarize the evidence-based next design.
            If no second build was completed, state what would be changed and
            why rather than claiming an unperformed iteration.
          </p>
        </div>
      </PageSection>
    </>
  );
}
