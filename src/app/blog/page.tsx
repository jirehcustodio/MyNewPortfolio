"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Grid2X2, List, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import ArticleCover from "../components/ArticleCover";
import { getAllArticles } from "../lib/articles";
import { useLanguage } from "../lib/useLanguage";

const articles = getAllArticles();
const categories = ["All", ...new Set(articles.map((article) => article.category))];

const formatDate = (dateString: string) =>
  new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { language } = useLanguage();

  const filteredArticles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        !term ||
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.tags.some((tag) => tag.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-[0.025]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(17,17,17,0.3)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <section className="container relative z-10 mx-auto px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="pixel-type text-sm text-neutral-500">Writing / Notes</p>
            <h1 className="pixel-type mt-3 text-4xl lowercase text-neutral-900 sm:text-5xl">
              blog
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600">
              {language === "en"
                ? "Thoughts, tutorials, and notes on AI, engineering, and building things."
                : "Mga ideya, tutorial, at tala tungkol sa teknolohiya at pagbuo ng software."}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-xl border border-black/10 bg-white p-1 sm:self-auto">
            <button
              type="button"
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              onClick={() => setViewMode("list")}
              className={`rounded-lg p-2.5 ${
                viewMode === "list" ? "bg-neutral-100 text-neutral-900" : "text-neutral-500"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-2.5 ${
                viewMode === "grid" ? "bg-neutral-100 text-neutral-900" : "text-neutral-500"
              }`}
            >
              <Grid2X2 className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="relative block max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={language === "en" ? "Search articles" : "Maghanap ng artikulo"}
              className="w-full rounded-full border border-black/10 bg-white/80 py-3 pl-11 pr-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-black/30"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selectedCategory === category
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-black/10 bg-white/70 text-neutral-700 hover:border-black/25"
                }`}
              >
                {category === "All" && language !== "en" ? "Lahat" : category}
              </button>
            ))}
          </div>
        </div>

        {filteredArticles.length ? (
          <div
            className={
              viewMode === "list"
                ? "divide-y divide-black/10 border-t border-black/10"
                : "grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {filteredArticles.map((article) =>
              viewMode === "list" ? (
                <article key={article.id} className="group py-6 sm:py-8">
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
                        <span>{formatDate(article.date)}</span>
                        <span>{article.category}</span>
                      </div>
                      <h2 className="pixel-type text-lg leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-xl lg:text-2xl">
                        {article.title}
                      </h2>
                      <p className="mt-3 line-clamp-2 max-w-4xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                        {article.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-4 font-mono text-xs text-neutral-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" />
                          {article.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-neutral-900">
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              ) : (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white/85 transition-shadow hover:shadow-[0_16px_40px_rgba(17,17,17,0.08)]"
                >
                  <Link href={`/blog/${article.id}`} className="block">
                    <ArticleCover article={article} className="aspect-[1.65] w-full" />
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-3 font-mono text-xs text-neutral-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(article.date)}
                        </span>
                        <span>{article.category}</span>
                      </div>
                      <h2 className="pixel-type text-lg leading-snug text-neutral-900 group-hover:text-neutral-600">
                        {article.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                        {article.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-neutral-500">
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="border-y border-black/10 py-20 text-center">
            <h2 className="pixel-type text-2xl text-neutral-900">No articles found</h2>
            <p className="mt-3 text-neutral-600">Try another search or category.</p>
          </div>
        )}
      </section>
    </main>
  );
}
