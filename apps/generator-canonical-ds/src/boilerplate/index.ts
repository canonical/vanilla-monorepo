import path from "node:path";
import type Generator from "yeoman-generator";
import BaseGenerator from "../app/index.js";

interface Answers {
  projectPath: string;
}

export default class BoilerplateGenerator extends BaseGenerator {
  answers?: Answers;

  async prompting(): Promise<void> {
    this.log("Welcome to the Canonical boilerplate generator");

    const prompts: Generator.Question[] = [
      {
        type: "input",
        name: "projectPath",
        message: "Please enter the path to a directory for the project",
        default: "MyProject",
      },
    ];

    this.answers = await this.prompt<Answers>(prompts);
  }

  writing(): void {
    if (!this.answers) return;

    const templateData = {
      ...this.config.getAll(),
      ...this.answers,
      projectName: path.basename(this.answers.projectPath),
    };

    console.log({
      answers: this.answers,
      templateData,
      templatePath: this.templatePath("**/*"),
      destinationPath: this.destinationPath(this.answers.projectPath),
    });

    this.fs.copyTpl(
      this.templatePath("**/*"),
      this.destinationPath(this.answers.projectPath),
      templateData,
    );
  }
}
