const certifications = [
  {
    name: "Cloud Systems Analyst",
    detail: "Cloud systems analysis and administration",
  },
  {
    name: "Safety Officer 2",
    detail: "Occupational safety and health",
  },
];

const affiliations = [
  { organization: "LGU Naga City", role: "IT support and digital services" },
  { organization: "BESO COSH", role: "Safety Officer 2" },
  { organization: "Shot Studio", role: "Production Assistant Intern" },
];

export default function PortfolioDetails() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(17,17,17,0.08)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="container relative z-10 mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div
          id="certifications"
          className="scroll-mt-24"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
            Credentials
          </p>
          <h2 className="pixel-type mb-6 text-3xl text-neutral-900 sm:text-4xl">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((certification) => (
              <article
                key={certification.name}
                className="rounded-2xl border border-black/10 bg-white/65 p-5"
              >
                <h3 className="pixel-type text-lg text-neutral-900">
                  {certification.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {certification.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          id="affiliations"
          className="scroll-mt-24"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
            Organizations
          </p>
          <h2 className="pixel-type mb-6 text-3xl text-neutral-900 sm:text-4xl">
            Affiliations
          </h2>
          <div className="space-y-3">
            {affiliations.map((affiliation) => (
              <article
                key={affiliation.organization}
                className="flex items-start justify-between gap-4 rounded-2xl border border-black/10 bg-white/65 p-5"
              >
                <h3 className="pixel-type text-base text-neutral-900">
                  {affiliation.organization}
                </h3>
                <p className="max-w-[12rem] text-right text-sm leading-relaxed text-neutral-600">
                  {affiliation.role}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          id="recommendations"
          className="scroll-mt-24 border-t border-black/10 pt-8 lg:col-span-2"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
            References
          </p>
          <h2 className="pixel-type text-2xl text-neutral-900">
            Recommendations
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Professional references are available upon request.
          </p>
        </div>
      </div>
    </section>
  );
}
