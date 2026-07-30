import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { stringToSlug } from "./src/utils/stringToSlug";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  const teamName = env.VITE_TEAM_NAME || "Worldshaper-Nanjing";
  return defineConfig({
    base: `/${stringToSlug(teamName)}/`,
    plugins: [react()],
  });
};
