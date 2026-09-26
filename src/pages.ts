import type { ComponentType } from "react";
import {
  Home,
  Description,
  Contribution,
  Engineering,
  Experiments,
  Part,
  Protocol,
  Measurement,
  Notebook,
  Safety,
  Model,
  BinderViewer,
  HumanPractices,
  Education,
  Entrepreneurship,
  Members,
  Attributions,
} from "./contents";

export type PageGroup = "Project" | "Wet Lab" | "Dry Lab" | "Human Practices" | "Team";

export interface WikiPage {
  name: string;
  title: string;
  path: string;
  component: ComponentType;
  lead: string;
  group?: PageGroup;
  layout?: "standard" | "immersive";
}

export const pages: WikiPage[] = [
  {
    name: "Home",
    title: "Strength Over Time",
    path: "/",
    component: Home,
    lead: "Worldshaper-Nanjing · iGEM 2026",
    layout: "immersive",
  },
  {
    name: "Description",
    title: "Project Description",
    path: "/description",
    component: Description,
    lead: "Why this question matters, what we propose, and how we will test it.",
    group: "Project",
  },
  {
    name: "Contribution",
    title: "Contribution",
    path: "/contribution",
    component: Contribution,
    lead: "Reusable resources and documentation for future iGEM teams.",
    group: "Project",
  },
  {
    name:"Engineering",
    title: "Engineering",
    path: "/engineering",
    component: Engineering,
    lead: "Follow design decisions through each build, test, and revision.",
    group: "Wet Lab",
  },
  {
    name:"Experiments",
    title: "Experiments",
    path: "/experiments",
    component: Experiments,
    lead: "Protocols, controls, materials, and reproducible experimental records.",
    group: "Wet Lab",
  },
  {
    name:"Part",
    title: "Part",
    path: "/part",
    component: Part,
    lead: "Part designs, Registry records, characterization, and reuse guidance.",
    group: "Wet Lab",
  },
  {
    name:"Protocol",
    title: "Protocol",
    path: "/protocol",
    component: Protocol,
    lead: "Versioned methods, materials, controls, and troubleshooting.",
    group: "Wet Lab",
  },
  {
    name:"Measurement",
    title: "Measurement",
    path: "/measurement",
    component: Measurement,
    lead: "Measurement methods, calibration, analysis, and validation.",
    group: "Wet Lab",
  },
  {
    name:"Notebook",
    title: "Notebook",
    path: "/notebook",
    component: Notebook,
    lead: "A record of our work, including successes and failures.",
    group: "Wet Lab",
  },
  {
    name:"Safety and Security",
    title: "Safety and Security",
    path: "/safety-and-security",
    component: Safety,
    lead: "Hazards, controls, containment, and responsible use.",
    group: "Wet Lab",
  },
  {
    name:"Model",
    title: "Model",
    path: "/model",
    component: Model,
    lead: "Assumptions, methods, predictions, validation, and limitations.",
    group: "Dry Lab",
  },
  {
    name:"Binder Viewer",
    title: "Binder Viewer",
    path: "/binder-viewer",
    component: BinderViewer,
    lead: "Explore binder designs and the evidence behind their interpretation.",
    group: "Dry Lab",
  },
  {
    name:"Human Practices",
    title: "Human Practices",
    path: "/human-practices",
    component: HumanPractices,
    lead: "See how stakeholder input shapes project decisions.",
    group: "Human Practices",
  },
  {
    name:"Education",
    title: "Education",
    path: "/education",
    component: Education,
    lead: "Learning activities, feedback, and materials others can reuse.",
    group: "Human Practices",
  },
  {
    name:"Entrepreneurship",
    title: "Entrepreneurship",
    path: "/entrepreneurship",
    component: Entrepreneurship,
    lead: "Proposed users, value, feasibility, and open questions.",
    group: "Human Practices",
  },
  {
    name:"Team",
    title: "Our Team",
    path: "/team",
    component: Members,
    lead: "Information about our team members.",
    group: "Team",
  },
  {
    name:"Attributions",
    title: "Attributions",
    path: "/attributions",
    component: Attributions,
    lead: "Acknowledgments and references for our work.",
    group: "Team",
  },
];

export default pages;
