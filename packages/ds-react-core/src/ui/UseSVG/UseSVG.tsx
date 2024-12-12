/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";
import type { UseSVGProps } from "./types.js";

import "./styles.css";

/**
 * description of the UseSVG component
 * @returns {React.ReactElement} - Rendered UseSVG
 */
const UseSVG = ({
  id,
  className,
  style,
  spritePathname = "/sprite.svg",
  spriteTarget,
  animated = false,
  // do....
}: UseSVGProps): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="512"
      height="512"
      viewBox="0 0 16 16"
      className={["ds", "svg", className, animated && "animated"]
        .filter(Boolean)
        .join(" ")}
      id={id}
      style={style}
    >
      <title>{spriteTarget}</title>
      <use href={`${spritePathname}#${spriteTarget}`} />
    </svg>
  );
};

export default UseSVG;
