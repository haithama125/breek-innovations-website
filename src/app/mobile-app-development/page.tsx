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
const TITLE = "Freelance Mobile App Development";
const DESCRIPTION =
  "Hire a senior team for your iOS or Android app. Fixed scope, fixed price, shipped in 6 to 10 weeks. React Native, native Swift, native Kotlin, and full backend.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "freelance mobile app development",
    "hire mobile app developer",
    "custom mobile app development",
    "iOS app developer",
    "Android app developer",
    "React Native developer",
    "mobile app development agency alternative",
    "white label mobile app development",
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
  { stat: "6 wk", label: "MVP ship time", who: "Design to App Store" },
  { stat: "~40%", label: "Cost reduction", who: "Vs. two native builds" },
  { stat: "iOS + Android", label: "Both stores", who: "One build pipeline" },
  { stat: "100%", label: "Code ownership", who: "Your GitHub repo" },
  { stat: "30 days", label: "Free fixes post-launch", who: "Baked in" },
  { stat: "$0", label: "License fees", who: "No lock-in ever" },
  { stat: "<24h", label: "Quote turnaround", who: "After scoping call" },
  { stat: "4.8★", label: "Average store rating", who: "Latest launched builds" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Native (Swift/Kotlin) or React Native?",
    a: "Default is React Native with Expo. One codebase ships to both App Store and Play Store, which cuts cost and timeline by roughly 40 percent without sacrificing performance for the vast majority of apps. We go native (Swift/SwiftUI, Kotlin) when the app needs deep OS integration, heavy custom animation, or specific hardware APIs. We decide together in the first call.",
  },
  {
    q: "What does it cost and how long does it take?",
    a: "A typical MVP ships in 6 to 10 weeks starting from the Custom Mobile Apps tier on our pricing page. A thin v1 (3 to 5 core screens, auth, one integration) is on the lower end. A production app with payments, real-time, offline support, and a backend is on the higher end. You get a fixed-price quote before any code is written.",
  },
  {
    q: "Do you handle the backend too?",
    a: "Yes. We build the mobile app, the API, the database, auth, payments, and the admin dashboard. Default stack is Supabase or Firebase for speed, with a custom Node or Python backend when the app needs it. You end up with one team, one invoice, and one point of contact.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Source goes into a GitHub repo you own from day one. We never retain IP, you never pay a license fee, and nothing we build locks you into us. If you ever want to hand it off to an in-house team, it comes with a readme and an onboarding call.",
  },
  {
    q: "Do you submit to the App Store and Play Store?",
    a: "Yes. We handle provisioning, certificates, App Store Connect setup, Play Console setup, screenshots, review submission, and the back-and-forth with Apple's review team. Your developer accounts stay in your name — we're just an admin on them.",
  },
  {
    q: "What happens after launch?",
    a: "Every build includes 30 days of post-launch fixes at no cost. After that, you can keep us on a lightweight monthly retainer for new features, OS updates (iOS and Android both have breaking releases yearly), and store resubmissions, or pay hourly when something comes up.",
  },
];

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Freelance mobile app development",
  description: DESCRIPTION,
  provider: { "@type": "Organization", name: "Breek Innovations", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "iOS and Android mobile application development",
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
    { "@type": "ListItem", position: 2, name: "Mobile app development", item: PAGE_URL },
  ],
};

export default function MobileAppDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="mx-auto max-w-[1240px] px-7 pt-14 pb-10 md:pt-24 md:pb-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#2E6B47]">
              Freelance mobile app development
            </p>
            <h1
              className="mt-5 font-display font-bold m-0 text-balance"
              style={{
                fontSize: "clamp(48px, 7.2vw, 100px)",
                lineHeight: 0.99,
                letterSpacing: "-0.045em",
              }}
            >
              Ship your mobile app without the{" "}
              <span style={{ color: "#2E6B47" }}>agency markup.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[680px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              A senior team taking your idea from Figma to App Store in 6 to 10
              weeks. Fixed scope, fixed price, source in a repo you own on day
              one.
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
            What you get when we build your app
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
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9FD0AE]">
                One codebase, four outputs
              </p>
              <h2
                className="m-0 mt-4 font-display font-bold"
                style={{
                  fontSize: "clamp(34px, 4.2vw, 56px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                }}
              >
                Every build ships the whole stack.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                One repo. One build command. iOS and Android launch together,
                the backend and admin console land in the same release, and
                every new feature ships to all four at once.
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
            How we ship your app
          </h2>
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {[
              {
                label: "01 · 30 MIN",
                title: "Scoping call",
                body: "You describe the app, we ask the ten questions that determine real scope, and you get a fixed quote in 24 hours.",
              },
              {
                label: "02 · WEEK 1",
                title: "Design + architecture",
                body: "If you have Figma, we validate against platform patterns. If not, we design in a week. Backend schema and API contract signed before any code.",
              },
              {
                label: "03 · WEEKS 2–8",
                title: "Build sprints",
                body: "TestFlight / Play Internal build every Friday. In-app Shake-to-report feedback. No status meetings unless you want them.",
              },
              {
                label: "04 · LAUNCH",
                title: "Submit + 30 days",
                body: "We submit to both stores, handle review feedback, and fix any issue in the first 30 days at no cost. Then: done, or retainer.",
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
                  h: "Thin v1",
                  sub: "From our Custom Mobile Apps tier",
                  w: "4 to 6 weeks",
                  p: "3 to 5 core screens, auth, one key integration, shipped to both stores. Proof-of-concept scope.",
                },
                {
                  h: "Production MVP",
                  sub: "Most common",
                  w: "6 to 10 weeks",
                  p: "App + backend + admin dashboard + payments. The version you take to market.",
                },
                {
                  h: "Full product",
                  sub: "App + backend + growth",
                  w: "10 to 16 weeks",
                  p: "MVP plus real-time, offline sync, deep integrations, and in-store analytics. Investor-ready.",
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
              What people ask before hiring us for a mobile build.
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
