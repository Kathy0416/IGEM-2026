import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Experiments() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Heidelberg", pageName: "experiments" },
    { year: 2025, teamName: "McGill", pageName: "experiments" },
    { year: 2025, teamName: "EPFL", pageName: "experiments" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>What Should this Page Contain?</h2>
          <hr />
          <p>
            Provide comprehensive, step-by-step protocols for all experiments
            conducted. Include a list of materials, reagents, and equipment
            used. Specify concentrations, volumes, incubation times,
            temperatures, and other critical parameters. Document any
            modifications or optimizations made to standard protocols.
          </p>
          <p>
            Explain the purpose of each experiment and its relevance to your
            project goals. Describe the experimental design, including controls
            and replicates. Provide a clear rationale for the chosen methods and
            approaches.
          </p>
          <p>
            Document any troubleshooting steps taken and optimizations made
            during the experimental process. Share any lessons learned that
            could benefit future teams.
          </p>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
