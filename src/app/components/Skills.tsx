import {
  SiCss3,
  SiDocker,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaCloud, FaJava, FaNetworkWired, FaShieldAlt, FaTools } from "react-icons/fa";
import type { IconType } from "react-icons";

const stackGroups: { name: string; items: { name: string; icon: IconType }[] }[] = [
  {
    name: "Frontend",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    name: "Backend & data",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Supabase", icon: SiSupabase },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    name: "Cloud & tools",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Docker", icon: SiDocker },
      { name: "Vercel", icon: SiVercel },
      { name: "Cloud computing", icon: FaCloud },
      { name: "Cisco networking", icon: FaNetworkWired },
      { name: "Network security", icon: FaShieldAlt },
      { name: "Developer tools", icon: FaTools },
    ],
  },
];

export default function Skills() {
  return (
    <section id="stack" className="bg-white py-16 sm:py-20 lg:py-28">
      <span id="skills" className="relative -top-20" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-black/10 pb-7">
          <p className="pixel-type text-sm text-neutral-500">04 / stack</p>
          <h2 className="pixel-type mt-3 text-3xl text-neutral-900 sm:text-4xl">
            Tech stack
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The tools and technologies I work with across the frontend, backend, and cloud.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stackGroups.map((group) => (
            <section
              key={group.name}
              className="rounded-2xl border border-black/10 bg-neutral-50/70 p-5 sm:p-6"
            >
              <h3 className="pixel-type mb-5 text-xl text-neutral-900">{group.name}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {group.items.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="flex min-h-12 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-neutral-700"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
