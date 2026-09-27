"use client";

import { useEffect, useRef, useState } from "react";

const quotes = [
  {
    quote:
      "They shipped exactly what was scoped, on the date on the contract. Made me back triple what I spent.",
    name: "Yousef Ahmad",
    role: "VP Engineering · Intake.IQ",
    stat: "3×",
    statLabel: "return on spend",
    delay: 0,
  },
  {
    quote:
      "They were easy to work with and improved sales by 175% for my media company.",
    name: "Zack Hakim",
    role: "CEO · Bluum Media",
    stat: "+175%",
    statLabel: "sales growth",
    delay: 120,
  },
];

export function Testimonials() {
  const [p, setP] = useState(0);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return;
    }
    const el = statsRef.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - t0) / 1600);
          setP(1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const s0 = `${Math.round(7 * p)}M+`;
  const s1 = `${Math.round(100 * p)}%`;
  const s2 = `$${Math.round(50 * p)}k+`;

  return (
    <section className="bg-[#123222] text-[#F0F4EF]">
      <div className="mx-auto max-w-[1240px] px-7 py-24">
        <h2
          data-reveal="0"
          className="mb-11 font-display font-bold"
          style={{
            fontSize: "clamp(34px, 4.2vw, 56px)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
          }}
        >
          Don&apos;t take our word for it
        </h2>
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {quotes.map((q) => (
            <div
              key={q.name}
              data-reveal={String(q.delay)}
              className="flex flex-col justify-between gap-10 rounded-3xl bg-[#1A402C] p-10"
            >
              <p
                className="m-0 font-display font-medium text-pretty"
                style={{
                  fontSize: "clamp(24px, 2.4vw, 32px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                }}
              >
                “{q.quote}”
              </p>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-base font-semibold">{q.name}</div>
                  <div className="text-sm text-[#9FB8A7]">{q.role}</div>
                </div>
                <div className="text-right">
                  <div
                    className="font-display text-[40px] font-bold leading-none text-[#9FD0AE]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {q.stat}
                  </div>
                  <div className="text-[13px] text-[#9FB8A7]">
                    {q.statLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className="mt-14 grid gap-5 border-t border-[#2A5039] pt-11"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {[
            { value: s0, label: "Views across platforms" },
            { value: s1, label: "On-time delivery" },
            { value: s2, label: "Generated for individual clients" },
            { value: "1", label: "Point of contact for you" },
          ].map((c, i) => (
            <div key={i}>
              <div
                className="font-display text-[52px] font-bold text-[#F0F4EF]"
                style={{ letterSpacing: "-0.04em" }}
              >
                {c.value}
              </div>
              <div className="text-sm text-[#9FB8A7]">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
