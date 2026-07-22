import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Software() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Marburg", pageName: "software" },
    { year: 2025, teamName: "Munich", pageName: "software" },
    { year: 2025, teamName: "EPFL", pageName: "software" },
    { year: 2025, teamName: "Lambert-GA", pageName: "software" },
    { year: 2025, teamName: "BIT-China", pageName: "software" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Software</h4>
            <p>
              iGEM projects often build or adapt computational tools to move
              their work forward. Born out of practical need, these tools can be
              surprisingly useful for others, and they don't have to be large or
              complex to make a real difference. This award finds and honors
              such "nuggets" of computational work.
            </p>
            <p>To be eligible:</p>
            <ul>
              <li>
                Your software must be documented and released under an
                OSI-approved open-source license.
              </li>
              <li>
                The source code must be hosted on the dedicated repository in
                iGEM's GitLab. See the{" "}
                <a href="https://teams.igem.org/go/deliverables/software">
                  Software Project
                </a>{" "}
                page for full requirements.
              </li>
              <li>
                Software &amp; AI Village teams are not eligible for this award.
              </li>
            </ul>
            <hr />
            <p>
              Visit the{" "}
              <a href="https://competition.igem.org/judging/awards/special">
                Special Awards page
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
          <p>
            This page should aim to make your software accessible and
            understandable to a wide audience, supplementing the detailed
            technical documentation available on the repository.
          </p>
          <ul>
            <li>
              Provide a clear and concise overview of the software's purpose and
              functionality.
            </li>
            <li>
              Use non-technical language to make it accessible to a broad
              audience.
            </li>
            <li>
              Create step-by-step instructions on how to use the software.
            </li>
            <li>Include screenshots and visual aids to guide users.</li>
            <li>
              Explain how to integrate the software with other tools or
              platforms.
            </li>
            <li>
              Explain the key design choices made during the software's
              development.
            </li>
            <li>
              Discuss any trade-offs or compromises made during the design
              process.
            </li>
            <li>
              Provide a high-level overview of the software's architecture.
            </li>
            <li>
              Provide clear instructions on how to deploy and install the
              software.
            </li>
            <li>Provide an overview of the software's API, if applicable.</li>
          </ul>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
