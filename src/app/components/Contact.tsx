import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const contactMethods = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "jireh4401@gmail.com",
    link: "mailto:jireh4401@gmail.com",
  },
  {
    icon: FaPhone,
    title: "Phone",
    value: "09630030380",
    link: "tel:+639630030380",
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    value: "linkedin.com/in/jireh-custodio-19a492341",
    link: "https://www.linkedin.com/in/jireh-custodio-19a492341/",
  },
  {
    icon: FaGithub,
    title: "GitHub",
    value: "github.com/jirehcustodio",
    link: "https://github.com/jirehcustodio",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-neutral-50 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-black/10 pb-7">
          <p className="pixel-type text-sm text-neutral-500">07 / contact</p>
          <h2 className="pixel-type mt-3 text-3xl text-neutral-900 sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Have a project in mind or want to say hello? I&apos;d be glad to hear from you.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="pixel-type text-xl text-neutral-900">Reach me directly</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {contactMethods.map(({ icon: Icon, title, value, link }) => {
                const external = link.startsWith("https://");

                return (
                  <a
                    key={title}
                    href={link}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 transition-colors hover:border-neutral-400"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-[#b8814a]" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-neutral-900">{title}</span>
                      <span className="block truncate text-xs text-neutral-600">{value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              I typically respond to messages within 24 hours.
            </p>
          </div>

          <form
            className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6"
            action="https://formsubmit.co/jireh4401@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_next"
              value="https://jirehdevportfolio.netlify.app/contact-success"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_autoresponse"
              value="Thank you for contacting Jireh! Your message has been received and I will get back to you within 24 hours."
            />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

            <label className="block text-sm font-medium text-neutral-700">
              Your name
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#b8814a]"
              />
            </label>
            <label className="block text-sm font-medium text-neutral-700">
              Your email
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#b8814a]"
              />
            </label>
            <label className="block text-sm font-medium text-neutral-700">
              Your message
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={5}
                className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#b8814a]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 font-medium text-white transition-colors hover:bg-neutral-700"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
