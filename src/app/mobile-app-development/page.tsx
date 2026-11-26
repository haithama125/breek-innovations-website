import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCTA } from "@/components/FinalCTA";
import { BookACall } from "@/components/BookACall";

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
  provider: {
    "@type": "Organization",
    name: "Breek Innovations",
    url: SITE_URL,
  },
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Mobile app development",
      item: PAGE_URL,
    },
  ],
};

export default function MobileAppDevelopmentPage() {
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
              Freelance mobile app development
            </p>
            <h1
              className="mt-5 max-w-[920px] font-display font-bold"
              style={{
                fontSize: "clamp(38px, 5.2vw, 68px)",
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
              }}
            >
              Ship your mobile app without the agency markup or the freelancer flakiness.
            </h1>
            <p className="mt-6 max-w-[640px] text-[17px] leading-[1.6] text-[#C9D6CD]">
              A senior team you can actually reach, taking your idea from
              Figma to App Store in 6 to 10 weeks. Fixed scope, fixed
              price, source in a repo you own on day one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookACall className="text-base px-7 py-4" source="mobile-app-hero">
                Book a 30-min call
              </BookACall>
              <a
                href="#what-we-build"
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-4 text-[15px] font-semibold text-[#F0F4EF] transition-colors hover:border-[#F0F4EF]"
              >
                See how we work
              </a>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-[#F5F6F0] py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              Who this is for
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Three kinds of people hire us for mobile work.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "Founders with an MVP to ship",
                  p: "You have Figma, a target audience, and 10 to 16 weeks of runway to prove the concept. You want senior engineers on the keyboard, not a project manager relaying requests.",
                },
                {
                  h: "SMBs who need an internal tool",
                  p: "Field techs, drivers, inspectors, or staff who need an iPad or phone app that talks to your backend. Usually tied to a scheduling, CRM, or inventory system you already run.",
                },
                {
                  h: "Agencies subcontracting",
                  p: "You landed a mobile scope and need senior builders under your brand. We ship white-label, show up on your client calls as your team, and never market to them.",
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
              Full-stack mobile, not just the front door.
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  h: "iOS + Android in one codebase",
                  p: "React Native + Expo by default. Both stores ship from one build. Native Swift or Kotlin modules when a specific feature needs them.",
                },
                {
                  h: "Backend, API, and database",
                  p: "Supabase, Firebase, or a custom Node/Python API. Auth, roles, file storage, real-time sync, cron jobs, webhooks — all in scope.",
                },
                {
                  h: "Payments and subscriptions",
                  p: "Stripe or RevenueCat for in-app purchases, auto-renewing subscriptions, trial logic, refunds, and store-compliant receipts.",
                },
                {
                  h: "Push, deep links, and offline",
                  p: "APNs and FCM wired through Expo. Universal links / App Links for deep routing. Local caching and queued writes for offline-first flows.",
                },
                {
                  h: "Admin dashboard",
                  p: "A web admin so your team can manage users, send pushes, see usage, and pull CSVs without ever touching the database.",
                },
                {
                  h: "Store submission + release pipeline",
                  p: "Provisioning, certificates, screenshots, App Store Connect, Play Console, review submission, and CI for over-the-air updates.",
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

        {/* Stack */}
        <section className="bg-[#F5F6F0] py-20">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              The stack
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              Boring, modern, maintainable.
            </h2>
            <p className="mt-5 max-w-[640px] text-[15.5px] leading-[1.65] text-[#4D5A51]">
              We pick tools that another senior engineer can pick up in a day,
              not whatever is trending this week. You can hire anyone in the
              world to maintain what we ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5 text-[13.5px] text-[#13201A]">
              {[
                "React Native",
                "Expo",
                "TypeScript",
                "Swift / SwiftUI",
                "Kotlin",
                "Supabase",
                "Firebase",
                "PostgreSQL",
                "Node.js",
                "Stripe",
                "RevenueCat",
                "Sentry",
                "GitHub Actions",
                "Fastlane",
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

        {/* Process */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-[920px] px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4C8A62]">
              How we work
            </p>
            <h2
              className="mt-4 font-display font-bold"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              Four stages, no surprises.
            </h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                {
                  n: "01",
                  h: "Scoping call (free, 30 min)",
                  p: "You describe the app, we ask the ten questions that actually determine scope, and we send a fixed-price quote in 24 hours.",
                },
                {
                  n: "02",
                  h: "Design + architecture (week 1)",
                  p: "If you have Figma, we validate it against platform patterns. If not, we design screens in a week. Backend schema and API contract agreed before code.",
                },
                {
                  n: "03",
                  h: "Build sprints (weeks 2 to 8)",
                  p: "You get a TestFlight / Play Internal build every Friday. You give feedback in-app via Shake-to-report. No status meetings unless you want them.",
                },
                {
                  n: "04",
                  h: "Launch + 30 days",
                  p: "We submit to both stores, handle review feedback, and fix any issue that surfaces in the first 30 days at no cost. Then either we're done, or we move to a retainer.",
                },
              ].map((step) => (
                <li
                  key={step.n}
                  className="rounded-2xl border border-[#DCE3DA] bg-[#F5F6F0] p-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#4C8A62]">
                    {step.n}
                  </div>
                  <h3 className="m-0 mt-2 font-display text-[18px] font-bold tracking-[-0.015em] text-[#13201A]">
                    {step.h}
                  </h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.6] text-[#4D5A51]">
                    {step.p}
                  </p>
                </li>
              ))}
            </ol>
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
              What people ask before hiring us for a mobile build.
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
