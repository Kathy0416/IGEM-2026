import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Hardware() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "TUDarmstadt", pageName: "hardware" },
    { year: 2025, teamName: "Cornell", pageName: "hardware" },
    { year: 2025, teamName: "SHSID", pageName: "hardware" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Hardware</h4>
            <p>
              This award is for teams who develop hardware for synthetic
              biology. Good iGEM hardware makes work with standard parts easier,
              faster, better, or more accessible: think a sensor that helps
              characterize parts, or a robot that automates experiments and
              cloning. Strong contenders demonstrate utility, user testing, and
              easy reproducibility.
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
            In addition to encouraging teams to work with DNA parts and build
            biological devices in the lab, iGEM also encourages other types of
            technical solutions for synthetic biology. This can include physical
            devices (hardware) related to robotic assembly, microfluidics,
            low-cost measurement devices, to name a few examples. There are many
            exciting opportunities for hardware innovation in synthetic biology.
          </p>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
