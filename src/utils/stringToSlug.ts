export function stringToSlug(string: string): string {
  let slug = String(string).toLowerCase();
  slug = slug.replace(/[^a-z0-9-]/g, "-");
  slug = slug.replace(/-+/g, "-");
  // remove dashes at start and end
  const start = slug.search(/[^-]/); // find index of first non-dash
  const end = slug.search(/-+$/); // find index of first end dash
  return slug.substring(start, end === -1 ? undefined : end);
}
