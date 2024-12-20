import { useEffect, useGlobals } from "storybook/internal/preview-api";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";

import { KEY } from "./constants";

export const withBaselineGrid = (
  StoryFn: StoryFunction<Renderer>,
) => {
  const [globals] = useGlobals();
  const myAddon = globals[KEY];

  useEffect(() => {
    if (myAddon) {
      global.document.body.classList.add("show-baseline-grid");
    } else {
      global.document.body.classList.remove("show-baseline-grid");
    }
  }, [myAddon]);

  return StoryFn();
};
