import { hydrateRoot } from "react-dom/client";
import Application from "./Application.js";
import "./index.css";
import { StrictMode } from "react";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <Application />
  </StrictMode>,
);
