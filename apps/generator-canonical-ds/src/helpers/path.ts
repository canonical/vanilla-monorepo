import type { NodePlopAPI } from "plop";

/**
 * Returns the leaf of a file path.
 * @param filePath - The file path
 * @returns The leaf of the file path
 * @example
 * getLeaf("path/to/file.txt") // "file.txt"
 * getLeaf("path/to") // "to"
 */
export function getLeaf(filePath: string): string {
  return filePath.split("/").pop() || filePath;
}

/**
 * Returns the directory of a file path.
 * @param filePath - The file path
 * @returns The directory of the file path
 * @example
 * directoryOf("path/to/file.txt") // "path/to"
 */
export function pathToDirectory(filePath: string): string {
  return filePath.split("/").slice(0, -1).join("/");
}

export default function (plop: NodePlopAPI) {
  plop.setHelper("leaf", getLeaf);
  plop.setHelper("pathToDir", pathToDirectory);
}
