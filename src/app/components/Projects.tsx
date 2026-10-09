"use client";

import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../lib/projects";
import analytics from "../lib/analytics";

export default function Projects() {
  return (
    <section id="projects" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-black/10 pb-7">
          <p className="pixel-type text-sm text-neutral-500">02 / selected work</p>
          <h2 className="pixel-type mt-3 text-3xl text-neutral-900 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Municipal tools, a web analytics dashboard, and this portfolio. Explore a live demo
            or source code where available.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const demoUrl = project.demoUrl || project.link;
            const isExternalDemo = demoUrl.startsWith("http");

            return (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white p-5 sm:p-6"
              >
                {project.image && (
                  <div className="relative -mx-5 -mt-5 mb-5 aspect-[16/9] overflow-hidden bg-neutral-100 sm:-mx-6 sm:-mt-6">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-black/10 pb-4">
                  <span className="font-mono text-xs text-neutral-500">
                    {String(project.id).padStart(2, "0")} / {project.category}
                  </span>
                  {project.isLiveDemo && (
                    <span className="rounded-full border border-black/10 px-2.5 py-1 text-xs text-neutral-600">
                      Live demo
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {project.desc}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {project.tech.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-black/10 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-600"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-3 border-t border-black/10 pt-4">
                  <a
                    href={demoUrl}
                    target={isExternalDemo ? "_blank" : undefined}
                    rel={isExternalDemo ? "noopener noreferrer" : undefined}
                    onClick={() =>
                      project.isLiveDemo &&
                      analytics.trackPortfolioEvent.viewProject(
                        project.title,
                        project.category,
                      )
                    }
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:underline"
                  >
                    Visit project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        analytics.trackPortfolioEvent.viewSourceCode(project.title)
                      }
                      className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Source
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
