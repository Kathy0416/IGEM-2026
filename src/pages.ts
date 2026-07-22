import {
  Contribution,
  Description,
  Problem,
  Engineering,
  Experiments,
  Home,
  HumanPractices,
  Notebook,
  Results,
  SafetyAndSecurity,
  Members,
  Education,
  Entrepreneurship,
  Hardware,
  Inclusivity,
  Measurement,
  Model,
  AlternativePlatform,
  Software,
  Sustainability,
} from "./contents";

interface Base {
  name: string | undefined;
}

class Folder implements Base {
  name: string | undefined;
  folder: Page[] | undefined;
}

class Page implements Base {
  name: string | undefined;
  title: string | undefined;
  path: string | undefined;
  component: React.FC | undefined;
  lead: string | undefined;
  layout: "standard" | "immersive" | undefined;
}

const Pages: (Page | Folder)[] = [
  {
    name: "Home",
    title: "Home",
    path: "/",
    component: Home,
    lead: "Your iGEM Journey Begins Here! We wish you a successful and rewarding season!",
  },
  {
    name: "Team",
    title: "Meet Our Team",
    path: "/team",
    component: Members,
    lead: "This page is dedicated to introducing the individuals who made our iGEM project possible. Here, you'll find information about our team members, instructors, and advisors.",
  },
  {
    name: "Project",
    folder: [
      {
        name: "Description",
        title: "Project Description",
        path: "/description",
        component: Description,
        lead: "Describe how and why you chose your iGEM project.",
      },
      {
        name: "Problem",
        title: "The Problem",
        path: "/problem",
        component: Problem,
        lead: "Understanding the progression and impact of sarcopenia.",
        layout: "immersive",
      },
      {
        name: "Engineering",
        title: "Engineering Success",
        path: "/engineering",
        component: Engineering,
        lead: "Demonstrate engineering success in a technical aspect of your project by going through at least one iteration of the engineering design cycle.",
      },
      {
        name: "Results",
        title: "Results",
        path: "/results",
        component: Results,
        lead: "Present the results of your project, along with a detailed analysis and discussion of their significance. Also outline future plans and reflections on the impact of your project.",
      },
      {
        name: "Contribution",
        title: "Contribution",
        path: "/contribution",
        component: Contribution,
        lead: "Make a useful contribution for future iGEM teams and document it on this page.",
      },
    ],
  },
  {
    name: "Wet Lab",
    folder: [
      {
        name: "Experiments",
        title: "Experiments",
        path: "/experiments",
        component: Experiments,
        lead: "Describe the research, experiments, and protocols you used in your project. It is designed to provide sufficient information for other teams to replicate our work.",
      },
      {
        name: "Notebook",
        title: "Notebook",
        path: "/notebook",
        component: Notebook,
        lead: "This serves as a chronological record of your team's progress throughout the season. It documents your daily activities, experiments, discussions, and decisions.",
      },
      {
        name: "Measurement",
        title: "Measurement",
        path: "/measurement",
        component: Measurement,
        lead: "Synthetic Biology needs great measurement approaches for characterizing parts, and efficient new methods for characterizing many parts at once. Describe your measurement approaches on this page.",
      },
      {
        name: "Alternative Platform",
        title: "Alternative Platform",
        path: "/alternative-platform",
        component: AlternativePlatform,
        lead: "This award is designed to celebrate exemplary work done in alternative platforms, and covers anything that is not E. coli, S. cerevisiae, and B. subtilis.",
      },
      {
        name: "Safety and Security",
        title: "Safety and Security",
        path: "/safety-and-security",
        component: SafetyAndSecurity,
        lead: "Detail the safety and security considerations of your project, adressing potential risks and outlining the measures taken to mitigate them.",
      },
    ],
  },
  {
    name: "Dry Lab",
    folder: [
      {
        name: "Model",
        title: "Model",
        path: "/model",
        component: Model,
        lead: "Explain your model's assumptions, data, parameters, and results in a way that anyone could understand.",
      },
      {
        name: "Software",
        title: "Software",
        path: "/software",
        component: Software,
        lead: "Software in iGEM should make synthetic biology based on standard parts easier, faster, better or more accessible to our community.",
      },
      {
        name: "Hardware",
        title: "Hardware",
        path: "/hardware",
        component: Hardware,
        lead: "Hardware in iGEM should make synthetic biology based on standard parts easier, faster, better, or more accessible to our community.",
      },
    ],
  },
  {
    name: "Engagement",
    folder: [
      {
        name: "Entrepreneurship",
        title: "Entrepreneurship",
        path: "/entrepreneurship",
        component: Entrepreneurship,
        lead: "The entrepreneurship award recognizes exceptional effort to build a business case and commercialize an iGEM project.",
      },
      {
        name: "Human Practices",
        title: "Human Practices",
        path: "/human-practices",
        component: HumanPractices,
        lead: "We ask every team to think deeply and creatively about whether their project is responsible and good for the world. Consider how the world affects your work and how your work affects the world.",
      },
      {
        name: "Education",
        title: "Education",
        path: "/education",
        component: Education,
        lead: "Innovative educational tools and outreach activities have the ability to establish a two-way dialogue with new communities by discussing public values and the science behind synthetic biology.",
      },
      {
        name: "Inclusivity",
        title: "Diversity and Inclusion",
        path: "/inclusivity",
        component: Inclusivity,
        lead: "Every individual, regardless of background or experience, should have an equal opportunity to engage with scientific knowledge and technological development.",
      },
      {
        name: "Sustainability",
        title: "Sustainability",
        path: "/sustainability",
        component: Sustainability,
        lead: "Describe how you have evaluated your project ideas against one or more of the SDGs.",
      },
    ],
  },
];

export default Pages;
