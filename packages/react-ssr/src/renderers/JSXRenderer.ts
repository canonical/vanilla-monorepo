import * as React from "react";
import { createElement } from "react";
import { renderToReadableStream } from "react-dom/server";
import Extractor from "./Extractor.js";

interface RendererOptions {
  defaultLocale?: string;
  loadMessages?: (locale: string) => Promise<any>;
  htmlString?: string;
}

// This class is responsible for rendering a React component to a readable stream.
export default class Renderer {
  private Component: React.ComponentType<any>;
  private options: RendererOptions;
  private locale: string | undefined;
  private messages: any;
  private extractor: Extractor | undefined;

  constructor(
    Component: React.ComponentType<any>,
    options: RendererOptions = {},
  ) {
    this.Component = Component;
    this.options = options;
    this.prepareLocale = this.prepareLocale.bind(this);
    this.render = this.render.bind(this);
    this.extractor = this.options.htmlString
      ? new Extractor(this.options.htmlString)
      : undefined;
  }

  async prepareLocale(header: string | undefined) {
    if (this.options.loadMessages) {
      this.locale = header
        ? header.slice(0, 2)
        : this.options.defaultLocale || "en";
      //this.messages = await this.options.loadMessages(this.locale);
    }
  }

  async render(req: Request) {
    await this.prepareLocale(req.headers.get("accept-language") || undefined);
    const jsx = createElement(this.Component, {
      locale: this.locale,
      scriptTags: this.extractor?.getScriptTags(),
      linkTags: this.extractor?.getLinkTags(),
      //messages: this.messages,
    });
    return renderToReadableStream(jsx);
  }
}
