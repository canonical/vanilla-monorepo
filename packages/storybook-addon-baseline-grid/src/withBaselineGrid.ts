import { useEffect, useGlobals } from "storybook/internal/preview-api";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";

import { KEY } from "./constants.js";


export const withBaselineGrid = (StoryFn: StoryFunction<Renderer>) => {
  const [globals] = useGlobals();
  const myAddon = globals[KEY];

  const utilityClassName = "with-baseline-grid";
  const utilityTagId = "baseline-grid-style";
  const color = `rgba(255, 0, 0, 0.2)`
  const defaultHeight = '0.5rem'

  const styleElement = `
  .${utilityClassName} {
    --color-baseline-grid: ${color};
    position: relative;
  
    &::after {
      background: linear-gradient(
        to top,
        var(--color-baseline-grid),
        var(--color-baseline-grid) 1px,
        transparent 1px,
        transparent
      );
      background-size: 100% var(--sp-unit, ${defaultHeight});
      bottom: 0;
      content: "";
      display: block;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 200;
    }
  }
  `

  useEffect(() => {
    const styleExists = global.document.getElementById(utilityTagId);
    if (!styleExists) {
      const style = global.document.createElement("style");
      style.id = utilityTagId;
      style.textContent = styleElement;
      global.document.head.appendChild(style);
    }
    if (myAddon) {
      global.document.body.classList.add(utilityClassName);
    } else {
      global.document.body.classList.remove(utilityClassName);
    }
  }, [myAddon]);

  return StoryFn();
};
