// import { vitePlugin as remix } from "@remix-run/dev";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // remix({
    //   ignoredRouteFiles: ["**/*.css"],
    // }),
    tsconfigPaths(),
    sentryVitePlugin({
      org: "agora-des-ecrivains",
      project: "auth-platform",
    }),
  ],

  build: {
    sourcemap: true,
  },
});
