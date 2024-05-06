import { CarsTable, mockData, columns } from "../components/table/data-table";

export default function Cars() {
  return (
    <main>
      Cars page here
      <CarsTable columns={columns} data={mockData} />
    </main>
  );
}
