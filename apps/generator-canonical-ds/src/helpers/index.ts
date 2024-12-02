import type { NodePlopAPI } from "plop";
import casing from "./casing.js";
import path from "./path.js";

export default function (plop: NodePlopAPI) {
  casing(plop);
  path(plop);
}
