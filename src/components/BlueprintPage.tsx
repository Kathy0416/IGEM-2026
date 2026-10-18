import { Link } from "react-router-dom";
import { ContentNotice, FigurePlaceholder, PageSection, ResponsiveTable } from "./ContentBlocks";

type Block = { title: string; note: string; type?: "figure" | "table" | "steps"; fields?: string[] };
type Blueprint = { notice: string; sections: Block[]; related: { label: string; path: string }[] };

const required = "[TEAM CONTENT REQUIRED]";

const blueprints: Record<string, Blueprint> = {
  part: {
    notice: "Add only parts the team has designed or used. Verify Registry identifiers, sequences, and characterization before publication.",
    sections: [
      { title: "Parts at a glance", note: "List each part, its function, status, and verified Registry link.", type: "table", fields: ["Part and Registry link", "Function", "Status", "Evidence"] },
      { title: "Design rationale", note: "Explain the design choices and how each part serves the system.", type: "figure" },
      { title: "Assembly and characterization", note: "Show construct verification, controls, measurements, and linked experimental records.", type: "table", fields: ["Part", "Assembly evidence", "Characterization", "Method"] },
      { title: "Using these parts", note: "Document conditions, known limitations, and guidance for future teams.", type: "steps" },
    ], related: [{ label: "Experiments", path: "/experiments" }, { label: "Engineering", path: "/engineering" }],
  },
  protocol: {
    notice: "Publish only procedures actually used and checked against laboratory records. Add dates, authors, and versions.",
    sections: [
      { title: "Protocol index", note: "Find procedures by ID, purpose, and version.", type: "table", fields: ["ID", "Procedure", "Purpose", "Version and date"] },
      { title: "Materials and preparation", note: "List reagents, equipment, suppliers or Registry IDs, and safety prerequisites.", type: "table", fields: ["Protocol ID", "Materials", "Equipment", "Safety"] },
      { title: "Step-by-step procedures", note: "For each versioned procedure, record quantities, units, conditions, timing, and controls.", type: "steps" },
      { title: "Troubleshooting and changes", note: "Record deviations, observed failures, corrective actions, and links to notebook entries.", type: "table", fields: ["Version", "Issue", "Action", "Notebook entry"] },
    ], related: [{ label: "Experiments", path: "/experiments" }, { label: "Notebook", path: "/notebook" }],
  },
  measurement: {
    notice: "Measurement details and data await verification. Report actual units, calibration, controls, and uncertainty.",
    sections: [
      { title: "What we measure", note: "Define the quantity, why it matters, and the success criterion.", type: "figure" },
      { title: "Apparatus and calibration", note: "Document instruments, standards, settings, and calibration checks.", type: "table", fields: ["Instrument", "Setting or standard", "Calibration", "Record"] },
      { title: "Analysis and units", note: "Show the calculation, units, replicates, uncertainty, and data-processing method.", type: "steps" },
      { title: "Validation and reuse", note: "Compare controls and describe how another team can repeat the measurement.", type: "table", fields: ["Validation", "Result", "Evidence", "Limitation"] },
    ], related: [{ label: "Experiments", path: "/experiments" }, { label: "Model", path: "/model" }],
  },
  model: {
    notice: "Do not present predictions or validation as completed until supported by team code and data.",
    sections: [
      { title: "Question and model overview", note: "State the biological question and show how inputs become outputs.", type: "figure" },
      { title: "Assumptions and inputs", note: "Distinguish literature values, measurements, and chosen assumptions.", type: "table", fields: ["Parameter", "Value and unit", "Source", "Assumption"] },
      { title: "Method and implementation", note: "Document equations or algorithm, code version, and reproduction steps.", type: "steps" },
      { title: "Predictions and validation", note: "Compare predictions with relevant observations and state uncertainty.", type: "figure" },
      { title: "Sensitivity and limitations", note: "Show which assumptions matter most and where the model should not be applied.", type: "table", fields: ["Factor", "Test", "Effect", "Limit"] },
    ], related: [{ label: "Measurement", path: "/measurement" }, { label: "Engineering", path: "/engineering" }],
  },
  "binder-viewer": {
    notice: "The interactive binder data and visualization are pending. This page must remain understandable without an interactive viewer.",
    sections: [
      { title: "Purpose and instructions", note: "Explain what the viewer is for, what it can display, and how to read it.", type: "steps" },
      { title: "Binder viewer", note: "Reserve the interactive canvas and clearly labeled controls for verified binder structures.", type: "figure" },
      { title: "Interpreting the output", note: "Provide a static explanation of the essential comparison and what it does not establish.", type: "figure" },
      { title: "Data source and limitations", note: "Link model files, provenance, version, assumptions, and download instructions.", type: "table", fields: ["Dataset", "Source", "Version", "Limitations"] },
    ], related: [{ label: "Model", path: "/model" }, { label: "Description", path: "/description" }],
  },
  "safety-and-security": {
    notice: "The PI and safety lead must verify organisms, hazards, controls, approvals, and disposal before publication.",
    sections: [
      { title: "System and materials", note: "Identify chassis, parts, reagents, equipment, and intended use without implying approval.", type: "table", fields: ["Material or activity", "Purpose", "Classification", "Record"] },
      { title: "Hazards and controls", note: "Map each biological, laboratory, and use-context hazard to a concrete control.", type: "table", fields: ["Hazard", "Likelihood and impact", "Control", "Owner"] },
      { title: "Containment and disposal", note: "Describe training, handling, storage, transport, decontamination, and waste routes.", type: "steps" },
      { title: "Approvals and responsible use", note: "Record review status, relevant safety forms, and remaining ethical or security questions.", type: "table", fields: ["Review", "Status", "Evidence", "Next action"] },
    ], related: [{ label: "Experiments", path: "/experiments" }, { label: "Human Practices", path: "/human-practices" }],
  },
  "human-practices": {
    notice: "Publish stakeholder details and quotations only with consent and a verified record of the interaction.",
    sections: [
      { title: "Stakeholder map", note: "Identify affected groups, their concerns, and why the team engaged them.", type: "figure" },
      { title: "Engagement timeline", note: "List dated interactions, methods, and documented learning.", type: "table", fields: ["Date", "Stakeholder group", "Method", "Learning"] },
      { title: "Feedback changed the project", note: "Trace each meaningful input to a decision and a documented design or practice change.", type: "table", fields: ["Feedback", "Decision", "Project change", "Evidence"] },
      { title: "Unresolved concerns", note: "Explain disagreements, unanswered questions, consent limits, and next steps.", type: "steps" },
    ], related: [{ label: "Engineering", path: "/engineering" }, { label: "Education", path: "/education" }],
  },
  education: {
    notice: "Add only activities and learning outcomes documented by the team; obtain permission for identifiable participant media.",
    sections: [
      { title: "Audiences and learning goals", note: "Show who each activity served and what participants were meant to learn.", type: "table", fields: ["Audience", "Activity", "Learning goal", "Status"] },
      { title: "Activities and materials", note: "Present each activity with a visual, setting, delivery method, and reusable materials.", type: "figure" },
      { title: "Feedback and evaluation", note: "Describe how understanding was assessed and what the team changed.", type: "table", fields: ["Activity", "Feedback method", "Finding", "Change"] },
      { title: "Resources for reuse", note: "Provide approved downloads, licenses, language, age range, and facilitator notes.", type: "steps" },
    ], related: [{ label: "Human Practices", path: "/human-practices" }, { label: "Contribution", path: "/contribution" }],
  },
  entrepreneurship: {
    notice: "Market, cost, regulatory, and feasibility statements require team research and traceable sources.",
    sections: [
      { title: "Proposed use and users", note: "Define the intended use, user, setting, and unmet need.", type: "figure" },
      { title: "Value proposition", note: "Explain the proposed benefit and how it would be assessed against alternatives.", type: "table", fields: ["User need", "Proposed value", "Alternative", "Evidence"] },
      { title: "Feasibility and stakeholder evidence", note: "Summarize interviews, technical feasibility, costs, and regulatory questions.", type: "table", fields: ["Question", "Source", "Finding", "Confidence"] },
      { title: "Development path", note: "Show milestones from current research to a possible application without claiming readiness.", type: "steps" },
      { title: "Risks and open questions", note: "State technical, ethical, market, and access risks alongside next validation steps.", type: "table", fields: ["Risk", "Impact", "Evidence needed", "Next step"] },
    ], related: [{ label: "Human Practices", path: "/human-practices" }, { label: "Description", path: "/description" }],
  },
  attributions: {
    notice: "The official Attributions Form is the authoritative record. Verify names, roles, and consent before publication.",
    sections: [
      { title: "Contribution summary", note: "Explain how work was divided between students, supervisors, and outside contributors.", type: "figure" },
      { title: "People and support", note: "Credit each person or organization for specific work, not a generic acknowledgment.", type: "table", fields: ["Contributor", "Role", "Specific contribution", "Verification"] },
      { title: "Media and source credits", note: "Credit illustrations, photos, datasets, code, and prior work with licenses or permissions.", type: "table", fields: ["Asset or source", "Creator", "License", "Where used"] },
      { title: "Official attribution records", note: "Link the submitted iGEM Attributions Form and record AI-assisted development accurately.", type: "steps" },
    ], related: [{ label: "Team", path: "/team" }, { label: "Contribution", path: "/contribution" }],
  },
};

export function BlueprintPage({ page }: { page: keyof typeof blueprints }) {
  const blueprint = blueprints[page];
  return <>
    <ContentNotice title="Draft documentation">{blueprint.notice}</ContentNotice>
    {blueprint.sections.map((section, index) => <PageSection key={section.title} eyebrow={`${String(index + 1).padStart(2, "0")} / ${String(blueprint.sections.length).padStart(2, "0")}`} title={section.title} intro={section.note} tone={index % 2 ? "tint" : "light"}>
      {section.type === "figure" ? <FigurePlaceholder title={section.title} description="Replace this space with a verified, captioned team figure and its source or data record." /> : section.type === "table" ? <ResponsiveTable caption={section.title} headers={section.fields ?? []} rows={[(section.fields ?? []).map(() => required)]} /> : <div className="documentation-card"><p>{required} Add the documented procedure, decision, or resource here. Include dates, sources, linked evidence, and known limitations where relevant.</p></div>}
    </PageSection>)}
    <nav className="related-pages" aria-label="Related pages"><strong>Continue exploring</strong><div>{blueprint.related.map(({ label, path }) => <Link key={path} to={path}>{label} <span aria-hidden="true">→</span></Link>)}</div></nav>
  </>;
}
