import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { RevealObserver } from "@/components/RevealObserver";
import { SocialDmvWhyUs } from "@/components/icp-sections/SocialDmvWhyUs";
import { DmvReachMap } from "@/components/icp-graphics/DmvReachMap";
import { ContactTrigger } from "@/components/ContactFormModal";

const SITE_URL = "https://breek-innovations.com";
const PAGE_URL = `${SITE_URL}/social-media-marketing-dmv/`;
const TITLE = "Social Media Marketing for DMV Small Businesses";
const DESCRIPTION =
  "Commission-based social media marketing for restaurants, salons, gyms, and brick-and-mortar shops in DC, Maryland, and Virginia. We drive foot traffic — you pay when it works.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "social media marketing DMV",
    "social media agency DC",
    "social media marketing Maryland",
    "social media marketing Virginia",
    "small business social media management",
    "restaurant social media marketing DC",
    "local social media agency",
    "Instagram marketing for small business",
    "TikTok marketing for restaurants",
    "Google Business Profile management",
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
  { stat: "+180%", label: "Instagram growth", who: "First 90 days" },
  { stat: "42", label: "Walk-ins / mo", who: "From local ads ($600 spend)" },
  { stat: "4.9★", label: "Google rating lift", who: "Review response cadence" },
  { stat: "5 mi", label: "Ad targeting radius", who: "Reach, not vanity" },
  { stat: "60 days", label: "To local-pack move", who: "Average" },
  { stat: "$0", label: "Monthly retainer", who: "Commission only" },
  { stat: "DC · MD · VA", label: "On-site content", who: "Where we show up" },
  { stat: "7", label: "Platforms covered", who: "The ones that convert" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What does \"commission\" mean — how do you actually get paid?",
    a: "Performance-based, not a monthly retainer. On the scoping call we agree on what counts as attributable revenue (new reservations tagged in OpenTable, loyalty-app signups, offer redemptions at the counter, bookings through a tracked link) and we take an agreed percentage of that number. If we don't move the needle, you don't pay. It aligns us with your P&L, not our billable hours.",
  },
  {
    q: "Do you only work with businesses in the DMV?",
    a: "We're based in the DMV and that's where we do our best work — we can show up on-site in DC, Arlington, Alexandria, Bethesda, Silver Spring, Fairfax, Loudoun, or anywhere inside the beltway for shoots, launches, and in-person meetings. We take clients outside the region too, but the on-site content production piece is remote-only in that case.",
  },
  {
    q: "We've tried Instagram ads before and it didn't do anything. Why would this be different?",
    a: "Ads without content that's actually worth watching don't work. The 2026 feed is 70%+ short-form video, and every brick-and-mortar we've scaled did it on original Reels and TikToks shot at the location, not boosted carousels. We shoot content on-site, we post daily, we run small local ad spend against the pieces that are already working organically, and we use Meta's local-awareness targeting so the money hits people inside a 10-mile radius who can actually walk in.",
  },
  {
    q: "What platforms do you cover?",
    a: "Instagram and TikTok for reach, Facebook for the 40+ local audience that still lives there, Google Business Profile for people searching \"[your category] near me,\" Yelp for the review tail, and Nextdoor for neighborhood-level reach (massively underrated in the DMV). We skip LinkedIn, X, and Threads for brick-and-mortar SMBs unless there's a specific B2B angle.",
  },
  {
    q: "Do you handle DMs, comments, and review responses?",
    a: "Yes. Inbound DMs on Instagram and Facebook, comments on posts and ads, and Google / Yelp reviews. We respond in your voice during business hours and escalate the ones that need an owner's attention. Review response alone usually moves local-pack ranking within 60 days.",
  },
  {
    q: "How long before we see results?",
    a: "Reach and follower growth show up in weeks 2 to 4. Foot-traffic and attributable-revenue lift typically shows up in weeks 6 to 10, once the organic content library is deep enough to feed the ad account. Local SEO and review lift (Google Business Profile ranking, star-count on Yelp) is usually 60 to 90 days.",
  },
  {
    q: "What kinds of businesses do you take?",
    a: "Restaurants, bars, cafes, salons, barbers, gyms and studios, med spas and dental practices, boutiques, specialty retail, and local service businesses with a real storefront. We don't take ecommerce-only brands, Amazon FBA, or drop-shipping — the commission model works because we can tie activity to foot traffic.",
  },
];

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Social media marketing for DMV small businesses",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Breek Innovations", url: SITE_URL },
  serviceType: "Social media management and local marketing",
  areaServed: [
    { "@type": "City", name: "Washington", containedInPlace: "District of Columbia" },
    { "@type": "State", name: "Maryland" },
    { "@type": "State", name: "Virginia" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Small and mid-size brick-and-mortar businesses",
  },
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
    { "@type": "ListItem", position: 2, name: "Social media marketing (DMV)", item: PAGE_URL },
  ],
};

export default function SocialMediaMarketingDmvPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="mx-auto max-w-[1240px] px-7 pt-14 pb-10 md:pt-24 md:pb-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#2E6B47]">
              DC · Maryland · Virginia
            </p>
            <h1
              className="mt-5 font-display font-bold m-0 text-balance"
              style={{
                fontSize: "clamp(48px, 7.2vw, 100px)",
                lineHeight: 0.99,
                letterSpacing: "-0.045em",
              }}
            >
              Social media that fills your{" "}
              <span style={{ color: "#2E6B47" }}>tables.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[680px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              A local team shooting original content at your storefront,
              posting daily across Instagram, TikTok, Facebook, and Google
              Business Profile, and responding in your voice. Commission-based
              — we earn when you do.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <BookACall className="text-base px-[30px] py-4" source="social-dmv-hero">
                Book a call
              </BookACall>
              <ContactTrigger
                source="social-dmv-hero"
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
            What local owners actually get
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
                  className="w-[280px] flex-none rounded-[20px] border border-[#DCE3DA] bg-white p-[26px]"
                >
                  <div
                    className="font-display text-[38px] font-bold leading-none text-[#2E6B47]"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {r.stat}
                  </div>
                  <div className="mt-2.5 text-[15px] font-medium">{r.label}</div>
                  <div className="mt-[22px] border-t border-[#EDF1EC] pt-4 text-[13px] text-[#6B776F]">
                    {r.who}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WhyUs tabs */}
        <SocialDmvWhyUs />

        {/* 4. Signature graphic — DMV Reach Map */}
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
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9FD0AE]">
                Reach, mapped
              </p>
              <h2
                className="m-0 mt-4 font-display font-bold"
                style={{
                  fontSize: "clamp(34px, 4.2vw, 56px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                }}
              >
                Every post ripples across the DMV.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                A Reel shot at your counter. A Google Business post that
                surfaces when someone searches nearby. A Yelp reply that moves
                you up a slot. Every surface, working the same radius around
                your door.
              </p>
            </div>
            <DmvReachMap />
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
            How we work with you
          </h2>
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {[
              {
                label: "01 · WEEK 1",
                title: "Scoping call",
                body: "We walk your current numbers (POS, OpenTable, booking tool). We agree on what counts as a new customer and the commission rate.",
              },
              {
                label: "02 · WEEKS 2–4",
                title: "On-site shoot",
                body: "Our videographer shows up at your door. One shoot produces 3 to 4 weeks of Reels, TikToks, and photo sets in your brand.",
              },
              {
                label: "03 · WEEKS 2–12",
                title: "90-day ramp",
                body: "Daily posting, GBP, review responses, DM handling. Local ads on the pieces that work. Commission capped low during ramp.",
              },
              {
                label: "04 · ONGOING",
                title: "Standard commission",
                body: "Monthly statement showing attributable revenue and what you owe. Cancel anytime. No retainer, no termination fee.",
              },
            ].map((s) => (
              <div key={s.title} className="border-t-[3px] border-[#2E6B47] pt-6">
                <div className="mb-3.5 font-mono text-xs text-[#2E6B47]">{s.label}</div>
                <div className="mb-2.5 font-display text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              How pricing works
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(32px, 3.8vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              You pay when we move the needle.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "Scoping call",
                  sub: "Free · 30 min",
                  w: "Week 1",
                  p: "We review your current numbers and agree on attribution. If we can't tie activity to revenue, we tell you so.",
                },
                {
                  h: "90-day ramp",
                  sub: "Commission capped low",
                  w: "Weeks 2 to 12",
                  p: "We shoot, we post, we build the content library, we tune ads. You don't pay standard commission until the account is warm.",
                },
                {
                  h: "Ongoing",
                  sub: "Standard commission",
                  w: "Month 4 onward",
                  p: "Transparent monthly invoice showing attributable revenue and what you owe. Cancel anytime, no termination fee.",
                },
              ].map((tier) => (
                <div key={tier.h} className="rounded-2xl border border-[#DCE3DA] bg-[#F5F6F0] p-6">
                  <h3 className="m-0 font-display text-[18px] font-bold tracking-[-0.015em] text-[#13201A]">
                    {tier.h}
                  </h3>
                  <p className="m-0 mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-[#6B776F]">
                    {tier.sub}
                  </p>
                  <p className="m-0 mt-1 text-[13.5px] text-[#4D5A51]">
                    {tier.w}
                  </p>
                  <p className="m-0 mt-4 text-[14.5px] leading-[1.55] text-[#4D5A51]">
                    {tier.p}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13.5px] text-[#6B776F]">
              Ad spend is a separate line item billed at cost — no markup.{" "}
              <a href="/#pricing" className="text-[#2E6B47] underline-offset-2 hover:underline">
                See all pricing
              </a>
              .
            </p>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="bg-[#F5F6F0] py-24">
          <div className="mx-auto max-w-[880px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              Questions
            </p>
            <h2
              className="mt-4 max-w-[640px] font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              What local owners ask us most.
            </h2>
            <div className="mt-10 divide-y divide-[#DCE3DA] border-y border-[#DCE3DA]">
              {FAQS.map((item, i) => (
                <details key={item.q} className="group py-6" {...(i === 0 ? { open: true } : {})}>
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
        id="ld-service-social-dmv"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <Script
        id="ld-faq-social-dmv"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Script
        id="ld-breadcrumb-social-dmv"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
    </div>
  );
}
