"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const rentFormSchema = z.object({
  carId: z.number(),
  start: z.date(),
  end: z.date(),
  discountCode: z.string().optional(),
});

export function RentForm() {
  const form = useForm<z.infer<typeof rentFormSchema>>({
    resolver: zodResolver(rentFormSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    // TODO: create fetch to db
    console.log("rent form values: ", values);
  });

  return <form onSubmit={handleSubmit}></form>;
}
