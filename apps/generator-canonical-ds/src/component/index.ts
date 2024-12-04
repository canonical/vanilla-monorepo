import path from "node:path";
import Generator, { type Question } from "yeoman-generator";
import globalContext from "../app/global-context.js";
import casing from "../utils/casing.js";

interface ComponentGeneratorAnswers {
  /** The path for the component's root directory, relative to the callers working directory. */
  path: string;
  /** Whether to include styles in the component */
  includeStyles: boolean;
  /** Whether to include a storybook story in the component */
  includeStorybook: boolean;
}

export default class ComponentGenerator extends Generator {
  answers?: ComponentGeneratorAnswers;

  questions: Question[] = [
    {
      type: "input",
      name: "path",
      message:
        "Enter the component's name, including its path (ex: `form/input/Checkbox`):",
      default: ".",
      filter: (input: string) => path.resolve(path.join(this.env.cwd, input)),
    },
    {
      type: "confirm",
      name: "includeStyles",
      message: "Do you want to include styles?",
      default: false,
    },
    {
      type: "confirm",
      name: "includeStorybook",
      message: "Would you like to include a story file?",
      default: false,
    },
  ];

  initializing() {
    this.log("Welcome to the component generator!");
    this.log(
      "This generator should be run from the root directory of all your application's components (ex: src/components).",
    );
  }

  async prompting() {
    this.answers = await this.prompt<ComponentGeneratorAnswers>(this.questions);
  }

  /**
   * Gets the path to the component's directory relative to the current working directory.
   * Pascal-cases the final directory name to match React component naming conventions.
   * @param inPath - The path to resolve, relative to the current working directory
   * @return Path to the component's directory relative to the current working directory
   * @example
   * destinationPath("path/to/button/index.ts") // => "/path/to/Button/index.ts"
   */
  destinationPath(...inPath: string[]): string {
    const rawPath = super.destinationPath(...inPath);
    const dirName = path.dirname(rawPath);

    // Replace the last segment of the path with the Pascal-cased version
    const componentFolder = path.resolve(
      dirName,
      "..",
      casing.toPascalCase(path.basename(dirName)),
    );

    // Append the original file name to the new path
    const fileName = path.basename(rawPath);

    return path.join(componentFolder, fileName);
  }

  writing(): void {
    if (!this.answers) return;

    const componentName = casing.toPascalCase(path.basename(this.answers.path));

    const templateData = {
      ...globalContext,
      componentName,
      ...this.answers,
      ...(this.answers.includeStyles && {
        componentCssClassName: casing.toKebabCase(componentName),
      }),
    };

    this.fs.copyTpl(
      this.templatePath("Component.tsx.ejs"),
      this.destinationPath(
        `${this.answers.path}/${templateData.componentName}.tsx`,
      ),
      templateData,
    );

    this.fs.copyTpl(
      this.templatePath("index.ts.ejs"),
      this.destinationPath(`${this.answers.path}/index.ts`),
      templateData,
    );

    this.fs.copyTpl(
      this.templatePath("types.ts.ejs"),
      this.destinationPath(`${this.answers.path}/types.ts`),
      templateData,
    );

    this.fs.copyTpl(
      this.templatePath("Component.test.tsx.ejs"),
      this.destinationPath(
        `${this.answers.path}/${templateData.componentName}.test.tsx`,
      ),
      templateData,
    );

    if (this.answers.includeStyles) {
      this.fs.copyTpl(
        this.templatePath("Component.css.ejs"),
        this.destinationPath(
          `${this.answers.path}/${templateData.componentName}.css`,
        ),
        templateData,
      );
    }

    if (this.answers.includeStorybook) {
      this.fs.copyTpl(
        this.templatePath("Component.stories.tsx.ejs"),
        this.destinationPath(
          `${this.answers.path}/${templateData.componentName}.stories.tsx`,
        ),
        templateData,
      );
    }
  }
}
