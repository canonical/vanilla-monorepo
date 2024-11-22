import path from "node:path";
import type Generator from "yeoman-generator";
import BaseGenerator from "../app/index.js";
import casing from "../app/utils/casing.js";

interface Answers {
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

export default class ComponentGenerator extends BaseGenerator {
  answers: Answers;

  async prompting(): Promise<void> {
    this.log("Welcome to the React component generator");

    const prompts: Generator.Question[] = [
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
        when: (answers: Answers) => answers.includeStorybook,
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
        when: (answers: Answers) => answers.includeTests,
        choices: ["jest", "playwright", "vitest"],
        default: "vitest",
      },
    ];

    this.answers = await this.prompt<Answers>(prompts);
  }

  /**
   * Resolve back to the directory for the component destination
   * Assumes that `answers.path` has been set.
   * @param inPath - The path to resolve, relative to the component's destination directory
   */
  destinationPath(...inPath: string[]): string {
    const rawPath = path.resolve(
      path.join(process.cwd(), this.answers?.path || "", ...inPath),
    );

    // Pascal-case the final directory name
    const pathParts = rawPath.split("/");
    // There is no directory, return the path as-is
    if (pathParts.length === 0) return rawPath;
    // A final directory was found, pascal-case it
    const deepestDirectory = pathParts[pathParts.length - 2];
    pathParts[pathParts.length - 2] = casing.toPascalCase(deepestDirectory);

    return super.destinationPath(path.resolve(pathParts.join("/")));
  }

  /**
   * Get the component name from the path
   * @param componentPath - The path to the component's root directory
   * @returns The component name (extracted from the final path segment and pascal cased)
   * @example
   * componentName("src/components/my-component") // "MyComponent"
   */
  componentName(componentPath: string): string {
    if (!componentPath) return;
    const finalPathSegment = componentPath?.split("/")?.pop();
    return casing.toPascalCase(finalPathSegment);
  }

  writing(): void {
    const templateData = {
      ...this.config.getAll(),
      componentName: this.componentName(this.answers.path),
      ...this.answers,
    };

    this.fs.copyTpl(
      this.templatePath("Component.tsx"),
      this.destinationPath(`${templateData.componentName}.tsx`),
      templateData,
    );

    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath("index.ts"),
      templateData,
    );
    this.fs.copyTpl(
      this.templatePath("types.ts"),
      this.destinationPath("types.ts"),
      templateData,
    );

    if (this.answers.includeStyles) {
      this.fs.copyTpl(
        this.templatePath("Component.css"),
        this.destinationPath(`${templateData.componentName}.css`),
        templateData,
      );
    }

    if (this.answers.includeStorybook) {
      this.fs.copyTpl(
        this.templatePath(`Component.stories.${this.answers.storyFormat}.tsx`),
        this.destinationPath(`${templateData.componentName}.stories.tsx`),
        templateData,
      );
    }

    if (this.answers.includeTests) {
      this.fs.copyTpl(
        this.templatePath(`Component.test.${this.answers.testFramework}.tsx`),
        this.destinationPath(`${templateData.componentName}.test.tsx`),
        templateData,
      );
    }
  }
}
