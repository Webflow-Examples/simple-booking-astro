// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

// Webflow Cloud sets one of these env vars at deploy time so the app is served
// under the configured mount path. Locally both are unset, so the app runs at "/".
const base =
  process.env.COSMIC_MOUNT_PATH || process.env.PUBLIC_BASE_PATH || "";

// https://astro.build/config
export default defineConfig({
  base,
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react()],
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? { "react-dom/server": "react-dom/server.edge" }
        : undefined,
    },
  },
});
