import React from "react";

// import { StaticRouter } from 'react-router-dom/server';
//
import { JSXRenderer } from "@canonical/react-ssr";
import htmlString from "../../dist/client/index.html?raw";
import Entrypoint from "./Entrypoint.js";

export const config = {
  supportsResponseStreaming: true,
};

const Renderer = new JSXRenderer(Entrypoint, {
  htmlString,
});

export const handler = Renderer.render;
