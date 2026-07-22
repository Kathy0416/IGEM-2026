import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { stringToSlug } from "./src/utils/stringToSlug";

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv("dev", process.cwd());
  return defineConfig({
    base: `/${stringToSlug(env.VITE_TEAM_NAME)}/`,
    plugins: [react()],
  });
};
