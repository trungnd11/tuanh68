import type { AppTableProps } from "./types";

export type { AppTableColumn, AppTableRow } from "./types";

export default function AppTable({ columns, rows, className = "", minWidth = "900px" }: AppTableProps) {
  const highlightedCol = columns.findIndex((c) => c.highlighted);

  return (
    <div className={`w-full overflow-x-auto ${className}`.trim()}>
      <table className="w-full border-collapse" style={{ minWidth }}>
        <thead>
          <tr className="bg-[#333]">
            {columns.map((col, i) => (
              <th
                key={col.key}
                className={`px-6 py-4 text-xs font-bold uppercase leading-4 tracking-[0.3px] text-white ${
                  col.width || ""
                } ${i > 0 ? "text-center" : "text-left"} ${i === highlightedCol ? "bg-[rgba(41,115,178,0.7)]" : ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={row.label} className={rowIdx % 2 === 1 ? "bg-[#f1f5f9]" : ""}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {row.icon && <span className="inline-flex w-4 shrink-0 items-center justify-center">{row.icon}</span>}
                  <span className="text-sm font-semibold leading-5 text-[#333]">{row.label}</span>
                </div>
              </td>
              {columns.slice(1).map((col, colIdx) => {
                const value = row.values[col.key] ?? "";
                const isHighlighted = colIdx + 1 === highlightedCol;

                if (row.isBadge) {
                  return (
                    <td
                      key={col.key}
                      className={`px-6 py-4 text-center ${isHighlighted ? "bg-[rgba(41,115,178,0.05)]" : ""}`}
                    >
                      <span
                        className={`inline-flex rounded-full px-3 py-[3.5px] text-xs font-bold leading-4 ${
                          isHighlighted
                            ? "bg-[rgba(41,115,178,0.1)] text-[#2973b2]"
                            : "bg-[rgba(122,156,89,0.1)] text-[#7a9c59]"
                        }`}
                      >
                        {String(value)}
                      </span>
                    </td>
                  );
                }

                return (
                  <td
                    key={col.key}
                    className={`px-6 py-4 text-center text-sm leading-5 ${
                      isHighlighted
                        ? "bg-[rgba(41,115,178,0.05)] font-bold text-[#2973b2]"
                        : "font-normal text-gray-700"
                    }`}
                  >
                    {String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
