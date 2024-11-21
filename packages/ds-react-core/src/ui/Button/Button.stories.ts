import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Component from "./Button.js";

const meta = {
  title: "Button",
  component: Component,
  tags: ["autodocs"],
  // if using enum for appearance, you can use the following to generate controls
  // argTypes: {
  //   appearance: {
  //      control: 'select',
  //      mapping: ButtonAppearance,
  //      options: Object.keys(ButtonAppearance),
  //   }
  // },
  args: { onClick: fn() }, // allows the onClick function to be spyed on
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A default button can be used to indicate a positive action that isn't necessarily the main call-to-action.
 */
export const Default: Story = {
  args: {
    label: "Contact us",
  },
};

/**
 * A positive button can be used to indicate a positive action that is the main call-to-action.
 */
export const Positive: Story = {
  args: {
    label: "Confirm",
    appearance: "positive",
  },
};

/**
 * Custom button props can be passed to the button component.
 */
export const Custom: Story = {
  args: {
    label: "Custom",
    className: "custom-class",
    style: {
      "--button-background-color": "lightblue",
      "--button-text-color": "midnightblue",
      "--button-border-color": "midnightblue",
      "--button-background-color-hover": "lightskyblue",
      "--button-background-color-active": "skyblue",
    } as React.CSSProperties,
  },
};
