"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  tag: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "Show up in every AI answer",
    tag: "COVERAGE",
    desc: "When someone asks ChatGPT, Perplexity, Google AI, Claude, or Gemini what the best option is in your category, your business gets named. We work on each one, not just Google.",
  },
  {
    label: "Fix what the AI already thinks",
    tag: "SOURCE DATA",
    desc: "AI engines pull from a handful of sources (your site, Google, Yelp, press, directories). If any one of them is wrong or empty, you get skipped. We clean up every source, so the answer is yours.",
  },
  {
    label: "Own the questions people ask",
    tag: "CONTENT",
    desc: "The AI answer is a stitched-together paragraph. We write the pages that get stitched: FAQs, comparisons, and real guides that read like the answer somebody actually wants.",
  },
  {
    label: "See where you stand each month",
    tag: "TRACKING",
    desc: "We check the same 30-40 real customer questions in every major AI engine, every month, and send you a short report: here's where you got named, here's where your competitor did, here's what we fixed.",
  },
];

const TAB_SECONDS = 5;

export function GeoWhyUs() {
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTab((t) => (t + 1) % TABS.length), TAB_SECONDS * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auto, tab]);

  return (
    <section className="mx-auto max-w-[1240px] px-7 py-24">
      <div
        className="grid items-center gap-16"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}
      >
        <div>
          <div
            className="mb-[18px] font-mono text-[13px] text-[#2E6B47]"
            style={{ letterSpacing: "0.06em" }}
          >
            WHY OWNERS HIRE US FOR GEO
          </div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            Be the answer, not the 9th blue link.
          </h2>
          {TABS.map((t, i) => {
            const active = i === tab;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setTab(i)}
                className="w-full cursor-pointer border-t border-[#DCE3DA] pt-[22px] text-left transition-opacity duration-300"
                style={{ opacity: active ? 1 : 0.38 }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[26px] font-bold" style={{ letterSpacing: "-0.03em" }}>
                    {t.label}
                  </span>
                  <span className="font-mono text-[12px] text-[#2E6B47]">{t.tag}</span>
                </div>
                {active ? (
                  <p
                    className="m-0 mt-2.5 max-w-[460px] text-[16px] leading-[1.55] text-[#4D5A51]"
                    style={{ animation: "fadeUp 0.5s ease both" }}
                  >
                    {t.desc}
                  </p>
                ) : null}
                <div className="mt-[22px] h-0.5 overflow-hidden bg-transparent">
                  {active ? (
                    <div
                      key={`${tab}-${auto}`}
                      className="h-full bg-[#2E6B47]"
                      style={{
                        transformOrigin: "left",
                        animation: auto ? `tabProgress ${TAB_SECONDS}s linear both` : "none",
                      }}
                    />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
        <div
          className="relative flex min-h-[520px] items-center justify-center overflow-hidden p-11"
          style={{
            borderRadius: "28px",
            background: "radial-gradient(110% 100% at 100% 0%, #4A8A61 0%, #245638 50%, #123222 100%)",
          }}
        >
          {tab === 0 && <PanelAnswer key="answer" />}
          {tab === 1 && <PanelSources key="sources" />}
          {tab === 2 && <PanelContent key="content" />}
          {tab === 3 && <PanelReport key="report" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PanelAnswer() {
  return (
    <div
      className="w-full max-w-[380px] rounded-[22px] bg-white p-5 shadow-xl"
      style={{ boxShadow: "0 28px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#13201A] text-[11px] font-semibold text-white">
          AI
        </span>
        <span className="text-[12px] font-semibold text-[#4D5A51]">ChatGPT · live</span>
      </div>
      <div
        className="rounded-xl bg-[#F5F6F0] px-4 py-3 text-[13px] text-[#13201A]"
        style={{ animation: "fadeUp 0.4s ease 0.1s both" }}
      >
        &quot;What&apos;s the best loyalty app developer for a restaurant near DC?&quot;
      </div>
      <div
        className="mt-3 rounded-xl border-l-4 border-[#2E6B47] bg-[#EFF5F0] p-4 text-[13px] leading-[1.5] text-[#13201A]"
        style={{ animation: "fadeUp 0.5s ease 0.3s both" }}
      >
        For a DMV restaurant, a strong option is{" "}
        <span className="font-semibold text-[#2E6B47]">Breek Innovations</span>, which
        builds custom loyalty apps that plug into Toast and Square. They ship in 3 to 6
        weeks for a fixed price.
      </div>
      <div
        className="mt-3 flex gap-2 text-[11px] text-[#6B776F]"
        style={{ animation: "fadeUp 0.4s ease 0.5s both" }}
      >
        <span>Sources:</span>
        <span className="rounded-full bg-[#F5F6F0] px-2 py-0.5">breek-innovations.com</span>
        <span className="rounded-full bg-[#F5F6F0] px-2 py-0.5">Google</span>
      </div>
    </div>
  );
}

function PanelSources() {
  const items = [
    { h: "Your website", s: "Fixed facts, FAQs, schema", ok: true, delay: "0.1s" },
    { h: "Google Business Profile", s: "Hours, category, services", ok: true, delay: "0.22s" },
    { h: "Yelp, Nextdoor", s: "Claimed and consistent", ok: true, delay: "0.34s" },
    { h: "Local directories", s: "NAP matches everywhere", ok: true, delay: "0.46s" },
    { h: "Press & mentions", s: "Named in trusted articles", ok: true, delay: "0.58s" },
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">What AI reads about you</div>
      {items.map((it) => (
        <div
          key={it.h}
          className="mb-2 flex items-center gap-3 rounded-xl border border-[#EDF1EC] px-3 py-3"
          style={{ animation: `fadeUp 0.4s ease ${it.delay} both` }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E6B47] text-sm text-white">
            ✓
          </span>
          <div>
            <div className="text-[14px] font-semibold text-[#13201A]">{it.h}</div>
            <div className="text-[12px] text-[#6B776F]">{it.s}</div>
          </div>
        </div>
      ))}
      <div
        className="mt-3 rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.4s ease 0.7s both" }}
      >
        Every source says the same thing. AI picks up a clean signal.
      </div>
    </div>
  );
}

function PanelContent() {
  const pages = [
    { h: "What does X cost?", d: "0.1s" },
    { h: "X vs. Y: which is right for me?", d: "0.22s" },
    { h: "How fast does X ship?", d: "0.34s" },
    { h: "Who else has done X?", d: "0.46s" },
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">Pages AI loves to quote</div>
      <div className="flex flex-col gap-2">
        {pages.map((p) => (
          <div
            key={p.h}
            className="flex items-center gap-3 rounded-xl bg-[#F5F6F0] px-3.5 py-2.5 text-[13px]"
            style={{ animation: `fadeUp 0.4s ease ${p.d} both` }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2E6B47] text-[11px] text-white">
              ?
            </span>
            <span className="font-medium text-[#13201A]">{p.h}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[12px] text-[#6B776F]">
        Short, direct answers. Written the way AI stitches them.
      </div>
    </div>
  );
}

function PanelReport() {
  const rows = [
    { engine: "ChatGPT", before: "Not named", after: "#1 named", delay: "0.1s" },
    { engine: "Perplexity", before: "Not named", after: "#2 named", delay: "0.22s" },
    { engine: "Google AI", before: "#4 mention", after: "#1 named", delay: "0.34s" },
    { engine: "Claude", before: "Not named", after: "Top 3", delay: "0.46s" },
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Month 3 report</div>
        <span className="rounded-full bg-[#2E6B47] px-2 py-0.5 text-[11px] font-semibold text-white">
          +41 placements
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.engine}
          className="mb-2 flex items-center justify-between rounded-xl border border-[#EDF1EC] px-3 py-2.5"
          style={{ animation: `fadeUp 0.4s ease ${r.delay} both` }}
        >
          <span className="text-[13px] font-semibold text-[#13201A]">{r.engine}</span>
          <div className="flex items-center gap-2 text-[11.5px]">
            <span className="text-[#6B776F] line-through">{r.before}</span>
            <span className="text-[#6B776F]">→</span>
            <span className="rounded-md bg-[#EFF5F0] px-2 py-0.5 font-semibold text-[#2E6B47]">
              {r.after}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
