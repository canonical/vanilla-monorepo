/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from 'react'

export interface IconProps {
  /* A unique identifier for the Icon */
  id?: string;
  /* Additional CSS classes */
  className?: string;
  /* Child elements */
  children?: React.ReactNode;
  /* Inline styles */
  style?: React.CSSProperties;
  /* Is colored? */
  colored?: boolean;
}