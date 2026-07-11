import clsx from "clsx";
import Image from "next/image";

const statusConfig = {
  completed: { label: "HOÀN THÀNH", badgeBg: "bg-[#48a6a7]" },
  "in-progress": { label: "ĐANG THI CÔNG", badgeBg: "bg-[#7a9c59]" },
} as const;

type Project = {
  id: string;
  name: string;
  nameUpper: string;
  image: string;
  status: keyof typeof statusConfig;
  category?: string;
  location?: string;
  meta?: string;
  materials?: string;
};

type Props = {
  project: Project;
  isLarge?: boolean;
  height?: string;
};

export default function ProjectCard({ project, isLarge, height }: Props) {
  const status = statusConfig[project.status];

  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-2xl",
        "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]",
        height || "h-[280px]"
      )}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className={clsx("object-cover")}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className={clsx("absolute inset-0 bg-gradient-to-t from-black/70 to-transparent")} />

      <div
        className={clsx(
          "absolute left-4 top-[18px] z-10 rounded-full px-3 py-[3.5px] text-xs",
          "font-bold uppercase leading-4 tracking-[0.3px] text-white",
          "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]",
          status.badgeBg
        )}
      >
        {status.label}
      </div>

      <div className={clsx("absolute bottom-0 left-0 right-0 p-6")}>
        <h3 className={clsx("font-bold text-white", isLarge ? "text-lg lg:text-xl leading-7" : "text-base leading-6")}>
          {project.name}
        </h3>
        <p className={clsx("text-xs lg:text-sm font-normal leading-5 text-gray-300")}>
          {project.location}
          {project.category ? ` • ${project.category}` : ""}
        </p>
      </div>

      <div
        className={clsx(
          "absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t",
          "from-[rgba(41,115,178,0.95)] via-[rgba(41,115,178,0.7)]",
          "to-[rgba(41,115,178,0)] p-6 opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100"
        )}
      >
        <div className={clsx("mb-3 flex items-center gap-2")}>
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-bold uppercase leading-4",
              "tracking-[0.3px] text-white",
              status.badgeBg
            )}
          >
            {status.label}
          </span>
          {project.category && (
            <span className={clsx("rounded-full bg-white/20 px-3 py-1 text-xs font-semibold leading-4", "text-white")}>
              {project.category}
            </span>
          )}
        </div>

        <h3
          className={clsx(
            "font-extrabold uppercase tracking-[0.5px] text-white",
            isLarge ? "text-lg lg:text-2xl leading-8" : "text-base lg:text-lg leading-7"
          )}
        >
          {project.nameUpper}
        </h3>

        <div className={clsx("mt-1 flex flex-wrap items-center gap-x-4 gap-y-1")}>
          {project.location && (
            <span className={clsx("flex items-center gap-1 text-xs lg:text-sm font-normal leading-5 text-[#bfdbfe]")}>
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
            <span className={clsx("flex items-center gap-1 text-xs lg:text-sm font-normal leading-5 text-[#bfdbfe]")}>
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
          <p className={clsx("mt-1 text-xs font-normal leading-4 text-[#dbeafe]")}>
            Sử dụng: <span className={clsx("font-bold text-app-brand-teal")}>{project.materials}</span>
          </p>
        )}

        <div className={clsx("mt-2 flex items-center gap-2 border-b border-app-brand-teal pb-[5px]")}>
          <span className={clsx("text-sm font-bold leading-5 text-white")}>Xem chi tiết</span>
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
}
