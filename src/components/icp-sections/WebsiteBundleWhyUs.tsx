"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  tag: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "Built to be found, not just pretty",
    tag: "SEO + GEO",
    desc: "Every page is written and structured so Google ranks it and AI engines can quote it. SEO and GEO are baked into the build, not bolted on by a different agency six months later.",
  },
  {
    label: "Content machine from day one",
    tag: "CONTENT",
    desc: "The team that builds the site also writes the first wave of pages and social content. Day one is not a blank CMS — it's a site that already has pages worth landing on.",
  },
  {
    label: "Ads that point to pages, not the homepage",
    tag: "PAID",
    desc: "We build real landing pages for each offer and point the ads straight at them. One of the biggest reasons ads don't work: they send everyone to a cluttered homepage.",
  },
  {
    label: "You own every piece",
    tag: "OWNERSHIP",
    desc: "The code, the domain, the ad accounts, the analytics — all in your name, day one. If you ever want to work with someone else, you walk away with everything.",
  },
];

const TAB_SECONDS = 5;

export function WebsiteBundleWhyUs() {
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
            WHY OWNERS PICK THIS BUNDLE
          </div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            A site is a storefront. We also drive people to it.
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
          {tab === 0 && <PanelFound key="found" />}
          {tab === 1 && <PanelContent key="content" />}
          {tab === 2 && <PanelLanding key="landing" />}
          {tab === 3 && <PanelOwn key="own" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PanelFound() {
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">Where you show up</div>
      {[
        { h: "Google top 3", s: "'best X near me'", d: "0.1s" },
        { h: "ChatGPT answer", s: "Named in the paragraph", d: "0.24s" },
        { h: "Perplexity source", s: "Linked as citation", d: "0.38s" },
        { h: "Google AI Overview", s: "Named in the summary", d: "0.52s" },
      ].map((it) => (
        <div
          key={it.h}
          className="mb-2 flex items-center gap-3 rounded-xl border border-[#EDF1EC] px-3 py-3"
          style={{ animation: `fadeUp 0.4s ease ${it.d} both` }}
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
    </div>
  );
}

function PanelContent() {
  const items = [
    "Homepage",
    "Services page",
    "Pricing page",
    "About + team",
    "FAQ (AI-quotable)",
    "3 real blog posts",
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Day one on the site</div>
        <span className="rounded-full bg-[#2E6B47] px-2 py-0.5 text-[11px] font-semibold text-white">
          written + live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((it, i) => (
          <div
            key={it}
            className="rounded-lg bg-[#F5F6F0] px-3 py-2 text-[12.5px] font-medium text-[#13201A]"
            style={{ animation: `fadeUp 0.4s ease ${0.1 + i * 0.08}s both` }}
          >
            {it}
          </div>
        ))}
      </div>
      <div
        className="mt-3 rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.4s ease 0.75s both" }}
      >
        No blank CMS. No &quot;coming soon&quot; pages.
      </div>
    </div>
  );
}

function PanelLanding() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-3" style={anim()}>
      <div
        className="rounded-xl border border-[#EDF1EC] bg-white px-4 py-3"
        style={{ animation: "fadeUp 0.45s ease 0.1s both" }}
      >
        <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#B13F3F]">
          What most agencies do
        </div>
        <div className="mt-1 text-[13px] text-[#13201A]">
          Ad → your homepage → user reads 7 things → bounces
        </div>
      </div>
      <div
        className="rounded-xl bg-[#2E6B47] px-4 py-3 text-white"
        style={{ animation: "fadeUp 0.45s ease 0.3s both" }}
      >
        <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#C4F0D5]">
          What we do
        </div>
        <div className="mt-1 text-[13px]">
          Ad → a single landing page for that offer → book or buy
        </div>
      </div>
      <div
        className="rounded-xl border border-[#EDF1EC] bg-white p-4"
        style={{ animation: "fadeUp 0.45s ease 0.5s both" }}
      >
        <div className="text-[12.5px] font-semibold text-[#13201A]">
          Result after 90 days
        </div>
        <div className="mt-2 flex items-end justify-between text-[11px] text-[#6B776F]">
          <div>
            <div>Ad cost/lead</div>
            <div className="font-display text-[20px] font-bold text-[#13201A]" style={{ letterSpacing: "-0.03em" }}>
              -58%
            </div>
          </div>
          <div>
            <div>Bounce rate</div>
            <div className="font-display text-[20px] font-bold text-[#13201A]" style={{ letterSpacing: "-0.03em" }}>
              -46%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelOwn() {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-3" style={anim()}>
      {[
        { h: "Your domain", s: "In your registrar", delay: "0.1s" },
        { h: "Your code", s: "Repo in your account", delay: "0.22s" },
        { h: "Your ad accounts", s: "Meta · Google · TikTok", delay: "0.34s" },
        { h: "Your analytics", s: "GA4 + Plausible", delay: "0.46s" },
      ].map((it) => (
        <div
          key={it.h}
          className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[13px]"
          style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.18)", animation: `fadeUp 0.45s ease ${it.delay} both` }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E3EEE4] text-[#2E6B47]">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 1 L18 5 V11 C18 15 14 18 10 19 C6 18 2 15 2 11 V5 Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 10 L9 12 L13 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <div className="font-semibold text-[#13201A]">{it.h}</div>
            <div className="text-[11.5px] text-[#6B776F]">{it.s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
