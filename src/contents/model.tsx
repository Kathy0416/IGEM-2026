import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Model() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Heidelberg", pageName: "model" },
    { year: 2025, teamName: "Peking", pageName: "model" },
    { year: 2025, teamName: "GreatBay-SCIE", pageName: "model" },
    { year: 2025, teamName: "DTU-Denmark", pageName: "model" },
    { year: 2025, teamName: "Munich", pageName: "model" },
    { year: 2025, teamName: "Toronto", pageName: "model" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Model</h4>
            <p>
              Models help us understand, predict, and design biological systems.
              Mechanistic modeling, machine learning, and other computational
              approaches can guide project design and deepen understanding of
              the system being studied, especially when grounded in data from
              the team's own experiments or from existing sources. This award is
              for teams who build or apply a model and use it to inform design,
              predict behavior, or interpret results, before or alongside their
              experimental work.
            </p>
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
          <h2>Overview</h2>
          <hr />
          <p>
            Mathematical models and computer simulations provide a great way to
            describe the function and operation of Parts and Devices. Synthetic
            Biology is an engineering discipline, and part of engineering is
            simulation and modeling to determine the behavior of your design
            before you build it. Designing and simulating can be iterated many
            times in a computer before moving to the lab.
          </p>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
