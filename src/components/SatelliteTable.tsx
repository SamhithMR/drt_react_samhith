import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Satellite } from "../types/satellite";

interface SatelliteTableProps {
  data: Satellite[];
  loading: boolean;
  error: string | null;
}

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

  const handleProceed = () => {
    localStorage.setItem("selectedSatellites", JSON.stringify(selectedRows));
    navigate("/selected");
  };

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  if (loading) {
    return (
      <div className="w-full overflow-x-auto" style={{ maxWidth: "100%" }}>
        <div style={{ minWidth: "1000px" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="p-2 bg-gray-100 text-left">
                    <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <div
          className="overflow-auto"
          style={{
            minWidth: "1000px",
            maxHeight: "800px",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            {[...Array(10)].map((_, rowIdx) => (
              <div
                key={rowIdx}
                style={{
                  width: "100%",
                  display: "table",
                  tableLayout: "fixed",
                }}
              >
                <div className="table-row">
                  {[...Array(5)].map((_, colIdx) => (
                    <div
                      key={colIdx}
                      className="table-cell px-2 py-3 border-b"
                      style={colIdx === 0 ? { width: "16rem" } : {}}
                    >
                      <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="w-full overflow-x-auto" style={{ maxWidth: "100%" }}>
      <div className="flex items-center justify-between my-2">
        <span className="text-sm">Selected: {selectedRows.length} / 10</span>
        {selectionError && (
          <span className="text-red-500 text-sm">{selectionError}</span>
        )}
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

      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ minWidth: "1000px", maxHeight: "500px", position: "relative" }}
      >
        <div style={{ height: `${totalSize}px`, position: "relative" }}>
          {virtualRows.map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];

            const isSelected = selectedRows.some(
              (r) => r.noradCatId === row.original.noradCatId
            );

            const handleCheckboxChange = () => {
              const alreadySelected = isSelected;
              if (!alreadySelected && selectedRows.length >= 10) {
                setSelectionError("You can select a maximum of 10 rows.");
                return;
              }

              setSelectionError("");
              setSelectedRows((prev) =>
                alreadySelected
                  ? prev.filter((r) => r.noradCatId !== row.original.noradCatId)
                  : [...prev, row.original]
              );
            };

            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                  display: "table",
                  tableLayout: "fixed",
                }}
              >
                <div className="table-row">
                  {row.getVisibleCells().map((cell, i) => {
                    const value = cell.getValue();
                    const isSelected = selectedRows.some(
                      (r) => r.noradCatId === row.original.noradCatId
                    );

                    const handleCheckboxChange = () => {
                      const alreadySelected = isSelected;
                      if (!alreadySelected && selectedRows.length >= 10) {
                        setSelectionError(
                          "You can select a maximum of 10 rows."
                        );
                        return;
                      }

                      setSelectionError("");
                      setSelectedRows((prev) =>
                        alreadySelected
                          ? prev.filter(
                              (r) => r.noradCatId !== row.original.noradCatId
                            )
                          : [...prev, row.original]
                      );
                    };

                    return (
                      <div
                        key={cell.id}
                        className={`table-cell p-2 border-b ${
                          i === 0 ? "w-64 min-w-[16rem] max-w-[20rem]" : ""
                        }`}
                        style={i === 0 ? { width: "16rem" } : {}}
                      >
                        {i === 0 ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={handleCheckboxChange}
                            />
                            {value === null ||
                            value === undefined ||
                            value === "" ||
                            value == "UNKNOWN"
                              ? "—"
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                          </div>
                        ) : value === null ||
                          value === undefined ||
                          value === "" ||
                          value == "UNKNOWN" ? (
                          "—"
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" m-2">
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
