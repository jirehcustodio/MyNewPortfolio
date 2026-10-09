import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import ArticleCover from "./ArticleCover";
import { getAllArticles } from "../lib/articles";

const articles = getAllArticles().slice(0, 3);

const formatDate = (dateString: string) =>
  new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function Blog() {
  return (
    <section id="blog" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <header
          className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="pixel-type text-sm text-neutral-500">03 / writing</p>
            <h2 className="pixel-type mt-3 text-3xl lowercase text-neutral-900 sm:text-4xl">
              blog
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Thoughts, tutorials, and notes on engineering, technology, and building things.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 sm:self-auto"
          >
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <div className="divide-y divide-black/10">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group py-6 sm:py-8"
            >
              <Link
                href={`/blog/${article.id}`}
                className="grid items-center gap-5 sm:grid-cols-[180px_1fr] sm:gap-8 lg:grid-cols-[220px_1fr]"
              >
                <ArticleCover
                  article={article}
                  className="aspect-[1.5] w-full rounded-xl sm:aspect-[1.35]"
                />
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(article.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                    <span>{article.category}</span>
                  </div>
                  <h3 className="pixel-type text-lg leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-xl lg:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 max-w-4xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-neutral-500 transition-colors group-hover:text-neutral-900">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
