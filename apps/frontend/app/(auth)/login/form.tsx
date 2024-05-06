"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { post } from "@/lib/fetch";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginForm = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  defaultValues?: Partial<LoginForm>;
}

export function LoginForm(props: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.defaultValues,
    resolver: zodResolver(loginFormSchema),
  });

  const { replace } = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await post("/auth/login", {
        body: data,
      });

      if (res.status === 200) {
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
