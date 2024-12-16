/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";

/**
 * Props for the `Tab` component.
 */
export interface TabProps {
  selected?: boolean;

  /** Unique identifier for the tab. */
  id?: string;

  /** Additional CSS class names. */
  className?: string;

  /** Inline styles for the tab. */
  style?: React.CSSProperties;
}

export type TabPropsType = TabProps & React.HTMLAttributes<HTMLButtonElement>;
