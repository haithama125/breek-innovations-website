import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { RevealObserver } from "@/components/RevealObserver";
import { GeoWhyUs } from "@/components/icp-sections/GeoWhyUs";
import { AnswerEngineGraph } from "@/components/icp-graphics/AnswerEngineGraph";
import { ContactTrigger } from "@/components/ContactFormModal";

const SITE_URL = "https://breek-innovations.com";
const PAGE_URL = `${SITE_URL}/geo/`;
const TITLE = "Generative Engine Optimization (GEO)";
const DESCRIPTION =
  "Get your business named when people ask ChatGPT, Perplexity, Google AI, Claude, and Gemini for the best option in your category. Fixed-price GEO engagements, monthly report of every placement.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "generative engine optimization",
    "GEO",
    "AI search optimization",
    "ChatGPT SEO",
    "Perplexity optimization",
    "Google AI Overviews optimization",
    "answer engine optimization",
    "AEO",
    "AI visibility for small business",
    "local AI search",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${TITLE} | Breek Innovations`,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
};

const STATS = [
  { stat: "5 engines", label: "ChatGPT · Perplexity · Google AI · Claude · Gemini" },
  { stat: "30+ questions", label: "Tracked every month" },
  { stat: "Fixed price", label: "Quoted before we start" },
  { stat: "60 days", label: "Most clients see first placements" },
  { stat: "Monthly", label: "Placement report to your inbox" },
  { stat: "Local or national", label: "We work both ways" },
  { stat: "No lock-in", label: "Cancel anytime after month 3" },
  { stat: "<24h", label: "Quote after our first call" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What even is GEO, and how is it different from SEO?",
    a: "SEO is making sure you show up when someone searches on Google. GEO is making sure you show up when someone asks an AI — ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini. These answer in a paragraph instead of a list of links, so there's no \"first result\" anymore. Either you get named in that paragraph or you don't.",
  },
  {
    q: "Why should I care about this now?",
    a: "More and more people ask AI first before they Google. If you're not named in the AI answer, they don't see you at all — even if you're #1 on Google. The companies that start fixing this in 2026 are going to own their category by 2027. The ones that wait will be invisible to half their customers.",
  },
  {
    q: "What does it cost and how long does it take?",
    a: "Fixed-price engagement, quoted after our first call. Most clients see their first new AI placements in 30 to 60 days. By month 3 you have a clear report showing which AI engines name you, for which questions, versus which name a competitor. If nothing moves, we tell you honestly.",
  },
  {
    q: "What do you actually do?",
    a: "Three things. (1) Clean up every place AI reads about you: your site, Google Business, Yelp, directories, press. (2) Write the content AI stitches into answers: short FAQ pages, comparison pages, and real guides. (3) Track the same 30 to 40 real customer questions across every major AI engine, every month, and iterate on what's working.",
  },
  {
    q: "Can you guarantee I'll be named in every AI answer?",
    a: "No one honest can. We can guarantee effort, a clean set of sources, strong content, and a monthly report showing exactly where you stand. In practice most of our clients get named in at least half the questions we track by month 3. If you're in a crowded national market, expect longer.",
  },
  {
    q: "Do you only do GEO, or is this bundled with other things?",
    a: "GEO is a standalone engagement. If you also want a website or app that's built to be AI-readable from day one, our Website + Marketing Bundle folds GEO into the build. Either way, you only pay for the pieces you need.",
  },
];

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Generative Engine Optimization (GEO)",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Breek Innovations", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "AI search and answer engine optimization",
  url: PAGE_URL,
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "GEO", item: PAGE_URL },
  ],
};

export default function GeoPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="mx-auto max-w-[1240px] px-7 pt-20 pb-10 md:pt-28 md:pb-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#2E6B47]">
              Generative Engine Optimization
            </p>
            <h1
              className="mt-5 font-display font-bold m-0 text-balance"
              style={{
                fontSize: "clamp(48px, 7.2vw, 100px)",
                lineHeight: 0.99,
                letterSpacing: "-0.045em",
              }}
            >
              Get named when people{" "}
              <span style={{ color: "#2E6B47" }}>ask the AI.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[720px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              When your customer asks ChatGPT, Perplexity, or Google AI for the
              best option in your category, your name should be in the answer.
              We make that happen — and send you a report every month showing
              exactly where you stand.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <BookACall className="text-base px-[30px] py-4" source="geo-hero">
                Book a call
              </BookACall>
              <ContactTrigger
                source="geo-hero"
                className="pill-outline inline-flex items-center justify-center rounded-full px-[30px] py-4 text-base font-semibold"
              >
                Get in touch
              </ContactTrigger>
            </div>
          </div>
        </section>

        {/* 2. Stats marquee */}
        <section className="pb-10 pt-6 md:pt-10">
          <h2
            className="mx-7 mb-11 text-center font-display font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.035em" }}
          >
            What a GEO engagement looks like
          </h2>
          <div
            className="overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div
              className="flex w-max gap-4"
              style={{ animation: "marquee 45s linear infinite" }}
            >
              {[...STATS, ...STATS].map((r, i) => (
                <article
                  key={i}
                  className="w-[290px] flex-none rounded-[20px] border border-[#DCE3DA] bg-white p-[26px]"
                >
                  <div
                    className="font-display text-[26px] font-bold leading-tight text-[#2E6B47]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {r.stat}
                  </div>
                  <div className="mt-3 text-[14.5px] text-[#4D5A51]">
                    {r.label}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WhyUs */}
        <GeoWhyUs />

        {/* 4. Signature graphic — Answer Engine Graph */}
        <section
          className="relative overflow-hidden text-[#F0F4EF]"
          style={{
            background:
              "radial-gradient(90% 120% at 50% 100%, #2F6A49 0%, #164029 48%, #0C2419 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #F0F4EF 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative mx-auto max-w-[1240px] px-7 py-24">
            <div className="mb-10 max-w-[720px]">
              <h2
                className="m-0 font-display font-bold"
                style={{
                  fontSize: "clamp(34px, 4.2vw, 56px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                }}
              >
                One business. Every AI engine that matters.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini. Each
                one asks a slightly different thing, each one reads a slightly
                different source. We work on all of them.
              </p>
            </div>
            <AnswerEngineGraph />
          </div>
        </section>

        {/* 5. Work */}
        <Work />

        {/* 6. Testimonials */}
        <Testimonials />

        {/* 7. How it works */}
        <section className="mx-auto max-w-[1240px] px-7 py-24">
          <h2
            className="mb-12 font-display font-bold"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            How a GEO engagement runs
          </h2>
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {[
              {
                step: "01",
                title: "We audit where you stand",
                body: "We ask every major AI engine the 30 to 40 real questions your customers actually ask. You get a short report of where you're named, where you're not, and who's winning instead.",
              },
              {
                step: "02",
                title: "We fix your sources",
                body: "Your site, Google Business, Yelp, directories, press — every place the AI reads about you — cleaned up to say the same, clear thing.",
              },
              {
                step: "03",
                title: "We write the answers",
                body: "Short, direct pages that AI loves to quote: FAQs, comparison pages, honest guides. Written to be stitched, not to be scrolled.",
              },
              {
                step: "04",
                title: "We track every month",
                body: "Same questions, same engines, every month. A simple report of every new placement and every one we're still working on.",
              },
            ].map((s) => (
              <div key={s.title} className="border-t-[3px] border-[#2E6B47] pt-6">
                <div
                  className="mb-3.5 font-display text-[26px] font-bold text-[#2E6B47]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {s.step}
                </div>
                <div
                  className="mb-2.5 font-display text-2xl font-bold"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {s.title}
                </div>
                <div className="text-[15px] leading-[1.55] text-[#4D5A51]">{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Pricing */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1080px] px-7">
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(32px, 3.8vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              Fixed price. Monthly report. Cancel after 3 months.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "Audit",
                  w: "One-time, 2 weeks",
                  p: "Where do you stand in every major AI engine, for every question that matters? A full report, plus a prioritized plan to fix it.",
                },
                {
                  h: "GEO engagement",
                  w: "Fixed monthly, 3 month minimum",
                  p: "Source cleanup, content writing, monthly tracking across every major AI engine. A placement report in your inbox each month.",
                },
                {
                  h: "Bundled",
                  w: "With a site or app build",
                  p: "Folded into our Website + Marketing Bundle. GEO is baked into the site from day one, not bolted on after.",
                },
              ].map((tier) => (
                <div
                  key={tier.h}
                  className="rounded-2xl border border-[#DCE3DA] bg-[#F5F6F0] p-6"
                >
                  <h3 className="m-0 font-display text-[20px] font-bold tracking-[-0.015em] text-[#13201A]">
                    {tier.h}
                  </h3>
                  <p className="m-0 mt-2 text-[14px] font-medium text-[#4C8A62]">
                    {tier.w}
                  </p>
                  <p className="m-0 mt-4 text-[14.5px] leading-[1.55] text-[#4D5A51]">
                    {tier.p}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] text-[#4D5A51]">
              Quoted after a 30-minute call.{" "}
              <a
                href="/#pricing"
                className="text-[#2E6B47] underline-offset-2 hover:underline"
              >
                See all pricing
              </a>
              .
            </p>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="bg-[#F5F6F0] py-24">
          <div className="mx-auto max-w-[880px] px-7">
            <h2
              className="max-w-[640px] font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Questions owners ask us about GEO.
            </h2>
            <div className="mt-10 divide-y divide-[#DCE3DA] border-y border-[#DCE3DA]">
              {FAQS.map((item, i) => (
                <details
                  key={item.q}
                  className="group py-6"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <h3 className="m-0 flex-1 font-display text-[17px] font-semibold leading-[1.35] tracking-[-0.015em] text-[#13201A] md:text-[19px]">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#DCE3DA] text-[#4C8A62] transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="m-0 mt-4 max-w-[720px] text-[15px] leading-[1.65] text-[#4D5A51]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <RevealObserver />

      <Script
        id="ld-service-geo"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <Script
        id="ld-faq-geo"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Script
        id="ld-breadcrumb-geo"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
    </div>
  );
}
