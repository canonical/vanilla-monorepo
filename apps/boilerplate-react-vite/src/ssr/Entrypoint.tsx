import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
//import "./Application.scss";
import Application from "../Application.js";

type Props = {
  lang?: string;
  scriptTags: string;
  linkTags: string;
};

function Entrypoint({ lang = "en", scriptTags, linkTags }: Props) {
  return (
    <html lang={lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Server Components</title>
        {scriptTags}
        {linkTags}
      </head>
      <body>
        <div id="root">
          <Application />
        </div>
      </body>
    </html>
  );
}

export default Entrypoint;
