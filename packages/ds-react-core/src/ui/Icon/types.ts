/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";

/**
 * The props for all icons
 */
export interface IconProps {
  /* A unique identifier for the Icon */
  id?: string;
  /* Additional CSS classes */
  className?: string;
  /*
    Optional child icon
    TODO should specific icon components be allowed to have children? If not we can set this to `never` or remove it.
    TODO this isn't 100% type-safe.
      We could specify the child must be something like React.ReactElement<SVGElement> to allow only SVG as children.
      But React `children` can only said to be JSX elements, so we'd need to pass the SVG as a prop rather than a child like this:
      <Icon svg={IconSvg} />
  */
  children?: React.ReactNode;
  /* Inline styles */
  style?: React.CSSProperties;
}

/**
 * The props for the abstract base icon that other icons are composed of
 */
export interface BaseIconProps extends IconProps {
  /* Whether the icon defines its own coloring. If true, themed coloring will be disabled. */
  colored?: boolean;
  /** The child icon. Required for compositions of the base Icon component. */
  children: React.ReactNode;
}
