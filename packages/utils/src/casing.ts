/**
 * Convert a string to PascalCase
 * @param s - The string to convert
 * @returns The PascalCase string
 * @example
 * toPascalCase("my-component") // "MyComponent"
 */
const toPascalCase = (s: string): string => {
  if (!s) return "";

  const camelCased = toCamelCase(s);

  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
};

/**
 * Convert a string to kebab-case
 * @param s - The string to convert
 * @returns The kebab-case string
 * @example
 * toKebabCase("MyComponent") // "my-component"
 */
const toKebabCase = (s: string): string => {
  if (!s) return "";

  return s
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
};

/**
 * Convert a string to camelCase
 * @param s - The string to convert
 * @returns The camelCase string
 * @example
 * toCamelCase("my-component") // "myComponent"
 */
const toCamelCase = (s: string): string => {
  if (!s) return "";

  return s
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replaceAll("-", "")
    .replaceAll("_", "")
    .replaceAll(" ", "");
};

export default {
  toPascalCase,
  toKebabCase,
  toCamelCase,
};
