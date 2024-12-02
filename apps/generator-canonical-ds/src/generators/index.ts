import type { NodePlopAPI } from "plop";
import reactComponentGenerator from "./react-component.js";

export default function (plop: NodePlopAPI) {
  reactComponentGenerator(plop);
}
