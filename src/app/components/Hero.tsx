import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import FloatingShapes from "./FloatingShapes";

const socialLinks = [
  { name: "GitHub", icon: FaGithub, href: "https://github.com/jirehcustodio" },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/jireh-custodio-19a492341/",
  },
  { name: "Email", icon: FaEnvelope, href: "mailto:jireh4401@gmail.com" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      <FloatingShapes />
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b8814a]/30 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-700 sm:px-4 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#b8814a]" />
              Available for opportunities
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-[-0.06em] text-neutral-900 xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Hi, I&apos;m Jireh Custodio
            </h1>
            <p className="mt-4 text-lg font-light text-[#b8814a] sm:text-xl lg:text-2xl xl:text-3xl">
              Full-Stack Developer
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg lg:text-xl">
              Building robust web applications with modern technologies.
              Specializing in <span className="font-medium text-neutral-900">Next.js</span>,{" "}
              <span className="font-medium text-neutral-900">React</span>, and{" "}
              <span className="font-medium text-neutral-900">TypeScript</span>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:px-8 sm:py-4 sm:text-base"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-center text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900 sm:px-8 sm:py-4 sm:text-base"
              >
                Get In Touch
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-self-end">
            <div className="relative aspect-square w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] xs:w-64 sm:w-72 md:w-80 lg:w-96">
              <Image
                src="/profile.jpg"
                alt="Jireh Custodio"
                fill
                priority
                className="object-cover [object-position:50%_68%] sm:[object-position:50%_65%] lg:[object-position:50%_62%]"
                sizes="(max-width: 639px) 240px, (max-width: 767px) 256px, (max-width: 1023px) 288px, 384px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
