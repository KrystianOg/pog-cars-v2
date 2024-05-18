"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.global.css";

import type { EventInput } from "@fullcalendar/core";
import { useRouter } from "next/navigation";
import { useCalendar } from "../../hooks/useCalendar";
import { Button } from "@/components/ui/button";
import { RRule } from "rrule";

const rrule = () => {
  const serialize = (obj: RRule): string => obj.toString();

  const deserialize = (repr: string): RRule => RRule.fromString(repr);

  return {
    serialize,
    deserialize,
  };
};

interface CalendarProps {
  events?: EventInput;
}
export const Calendar = ({ events }: CalendarProps) => {
  const router = useRouter();
  const [calendar, { addEvent, removeEvent, getEvent }] = useCalendar();

  const base = new RRule({
    freq: RRule.DAILY,
    dtstart: new Date("2024-05-10"),
    until: new Date("2024-05-26"),
  });

  return (
    <>
      <FullCalendar
        ref={calendar}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          rrulePlugin,
        ]}
        initialView="dayGridMonth"
        firstDay={1}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        nowIndicator
        events={[
          {
            title: "d",
            rrule: base.toString(),
            exdate: ["2024-05-18"],
          },
        ]}
        // eventClick={eventClick}
        selectMirror
        select={(arg) => {
          console.log("arg", arg);
        }}
        selectable
        editable
        eventMouseEnter={(arg) => {
          router.prefetch(`/cars/${arg.event.extendedProps.carId}`);
        }}
      />
      <Button onClick={() => addEvent(events![0])}>add</Button>
      <Button
        onClick={() => {
          removeEvent("1");
        }}
      >
        remove
      </Button>
      <Button
        onClick={() => {
          const res = getEvent("1");
          console.log("event", res);
        }}
      >
        get
      </Button>
    </>
  );
};
