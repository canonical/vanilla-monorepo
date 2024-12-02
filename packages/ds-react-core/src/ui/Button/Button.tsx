import type React from "react";

import "./styles.css";

// TODO: this is how appearance could work as enum
//
// export enum ButtonAppearance {
//   DEFAULT = "default",
//   BASE = "base",
//   POSITIVE = "positive",
//   NEGATIVE = "negative",
//   LINK = "link",
// }

export interface ButtonProps {
  /* A unique identifier for the button */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** The visual style of the button */
  appearance?: "neutral" | "base" | "positive" | "negative" | "link";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

// combine custom props with all native button element attributes
export type ButtonPropsType = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

/** Buttons are clickable elements used to perform an action. */
const Button = ({
  id,
  className,
  appearance,
  label,
  ...props
}: ButtonPropsType): React.ReactElement => {
  return (
    <button
      id={id}
      className={["ds", "button", appearance, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;
