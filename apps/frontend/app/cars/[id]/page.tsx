import { get } from "@/lib/fetch";
import type { Car } from "../../../../backend/src/cars/cars.schema";
import { Button } from "@/components/ui/button";

interface CarParams {
  params: {
    id: string;
  };
}

async function fetchData(id: string | number): Promise<Car> {
  const res = await get(`cars/${id}`);

  if (!res || res.status === 404) {
    throw new Error();
  }
  return await res.json();
}

export default async function Car({ params }: CarParams) {
  const carId = parseInt(params.id);

  if (isNaN(carId)) {
    throw new Error(`Not a valid id.`);
  }

  const car = await fetchData(carId);

  return (
    <main>
      Something about car {car.id}
      <Button onClick={() => fetchData(carId)}>Click</Button>
    </main>
  );
}
