"use client";

import { useEffect } from "react";
type EventListeners = Record<string, (event: MessageEvent<any>) => any>;

export const useSSE = (subpath: string, eventListeners: EventListeners) => {
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${subpath}`
    );

    for (const key in eventListeners) {
      eventSource.addEventListener(key, eventListeners[key]);
    }

    return () => {
      eventSource.close();
    };
  }, [subpath, eventListeners]);
};
