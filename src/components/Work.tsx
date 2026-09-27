import Image from "next/image";

const cards = [
  {
    tag: "CONTENT CREATION",
    title: "Over 8 Million Views On YouTube",
    body: "Content with brand promotions that goes viral and makes sales.",
    src: "/youtube-logo.png",
    alt: "YouTube",
    imgClass: "w-[150px] h-auto",
    delay: 0,
  },
  {
    tag: "APP DEVELOPMENT",
    title: "Audio Frequency Converter",
    body: "Tooling app built from scratch for a successful radio host and musician.",
    src: "/hertz-so-good.png",
    alt: "Hertz So Good Music Therapy",
    imgClass: "h-[190px] w-auto",
    imgStyle: { mixBlendMode: "multiply" as const },
    delay: 100,
  },
  {
    tag: "INTAKE.IQ",
    title: "Attorney Intake Platform",
    body: "Helped build a platform to streamline law firm client intake.",
    src: "/intake-iq.png",
    alt: "Intake.IQ",
    imgClass: "h-[96px] w-auto",
    delay: 200,
  },
];

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1240px] px-7 py-24">
      <h2
        data-reveal="0"
        className="mb-11 font-display font-bold"
        style={{
          fontSize: "clamp(34px, 4.2vw, 56px)",
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
        }}
      >
        Work we&apos;re proud of
      </h2>
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {cards.map((card) => (
          <article
            key={card.title}
            data-reveal={String(card.delay)}
            className="work-card overflow-hidden rounded-3xl border border-[#DCE3DA] bg-white"
          >
            <div className="flex h-[220px] items-center justify-center bg-[#EDF3EC]">
              <Image
                src={card.src}
                alt={card.alt}
                width={300}
                height={220}
                className={`block ${card.imgClass}`}
                style={card.imgStyle}
              />
            </div>
            <div className="p-[26px]">
              <div className="mb-2.5 font-mono text-xs text-[#2E6B47]">
                {card.tag}
              </div>
              <div
                className="mb-2 font-display text-2xl font-bold"
                style={{ letterSpacing: "-0.02em" }}
              >
                {card.title}
              </div>
              <div className="text-[15px] leading-[1.55] text-[#4D5A51]">
                {card.body}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
