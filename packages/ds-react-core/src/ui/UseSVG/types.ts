/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";

export interface UseSVGProps {
  /* A unique identifier for the UseSVG */
  id?: string;
  /* Additional CSS classes */
  className?: string;
  /* Child elements */
  children?: React.ReactNode;
  /* Inline styles */
  style?: React.CSSProperties;
  /* The pathname of the sprite */
  spritePathname?: string;
  /* The target sprite to use */
  spriteTarget: string;
}
