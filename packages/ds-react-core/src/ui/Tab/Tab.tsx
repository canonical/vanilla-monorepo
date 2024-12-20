/* @canonical/generator-canonical-ds 0.4.0-experimental.0 */
import type React from "react";
import "./Tab.css";
import { forwardRef } from "react";
import type { TabPropsType } from "./types.js";

const componentCssClassName = "ds tab";

/**
 * description of the Tab component
 * @returns {React.ReactElement} - Rendered Tab
 */
const Tab = forwardRef(
  (
    { selected, id, className, style, ...props }: TabPropsType,
    ref: React.Ref<HTMLButtonElement>,
  ): React.ReactElement => {
    return (
      <button
        ref={ref}
        id={id}
        style={style}
        className={[componentCssClassName, selected && "selected", className]
          .filter(Boolean)
          .join(" ")}
        aria-selected={selected}
        {...props}
      />
    );
  },
);

export default Tab;
