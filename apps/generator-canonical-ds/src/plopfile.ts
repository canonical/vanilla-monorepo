import type { NodePlopAPI } from "plop";
import generators from "./generators/index.js";

import helpers from "./helpers/index.js";

export default async function (plop: NodePlopAPI) {
  plop.setDefaultInclude({ base: process.cwd() });

  generators(plop);
  helpers(plop);
}
