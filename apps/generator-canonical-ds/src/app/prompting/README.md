# Prompting module

This module contains types and functionality allowing Yeoman generators to quickly prompt users for input.
This allows generators to prompt for input and receive answers with less repetitive code.
It is currently configured to support CLI input.

## Usage
Create a new subgenerator (`src/<generatorName>/index.ts`) and copy the following template:
```typescript
import Generator, {
  type BaseOptions,
  type PromptAnswers,
} from "yeoman-generator";
import {
  type CLIArgumentAnswer,
  type CLIOptionAnswer,
  type GeneratorOptionsWithAnswers,
  getCLIAnswers,
} from "../app/prompting/index.js";

/*
  Define structure of the answers object
  The keys of this type will define the valid "name" values for arguments and options
*/
interface Answers extends PromptAnswers {
  argumentName: string;
  optionName: boolean;
}

type GeneratorOptions = GeneratorOptionsWithAnswers<
  // You may also use some other extension of `BaseOptions`
  BaseOptions,
  Answers
>;

/*  
   Define types for the arguments and options
   The "name" value for each argument and option must match a key in the Answers type
*/
type CLIArgumentAnswer =
  CLIArgumentAnswer<ComponentGeneratorAnswers>;

type CLIOptionAnswer =
  CLIOptionAnswer<ComponentGeneratorAnswers>;

// Base the custom generator options type into the Generator class
export default class MyGenerator extends Generator<GeneratorOptions> {
  // Define arguments and options using the CLIAnswer types
  private argumentSpecs: CLIArgumentAnswer[] = [
    {
      type: String,
      name: "componentPath",
      description: "The path to the component's root directory",
      required: true,
      default: ".",
    },
  ];

  private optionSpecs: CLIOptionAnswer[] = [
    {
      type: Boolean,
      name: "includeStyles",
      description: "Whether to include styles in the component",
      default: false,
    },
    {
      type: Boolean,
      name: "includeStory",
      description: "Whether to include a storybook story in the component",
      default: false,
    },
  ];

  answers!: ComponentGeneratorAnswers;

  constructor(args: string | string[], options: ComponentGeneratorOptions) {
    super(args, options);

    // Setup CLI arguments and options and store their answers
    // Yeoman will perform CLI input checking and validation for you.
    this.answers = getCLIAnswers(this, this.argumentSpecs, this.optionSpecs);
  }
  
  writing() {
    // consume `this.answers` here...
  }
}
```