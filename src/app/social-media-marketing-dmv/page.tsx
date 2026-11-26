import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";

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
  provider: {
    "@type": "Organization",
    name: "Breek Innovations",
    url: SITE_URL,
  },
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Social media marketing (DMV)",
      item: PAGE_URL,
    },
  ],
};

export default function SocialMediaMarketingDmvPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden text-[#F0F4EF]"
          style={{
            background:
              "radial-gradient(90% 120% at 50% 100%, #2F6A49 0%, #164029 48%, #0C2419 100%)",
          }}
        >
          <div className="mx-auto max-w-[1180px] px-7 pt-20 pb-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9FD0AE]">
              DC · Maryland · Virginia
            </p>
            <h1
              className="mt-5 max-w-[920px] font-display font-bold"
              style={{
                fontSize: "clamp(38px, 5.2vw, 68px)",
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
              }}
            >
              Social media that fills your tables, chairs, and sidewalks.
            </h1>
            <p className="mt-6 max-w-[640px] text-[17px] leading-[1.6] text-[#C9D6CD]">
              A local team shooting original content at your storefront,
              posting daily across Instagram, TikTok, Facebook, and Google
              Business Profile, and responding in your voice. Commission-based
              — we earn when you do.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookACall className="text-base px-7 py-4" source="social-dmv-hero">
                Book a 30-min call
              </BookACall>
              <a
                href="#what-we-do"
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-4 text-[15px] font-semibold text-[#F0F4EF] transition-colors hover:border-[#F0F4EF]"
              >
                See what we do
              </a>
            </div>
          </div>
        </section>

        {/* Who */}
        <section className="bg-[#F5F6F0] py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              Who we work with
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Brick-and-mortar SMBs with a real door to open.
            </h2>
            <p className="mt-5 max-w-[640px] text-[15.5px] leading-[1.65] text-[#4D5A51]">
              Restaurants in Shaw, salons in Clarendon, gyms in Bethesda,
              med spas in Tysons, boutiques in Georgetown, studios in Silver
              Spring. If your revenue depends on people showing up in person,
              this is built for you.
            </p>
            <div className="mt-8 grid gap-3 text-[14px] font-medium text-[#13201A] md:grid-cols-4">
              {[
                "Restaurants & cafes",
                "Bars & lounges",
                "Salons & barbers",
                "Gyms & studios",
                "Med spas & wellness",
                "Dental practices",
                "Boutiques & retail",
                "Local services",
              ].map((cat) => (
                <div
                  key={cat}
                  className="rounded-xl border border-[#DCE3DA] bg-white px-4 py-3"
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we do */}
        <section id="what-we-do" className="bg-white py-24">
          <div className="mx-auto max-w-[1080px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              What we do
            </p>
            <h2
              className="mt-4 max-w-[760px] font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Everything that touches your social presence, under one team.
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  h: "On-site content shoots",
                  p: "A videographer at your location monthly, capturing Reels, TikToks, and photo sets that look like a local person made them, not a stock-asset agency.",
                },
                {
                  h: "Daily posting across platforms",
                  p: "Instagram, TikTok, and Facebook posted and scheduled by our team. Local hashtags, geotags, trending audio chosen for your audience, not a generic template.",
                },
                {
                  h: "Google Business Profile + reviews",
                  p: "Weekly GBP posts, photo uploads, Q&A moderation, and review responses on Google and Yelp. This is the lever that moves \"[your category] near me\" ranking.",
                },
                {
                  h: "Local ad spend",
                  p: "We boost the organic content that's already working, targeted to a 5 to 10 mile radius around your location. Meta and TikTok ads. No wasted impressions in Idaho.",
                },
                {
                  h: "DMs, comments, and inbound",
                  p: "We respond in your voice during business hours, escalate the owner-only ones, and tag anything that smells like a booking opportunity into your CRM.",
                },
                {
                  h: "Monthly reporting that matters",
                  p: "Followers, reach, and engagement, but the number you'll actually read is attributable foot traffic: bookings, redemptions, and new customers we can tie back to a post or an ad.",
                },
              ].map((item) => (
                <li
                  key={item.h}
                  className="rounded-2xl border border-[#E6EBE4] p-6"
                >
                  <h3 className="m-0 font-display text-[18px] font-bold tracking-[-0.015em] text-[#13201A]">
                    {item.h}
                  </h3>
                  <p className="m-0 mt-3 text-[15px] leading-[1.6] text-[#4D5A51]">
                    {item.p}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Platforms */}
        <section className="bg-[#F5F6F0] py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              Platforms we run
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              The ones that actually move local revenue.
            </h2>
            <p className="mt-5 max-w-[640px] text-[15.5px] leading-[1.65] text-[#4D5A51]">
              We skip LinkedIn, X, and Threads for storefront SMBs unless
              there&apos;s a specific B2B angle. Attention is a budget — we spend
              it where your customers already are.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5 text-[13.5px] text-[#13201A]">
              {[
                "Instagram (Reels + feed + Stories)",
                "TikTok",
                "Facebook",
                "Google Business Profile",
                "Yelp",
                "Nextdoor",
                "Meta Ads Manager",
                "TikTok Ads",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#DCE3DA] bg-white px-4 py-1.5 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How pricing works */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              How pricing works
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              You pay when we move the needle. Not before.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  n: "01",
                  h: "Scoping call",
                  p: "We walk through your current numbers (POS, OpenTable, booking software, whatever you run), figure out what counts as a new customer, and agree on the attribution model and commission rate.",
                },
                {
                  n: "02",
                  h: "90-day ramp",
                  p: "We shoot content, build your content library, run the first ads, and tune reporting. Commission is capped low during ramp so you're not paying us while the account warms up.",
                },
                {
                  n: "03",
                  h: "Ongoing",
                  p: "Standard commission kicks in. Transparent monthly invoice showing the attributable revenue and what you owe. Cancel anytime — no retainer, no termination fee.",
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl border border-[#DCE3DA] bg-[#F5F6F0] p-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#4C8A62]">
                    {step.n}
                  </div>
                  <h3 className="m-0 mt-2 font-display text-[17px] font-bold tracking-[-0.015em] text-[#13201A]">
                    {step.h}
                  </h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.6] text-[#4D5A51]">
                    {step.p}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13.5px] text-[#6B776F]">
              Ad spend is a separate line item, billed at cost. No markup, no
              hidden margin — you see the Meta and TikTok invoices directly.{" "}
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

        {/* FAQ */}
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

        <FinalCTA />
      </main>
      <Footer />

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
