"use client";
import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import styles from "./feature-discovery.module.css";
import { classnames } from "@/utils/classnames";

type FeatureDiscoveryKey = "after-register" | "after-agency-create";

export const useFeatureDiscovery = <T extends HTMLElement>(
  key: FeatureDiscoveryKey,
) => {
  const ref = useRef<T | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const [value, setValue] = useLocalStorage<boolean>(
    `feature-discovery-${key}`,
    false,
  );

  useEffect(() => {
    function updateBoundingRect() {
      rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    }

    updateBoundingRect();
    ref.current?.addEventListener("resize", updateBoundingRect);
    ref.current?.addEventListener("scroll", updateBoundingRect);

    return () => {
      if (!ref.current) return;

      ref.current.removeEventListener("resize", updateBoundingRect);
      ref.current.removeEventListener("scroll", updateBoundingRect);
    };
  }, []);

  return [ref, rectRef, { value, setValue }] as const;
};

interface FeatureDiscoveryProps extends React.ComponentProps<"div"> {
  discoveryKey: FeatureDiscoveryKey;
}
// FIXME: ok leaving it for now as idk how to handle this
export const FeatureDiscovery = ({
  children,
  discoveryKey,
  ...props
}: FeatureDiscoveryProps) => {
  const [childRef, rectRef, { value, setValue }] =
    useFeatureDiscovery<HTMLDivElement>(discoveryKey);

  useEffect(() => {
    console.log("new rect", rectRef.current);
  }, [rectRef]);

  const style: CSSProperties | undefined = useMemo(() => {
    const cur = rectRef.current;

    if (!cur) return;

    return {
      width: cur.width,
      height: cur.height,
    };
  }, [rectRef]);

  if (value) return children;

  return (
    <div className={styles["feature-discovery"]}>
      <div
        {...props}
        className={classnames(!value && styles["feature-discovery"])}
      />
      <div ref={childRef} className={styles["content-container"]}>
        {children}
      </div>
    </div>
  );
};
