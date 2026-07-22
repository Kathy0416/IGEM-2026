import { Inspirations, InspirationLink } from "../components/Inspirations";

export function AlternativePlatform() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "Brno Czech Republic", pageName: "plant" },
    { year: 2025, teamName: "NAIS", pageName: "plant" },
    { year: 2024, teamName: "Marburg", pageName: "plant" },
    { year: 2024, teamName: "SCU-China", pageName: "plant" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Alternative Platform</h4>
            <p>
              This award is designed to celebrate exemplary work done in
              alternative platforms, and covers anything that is not{" "}
              <i>E. coli</i>, <i>S. cerevisiae</i>, and <i>B. subtilis</i>. This
              award may be given to a team working in plant biology chassis,
              mammalian cells, cell-free platform, or non-model organisms. Show
              us what you made and remember to adhere to iGEM Safety Policies
              and guidelines!
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
      <Inspirations inspirationLinkList={links} />
    </>
  );
}
