import {browserslistToTargets, Targets} from "lightningcss";
import type {UserConfig} from "vite";
import {readFileSync} from "fs";
import {join} from "path";
import browserslist from "browserslist";

function getBrowserslistTargets(): Targets {
  try {
    // Check the user's package.json for a browserslist or browsers field, use it if found - otherwise use the defaults
    const packageJsonPath = join(process.cwd(), "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    const browsers = packageJson.browserslist || packageJson.browsers || browserslist('defaults');
    return browserslistToTargets(browsers);
  } catch (error) {
    return browserslistToTargets(browserslist('defaults'));
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
