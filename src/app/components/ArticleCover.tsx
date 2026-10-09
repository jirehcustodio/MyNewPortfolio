"use client";

import Image from "next/image";
import type { Article } from "../lib/articles";

interface ArticleCoverProps {
  article: Article;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export default function ArticleCover({
  article,
  priority = false,
  className = "",
  imageClassName = "",
}: ArticleCoverProps) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-neutral-100 ${className}`}
      aria-label={`Cover photo for ${article.title}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(17,17,17,0.1)_1px,transparent_0)] [background-size:18px_18px]" />
      <Image
        src={article.image}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
        className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${imageClassName}`}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}
