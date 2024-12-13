#!/usr/bin/env bun

import path from "path";
import { serve } from "bun";
import StaticFilesMiddleware from "./StaticFilesMiddleware.js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parseArgs } from "util";

// Parse command-line arguments using util.parseArgs
const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    port: {
      type: "string",
      alias: "p",
      default: "5173",
    },
    static: {
      type: "string",
      alias: "s",
      default: "dist/client",
    },
  },
  strict: true,
  allowPositionals: true,
});

const port = values.port || 5173;
const rendererFilePath = positionals[0];

if (!rendererFilePath) {
  console.error(
    "Renderer file path is required. Usage: bun run script.ts [--port <port>] <rendererFilePath>",
  );
  process.exit(1);
}

// Resolve renderer file path relative to the current working directory
const cwd = process.cwd();
const resolvedRendererFilePath = resolve(cwd, rendererFilePath);
console.log("Current working directory: ", cwd);
const staticDirs = [path.join(cwd, values.static), path.join(cwd, "public")];
const staticFilesMiddleware = new StaticFilesMiddleware(staticDirs);

serve({
  async fetch(req: Request) {
    const staticResponse = await staticFilesMiddleware.handleRequest(req);
    if (staticResponse) {
      return staticResponse;
    }

    try {
      const handler = await import(resolvedRendererFilePath).then(
        (module) => module.handler,
      );
      const stream = await handler(req, null);
      return new Response(stream, {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error loading renderer:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
  port,
});

console.log(`Server running at http://localhost:${port}`);
