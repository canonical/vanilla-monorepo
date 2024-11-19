import * as fs from "node:fs";
import * as path from "node:path";
import * as ejs from "ejs";

/**
 * Converts a local path to an absolute path.
 * @param relativePath path relative to a caller's working directory
 * @returns absolute path to the file
 */
function localToAbsolutePath(relativePath: string) {
  return path.resolve(process.cwd(), relativePath);
}

export function createDir(path: string) {
  const absPath = localToAbsolutePath(path);
  console.log(`Creating directory at: ${absPath}`);
  fs.mkdirSync(absPath, { recursive: true });
}

export function copyFile(srcPath: string, targetPath: string) {
  const absSrcPath = localToAbsolutePath(srcPath);
  const absTargetPath = localToAbsolutePath(targetPath);
  console.log(`Copying file from ${absSrcPath} to ${absTargetPath}`);
  const srcFile = fs.readFileSync(absSrcPath, "utf-8");
  fs.writeFileSync(absTargetPath, srcFile);
}

export function touchOrAppendToFile(filePath: string, content: string) {
  const absPath = localToAbsolutePath(filePath);
  console.log(`Appending to file ${absPath} with content: ${content}`);
  fs.appendFileSync(absPath, content);
}

export function renderTemplate(
  templatePath: string,
  outPath: string,
  data: Record<string, unknown>,
) {
  const absTemplatePath = localToAbsolutePath(templatePath);
  const absOutPath = localToAbsolutePath(outPath);
  if (!fs.existsSync(absTemplatePath)) {
    console.log(`Template not found: ${absTemplatePath}`);
    return;
  }

  // Read and render the EJS template with the provided data
  const templateContent = fs.readFileSync(absTemplatePath, "utf-8");
  const renderedContent = ejs.render(templateContent, data);

  // Write the rendered content to the target file
  fs.writeFileSync(absOutPath, renderedContent);
}
