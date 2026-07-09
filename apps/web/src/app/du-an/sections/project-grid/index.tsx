import Image from "next/image";
import { projectsGridContent } from "./content";

const statusConfig = {
  completed: { label: "HOÀN THÀNH", badgeBg: "bg-[#48a6a7]", hoverBg: "bg-[#48a6a7]" },
  "in-progress": { label: "ĐANG THI CÔNG", badgeBg: "bg-[#7a9c59]", hoverBg: "bg-[#7a9c59]" },
} as const;

export default function ProjectGridSection() {
  const projects = projectsGridContent.grid;
  const layout: { colSpan: string; rowHeight: string; idx: number }[] = [
    { colSpan: "col-span-2", rowHeight: "row-span-1", idx: 0 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 1 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 2 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 3 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 4 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 5 },
    { colSpan: "col-span-2", rowHeight: "row-span-1", idx: 6 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 7 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 8 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 9 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 10 },
    { colSpan: "col-span-1", rowHeight: "row-span-1", idx: 11 },
  ];
  const rowHeights = ["h-[360px]", "h-[300px]", "h-[300px]", "h-[340px]", "h-[280px]"];

  return (
    <section className="flex flex-col items-start bg-[#f8f9fa] px-20 py-16 max-lg:px-8 max-md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-12 px-8">
        <div className="grid w-full grid-cols-3 gap-6">
          {layout.map((item, i) => {
            const project = projects[item.idx];
            const status = statusConfig[project.status];

            return (
              <div
                key={project.id}
                className={`group relative overflow-hidden rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] ${item.colSpan} ${rowHeights[i] || "h-[280px]"}`}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes={item.colSpan === "col-span-2" ? "66vw" : "33vw"}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div
                  className={`absolute left-4 top-[18px] z-10 rounded-full px-3 py-[3.5px] text-xs font-bold uppercase leading-4 tracking-[0.3px] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] ${status.badgeBg}`}
                >
                  {status.label}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className={`text-white font-bold ${item.colSpan === "col-span-2" ? "text-xl leading-7" : "text-base leading-6"}`}
                  >
                    {project.name}
                  </h3>
                  <p className="text-sm font-normal leading-5 text-gray-300">
                    {project.location}
                    {project.category ? ` • ${project.category}` : ""}
                  </p>
                </div>

                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-[rgba(41,115,178,0.95)] via-[rgba(41,115,178,0.7)] to-[rgba(41,115,178,0)] p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase leading-4 tracking-[0.3px] text-white ${status.hoverBg}`}
                    >
                      {status.label}
                    </span>
                    {project.category && (
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold leading-4 text-white">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`font-extrabold uppercase tracking-[0.5px] text-white ${item.colSpan === "col-span-2" ? "text-2xl leading-8" : "text-lg leading-7"}`}
                  >
                    {project.nameUpper}
                  </h3>

                  <div className="mt-1 flex items-center gap-4">
                    {project.location && (
                      <span className="flex items-center gap-1 text-sm font-normal leading-5 text-[#bfdbfe]">
                        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.5 1C2.74 1 .5 3.24.5 6c0 3.75 5 7 5 7s5-3.25 5-7c0-2.76-2.24-5-5-5Zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
                            fill="#bfdbfe"
                          />
                        </svg>
                        {project.location}
                      </span>
                    )}
                    {project.meta && (
                      <span className="flex items-center gap-1 text-sm font-normal leading-5 text-[#bfdbfe]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="1" y="1" width="5" height="5" rx="1" stroke="#bfdbfe" strokeWidth="1.5" />
                          <rect x="8" y="1" width="5" height="5" rx="1" stroke="#bfdbfe" strokeWidth="1.5" />
                          <rect x="1" y="8" width="5" height="5" rx="1" stroke="#bfdbfe" strokeWidth="1.5" />
                          <rect x="8" y="8" width="5" height="5" rx="1" stroke="#bfdbfe" strokeWidth="1.5" />
                        </svg>
                        {project.meta}
                      </span>
                    )}
                  </div>

                  {project.materials && (
                    <p className="mt-1 text-xs font-normal leading-4 text-[#dbeafe]">
                      Sử dụng: <span className="font-bold text-app-brand-teal">{project.materials}</span>
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-2 border-b border-app-brand-teal pb-[5px]">
                    <span className="text-sm font-bold leading-5 text-white">Xem chi tiết</span>
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.03 1.47a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H.75a.75.75 0 0 1 0-1.5h8.5L6.03 1.47Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex w-full items-center justify-center pt-4">
          <button className="flex items-center gap-3 rounded-full bg-white px-10 py-3.5 text-sm font-bold uppercase leading-5 tracking-[0.35px] text-[#2973b2] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 1.5v11M1 7h11" stroke="#2973b2" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Xem thêm dự án</span>
          </button>
        </div>
      </div>
    </section>
  );
}
