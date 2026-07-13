import Image from "next/image";
import { projects } from "@/content/projects";
import Section from "./Section";
import { ArrowUpRightIcon } from "./icons";

export default function Projects() {
  return (
    <Section id="projects" index={3} title="Projects" kicker="Selected work">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {projects.map((project) => (
          <li
            key={project.title}
            data-reveal
            className="card-glassify group flex flex-col p-7 last:[&:nth-child(odd)]:sm:col-span-2 sm:p-8"
          >
            {project.image && (
              <div className="neuo-pressed-sm mb-6 overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </div>
            )}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-text sm:text-2xl">
                {project.title}
              </h3>
              {project.status && (
                <span className="neuo-pressed-sm inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse"
                  />
                  {project.status}
                </span>
              )}
            </div>
            <p className="mb-6 flex-1 leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <li key={tag} className="neuo-pill px-3.5 py-1 text-xs font-medium text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
              {project.links && project.links.length > 0 && (
                <ul className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-hover/link:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
