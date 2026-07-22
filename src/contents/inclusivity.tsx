import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Inclusivity() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "USP-Brazil", pageName: "inclusivity" },
    { year: 2025, teamName: "SUSTech-BIO", pageName: "inclusivity" },
    { year: 2025, teamName: "DBHS-CA", pageName: "inclusivity" },
    { year: 2025, teamName: "Fudan", pageName: "inclusivity" },
    { year: 2025, teamName: "Technion-Israel", pageName: "inclusivity" },
    { year: 2025, teamName: "Thessaloniki", pageName: "inclusivity" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Inclusivity Award</h4>
            <p>
              This award recognizes exceptional efforts to include people with
              diverse identities in scientific research. Who gets a voice in
              iGEM, synthetic biology, and science more broadly? How have you
              created new opportunities to remove barriers and let more people
              contribute, participate, or be represented? Activities do not have
              to relate directly to your team's project. Document your approach,
              how you improved inclusivity, and what was learned.
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
            We should all recognize the importance of building an open and
            welcoming scientific community. A more diverse community involved in
            creating knowledge and technology is more likely to produce a more
            equitable and representative system. Every individual, regardless of
            background or experience, should have an equal opportunity to engage
            with scientific knowledge and technological development. Everyone
            should be able to share their opinions on the societal implications
            of research.
          </p>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
