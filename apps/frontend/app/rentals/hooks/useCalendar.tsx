import type { EventInput } from "@fullcalendar/core/index.js";
import type FullCalendar from "@fullcalendar/react";
import { useMemo, useRef } from "react";

export const useCalendar = () => {
  const ref = useRef<FullCalendar>(null);
  const eventApi = useMemo(() => ref.current?.getApi(), [ref]);

  const addEvent = (event: EventInput) => {
    eventApi?.addEvent(event);
  };

  const removeEvent = (eventId: string) => {
    const event = eventApi?.getEventById(eventId);
    event?.remove();
  };

  const getEvent = (eventId: string) => {
    return ref.current?.getApi().getEventById(eventId);
  };

  return [ref, { addEvent, removeEvent, getEvent }] as const;
};
