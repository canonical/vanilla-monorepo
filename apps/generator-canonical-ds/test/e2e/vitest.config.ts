import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // Use the Node.js environment for testing (suitable for command-line interaction tests)
    globals: true, // Allow using global functions like `describe`, `it`, etc.
    include: ["tests/**/*.ts", "tests/**/*.tsx"], // Specify where the tests are located
    testTransformMode: {
      web: [/\.tsx$/], // Handle TypeScript files
    },
  },
});
