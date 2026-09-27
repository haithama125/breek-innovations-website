const rows = [
  {
    name: "Websites",
    desc: "Whether you have one yet or not, we can help with new builds, redesigns, and relaunches",
    duration: "4–10 weeks",
    delay: 0,
  },
  {
    name: "Mobile App Builds",
    desc: "iOS and Android apps built from scratch and shipped to the stores",
    duration: "6–12 weeks",
    delay: 60,
  },
  {
    name: "Social Media Marketing",
    desc: "Content, posting, ads, and growth handled across your platforms",
    duration: "Ongoing",
    delay: 120,
  },
  {
    name: "Mastermind Consulting",
    desc: "We evaluate your digital presence, cut out waste, map your best next steps, and automate processes with AI",
    duration: "2–4 weeks",
    delay: 180,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="border-b border-t border-[#E6EBE4] bg-white"
    >
      <div className="mx-auto max-w-[1240px] px-7 py-24">
        <div
          data-reveal="0"
          className="mb-11 flex flex-wrap items-end justify-between gap-6"
        >
          <h2
            className="m-0 max-w-[620px] font-display font-bold"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Everything tech, handled by one team.
          </h2>
          <p className="m-0 max-w-[360px] text-base leading-[1.55] text-[#4D5A51]">
            One point of contact. No juggling freelancers. You tell us the goal,
            we handle the rest.
          </p>
        </div>
        <div className="border-t border-[#DCE3DA]">
          {rows.map((r) => (
            <div
              key={r.name}
              data-reveal={String(r.delay)}
              className="services-row grid items-center gap-6 rounded-xl border-b border-[#DCE3DA] px-3 py-[26px]"
              style={{
                gridTemplateColumns:
                  "minmax(0,1fr) minmax(0,1.3fr) 130px 40px",
              }}
            >
              <span
                className="font-display text-2xl font-semibold"
                style={{ letterSpacing: "-0.02em" }}
              >
                {r.name}
              </span>
              <span className="text-[15px] text-[#4D5A51]">{r.desc}</span>
              <span className="text-sm text-[#6B776F]">{r.duration}</span>
              <span className="text-xl text-[#2E6B47]">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
