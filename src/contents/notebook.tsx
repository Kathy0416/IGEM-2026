import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Notebook() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "EPFL", pageName: "notebook" },
    { year: 2025, teamName: "WageningenUR", pageName: "notebook" },
    { year: 2024, teamName: "JU-Krakow", pageName: "notebook" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>What Should this Page Contain?</h2>
          <hr />
          <ul>
            <li>
              Record all activities in chronological order, with each entry
              clearly dated.
            </li>
            <li>Provide sufficient detail for each activity, including:</li>
            <ul>
              <li>Purpose of the activity.</li>
              <li>Methods and procedures used.</li>
              <li>Results obtained.</li>
              <li>Observations and notes.</li>
            </ul>
            <li>
              Document all experiments, protocols, data analysis, meetings,
              brainstorming sessions, and other project-related activities.
            </li>
            <li>
              Include photos, videos, and diagrams to illustrate your progress.
            </li>
            <li>Indicate which team members participated in each activity.</li>
          </ul>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
