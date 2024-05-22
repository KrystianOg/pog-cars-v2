import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { AgencyForm } from "./components/agency-form";
import { type Agency } from "@backend/src/agencies/agencies.schema";
import { get } from "@/lib/fetch";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 300;

async function fetchData(): Promise<Agency[]> {
  const res = await get("cars");
  console.log(JSON.stringify(res));
  if (!res || res.status >= 400) {
    redirect("/");
  }

  const smth = await res.json();

  return smth;
}

export default async function CarsPage() {
  const agencies = await fetchData();

  return (
    <main>
      Cars page here
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <AgencyForm />
        </DialogContent>
      </Dialog>
      {"Cars: "}
      {agencies.map((agency) => (
        <Link href={`/cars/${agency.id}`} key={agency.id}>
          {JSON.stringify(agency)}
        </Link>
      ))}
    </main>
  );
}
