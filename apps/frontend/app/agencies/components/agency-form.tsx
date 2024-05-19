"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./agency-form.module.css";
import { agencySchema as agencyFormSchema } from "../../../../backend/src/agencies/agencies.schema";

interface AgencyFormProps {
  defaultValues?: z.infer<typeof agencyFormSchema>;
}

export function AgencyForm({ defaultValues }: AgencyFormProps) {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof agencyFormSchema>
  >({
    resolver: zodResolver(agencyFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit((values) => {
    // console.log("agency form values", values);
  });

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {/* TODO: rearrange this */}
      <Input id="name" placeholder="Name" {...register("name")} />
      <Input
        id="city"
        placeholder="City"
        min={1}
        {...register("address.city")}
      />
      <Input id="city" placeholder="City" {...register("address.state")} />
      <Input id="street" placeholder="Street" {...register("address.street")} />
      <Input
        id="country"
        placeholder="Country"
        {...register("address.country")}
      />
      <Input
        id="postal_code"
        placeholder="Postal code"
        {...register("address.postal_code")}
      />
      <Button
        type="submit"
        disabled={!formState.isValid || !formState.isDirty}
        style={{ gridColumn: "1/3" }}
      >
        Submit
      </Button>
    </form>
  );
}
