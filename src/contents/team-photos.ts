// Portrait URLs per member id. Per the iGEM asset rules (and this repo's
// README), runtime images must be hosted on static.igem.wiki — they are NOT
// bundled from this repository. All 19 team portraits were uploaded through
// the iGEM uploads tool (Wiki → Uploads, folder "Team photos"), which stores
// them under teams/6508/wiki/team-photos/ and converts them to AVIF. Every
// URL was verified live (HTTP 200, image/avif) on 2026-08-31. Remember to
// record portrait consent before the site goes public (CONTENT_SOURCES.md).

const STATIC_BASE = "https://static.igem.wiki/teams/6508/wiki/team-photos/";

const photos: Record<string, string> = {
  jay: "jay.avif",
  aurora: "aurora.avif",
  kathy: "kathy.avif",
  jenny: "jenny.avif",
  eva: "eva.avif",
  ling: "ling.avif",
  "xu-yichen": "xu-yichen.avif",
  "letong-sun": "letong-sun.avif",
  "ding-yejia": "ding-yejia.avif",
  bella: "bella.avif",
  jackie: "jackie.avif",
  terry: "terry.avif",
  daisy: "daisy.avif",
  "yang-yifan": "yang-yifan.avif",
  "yue-yu": "yue-yu.avif",
  "wanxin-lu": "wanxin-lu.avif",
  "lu-jiabu": "lu-jiabu.avif",
  "wang-zimo": "wang-zimo.avif",
  billy: "billy.avif",
};

// Returns the full static.igem.wiki URL for a member's portrait, or an
// empty string while a portrait has not been uploaded yet (falls back to
// the initials avatar on the Team page).
export function photoFor(id: string): string {
  const value = photos[id];
  return value ? `${STATIC_BASE}${value}` : "";
}
