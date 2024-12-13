var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import React, { createElement, useState, useEffect } from "react";
import { renderToReadableStream } from "react-dom/server";
import { parseDocument } from "htmlparser2";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
class Extractor {
  constructor(html) {
    __publicField(this, "document");
    this.document = parseDocument(html);
  }
  getElementsByTagName(tagName) {
    const elements = [];
    const stack = [this.document];
    while (stack.length) {
      const node = stack.pop();
      if (!node)
        continue;
      if (node.type === "tag" && node.name === tagName) {
        elements.push(node);
      }
      if (node.type === "script" && tagName === "script") {
        elements.push(node);
      }
      if (node.children) {
        stack.push(...node.children);
      }
    }
    console.log(`Found ${elements.length} <${tagName}> tags`);
    return elements;
  }
  convertToReactElement(element) {
    const props = {};
    for (const [key, value] of Object.entries(element.attribs)) {
      props[key] = value;
    }
    return React.createElement(element.name, props);
  }
  getLinkTags() {
    const linkElements = this.getElementsByTagName("link");
    return linkElements.map(this.convertToReactElement);
  }
  getScriptTags() {
    const scriptElements = this.getElementsByTagName("script");
    return scriptElements.map(this.convertToReactElement);
  }
}
let Renderer$1 = class Renderer {
  constructor(Component, options = {}) {
    __publicField(this, "Component");
    __publicField(this, "options");
    __publicField(this, "locale");
    __publicField(this, "messages");
    __publicField(this, "extractor");
    this.Component = Component;
    this.options = options;
    this.render = this.render.bind(this);
    this.extractor = this.options.htmlString ? new Extractor(this.options.htmlString) : void 0;
  }
  //async prepareLocale(header: string | undefined) {
  //  if (this.options.loadMessages) {
  //    this.locale = header
  //      ? header.slice(0, 2)
  //      : this.options.defaultLocale || "en";
  //    //this.messages = await this.options.loadMessages(this.locale);
  //  }
  //}
  async render(req) {
    var _a, _b;
    const jsx2 = createElement(this.Component, {
      locale: this.locale,
      scriptTags: (_a = this.extractor) == null ? void 0 : _a.getScriptTags(),
      linkTags: (_b = this.extractor) == null ? void 0 : _b.getLinkTags()
      //messages: this.messages,
    });
    return renderToReadableStream(jsx2);
  }
};
const htmlString = '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite + React + TS</title>\n    <script type="module" crossorigin src="/assets/index-DYSRnN6A.js"><\/script>\n    <link rel="stylesheet" crossorigin href="/assets/index-Cnnpwl0-.css">\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>\n';
const canonicalLogo = "/canonical.svg";
const reactLogo = "/assets/react-CHdo91hT.svg";
const Button = ({ id, className, appearance, label, ...props }) => {
  return jsx("button", { id, className: ["ds", "button", appearance, className].filter(Boolean).join(" "), ...props, "aria-label": label, children: label });
};
const DemoComponent = ({ timeout = 2e3 }) => {
  const LazyButton = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, timeout));
    return {
      default: () => /* @__PURE__ */ jsx("button", { children: "Click me" })
    };
  });
  useEffect(() => {
    console.log("mounted");
  }, []);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, { children: "Waitttt" }), children: /* @__PURE__ */ jsx(LazyButton, { onClick: () => alert("clicked") }) }) });
};
function App() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://canonical.com",
          target: "_blank",
          referrerPolicy: "no-referrer",
          rel: "noreferrer",
          children: /* @__PURE__ */ jsx("img", { src: canonicalLogo, className: "logo", alt: "Canonical logo" })
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "https://react.dev", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx("img", { src: reactLogo, className: "logo react", alt: "React logo" }) })
    ] }),
    /* @__PURE__ */ jsx("h1", { children: "Canonical Design System" }),
    /* @__PURE__ */ jsx("h2", { children: "React Vite template" }),
    /* @__PURE__ */ jsx(DemoComponent, {}),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          label: `Count: ${count}`,
          onClick: () => setCount((count2) => count2 + 1)
        }
      ),
      /* @__PURE__ */ jsxs("p", { children: [
        "Edit ",
        /* @__PURE__ */ jsx("code", { children: "src/App.tsx" }),
        " and save to test HMR"
      ] })
    ] })
  ] });
}
function Entrypoint({ lang = "en", scriptTags, linkTags }) {
  return /* @__PURE__ */ jsxs("html", { lang, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx("title", { children: "React Server Components" }),
      scriptTags,
      linkTags
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsx("div", { id: "root", children: /* @__PURE__ */ jsx(App, {}) }) })
  ] });
}
const config = {
  supportsResponseStreaming: true
};
const Renderer2 = new Renderer$1(Entrypoint, {
  htmlString
});
const handler = Renderer2.render;
export {
  config,
  handler
};
