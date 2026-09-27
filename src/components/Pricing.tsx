import { BookACall } from "./BookACall";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-t border-[#E6EBE4] bg-white"
    >
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
          {/* Websites */}
          <article
            data-reveal="0"
            className="flex min-w-0 flex-col rounded-3xl border border-[#DCE3DA] px-6 py-7"
          >
            <div className="text-[17px] font-semibold">Websites</div>
            <div
              className="font-display font-bold"
              style={{
                fontSize: "clamp(36px, 3.6vw, 48px)",
                letterSpacing: "-0.04em",
                margin: "16px 0 6px",
                lineHeight: 1.05,
              }}
            >
              $500<span className="text-[18px] text-[#6B776F]">+</span>
            </div>
            <div className="mb-6 text-sm text-[#6B776F]">Starting from</div>
            <div className="flex-1 text-[15px] leading-[1.55] text-[#4D5A51]">
              New sites, redesigns, and relaunches. Whether you have one yet or
              not, we can help.
            </div>
            <BookACall
              variant="primary"
              className="mt-7 justify-center px-4 py-3.5 text-base"
            >
              Book a call
            </BookACall>
          </article>

          {/* Custom Mobile Apps — highlighted */}
          <article
            data-reveal="100"
            className="flex min-w-0 flex-col rounded-3xl bg-[#123222] px-6 py-7 text-[#F0F4EF]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[17px] font-semibold">
                Custom Mobile Apps
              </span>
              <span className="whitespace-nowrap rounded-full bg-[#9FD0AE] px-2.5 py-[5px] text-xs font-bold text-[#123222]">
                Most popular
              </span>
            </div>
            <div
              className="font-display font-bold"
              style={{
                fontSize: "clamp(36px, 3.6vw, 48px)",
                letterSpacing: "-0.04em",
                margin: "16px 0 6px",
                lineHeight: 1.05,
              }}
            >
              $1,000
              <span className="text-[18px] text-[#9FB8A7]">+</span>
            </div>
            <div className="mb-6 text-sm text-[#9FB8A7]">Starting from</div>
            <div className="flex-1 text-[15px] leading-[1.55] text-[#C9D6CD]">
              iOS and Android apps built from scratch and shipped to the stores.
            </div>
            <BookACall
              variant="light"
              className="mt-7 justify-center px-4 py-3.5 text-base font-bold"
            >
              Book a call
            </BookACall>
          </article>

          {/* Social media management */}
          <article
            data-reveal="200"
            className="flex min-w-0 flex-col rounded-3xl border border-[#DCE3DA] px-6 py-7"
          >
            <div className="text-[17px] font-semibold">
              Social Media Management
            </div>
            <div
              className="font-display font-bold"
              style={{
                fontSize: "clamp(26px, 2.6vw, 34px)",
                letterSpacing: "-0.03em",
                margin: "16px 0 6px",
                lineHeight: 1.4,
              }}
            >
              Commission
            </div>
            <div className="mb-6 text-sm text-[#6B776F]">
              Pay for what you use
            </div>
            <div className="flex-1 text-[15px] leading-[1.55] text-[#4D5A51]">
              Content, posting, and campaigns across your platforms. We earn
              when you do.
            </div>
            <BookACall
              variant="primary"
              className="mt-7 justify-center px-4 py-3.5 text-base"
            >
              Book a call
            </BookACall>
          </article>

          {/* Mastermind Consulting */}
          <article
            data-reveal="300"
            className="flex min-w-0 flex-col rounded-3xl border border-[#DCE3DA] px-6 py-7"
          >
            <div className="text-[17px] font-semibold">
              Mastermind Consulting
            </div>
            <div
              className="font-display font-bold"
              style={{
                fontSize: "clamp(26px, 2.6vw, 34px)",
                letterSpacing: "-0.03em",
                margin: "16px 0 6px",
                lineHeight: 1.4,
              }}
            >
              Let&apos;s talk
            </div>
            <div className="mb-6 text-sm text-[#6B776F]">Reach out to us</div>
            <div className="flex-1 text-[15px] leading-[1.55] text-[#4D5A51]">
              A tech expert evaluates your business&apos;s digital presence,
              then recommends and executes on actions that make your life
              easier.
            </div>
            <BookACall
              variant="primary"
              className="mt-7 justify-center px-4 py-3.5 text-base"
            >
              Reach out to us
            </BookACall>
          </article>
        </div>
      </div>
    </section>
  );
}
