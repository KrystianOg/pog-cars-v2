import styles from "./button.module.css";
import { classnames } from "@/utils/classnames";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "destructive";
}

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={classnames(
        styles.button,
        className,
        variant && styles[variant],
      )}
      {...props}
    />
  );
}
