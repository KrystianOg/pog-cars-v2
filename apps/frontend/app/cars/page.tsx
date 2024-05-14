import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CarForm } from "./components/car-form";
import { type Car } from "../../../backend/src/cars/cars.schema";
import { get } from "@/lib/fetch";
import Link from "next/link";

export const revalidate = 300;

async function fetchData(): Promise<Car[]> {
  const res = await get("cars");

  if (!res || res.status >= 400) {
    throw new Error();
  }

  const smth = await res.json();

  console.log("smth", smth);
  return smth;
}

export default async function CarsPage() {
  const cars = await fetchData();

  return (
    <main>
      Cars page here
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <CarForm />
        </DialogContent>
      </Dialog>
      {"Cars: "}
      {cars.map((car) => (
        <Link href={`/cars/${car.id}`} key={car.id}>
          {car.make} {car.model}
        </Link>
      ))}
    </main>
  );
}
