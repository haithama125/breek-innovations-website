import Script from "next/script";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "What size businesses do you work with?",
    a: "Small and mid-size businesses, typically 1 to 50 people. Most of our clients are restaurants rolling out loyalty apps, medical professionals (dentists, med spas, independent practices) who need a credible site plus patient-flow automations, and agencies that sub out their build or growth work to us.",
  },
  {
    q: "Do you work with other agencies as a white-label partner?",
    a: "Yes. A meaningful chunk of our work is dev and growth subcontracting for marketing, design, and consulting agencies. We show up under your brand, hit your deadlines, and never market to your client. Pricing adjusts for repeat partners.",
  },
  {
    q: "How long does a typical project take?",
    a: "A standard marketing website launches in 2 to 3 weeks. A custom app or internal tool is usually 4 to 8 weeks depending on scope. Automations and AI workflows ship in 1 to 3 weeks. Every project has a fixed scope and a fixed end date before we start.",
  },
  {
    q: "How is Breek different from an agency or a freelancer?",
    a: "You get one point of contact who owns the strategy, the build, and the growth. No account manager relaying requests to a disconnected design team, no freelancer who disappears post-launch. Everything — website, apps, automation, SEO/GEO, social — is handled by one senior team who already knows your business.",
  },
  {
    q: "What is Generative Engine Optimization (GEO), and how is it different from SEO?",
    a: "SEO ranks you in Google's blue links. GEO gets you cited by AI engines like ChatGPT, Perplexity, Claude, and Google's AI Overviews when someone asks for a recommendation. The tactics overlap (structured data, authoritative content, clear entities) but the goal is being the answer, not a link under one. We do both together.",
  },
  {
    q: "Can you build for a specific industry, like restaurants or medical practices?",
    a: "Yes. We have repeatable patterns for restaurant loyalty apps (points, rewards, SMS/push, POS integrations) and for medical sites and patient automations (HIPAA-conscious intake forms, appointment flows, review generation). Industry-specific work costs the same as general work because the templates and compliance research are already done.",
  },
  {
    q: "What does ongoing support look like after launch?",
    a: "Every project includes 30 days of post-launch fixes at no cost. After that, you can keep us on a lightweight monthly retainer for changes, performance monitoring, content updates, and iteration, or just pay hourly when you need something. Nothing we build locks you in — you own the code, the domain, and every account.",
  },
  {
    q: "Do you offer month-to-month or project-based pricing?",
    a: "Both. Websites, apps, and specific automations are priced per project with a fixed quote. Social media, GEO, and ongoing growth work are month-to-month with no long-term contract. You can start with one project and layer in retainers later, or the other way around.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="bg-[#F5F6F0] py-24 text-[#13201A]">
      <div className="mx-auto max-w-[920px] px-7">
        <div className="mb-12 max-w-[640px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
            Questions
          </p>
          <h2
            className="m-0 mt-4 font-display font-bold"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
            }}
          >
            Everything most people ask before they book.
          </h2>
        </div>

        <div className="divide-y divide-[#DCE3DA] border-y border-[#DCE3DA]">
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="group py-6"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <h3 className="m-0 flex-1 font-display text-[18px] font-semibold leading-[1.35] tracking-[-0.015em] text-[#13201A] md:text-[20px]">
                  {item.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#DCE3DA] text-[#4C8A62] transition-transform duration-200 group-open:rotate-45"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="m-0 mt-4 max-w-[760px] text-[15.5px] leading-[1.65] text-[#4D5A51]">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-[14px] text-[#6B776F]">
          Didn&apos;t see your question?{" "}
          <a
            href="mailto:hello@breek-innovations.com"
            className="text-[#2E6B47] underline-offset-2 hover:underline"
          >
            Email us
          </a>{" "}
          and a senior engineer will reply within 24 hours.
        </p>
      </div>

      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
    </section>
  );
}
