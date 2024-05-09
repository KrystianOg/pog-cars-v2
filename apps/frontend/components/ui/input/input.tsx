import React from "react";
import { classnames } from "@/utils/classnames";
import styles from "./input.module.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        className={classnames(styles.input, className)}
        ref={ref}
      />
    );
  },
);

Input.displayName = "Input";
export { Input };
