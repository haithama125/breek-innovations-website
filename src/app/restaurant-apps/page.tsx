import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";

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
  provider: {
    "@type": "Organization",
    name: "Breek Innovations",
    url: SITE_URL,
  },
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Restaurant apps",
      item: PAGE_URL,
    },
  ],
};

export default function RestaurantAppsPage() {
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
              For restaurants
            </p>
            <h1
              className="mt-5 max-w-[880px] font-display font-bold"
              style={{
                fontSize: "clamp(38px, 5.2vw, 68px)",
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
              }}
            >
              Loyalty apps restaurants actually use.
            </h1>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.6] text-[#C9D6CD]">
              Custom iOS and Android apps that plug into your POS, keep
              customers coming back, and don&apos;t lock you into a third-party
              platform. Shipped in 3 to 6 weeks for a fixed price.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookACall className="text-base px-7 py-4" source="restaurant-apps-hero">
                Book a 30-min call
              </BookACall>
              <a
                href="#what-we-build"
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-4 text-[15px] font-semibold text-[#F0F4EF] transition-colors hover:border-[#F0F4EF]"
              >
                See what we build
              </a>
            </div>
          </div>
        </section>

        {/* Pain / problem */}
        <section className="bg-[#F5F6F0] py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              The problem
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Rented loyalty programs take your margin and own your customers.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "Third-party fees stack up",
                  p: "Fivestars, Thanx, and similar platforms charge $200 to $400 a month, plus per-redemption fees. On 300 covers a week it eats real margin.",
                },
                {
                  h: "You don't own the data",
                  p: "The customer list, visit history, and promo responses live on their servers. Cancel, and you lose the audience you paid to build.",
                },
                {
                  h: "Campaigns are stuck in templates",
                  p: "Want a double-points Tuesday targeting only lunch customers? A birthday drink on file for your top 50 regulars? Most platforms can't do it.",
                },
              ].map((item) => (
                <div
                  key={item.h}
                  className="rounded-2xl border border-[#DCE3DA] bg-white p-6"
                >
                  <h3 className="m-0 font-display text-[17px] font-bold tracking-[-0.015em] text-[#13201A]">
                    {item.h}
                  </h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.6] text-[#4D5A51]">
                    {item.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we build */}
        <section id="what-we-build" className="bg-white py-24">
          <div className="mx-auto max-w-[1080px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              What we build
            </p>
            <h2
              className="mt-4 max-w-[760px] font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              A branded loyalty stack you own outright.
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  h: "Custom iOS + Android app",
                  p: "Your logo on the App Store icon, your colors in the UI, your name next to your regulars every time they open their phone.",
                },
                {
                  h: "Points, tiers, and rewards you control",
                  p: "Visit-based, spend-based, item-based, or hybrid. Birthday rewards, referral rewards, and win-back offers for lapsed customers.",
                },
                {
                  h: "POS integration",
                  p: "Toast, Square, and Clover supported. Points accrue on the check and redeem as a modifier so your staff doesn't do anything different.",
                },
                {
                  h: "SMS + push campaigns",
                  p: "Admin dashboard that lets a manager send \"slow night, 2x points\" to a specific cohort in under a minute. Twilio for SMS, native APNs/FCM for push.",
                },
                {
                  h: "Optional in-app ordering",
                  p: "Native ordering with Stripe or your existing processor, modifiers, pickup and delivery, order-ahead windows. Or deep-link into Toast Order if you already use it.",
                },
                {
                  h: "Companion website",
                  p: "Menu, locations, reservations (Resy or OpenTable), gift cards, and SEO so you show up on Google and ChatGPT when someone asks for your type of food.",
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

        {/* Stack / integrations */}
        <section className="bg-[#F5F6F0] py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              Integrations
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              Plays nice with the systems you already run.
            </h2>
            <p className="mt-5 max-w-[640px] text-[15.5px] leading-[1.65] text-[#4D5A51]">
              We use official APIs and webhooks, not screen scraping. If you&apos;re
              on something we haven&apos;t listed, send the system name and we&apos;ll
              check the integration surface before quoting.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5 text-[13.5px] text-[#13201A]">
              {[
                "Toast",
                "Square for Restaurants",
                "Clover",
                "Resy",
                "OpenTable",
                "Twilio (SMS)",
                "Stripe",
                "Mailchimp",
                "Klaviyo",
                "DoorDash Drive",
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

        {/* Pricing + timeline */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              Pricing & timeline
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              Fixed scope, fixed price, fixed end date.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
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
                <div
                  key={tier.h}
                  className="rounded-2xl border border-[#DCE3DA] bg-[#F5F6F0] p-6"
                >
                  <h3 className="m-0 font-display text-[17px] font-bold tracking-[-0.015em] text-[#13201A]">
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
              Every build includes 30 days of post-launch fixes at no cost. Want
              us to run it after that? Monthly retainers start where our other
              retainers start.{" "}
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

        <FinalCTA />
      </main>
      <Footer />

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
