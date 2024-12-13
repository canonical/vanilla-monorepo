import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Application from "./Application.js";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Application />
  </StrictMode>,
);
