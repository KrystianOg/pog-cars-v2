"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./car-form.module.css";

import { carCreateSchema as carFormSchema } from "../../../../backend/src/cars/cars.schema";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";

interface CarFormProps {
  defaultValues?: z.infer<typeof carFormSchema>;
}

export function CarForm({ defaultValues }: CarFormProps) {
  const { register, handleSubmit, formState} = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues,
  });

  console.log('form state', formState)

  const onSubmit = handleSubmit((values) => {
    console.log("car form values", values);
  });

  useEffect(() => {

    console.log(formState.isValid, formState.errors)
  }, [formState])


  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input id="mileage" placeholder="Mileage" type="number" {...register("mileage")} />
      <div>
        <Label htmlFor="horsepower">Horsepower</Label>
        <Input
          id="horsepower"
          placeholder="Horsepower"
          type="number"
          {...register("horsepower")}
        />
      </div>
      <Input id="seats" placeholder="Seats" type="number" min={1} {...register("seats")} />
      <Input
        // TODO: make it select
        id="drivetrain"
        placeholder="Drivetrain"
        {...register("drivetrain")}
      />
      <Input id="price" placeholder="Price" type="number" {...register("price")} />
      <Input id="year" placeholder="Production year" type="number" min={1886} {...register("year")} />
      <Input id="model" placeholder="Model" {...register("model")} />
      <Input id="make" placeholder="Make" {...register("make")} />
      <Button type="submit" disabled={!formState.isValid || !formState.isDirty} style={{gridColumn: '1/3'}}>Submit</Button>
    </form>
  );
}
