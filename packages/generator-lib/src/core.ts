import { program } from "commander";

/**
 * A single argument for a scenario
 * @template T The type of the argument value
 */
export interface ScenarioArg<T = string> {
  /** A description of the argument */
  description: string;
  /** Whether the argument is required */
  required?: boolean;
  /** The default value for the argument */
  defaultValue?: T;
  /** A function to transform the argument value */
  transform?: (value: string) => T;
}

/**
 * A list of arguments for a scenario
 */
export type ScenarioArgList = {
  [key: string]: ScenarioArg;
};

/**
 * A scenario to generate a specific type of content
 */
export interface Scenario {
  args: ScenarioArgList;
  description: string;
  /** Execute the scenario with the provided arguments */
  execute(
    args: Record<string, unknown>,
    transformedArgs: Record<string, unknown>,
  ): Promise<void> | void;
}

/**
 * Define the generators for the provided scenarios
 * @param scenarios a list of scenarios to generate
 */
export function defineGenerators({
  scenarios,
}: {
  scenarios: Record<string, Scenario>;
}) {
  for (const [scenarioName, scenario] of Object.entries(scenarios)) {
    // Define the command for the scenario
    const scenarioCmd = program
      .command(scenarioName)
      .description(scenario.description);

    const allArgs: Record<string, unknown> = {};
    const transformedArgs: Record<string, unknown> = {};

    for (const [argName, arg] of Object.entries(scenario.args)) {
      console.log("adding arg", { argName, arg });
      scenarioCmd
        .option(`--${argName} <${argName}>`, arg.description)
        .action((args) => {
          let value = args[argName];
          allArgs[argName] = value;

          value ||= arg.defaultValue;

          if (arg.required && !value && value !== 0) {
            console.error(`Missing required argument: ${argName}`);
            process.exit(1);
          }

          if (arg.transform) {
            value = arg.transform(value);
          }

          console.log("set arg value", { argName, value });
          transformedArgs[argName] = value;
        });
    }
    // scenario.execute(allArgs, transformedArgs);
  }

  program.parse(process.argv);
}
