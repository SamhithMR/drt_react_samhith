// SatelliteTableBody.tsx
import React from "react";
import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SatelliteTableBodyProps } from "../types/satellite";

export const SatelliteTableBody: React.FC<SatelliteTableBodyProps> = ({
  table,
  parentRef,
  selectedRows,
  setSelectedRows,
  setSelectionError,
}) => {
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
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
                          value === "UNKNOWN"
                            ? "—"
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                        </div>
                      ) : value === null ||
                        value === undefined ||
                        value === "" ||
                        value === "UNKNOWN" ? (
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
  );
};
