import type { ReactNode } from "react";
import { BookACall } from "./BookACall";

type CardTone = "light" | "dark";

type PriceCardProps = {
  title: ReactNode;
  price: ReactNode;
  priceSize: "big" | "small";
  subLabel: string;
  desc: string;
  cta: string;
  tone?: CardTone;
  badge?: string;
  revealDelay: number;
  ctaVariant?: "primary" | "light";
};

const BADGE_SLOT_H = "22px";
const TITLE_MIN_H = "3em";
const PRICE_SLOT_H = "clamp(44px, 4.4vw, 56px)";

function PriceCard({
  title,
  price,
  priceSize,
  subLabel,
  desc,
  cta,
  tone = "light",
  badge,
  revealDelay,
  ctaVariant = "primary",
}: PriceCardProps) {
  const isDark = tone === "dark";
  const containerBase = "flex min-w-0 flex-col rounded-3xl px-6 py-7";
  const containerSkin = isDark
    ? "bg-[#123222] text-[#F0F4EF]"
    : "border border-[#DCE3DA]";
  const subColor = isDark ? "text-[#9FB8A7]" : "text-[#6B776F]";
  const descColor = isDark ? "text-[#C9D6CD]" : "text-[#4D5A51]";
  const plusColor = isDark ? "text-[#9FB8A7]" : "text-[#6B776F]";

  const priceFont =
    priceSize === "big"
      ? "clamp(36px, 3.6vw, 48px)"
      : "clamp(26px, 2.6vw, 34px)";
  const priceTracking = priceSize === "big" ? "-0.04em" : "-0.03em";

  return (
    <article
      data-reveal={String(revealDelay)}
      className={`${containerBase} ${containerSkin}`}
    >
      <div className="flex items-center" style={{ height: BADGE_SLOT_H }}>
        {badge && (
          <span className="whitespace-nowrap rounded-full bg-[#9FD0AE] px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-wider text-[#123222]">
            {badge}
          </span>
        )}
      </div>
      <div
        className="mt-2 text-[17px] font-semibold leading-tight"
        style={{ minHeight: TITLE_MIN_H }}
      >
        {title}
      </div>
      <div
        className="mt-4 flex items-end font-display font-bold"
        style={{
          fontSize: priceFont,
          letterSpacing: priceTracking,
          lineHeight: 1,
          height: PRICE_SLOT_H,
        }}
      >
        {typeof price === "string" && /^\$/.test(price) ? (
          <span>
            {price}
            <span className={`text-[18px] ${plusColor}`}>+</span>
          </span>
        ) : (
          <span>{price}</span>
        )}
      </div>
      <div className={`mt-1.5 mb-6 text-sm ${subColor}`}>{subLabel}</div>
      <div className={`flex-1 text-[15px] leading-[1.55] ${descColor}`}>
        {desc}
      </div>
      <BookACall
        variant={ctaVariant}
        className={`mt-7 justify-center px-4 py-3.5 text-base ${
          ctaVariant === "light" ? "font-bold" : ""
        }`}
      >
        {cta}
      </BookACall>
    </article>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-[#E6EBE4] bg-white">
      <div className="mx-auto max-w-[1240px] px-7 py-24">
        <div data-reveal="0" className="mb-12 text-center">
          <h2
            className="mb-3.5 font-display font-bold"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Simple pricing
          </h2>
          <p className="m-0 text-[17px] text-[#4D5A51]">
            Quality tech at prices you can afford.
          </p>
        </div>
        <div
          className="grid items-stretch gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          }}
        >
          <PriceCard
            revealDelay={0}
            title="Websites"
            price="$500"
            priceSize="big"
            subLabel="Starting from"
            desc="New sites, redesigns, and relaunches. Whether you have one yet or not, we can help."
            cta="Book a call"
          />
          <PriceCard
            revealDelay={100}
            title="Custom Mobile Apps"
            badge="Most popular"
            price="$1,000"
            priceSize="big"
            subLabel="Starting from"
            desc="iOS and Android apps built from scratch and shipped to the stores."
            cta="Book a call"
            tone="dark"
            ctaVariant="light"
          />
          <PriceCard
            revealDelay={200}
            title="Social Media Management"
            price="Commission"
            priceSize="small"
            subLabel="Pay for what you use"
            desc="Content, posting, and campaigns across your platforms. We earn when you do."
            cta="Book a call"
          />
          <PriceCard
            revealDelay={300}
            title="Generative Engine Optimization"
            price="$1,000"
            priceSize="big"
            subLabel="Starting from"
            desc="Get recommended when customers ask ChatGPT, Perplexity, Gemini, and Google AI Overviews for options in your space."
            cta="Book a call"
          />
          <PriceCard
            revealDelay={400}
            title="Mastermind Consulting"
            price="Let’s talk"
            priceSize="small"
            subLabel="Reach out to us"
            desc="A tech expert evaluates your business’s digital presence, then recommends and executes on actions that make your life easier."
            cta="Reach out to us"
          />
        </div>
      </div>
    </section>
  );
}
