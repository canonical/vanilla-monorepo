/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";
import Icon from "../../Icon.js";
import IconSvg from "../../svg/plus.svg?react";
import type { PlusIconProps } from "./types.js";

/**
 * description of the PlusIcon component
 * @returns {React.ReactElement} - Rendered PlusIcon
 */
const PlusIcon = ({
  id,
  className,
  style,
  ...props
}: PlusIconProps): React.ReactElement => {
  return (
    <Icon id={id} className={className} style={style} {...props}>
      <IconSvg />
    </Icon>
  );
};

export default PlusIcon;
