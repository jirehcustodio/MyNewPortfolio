"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../lib/useLanguage";
import LanguageToggle from "./LanguageToggle";

const menuGroups = [
  [
    { name: "Shop", href: "/modernshop" },
    { name: "Blog", href: "/blog" },
    { name: "Gear", href: "#stack" },
    { name: "Resources", href: "/blog" },
  ],
  [
    { name: "Collabs", href: "#contact" },
    { name: "Consulting", href: "#contact" },
  ],
  [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Stack", href: "#stack" },
    { name: "Certifications", href: "#certifications" },
    { name: "Recommendations", href: "#recommendations" },
    { name: "Affiliations", href: "#affiliations" },
  ],
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsMenuOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? "border-black/10 bg-white/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <a
            href="#hero"
            onClick={() => handleLinkClick("#hero")}
            className="pixel-type text-xl font-medium text-neutral-900 sm:text-2xl"
          >
            Jireh.dev
          </a>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="portfolio-side-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-white"
          >
            <span className="hidden sm:inline">{isMenuOpen ? "Close" : "Menu"}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] cursor-default bg-black/25 backdrop-blur-[2px]"
            />
            <motion.aside
              id="portfolio-side-menu"
              aria-label="Portfolio navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed bottom-0 right-0 top-0 z-[61] flex w-full max-w-md flex-col overflow-y-auto border-l border-black/10 bg-white px-6 pb-8 pt-6 shadow-2xl sm:px-9"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-5">
                <span className="pixel-type text-lg text-neutral-900">Explore</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-xl text-neutral-800 hover:bg-white"
                >
                  ×
                </button>
              </div>

              <div className="mt-5">
                {menuGroups.map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className={`grid grid-cols-2 gap-x-4 gap-y-1 py-4 ${
                      groupIndex > 0 ? "border-t border-black/10" : ""
                    }`}
                  >
                    {group.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className="rounded-lg px-3 py-2.5 text-[0.95rem] text-neutral-700 transition-colors hover:bg-white/80 hover:text-neutral-950"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-black/10 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <a
                    href="mailto:jireh4401@gmail.com?subject=Hello%20Jireh"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium text-neutral-900 underline decoration-black/25 underline-offset-4 hover:decoration-black"
                  >
                    Ask anything
                  </a>
                  <span className="font-mono text-xs text-neutral-500">⌘ K</span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                  For work, collabs &amp; everything else, reach me at
                </p>
                <a
                  href="mailto:jireh4401@gmail.com"
                  className="mt-2 inline-block text-sm font-medium text-neutral-900 underline decoration-black/25 underline-offset-4 hover:decoration-black"
                >
                  jireh4401@gmail.com
                </a>
                <div className="mt-6">
                  <LanguageToggle />
                </div>
                <a
                  href="#contact"
                  onClick={() => handleLinkClick("#contact")}
                  className="mt-6 block rounded-full bg-[#111111] px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a]"
                >
                  {t.hero.cta.contact}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
