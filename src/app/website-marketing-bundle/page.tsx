import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { RevealObserver } from "@/components/RevealObserver";
import { WebsiteBundleWhyUs } from "@/components/icp-sections/WebsiteBundleWhyUs";
import { WebsiteStreams } from "@/components/icp-graphics/WebsiteStreams";
import { ContactTrigger } from "@/components/ContactFormModal";

const SITE_URL = "https://breek-innovations.com";
const PAGE_URL = `${SITE_URL}/website-marketing-bundle/`;
const TITLE = "Website + Marketing Bundle";
const DESCRIPTION =
  "We build your website and run the marketing that drives people to it — SEO, GEO, social content, and paid ads from one team. Fixed site price + simple monthly, cancel after 3.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "website and marketing bundle",
    "website design and marketing",
    "web design plus SEO",
    "full-service website agency",
    "small business website marketing",
    "SEO web design bundle",
    "GEO website",
    "AI-ready website",
    "landing page agency",
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
  { stat: "One team", label: "Site build + marketing" },
  { stat: "Fixed price", label: "On the build, no surprises" },
  { stat: "Monthly fee", label: "Marketing, cancel after 3" },
  { stat: "2–4 weeks", label: "From signed quote to launch" },
  { stat: "SEO + GEO", label: "Baked in, not bolted on" },
  { stat: "Weekly report", label: "Traffic, leads, what we changed" },
  { stat: "You own it", label: "Code, domain, accounts, data" },
  { stat: "No markup", label: "Ad spend billed at cost" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What's included in this bundle?",
    a: "Two things, run by one team. (1) We design and build your website — homepage, services, pricing, about, FAQ, blog, and the real landing pages your ads will point at. SEO and GEO are built into every page. (2) The week it goes live, we start running the marketing: Google SEO, AI engine visibility, short-form social content, and paid ads. You get one weekly report of what moved.",
  },
  {
    q: "What does it cost?",
    a: "Two numbers. The website build is a fixed price, quoted after a 30-minute call. The marketing is a simple monthly fee that starts the week you launch; you can cancel after month 3. Ad spend (what Meta, Google, TikTok charge) is separate and billed at cost — no agency markup.",
  },
  {
    q: "How long until the site is live and we're seeing traffic?",
    a: "Most websites ship in 2 to 4 weeks. Paid ads start the week the site goes live. SEO and GEO (the free traffic) take 2 to 4 months to really move — that's how long Google and AI engines take to re-crawl, re-rank, and start quoting you.",
  },
  {
    q: "I already have a website. Can you just do the marketing?",
    a: "Yes. If your current site is already set up for SEO and GEO we'll run the marketing on top of it. If it isn't, we'll be honest with you — we'll either rebuild it (and quote the fixed-price build) or recommend fixes to the existing one. We won't run paid ads to a broken site, it just wastes your money.",
  },
  {
    q: "Is this good for a small local business?",
    a: "Yes — it's the bundle we recommend most for local businesses who don't need a full app. A great site plus consistent marketing beats an app with no traffic every time. If you do need an app too, the App + Marketing Bundle folds in the mobile piece.",
  },
  {
    q: "Do I own everything?",
    a: "Yes. The code, the domain, the ad accounts, the analytics — all in your name, day one. No monthly software fees to us, no lock-in. If you ever want to work with someone else, you walk away with everything.",
  },
];

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website + Marketing Bundle",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Breek Innovations", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "Website development and marketing",
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
    { "@type": "ListItem", position: 2, name: "Website + Marketing bundle", item: PAGE_URL },
  ],
};

export default function WebsiteMarketingBundlePage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="mx-auto max-w-[1240px] px-7 pt-20 pb-10 md:pt-28 md:pb-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#2E6B47]">
              Website + Marketing Bundle
            </p>
            <h1
              className="mt-5 font-display font-bold m-0 text-balance"
              style={{
                fontSize: "clamp(48px, 7.2vw, 100px)",
                lineHeight: 0.99,
                letterSpacing: "-0.045em",
              }}
            >
              A site that gets{" "}
              <span style={{ color: "#2E6B47" }}>found.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[720px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              We build your website and run the marketing that drives people to
              it — Google, AI engines, social, and ads — all from one team. One
              fixed build price. One simple monthly fee.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <BookACall className="text-base px-[30px] py-4" source="website-bundle-hero">
                Book a call
              </BookACall>
              <ContactTrigger
                source="website-bundle-hero"
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
            What you can count on
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
                    className="font-display text-[28px] font-bold leading-tight text-[#2E6B47]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {r.stat}
                  </div>
                  <div className="mt-3 text-[14.5px] text-[#4D5A51]">{r.label}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WhyUs */}
        <WebsiteBundleWhyUs />

        {/* 4. Signature graphic — Website Streams */}
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
                One site. Every channel pointed at it.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                Google search. AI engines. Social reels. Paid ads. We run every
                channel that matters and send each one to the page on your site
                that converts it.
              </p>
            </div>
            <WebsiteStreams />
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
            How this bundle rolls out
          </h2>
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {[
              {
                step: "01",
                title: "We talk, then we quote",
                body: "A 30-minute call to understand your business and what you need the site to do. You get a fixed site price and a simple monthly marketing fee in writing within 24 hours.",
              },
              {
                step: "02",
                title: "We design & build",
                body: "Week 1 you see the full design. Week 2 to 4 we build, write the content, and set up SEO and GEO so the site is AI-readable the day it launches.",
              },
              {
                step: "03",
                title: "Launch day, marketing on",
                body: "Site goes live. Paid ads turn on. Social content starts posting. Google and AI engines start indexing. The week your site launches is week 1 of growth.",
              },
              {
                step: "04",
                title: "Report weekly, tune weekly",
                body: "One weekly email: traffic, leads, what moved on Google, what AI engines are quoting, what we're changing next. Cancel the marketing anytime after month 3.",
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
              Two numbers. Both in writing before you sign.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "The site build",
                  w: "Fixed price, 2 to 4 weeks",
                  p: "Design, build, write every page, set up SEO and GEO. You own the code, the domain, and the analytics — day one.",
                },
                {
                  h: "The marketing",
                  w: "Simple monthly, 3 month min",
                  p: "SEO, GEO, social content, paid ads, weekly report. Cancel after month 3. No contract.",
                },
                {
                  h: "Ad spend",
                  w: "At cost, no markup",
                  p: "What Meta, Google, TikTok charge, passed through at the exact cost. You see every receipt.",
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
              Just want GEO on your current site? See the{" "}
              <a
                href="/geo/"
                className="text-[#2E6B47] underline-offset-2 hover:underline"
              >
                GEO engagement page
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
              Questions owners ask before signing.
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
        id="ld-service-website-bundle"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <Script
        id="ld-faq-website-bundle"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Script
        id="ld-breadcrumb-website-bundle"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
    </div>
  );
}
