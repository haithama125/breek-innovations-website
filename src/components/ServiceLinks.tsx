const LINKS: Array<{ href: string; tag: string; title: string; desc: string }> = [
  {
    href: "/geo/",
    tag: "GEO",
    title: "Generative Engine Optimization",
    desc: "Get named when people ask ChatGPT, Perplexity, Google AI, Claude, and Gemini.",
  },
  {
    href: "/app-marketing-bundle/",
    tag: "BUNDLE",
    title: "App + Marketing Bundle",
    desc: "We build the app and run the marketing that gets it installed. One team.",
  },
  {
    href: "/website-marketing-bundle/",
    tag: "BUNDLE",
    title: "Website + Marketing Bundle",
    desc: "A site that's built to be found — plus the marketing that drives people to it.",
  },
  {
    href: "/mobile-app-development/",
    tag: "SERVICE",
    title: "Custom Mobile Apps",
    desc: "iPhone and Android apps for your business. Fixed-price, 6 to 10 weeks.",
  },
  {
    href: "/restaurant-apps/",
    tag: "INDUSTRY",
    title: "Restaurant Loyalty Apps",
    desc: "POS-aware loyalty, in-app ordering, and websites. For Toast, Square, Clover.",
  },
  {
    href: "/social-media-marketing-dmv/",
    tag: "LOCAL",
    title: "Social Media (DMV)",
    desc: "On-site video shoots, daily posts, local ads. Pay-when-it-works for DC/MD/VA.",
  },
];

export function ServiceLinks() {
  return (
    <section className="mx-auto max-w-[1240px] px-7 pb-20 pt-6">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p
            className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#2E6B47]"
          >
            Pick what you need
          </p>
          <h2
            className="mt-3 max-w-[720px] font-display font-bold"
            style={{
              fontSize: "clamp(28px, 3.4vw, 40px)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            Six ways to work with us.
          </h2>
        </div>
      </div>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group block rounded-2xl border border-[#DCE3DA] bg-white p-6 transition hover:border-[#2E6B47] hover:shadow-[0_18px_40px_rgba(19,32,26,0.08)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#EFF5F0] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#2E6B47]">
                {l.tag}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE3DA] text-[#2E6B47] transition group-hover:bg-[#2E6B47] group-hover:text-white"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 9l6-6M4 3h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <h3
              className="mt-5 font-display text-[22px] font-bold text-[#13201A]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {l.title}
            </h3>
            <p className="mt-2 text-[14.5px] leading-[1.55] text-[#4D5A51]">
              {l.desc}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
