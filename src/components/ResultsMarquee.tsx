const results = [
  { stat: "8M+", label: "Views on YouTube", who: "Content creation client" },
  { stat: "+250%", label: "Sales in 90 days", who: "Growth campaign" },
  { stat: "3×", label: "Return on spend", who: "Yousef Ahmad · Intake.IQ" },
  { stat: "+175%", label: "Sales growth", who: "Zack Hakim · Bluum Media" },
  { stat: "+312%", label: "Campaign reach", who: "Advertising strategy" },
  { stat: "$50k+", label: "Generated per client", who: "Custom product builds" },
  { stat: "100%", label: "On-time delivery", who: "Every project to date" },
  { stat: "<24h", label: "Response time", who: "Dedicated contact" },
];

export function ResultsMarquee() {
  const doubled = [...results, ...results];
  return (
    <section className="pb-10 pt-10 md:pt-14">
      <h2
        data-reveal="0"
        className="mx-7 mb-11 text-center font-display font-bold"
        style={{
          fontSize: "clamp(32px, 4vw, 52px)",
          letterSpacing: "-0.035em",
        }}
      >
        Results our clients actually got
      </h2>
      <div
        className="marquee-viewport overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max gap-4">
          {doubled.map((r, i) => (
            <article
              key={i}
              className="w-[270px] flex-none rounded-[20px] border border-[#DCE3DA] bg-white p-[26px]"
            >
              <div
                className="font-display text-[44px] font-bold leading-none text-[#2E6B47]"
                style={{ letterSpacing: "-0.04em" }}
              >
                {r.stat}
              </div>
              <div className="mt-2.5 text-[15px] font-medium">{r.label}</div>
              <div className="mt-[22px] border-t border-[#EDF1EC] pt-4 text-[13px] text-[#6B776F]">
                {r.who}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
