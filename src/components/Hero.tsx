import { BookACall } from "./BookACall";
import { LaptopVisual } from "./LaptopVisual";
import { CONTACT_FORM_URL } from "@/lib/config";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1240px] px-7 pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="hero-grid">
        <div className="hero-text">
          <h1
            className="hero-heading font-display font-bold m-0 text-balance"
            style={{
              fontSize: "clamp(44px, 5.6vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
            }}
          >
            An investment into your own{" "}
            <span style={{ color: "#2E6B47" }}>business.</span>
          </h1>
          <p
            className="hero-sub mt-6 max-w-[540px] text-pretty text-[#4D5A51]"
            style={{
              fontSize: "clamp(16px, 1.25vw, 19px)",
              lineHeight: 1.55,
            }}
          >
            We make you go viral, retain sustainable cash flow, establish a
            digital presence, and implement efficient systems that reduce your
            headache.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap gap-3">
            <BookACall className="text-base px-[28px] py-[14px]">
              Book a call
            </BookACall>
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener"
              className="pill-outline inline-flex items-center justify-center rounded-full px-[28px] py-[14px] text-base font-semibold"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <LaptopVisual />
        </div>
      </div>
    </section>
  );
}
