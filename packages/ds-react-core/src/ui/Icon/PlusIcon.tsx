/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from 'react';
import type { IconProps } from './types.js';
import Icon from './Icon.js';
import IconSvg from './svg/plus.svg?react';

/**
 * description of the Icon component
 * @returns {React.ReactElement} - Rendered Icon
 */
const PlusIcon = ({
  id,
  className,
  style,
  ...props
}: IconProps): React.ReactElement => {
  return (
    <Icon id={id} className={className} style={style} {...props} >
      <IconSvg />
    </Icon>
  );
}

export default PlusIcon;