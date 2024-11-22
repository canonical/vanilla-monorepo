/**
 * Convert a string to PascalCase
 * @param s - The string to convert
 * @returns The PascalCase string
 * @example
 * toPascalCase("my-component") // "MyComponent"
 */
const toPascalCase = (s: string): string => {
  if (!s) return;
  const camelCased = s
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replaceAll("-", "")
    .replaceAll("_", "")
    .replaceAll(" ", "");
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
};

export default {
  toPascalCase,
};
