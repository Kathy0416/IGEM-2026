import type { ComponentType } from "react";
import {
  Contribution,
  Description,
  Engineering,
  Experiments,
  Home,
  HumanPractices,
  Notebook,
  Problem,
  Results,
  SafetyAndSecurity,
  Solution,
  Team,
} from "./contents";

export type PageGroup = "Project" | "Research" | "People";

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
    lead: "The context, motivation, and scope of our proposed project.",
    group: "Project",
  },
  {
    name: "Problem",
    title: "The Problem",
    path: "/problem",
    component: Problem,
    lead: "Exploring age-related muscle loss and the questions our team aims to address.",
    group: "Project",
  },
  {
    name: "Solution",
    title: "Proposed Solution",
    path: "/solution",
    component: Solution,
    lead: "Our developing synthetic biology concept and its intended design logic.",
    group: "Project",
  },
  {
    name: "Engineering",
    title: "Engineering",
    path: "/engineering",
    component: Engineering,
    lead: "Documenting each Design–Build–Test–Learn iteration with evidence.",
    group: "Research",
  },
  {
    name: "Experiments",
    title: "Experiments",
    path: "/experiments",
    component: Experiments,
    lead: "Protocols, controls, materials, and reproducible experimental records.",
    group: "Research",
  },
  {
    name: "Notebook",
    title: "Notebook",
    path: "/notebook",
    component: Notebook,
    lead: "A chronological record of decisions, work, setbacks, and learning.",
    group: "Research",
  },
  {
    name: "Results",
    title: "Results",
    path: "/results",
    component: Results,
    lead: "Team-generated evidence, analysis, limitations, and next steps.",
    group: "Research",
  },
  {
    name: "Human Practices",
    title: "Human Practices",
    path: "/human-practices",
    component: HumanPractices,
    lead: "How stakeholder perspectives and responsibility shape our project.",
    group: "People",
  },
  {
    name: "Safety",
    title: "Safety and Security",
    path: "/safety-and-security",
    component: SafetyAndSecurity,
    lead: "Identifying risks and documenting the measures used to manage them.",
    group: "People",
  },
  {
    name: "Contribution",
    title: "Contribution",
    path: "/contribution",
    component: Contribution,
    lead: "Resources and knowledge our team will make useful to future iGEM teams.",
    group: "People",
  },
  {
    name: "Team",
    title: "Our Team",
    path: "/team",
    component: Team,
    lead: "The people, roles, and support behind Worldshaper-Nanjing.",
    group: "People",
  },
];

export default pages;
