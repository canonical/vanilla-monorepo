/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Component from "./Tab.js";

const meta = {
  title: "Tab",
  component: Component,
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: (args) => (
    <div>
      <Component selected {...args}>Tab 1</Component>
      <Component selected={false} {...args}>Tab 2</Component>
    </div>
  ),
};
