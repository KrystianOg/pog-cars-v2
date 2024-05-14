import { classnames } from "@/utils/classnames";
import * as React from "react";

export type AsChildProps<T> =
  | ({ asChild?: false } & T)
  | { asChild: true; children: React.ReactNode };

export const Slot = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
}) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      style: {
        ...props.style,
        ...children.props.style,
      },
      className: classnames(props.className, children.props.className),
    });
  }

  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }

  return null;
};

export function isSlot<T>(
  slot: AsChildProps<T>,
): slot is { asChild: true; children: React.ReactNode } {
  return !!slot.asChild;
}

export function isComponent<T>(
  slot: AsChildProps<T>,
): slot is { asChild?: false } & T {
  return !slot.asChild;
}
