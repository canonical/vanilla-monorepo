/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */

import type { Meta } from "@storybook/react";
import type { StoryFn } from "@storybook/react";
import Component from "./Icon.js";
import { PlusIcon, SuccessIcon } from "./icons/index.js";

const meta = {
  title: "Icon",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

export const Plus: StoryFn<typeof PlusIcon> = () => <PlusIcon />;

export const Success: StoryFn<typeof SuccessIcon> = () => <SuccessIcon />;
