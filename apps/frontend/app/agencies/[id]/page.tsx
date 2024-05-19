import { get } from "@/lib/fetch";
import type { Agency } from "../../../../backend/src/agencies/agencies.schema";
import { redirect } from "next/navigation";

export const revalidate = 0;

interface AgencyParams {
  params: {
    id: string;
  };
}

async function fetchData(id: string | number): Promise<Agency> {
  const res = await get(`cars/${id}`);

  if (!res || res.status === 404) {
    redirect("/agencies");
  }
  return await res.json();
}

export default async function Agency({ params }: AgencyParams) {
  const agencyId = parseInt(params.id);

  if (isNaN(agencyId)) {
    redirect("/agencies");
  }

  const agency = await fetchData(agencyId);

  return (
    <main>
      <p>Agency data: {JSON.stringify(agency)}</p>
    </main>
  );
}
