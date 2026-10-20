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
    server: {
      // Browser QA profiles contain locked databases that must not be watched.
      watch: { ignored: ["**/artifacts/**"] },
    },
    build: {
      rollupOptions: {
        output: { manualChunks: (id: string) => id.includes("node_modules") ? "vendor" : undefined },
      },
    },
  });
};
