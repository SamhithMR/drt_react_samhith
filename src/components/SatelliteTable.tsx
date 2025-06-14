import React, { useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Satellite } from '../types/satellite';

interface SatelliteTableProps {
  data: Satellite[];
  loading: boolean;
  error: string | null;
}

const columns: ColumnDef<Satellite>[] = [
  {header: 'ID',cell: (info) => info.row.index + 1,size: 60,},
  { accessorKey: 'name', header: 'Name', size: 200 },
  { accessorKey: 'noradCatId', header: 'NORAD ID', size: 100 },
  { accessorKey: 'orbitCode', header: 'Orbit Code', size: 60 },
  // { accessorKey: 'objectType', header: 'Object Type', size: 120 },
  // { accessorKey: 'countryCode', header: 'Country', size: 100 },
  // { accessorKey: 'launchDate', header: 'Launch Date', size: 120 },
];

export const SatelliteTable: React.FC<SatelliteTableProps> = ({ data, loading, error }) => {

  console.log({data})
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // average row height in px
    overscan: 5,
  });
  
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 bg-gray-100 text-left"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      {/* Virtualized Table Body */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ maxHeight: '500px', position: 'relative' }}
      >
        <div style={{ height: `${totalSize}px`, position: 'relative' }}>
          {virtualRows.map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <div
                key={row.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: '100%',
                  display: 'table',
                  tableLayout: 'fixed',
                }}
              >
                <div className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="table-cell p-2 border-b">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
