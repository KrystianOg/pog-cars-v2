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

/**
 * how to handle recurring data in db
 *
 * I think in the beginning user should specify base rrule
 * the rrule is then sent to backend where it is transformed to be stored in db
 * rrule is store as its string representation with unique id the events are then inserted into db
 * on rrule update all related events are checked if they still are valid
 *
 * - when event is moved it is checked if its time is valid in rrule (only start time really matters)
 *   if it is valid the rrule exception is deleted, if it is not exception is created
 *
 *   when querying events
 */
const rrule = () => {
  const serialize = (obj: RRule): string => obj.toString();

  const deserialize = (repr: string): RRule => RRule.fromString(repr);

  // so thre can be recurring event that is specified as rrule and can be edited

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
    dtstart: new Date("2024-05-10T10:00:00"),
    until: new Date("2024-05-26"),
  });

  const exclude = new RRule({
    freq: RRule.DAILY,
    dtstart: new Date("2024-05-15T10:00:00"),
    until: new Date("2024-05-20T10:00:00"),
  });
  console.log(base.all().join("\n"));
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
            title: "dupa",
            rrule: base.toString(),
            // exrule: exclude.options,
            exdate: ["2024-05-22T10:00:00"],
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
