// import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    // remix(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: ["node_modules/**", "build/**", "public/**"],
    },
  },
});
