const steps = [
  {
    label: "01 · WEEK 1–2",
    title: "You meet with us",
    body: "You tell us about your business needs.",
    delay: 0,
  },
  {
    label: "02 · WEEK 2–4",
    title: "We give you a plan",
    body: "Based on your specific business objectives, we come up with a plan.",
    delay: 100,
  },
  {
    label: "03 · WEEK 4–12",
    title: "We build",
    body: "Our dedicated engineers and business specialists work with you to deliver.",
    delay: 200,
  },
  {
    label: "04 · ONGOING",
    title: "We iterate",
    body: "If you like it, a dedicated team member keeps it running for you.",
    delay: 300,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1240px] px-7 py-24">
      <h2
        data-reveal="0"
        className="mb-12 font-display font-bold"
        style={{
          fontSize: "clamp(34px, 4.2vw, 56px)",
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
        }}
      >
        How it works
      </h2>
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.title}
            data-reveal={String(s.delay)}
            className="border-t-[3px] border-[#2E6B47] pt-6"
          >
            <div className="mb-3.5 font-mono text-xs text-[#2E6B47]">
              {s.label}
            </div>
            <div
              className="mb-2.5 font-display text-2xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              {s.title}
            </div>
            <div className="text-[15px] leading-[1.55] text-[#4D5A51]">
              {s.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
