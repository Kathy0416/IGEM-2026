import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Measurement() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Aalto-Helsinki", pageName: "measurement" },
    { year: 2025, teamName: "EPFL", pageName: "measurement" },
    { year: 2025, teamName: "BNDS-China", pageName: "measurement" },
    { year: 2025, teamName: "Groningen", pageName: "measurement" },
    { year: 2025, teamName: "McMaster-Canada", pageName: "measurement" },
    { year: 2025, teamName: "Stuttgart", pageName: "measurement" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Measurement</h4>
            <p>
              Measurements are how you show that a system, physical or
              computational, behaves as expected, that data are reliable, and
              that a result actually matters. Strong contenders pick meaningful
              targets to measure, capture them precisely through experimental or
              computational methods, and report results clearly with appropriate
              units or metrics.
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
            {" "}
            If you've done excellent work in measurement, you should consider
            nominating your team for this special award. Synthetic Biology needs
            great measurement approaches for characterizing parts, and efficient
            new methods for characterizing many parts at once. If you've done
            something exciting in the area of Measurement, describe it here!
          </p>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
