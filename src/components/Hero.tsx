import { BookACall } from "./BookACall";
import { HeroVisual } from "./HeroVisual";
import { CONTACT_FORM_URL } from "@/lib/config";

const HEADLINE_WORDS: { text: string; accent?: boolean }[] = [
  { text: "An" },
  { text: "investment" },
  { text: "into" },
  { text: "your" },
  { text: "own" },
  { text: "business.", accent: true },
];

export function Hero() {
  return (
    <section className="px-7 pt-[88px] text-center">
      <h1
        className="mx-auto max-w-[1000px] text-balance font-display font-bold"
        style={{
          fontSize: "clamp(46px, 7.4vw, 100px)",
          lineHeight: 0.98,
          letterSpacing: "-0.045em",
        }}
      >
        {HEADLINE_WORDS.map((word, i) => (
          <span key={i}>
            <span className="hero-word">
              <span
                style={{
                  animationDelay: `${100 + i * 90}ms`,
                  color: word.accent ? "#2E6B47" : undefined,
                }}
              >
                {word.text}
              </span>
            </span>
            {i < HEADLINE_WORDS.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      <p
        className="mx-auto mt-7 max-w-[640px] text-pretty text-[#4D5A51]"
        style={{
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.55,
          animation: "fadeUp 0.8s ease 0.65s both",
        }}
      >
        We make you go viral, retain sustainable cash flow, establish a digital
        presence, and implement efficient systems that reduce your headache.
      </p>
      <div
        className="mt-9 flex flex-wrap justify-center gap-3"
        style={{ animation: "fadeUp 0.8s ease 0.8s both" }}
      >
        <BookACall className="text-base px-[30px] py-4">Book a call</BookACall>
        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener"
          className="pill-outline inline-flex items-center justify-center rounded-full text-base font-semibold px-[30px] py-4"
        >
          Get in touch
        </a>
      </div>

      <HeroVisual />
    </section>
  );
}
