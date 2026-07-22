import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Description() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Heidelberg", pageName: "description" },
    { year: 2025, teamName: "McGill", pageName: "description" },
    { year: 2025, teamName: "IZJU-China", pageName: "description" },
    { year: 2025, teamName: "GreatBay-SCIE", pageName: "description" },
    { year: 2024, teamName: "Marburg", pageName: "description" },
    { year: 2024, teamName: "EPFL", pageName: "description" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Bronze Medal Criterion #1: Wiki</h4>
            <p>Describe how and why you chose your iGEM project.</p>
            <hr />
            <p>
              Visit the{" "}
              <a href="https://competition.igem.org/judging/awards/medals">
                Medals page
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>What Should this Page Contain?</h2>
          <hr />
          <ul>
            <li>
              Explain the problem your project addresses and its potential
              impact.
            </li>
            <li>
              Provide a clear and concise summary of your project's goals and
              objectives.
            </li>
            <li>
              Detail the specific reasons why your team chose this project.
            </li>
            <li>
              Explain the inspiration behind your project, including any prior
              research or real-world problems that motivated your team.
            </li>
            <li>
              Use illustrations, diagrams, and other visual aids to enhance
              understanding.
            </li>
            <li>
              Include relevant scientific background, technical details, and
              experimental approaches.
            </li>
          </ul>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>Tips for Success</h2>
          <hr />
          <ul>
            <li>
              While providing detailed information, strive for clarity and
              conciseness.
            </li>
            <li>Use summaries and subheadings to organize your content.</li>
            <li>Utilize visuals to enhance understanding and engagement.</li>
            <li>Document your research process and sources thoroughly.</li>
          </ul>
        </div>
        <div className="col-lg-4">
          <h2>References</h2>
          <hr />
          <p>
            Cite all relevant research papers, scientific articles, and other
            sources that informed your project.
          </p>
          <p>
            Create a dedicated "References" section at the end of the page, and
            use a consistent citation style.
          </p>
        </div>
      </div>
    </>
  );
}
