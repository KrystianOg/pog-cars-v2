"use client";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h2>Something went terribly wrong!</h2>
      <Link href="/cars">Go to cars</Link>
    </div>
  );
}
