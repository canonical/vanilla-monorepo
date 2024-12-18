import { JSXRenderer } from "@canonical/react-ssr";
import htmlString from "../../dist/client/index.html?raw";
import Entrypoint from "./Entrypoint.js";

const Renderer = new JSXRenderer(Entrypoint, {
  htmlString,
});

export const handler = Renderer.render;
