"use client";
import { Button } from "@/components/ui/button";
import { post } from "@/lib/fetch";
import { useRouter, useSearchParams } from "next/navigation";
import { useSSE } from "@/hooks/useSSE";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("k");

  useSSE(`auth/sse?k=${key}`, {
    "verify-email": () => {
      router.push("/login");
    },
  });

  const emitVerify = () => {
    post("/auth/emit", undefined);
  };
  return (
    <div>
      <Button onClick={emitVerify}>EMIT</Button>
    </div>
  );
}
