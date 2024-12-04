import path from "node:path";
import Generator, { type Question } from "yeoman-generator";
import globalContext from "../app/global-context.js";
import casing from "../utils/casing.js";

interface ComponentGeneratorAnswers {
  /** The path for the component's root directory, relative to the callers, working directory. */
  path: string;
  /** Whether to include styles in the component */
  includeStyles: boolean;
  /** Whether to include tests in the component */
  includeTests: boolean;
  /** The test framework to use */
  testFramework?: "jest" | "playwright" | "vitest";
  /** Whether to include a storybook story in the component */
  includeStorybook: boolean;
  /** The story format to use */
  storyFormat?: "csf2" | "csf3";
}

export default class ComponentGenerator extends Generator {
  answers?: ComponentGeneratorAnswers;

  questions: Question[] = [
    {
      type: "input",
      name: "path",
      message: "Please enter the path for the component's root directory",
      default: "MyComponent",
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
      message: "Would you like to include a storybook story?",
      default: false,
    },
    {
      type: "list",
      name: "storyFormat",
      message: "Which story format would you like to use?",
      when: (answers) => answers.includeStorybook,
      choices: ["csf2", "csf3"],
      default: "csf3",
    },
    {
      type: "confirm",
      name: "includeTests",
      message: "Would you like to include tests?",
      default: false,
    },
    {
      type: "list",
      name: "testFramework",
      message: "Which test framework would you like to use?",
      when: (answers) => answers.includeTests,
      choices: ["jest", "playwright", "vitest"],
      default: "vitest",
    },
  ];

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

    const templateData = {
      ...globalContext,
      componentName: casing.toPascalCase(path.basename(this.answers.path)),
      ...this.answers,
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
        this.templatePath(
          `Component.stories.${this.answers.storyFormat}.tsx.ejs`,
        ),
        this.destinationPath(
          `${this.answers.path}/${templateData.componentName}.stories.tsx`,
        ),
        templateData,
      );
    }

    if (this.answers.includeTests) {
      this.fs.copyTpl(
        this.templatePath(
          `Component.test.${this.answers.testFramework}.tsx.ejs`,
        ),
        this.destinationPath(
          `${this.answers.path}/${templateData.componentName}.test.tsx`,
        ),
        templateData,
      );
    }
  }
}
