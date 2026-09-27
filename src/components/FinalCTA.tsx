import { BookACall } from "./BookACall";
import { CONTACT_EMAIL } from "@/lib/config";

export function FinalCTA() {
  return (
    <section id="contact" className="px-7 pb-7 pt-6">
      <div
        data-reveal="0"
        className="relative mx-auto max-w-[1240px] overflow-hidden px-8 py-[110px] text-center text-[#F0F4EF]"
        style={{
          borderRadius: "32px",
          background:
            "radial-gradient(90% 120% at 50% 100%, #4A8A61 0%, #245638 45%, #123222 100%)",
        }}
      >
        <h2
          className="mx-auto mb-5 max-w-[820px] text-balance font-display font-bold"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.045em",
          }}
        >
          We do the tech stuff so you don&apos;t have to.
        </h2>
        <p className="m-0 mb-9 text-lg text-[#C9D6CD]">
          30 minutes with a senior engineer. Written follow-up within 24 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <BookACall
            variant="light"
            className="px-[34px] py-[17px] text-base font-bold"
          >
            Book a call
          </BookACall>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center rounded-full border border-white/35 px-[34px] py-[17px] text-base font-semibold text-[#F0F4EF] hover:border-[#F0F4EF] transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
