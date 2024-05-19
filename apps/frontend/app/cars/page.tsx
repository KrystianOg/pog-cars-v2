import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CarForm } from "./components/car-form";
import { type Car } from "../../../backend/src/cars/cars.schema";
import { get } from "@/lib/fetch";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0;

async function fetchData(): Promise<Car[]> {
  const res = await get("cars");
  if (!res || res.status >= 400) {
    redirect("/");
  }

  const smth = await res.json();

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
