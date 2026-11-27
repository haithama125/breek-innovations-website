import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { RevealObserver } from "@/components/RevealObserver";
import { RestaurantWhyUs } from "@/components/icp-sections/RestaurantWhyUs";
import { RetentionLoop } from "@/components/icp-graphics/RetentionLoop";
import { ContactTrigger } from "@/components/ContactFormModal";

const SITE_URL = "https://breek-innovations.com";
const PAGE_URL = `${SITE_URL}/restaurant-apps/`;
const TITLE = "Restaurant Loyalty Apps & Websites";
const DESCRIPTION =
  "Custom loyalty apps, in-app ordering, and websites for restaurants. Integrates with Toast, Square, and Clover. Fixed-price builds, launched in 3 to 6 weeks.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "restaurant loyalty app",
    "custom restaurant app",
    "loyalty app for restaurants",
    "restaurant app developer",
    "Toast loyalty app",
    "Square loyalty app",
    "Clover loyalty app",
    "restaurant website developer",
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
  { stat: "3.4×", label: "Repeat visits", who: "90 days post-launch" },
  { stat: "+180%", label: "Loyalty sign-ups", who: "Vs. prior rented stack" },
  { stat: "<15s", label: "In-app checkout", who: "POS-aware flow" },
  { stat: "$0", label: "Per-redemption fee", who: "You own it outright" },
  { stat: "4.9★", label: "App Store rating", who: "Latest launched build" },
  { stat: "22%", label: "SMS reply rate", who: "Tonight-only offers" },
  { stat: "6 wk", label: "Launch timeline", who: "App + POS + admin" },
  { stat: "100%", label: "Code ownership", who: "Repo in your GitHub" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "How is this different from Fivestars, Thanx, or Toast loyalty?",
    a: "Those are rented loyalty programs. You pay monthly, they own the customer data, and you can't run a campaign outside what their dashboard allows. We build your own branded app. You own the data, the code, and every customer relationship it creates. After launch there is no per-customer or per-transaction fee to us.",
  },
  {
    q: "Does the app talk to my POS?",
    a: "Yes. We build integrations with Toast, Square, and Clover so point accrual, reward redemption, and order history stay in sync automatically. For other systems (TouchBistro, Lightspeed, Resy for reservations, OpenTable) we check the API before we quote.",
  },
  {
    q: "Can customers order through the app?",
    a: "Yes, as an optional add-on. We ship native in-app ordering with Stripe or your existing processor, pickup and delivery flows, modifiers, and order-ahead windows. If you already use Toast Order or Square Online we can deep-link into those instead to keep one source of truth.",
  },
  {
    q: "What does it cost and how long does it take?",
    a: "A loyalty app (iOS, Android, admin dashboard, POS integration) starts around the Custom Mobile Apps tier on our pricing page and ships in 5 to 6 weeks. A standalone restaurant website is 2 to 3 weeks. Adding in-app ordering adds 2 to 3 weeks. Every build is quoted as a fixed price before we start.",
  },
  {
    q: "Who runs the app after launch?",
    a: "You can. The admin dashboard is designed so a manager can create rewards, send an SMS blast, or run a slow-night promo without us. If you'd rather not touch it, we offer a monthly retainer where we send the campaigns, update the menu, and handle App Store updates.",
  },
];

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Restaurant loyalty app and website development",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Breek Innovations", url: SITE_URL },
  areaServed: "US",
  serviceType: "Mobile app development for restaurants",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Restaurant owners and operators",
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
    { "@type": "ListItem", position: 2, name: "Restaurant apps", item: PAGE_URL },
  ],
};

export default function RestaurantAppsPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* 1. Hero — centered text */}
        <section className="mx-auto max-w-[1240px] px-7 pt-14 pb-10 md:pt-24 md:pb-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#2E6B47]">
              For restaurants
            </p>
            <h1
              className="mt-5 font-display font-bold m-0 text-balance"
              style={{
                fontSize: "clamp(52px, 8vw, 108px)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
              }}
            >
              Loyalty apps restaurants{" "}
              <span style={{ color: "#2E6B47" }}>actually use.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[680px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              Custom iOS and Android apps that plug into your POS, keep customers
              coming back, and don&apos;t lock you into a third-party platform.
              Shipped in 3 to 6 weeks for a fixed price.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <BookACall className="text-base px-[30px] py-4" source="restaurant-apps-hero">
                Book a call
              </BookACall>
              <ContactTrigger
                source="restaurant-apps-hero"
                className="pill-outline inline-flex items-center justify-center rounded-full px-[30px] py-4 text-base font-semibold"
              >
                Get in touch
              </ContactTrigger>
            </div>
          </div>
        </section>

        {/* 2. Stats marquee — restaurant-specific */}
        <section className="pb-10 pt-6 md:pt-10">
          <h2
            className="mx-7 mb-11 text-center font-display font-bold"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.035em" }}
          >
            What restaurants see after launch
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
                  className="w-[270px] flex-none rounded-[20px] border border-[#DCE3DA] bg-white p-[26px]"
                >
                  <div
                    className="font-display text-[44px] font-bold leading-none text-[#2E6B47]"
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

        {/* 3. Why restaurants pick us — tabbed */}
        <RestaurantWhyUs />

        {/* 4. Signature graphic — Retention Loop */}
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
                How the loop works
              </p>
              <h2
                className="m-0 mt-4 font-display font-bold"
                style={{
                  fontSize: "clamp(34px, 4.2vw, 56px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                }}
              >
                Every visit earns the next one.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                A guest taps the app at the counter. The POS writes the check
                to their visit history. Points land in the app. A push lights
                up at the right moment for the next visit. Repeat until the
                regulars know your staff by name.
              </p>
            </div>
            <RetentionLoop />
          </div>
        </section>

        {/* 5. Work — reuse */}
        <Work />

        {/* 6. Testimonials — reuse */}
        <Testimonials />

        {/* 7. How it works — restaurant-specific */}
        <section className="mx-auto max-w-[1240px] px-7 py-24">
          <h2
            className="mb-12 font-display font-bold"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            How we ship your app
          </h2>
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {[
              {
                label: "01 · WEEK 1",
                title: "Scope & quote",
                body: "We walk your menu, POS, and current loyalty setup. You get a fixed quote in 24 hours.",
              },
              {
                label: "02 · WEEKS 2–3",
                title: "Design & integrations",
                body: "Brand, screens, and POS integration spec'd and approved. API contracts signed with Toast / Square / Clover.",
              },
              {
                label: "03 · WEEKS 3–5",
                title: "Build & test",
                body: "iOS + Android + admin built in sprints. Weekly TestFlight / Play Internal builds for your team to try.",
              },
              {
                label: "04 · WEEK 6",
                title: "Launch & handoff",
                body: "Submission to both stores. Train your manager on the admin. 30 days of free post-launch fixes.",
              },
            ].map((s) => (
              <div key={s.title} className="border-t-[3px] border-[#2E6B47] pt-6">
                <div className="mb-3.5 font-mono text-xs text-[#2E6B47]">{s.label}</div>
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

        {/* 8. Pricing — restaurant tiers */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1080px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              Pricing & timeline
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(32px, 3.8vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              Fixed scope. Fixed price. Fixed end date.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "Website only",
                  sub: "From $500",
                  w: "2 to 3 weeks",
                  p: "Menu, reservations, gift cards, SEO. Good starting point if you don't need an app yet.",
                },
                {
                  h: "Loyalty app + POS",
                  sub: "From our Custom Mobile Apps tier",
                  w: "5 to 6 weeks",
                  p: "iOS, Android, admin dashboard, POS integration, SMS + push.",
                },
                {
                  h: "Full stack",
                  sub: "App + ordering + site",
                  w: "7 to 9 weeks",
                  p: "Loyalty app with in-app ordering, Stripe checkout, and a matching website. One ecosystem, one invoice.",
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
                    Timeline: {tier.w}
                  </p>
                  <p className="m-0 mt-4 text-[14.5px] leading-[1.55] text-[#4D5A51]">
                    {tier.p}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13.5px] text-[#6B776F]">
              Every build includes 30 days of post-launch fixes at no cost.{" "}
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
              What restaurant owners ask us most.
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
        id="ld-service-restaurant"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <Script
        id="ld-faq-restaurant"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Script
        id="ld-breadcrumb-restaurant"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
    </div>
  );
}
