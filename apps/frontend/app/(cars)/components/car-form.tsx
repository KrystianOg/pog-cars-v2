"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from './car-form.module.css'

import {carSchema as carFormSchema} from '../../../../backend/src/cars/cars.schema'

interface CarFormProps {
  defaultValues?: z.infer<typeof carFormSchema>;
}

export function CarForm({ defaultValues }: CarFormProps) {
  const { register, handleSubmit } = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit((values) => {
    console.log("car form values", values);

    if (values.id) {
      // TODO update db entry
    } else {
      // TODO create db entry
    }
  });

  return (
      <form onSubmit={onSubmit} className={styles.form}>
        <Input id="mileage" placeholder="Mileage" {...register("mileage")} />
        <Input
          id="horsepower"
          placeholder="Horsepower"
          {...register("horsepower")}
        />
        <Input id="seats" placeholder="Seats" {...register("seats")} />
        <Input
          id="drivetrain"
          placeholder="Drivetrain"
          {...register("drivetrain")}
        />
        <Input id="price" placeholder="Price" {...register("price")} />
        <Input id="year" placeholder="Production year" {...register("year")} />
        <Input id="model" placeholder="Model" {...register("model")} />
        <Input id="make" placeholder="Make" {...register("make")} />
        <Button type="submit">Submit</Button>
      </form>
  );
}
