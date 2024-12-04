import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";

import "index.css";

const preview: Preview = {
  globalTypes: {
    baseline: {
      description: 'Baseline grid',
      toolbar: {
        title: 'Baseline grid',
        items: [{
          value: 'show-baseline-grid',
          icon: 'ruler',
          title: 'Baseline visible',
        },
        {
          value: '',
          icon: 'eyeclose',
          title: 'Baseline hidden',
        },],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    baseline: '',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // add baseline grid class to body based on global toggle
    (story, context) => {
      if (context.globals.baseline === "show-baseline-grid") {
        document.body.classList.add("show-baseline-grid");
      } else {
        document.body.classList.remove("show-baseline-grid");
      }
      return story();
    },
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "is-light",
        dark: "is-dark",
        paper: "is-paper",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
