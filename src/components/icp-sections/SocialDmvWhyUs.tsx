"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  tag: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "On-site content, monthly",
    tag: "ORIGINAL VIDEO",
    desc: "A videographer at your location monthly, capturing Reels and TikToks that look like a local person made them. Original content is what the algorithm actually rewards in 2026.",
  },
  {
    label: "Local ad spend",
    tag: "TARGETED REACH",
    desc: "Meta and TikTok ads inside a 5 to 10 mile radius around your door. Ad budget that hits people who can actually walk in, not vanity impressions in another state.",
  },
  {
    label: "Reviews + Google Business",
    tag: "LOCAL RANKING",
    desc: "Daily Google Business Profile posts and timely review responses. This is the single biggest lever for \"near me\" ranking in the local pack, and almost no one is doing it right.",
  },
  {
    label: "Pay when it works",
    tag: "COMMISSION MODEL",
    desc: "No monthly retainer. We take a cut of attributable new revenue. Aligned with your P&L, not our billable hours. If the campaign doesn't move the needle, you don't pay.",
  },
];

const TAB_SECONDS = 5;

export function SocialDmvWhyUs() {
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
          <div className="mb-[18px] font-mono text-[13px] text-[#2E6B47]" style={{ letterSpacing: "0.06em" }}>
            WHY LOCAL OWNERS PICK US
          </div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            Foot traffic, not followers.
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
          {tab === 0 && <PanelReel key="reel" />}
          {tab === 1 && <PanelLocalAds key="ads" />}
          {tab === 2 && <PanelReviews key="reviews" />}
          {tab === 3 && <PanelCommission key="commission" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PanelReel() {
  return (
    <div
      className="relative w-full max-w-[220px] rounded-[32px] bg-white p-3"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-[22px]"
        style={{
          background:
            "linear-gradient(180deg, #1a402c 0%, #2E6B47 55%, #4C8A62 100%)",
        }}
      >
        {/* Faux "camera on the counter" framing */}
        <div
          className="absolute inset-x-6 top-10 h-28 rounded-xl bg-[#F5EFD9]/90"
          style={{ animation: "fadeUp 0.5s ease 0.15s both" }}
        />
        <div
          className="absolute inset-x-10 top-40 h-16 rounded-lg bg-[#D7A86E]/90"
          style={{ animation: "fadeUp 0.5s ease 0.3s both" }}
        />
        <div
          className="absolute bottom-6 left-3 right-3 rounded-xl bg-black/35 px-3 py-2 backdrop-blur-sm"
          style={{ animation: "fadeUp 0.5s ease 0.45s both" }}
        >
          <div className="text-[11px] font-mono text-white/80">@yourcafe · 2h</div>
          <div className="mt-1 text-[12.5px] font-semibold text-white">
            New seasonal pastry, shot this morning
          </div>
        </div>
      </div>
      <div
        className="mt-3 flex items-center justify-between rounded-xl bg-[#13201A] px-3 py-2 text-[11px] text-[#9FD0AE]"
        style={{ animation: "fadeUp 0.5s ease 0.6s both" }}
      >
        <span>▶ 12.4k views</span>
        <span>❤ 1.8k</span>
      </div>
    </div>
  );
}

function PanelLocalAds() {
  return (
    <div className="flex w-full max-w-[380px] flex-col items-center gap-4" style={anim()}>
      <div className="relative h-[220px] w-[220px]">
        <div
          className="absolute inset-0 rounded-full border border-[#9FD0AE]/40"
          style={{ animation: "ringPulse 2.4s ease-out 0s infinite" }}
        />
        <div
          className="absolute inset-0 rounded-full border border-[#9FD0AE]/35"
          style={{ animation: "ringPulse 2.4s ease-out 0.8s infinite" }}
        />
        <div
          className="absolute inset-0 rounded-full border border-[#9FD0AE]/30"
          style={{ animation: "ringPulse 2.4s ease-out 1.6s infinite" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F4EF] shadow-lg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18s6-5 6-10a6 6 0 10-12 0c0 5 6 10 6 10z" stroke="#2E6B47" strokeWidth="1.8" />
                <circle cx="10" cy="8" r="2.4" fill="#2E6B47" />
              </svg>
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#13201A]">
              5 mi radius
            </span>
          </div>
        </div>
      </div>
      <div
        className="rounded-xl bg-white px-4 py-3 text-center text-[13px]"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)", animation: "fadeUp 0.5s ease 0.3s both" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2E6B47]">
          Spending where it counts
        </div>
        <div className="mt-0.5 font-display text-[18px] font-bold text-[#13201A]">
          $600 / mo → 42 walk-ins
        </div>
      </div>
    </div>
  );
}

function PanelReviews() {
  const reviews = [
    { name: "Jordan P.", stars: 5, text: "Best latte in the neighborhood. Owner replied to my last review in 2 hours.", d: "0.1s" },
    { name: "A. Martinez", stars: 5, text: "Found them on Google — the Reels made me come try it.", d: "0.25s" },
    { name: "Kelly R.", stars: 4, text: "Love it. Had one small issue, they followed up same day.", d: "0.4s" },
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Reviews · this month</div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-[#2E6B47]">
          <span>4.9</span>
          <span className="text-[#F5B841]">★★★★★</span>
        </div>
      </div>
      <div className="mb-3 text-[11.5px] text-[#6B776F]">
        Google Business Profile · 127 reviews, 100% replied
      </div>
      {reviews.map((r) => (
        <div
          key={r.name}
          className="mb-2.5 rounded-xl border border-[#EDF1EC] bg-white px-3 py-2.5 text-[12.5px]"
          style={{ animation: `fadeUp 0.4s ease ${r.d} both` }}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#13201A]">{r.name}</span>
            <span className="text-[#F5B841]">{"★".repeat(r.stars)}</span>
          </div>
          <div className="mt-1 text-[#4D5A51]">{r.text}</div>
        </div>
      ))}
    </div>
  );
}

function PanelCommission() {
  const rows = [
    { label: "Attributable new revenue", val: "$12,840", d: "0.1s" },
    { label: "Commission rate", val: "× 8%", d: "0.22s" },
    { label: "You owe Breek this month", val: "$1,027", d: "0.34s", highlight: true },
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-1 text-[13px] font-semibold text-[#13201A]">Monthly statement</div>
      <div className="mb-3 text-[11.5px] text-[#6B776F]">
        No retainer · transparent · cancel anytime
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className={`mt-2 flex items-baseline justify-between rounded-xl px-3.5 py-3 text-[13px] ${
            r.highlight ? "bg-[#2E6B47] text-[#F0F4EF]" : "bg-[#F5F6F0] text-[#13201A]"
          }`}
          style={{ animation: `fadeUp 0.4s ease ${r.d} both` }}
        >
          <span className={r.highlight ? "font-semibold" : "font-medium"}>
            {r.label}
          </span>
          <span
            className={`font-display font-bold ${r.highlight ? "text-[18px]" : "text-[16px]"}`}
            style={{ letterSpacing: "-0.015em" }}
          >
            {r.val}
          </span>
        </div>
      ))}
      <div className="mt-3 text-[11.5px] text-[#6B776F]">
        Didn&apos;t generate revenue? You owe $0.
      </div>
    </div>
  );
}
