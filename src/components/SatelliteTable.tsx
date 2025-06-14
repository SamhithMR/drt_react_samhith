import React, { useRef, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Satellite } from '../types/satellite';

interface SatelliteTableProps {
  data: Satellite[];
  loading: boolean;
  error: string | null;
}

const columns: ColumnDef<Satellite>[] = [
  { accessorKey: 'name', header: 'Name', size: 200 },
  { accessorKey: 'noradCatId', header: 'NORAD ID', size: 100 },
  { accessorKey: 'orbitCode', header: 'Orbit Code', size: 60 },
  { accessorKey: 'objectType', header: 'Object Type', size: 120 },
  { accessorKey: 'countryCode', header: 'Country', size: 100 },
  { accessorKey: 'launchDate', header: 'Launch Date', size: 120 },
];

export const SatelliteTable: React.FC<SatelliteTableProps> = ({ data, loading, error }) => {

  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }]);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting }
  });
  
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 10, 
    overscan: 5,
  });
  
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  
  return (
    <div className="w-full overflow-x-auto" style={{ maxWidth: '100%' }}>
      <div style={{ minWidth: '1000px'  }}>
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 bg-gray-100 text-left whitespace-nowrap cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: '▲', desc: '▼'}[header.column.getIsSorted() as string] ?? null }
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
        style={{ minWidth: '1000px', maxHeight: '500px', position: 'relative' }}
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
                  tableLayout: 'fixed'
                }}
              >
                <div className="table-row">
                  {row.getVisibleCells().map((cell) => {
                    const value = cell.getValue();
                       return (
                         <div key={cell.id} className="table-cell p-2 border-b">
                          {value === null || value === undefined || value === '' || value == 'UNKNOWN' ? '—' : flexRender(cell.column.columnDef.cell, cell.getContext())}
                         </div>
                    );
                    })}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
