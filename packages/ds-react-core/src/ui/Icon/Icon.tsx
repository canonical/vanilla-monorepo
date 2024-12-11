/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";
import type { BaseIconProps } from "./types.js";
import "./Icon.css";

const componentCssClassName = "ds icon";

/**
 * Base Icon component. This can be used to render any SVG
 * @returns {React.ReactElement} - Rendered Icon
 */
const Icon = ({
  id,
  children,
  className,
  style,
  colored = false,
  ...props
}: BaseIconProps): React.ReactElement => {
  return (
    <i
      id={id}
      style={style}
      className={[componentCssClassName, colored && "colored", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </i>
  );
};

export default Icon;
