import {browserslistToTargets, Targets} from "lightningcss";
import type {UserConfig} from "vite";
import {readFileSync, existsSync} from "fs";
import {join} from "path";
import browserslist from "browserslist";

function getBrowserslistTargets(): Targets {
  const defaultTargets: Targets = browserslistToTargets(browserslist(browserslist.defaults));
  try {
    const packageJsonPath = join(process.cwd(), "package.json");
    const browserslistRcPath = join(process.cwd(), ".browserslistrc");
    let browsers;

    // Check if .browserslistrc exists and use it if found
    if (existsSync(browserslistRcPath)) {
      browsers = browserslist.loadConfig({ path: process.cwd() });
    }
    // Otherwise, check package.json for browserslist config
    else if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      browsers = packageJson.browserslist;
    }

    // Fallback to defaultBrowsers if neither are found
    if (!browsers?.length) {
     return defaultTargets;
    }

    return browserslistToTargets(browserslist(browsers));
  } catch (error) {
    return defaultTargets;
  }
}

const defaultConfig: UserConfig = {
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: getBrowserslistTargets(),
    },
  },
  build: {
    cssMinify: "lightningcss",
  }
};

// Perform a deep merge of the default config with the user-provided config
const template = (inputs: UserConfig): UserConfig => ({
  css: {
    ...defaultConfig.css,
    ...(inputs.css || {}),
    lightningcss: {
      ...defaultConfig.css?.lightningcss,
      ...(inputs.css?.lightningcss || {}),
    },
  },
  build: {
    ...defaultConfig.build,
    ...(inputs.build || {}),
  },
  plugins: [...(defaultConfig.plugins || []), ...(inputs.plugins || [])],
}) as UserConfig;

/**
 * Get a shareable configuration object for the LightningCSS Vite plugin
 * @param userConfig - User-provided configuration to merge with the default configuration
 * @see Vite configuration documentation: https://vitejs.dev/config/
 */
export function getShareableLightningCssConfig(userConfig: UserConfig = {}): UserConfig {
  const inputs = {
    ...defaultConfig, // Merge default configuration
    ...userConfig, // Merge user-provided configuration
  } as UserConfig;

  return template(inputs); // Pass the already merged inputs to the template
}

export default defaultConfig;
