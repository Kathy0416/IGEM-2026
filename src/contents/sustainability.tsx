import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Sustainability() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Aalto-Helsinki", pageName: "sustainability" },
    { year: 2025, teamName: "EPFL", pageName: "sustainability" },
    { year: 2025, teamName: "AIS-China", pageName: "sustainability" },
    { year: 2025, teamName: "Lund", pageName: "sustainability" },
    { year: 2025, teamName: "Boston-BOSLab", pageName: "sustainability" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Sustainable Development Impact</h4>
            <p>
              The Sustainable Development Goals (SDGs) are a call to action on
              global environmental, social, and economic challenges, and this
              award is your team's way to answer that call. Demonstrate how you
              have evaluated your project ideas against one or more SDGs,
              consulted SDG stakeholders, and started to build collaborations
              with other iGEM teams around the goals. You are encouraged to
              revisit previous iGEM projects, evaluate them against the SDGs,
              and build on them.
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
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
