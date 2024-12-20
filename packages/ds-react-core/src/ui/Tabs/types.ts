/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";

export type TabData = {
  id: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
};

export interface TabsProps {
  /* The tabs to render */
  tabs: TabData[];

  /* The currently selected tab */
  value: string;

  /* On tab change callback */
  onChange: (value: string) => void;

  /* A unique identifier for the Tabs */
  id?: string;
  /* Additional CSS classes */
  className?: string;
  /* Child elements */
  children?: React.ReactNode;
  /* Inline styles */
  style?: React.CSSProperties;
}

export type TabsPropsType = TabsProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">;
