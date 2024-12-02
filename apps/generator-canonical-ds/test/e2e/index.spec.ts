import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { expect } from "@jest/globals";
import yeoman from "yeoman-test";

describe("E2E Test for Yeoman Generator", () => {
  let projectDir: string;

  beforeEach(() => {
    projectDir = path.join(__dirname, "generated-project");
  });

  afterEach(() => {
    // Clean up generated files
    if (fs.existsSync(projectDir)) {
      fs.rmSync(projectDir, { recursive: true, force: true });
    }
  });

  it("should generate the project and pass build and type-checking", () => {
    // Run the generator to create a new project
    execSync(
      'yo your-generator-name --appName "my-app" --projectType "react" --no-interaction',
      {
        cwd: projectDir,
        stdio: "inherit",
      },
    );

    // Ensure essential files are created
    expect(fs.existsSync(path.join(projectDir, "package.json"))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, "src"))).toBe(true);

    // Run build command and verify output directory
    execSync("npm run build", { cwd: projectDir, stdio: "inherit" });
    expect(fs.existsSync(path.join(projectDir, "dist"))).toBe(true);

    // Run TypeScript type-checking
    const typeCheckResult = execSync("tsc --noEmit", {
      cwd: projectDir,
      stdio: "pipe",
    });
    expect(typeCheckResult.toString()).toContain("Found 0 errors");
  });
});
