import type { BaseOptions, PromptAnswers } from "yeoman-generator";

import type Generator from "yeoman-generator";
import type {
  CLIArgumentAnswer,
  CLIOptionAnswer,
  GeneratorOptionsWithAnswers,
} from "./types.js";

/**
 * Configure a generator to use CLI arguments and options, and return the answers
 * This function must be called from a generator constructor to register the args with the --help output.
 * @template TAnswers The type of answers to the CLI arguments and options
 * @template TGeneratorOptions The type of the generator options to configure
 * @template TGenerator The type of the generator to configure
 * @template TArg The type of the CLI arguments to use
 * @template TOpt The type of the CLI options to use
 * @param generator The generator to configure
 * @param cliArgs The CLI arguments (positional CLI args) to use
 * @param cliOptions The CLI options (flags) to use
 * @returns The answers to the CLI arguments and options
 */
export function getCLIAnswers<
  TAnswers extends PromptAnswers,
  TGeneratorOptions extends BaseOptions,
  TGenerator extends Generator<
    GeneratorOptionsWithAnswers<TGeneratorOptions, TAnswers>
  >,
  TArg extends CLIArgumentAnswer<TAnswers>,
  TOpt extends CLIOptionAnswer<TAnswers>,
>(
  generator: TGenerator,
  cliArgs: TArg[] = [],
  cliOptions: TOpt[] = [],
): TAnswers {
  // Initialize the answers object with the default values
  const answers: TAnswers = Object.fromEntries(
    [...cliArgs, ...cliOptions].map((cliArg) => [cliArg.name, cliArg.default]),
  ) as TAnswers;

  // Add the CLI arguments and options to the generator
  for (const argument of cliArgs) {
    generator.argument(argument.name, argument);
    answers[argument.name] = generator.options[argument.name];
  }

  // Add the CLI options to the generator
  for (const option of cliOptions) {
    generator.option(option.name, option);
    answers[option.name] = generator.options[option.name];
  }

  return answers;
}
