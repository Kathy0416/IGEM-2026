import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Members() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "McGill", pageName: "team" },
    { year: 2025, teamName: "EPFL", pageName: "team" },
    { year: 2024, teamName: "Waseda-Tokyo", pageName: "members" },
    { year: 2024, teamName: "Aachen", pageName: "team" },
    { year: 2024, teamName: "Patras", pageName: "team" },
  ];

  return (
    <>
      <div className="row">
        <div className="col-8">
          <h2>What Should this Page Contain?</h2>
          <hr />
          <ul>
            <li>
              Include pictures of your teammates, don't forget instructors and
              advisors!
            </li>
            <li>
              You can add a small biography or a few words from each team
              member, to tell us what you like, and what motivated you to
              participate in iGEM.
            </li>
            <li>
              Present your lab environment, your institution, and perhaps
              glimpses of your city or region.
            </li>
            <li>
              Showcase the expertise and guidance of your instructors and
              advisors.
            </li>
          </ul>
          <div className="bd-callout bd-callout-info">
            <strong>Important:</strong> Remember that your wiki will be archived
            and remain publicly accessible. Be mindful of the personal
            information you share. Avoid posting sensitive details. Be sure
            everyone shown in pictures agree to them being shown.
          </div>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
