/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */

import { useState } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { default as Component } from "./Tabs.js";

const meta = {
  title: "Tabs",
  component: Component,
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

//@ts-ignore
export const Default: Story = {
  render: (args) => {
    const tabs = [
      { id: "tab1", label: "Tab One" },
      { id: "tab2", label: "Tab Two" },
      { id: "tab3", label: "Tab Three" },
    ];
    const [selectedTab, setSelectedTab] = useState(tabs[0].id);

    return (
      <div>
        <Component
          value={selectedTab}
          onChange={(tabId) => setSelectedTab(tabId)}
          tabs={tabs}
        />
        <div role="tabpanel" id="panel-tab1" hidden={selectedTab !== "tab1"}>
          Panel 1
        </div>
        <div role="tabpanel" id="panel-tab2" hidden={selectedTab !== "tab2"}>
          Panel 2
        </div>
        <div role="tabpanel" id="panel-tab3" hidden={selectedTab !== "tab3"}>
          Panel 3
        </div>
      </div>
    );
  },
};
