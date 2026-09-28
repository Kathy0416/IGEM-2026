import type { ComponentType } from "react";
import { Home, Members } from "./contents";
import type { ReadingLayout } from "./components/ArticlePage";

export type PageGroup = "Project" | "Wet Lab" | "Dry Lab" | "Human Practices" | "Team";

export interface WikiPage {
  name: string;
  title: string;
  path: string;
  component?: ComponentType;
  readingLayout?: ReadingLayout;
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
    lead: "The context, motivation, and scope of our proposed project.",
    group: "Project",
  },
  {
    name: "Contribution",
    title: "Contribution",
    path: "/contribution",
    lead: "The context, motivation, and scope of our proposed project.",
    group: "Project",
  },
  {
    name:"Engineering",
    title: "Engineering",
    path: "/engineering",
    readingLayout: "cycles",
    lead: "Document iterative technical work.",
    group: "Wet Lab",
  },
  {
    name:"Experiments",
    title: "Experiments",
    path: "/experiments",
    lead: "Protocols, controls, materials, and reproducible experimental records.",
    group: "Wet Lab",
  },
  {
    name:"Part",
    title: "Part",
    path: "/part",
    lead: "Description of the parts we have designed.",
    group: "Wet Lab",
  },
  {
    name:"Protocol",
    title: "Protocol",
    path: "/protocol",
    readingLayout: "protocols",
    lead: "Description of the protocols we have designed.",
    group: "Wet Lab",
  },
  {
    name:"Measurement",
    title: "Measurement",
    path: "/measurement",
    lead: "Description of the measurements we have designed.",
    group: "Wet Lab",
  },
  {
    name:"Notebook",
    title: "Notebook",
    path: "/notebook",
    readingLayout: "notebook",
    lead: "A record of our work, including successes and failures.",
    group: "Wet Lab",
  },
  {
    name:"Safety and Security",
    title: "Safety and Security",
    path: "/safety-and-security",
    lead: "Description of the safety measures we have designed.",
    group: "Wet Lab",
  },
  {
    name:"Model",
    title: "Model",
    path: "/model",
    lead: "Description of the model we have designed.",
    group: "Dry Lab",
  },
  {
    name:"Binder Viewer",
    title: "Binder Viewer",
    path: "/binder-viewer",
    readingLayout: "viewer",
    lead: "Interactive visualization of our binder designs.",
    group: "Dry Lab",
  },
  {
    name:"Human Practices",
    title: "Human Practices",
    path: "/human-practices",
    lead: "Description of the iHP we have designed.",
    group: "Human Practices",
  },
  {
    name:"Education",
    title: "Education",
    path: "/education",
    lead: "Description of the education initiatives we have designed.",
    group: "Human Practices",
  },
  {
    name:"Entrepreneurship",
    title: "Entrepreneurship",
    path: "/entrepreneurship",
    lead: "Description of the entrepreneurship initiatives we have designed.",
    group: "Human Practices",
  },
  {
    name:"Team",
    title: "Our Team",
    path: "/team",
    readingLayout: "team",
    component: Members,
    lead: "Information about our team members.",
    group: "Team",
  },
  {
    name:"Attributions",
    title: "Attributions",
    path: "/attributions",
    lead: "Acknowledgments and references for our work.",
    group: "Team",
  },
];

export default pages;
