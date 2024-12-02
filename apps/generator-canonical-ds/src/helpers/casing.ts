import type { NodePlopAPI } from "plop";

/**
 * Convert a string to PascalCase
 * @param s - The string to convert
 * @returns The PascalCase string
 * @example
 * toPascalCase("my-component") // "MyComponent"
 */
export function toPascalCase(s: string): string {
  const camelCased = s
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replaceAll("-", "")
    .replaceAll("_", "")
    .replaceAll(" ", "");
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}

export default function (plop: NodePlopAPI) {
  plop.setHelper("toPascalCase", toPascalCase);
  plop.setHelper("toLowerCase", (s: string) => s?.toLowerCase());
}
