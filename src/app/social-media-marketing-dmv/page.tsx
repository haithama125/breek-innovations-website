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
const TITLE = "Social Media for DMV Small Businesses";
const DESCRIPTION =
  "We come to your spot, make the videos, post every day, reply to your customers, and run small local ads. You only pay when new people walk in.";

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
  { stat: "More walk-ins", label: "From the first 90 days" },
  { stat: "No monthly fee", label: "You pay when it works" },
  { stat: "We come to you", label: "On-site shoot every month" },
  { stat: "Daily posts", label: "Instagram, TikTok, Facebook" },
  { stat: "Every DM", label: "Answered in your voice" },
  { stat: "Every review", label: "Replied to on Google & Yelp" },
  { stat: "DC · MD · VA", label: "We're local" },
  { stat: "No contract", label: "Cancel anytime" },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "How does \"pay when it works\" actually work?",
    a: "On our first call we agree on what counts as a win — new reservations, bookings through a tracked link, redemptions at the counter — and we take a small percentage of that number. If no new customers show up, you don't owe us anything. No monthly retainer, no contract.",
  },
  {
    q: "Do you only work with businesses in the DMV?",
    a: "We're based in the DMV and that's where we do our best work. We can show up in person in DC, Arlington, Alexandria, Bethesda, Silver Spring, Fairfax, Loudoun, and around the beltway for shoots and meetings. We take clients outside the region too, but we won't be at your door for the shoot.",
  },
  {
    q: "I've tried Instagram ads before and nothing happened. Why would this be different?",
    a: "Ads only work if the videos are worth watching. Most of what gets watched today is short videos shot at the actual place, not polished ads. We come to your spot, shoot real content, post every day, and only spend ad money on the pieces that are already working. And we point the ads at people who live within a few miles of your door.",
  },
  {
    q: "Where will you post for me?",
    a: "Instagram, TikTok, Facebook, your Google Business Profile, Yelp, and Nextdoor. These are the platforms that actually bring foot traffic to a local business. We skip the ones that don't (LinkedIn, X, Threads) unless you have a specific reason to be there.",
  },
  {
    q: "Will you reply to messages and reviews for us?",
    a: "Yes. We answer DMs, comments, and reviews on Google and Yelp during business hours, in your voice. Anything that needs the owner, we flag. Replying to reviews on Google alone can move you up in \"near me\" search results within a couple months.",
  },
  {
    q: "How long until we see results?",
    a: "You'll see more followers and reach in the first few weeks. Actual new customers walking in usually starts in weeks 6 to 10, once we have a library of content and the ads are tuned. Google ranking and review scores typically improve in 2 to 3 months.",
  },
  {
    q: "What kinds of businesses do you take?",
    a: "Restaurants, bars, cafes, salons, barbers, gyms and studios, med spas, dental practices, boutiques, and local service businesses with a real storefront. We don't take online-only brands — our model only works when we can tie our work to people showing up in person.",
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
    { "@type": "ListItem", position: 2, name: "Social media (DMV)", item: PAGE_URL },
  ],
};

export default function SocialMediaMarketingDmvPage() {
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
              Social media that fills your{" "}
              <span style={{ color: "#2E6B47" }}>tables.</span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-[680px] text-pretty text-black"
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.55 }}
            >
              We come to your spot, make the videos, post every day, and reply
              to your customers. You only pay us when new people walk in.
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
            What you actually get
          </h2>
          <div
            className="overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="flex w-max gap-4" style={{ animation: "marquee 45s linear infinite" }}>
              {[...STATS, ...STATS].map((r, i) => (
                <article
                  key={i}
                  className="w-[270px] flex-none rounded-[20px] border border-[#DCE3DA] bg-white p-[26px]"
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
              <h2
                className="m-0 font-display font-bold"
                style={{
                  fontSize: "clamp(34px, 4.2vw, 56px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                }}
              >
                Every post reaches people near you.
              </h2>
              <p className="m-0 mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-[#C9D6CD]">
                A video shot at your counter. A Google post that shows up when
                someone searches nearby. A Yelp reply that moves you up a slot.
                All the same reach, pointed at the people who can actually
                walk in.
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
                step: "01",
                title: "We talk",
                body: "A 30-minute call to understand your business and agree on what counts as a win — new reservations, bookings, people showing up.",
              },
              {
                step: "02",
                title: "We come to your spot",
                body: "Our videographer shows up for a one-day shoot. That one day gives us 3 to 4 weeks of videos and photos.",
              },
              {
                step: "03",
                title: "We post, reply, advertise",
                body: "Every day we post something new. We reply to every DM and review. Small local ads on the posts people are already loving.",
              },
              {
                step: "04",
                title: "You pay for results",
                body: "Each month, one simple bill: here's the new business we drove, here's your small cut to us. No new customers? No bill.",
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
              You only pay when we move the needle.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  h: "First call",
                  w: "Free, 30 minutes",
                  p: "We look at your current numbers and agree on what counts as a new customer. If we can't tie our work to results, we'll tell you honestly.",
                },
                {
                  h: "First 90 days",
                  w: "Very small cut",
                  p: "We shoot the content, build your library, start posting and running ads. You pay a tiny cut while things ramp up.",
                },
                {
                  h: "After that",
                  w: "Normal cut",
                  p: "One simple monthly bill showing the new business we drove and your cut. Cancel anytime. No contract.",
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
              Ad spend (what Instagram or TikTok charge) is separate and billed at cost — no markup.{" "}
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
              Questions local owners ask us.
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
