import type { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const className = `project-card grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-xl border border-[#383344] bg-[#18171f] p-4 text-left sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-6 sm:p-5 ${project.href ? "project-card--available" : "project-card--unavailable"}`;
  const badgeClass = project.access === "Sans compte"
    ? "border-[#3eda30]/30 bg-[#3eda30]/10 text-green-200"
    : project.href
      ? "border-[#8f6bff]/30 bg-[#8f6bff]/10 text-indigo-200"
      : "border-amber-300/30 bg-amber-300/10 text-amber-200";

  const content = (
    <>
      <div className="col-start-1 row-start-1 size-18 overflow-hidden rounded-lg border border-[#3b3549] bg-[#222222] sm:row-span-3 sm:size-36">
        <img
          src={project.image}
          alt=""
          width={144}
          height={144}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="project-card__image h-full w-full object-cover"
        />
      </div>
      <div className="col-start-2 row-start-1 flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
        <h2 id={`${project.id}-title`} className="text-xl font-extrabold tracking-tight text-[#f0f0f0] sm:text-2xl">
          {project.name}
        </h2>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${badgeClass}`}>
          {project.access}
        </span>
      </div>
      <p id={`${project.id}-description`} className="col-span-2 text-sm leading-relaxed text-gray-300 sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:text-base">
        {project.description}
      </p>
      <span className="col-span-2 flex items-center gap-1.5 text-sm font-semibold text-indigo-200 sm:col-span-1 sm:col-start-2 sm:row-start-3">
        {project.href ? <>Ouvrir le projet <ArrowUpRight size={18} aria-hidden="true" /></> : "À suivre"}
      </span>
    </>
  );

  return project.href ? (
    <a href={project.href} className={className} aria-label={`Ouvrir ${project.name}`} aria-describedby={`${project.id}-description`}>
      {content}
    </a>
  ) : (
    <article className={className} aria-labelledby={`${project.id}-title`}>
      {content}
    </article>
  );
};

export default ProjectCard;
