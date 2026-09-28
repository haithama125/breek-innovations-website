import { BookACall } from "./BookACall";
import { LaptopVisual } from "./LaptopVisual";
import { CONTACT_FORM_URL } from "@/lib/config";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1240px] px-7 pt-14 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-[1000px] text-center">
        <h1
          className="hero-heading font-display font-bold m-0 text-balance"
          style={{
            fontSize: "clamp(52px, 8vw, 108px)",
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
          }}
        >
          An investment into your own{" "}
          <span style={{ color: "#2E6B47" }}>business.</span>
        </h1>
        <p
          className="hero-sub mx-auto mt-7 max-w-[640px] text-pretty text-black"
          style={{
            fontSize: "clamp(17px, 1.4vw, 20px)",
            lineHeight: 1.55,
          }}
        >
          We make you go viral, retain sustainable cash flow, establish a
          digital presence, and implement efficient systems that reduce your
          headache.
        </p>
        <div className="hero-cta mt-9 flex flex-wrap justify-center gap-3">
          <BookACall className="text-base px-[30px] py-4">
            Book a call
          </BookACall>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener"
            className="pill-outline inline-flex items-center justify-center rounded-full px-[30px] py-4 text-base font-semibold"
          >
            Get in touch
          </a>
        </div>
      </div>
      <div className="mt-14 md:mt-20">
        <LaptopVisual />
      </div>
    </section>
  );
}
