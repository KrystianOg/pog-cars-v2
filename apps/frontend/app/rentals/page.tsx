import { RentDialog } from "./components/rent-dialog";

const rentalsMock = [
  {
    id: 1,
    car: {
      id: 1,
    },
    user: {
      id: 1,
    },
    start: "2024-03-01T10:00:03",
    end: "2024-03-15T12:00:00",
    price: 200000,
  },
  {
    id: 2,
    car: {
      id: 2,
    },
    user: {
      id: 1,
    },
    start: "2024-01-01T10:00:02",
    end: "2024-01-17T16:10:00",
    price: 325600,
  },
];

export default function Rentals() {
  return (
    <main>
      <RentDialog />
      <ol>
        {rentalsMock.map((rental) => (
          <li key={rental.id}>{JSON.stringify(rental)}</li>
        ))}
      </ol>
    </main>
  );
}
