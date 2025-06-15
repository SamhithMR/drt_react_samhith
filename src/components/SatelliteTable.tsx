// SatelliteTable.tsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";

import { SatelliteTableProps, Satellite } from "../types/satellite";
import { TableSekeleton } from "./Skeleton";
import { SatelliteTableBody } from "./SatelliteTableBody";

const columns: ColumnDef<Satellite>[] = [
  { accessorKey: "name", header: "Name", size: 200 },
  { accessorKey: "noradCatId", header: "NORAD ID", size: 100 },
  {
    accessorKey: "orbitCode",
    header: "Orbit Code",
    size: 60,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value?.replace(/^\{|\}$/g, "") || "—";
    },
  },
  { accessorKey: "objectType", header: "Object Type", size: 120 },
  { accessorKey: "countryCode", header: "Country", size: 100 },
  { accessorKey: "launchDate", header: "Launch Date", size: 120 },
];

export const SatelliteTable: React.FC<SatelliteTableProps> = ({
  data,
  loading,
  error,
}) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const [selectedRows, setSelectedRows] = useState<Satellite[]>(() =>
    JSON.parse(localStorage.getItem("selectedSatellites") || "[]")
  );
  const [selectionError, setSelectionError] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const handleProceed = () => {
    localStorage.setItem("selectedSatellites", JSON.stringify(selectedRows));
    navigate("/selected");
  };

  if (loading) return <TableSekeleton />;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  if (!data || data.length === 0)
    return <div className="text-center text-red-500 py-4">Data not available</div>;

  return (
    <div className="w-full overflow-x-auto" style={{ maxWidth: "100%" }}>
      <div className="flex items-center justify-between my-2">
        <span className="text-sm">Selected: {selectedRows.length} / 10</span>
        {selectionError && (
          <span className="text-red-500 text-sm">{selectionError}</span>
        )}
        <span>total rows: {table.getRowModel().rows.length}</span>
      </div>

      <div style={{ minWidth: "1000px" }}>
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header, i) => (
                  <th
                    key={header.id}
                    className="p-2 bg-gray-100 text-left whitespace-nowrap cursor-pointer select-none"
                    style={i === 0 ? { width: "16rem" } : {}}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{ asc: "▲", desc: "▼" }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      <SatelliteTableBody
        table={table}
        parentRef={parentRef}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        setSelectionError={setSelectionError}
      />

      <div className="m-2">
        <button
          className="ml-auto block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleProceed}
          disabled={selectedRows.length === 0}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};
