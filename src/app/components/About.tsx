const experiences = [
  { company: "LGU Naga - MyNaga App", role: "IT Support", duration: "2025 (Jan - Dec)" },
  { company: "BESO COSH", role: "Safety Officer 2", duration: "2024 - 2025" },
  { company: "LGU Naga City", role: "IT Support Engineer", duration: "2024" },
  { company: "Shot Studio", role: "Production Assistant Intern", duration: "2024 - 2025" },
  {
    company: "Self-employed",
    role: "Freelance Web Developer & Multimedia Specialist",
    duration: "2020 - Present",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-neutral-50 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-black/10 pb-7">
          <p className="pixel-type text-sm text-neutral-500">01 / about</p>
          <h2 className="pixel-type mt-3 text-3xl text-neutral-900 sm:text-4xl">
            My Story
          </h2>
        </header>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-neutral-700">
              Hi, I&apos;m <span className="font-semibold text-neutral-900">Jireh Custodio</span>,
              an <span className="font-semibold text-neutral-900">IT Lead</span> and Computer
              Engineering graduate based in Naga City, Philippines, specializing in cloud
              infrastructure, cybersecurity, and full-stack web development, with a background in
              multimedia production.
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              I lead IT operations and drive the deployment, security, and reliability of
              cloud-based systems that support public-sector digital services. I started out as an{" "}
              <span className="font-medium text-neutral-900">IT Support Engineer at LGU Naga City</span>,
              where I supported cloud system rollouts and helped keep critical infrastructure
              secure and available. That hands-on foundation shapes how I lead today: prioritizing
              uptime, risk management, and clear technical standards. I&apos;m a certified{" "}
              <span className="font-medium text-neutral-900">Cloud System Analyst</span> and{" "}
              <span className="font-medium text-neutral-900">Safety Officer</span>, pairing
              technical depth with compliance and safety discipline.
            </p>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              For 3+ years as a freelance developer and multimedia specialist, I&apos;ve designed
              and shipped responsive websites and digital products for creatives and small
              businesses, covering front-end builds, deployment, and visual content.
            </p>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                Core stack &amp; focus areas
              </h3>
              <ul className="flex flex-wrap gap-2">
                {[
                  "IT Leadership",
                  "Cloud Computing",
                  "Cybersecurity",
                  "Web Development",
                  "Systems Administration",
                  "Multimedia Production",
                ].map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-neutral-700"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="experience" className="scroll-mt-24">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h3 className="pixel-type text-2xl text-neutral-900">Experience</h3>
              <span className="font-mono text-xs text-neutral-500">
                {String(experiences.length).padStart(2, "0")} roles
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {experiences.map((experience) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="rounded-2xl border border-black/10 bg-white p-5"
                >
                  <p className="font-mono text-xs text-neutral-500">{experience.duration}</p>
                  <h4 className="mt-3 font-medium leading-snug text-neutral-900">
                    {experience.role}
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600">{experience.company}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
