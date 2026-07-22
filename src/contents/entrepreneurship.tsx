import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Entrepreneurship() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "WageningenUR", pageName: "entrepreneurship" },
    { year: 2025, teamName: "UNILausanne", pageName: "entrepreneurship" },
    { year: 2025, teamName: "SUSTech-BIO", pageName: "entrepreneurship" },
    { year: 2025, teamName: "SUIS-PINGHE", pageName: "entrepreneurship" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Best Entrepreneurship</h4>
            <p>
              This award recognizes exceptional effort to build a business case
              and commercialize an iGEM project, whether new or carried over
              from a previous year. Successful teams construct a business plan
              grounded in customer needs and expert input on feasibility, and
              create a minimum viable product.
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
