import Image from "next/image";
import { projects } from "@/content/projects";
import Section from "./Section";
import { ArrowUpRightIcon } from "./icons";

export default function Projects() {
  return (
    <Section id="projects" title="Projects" kicker="Selected work">
      <ul className="grid grid-flow-dense grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((project) => (
          <li
            key={project.title}
            data-reveal
            className={`card-glassify flex flex-col p-7 sm:p-8 ${
              project.highlight ? "sm:col-span-2" : ""
            }`}
          >
            {project.image && (
              <div className="neuo-pressed-sm mb-6 overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
            <h3 className="mb-3 text-xl font-bold text-text sm:text-2xl">
              {project.title}
            </h3>
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
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="h-4 w-4" />
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
