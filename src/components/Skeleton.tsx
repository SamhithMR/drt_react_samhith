export const TableSekeleton = () => {
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
};

