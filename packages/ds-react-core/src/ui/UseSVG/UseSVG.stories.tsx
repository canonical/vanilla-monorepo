/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */

// Needed for function-based story, safe to remove otherwise
// import type { UseSVGProps } from './types.js'
import type { Meta, StoryObj } from "@storybook/react";
import Component from "./UseSVG.js";
// Needed for template-based story, safe to remove otherwise
// import type { StoryFn } from '@storybook/react'

const meta = {
  title: "UseSVG",
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
    // href: "/sprite.svg",
    className: "positive",
    spriteTarget: "arrow",
  },
};

export const ApertureIcon: Story = {
  args: {
    // href: "/sprite.svg",
    className: "negative",
    spriteTarget: "aperture",
  },
};

export const ApertureIconAnimated: Story = {
  args: {
    // href: "/sprite.svg",
    className: "positive",
    spriteTarget: "aperture",
    animated: true,
  },
};

/*
  Function-based story
  Direct arguments passed to the component
  Simple, but can lead to repetition if used across multiple stories with similar configurations

  export const Default = (args: UseSVGProps) => <Component {...args} />;
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

  export const Default: StoryFn<typeof Component> = () => (
    <Component><span>Hello world!</span></Component>
  );
*/
