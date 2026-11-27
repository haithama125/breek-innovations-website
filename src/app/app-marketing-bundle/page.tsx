import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { RevealObserver } from "@/components/RevealObserver";
import { AppBundleWhyUs } from "@/components/icp-sections/AppBundleWhyUs";
import { AppBundleFlywheel } from "@/components/icp-graphics/AppBundleFlywheel";
import { ContactTrigger } from "@/components/ContactFormModal";

const SITE_URL = "https://breek-innovations.com";
const PAGE_URL = `${SITE_URL}/app-marketing-bundle/`;
const TITLE = "App + Marketing Bundle";
const DESCRIPTION =
  "We build your iPhone and Android app and run the marketing that gets it installed — one team, one timeline, one number. Launch day is day 1 of ads.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "app and marketing bundle",
    "app launch marketing",
    "build and launch app",
    "mobile app marketing",
    "app store ads",
    "iOS app launch",
    "Android app launch",
    "app growth agency",
    "full-service app launch",
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
  { stat: "One team", label: "App build + marketing" },
  { stat: "Fixed price", label: "On the build, no surprises" },
  { stat: "Monthly fee", label: "On the marketing, cancel after 3" },
  { stat: "~8 weeks", label: "From signed quote to App Store" },
  { stat: "Day 1 ads", label: "Running the week you launch" },
  { stat: "Weekly report", label: "Installs, cost, retention" },
  { stat: "You own", label: "The app, the data, every asset" },
  { stat: "No markup", label: "Ad spend billed at cost" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What does this bundle actually include?",
    a: "Two things, run by one team. (1) We design, build, and launch your iPhone and Android app on both stores. (2) The week it goes live, we start running the marketing — short videos for social, the App Store listing and screenshots, paid ads (Instagram, TikTok, Google), email, a small content plan. Weekly report. Everything, one invoice.",
  },
  {
    q: "What does it cost?",
    a: "Two numbers. The app build is a fixed price, quoted after a 30-minute call. The marketing is a simple monthly fee that starts the week you launch; you can cancel after month 3. Ad spend (what Instagram, TikTok, Google charge) is separate and billed at cost — no agency markup. We send the full quote in writing before you sign anything.",
  },
  {
    q: "How long until the app is in the stores and ads are running?",
    a: "Most apps ship in 6 to 10 weeks. The week your app is accepted by Apple and Google, the first ad creative is already filmed, the App Store listing is ready, and campaigns turn on. You go from idea to installs in roughly 2 months, not 6.",
  },
  {
    q: "What marketing channels do you run?",
    a: "Short-form video (Instagram Reels, TikTok, YouTube Shorts), paid ads on the same platforms plus Google and Apple Search Ads, App Store Optimization (listing, screenshots, keywords), email for your existing list, and lightweight influencer seeding if it fits your audience. We don't do what doesn't move the needle for your category.",
  },
  {
    q: "Do I own the app and the ad accounts?",
    a: "Yes, completely. The app is in your name, the Apple and Google developer accounts are in your name, every ad account is set up under your business. If you ever want to work with someone else later, you walk away with everything.",
  },
  {
    q: "Can I buy just the build, or just the marketing?",
    a: "Yes — this bundle is for people who want one team to do both, but if you only need the build, our Custom Mobile Apps page is where to start. If you already have an app and just want the marketing, mention that on the call and we'll quote the marketing side separately.",
  },
];

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "App + Marketing Bundle",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Breek Innovations", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "Mobile app development and launch marketing",
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
    { "@type": "ListItem", position: 2, name: "App + Marketing bundle", item: PAGE_URL },
  ],
};

export default function AppMarketingBundlePage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="mx-auto max-w-[1240px] px-7 pt-20 pb-10 md:pt-28 md:pb-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#2E6B47]">
              App + Marketing Bundle
            </p>
            <h1
              className="mt-5 font-display font-bold m-0 text-balance"
              style={{
                fontSize: "clamp(48px, 7.2vw, 100px)",
                lineHeight: 0.99,
                letterSpacing: "-0.045em",
              }}
            >
              Build the app. Fill it with{" "}
              <span style={{ color: "#2E6B47" }}>real users.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[720px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              We design and ship your iPhone and Android app, then on launch day
              we turn on the marketing that gets it installed. One team, one
              timeline, one number.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <BookACall className="text-base px-[30px] py-4" source="app-bundle-hero">
                Book a call
              </BookACall>
              <ContactTrigger
                source="app-bundle-hero"
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
        <AppBundleWhyUs />

        {/* 4. Signature graphic — App Bundle Flywheel */}
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
                Build. Launch. Advertise. Learn. Repeat.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                One team owns the whole loop. The people who built the app
                also read the install data and tune the next ad. Nothing
                gets lost between vendors.
              </p>
            </div>
            <AppBundleFlywheel />
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
                body: "A 30-minute call to understand the app and who it's for. You get a fixed app price and a simple monthly marketing fee in writing within 24 hours.",
              },
              {
                step: "02",
                title: "We build and prep the launch",
                body: "In parallel: the team builds the app, the content crew plans the first batch of videos, the ad accounts get set up in your name.",
              },
              {
                step: "03",
                title: "Launch day, ads day",
                body: "Your app goes live on the App Store and Google Play. The same week, videos start posting, paid ads turn on, email lists get the first send.",
              },
              {
                step: "04",
                title: "Report weekly, improve weekly",
                body: "One weekly email: installs, cost per install, retention, what's working, what we're changing. The build team reads it too, so v1.1 is already smarter.",
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
                  h: "The app build",
                  w: "Fixed price, 6 to 10 weeks",
                  p: "Design, iPhone and Android app, your dashboard, launch on both stores. You own all of it, day one.",
                },
                {
                  h: "The marketing",
                  w: "Simple monthly, 3 month min",
                  p: "Content, ads on the channels that matter, App Store optimization, weekly report. Cancel after month 3, no contract.",
                },
                {
                  h: "Ad spend",
                  w: "At cost, no markup",
                  p: "What Meta, TikTok, Google, Apple charge, passed through at the exact cost. You see every receipt.",
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
              Just need the build or just the marketing? That&apos;s fine too.{" "}
              <a
                href="/mobile-app-development/"
                className="text-[#2E6B47] underline-offset-2 hover:underline"
              >
                See the app-only page
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
              Questions founders ask before signing.
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
        id="ld-service-app-bundle"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <Script
        id="ld-faq-app-bundle"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Script
        id="ld-breadcrumb-app-bundle"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
    </div>
  );
}
