/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";
import { KeyboardEvent, useRef } from "react";
import Tab from "ui/Tab/Tab.js";
import "./Tabs.css";
import type { TabsPropsType } from "./types.js";

const componentCssClassName = "ds tabs";
/**
 * description of the Tabs component
 * @returns {React.ReactElement} - Rendered Tabs
 */
const Tabs = ({
  tabs,
  value,
  onChange,
  className,
  style,
  ...props
}: TabsPropsType): React.ReactElement => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === value);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    if (event.key === "ArrowRight") {
      newIndex = (currentIndex + 1) % tabs.length;
      event.preventDefault();
    } else if (event.key === "ArrowLeft") {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      event.preventDefault();
    }

    if (newIndex !== currentIndex) {
      onChange(tabs[newIndex].id);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <div
      style={style}
      className={[componentCssClassName, className].filter(Boolean).join(" ")}
      role="tablist"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={`tab-${tab.id}`}
          className={tab.className}
          style={tab.style}
          selected={tab.id === value}
          onClick={() => onChange(tab.id)}
          aria-controls={`panel-${tab.id}`}
          role="tab"
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
