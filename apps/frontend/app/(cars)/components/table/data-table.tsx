"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Link from "next/link";

interface CarsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type Car = {
  id: number;
  make: string;
  model: string;
  imgUrl?: string;
};

export const mockData: Car[] = [
  {
    id: 1,
    make: "opel",
    model: "astra",
  },
  {
    id: 2,
    make: "honda",
    model: "civic",
  },
];

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
];

export function CarsTable<TData, TValue>({
  columns,
  data,
}: CarsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-0">
                  <Link
                    href={`/car/${row.getValue("id")}`}
                    className="p-4 block"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
