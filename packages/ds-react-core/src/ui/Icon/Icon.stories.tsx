/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */

import Component from "./Icon.js";
import PlusIcon from "./PlusIcon.js";
import SuccessIcon from "./SuccessIcon.js";

// Needed for function-based story, safe to remove otherwise
// import type { IconProps } from './types.js'
import type { Meta, StoryObj } from "@storybook/react";
// Needed for template-based story, safe to remove otherwise
import type { StoryFn } from '@storybook/react'

const meta = {
  title: "Icon",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

/*
  CSF3 story
  Uses object-based story declarations with strong TS support (`Meta` and `StoryObj`).
  Uses the latest storybook format.
*/
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Hello world!</span>
  },
};


/*
  Function-based story
  Direct arguments passed to the component
  Simple, but can lead to repetition if used across multiple stories with similar configurations

  export const Default = (args: IconProps) => <Component {...args} />;
  Default.args = { children: <span>Hello world!</span> };
*/

/*
  Template-Based story
  Uses a template function to bind story variations, making it more reusable
  Slightly more boilerplate but more flexible for creating multiple stories with different configurations

  const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;
  export const Default: StoryFn<typeof Component> = Template.bind({});
  Default.args = {
    children: <span>Hello world!</span>
  };
*/

/*
  Static story
  Simple and straightforward, but offers the least flexibility and reusability
*/
  export const Plus: StoryFn<typeof Component> = () => (
    <PlusIcon />
  );

  /*
  Static story
  Simple and straightforward, but offers the least flexibility and reusability
*/
export const Success: StoryFn<typeof Component> = () => (
  <SuccessIcon />
);

