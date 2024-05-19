import { get } from "@/lib/fetch";
import type { Car } from "../../../../backend/src/cars/cars.schema";
import { redirect } from "next/navigation";

export const revalidate = 0;

interface CarParams {
  params: {
    id: string;
  };
}

async function fetchData(id: string | number): Promise<Car> {
  const res = await get(`cars/${id}`);

  if (!res || res.status === 404) {
    redirect("/cars");
  }
  return await res.json();
}

export default async function Car({ params }: CarParams) {
  const carId = parseInt(params.id);

  if (isNaN(carId)) {
    redirect("/cars");
  }

  const car = await fetchData(carId);

  return (
    <main>
      <p>Car data: {JSON.stringify(car)}</p>
    </main>
  );
}
