import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import type { UserConfig } from "vite";

export default {
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(browserslist(">= 0.25%")),
    },
  },
  build: {
    cssMinify: "lightningcss",
  },
} satisfies UserConfig;
