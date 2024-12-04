import path from "node:path";
import type { NodePlopAPI } from "plop";
import { toPascalCase } from "../helpers/casing.js";
import { getLeaf } from "../helpers/path.js";

export default function reactComponentGenerator(plop: NodePlopAPI) {
  plop.setHelper("reactComponentPath", (name: string) => {
    const rawPath = path.join(process.cwd(), name);
    const pathParts = rawPath.split("/");
    if (pathParts.length === 0) return rawPath;
    const deepestDirectory = pathParts[pathParts.length - 1];
    pathParts[pathParts.length - 1] = toPascalCase(deepestDirectory);
    return pathParts.join("/");
  });

  plop.setGenerator("react-component", {
    description: "Generate a new React component",
    prompts: [
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
    ],
    actions: (answers) => {
      if (!answers) return [];
      const templateData = {
        ...answers,
        componentName: toPascalCase(getLeaf(answers.path)),
      };
      const actions = [
        {
          type: "add",
          path: "{{reactComponentPath path}}/{{pascalCase (leaf path)}}.tsx",
          templateFile: "Component.tsx.hbs",
        },
        {
          type: "add",
          path: "{{reactComponentPath path}}/index.ts",
          templateFile: "index.ts.hbs",
        },
      ];
      if (answers.includeStyles) {
        actions.push({
          type: "add",
          path: "{{reactComponentPath path}}/{{pascalCase (leaf path)}}.css",
          templateFile: "Component.css.hbs",
        });
      }
      if (answers.includeStorybook) {
        actions.push({
          type: "add",
          path: "{{reactComponentPath path}}/{{pascalCase (leaf path)}}.stories.tsx",
          templateFile: `Component.stories.${answers.storyFormat}.tsx.hbs`,
        });
      }
      if (answers.includeTests) {
        actions.push({
          type: "add",
          path: "{{reactComponentPath path}}/{{pascalCase (leaf path)}}.test.tsx",
          templateFile: `Component.test.${answers.testFramework}.tsx.hbs`,
        });
      }
      return actions.map((action) => ({
        ...action,
        templateFile: `templates/react-component/${action.templateFile}`,
        data: templateData,
      }));
    },
  });
}
