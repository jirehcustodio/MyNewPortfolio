"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  Copy,
  Eye,
  Facebook,
  Heart,
  Linkedin,
  Share2,
  Twitter,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Article } from "../../lib/articles";
import { getArticleById } from "../../lib/articles";
import { useLanguage } from "../../lib/useLanguage";
import { useArticleAnalytics } from "../../lib/useArticleAnalytics";
import Navbar from "../../components/Navbar";
import ArticleCover from "../../components/ArticleCover";

const formatDate = (dateString: string) =>
  new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function ArticlePage() {
  const params = useParams();
  const id = Number(params.id);
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyComplete, setCopyComplete] = useState(false);
  const { language } = useLanguage();
  const { getAnalytics, incrementViews, toggleLike } = useArticleAnalytics();

  useEffect(() => {
    const foundArticle = getArticleById(id);
    setArticle(foundArticle || null);
    setIsLoading(false);

    if (foundArticle) incrementViews(id);
  }, [id, incrementViews]);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const shareText = article
    ? `Check out this article: ${article.title}`
    : "";
  const analytics = getAnalytics(id);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopyComplete(true);
    window.setTimeout(() => setCopyComplete(false), 1800);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-neutral-900" />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <div>
          <h1 className="pixel-type text-3xl text-neutral-900">
            {language === "en" ? "Article not found" : "Hindi nahanap ang artikulo"}
          </h1>
          <p className="mt-4 text-neutral-600">
            {language === "en"
              ? "The article you are looking for does not exist."
              : "Ang artikulong hinahanap mo ay hindi umiiral."}
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <article className="mx-auto max-w-4xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-neutral-500">
            <span>{article.category}</span>
            <span>{formatDate(article.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {analytics.views.toLocaleString()}
            </span>
          </div>
          <h1 className="pixel-type text-3xl leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
            {article.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-neutral-100 font-mono">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-neutral-900">{article.author}</p>
              <p className="text-xs text-neutral-500">{formatDate(article.date)}</p>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group mb-10 overflow-hidden rounded-2xl border border-black/10"
        >
          <ArticleCover
            article={article}
            priority
            className="aspect-[1.8] w-full sm:aspect-[2.1]"
            imageClassName="group-hover:scale-100"
          />
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="article-content">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="pixel-type mb-5 mt-12 text-2xl text-neutral-900 sm:text-3xl">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h2 className="pixel-type mb-4 mt-10 text-xl text-neutral-900 sm:text-2xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="pixel-type mb-3 mt-8 text-lg text-neutral-900 sm:text-xl">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-6 text-base leading-8 text-neutral-700">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-6 list-disc space-y-2 pl-6 text-neutral-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-6 list-decimal space-y-2 pl-6 text-neutral-700">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-7">{children}</li>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="underline decoration-black/25 underline-offset-4 hover:decoration-black"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-8 border-l-2 border-neutral-900 pl-5 text-neutral-600">
                    {children}
                  </blockquote>
                ),
                pre: ({ children }) => (
                  <pre className="mb-6 overflow-x-auto rounded-xl bg-neutral-950 p-5 text-sm leading-relaxed text-neutral-100">
                    {children}
                  </pre>
                ),
                code: ({ children, className }) =>
                  className ? (
                    <code className="font-mono">{children}</code>
                  ) : (
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-900">
                      {children}
                    </code>
                  ),
                hr: () => <hr className="my-10 border-black/10" />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-y border-black/10 py-5">
            <button
              type="button"
              onClick={() => toggleLike(id)}
              aria-pressed={analytics.isLiked}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                analytics.isLiked
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-black/10 bg-white text-neutral-700 hover:border-black/25"
              }`}
            >
              <Heart className={`h-4 w-4 ${analytics.isLiked ? "fill-current" : ""}`} />
              {analytics.likes}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="rounded-full border border-black/10 p-2.5 text-neutral-600 hover:bg-neutral-50"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="rounded-full border border-black/10 p-2.5 text-neutral-600 hover:bg-neutral-50"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="rounded-full border border-black/10 p-2.5 text-neutral-600 hover:bg-neutral-50"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={copyToClipboard}
              aria-label="Copy article link"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 p-2.5 text-neutral-600 hover:bg-neutral-50"
            >
              <Copy className="h-4 w-4" />
              {copyComplete ? "Copied" : "Copy link"}
            </button>
            <span className="ml-auto inline-flex items-center gap-2 text-sm text-neutral-500">
              <Share2 className="h-4 w-4" /> Share
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1.5 font-mono text-xs text-neutral-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <aside className="mt-10 rounded-2xl border border-black/10 bg-neutral-50 p-6 sm:p-8">
            <p className="pixel-type text-lg text-neutral-900">About the author</p>
            <p className="mt-2 font-medium text-neutral-900">{article.author}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {article.authorBio}
            </p>
          </aside>
        </div>
      </article>
    </main>
  );
}
