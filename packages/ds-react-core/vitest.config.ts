import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

export default mergeConfig(
  // Base the test config on the base vite config
  viteConfig,
  defineConfig({
    build: {
      // include sourcemaps for easier debugging
      sourcemap: true,
    },
    test: {
      // use JS DOM for browser-like test environment
      environment: "jsdom",
      // include vite globals for terser test code
      globals: true,
      setupFiles: ["./vitest.setup.ts"],
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    },
  }),
);
