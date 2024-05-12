"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went terribly wrong!</h2>
      <Link href="/cars">Go to cars</Link>
    </div>
  );
}
