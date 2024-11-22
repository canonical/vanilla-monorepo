/* <%= pkg %> <%= version %> */

import type { Meta, StoryObj } from "@storybook/react";

import <%= componentName %> from "./<%= componentName %>.js";

const meta = {
  title: "<%= componentName %>",
  component: <%= componentName %>,
} satisfies Meta<typeof <%= componentName %>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // argName: "argValue",
  },
};
