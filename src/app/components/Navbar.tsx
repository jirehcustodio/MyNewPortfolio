"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "../lib/useLanguage";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  // Handle scroll effects
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Handle active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "blog", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.blog, href: "#blog" },
    { name: t.nav.contact, href: "#contact" }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-200" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => handleNavClick('#hero')}
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900">
              Jireh.dev
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                className={`relative px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                
                {/* Active indicator */}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-neutral-100 border border-neutral-200 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}

            {/* Language Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="ml-4"
            >
              <LanguageToggle />
            </motion.div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-6 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-sm lg:text-base font-medium text-white transition-colors"
            >
              <span className="relative z-10">{t.hero.cta.contact}</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 touch-manipulation active:bg-neutral-100"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 relative"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="absolute w-6 h-0.5 bg-neutral-900 top-1 origin-center"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="absolute w-6 h-0.5 bg-neutral-900 top-3 origin-center"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="absolute w-6 h-0.5 bg-neutral-900 top-5 origin-center"
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={{
            open: {
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            },
            closed: {
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, delay: 0.1 },
                opacity: { duration: 0.2 }
              }
            }
          }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-neutral-200"
        >
          <div className="py-4 sm:py-6 space-y-1 sm:space-y-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                initial={false}
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: {
                    x: 0,
                    opacity: 1,
                    transition: { delay: 0.1 + (index * 0.1) }
                  },
                  closed: {
                    x: -20,
                    opacity: 0
                  }
                }}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 touch-manipulation active:scale-95 ${
                  activeSection === item.href.slice(1)
                    ? "text-neutral-900 bg-neutral-100 border border-neutral-200"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}

            {/* Language Toggle for Mobile */}
            <motion.div
              initial={false}
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: {
                  x: 0,
                  opacity: 1,
                  transition: { delay: 0.35 }
                },
                closed: {
                  x: -20,
                  opacity: 0
                }
              }}
              className="px-4 py-2"
            >
              <LanguageToggle />
            </motion.div>
            
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              initial={false}
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: {
                  x: 0,
                  opacity: 1,
                  transition: { delay: 0.4 }
                },
                closed: {
                  x: -20,
                  opacity: 0
                }
              }}
              className="block mx-4 mt-3 sm:mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl text-base font-semibold text-white text-center touch-manipulation active:scale-95"
              whileTap={{ scale: 0.95 }}
            >
{t.hero.cta.contact}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}