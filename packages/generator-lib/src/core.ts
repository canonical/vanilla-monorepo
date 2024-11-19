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
  console.log("Defining generators...");

  for (const [scenarioName, scenario] of Object.entries(scenarios)) {
    // Define the command for the scenario
    program
      .command(scenarioName)
      .description(`Generate a new ${scenarioName}`)

      // Add options to the program for this specific scenario
      .action(() => {
        const args = program.opts();
        const transformedArgs: Record<string, unknown> = {};

        for (const [
          argName,
          { description, defaultValue, required, transform },
        ] of Object.entries(scenario.args)) {
          const argValue = args[argName];
          program.option(`--${argName} <value>`, description, defaultValue);

          // TBD should we check for required before or after applying transformations?
          if (required && (argValue === undefined || argValue === "")) {
            console.error(`Missing required option: ${argName}`);
            process.exit(1);
          }

          transformedArgs[argName] = transform ? transform(argValue) : argValue;
        }

        scenario.execute(args, transformedArgs);
      });
  }

  program.parse(process.argv);
}
