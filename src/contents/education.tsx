import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Education() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Heidelberg", pageName: "education" },
    { year: 2025, teamName: "Queens-Canada", pageName: "education" },
    { year: 2025, teamName: "GreatBay-SCIE", pageName: "education" },
    { year: 2025, teamName: "BNU-China", pageName: "education" },
    { year: 2025, teamName: "Leiden", pageName: "education" },
    { year: 2025, teamName: "JLU-CP", pageName: "education" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Education</h4>
            <p>
              Innovative educational and outreach activities open a two-way
              dialogue with new communities about the science and public values
              behind synthetic biology. Activities do not have to relate
              directly to your project; they can address wider issues in iGEM or
              synthetic biology. The only requirement is that they promote
              scientific learning rather than market iGEM or synthetic biology.
              Document your approach and what everyone involved learned.
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
