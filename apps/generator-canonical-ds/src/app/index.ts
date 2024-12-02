import * as fs from "node:fs";
import path from "node:path";
import Generator from "yeoman-generator";

export default class BaseGenerator extends Generator {
  constructor(args: string | string[], options: Generator.GeneratorOptions) {
    super(args, options);

    // Expose base context to subgenerators
    const pkgJson = require("../../package.json");
    this.config.set("generatorPackageName", pkgJson.name);
    this.config.set("generatorPackageVersion", pkgJson.version);
    this.config.set("generatorPackageGitRepo", pkgJson.repository.url);
    this.config.set("namespace", "ds");
  }

  /**
   * Resolves the path to the destination directory relative to the current working directory.
   * @param inPath - The path to resolve, relative to the destination directory
   */
  destinationPath(...inPath: string[]): string {
    return super.destinationPath(
      path.resolve(path.join(process.cwd(), ...inPath)),
    );
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
      } else {
        this.log("No subgenerator specified.");
      }
      this.log("Please run `yo @canonical/canonical-ds:<subgenerator name>`.");
      this.log(
        `Available subgenerators:\n${this.getSubgenerators().join("\n")}`,
      );
      process.exit(1);
    }
  }
}
