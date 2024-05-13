import { useState } from "react";
import { Button } from "../button";
import styles from "./tabs.module.css";
import { classnames } from "@/utils/classnames";

interface TabsProps<T> {
  tabs: T[];
}

interface TabTriggerProps<T>
  extends Omit<React.ComponentProps<"li">, "onClick">,
    Pick<React.ComponentProps<"button">, "onClick"> {
  tab: T;
  active: boolean;
}

export const TabTrigger = <T extends string>({
  tab,
  children,
  className,
  active,
  onClick,
  ...props
}: TabTriggerProps<T>) => (
  <li
    className={classnames(className, "tab", active && styles["tab--active"])}
    {...props}
  >
    <Button role="tab" onClick={onClick}>
      {children}
    </Button>
  </li>
);

interface TabContentProps<T> extends React.ComponentProps<"div"> {
  tab: T;
  active: boolean;
}

export const TabContent = <T extends string>({
  tab,
  active,
  className,
  ...props
}: TabContentProps<T>) => (
  <div
    {...props}
    hidden={!active}
    className={classnames(
      className,
      "tab__content",
      active && styles["tab_-content--active"],
    )}
  />
);

export const Tabs = <T extends string>({ tabs }: TabsProps<T>) => {
  const [current, setCurrent] = useState<(typeof tabs)[number] | undefined>(
    tabs.length ? tabs[0] : undefined,
  );

  return (
    <div className={styles.tabs}>
      <ol className={styles["tabs__list"]}>
        {tabs.map((tab) => (
          <TabTrigger
            key={tab}
            onClick={() => setCurrent(tab)}
            tab={tab}
            active={tab === current}
          >
            {tab}
          </TabTrigger>
        ))}
      </ol>

      {tabs.map((tab) => (
        <TabContent key={tab} tab={tab} active={tab === current}>
          {tab}
        </TabContent>
      ))}
    </div>
  );
};
