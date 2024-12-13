import type {
  ArgumentSpec,
  BaseOptions,
  CliOptionSpec,
  PromptAnswers,
} from "yeoman-generator";

// The base types from Yeoman for CLI arguments and options. An input can be one of these.
type ArgBaseType = ArgumentSpec | CliOptionSpec;

/**
 * A helper type to combine a CLI argument or option with the name of the answer property
 * This allows the names of argument objects to be inferred as valid keys of the answers object
 * @template TCLIArgType The type of the CLI argument or option
 * @template TAnswers The type of the answers object
 */
type CLIArgAnswerHelper<
  TCLIArgType extends ArgBaseType,
  TAnswers extends PromptAnswers,
> = TCLIArgType & {
  name: keyof TAnswers; // Ensure name is one of the keys from TAnswers
};

/**
 * A CLI argument answer whose name matches some key in the answers object
 * @template TAnswers The type of the answers object
 */
export type CLIArgumentAnswer<TAnswers extends PromptAnswers> =
  CLIArgAnswerHelper<ArgumentSpec, TAnswers>;

/**
 * A CLI option answer whose name matches some key in the answers object
 * @template TAnswers The type of the answers object
 */
export type CLIOptionAnswer<TAnswers extends PromptAnswers> =
  CLIArgAnswerHelper<CliOptionSpec, TAnswers>;

/**
 * A generator options object that includes the answers to CLI arguments and options
 * This allows keys in `generator.options` to be inferred as valid keys of the answers object
 * @template TOptions The type of the generator options object
 * @template TAnswers The type of the answers object
 */
export type GeneratorOptionsWithAnswers<
  TOptions extends BaseOptions,
  TAnswers extends PromptAnswers,
> = TOptions & TAnswers;
