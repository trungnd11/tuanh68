import clsx from "clsx";
import { projectsGridContent } from "./content";
import ProjectCard from "./project-card";
import LoadMoreButton from "./load-more-button";

const LARGE_CARD_INDICES = new Set([0, 6]);

const ROW_HEIGHTS: Record<string, string> = {
  0: "h-[280px] sm:h-[360px]",
  1: "h-[280px] sm:h-[300px]",
  2: "h-[280px] sm:h-[300px]",
  3: "h-[280px] sm:h-[340px]",
  4: "h-[280px]",
  5: "h-[280px]",
  6: "h-[280px] sm:h-[360px]",
};

export default function ProjectGridSection() {
  const projects = projectsGridContent.grid;

  return (
    <section className={clsx("flex flex-col items-start bg-[#f8f9fa] px-4 py-6 lg:py-20")}>
      <div className={clsx("mx-auto flex w-full max-w-7xl flex-col items-start gap-6 lg:gap-8")}>
        <div className={clsx("grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3")}>
          {projects.map((project, i) => {
            const isLarge = LARGE_CARD_INDICES.has(i);

            return (
              <div key={project.id} className={clsx(isLarge && "sm:col-span-2 lg:col-span-2")}>
                <ProjectCard project={project} isLarge={isLarge} height={ROW_HEIGHTS[i] || "h-[280px]"} />
              </div>
            );
          })}
        </div>

        <LoadMoreButton />
      </div>
    </section>
  );
}
