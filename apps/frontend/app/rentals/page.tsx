import { Calendar } from "./components/calendar";
import { RentDialog } from "./components/rent-dialog";

import type { EventInput } from "@fullcalendar/core";
const mockData: EventInput = [
  {
    id: "1",
    title: "Opel Astra 2020",
    start: "2024-05-15T11:00:00",
    end: "2024-05-19T14:00:00",
    editable: true,
    extendedProps: {
      carId: 2,
    },
    // backgroundColor: "var(--muted)",
  },
  {
    id: "2",
    title: "Nissan Juke 2016",
    start: "2024-05-15T09:00:00",
    end: "2024-05-15T18:00:00",
    editable: true,
    extendedProps: {
      carId: 1,
    },
  },
];

export default function Rentals() {
  return (
    <main>
      <RentDialog />
      {/* TODO: display either list or calendar */}
      {/* <ol>
        {rentalsMock.map((rental) => (
          <li key={rental.id}>{JSON.stringify(rental)}</li>
        ))}
      </ol> */}

      <Calendar events={mockData} />
    </main>
  );
}
