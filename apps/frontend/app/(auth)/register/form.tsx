"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { post } from "@/lib/fetch";

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), // TODO: add some more rules to this
});

type RegisterForm = z.infer<typeof registerFormSchema>;

interface RegisterFormProps {
  defaultValues?: Partial<RegisterForm>;
}
export function RegisterForm(props: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.defaultValues,
    resolver: zodResolver(registerFormSchema),
  });

  const { replace } = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await post("/auth/register", {
        body: data,
      });

      if (res.status === 201) {
        replace("/");
      }
    } catch (e) {
      console.error(e);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <Input id="email" placeholder="Email" {...register("email")} required />
      <Input
        id="password"
        placeholder="Password"
        type="password"
        {...register("password")}
        required
      />
      {errors.root && <span>This field is smth {errors.root?.message}</span>}
      <Input type="submit" />
    </form>
  );
}
