import { Inspirations, InspirationLink } from "../components/Inspirations";

export function SafetyAndSecurity() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "HPI-Potsdam", pageName: "safety-and-security" },
    { year: 2025, teamName: "GU-Frankfurt", pageName: "safety-and-security" },
    { year: 2025, teamName: "UCalgary", pageName: "safety-and-security" },
    { year: 2025, teamName: "Uprize-I", pageName: "safety-and-security" },
    { year: 2025, teamName: "Tsukuba", pageName: "safety-and-security" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Safety and Security Award</h4>
            <p>
              If local people are to use synthetic biology to solve local
              problems around the world, it must be used safely and securely.
              The Safety and Security Committee challenges teams to apply
              biological engineering approaches to manage the risks involved.
              Can you take the next step toward knowledge, understanding, and
              tools that make synthetic biology safer and more secure?
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
          <h2>What Should this Page Contain?</h2>
          <hr />
          <p>
            Describe all potential safety and security risks associated with
            your project, including:
          </p>
          <ul>
            <li>
              Biological risks (e.g., pathogenicity, toxicity, environmental
              impact).
            </li>
            <li>Chemical risks (e.g., handling hazardous materials).</li>
            <li>Physical risks (e.g., equipment safety).</li>
            <li>Security risks (e.g., potential misuse of technology).</li>
          </ul>
          <p>
            Explain how you are addressing these risks and implementing safety
            measures.
          </p>
          <p>
            Detail any safety features incorporated into your project design,
            such as:
          </p>
          <ul>
            <li>Choice of a non-pathogenic chassis.</li>
            <li>
              Selection of parts that minimize harm to humans, animals, or
              plants;
            </li>
            <li>Substitution of safer materials in experiments;</li>
            <li>
              Implementation of "kill-switch" mechanisms or other safety
              controls.
            </li>
          </ul>
          <p>Explain the rationale behind these design choices.</p>
          <div className="bd-callout bd-callout-info">
            <p>
              Ensure that your project adheres to all safety requirements
              outlined in the{" "}
              <a href="https://responsibility.igem.org/safety-policies">
                Safety Policies page
              </a>
              .
            </p>
          </div>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
