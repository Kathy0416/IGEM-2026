// Portrait URLs per member id. Per the iGEM asset rules (and this repo's
// README), runtime images must be hosted on static.igem.wiki — they are NOT
// bundled from this repository. Upload each portrait via the iGEM uploads
// tool, then put the uploaded filename in the matching slot below. While a
// slot is empty, the Team page automatically falls back to the initials
// avatar. Source files (extracted from the team docx) are kept locally
// outside the repository, pending upload and consent tracking.

const STATIC_BASE = "https://static.igem.wiki/2026/worldshaper-nanjing/team/";

const photos: Record<string, string> = {
  jay: "",
  aurora: "",
  kathy: "",
  jenny: "",
  eva: "",
  ling: "",
  "xu-yichen": "",
  "letong-sun": "",
  "ding-yejia": "",
  bella: "",
  jackie: "",
  terry: "",
  daisy: "",
  "yang-yifan": "",
  "yue-yu": "",
  "wanxin-lu": "",
  "lu-jiabu": "",
  "wang-zimo": "",
  billy: "",
};

// Returns the full static.igem.wiki URL for a member's portrait, or an
// empty string while the portrait has not been uploaded yet.
export function photoFor(id: string): string {
  const value = photos[id];
  return value ? `${STATIC_BASE}${value}` : "";
}
