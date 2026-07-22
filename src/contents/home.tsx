import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Home() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Brno Czech Republic", pageName: "" },
    { year: 2025, teamName: "McGill", pageName: "" },
    { year: 2025, teamName: "GreatBay-SCIE", pageName: "" },
    { year: 2025, teamName: "EPFL", pageName: "" },
    { year: 2025, teamName: "Heidelberg", pageName: "" },
    { year: 2025, teamName: "Uprize-I", pageName: "" },
    { year: 2025, teamName: "IZJU-China", pageName: "" },
    { year: 2025, teamName: "Marburg", pageName: "" },
    { year: 2025, teamName: "Munich", pageName: "" },
    { year: 2025, teamName: "WageningenUR", pageName: "" },
  ];

  return (
    <>
      <div className="row">
        <div className="col">
          <h2>Essential First Steps</h2>
          <hr />
          <p>
            Familiarize yourself with the official iGEM competition rules,
            policies, and judging criteria:
          </p>
          <ul>
            <li>
              Carefully review the{" "}
              <a
                href="https://teams.igem.org/go/deliverables/wiki"
                target="_blank"
              >
                Wiki Requirements page
              </a>{" "}
              to ensure your wiki meets all necessary standards for judging and
              awards.
            </li>
            <li>
              Understand the criteria and required wiki pages for Gold, Silver,
              and Bronze Medals on the{" "}
              <a
                href="https://competition.igem.org/judging/awards/medals"
                target="_blank"
              >
                Medals page
              </a>
              .
            </li>
            <li>
              Explore the various Project Awards and their corresponding wiki
              requirements on the{" "}
              <a
                href="https://competition.igem.org/judging/awards/project"
                target="_blank"
              >
                Project Awards Page
              </a>
              .
            </li>
            <li>
              Discover the eligibility criteria and wiki requirements for
              Special Awards on the{" "}
              <a
                href="https://competition.igem.org/judging/awards/special"
                target="_blank"
              >
                Special Awards Page
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h2>Building Your Wiki</h2>
          <hr />
          <ul>
            <li>
              <b>Content First, Design Second</b>: Focus on clearly documenting
              your project, research, and activities. Design can be refined
              later.
            </li>
            <li>
              <b>Navigation is Key</b>: Structure your wiki with clear and
              intuitive navigation. Visitors should easily find information.
            </li>
            <li>
              <b>Accessibility Matters</b>: Use readable fonts, appropriate
              color contrast, and ensure your wiki is mobile-friendly.
            </li>
            <li>
              <b>Media Optimization</b>: Compress images and videos to reduce
              file sizes and improve loading times.
            </li>
            <li>
              <b>Document Early & Often</b>: Start documenting your project from
              day one. Don't wait until the Wiki Freeze.
            </li>
            <li>
              <b>Prepare for Deadlines</b>: Stay up-to-date with important
              deadlines and events by checking the{" "}
              <a
                href="https://competition.igem.org/about/calendar"
                target="_blank"
              >
                iGEM Competition Calendar
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>Tips for Success</h2>
          <hr />
          <ul>
            <li>
              <b>Clearly Define Your Project</b>: Explain your project's goals,
              methodology, and expected outcomes in a clear and concise manner.
            </li>
            <li>
              <b>Show Your Progress</b>: Regularly update your wiki with your
              team's progress, experiments, and results.
            </li>
            <li>
              <b>Engage Your Audience</b>: Consider your global audience and use
              language that is accessible to everyone.
            </li>
            <li>
              <b>Human Practices & Safety</b>: Thoroughly document your team's
              human practices activities and safety considerations.
            </li>
            <li>
              <b>Collaborate & Share</b>: Highlight collaborations with other
              teams and institutions.
            </li>
            <li>
              <b>Have Fun and Learn!</b> iGEM is a unique opportunity to learn,
              grow, and contribute to synthetic biology.
            </li>
          </ul>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
