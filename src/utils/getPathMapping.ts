import pages, { WikiPage } from "../pages.ts";

export const getPathMapping = () => {
  return pages.reduce<Record<string, WikiPage>>((map, page) => {
    map[page.path] = page;
    return map;
  }, {});
};
