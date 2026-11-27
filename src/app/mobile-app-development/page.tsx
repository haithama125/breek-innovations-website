import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { RevealObserver } from "@/components/RevealObserver";
import { MobileWhyUs } from "@/components/icp-sections/MobileWhyUs";
import { PlatformFan } from "@/components/icp-graphics/PlatformFan";
import { ContactTrigger } from "@/components/ContactFormModal";

const SITE_URL = "https://breek-innovations.com";
const PAGE_URL = `${SITE_URL}/mobile-app-development/`;
const TITLE = "Custom Mobile Apps for Your Business";
const DESCRIPTION =
  "We design, build, and launch your iPhone and Android app in 6 to 10 weeks for a fixed price. One team handles everything so you don't have to.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "mobile app developer",
    "hire mobile app developer",
    "custom mobile app",
    "iPhone app developer",
    "Android app developer",
    "small business app",
    "freelance mobile app development",
    "app development for small business",
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
  { stat: "6–10 wks", label: "From idea to app store" },
  { stat: "iPhone + Android", label: "Both, launched together" },
  { stat: "Fixed price", label: "Quoted before we start" },
  { stat: "100%", label: "You own the app" },
  { stat: "30 days", label: "Free fixes after launch" },
  { stat: "$0", label: "Hidden fees, ever" },
  { stat: "<24h", label: "Quote after our first call" },
  { stat: "One team", label: "Start to finish" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What does it cost and how long does it take?",
    a: "Most apps ship in 6 to 10 weeks and are quoted as a fixed price before we start. A simple first version is on the shorter end. A full product with payments, logins, and lots of features is on the longer end. We give you an exact number after a 30-minute call, so you're never guessing.",
  },
  {
    q: "What's included — just the app, or everything?",
    a: "Everything. The app your customers download, the dashboard you use to manage it, where all your data lives, the payment flow, and the launch on both app stores. You get one team, one invoice, and one point of contact for the whole thing.",
  },
  {
    q: "Do I own the app when you're done?",
    a: "Yes, completely. The app is in your name, the Apple and Google accounts are in your name, and we don't charge any ongoing fee to own it. If you ever want to work with someone else later, you can walk away with everything.",
  },
  {
    q: "Do you launch it on the App Store and Google Play?",
    a: "Yes. We set up the store listings, write the descriptions, submit for review, and handle all the back-and-forth with Apple and Google. You don't ever talk to a reviewer or deal with a certificate. Your app shows up on both stores when it's ready.",
  },
  {
    q: "What happens if something breaks after launch?",
    a: "You get 30 days of free fixes after launch, no questions asked. After that, if you want us to keep adding features, we offer a simple monthly plan. If you don't need anything, we don't charge anything.",
  },
  {
    q: "What kinds of businesses hire you?",
    a: "Restaurants wanting loyalty apps, local service businesses wanting a booking or dispatch app, med spas and dental practices wanting a patient-facing app, and founders with an idea they want in the app stores. If you're not sure your idea fits, book a 30-minute call — we'll tell you honestly.",
  },
];

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom mobile app development for small businesses",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Breek Innovations", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "Mobile app design and development",
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
    { "@type": "ListItem", position: 2, name: "Mobile apps", item: PAGE_URL },
  ],
};

export default function MobileAppDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="mx-auto max-w-[1240px] px-7 pt-20 pb-10 md:pt-28 md:pb-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <h1
              className="font-display font-bold m-0 text-balance"
              style={{
                fontSize: "clamp(48px, 7.2vw, 100px)",
                lineHeight: 0.99,
                letterSpacing: "-0.045em",
              }}
            >
              Your app, built by{" "}
              <span style={{ color: "#2E6B47" }}>people who actually answer.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[680px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              We design, build, and launch your iPhone and Android app in 6 to
              10 weeks, for a price you know before we start. One team, start
              to finish.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <BookACall className="text-base px-[30px] py-4" source="mobile-app-hero">
                Book a call
              </BookACall>
              <ContactTrigger
                source="mobile-app-hero"
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
                  className="w-[260px] flex-none rounded-[20px] border border-[#DCE3DA] bg-white p-[26px]"
                >
                  <div
                    className="font-display text-[34px] font-bold leading-none text-[#2E6B47]"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {r.stat}
                  </div>
                  <div className="mt-3 text-[15px] font-medium text-[#13201A]">
                    {r.label}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WhyUs tabs */}
        <MobileWhyUs />

        {/* 4. Signature graphic — Platform Fan */}
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
                One app. Everywhere it needs to be.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                Your app on iPhone. Your app on Android. The dashboard you use
                to run it. The system that saves every order and account. All
                connected, all launched together, all included in one price.
              </p>
            </div>
            <PlatformFan />
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
            How we build your app
          </h2>
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {[
              {
                step: "01",
                title: "We talk, then we quote",
                body: "A 30-minute call to understand your idea and your business. You get a fixed price and a timeline in writing within 24 hours.",
              },
              {
                step: "02",
                title: "We show you the design",
                body: "In week one you see exactly what the app will look like, screen by screen. You give notes until it's right. Nothing is a surprise later.",
              },
              {
                step: "03",
                title: "We build it",
                body: "Every Friday you get a working version on your phone to try. You send feedback, we fix it, we keep shipping.",
              },
              {
                step: "04",
                title: "We launch and look after it",
                body: "We put it on the App Store and Google Play. For the first 30 days, anything that needs fixing is on us.",
              },
            ].map((s) => (
              <div key={s.title} className="border-t-[3px] border-[#2E6B47] pt-6">
                <div className="mb-3.5 font-display text-[26px] font-bold text-[#2E6B47]" style={{ letterSpacing: "-0.03em" }}>
                  {s.step}
                </div>
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
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(32px, 3.8vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              Fixed price. Fixed timeline. No surprises.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "Simple app",
                  w: "4 to 6 weeks",
                  p: "A focused app with a few main screens, user accounts, and one key feature. Great for proving out an idea.",
                },
                {
                  h: "Full app",
                  w: "6 to 10 weeks",
                  p: "The complete package: app, dashboard, payments, accounts. The version you take to market.",
                },
                {
                  h: "Big product",
                  w: "10 to 16 weeks",
                  p: "Everything above, plus deep features: offline mode, integrations with other systems, custom workflows.",
                },
              ].map((tier) => (
                <div key={tier.h} className="rounded-2xl border border-[#DCE3DA] bg-[#F5F6F0] p-6">
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
              Every build includes 30 days of free fixes after launch.{" "}
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
            <h2
              className="max-w-[640px] font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Questions people ask before hiring us.
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
        id="ld-service-mobile"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <Script
        id="ld-faq-mobile"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Script
        id="ld-breadcrumb-mobile"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
    </div>
  );
}
