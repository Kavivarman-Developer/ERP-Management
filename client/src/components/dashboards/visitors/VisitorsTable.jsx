import { useState } from "react";

const PAGE_SIZE = 10;

export default function VisitorsTable({ data, loading, total }) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const rows = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) return <SkeletonTable />;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <span className="text-sm font-medium text-slate-900">Visitor records</span>
        <span className="text-xs text-slate-500">
          Showing {data.length} of {total} entries
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-slate-50">
            <tr>
              {["#","Name","Phone","Purpose","Patient","Entry time","Status"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium text-slate-500 uppercase tracking-wide border-b border-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((v, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                <td className="px-4 py-2.5 text-[11px] text-slate-400">
                  {String((page - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-2.5 text-xs font-medium text-slate-900">{v.name}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{v.phone}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{v.purpose}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{v.patientName}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500">{v.entryTime}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                    v.status === "Inside"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${v.status === "Inside" ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100">
        <span className="text-xs text-slate-500">Page {page} of {pages}</span>
        <div className="flex gap-1">
          <PgBtn onClick={() => setPage((p) => Math.max(1, p - 1))} label="‹" />
          {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map((n) => (
            <PgBtn key={n} onClick={() => setPage(n)} label={n} active={n === page} />
          ))}
          <PgBtn onClick={() => setPage((p) => Math.min(pages, p + 1))} label="›" />
        </div>
      </div>
    </div>
  );
}

function PgBtn({ onClick, label, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 rounded text-[11px] border transition-colors ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function SkeletonTable() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3 border-b border-slate-100 animate-pulse">
          {[...Array(7)].map((_, j) => (
            <div key={j} className="h-3 bg-slate-100 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}