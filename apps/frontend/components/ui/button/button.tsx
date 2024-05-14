import styles from "./button.module.css";
import { classnames } from "@/utils/classnames";
import { Slot, type AsChildProps, isComponent } from "../slot";

export type ButtonProps = AsChildProps<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "destructive" }
> & {
  style?: React.CSSProperties;
  className?: string;
};

export function Button(props: ButtonProps) {
  const Comp = props.asChild ? Slot : "button";

  return (
    <Comp
      className={classnames(
        styles.button,
        props.className,
        isComponent(props) && props.variant && styles[props.variant],
      )}
      {...props}
    />
  );
}
