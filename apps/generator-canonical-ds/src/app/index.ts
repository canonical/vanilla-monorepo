import * as fs from "node:fs";
import path from "node:path";
import Generator from "yeoman-generator";

export default class BaseGenerator extends Generator {
  constructor(args: string | string[], options: Generator.GeneratorOptions) {
    super(args, options);

    // Expose base context to subgenerators
    const pkgJson = require("../../package.json");
    this.config.set("pkg", pkgJson.name);
    this.config.set("version", pkgJson.version);
    this.config.set("namespace", "ds");
  }

  /**
   * Retrieve a list of available subgenerators.
   */
  private getSubgenerators(): string[] {
    const subgeneratorDir = path.resolve(path.join(__dirname, ".."));

    return (
      fs
        .readdirSync(subgeneratorDir, { withFileTypes: true })
        // Exclude irrelevant entries
        .filter(
          (entry) =>
            entry.isDirectory() &&
            entry.name !== "app" &&
            entry.name !== "templates",
        )
        .map((entry) => entry.name)
    );
  }

  help(): string {
    // Custom help output to include available subgenerators
    const baseHelp = super.help();
    const subgenerators = this.getSubgenerators();

    const subgeneratorsList = subgenerators.length
      ? `\nAvailable subgenerators:\n  ${subgenerators.join("\n  ")}\n`
      : "\nNo subgenerators available.\n";

    return `${baseHelp}${subgeneratorsList}`;
  }

  /**
   * Dynamically resolve the template path for the subgenerator.
   * @param pathSegments - Additional path segments to append.
   * @returns The resolved path.
   * @example
   * // Calling from `./component/index.ts`
   * templatePath("index.ts")`// returns `./app/templates/component/index.ts`
   */
  templatePath(...pathSegments: string[]): string {
    const buildDir = path.resolve(__dirname, "../");
    const subgeneratorName = path.basename(path.dirname(this.resolved));

    return super.templatePath(
      path.join(buildDir, `./templates/${subgeneratorName}`),
      ...pathSegments,
    );
  }

  async default() {
    const { subgenerator } = this.options;
    try {
      this.composeWith(require.resolve(`./${subgenerator}`));
    } catch (error) {
      if (subgenerator?.length) {
        this.log(`Generator "${subgenerator}" not found.`);
      }
      process.exit(1);
    }
  }
}
