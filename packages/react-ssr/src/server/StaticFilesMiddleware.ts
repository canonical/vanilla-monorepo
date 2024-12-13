import { readFileSync, statSync } from "fs";
import path from "path";

// Class to handle static file serving
class StaticFileMiddleware {
  private staticDirs: string[];

  constructor(staticDirs: string[]) {
    this.staticDirs = staticDirs;
  }

  // Method to check if a file exists
  private fileExists(filePath: string): boolean {
    try {
      return statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }

  // Method to get content type based on file extension
  private getContentType(filePath: string): string {
    const ext = filePath.split(".").pop();
    switch (ext) {
      case "html":
        return "text/html";
      case "js":
        return "application/javascript";
      case "css":
        return "text/css";
      case "svg":
        return "image/svg+xml";
      default:
        return "application/octet-stream";
    }
  }

  // Middleware method to serve static files
  public async handleRequest(req: Request): Promise<Response | null> {
    const url = new URL(req.url);

    for (const dirPath of this.staticDirs) {
      const filePath = path.join(dirPath, url.pathname.slice(1));

      if (this.fileExists(filePath)) {
        const fileContent = readFileSync(filePath);
        const contentType = this.getContentType(filePath);
        return new Response(fileContent, {
          headers: {
            "Content-Type": contentType,
          },
        });
      }
    }
    return null;
  }
}

export default StaticFileMiddleware;
